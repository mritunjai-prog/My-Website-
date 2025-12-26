# Portfolio Website with Backend

This is a full-stack portfolio website with blog functionality and contact form.

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components

### Backend

- Node.js + Express
- MongoDB (Mongoose)
- Nodemailer (Email service)
- JWT Authentication (ready for future use)

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file in root directory:

```
VITE_API_URL=http://localhost:5000
```

3. Run development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:8080`

### Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file in backend directory:

```
PORT=5000
NODE_ENV=development

# MongoDB - Choose ONE:
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio

# Option 2: MongoDB Atlas (recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@yourportfolio.com

# Frontend URL
FRONTEND_URL=http://localhost:8080
```

4. **Gmail Setup** (for contact form emails):

   - Go to Google Account settings
   - Enable 2-Factor Authentication
   - Generate an "App Password" for your application
   - Use that app password in `EMAIL_PASSWORD`

5. Start backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

## MongoDB Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI` in `.env`

## API Endpoints

### Contact

- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Blog

- `GET /api/blog` - Get all published posts
- `GET /api/blog/:slug` - Get single post by slug
- `POST /api/blog` - Create new post
- `PUT /api/blog/:id` - Update post
- `DELETE /api/blog/:id` - Delete post
- `POST /api/blog/:id/like` - Like a post

## Creating Blog Posts

You can create blog posts by sending POST requests to `/api/blog`:

```bash
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog Post",
    "content": "<p>This is the content...</p>",
    "excerpt": "A brief summary",
    "category": "AI/ML",
    "tags": ["machine-learning", "tutorial"],
    "published": true
  }'
```

Or use tools like Postman, Thunder Client, or create an admin panel.

## Deployment

### Frontend (Vercel/Netlify)

1. Build: `npm run build`
2. Deploy `dist` folder
3. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend (Heroku/Railway/Render)

1. Update `MONGODB_URI` to MongoDB Atlas
2. Set all environment variables
3. Deploy backend folder
4. Update frontend `VITE_API_URL` with deployed backend URL

## Features

✅ Contact form with email notifications
✅ Blog system with categories and tags
✅ View counts and likes for blog posts
✅ Responsive design
✅ Dark/Light theme
✅ SEO optimized
✅ Email confirmations
✅ Form validation
✅ Error handling
✅ Rate limiting

## Future Enhancements

- [ ] Admin dashboard for managing blog posts
- [ ] User authentication
- [ ] Comments system
- [ ] Image upload for blog posts
- [ ] Newsletter subscription
- [ ] Analytics dashboard

## Support

For issues or questions, contact: mritunjaisinghwork@gmail.com
