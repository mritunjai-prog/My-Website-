# Supabase Setup Guide

## ✅ No Local Database Required!

Your portfolio now uses **Supabase** - a cloud database that anyone can access from anywhere in the world. No installation needed!

## Step 1: Create Free Supabase Account

1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new project:
   - Project name: `portfolio-db`
   - Database password: (create a strong password)
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase dashboard, click "Settings" (gear icon)
2. Go to "API" section
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Update Backend .env File

Open `backend/.env` and paste your credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-public-key-here
```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Paste this SQL and click "Run":

```sql
-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT DEFAULT 'Mritunjai Singh',
  tags TEXT[],
  category TEXT,
  cover_image TEXT DEFAULT '/placeholder.svg',
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
```

## Step 5: Enable Row Level Security (Optional but Recommended)

In SQL Editor, run:

```sql
-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contacts
CREATE POLICY "Anyone can submit contact form"
ON contacts FOR INSERT
WITH CHECK (true);

-- Allow public to read published blog posts
CREATE POLICY "Anyone can read published posts"
ON blog_posts FOR SELECT
USING (published = true);

-- Allow service role to do everything (for your backend)
CREATE POLICY "Service role full access contacts"
ON contacts FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access blog"
ON blog_posts FOR ALL
USING (auth.role() = 'service_role');
```

## Step 6: Start Your Servers

Terminal 1 - Backend:

```bash
cd My-Website-/backend
npm run dev
```

Terminal 2 - Frontend:

```bash
cd My-Website-
npm run dev
```

## Step 7: Test Everything

1. Visit http://localhost:8080
2. Go to Contact section → Submit a form
3. Click "Blog" in navigation
4. Check Supabase dashboard → "Table Editor" to see your data!

## Creating Your First Blog Post

Use this curl command or Postman:

```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "<p>Welcome to my blog! This is where I share my thoughts on AI, ML, and web development.</p>",
    "excerpt": "An introduction to my blog",
    "category": "AI/ML",
    "tags": ["welcome", "introduction", "ai"],
    "published": true
  }'
```

## Benefits of Supabase

✅ No local database installation
✅ Access from anywhere in the world
✅ Free tier (500MB database, 2GB file storage)
✅ Auto backups
✅ Built-in authentication (for future features)
✅ Real-time subscriptions
✅ REST API automatically generated
✅ Easy to scale

## Troubleshooting

### Error: "Invalid API key"

- Check your SUPABASE_KEY in `.env`
- Make sure you copied the **anon** key, not the service_role key

### Error: "relation does not exist"

- You forgot to run the SQL table creation queries
- Go to SQL Editor and run the CREATE TABLE commands

### Can't connect to Supabase

- Check your internet connection
- Verify SUPABASE_URL is correct (should start with https://)

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create issue in your repo

---

**Your database is now in the cloud and accessible worldwide! 🌍**
