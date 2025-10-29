# 🚀 Deployment Guide - Morocco Tactical Planner

This guide will help you deploy the Morocco Tactical Planner application to various hosting platforms.

---

## 📋 Prerequisites

- GitHub account
- Account on your chosen platform (Vercel, Netlify, etc.)

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest and fastest way to deploy this application.

#### Quick Deploy (One-Click)

1. **Fork or Push this repository to your GitHub account**

2. **Visit Vercel and Import**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub: `rachidfrex/mo-tactical-planner`

3. **Configure Project**
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd mo-tactical-planner

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Automatic Deployments
- Every push to `main` branch will automatically deploy
- Pull requests get preview deployments

---

### Option 2: Netlify

#### Quick Deploy

1. **Visit Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect Repository**
   - Choose GitHub
   - Select `rachidfrex/mo-tactical-planner`

3. **Build Settings** (Auto-detected via netlify.toml)
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**
   - Click "Deploy site"
   - Site will be live at `https://your-site.netlify.app`

#### Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

### Option 3: GitHub Pages

#### Setup

1. **Add to `vite.config.js`:**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mo-tactical-planner/', // Replace with your repo name
})
```

2. **Install gh-pages:**

```bash
npm install --save-dev gh-pages
```

3. **Add to `package.json` scripts:**

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy:**

```bash
npm run deploy
```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

Your site will be at: `https://rachidfrex.github.io/mo-tactical-planner/`

---

### Option 4: Railway

1. **Visit Railway**
   - Go to [railway.app](https://railway.app)
   - Click "Start a New Project"

2. **Deploy from GitHub**
   - Select your repository
   - Railway will auto-detect Vite

3. **Configure**
   - Build Command: `npm run build`
   - Start Command: `npm run preview`

---

## 🔧 Configuration Files

The repository includes configuration files for easy deployment:

- **`vercel.json`**: Vercel configuration
- **`netlify.toml`**: Netlify configuration
- **`.gitignore`**: Prevents build artifacts from being committed

---

## 🌍 Environment Considerations

### Map Tiles
The application uses OpenStreetMap tiles. In production:
- Tiles load from `https://tile.openstreetmap.org`
- No API key required (free for low-volume use)
- For high-volume production, consider:
  - MapTiler: [maptiler.com](https://maptiler.com)
  - Mapbox: [mapbox.com](https://mapbox.com)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- WebGL support required for map rendering
- JavaScript must be enabled

---

## 📊 Build Output

Expected build size:
- HTML: ~0.5 KB
- CSS: ~77 KB (12 KB gzipped)
- JavaScript: ~1.7 MB (495 KB gzipped)

Build time: ~7 seconds

---

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- Solution: Delete `node_modules` and `package-lock.json`, run `npm install`

**Error: Memory issues**
- Solution: Increase Node memory: `NODE_OPTIONS=--max_old_space_size=4096 npm run build`

### Map Not Loading

**Blank map area**
- Check browser console for errors
- Verify internet connection (tiles load from external source)
- Check if WebGL is enabled in browser

### PDF Export Not Working

**PDF generation fails**
- html2canvas requires CORS-compliant images
- Map screenshots may fail if tiles haven't loaded

---

## 🚦 Quick Start Summary

**Fastest deployment (2 minutes):**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repository
4. Click Deploy
5. ✅ Done! App is live

**Your deployment URLs will look like:**
- Vercel: `https://mo-tactical-planner.vercel.app`
- Netlify: `https://mo-tactical-planner.netlify.app`
- GitHub Pages: `https://rachidfrex.github.io/mo-tactical-planner/`

---

## 📱 Custom Domain (Optional)

After deployment, you can add a custom domain:

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain: `tactical-planner.ma`
3. Update DNS records as instructed

**Netlify:**
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS

---

## 🔄 Continuous Deployment

Both Vercel and Netlify support automatic deployments:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests get preview URLs
- **Rollback**: Easily revert to previous deployments

---

## 💡 Recommended Setup

For this project, I recommend **Vercel** because:
- ✅ Zero configuration (works out of the box)
- ✅ Fastest build times
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Free tier is generous
- ✅ Excellent performance for React + Vite apps

---

## 📞 Support

If you encounter issues:
1. Check build logs in your platform dashboard
2. Verify `package.json` dependencies are correct
3. Test build locally: `npm run build && npm run preview`

---

**Ready to deploy? Choose your platform above and follow the steps!** 🚀
