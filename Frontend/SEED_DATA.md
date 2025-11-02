# Seed Data for Testing

This document provides sample data you can use to test the application.

## Test Users

You can register these users or use SQL to insert them into the database:

### Admin User
```
Name: Admin User
Email: admin@savory.com
Phone: +1 (555) 100-0001
Password: admin123
Role: Admin
```

### Chef User
```
Name: Head Chef
Email: chef@savory.com
Phone: +1 (555) 100-0002
Password: chef123
Role: Chef
```

### Customer Users

**Customer 1:**
```
Name: John Smith
Email: john@example.com
Phone: +1 (555) 200-0001
Password: customer123
Role: Customer
```

**Customer 2:**
```
Name: Sarah Johnson
Email: sarah@example.com
Phone: +1 (555) 200-0002
Password: customer123
Role: Customer
```

**Customer 3:**
```
Name: Michael Brown
Email: michael@example.com
Phone: +1 (555) 200-0003
Password: customer123
Role: Customer
```

## Sample Reservations

After registering users, you can create these sample reservations:

### Reservation 1
```
Customer Name: John Smith
Phone: +1 (555) 200-0001
Date: [Today's date]
Time: 18:00
Number of People: 4
Location: Main Street - Downtown
```

### Reservation 2
```
Customer Name: Sarah Johnson
Phone: +1 (555) 200-0002
Date: [Today's date]
Time: 19:30
Number of People: 2
Location: Park Avenue - Midtown
```

### Reservation 3
```
Customer Name: Michael Brown
Phone: +1 (555) 200-0003
Date: [Tomorrow's date]
Time: 20:00
Number of People: 6
Location: Broadway - Theater District
```

### Reservation 4
```
Customer Name: Emily Davis
Phone: +1 (555) 200-0004
Date: [Tomorrow's date]
Time: 18:30
Number of People: 3
Location: Riverside - Waterfront
```

### Reservation 5
```
Customer Name: David Wilson
Phone: +1 (555) 200-0005
Date: [Day after tomorrow]
Time: 19:00
Number of People: 5
Location: Madison Square - Shopping District
```

## SQL Insert Statements (Optional)

If you want to insert test data directly into Supabase, you can use these SQL statements:

### Insert Users

**Note**: These passwords are hashed with bcryptjs. The plaintext passwords are shown in comments.

```sql
-- Admin (password: admin123)
INSERT INTO users (name, email, phone, password, role)
VALUES (
  'Admin User',
  'admin@savory.com',
  '+1 (555) 100-0001',
  '$2a$10$YourHashedPasswordHere',
  'Admin'
);

-- Chef (password: chef123)
INSERT INTO users (name, email, phone, password, role)
VALUES (
  'Head Chef',
  'chef@savory.com',
  '+1 (555) 100-0002',
  '$2a$10$YourHashedPasswordHere',
  'Chef'
);

-- Customer (password: customer123)
INSERT INTO users (name, email, phone, password, role)
VALUES (
  'John Smith',
  'john@example.com',
  '+1 (555) 200-0001',
  '$2a$10$YourHashedPasswordHere',
  'Customer'
);
```

### Insert Reservations

```sql
-- Today's reservations
INSERT INTO reservations (customer_name, phone, date, time, num_people, location, status)
VALUES
  ('John Smith', '+1 (555) 200-0001', CURRENT_DATE, '18:00', 4, 'Main Street - Downtown', 'pending'),
  ('Sarah Johnson', '+1 (555) 200-0002', CURRENT_DATE, '19:30', 2, 'Park Avenue - Midtown', 'confirmed'),
  ('Emily Davis', '+1 (555) 200-0004', CURRENT_DATE, '20:00', 3, 'Riverside - Waterfront', 'pending');

-- Tomorrow's reservations
INSERT INTO reservations (customer_name, phone, date, time, num_people, location, status)
VALUES
  ('Michael Brown', '+1 (555) 200-0003', CURRENT_DATE + INTERVAL '1 day', '20:00', 6, 'Broadway - Theater District', 'pending'),
  ('David Wilson', '+1 (555) 200-0005', CURRENT_DATE + INTERVAL '1 day', '18:30', 5, 'Madison Square - Shopping District', 'confirmed');

-- Future reservations
INSERT INTO reservations (customer_name, phone, date, time, num_people, location, status)
VALUES
  ('Alice Thompson', '+1 (555) 200-0006', CURRENT_DATE + INTERVAL '2 days', '19:00', 4, 'Fifth Avenue - Luxury District', 'pending'),
  ('Robert Martinez', '+1 (555) 200-0007', CURRENT_DATE + INTERVAL '3 days', '20:30', 2, 'Brooklyn Heights', 'pending'),
  ('Linda Garcia', '+1 (555) 200-0008', CURRENT_DATE + INTERVAL '4 days', '18:00', 8, 'Queens Boulevard', 'confirmed');
```

## Testing Workflow

### 1. Register and Login Flow

1. **Register as Customer**:
   - Go to Register page
   - Fill in form with customer details
   - Select "Customer" role
   - Submit form
   - Verify "Registered Successfully!" toast

2. **Login as Customer**:
   - Go to Login page
   - Enter email and password
   - Verify "Login Successful!" toast
   - Should redirect to Home page
   - Navbar should show "Welcome, [Name]"

3. **Register as Admin**:
   - Logout if logged in
   - Register with "Admin" role
   - Login as admin
   - Should redirect to Admin Dashboard

