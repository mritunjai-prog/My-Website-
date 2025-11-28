# Deployment Guide

This guide covers how to deploy your portfolio to various platforms.

## 📦 Pre-Deployment Checklist

- [ ] Update personal information in all components
- [ ] Replace placeholder image in `src/assets/profile.jpg`
- [ ] Update project URLs in `src/components/Projects.tsx`
- [ ] Update social media links (GitHub, LinkedIn)
- [ ] Test the build locally: `npm run build && npm run preview`
- [ ] Update meta tags in `index.html`
- [ ] Add your custom domain (if applicable)

## 🚀 Netlify Deployment

### Method 1: Using Netlify UI (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
6. Click "Deploy site"

### Method 2: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Netlify Environment Variables

If you need environment variables:
1. Go to Site settings → Build & deploy → Environment
2. Add your variables
3. Redeploy

## 🔷 Vercel Deployment

### Method 1: Using Vercel UI (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🌐 GitHub Pages Deployment

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/portfolio"
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/portfolio/', // Replace with your repo name
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

## 🐳 Docker Deployment

1. Create `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

2. Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Build and run:
```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

## 🔧 Custom Domain Setup

### Netlify
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

### Vercel
1. Go to Project settings → Domains
2. Add your domain
3. Update your DNS records as instructed

## 🌍 Environment Variables

Create a `.env` file (never commit this):
```env
VITE_API_URL=your_api_url
VITE_ANALYTICS_ID=your_analytics_id
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📊 Analytics Setup (Optional)

### Google Analytics

1. Add to `index.html` before `</head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Headers

Add to `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

## 🐛 Troubleshooting

### Build Fails
- Check Node version (should be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### 404 Errors on Refresh
- Ensure redirect rules are set (already in netlify.toml and vercel.json)
- For other platforms, configure your server to redirect all routes to index.html

### Slow Load Times
- Enable CDN on your hosting platform
- Optimize images before deployment
- Consider lazy loading for heavy components

## 📈 Performance Optimization

1. **Image Optimization**: Use WebP format and compress images
2. **Code Splitting**: Already handled by Vite
3. **Caching**: Configure cache headers in your hosting platform
4. **Minification**: Automatically done during build

## ✅ Post-Deployment

- [ ] Test all links and buttons
- [ ] Verify responsive design on different devices
- [ ] Check page load speed (use Lighthouse)
- [ ] Test dark/light mode toggle
- [ ] Verify contact form submission
- [ ] Set up SSL certificate (usually automatic)
- [ ] Add site to Google Search Console
- [ ] Share on social media!

## 🆘 Support

If you encounter issues:
1. Check the [Issues](https://github.com/mritunjai-prog/portfolio/issues) page
2. Review platform-specific documentation
3. Create a new issue with details

---

Happy deploying! 🎉
