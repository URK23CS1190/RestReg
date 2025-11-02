# API Documentation

This document describes the database operations and API patterns used in the Restaurant Reservation System.

## Database Tables

### Users Table

**Table Name**: `users`

**Columns**:
- `id` (uuid, primary key) - Unique user identifier
- `name` (text, not null) - User's full name
- `email` (text, unique, not null) - User's email address
- `phone` (text, not null) - User's phone number
- `password` (text, not null) - Hashed password (bcrypt)
- `role` (text, not null) - User role: 'Customer', 'Admin', or 'Chef'
- `created_at` (timestamptz) - Registration timestamp

**Constraints**:
- Email must be unique
- Role must be one of: 'Customer', 'Admin', 'Chef'

### Reservations Table

**Table Name**: `reservations`

**Columns**:
- `id` (uuid, primary key) - Unique reservation identifier
- `customer_name` (text, not null) - Customer name
- `phone` (text, not null) - Customer phone number
- `date` (date, not null) - Reservation date
- `time` (text, not null) - Reservation time
- `num_people` (integer, not null) - Number of guests (> 0)
- `location` (text, not null) - Branch location
- `user_id` (uuid, nullable) - Reference to users table
- `status` (text, default 'pending') - Status: 'pending', 'confirmed', or 'cancelled'
- `created_at` (timestamptz) - Creation timestamp

**Constraints**:
- num_people must be greater than 0
- status must be one of: 'pending', 'confirmed', 'cancelled'

## Authentication Operations

### Register User

**Operation**: Insert into `users` table

**Function**: `register()` in AuthContext

**Process**:
1. Check if email already exists
2. Hash password using bcryptjs
3. Insert user data into database
4. Return success or error

**Example**:
```typescript
const { error } = await register(
  'John Doe',
  'john@example.com',
  '+1234567890',
  'password123',
  'Customer'
);
```

**Response**:
```typescript
{ error: null } // Success
{ error: 'Email already registered' } // Error
```

### Login User

**Operation**: Query `users` table

**Function**: `login()` in AuthContext

**Process**:
1. Query user by email
2. Compare password with hashed password
3. Store user data in localStorage
4. Return user object or error

**Example**:
```typescript
const { user, error } = await login(
  'john@example.com',
  'password123'
);
```

**Response**:
```typescript
{
  user: {
    id: 'uuid',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    role: 'Customer'
  },
  error: null
}
```

### Logout User

**Operation**: Clear localStorage

**Function**: `logout()` in AuthContext

**Process**:
1. Clear user from state
2. Remove user from localStorage

## Reservation Operations

### Create Reservation

**Operation**: Insert into `reservations` table

**Endpoint**: Reservation form submission

**Process**:
1. Validate form data
2. Insert reservation into database
3. Return success or error
4. Show toast notification

**Request Data**:
```typescript
{
  customer_name: string;
  phone: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  num_people: number;
  location: string;
  user_id?: string; // Optional, if logged in
}
```

**Example**:
```typescript
const { error } = await supabase
  .from('reservations')
  .insert([{
    customer_name: 'John Doe',
    phone: '+1234567890',
    date: '2024-12-25',
    time: '19:00',
    num_people: 4,
    location: 'Main Street - Downtown',
    user_id: user?.id || null,
    status: 'pending'
  }]);
```

### Get All Reservations (Admin)

**Operation**: Query `reservations` table

**Access**: Admin only

**Process**:
1. Verify user role is 'Admin'
2. Query all reservations
3. Order by date (descending)

**Example**:
```typescript
const { data } = await supabase
  .from('reservations')
  .select('*')
  .order('date', { ascending: false });
```

**Response**:
```typescript
[
  {
    id: 'uuid',
    customer_name: 'John Doe',
    phone: '+1234567890',
    date: '2024-12-25',
    time: '19:00',
    num_people: 4,
    location: 'Main Street - Downtown',
    user_id: 'uuid',
    status: 'pending',
    created_at: '2024-12-01T10:00:00Z'
  },
  // ... more reservations
]
```

### Get Today's Reservations (Chef)

**Operation**: Query `reservations` table with date filter

**Access**: Chef only

**Process**:
1. Verify user role is 'Chef'
2. Get today's date
3. Query reservations for today
4. Order by time

**Example**:
```typescript
const today = new Date().toISOString().split('T')[0];

const { data } = await supabase
  .from('reservations')
  .select('*')
  .eq('date', today)
  .order('time', { ascending: true });
```

### Get Upcoming Reservations (Chef)

