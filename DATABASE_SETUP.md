# Supabase Database Setup Guide

## How to Apply the Database Schema

1. **Go to Supabase Console**
   - Visit https://app.supabase.com/
   - Select your project: `therapy-for-love`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy the SQL Schema**
   - Open `database/schema.sql` from this project
   - Copy ALL the SQL code

4. **Execute the SQL**
   - Paste the SQL into the Supabase SQL Editor
   - Click "Run" button
   - Verify all tables are created successfully

5. **Enable Row Level Security (Optional but Recommended)**
   - Go to "Authentication" → "Policies"
   - Add RLS policies for each table to control access

## Database Tables Overview

| Table | Purpose |
|-------|---------|
| users | Store user accounts and credentials |
| profiles | Store user profile information |
| articles | Store therapy/relationship articles |
| advice | Store personalized advice for users |
| community_forum | Store forum posts by users |
| comments | Store comments on forum posts |

## Quick Test

After creating the tables, test them with this SQL:

```sql
-- Check all tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- View users table structure
\d users;
```

## Next Steps

1. Set up Row Level Security (RLS) policies
2. Create API routes in Next.js to interact with these tables
3. Build authentication flow using Supabase Auth
4. Create UI components for each feature
