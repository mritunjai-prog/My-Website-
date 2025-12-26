# OAuth Setup Guide for GitHub & LinkedIn Login

## Overview

This guide will help you configure GitHub and LinkedIn authentication for your portfolio website using Supabase Auth.

---

## Part 1: Supabase Configuration

### Step 1: Enable OAuth Providers in Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. You'll see a list of authentication providers

---

## Part 2: GitHub OAuth Setup

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: `Your Portfolio Name` (e.g., "Mritunjai's Portfolio")
   - **Homepage URL**: Your production URL
     - Development: `http://localhost:5173`
     - Production: `https://your-domain.com` or `https://your-vercel-app.vercel.app`
   - **Application description**: (Optional) "Portfolio website authentication"
   - **Authorization callback URL**: Get this from Supabase (see below)
4. Click **"Register application"**

### Step 2: Get Supabase Callback URL

1. In Supabase Dashboard → Authentication → Providers
2. Find **GitHub** provider
3. Copy the **Callback URL** (looks like: `https://your-project.supabase.co/auth/v1/callback`)

### Step 3: Add Callback URL to GitHub

1. In your GitHub OAuth App settings
2. Paste the Supabase callback URL in **Authorization callback URL**
3. Click **"Update application"**

### Step 4: Get GitHub Credentials

1. You'll see **Client ID** on the page
2. Click **"Generate a new client secret"**
3. Copy both **Client ID** and **Client Secret**

### Step 5: Configure in Supabase

1. Go back to Supabase → Authentication → Providers → **GitHub**
2. Toggle **"GitHub Enabled"** to ON
3. Paste your **Client ID**
4. Paste your **Client Secret**
5. Click **"Save"**

---

## Part 3: LinkedIn OAuth Setup

### Step 1: Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **"Create app"**
3. Fill in the details:
   - **App name**: `Your Portfolio Name`
   - **LinkedIn Page**: Select your company page (or create one if needed)
   - **App logo**: Upload a logo (at least 100x100px)
   - **Legal agreement**: Check the box and agree
4. Click **"Create app"**

### Step 2: Configure OAuth Settings

1. In your app dashboard, go to **"Auth"** tab
2. Add **Redirect URLs**:
   - Get the callback URL from Supabase (Authentication → Providers → LinkedIn)
   - Add: `https://your-project.supabase.co/auth/v1/callback`
3. Click **"Update"**

### Step 3: Request Required Scopes

1. Go to **"Products"** tab
2. Request **"Sign In with LinkedIn using OpenID Connect"**
3. Wait for approval (usually instant)

### Step 4: Get LinkedIn Credentials

1. Go to **"Auth"** tab
2. Copy **Client ID**
3. Copy **Client Secret**

### Step 5: Configure in Supabase

1. Go to Supabase → Authentication → Providers → **LinkedIn (OIDC)**
2. Toggle **"LinkedIn (OIDC) Enabled"** to ON
3. Paste your **Client ID**
4. Paste your **Client Secret**
5. Click **"Save"**

---

## Part 4: Local Environment Setup

### Step 1: Create .env File

Create a `.env` file in your project root (copy from `.env.example`):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_API_URL=http://localhost:5000
```

### Step 2: Get Supabase Credentials

1. Go to Supabase Dashboard → Settings → API
2. Copy **Project URL** → paste as `VITE_SUPABASE_URL`
3. Copy **anon public** key → paste as `VITE_SUPABASE_ANON_KEY`

### Step 3: Test Locally

```bash
npm run dev
```

Go to `http://localhost:5173/login` and try logging in with GitHub or LinkedIn.

---

## Part 5: Vercel Deployment Setup

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Name                     | Value                              |
| ------------------------ | ---------------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL          |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key             |
| `VITE_API_URL`           | Your backend API URL (if separate) |

4. Select **All** environments (Production, Preview, Development)
5. Click **"Save"**

### Step 2: Update OAuth Redirect URLs

After deploying to Vercel, you need to update the OAuth apps:

#### For GitHub:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Edit your OAuth App
3. Update **Homepage URL** to your Vercel URL: `https://your-app.vercel.app`
4. **Authorization callback URL** remains the same (Supabase URL)

#### For LinkedIn:

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Edit your app → **Auth** tab
3. The redirect URL remains the same (Supabase URL)

### Step 3: Add Production URL to Supabase

1. Go to Supabase → Authentication → URL Configuration
2. Add your Vercel URL to **Site URL**: `https://your-app.vercel.app`
3. Add to **Redirect URLs**:
   - `https://your-app.vercel.app/**`
   - `http://localhost:5173/**` (for local development)

### Step 4: Redeploy

```bash
git add .
git commit -m "Add OAuth authentication"
git push origin main
```

Vercel will automatically redeploy with the new environment variables.

---

## Troubleshooting

### Issue: "OAuth not responding"

**Possible causes:**

1. ❌ Missing environment variables in Vercel
2. ❌ Incorrect callback URLs in GitHub/LinkedIn
3. ❌ OAuth provider not enabled in Supabase
4. ❌ Site URL not configured in Supabase

**Solution:**

- Verify all environment variables are set in Vercel
- Double-check callback URLs match exactly
- Ensure providers are toggled ON in Supabase
- Add your domain to Supabase redirect URLs

### Issue: "Redirect URI mismatch"

**Solution:**

- The callback URL must be the Supabase URL, NOT your app URL
- Format: `https://your-project.supabase.co/auth/v1/callback`

### Issue: "Missing Client ID or Secret"

**Solution:**

- Re-check credentials in Supabase Dashboard
- Regenerate secrets if necessary
- Save changes in Supabase after pasting credentials

### Issue: "LinkedIn 'access_denied'"

**Solution:**

- Make sure you requested "Sign In with LinkedIn using OpenID Connect" product
- Wait for approval (check Products tab)
- Use `linkedin_oidc` provider (not `linkedin`)

---

## Testing Checklist

- [ ] Created GitHub OAuth App
- [ ] Added GitHub credentials to Supabase
- [ ] Created LinkedIn App
- [ ] Added LinkedIn credentials to Supabase
- [ ] Added environment variables to .env
- [ ] Tested GitHub login locally
- [ ] Tested LinkedIn login locally
- [ ] Added environment variables to Vercel
- [ ] Updated OAuth redirect URLs for production
- [ ] Configured Site URL in Supabase
- [ ] Tested GitHub login on Vercel
- [ ] Tested LinkedIn login on Vercel

---

## Quick Reference

### GitHub OAuth Flow

```
User clicks "GitHub" → Supabase redirects to GitHub →
User approves → GitHub redirects to Supabase →
Supabase creates session → Redirects to your app
```

### LinkedIn OAuth Flow

```
User clicks "LinkedIn" → Supabase redirects to LinkedIn →
User approves → LinkedIn redirects to Supabase →
Supabase creates session → Redirects to your app
```

### Important URLs

- **GitHub OAuth Apps**: https://github.com/settings/developers
- **LinkedIn Developers**: https://www.linkedin.com/developers/apps
- **Supabase Dashboard**: https://supabase.com/dashboard
- **Vercel Dashboard**: https://vercel.com/dashboard

---

## Next Steps

After OAuth is working:

1. ✅ Add user profile page
2. ✅ Implement logout functionality
3. ✅ Add protected routes
4. ✅ Display user info in navbar
5. ✅ Add session persistence

---

## Need Help?

- Supabase Auth Docs: https://supabase.com/docs/guides/auth
- GitHub OAuth Docs: https://docs.github.com/en/developers/apps/building-oauth-apps
- LinkedIn OAuth Docs: https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
