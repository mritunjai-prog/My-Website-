# 🚀 Quick Start - Backend Setup

Your portfolio backend is ready! Follow these 3 simple steps:

## ✅ What You Have

- ✅ Duplicate folders deleted
- ✅ MongoDB completely replaced with Supabase (cloud database)
- ✅ Contact form API with email notifications
- ✅ Blog CRUD API (create, read, update, delete, like posts)
- ✅ Security middleware (CORS, Helmet, Rate Limiting)
- ✅ Form validation
- ✅ Error handling

## 📋 Prerequisites

1. Node.js installed (you have this)
2. Gmail account (for sending contact emails)
3. Free Supabase account (create in 2 minutes)

## 🎯 3-Step Setup

### Step 1: Setup Supabase Database (5 minutes)

Follow the complete guide: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

**Quick version:**

1. Go to https://supabase.com → Sign up
2. Create new project
3. Copy Project URL and API Key
4. Paste into `backend/.env`:

```env
SUPABASE_URL=your-url-here
SUPABASE_KEY=your-key-here
```

5. Run the SQL table creation script in Supabase SQL Editor

### Step 2: Setup Gmail for Contact Form (3 minutes)

1. Enable 2-Factor Authentication on your Gmail account:

   - Go to: https://myaccount.google.com/security
   - Turn on "2-Step Verification"

2. Generate App Password:

   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Click "Generate"
   - Copy the 16-character password

3. Update `backend/.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=your-email@gmail.com
```

### Step 3: Start Everything (1 minute)

**Terminal 1 - Backend:**

```bash
cd "d:/Mritunjai's Website/My-Website-/backend"
npm run dev
```

You should see:

```
✓ Supabase connected
✓ Server running on port 5000
```

**Terminal 2 - Frontend:**

```bash
cd "d:/Mritunjai's Website/My-Website-"
npm run dev
```

You should see:

```
  ➜  Local:   http://localhost:8080/
```

## 🧪 Test Your Setup

### Test Contact Form:

1. Visit: http://localhost:8080
2. Scroll to "Contact" section
3. Fill out the form
4. Click "Send Message"
5. Check your email - you should get a copy!
6. Check Supabase dashboard → "Table Editor" → "contacts" - you should see the entry!

### Test Blog (Coming Soon):

1. Visit: http://localhost:8080/blog
2. Create your first post using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Hello World",
    "content": "<p>My first blog post about AI and ML!</p>",
    "excerpt": "Introduction to my blog",
    "category": "AI/ML",
    "tags": ["hello", "ai"],
    "published": true
  }'
```

## 📁 What Changed?

### Deleted (old/duplicate):

- ❌ `My website/` folder (duplicate)
- ❌ `src/` folder (orphaned)
- ❌ MongoDB dependencies
- ❌ Mongoose models

### Added (new):

- ✅ `backend/` folder with Express server
- ✅ Supabase cloud database integration
- ✅ Contact API with dual email notifications
- ✅ Blog API with full CRUD operations
- ✅ Security & validation middleware
- ✅ Environment configuration files

### Modified:

- ✅ `src/components/Contact.tsx` - Now sends to backend API
- ✅ `src/components/Navbar.tsx` - Added Blog link
- ✅ `src/App.tsx` - Added blog routes
- ✅ Created `src/components/Blog.tsx` - Blog listing page
- ✅ Created `src/components/BlogPost.tsx` - Individual post view

## 🌍 Why This Is Better

**Before (MongoDB):**

- ❌ Needed local installation
- ❌ Complex setup
- ❌ Not accessible from other computers
- ❌ No built-in authentication

**Now (Supabase):**

- ✅ Cloud-hosted (accessible worldwide)
- ✅ Free tier (500MB database)
- ✅ Built-in authentication ready
- ✅ Auto backups
- ✅ Real-time capabilities
- ✅ Works from any computer

## 🚀 Deploy to Production

When ready to deploy:

1. **Backend to Vercel:**

```bash
cd backend
vercel
```

2. **Frontend to Netlify:**

```bash
cd ..
netlify deploy --prod
```

3. Update environment variables in production dashboard

## ❓ Troubleshooting

### "Cannot connect to Supabase"

- Check your `.env` has correct SUPABASE_URL and SUPABASE_KEY
- Make sure you ran the SQL table creation script
- Verify your internet connection

### "Email not sending"

- Check Gmail app password is correct (16 characters, no spaces)
- Verify 2FA is enabled on your Gmail account
- Check EMAIL_USER and EMAIL_FROM match your Gmail address

### "Port 5000 already in use"

- Change PORT in `backend/.env` to something else (e.g., 3000)
- Or kill the process using port 5000

### "Database table doesn't exist"

- You forgot to run the SQL script in Supabase
- Go to Supabase → SQL Editor → Run the CREATE TABLE commands

## 📚 Documentation

- Full Supabase setup: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Backend API details: [backend/BACKEND_README.md](./backend/BACKEND_README.md)
- Project overview: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

## 🎉 You're All Set!

Your portfolio now has:

- ✅ Cloud database accessible worldwide
- ✅ Working contact form with email notifications
- ✅ Blog system ready to use
- ✅ Secure API with rate limiting
- ✅ Production-ready setup

**Next Steps:**

1. Complete the Supabase setup (5 min)
2. Configure Gmail app password (3 min)
3. Test your contact form
4. Create your first blog post
5. Deploy to production!

Need help? Check the documentation or create a GitHub issue.
