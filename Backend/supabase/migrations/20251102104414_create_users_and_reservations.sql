/*
  # Restaurant Reservation System Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `email` (text, unique, not null)
      - `phone` (text, not null)
      - `password` (text, not null) - hashed password
      - `role` (text, not null) - Customer, Admin, or Chef
      - `created_at` (timestamptz)
      
    - `reservations`
      - `id` (uuid, primary key)
      - `customer_name` (text, not null)
      - `phone` (text, not null)
      - `date` (date, not null)
      - `time` (text, not null)
      - `num_people` (integer, not null)
      - `location` (text, not null)
      - `user_id` (uuid, nullable) - reference to users table
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can read their own data
    - Users can create reservations
    - Admins can view all data
    - Public access for registration
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('Customer', 'Admin', 'Chef')),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time text NOT NULL,
  num_people integer NOT NULL CHECK (num_people > 0),
  location text NOT NULL,
  user_id uuid REFERENCES users(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register"
  ON users FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'
    )
  );

CREATE POLICY "Authenticated users can create reservations"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anonymous users can create reservations"
  ON reservations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'
    )
  );

CREATE POLICY "Admins can update reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);