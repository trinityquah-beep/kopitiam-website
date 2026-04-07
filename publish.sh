#!/bin/bash

# Kopitiam Rasa Website - GitHub Publisher
# Run this script to publish your website to GitHub

echo "🚀 Kopitiam Rasa Website GitHub Publisher"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    echo "   Ubuntu/Debian: sudo apt-get install git"
    echo "   macOS: brew install git"
    echo "   Windows: Download from https://git-scm.com/"
    exit 1
fi

echo "✅ Git is installed: $(git --version)"
echo ""

# Ask for GitHub username
read -p "📝 Enter your GitHub username: " GITHUB_USERNAME

# Ask for repository name
read -p "📝 Enter repository name (default: kopitiam-website): " REPO_NAME
REPO_NAME=${REPO_NAME:-kopitiam-website}

# Ask for GitHub token (optional)
echo ""
echo "🔐 GitHub Authentication"
echo "-----------------------"
echo "You need to authenticate with GitHub. Choose an option:"
echo "1. Use HTTPS with username/password (easiest)"
echo "2. Use SSH key (more secure)"
echo "3. Use GitHub CLI (if installed)"
echo ""
read -p "Choose option (1, 2, or 3): " AUTH_OPTION

case $AUTH_OPTION in
    1)
        echo ""
        echo "📦 Using HTTPS method..."
        echo "Note: If you have 2FA enabled, use a Personal Access Token as password."
        echo "Get token from: https://github.com/settings/tokens"
        echo ""
        REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        ;;
    2)
        echo ""
        echo "🔑 Using SSH method..."
        echo "Make sure you have SSH key added to GitHub."
        echo "Add key at: https://github.com/settings/keys"
        echo ""
        REMOTE_URL="git@github.com:$GITHUB_USERNAME/$REPO_NAME.git"
        ;;
    3)
        if command -v gh &> /dev/null; then
            echo ""
            echo "🛠️ Using GitHub CLI..."
            REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        else
            echo "❌ GitHub CLI not installed. Falling back to HTTPS."
            REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        fi
        ;;
    *)
        echo "❌ Invalid option. Using HTTPS method."
        REMOTE_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
        ;;
esac

echo ""
echo "📊 Summary:"
echo "-----------"
echo "Username: $GITHUB_USERNAME"
echo "Repository: $REPO_NAME"
echo "Remote URL: $REMOTE_URL"
echo ""

read -p "Continue? (y/n): " CONTINUE
if [[ "$CONTINUE" != "y" && "$CONTINUE" != "Y" ]]; then
    echo "❌ Cancelled."
    exit 0
fi

echo ""
echo "🔄 Step 1: Creating GitHub repository..."
echo "   Visit: https://github.com/new"
echo "   Repository name: $REPO_NAME"
echo "   DO NOT initialize with README"
echo "   Click 'Create repository'"
echo ""
read -p "Press Enter after creating the repository..."

echo ""
echo "🔄 Step 2: Adding remote and pushing code..."
cd "$(dirname "$0")"

# Check if remote already exists
if git remote | grep -q origin; then
    echo "⚠️ Remote 'origin' already exists. Updating..."
    git remote set-url origin "$REMOTE_URL"
else
    echo "➕ Adding remote: $REMOTE_URL"
    git remote add origin "$REMOTE_URL"
fi

echo "📤 Pushing code to GitHub..."
if git push -u origin main; then
    echo "✅ Code pushed successfully!"
else
    echo "❌ Push failed. You may need to authenticate."
    echo "   Try running: git push -u origin main"
    echo "   Enter your GitHub username and password/token when prompted."
    exit 1
fi

echo ""
echo "🔄 Step 3: Enabling GitHub Pages..."
echo "   Visit: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages"
echo "   Under 'Source':"
echo "     - Branch: main"
echo "     - Folder: / (root)"
echo "   Click 'Save'"
echo ""
echo "🌐 Your website will be available at:"
echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏳ Wait 1-2 minutes for GitHub Pages to deploy."
echo ""
echo "🎉 Done! Your kopitiam website is now on GitHub!"

# Create a test URL file
echo "https://$GITHUB_USERNAME.github.io/$REPO_NAME/" > website-url.txt
echo ""
echo "📄 Website URL saved to: website-url.txt"