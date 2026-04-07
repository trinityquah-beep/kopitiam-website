# 🔥 JUST DO THIS - 3 Steps to Publish

## **Step 1: Click This Link**
👉 https://github.com/new?name=kopitiam-website&description=Website%20for%20Kopitiam%20Rasa&private=false

**On the page that opens:**
- ✅ Repository name is already filled: `kopitiam-website`
- ✅ Description is already filled
- ✅ Public is already selected
- ❌ **IMPORTANT:** UNCHECK "Initialize with README"
- Click **"Create repository"**

## **Step 2: Copy & Paste These 2 Commands**
Open Terminal/Command Prompt and run:

```bash
cd /data/.openclaw/workspace/kopitiam-website
git remote add origin https://github.com/YOUR_USERNAME/kopitiam-website.git
git push -u origin main
```

**When asked for password:** Use your GitHub password.  
**If you have 2FA:** Use a [Personal Access Token](https://github.com/settings/tokens) as password.

## **Step 3: Click This Link**
👉 https://github.com/YOUR_USERNAME/kopitiam-website/settings/pages

**On the page that opens:**
- Under "Source": Select **"Deploy from a branch"**
- Branch: **`main`**
- Folder: **`/ (root)`**
- Click **"Save"**

## **🎉 DONE!**
Your website is now at:  
**https://YOUR_USERNAME.github.io/kopitiam-website/**

Wait 1-2 minutes, then visit the link above!

---

## **📞 Need Help?**
**If Step 2 fails:**
1. Make sure you replaced `YOUR_USERNAME` with your actual GitHub username
2. Make sure you created the repository in Step 1
3. Try SSH instead: `git remote set-url origin git@github.com:YOUR_USERNAME/kopitiam-website.git`

**Still stuck?** Open `ONE_CLICK_GITHUB.html` for visual guidance.