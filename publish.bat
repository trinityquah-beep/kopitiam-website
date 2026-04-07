@echo off
echo ==========================================
echo   Kopitiam Rasa Website - GitHub Publisher
echo ==========================================
echo.

REM Check if git is installed
where git >nul 2>nul
if errorlevel 1 (
    echo ❌ Git is not installed.
    echo    Download from: https://git-scm.com/
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

set /p GITHUB_USERNAME="📝 Enter your GitHub username: "
set /p REPO_NAME="📝 Enter repository name (default: kopitiam-website): "

if "%REPO_NAME%"=="" set REPO_NAME=kopitiam-website

echo.
echo 🔐 GitHub Authentication
echo -----------------------
echo 1. Use HTTPS with username/password (easiest)
echo 2. Use SSH key (more secure)
echo.
set /p AUTH_OPTION="Choose option (1 or 2): "

if "%AUTH_OPTION%"=="1" (
    set REMOTE_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
    echo.
    echo 📦 Using HTTPS method...
    echo Note: If you have 2FA, use a Personal Access Token as password.
    echo Get token from: https://github.com/settings/tokens
) else if "%AUTH_OPTION%"=="2" (
    set REMOTE_URL=git@github.com:%GITHUB_USERNAME%/%REPO_NAME%.git
    echo.
    echo 🔑 Using SSH method...
    echo Make sure SSH key is added to GitHub.
    echo Add key at: https://github.com/settings/keys
) else (
    set REMOTE_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
    echo.
    echo ⚠️ Invalid option. Using HTTPS method.
)

echo.
echo 📊 Summary:
echo -----------
echo Username: %GITHUB_USERNAME%
echo Repository: %REPO_NAME%
echo Remote URL: %REMOTE_URL%
echo.

set /p CONTINUE="Continue? (y/n): "
if /i not "%CONTINUE%"=="y" (
    echo ❌ Cancelled.
    pause
    exit /b 0
)

echo.
echo 🔄 Step 1: Creating GitHub repository...
echo    Visit: https://github.com/new
echo    Repository name: %REPO_NAME%
echo    DO NOT initialize with README
echo    Click 'Create repository'
echo.
pause

echo.
echo 🔄 Step 2: Adding remote and pushing code...

REM Check if remote exists
git remote | findstr origin >nul
if errorlevel 1 (
    echo ➕ Adding remote: %REMOTE_URL%
    git remote add origin %REMOTE_URL%
) else (
    echo ⚠️ Remote 'origin' already exists. Updating...
    git remote set-url origin %REMOTE_URL%
)

echo 📤 Pushing code to GitHub...
git push -u origin main
if errorlevel 1 (
    echo ❌ Push failed. You may need to authenticate.
    echo    Try running: git push -u origin main
    echo    Enter GitHub username and password/token when prompted.
    pause
    exit /b 1
)

echo ✅ Code pushed successfully!
echo.
echo 🔄 Step 3: Enabling GitHub Pages...
echo    Visit: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%/settings/pages
echo    Under 'Source':
echo      - Branch: main
echo      - Folder: / (root)
echo    Click 'Save'
echo.
echo 🌐 Your website will be available at:
echo    https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/
echo.
echo ⏳ Wait 1-2 minutes for GitHub Pages to deploy.
echo.
echo 🎉 Done! Your kopitiam website is now on GitHub!

echo https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/ > website-url.txt
echo.
echo 📄 Website URL saved to: website-url.txt
pause