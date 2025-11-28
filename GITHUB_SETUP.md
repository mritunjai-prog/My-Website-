# 🚀 GitHub Setup Instructions

## Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in the details:
   - **Repository name**: `portfolio` (or `mritunjai-portfolio`)
   - **Description**: `My professional portfolio website - AI/ML Developer`
   - **Visibility**: Public
   - **DON'T** check "Add a README file" (we already have one)
   - **DON'T** add .gitignore or license (already included)
3. Click **"Create repository"**

---

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Use these:

### Open PowerShell/Terminal and run:

```powershell
cd "C:\Users\IAMRO-PC\Downloads\Mritunjai web new\vivid-realm-main"

git remote add origin https://github.com/mritunjai-prog/portfolio.git

git branch -M main

git push -u origin main
```

**Replace `mritunjai-prog` with your actual GitHub username!**

---

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. README.md will be displayed on the main page

---

## 🎉 Bonus: Deploy to Netlify

Once on GitHub, deploying is super easy!

### Quick Deploy:

1. Go to: https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your `portfolio` repository
5. Netlify will auto-detect settings from `netlify.toml`
6. Click **"Deploy site"**
7. Done! Your site will be live in ~2 minutes! 🚀

---

## 📝 Git Commands Reference

### Check Status
```bash
git status
```

### Add Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Your message here"
```

### Push to GitHub
```bash
git push
```

### Pull Latest Changes
```bash
git pull
```

---

## 🔧 Troubleshooting

### "Authentication failed"
- Use Personal Access Token instead of password
- Generate at: https://github.com/settings/tokens

### "Permission denied"
- Check you're using the correct username
- Verify repository URL: `git remote -v`

### "Updates were rejected"
- Pull latest changes first: `git pull origin main`
- Then push: `git push origin main`

---

## 🎯 Your Portfolio Features

✅ Responsive Design
✅ Dark/Light Theme Toggle
✅ Skills Section with Icons
✅ Education Section
✅ Projects with Live Demo Links
✅ Experience & Certifications
✅ AI Chatbot Assistant
✅ Animated Login Page
✅ Contact Form
✅ SEO Optimized
✅ Deployment Ready (Netlify/Vercel)

---

**Your portfolio is production-ready! 🎉**
