# Quick Publish to GitHub

## 🚀 **One-Page Instructions**

### **1. Create GitHub Repository**
1. Go to: https://github.com/new
2. Repository name: `kopitiam-website`
3. **DO NOT** initialize with README
4. Click "Create repository"

### **2. Run These Commands**
```bash
cd /data/.openclaw/workspace/kopitiam-website

# Add remote (replace YOUR_USERNAME):
git remote add origin https://github.com/YOUR_USERNAME/kopitiam-website.git

# Push to GitHub:
git push -u origin main
```

### **3. Enable GitHub Pages**
1. Go to: `https://github.com/YOUR_USERNAME/kopitiam-website/settings/pages`
2. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
3. Click "Save"

### **4. Your Website URL**
Wait 2 minutes, then visit:
`https://YOUR_USERNAME.github.io/kopitiam-website/`

---

## 🔐 **If Asked for Password:**
Use GitHub Personal Access Token:
1. Go to: https://github.com/settings/tokens
2. Generate new token (classic)
3. Select: `repo` (all)
4. Copy token and use as password

---

## 📱 **Quick Test**
Open `index.html` in browser to preview locally first!

---

**Need help?** See detailed guide in `GITHUB_PUBLISH_GUIDE.md`