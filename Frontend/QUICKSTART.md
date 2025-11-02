# Quick Start Guide

Get the Restaurant Reservation System running in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- Supabase account (free)

## Step 1: Install Dependencies (1 minute)

```bash
npm install
```

## Step 2: Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project (wait for provisioning)
3. Go to Settings → API
4. Copy your:
   - Project URL
   - anon public key

## Step 3: Configure Environment (30 seconds)

Create `.env` file in project root:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## Step 4: Start the App (30 seconds)

```bash
npm run dev
```

## Step 5: Test It! (1 minute)

1. Open `http://localhost:5173`
2. Click "Register"
3. Create an account
4. Login
5. Make a reservation

## Done! 🎉

Your restaurant reservation system is now running!

## What's Working

✅ All pages with navigation
✅ User registration and login
✅ Reservation system with database
✅ Admin dashboard (register with "Admin" role)
✅ Chef dashboard (register with "Chef" role)
✅ Beautiful UI with responsive design
✅ Toast notifications
✅ Secure authentication
✅ Data persistence

## Next Steps

- Read [README.md](README.md) for full overview
- Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) for detailed setup
- Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for technical details
- Use [SEED_DATA.md](SEED_DATA.md) for testing

## Need Help?

Check [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) troubleshooting section.

## Features

- 🏠 Home page with hero section
- ℹ️ About page with restaurant info
- 👨‍🍳 Chefs showcase (6 master chefs)
- 🍽️ Menu (4 cuisines, 12 dishes)
- 📅 Reservation system (8 locations)
- 📞 Contact page with map
- 🔐 Authentication (Customer, Admin, Chef roles)
- 📊 Admin Dashboard (view all data)
- 🍳 Chef Dashboard (today's reservations)

## Tech Stack

- React 18 + TypeScript
- Supabase (PostgreSQL)
- Tailwind CSS
- React Router DOM
- React Toastify
- Vite

Enjoy your restaurant reservation system! 🍽️
