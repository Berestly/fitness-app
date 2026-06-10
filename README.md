# 8-Week Cutting Program App

A full-featured fitness tracker with AI coaching via Claude.

## Features
- Overview, Training, Nutrition, Hair Care tabs
- Full Add / Edit / Delete for every item
- AI Coach panel — chat with Claude to edit your program
- All data saved to browser localStorage (no backend needed)
- Auto-deploys to GitHub Pages on every `git push`

---

## Deploy in 5 Steps

### Step 1: Create a GitHub repository
1. Go to https://github.com/new
2. Name it `fitness-app` (or anything you like)
3. Set it to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2: Push this code
In your terminal, inside this folder:

```bash
git init
git add .
git commit -m "Initial fitness app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitness-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **GitHub Actions**
4. Click **Save**

### Step 4: Set homepage in package.json
Edit `package.json` and add this line:
```json
"homepage": "https://YOUR_USERNAME.github.io/fitness-app"
```

Then push again:
```bash
git add package.json
git commit -m "Set homepage"
git push
```

### Step 5: Wait 2 minutes
GitHub Actions will automatically build and deploy your app.
Your app will be live at: **https://YOUR_USERNAME.github.io/fitness-app**

---

## Auto-updates

Every time you push code, GitHub Actions automatically rebuilds and redeploys.
No need to download or reinstall anything.

```bash
# Make a change, then:
git add .
git commit -m "Update workout targets"
git push
# App updates in ~2 minutes automatically
```

---

## AI Coach Setup

1. Open the app in your browser
2. Click the AI Coach panel on the right
3. Click **"Get your API key →"** — this takes you to Anthropic Console
4. Create an account and copy your API key (starts with `sk-ant-`)
5. Paste it in the app and click **Connect**

Your API key is stored only in your browser's localStorage. It's never sent anywhere except directly to Anthropic's API.

---

## Local Development

```bash
npm install
npm start
```

Opens at http://localhost:3000

---

## Reset Data

Click **"Reset to defaults"** in the top-right corner to restore the original program data.