4. **Register as Chef**:
   - Logout if logged in
   - Register with "Chef" role
   - Login as chef
   - Should redirect to Chef Dashboard

### 2. Reservation Flow

1. **As Guest (Not Logged In)**:
   - Go to Reservation page
   - Fill in all reservation details
   - Select a future date
   - Submit form
   - Verify "Reservation Successful!" toast
   - Form data should remain visible

2. **As Logged In Customer**:
   - Login as customer
   - Go to Reservation page
   - Create reservation
   - Verify reservation is saved with user_id

### 3. Admin Dashboard Flow

1. **Login as Admin**:
   - Login with admin credentials
   - Should redirect to Admin Dashboard

2. **View Reservations**:
   - Default tab shows all reservations
   - Verify all reservation details are visible
   - Check status badges (pending, confirmed, cancelled)

3. **View Customers**:
   - Click "Customers" tab
   - Verify all registered customers are displayed
   - Check customer information (name, email, phone)

4. **View Chefs**:
   - Click "Chefs" tab
   - Verify all registered chefs are displayed

### 4. Chef Dashboard Flow

1. **Login as Chef**:
   - Login with chef credentials
   - Should redirect to Chef Dashboard

2. **View Statistics**:
   - Check today's reservations count
   - Check upcoming reservations count
   - Check total guests today count

3. **View Today's Reservations**:
   - Verify table shows today's reservations
   - Check time, customer name, guests, location

4. **View Upcoming Reservations**:
   - Verify table shows future reservations
   - Check date, time, and details

### 5. Navigation Flow

1. **All Pages Accessible**:
   - Click each navbar link
   - Verify correct page loads
   - Home → About → Chefs → Menu → Reservation → Contact

2. **Mobile Navigation**:
   - Resize browser to mobile size
   - Verify hamburger menu appears
   - Test menu open/close
   - Test all links work

### 6. Logout Flow

1. **Logout**:
   - Click Logout button
   - Verify user is logged out
   - Navbar should show Login/Register buttons
   - Attempting to access Admin/Chef dashboard should redirect

## Expected Behaviors

### Registration
- ✅ All fields required
- ✅ Password minimum 6 characters
- ✅ Passwords must match
- ✅ Email must be unique
- ✅ Success toast on completion
- ✅ Redirect to login page
- ✅ Data saved to database

### Login
- ✅ Email and password required
- ✅ Valid credentials required
- ✅ Success toast on login
- ✅ Role-based redirect (Customer → Home, Admin → Admin Dashboard, Chef → Chef Dashboard)
- ✅ User data in navbar

### Reservation
- ✅ All fields required
- ✅ Date must be today or future
- ✅ Number of people must be positive
- ✅ Location dropdown with 8 options
- ✅ Success toast on submission
- ✅ Form data persists after submit
- ✅ Data saved to database

### Admin Dashboard
- ✅ Only accessible to Admin role
- ✅ Three tabs: Reservations, Customers, Chefs
- ✅ All data visible in tables
- ✅ Status badges with colors
- ✅ Responsive table design

### Chef Dashboard
- ✅ Only accessible to Chef role
- ✅ Statistics cards with counts
- ✅ Today's reservations table
- ✅ Upcoming reservations table
- ✅ Sorted by date and time

## Common Test Scenarios

### Happy Path
1. Register → Login → Make Reservation → View in Dashboard

### Error Scenarios
1. Register with existing email → Show error
2. Login with wrong password → Show error
3. Submit reservation with missing fields → Show error
4. Access admin dashboard as customer → Redirect

### Edge Cases
1. Make reservation for same day
2. Make reservation far in future
3. Register multiple users with same role
4. Create multiple reservations at same time
5. Long names and phone numbers
6. Special characters in fields

## Performance Testing

1. **Load Many Reservations**:
   - Create 50+ reservations
   - Check dashboard loading time
   - Verify table scrolling

2. **Multiple Users**:
   - Register 20+ users
   - Check admin dashboard performance
   - Verify filtering works

3. **Concurrent Reservations**:
   - Create multiple reservations quickly
   - Verify all are saved
   - Check for race conditions

## Database Verification

After testing, verify data in Supabase:

1. Go to Supabase Dashboard
2. Open Table Editor
3. Check `users` table for registered users
4. Check `reservations` table for created reservations
5. Verify passwords are hashed
6. Verify timestamps are correct
7. Check RLS policies are working

## Troubleshooting

If something doesn't work:

1. **Check Console**: Look for JavaScript errors
2. **Check Network**: Look for failed API calls
3. **Check Database**: Verify data was saved
4. **Check Environment Variables**: Ensure .env file is correct
5. **Clear LocalStorage**: Sometimes old data causes issues
6. **Restart Dev Server**: Fresh start can help

## Sample Screenshots Checklist

When testing, verify these UI elements:

- ✅ Home page hero section with background image
- ✅ About page with statistics cards
- ✅ Chefs page with 6 chef cards
- ✅ Menu page with 4 cuisine categories
- ✅ Reservation form with all fields
- ✅ Contact page with map
- ✅ Login form
- ✅ Register form with role dropdown
- ✅ Admin dashboard with 3 tabs
- ✅ Chef dashboard with statistics
- ✅ Navbar with all links
- ✅ Footer with contact info
- ✅ Toast notifications
- ✅ Mobile responsive design
