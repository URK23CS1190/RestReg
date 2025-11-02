# Restaurant Reservation System

A full-stack restaurant reservation website built with React, TypeScript, and Supabase.

## Features

- **User Authentication**: Role-based authentication (Customer, Admin, Chef) with secure password hashing
- **Reservation System**: Complete reservation management with date, time, location, and guest count
- **Multiple Pages**: Home, About, Chefs, Menu, Reservation, Contact, Login, Register
- **Admin Dashboard**: View all reservations, customers, and chefs
- **Chef Dashboard**: View today's and upcoming reservations
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user actions
- **Database Integration**: Supabase PostgreSQL database with Row Level Security

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router DOM v6
- **Database**: Supabase (PostgreSQL)
- **Authentication**: bcryptjs for password hashing
- **Notifications**: React Toastify
- **Icons**: Lucide React
- **Build Tool**: Vite

## Prerequisites

- Node.js 18+ and npm
- Supabase account

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd restaurant-reservation
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. The database schema is already set up in Supabase. The migration includes:
   - `users` table (name, email, phone, password, role)
   - `reservations` table (customer_name, phone, date, time, num_people, location, status)
   - Row Level Security policies

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Type Check
```bash
npm run typecheck
```

### Lint Code
```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar with authentication
│   └── Footer.tsx          # Footer component
├── context/
│   └── AuthContext.tsx     # Authentication context and state
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── pages/
│   ├── Home.tsx            # Home page with hero section
│   ├── About.tsx           # About page with restaurant info
│   ├── Chefs.tsx           # Chefs showcase page
│   ├── Menu.tsx            # Menu with different cuisines
│   ├── Reservation.tsx     # Reservation form
│   ├── Contact.tsx         # Contact information and map
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── AdminDashboard.tsx  # Admin dashboard
│   └── ChefDashboard.tsx   # Chef dashboard
├── App.tsx                 # Main app component with routing
├── main.tsx               # Application entry point
└── index.css              # Global styles with Tailwind
```

## User Roles

### Customer
- Browse website pages
- Make reservations
- View own profile

### Admin
- View all reservations
- View all registered customers
- View all chefs
- Access admin dashboard

### Chef
- View today's reservations
- View upcoming reservations
- Access chef dashboard

## Key Features

### Authentication Flow
1. **Register**: Users can register with name, email, phone, password, and role
2. **Login**: Email and password authentication with role-based redirects
3. **Secure Passwords**: Passwords are hashed using bcryptjs before storage
4. **Persistent Sessions**: User sessions are stored in localStorage

### Reservation System
1. Users can make reservations with:
   - Full name
   - Phone number
   - Date (must be today or future)
   - Time
   - Number of guests
   - Location (8 branch locations available)
2. Reservations are saved to the database
3. Form data persists after submission
4. Success notifications via toast

### Admin Dashboard
- Three tabs: Reservations, Customers, Chefs
- View all reservation details
- View all registered users by role
- Sortable and filterable data tables

### Chef Dashboard
- Statistics cards for today's and upcoming reservations
- Today's reservations table
- Upcoming reservations table
- Total guest count

## Database Schema

### Users Table
- `id` (uuid, primary key)
- `name` (text)
- `email` (text, unique)
- `phone` (text)
- `password` (text, hashed)
- `role` (text: Customer, Admin, Chef)
- `created_at` (timestamptz)

### Reservations Table
- `id` (uuid, primary key)
- `customer_name` (text)
- `phone` (text)
- `date` (date)
- `time` (text)
- `num_people` (integer)
- `location` (text)
- `user_id` (uuid, foreign key)
- `status` (text: pending, confirmed, cancelled)
- `created_at` (timestamptz)

## Row Level Security (RLS)

The database is secured with RLS policies:
- Anyone can register (insert into users)
- Users can view their own profile
- Admins can view all users and reservations
- Authenticated and anonymous users can create reservations
- Users can view their own reservations

## Restaurant Locations

1. Main Street - Downtown
2. Park Avenue - Midtown
3. Broadway - Theater District
4. Riverside - Waterfront
5. Madison Square - Shopping District
6. Fifth Avenue - Luxury District
7. Brooklyn Heights
8. Queens Boulevard

## Sample Data

The application includes sample data for:
- 6 chefs with different specialties (Italian, Japanese, French, Spanish, Indian, Chinese)
- Multiple menu items across different cuisines
- Restaurant information and history

## Design Features

- Clean, modern UI with orange accent color
- Responsive design for mobile, tablet, and desktop
- Smooth hover effects and transitions
- Professional stock photos from Pexels
- Intuitive navigation with active state indicators
- Loading states and error handling
- Toast notifications for user feedback

## Security Features

- Password hashing with bcryptjs
- Row Level Security on database
- Input validation on forms
- Protected admin and chef routes
- Secure environment variable handling
- SQL injection prevention via Supabase client

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a complete, production-ready application. For modifications:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.