**Operation**: Query `reservations` table with date filter

**Access**: Chef only

**Process**:
1. Verify user role is 'Chef'
2. Get today's date
3. Query reservations after today
4. Order by date and time

**Example**:
```typescript
const today = new Date().toISOString().split('T')[0];

const { data } = await supabase
  .from('reservations')
  .select('*')
  .gte('date', today)
  .order('date', { ascending: true })
  .order('time', { ascending: true });
```

## User Management Operations

### Get All Users (Admin)

**Operation**: Query `users` table

**Access**: Admin only

**Process**:
1. Verify user role is 'Admin'
2. Query all users
3. Order by creation date

**Example**:
```typescript
const { data } = await supabase
  .from('users')
  .select('*')
  .order('created_at', { ascending: false });
```

### Get Users by Role (Admin)

**Operation**: Query `users` table with role filter

**Access**: Admin only

**Process**:
1. Filter users by role
2. Return filtered list

**Example**:
```typescript
// Get all customers
const customers = users.filter(u => u.role === 'Customer');

// Get all chefs
const chefs = users.filter(u => u.role === 'Chef');
```

## Row Level Security (RLS) Policies

### Users Table Policies

1. **Anyone can register**
   - Operation: INSERT
   - Access: Anonymous (anon)
   - Rule: Always allow

2. **Users can view own profile**
   - Operation: SELECT
   - Access: Authenticated
   - Rule: auth.uid() = id

3. **Admins can view all users**
   - Operation: SELECT
   - Access: Authenticated (Admin role)
   - Rule: User role must be 'Admin'

### Reservations Table Policies

1. **Authenticated users can create reservations**
   - Operation: INSERT
   - Access: Authenticated
   - Rule: Always allow

2. **Anonymous users can create reservations**
   - Operation: INSERT
   - Access: Anonymous
   - Rule: Always allow

3. **Users can view own reservations**
   - Operation: SELECT
   - Access: Authenticated
   - Rule: user_id = auth.uid()

4. **Admins can view all reservations**
   - Operation: SELECT
   - Access: Authenticated (Admin role)
   - Rule: User role must be 'Admin'

5. **Admins can update reservations**
   - Operation: UPDATE
   - Access: Authenticated (Admin role)
   - Rule: User role must be 'Admin'

## Error Handling

All database operations include error handling:

```typescript
try {
  const { data, error } = await supabase
    .from('table_name')
    .operation();

  if (error) {
    toast.error('Operation failed');
    return;
  }

  // Success handling
  toast.success('Operation successful');
} catch (error) {
  toast.error('Something went wrong');
}
```

## Data Validation

### Client-Side Validation

1. **Registration**:
   - All fields required
   - Password minimum 6 characters
   - Passwords must match
   - Email format validation

2. **Login**:
   - Email and password required
   - Email format validation

3. **Reservation**:
   - All fields required
   - Date must be today or future
   - Number of people must be positive
   - Time in HH:MM format

### Database Validation

1. **Users**:
   - Email unique constraint
   - Role enum constraint
   - Not null constraints

2. **Reservations**:
   - num_people > 0 constraint
   - Status enum constraint
   - Not null constraints

## Response Formats

### Success Response
```typescript
{
  data: [...], // Query results
  error: null
}
```

### Error Response
```typescript
{
  data: null,
  error: {
    message: 'Error description',
    code: 'ERROR_CODE'
  }
}
```

## Authentication State

User authentication state is managed via Context API:

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<Result>;
  register: (...params) => Promise<Result>;
  logout: () => void;
}
```

User object stored in localStorage:
```typescript
{
  id: 'uuid',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  role: 'Customer'
}
```

## Toast Notifications

Success and error messages are displayed using react-toastify:

```typescript
// Success
toast.success('Reservation Successful!');

// Error
toast.error('Invalid email or password');

// Info
toast.info('Processing...');

// Warning
toast.warning('Please fill all fields');
```

## Available Restaurant Locations

1. Main Street - Downtown
2. Park Avenue - Midtown
3. Broadway - Theater District
4. Riverside - Waterfront
5. Madison Square - Shopping District
6. Fifth Avenue - Luxury District
7. Brooklyn Heights
8. Queens Boulevard

## Status Values

### Reservation Status
- `pending` - Initial state when reservation is created
- `confirmed` - Admin has confirmed the reservation
- `cancelled` - Reservation has been cancelled

### User Roles
- `Customer` - Regular customer users
- `Admin` - Administrative users with full access
- `Chef` - Chef users with kitchen view access
