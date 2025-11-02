# Installation Guide

Complete step-by-step guide to set up and run the Restaurant Reservation System.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning repository)
- A modern web browser (Chrome, Firefox, Safari, or Edge)

## Step 1: Get the Project

### Option A: Clone from Repository
```bash
git clone <repository-url>
cd restaurant-reservation-system
```

### Option B: Download ZIP
1. Download the project ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in the project folder

## Step 2: Install Dependencies

Run the following command in the project root directory:

```bash
npm install
```

This will install all required packages:
- React 18
- TypeScript
- React Router DOM
- Supabase Client
- React Toastify
- bcryptjs
- Lucide React (icons)
- Tailwind CSS
- Vite

**Expected output**: You should see packages being installed. This may take 1-2 minutes.

## Step 3: Set Up Supabase

### 3.1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email if required

### 3.2: Create New Project

1. Click "New Project"
2. Enter project details:
   - **Name**: restaurant-reservation (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is sufficient
3. Click "Create new project"
4. Wait 1-2 minutes for project to be provisioned

### 3.3: Get API Keys

1. In your Supabase project dashboard, click "Settings" (gear icon)
2. Click "API" in the left sidebar
3. You'll see two important values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
4. Copy both values (you'll need them in the next step)

### 3.4: Run Database Migrations

The database schema is already created in your Supabase project. To verify:

1. In Supabase dashboard, click "Table Editor"
2. You should see two tables:
   - `users` table
   - `reservations` table
3. Click "SQL Editor" to verify the schema

If tables are missing, the migration was applied automatically when you set up the project.

## Step 4: Configure Environment Variables

### 4.1: Create .env File

In the project root directory, create a file named `.env` (note the dot at the beginning):

```bash
# On Mac/Linux
touch .env

# On Windows (in Command Prompt)
type nul > .env
```

### 4.2: Add Your Supabase Credentials

Open the `.env` file in a text editor and add:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace:
- `your_project_url_here` with your Project URL from Step 3.3
- `your_anon_key_here` with your anon public key from Step 3.3

**Example**:
```env
VITE_SUPABASE_URL=https://xyzabcdefg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZmciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTk1NzU4OCwiZXhwIjoxOTUxNTMzNTg4fQ.abc123def456
```

### 4.3: Save the File

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

## Step 5: Start the Development Server

Run the following command:

```bash
npm run dev
```

You should see output like:
```
  VITE v5.4.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Step 6: Open the Application

1. Open your web browser
2. Go to: `http://localhost:5173`
3. You should see the Restaurant Reservation homepage

## Step 7: Test the Application

### Register a User

1. Click "Register" in the navbar
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
   - Password: test123
   - Confirm Password: test123
   - Role: Customer
3. Click "Register"
4. You should see "Registered Successfully!" toast
5. You'll be redirected to the login page

### Login

1. Enter your email and password
2. Click "Login"
3. You should see "Login Successful!" toast
4. You'll be redirected to the home page
5. Navbar should show "Welcome, Test User"

### Make a Reservation

1. Click "Reservation" in the navbar
2. Fill in the form with your details
3. Choose a date (today or future)
4. Choose a time
5. Enter number of people
6. Select a location
7. Click "Reserve Table"
8. You should see "Reservation Successful!" toast

### Test Admin Dashboard

1. Logout (click Logout button)
2. Register a new user with "Admin" role
3. Login with admin credentials
4. You'll be redirected to Admin Dashboard
5. You can view all reservations, customers, and chefs

## Step 8: Build for Production (Optional)

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Problem: Port 5173 is already in use

**Solution**:
```bash
# Kill the process using the port
# On Mac/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- --port 3000
```

### Problem: Environment variables not working

**Solutions**:
1. Verify `.env` file is in the project root (not in src/)
2. Ensure variable names start with `VITE_`
3. Restart the dev server after changing `.env`
4. Check for typos in variable names
5. Make sure there are no spaces around `=` in `.env`

### Problem: "Missing Supabase environment variables" error

**Solution**:
1. Verify `.env` file exists
2. Check that both variables are set
3. Restart the development server
4. Clear browser cache and reload

### Problem: Database connection error

**Solutions**:
1. Verify Supabase URL and key are correct
2. Check that your Supabase project is running (green dot in dashboard)
3. Ensure you're using the `anon` key, not the `service_role` key
4. Check that tables exist in Supabase (Table Editor)

### Problem: Registration fails

**Solutions**:
1. Check browser console for errors
2. Verify Supabase connection
3. Ensure email is unique (not already registered)
4. Check that RLS policies are enabled

### Problem: Login fails

**Solutions**:
1. Verify email and password are correct
2. Check that user exists in `users` table
3. Ensure password was hashed during registration
4. Try registering a new user

### Problem: Reservations not saving

**Solutions**:
1. Check browser console for errors
2. Verify all form fields are filled
3. Ensure date is today or future
4. Check Supabase connection
5. Verify data in Supabase Table Editor

### Problem: npm install fails

**Solutions**:
1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm cache clean --force`
3. Run `npm install` again
4. Ensure Node.js version is 18 or higher: `node --version`

### Problem: Build fails

**Solutions**:
1. Run `npm run typecheck` to check TypeScript errors
2. Fix any TypeScript errors
3. Try `npm run lint` to check for linting issues
4. Delete `node_modules` and reinstall
5. Update dependencies: `npm update`

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run TypeScript type checking
npm run typecheck

# Run ESLint
npm run lint

# Install a new package
npm install package-name

# Update all packages
npm update

# Clean install (if having issues)
rm -rf node_modules package-lock.json
npm install
```

## File Structure

```
restaurant-reservation-system/
├── src/
│   ├── components/      # Navbar, Footer
│   ├── context/        # AuthContext
│   ├── lib/           # Supabase client
│   ├── pages/         # All page components
│   ├── App.tsx        # Main app with routing
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── .env              # Environment variables (create this)
├── .env.example      # Environment template
├── package.json      # Dependencies
├── tsconfig.json     # TypeScript config
├── vite.config.ts    # Vite config
├── tailwind.config.js # Tailwind config
└── README.md         # Documentation
```

## Security Best Practices

1. **Never commit `.env` file**: It contains sensitive keys
2. **Use environment variables**: Don't hardcode API keys
3. **Keep dependencies updated**: Run `npm audit` regularly
4. **Use HTTPS in production**: Never deploy without SSL
5. **Validate user input**: Both client and server-side
6. **Use strong passwords**: Minimum 6 characters (increase in production)
7. **Enable RLS**: Row Level Security is enabled by default
8. **Regular backups**: Backup your Supabase database regularly

## Next Steps

After successful installation:

1. Read the [README.md](README.md) for feature overview
2. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
3. Review [SEED_DATA.md](SEED_DATA.md) for testing data
4. Customize the application (colors, branding, features)
5. Add more pages or features as needed
6. Deploy to production (Vercel, Netlify, etc.)

## Deployment

### Deploying to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in Vercel settings
6. Deploy

### Deploying to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add environment variables in Netlify settings
8. Deploy

### Environment Variables in Production

Add these in your deployment platform:
```
VITE_SUPABASE_URL=your_production_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
```

## Support

If you encounter issues not covered here:

1. Check browser console for errors
2. Check Supabase logs in dashboard
3. Verify all environment variables
4. Ensure dependencies are installed
5. Try clearing cache and restarting
6. Check that Node.js version is compatible

## Success Checklist

- ✅ Node.js installed
- ✅ Project dependencies installed
- ✅ Supabase project created
- ✅ Database tables created
- ✅ .env file configured
- ✅ Dev server running
- ✅ Application accessible in browser
- ✅ User registration working
- ✅ User login working
- ✅ Reservations saving to database
- ✅ Admin dashboard accessible
- ✅ Chef dashboard accessible

Congratulations! Your Restaurant Reservation System is now running successfully.
