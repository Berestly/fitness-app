# My 2-Month Plan — Workout + TypeScript Roadmap

A 3-panel personal tracker: workout routine with progressive overload, a TypeScript→LWC open source learning roadmap, and an AI coach.

## What's inside

| Panel | What it does |
|---|---|
| 🏋️ Workout | PPL, Upper/Lower, Full Body, PHUL — switch via ⚙️ settings. Add/Edit/Delete exercises per phase. |
| 🗺️ Roadmap | TS Basics → Intermediate → LWC Prep → LWC OSS. Click nodes to expand, click status to cycle Todo→In Progress→Done. |
| 🤖 AI Coach | Connect your Anthropic API key to chat about workouts, TypeScript, and open source. |

## Save as PDF
Click **↓ Save as PDF** in the top bar → browser print dialog → "Save as PDF". AI panel is hidden in print.

---

## Deploy (5 steps, ~5 minutes)

### Step 1 — Create GitHub repo
1. Go to https://github.com/new
2. Name it `my-plan` (or anything)
3. Set **Public** (required for free Pages)
4. Create repository

### Step 2 — Push the code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-plan.git
git push -u origin main
```

### Step 3 — Add homepage to package.json
Open `package.json`, add this line inside the top `{`:
```json
"homepage": "https://YOUR_USERNAME.github.io/my-plan",
```
Then push:
```bash
git add package.json && git commit -m "Set homepage" && git push
```

### Step 4 — Enable GitHub Pages
1. GitHub repo → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

### Step 5 — Wait ~2 minutes
Live at: `https://YOUR_USERNAME.github.io/my-plan`

---

## Auto-update (no re-download needed)

Every `git push` triggers GitHub Actions to rebuild and redeploy automatically:
```bash
git add .
git commit -m "Update week 3 exercises"
git push
# App updates in ~90 seconds
```

---

## Local dev
```bash
npm install
npm start   # opens http://localhost:3000
```

## Reset data
Click **Reset** in top-right → confirms → all edits and roadmap progress restored to defaults.
