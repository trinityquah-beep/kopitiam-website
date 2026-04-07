# GitHub Publishing Guide for Kopitiam Rasa Website

## 📋 **Step-by-Step Instructions**

### **Step 1: Create a GitHub Account (if you don't have one)**
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process

### **Step 2: Create a New Repository**
1. Log in to GitHub
2. Click the "+" icon in the top right corner → "New repository"
3. Fill in the details:
   - **Repository name:** `kopitiam-rasa-website` (or any name you prefer)
   - **Description:** "Website for Kopitiam Rasa - Traditional Malaysian Coffee Shop"
   - **Visibility:** Public (for GitHub Pages)
   - **Initialize with README:** ❌ **UNCHECK THIS** (we already have files)
   - Click "Create repository"

### **Step 3: Connect Local Repository to GitHub**
After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Navigate to your website folder
cd /data/.openclaw/workspace/kopitiam-website

# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kopitiam-rasa-website.git

# Push your code to GitHub
git push -u origin main
```

### **Step 4: Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click "Settings" (top right, gear icon)
3. In the left sidebar, click "Pages"
4. Under "Source", select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click "Save"
6. Wait a few minutes for GitHub to deploy your site
7. Your website will be available at: `https://YOUR_USERNAME.github.io/kopitiam-rasa-website/`

## 🚀 **Alternative: Using GitHub Desktop**

### **Option A: GitHub Desktop (Easier)**
1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Open GitHub Desktop
3. Click "File" → "Add Local Repository"
4. Browse to: `/data/.openclaw/workspace/kopitiam-website`
5. Click "Add Repository"
6. Click "Publish repository" (top right)
7. Fill in details and publish to GitHub

## 🔧 **Troubleshooting**

### **If you get authentication errors:**
```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/kopitiam-rasa-website.git
```

### **If you need to generate SSH key:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Follow prompts, then add the key to GitHub:
# Settings → SSH and GPG keys → New SSH key
```

## 📁 **Repository Structure**
Your repository contains:
```
├── index.html                    # Main website file
├── css/style.css                 # All styles
├── js/script.js                  # All JavaScript
├── README.md                     # Project documentation
├── .gitignore                    # Files to ignore
├── CNAME                         # Custom domain config
├── favicon.html                  # Favicon instructions
├── google-maps-instructions.html # Google Maps setup guide
└── .github/workflows/deploy.yml  # GitHub Pages deployment
```

## 🌐 **Viewing Your Website**
Once published, your website will be available at:
- **GitHub Pages URL:** `https://YOUR_USERNAME.github.io/kopitiam-rasa-website/`
- **Custom domain (optional):** Add your domain to the `CNAME` file

## 🔄 **Updating Your Website**
To make changes and update:

```bash
# Make your changes to files
cd /data/.openclaw/workspace/kopitiam-website

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

GitHub Pages will automatically update within 1-2 minutes.

## 📞 **Need Help?**
- GitHub Docs: [docs.github.com](https://docs.github.com)
- GitHub Pages Guide: [pages.github.com](https://pages.github.com)
- Contact: hello@kopitiamrasa.com

---

**Your website is now ready to be published!** 🎉

Once published, you can share the link with customers, add it to social media, or use it for your kopitiam's online presence.