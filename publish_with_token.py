#!/usr/bin/env python3
"""
Kopitiam Rasa Website - GitHub Publisher with Token
This script helps publish your website to GitHub using a Personal Access Token.
"""

import os
import sys
import json
import subprocess
import requests
from getpass import getpass

def run_command(cmd, cwd=None):
    """Run a shell command and return output."""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd)
        return result.returncode, result.stdout, result.stderr
    except Exception as e:
        return 1, "", str(e)

def main():
    print("🚀 Kopitiam Rasa Website - GitHub Publisher")
    print("=" * 50)
    print()
    
    # Check if git is installed
    code, stdout, stderr = run_command("git --version")
    if code != 0:
        print("❌ Git is not installed. Please install git first.")
        print("   Ubuntu/Debian: sudo apt-get install git")
        print("   macOS: brew install git")
        print("   Windows: Download from https://git-scm.com/")
        sys.exit(1)
    
    print(f"✅ Git is installed: {stdout.strip()}")
    print()
    
    # Get GitHub username
    github_username = input("📝 Enter your GitHub username: ").strip()
    if not github_username:
        print("❌ GitHub username is required.")
        sys.exit(1)
    
    # Get repository name
    repo_name = input("📝 Enter repository name (default: kopitiam-website): ").strip()
    if not repo_name:
        repo_name = "kopitiam-website"
    
    # Get GitHub token
    print()
    print("🔐 GitHub Personal Access Token")
    print("-" * 30)
    print("You need a GitHub Personal Access Token with 'repo' scope.")
    print("Get one from: https://github.com/settings/tokens")
    print()
    github_token = getpass("Enter your GitHub token (hidden): ").strip()
    
    if not github_token:
        print("❌ GitHub token is required.")
        sys.exit(1)
    
    # Create repository using GitHub API
    print()
    print("🔄 Creating GitHub repository...")
    
    repo_data = {
        "name": repo_name,
        "description": "Website for Kopitiam Rasa - Traditional Malaysian Coffee Shop",
        "private": False,
        "auto_init": False  # Don't initialize with README
    }
    
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    try:
        response = requests.post(
            f"https://api.github.com/user/repos",
            headers=headers,
            json=repo_data
        )
        
        if response.status_code == 201:
            print(f"✅ Repository '{repo_name}' created successfully!")
        elif response.status_code == 422:
            print(f"⚠️ Repository '{repo_name}' might already exist. Continuing...")
        else:
            print(f"❌ Failed to create repository: {response.status_code}")
            print(f"   Error: {response.text}")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ Error creating repository: {e}")
        print("   You can create it manually at: https://github.com/new")
        print("   Remember: DO NOT initialize with README")
        print()
        input("Press Enter after creating the repository manually...")
    
    # Set remote and push
    print()
    print("🔄 Setting up git remote...")
    
    repo_path = os.path.dirname(os.path.abspath(__file__))
    
    # Check if remote exists
    code, stdout, stderr = run_command("git remote", cwd=repo_path)
    if "origin" in stdout:
        print("⚠️ Remote 'origin' already exists. Updating...")
        run_command(f"git remote set-url origin https://{github_token}@github.com/{github_username}/{repo_name}.git", cwd=repo_path)
    else:
        print("➕ Adding remote...")
        run_command(f"git remote add origin https://{github_token}@github.com/{github_username}/{repo_name}.git", cwd=repo_path)
    
    print("📤 Pushing code to GitHub...")
    code, stdout, stderr = run_command("git push -u origin main", cwd=repo_path)
    
    if code == 0:
        print("✅ Code pushed successfully!")
    else:
        print("❌ Push failed. Error:")
        print(stderr)
        print()
        print("💡 Try pushing manually:")
        print(f"   cd {repo_path}")
        print(f"   git push -u origin main")
        print("   Use your GitHub token as password")
        sys.exit(1)
    
    # Enable GitHub Pages via API
    print()
    print("🔄 Enabling GitHub Pages...")
    
    pages_data = {
        "source": {
            "branch": "main",
            "path": "/"
        }
    }
    
    try:
        response = requests.post(
            f"https://api.github.com/repos/{github_username}/{repo_name}/pages",
            headers=headers,
            json=pages_data
        )
        
        if response.status_code in [201, 200]:
            print("✅ GitHub Pages enabled!")
        else:
            print(f"⚠️ Could not enable GitHub Pages via API: {response.status_code}")
            print("   You can enable it manually:")
            print(f"   https://github.com/{github_username}/{repo_name}/settings/pages")
    
    except Exception as e:
        print(f"⚠️ Error enabling GitHub Pages: {e}")
        print("   Enable it manually:")
        print(f"   https://github.com/{github_username}/{repo_name}/settings/pages")
    
    # Success!
    print()
    print("=" * 50)
    print("🎉 SUCCESS! Your website is published!")
    print("=" * 50)
    print()
    print(f"🌐 Your website URL:")
    print(f"   https://{github_username}.github.io/{repo_name}/")
    print()
    print(f"📁 GitHub repository:")
    print(f"   https://github.com/{github_username}/{repo_name}")
    print()
    print("⏳ Wait 1-2 minutes for GitHub Pages to deploy.")
    print()
    print("📝 Next steps:")
    print("   1. Share your website URL with customers")
    print("   2. Add to social media profiles")
    print("   3. Customize with your own photos and info")
    print()
    
    # Save URL to file
    with open("website-url.txt", "w") as f:
        f.write(f"https://{github_username}.github.io/{repo_name}/\n")
    
    print("📄 Website URL saved to: website-url.txt")

if __name__ == "__main__":
    main()