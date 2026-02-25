# Deploy the site for free (Vercel)

These steps get your portfolio live at a public URL (e.g. `ella-wright-art.vercel.app`) for free.

## 1. Put the project on GitHub

If the project isn’t in a Git repo yet:

```bash
cd "/Users/josephwright/Person Projects/EllaWrightArt"
git init
git add .
git commit -m "Initial commit"
```

Then create a new repository on [GitHub](https://github.com/new) (e.g. `EllaWrightArt`), and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/EllaWrightArt.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username.)

## 2. Deploy with Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign up (or log in). Use “Continue with GitHub” so Vercel can see your repos.

2. Click **“Add New…” → “Project”**.

3. **Import** the `EllaWrightArt` repo (or whatever you named it).  
   - Vercel will detect Next.js.  
   - Leave all settings as default (Framework: Next.js, Root Directory: `.`, Build Command: `next build`, etc.).

4. Click **“Deploy”**.

5. Wait a couple of minutes. When it’s done, you’ll get a URL like:
   - `ella-wright-art.vercel.app`  
   or  
   - `ella-wright-art-xxxx.vercel.app`

That URL is your live, public site.

## 3. Updates

Whenever you push to the `main` branch on GitHub, Vercel will automatically rebuild and update the live site.

```bash
git add .
git commit -m "Update content"
git push
```

## Optional: custom domain

In the Vercel project: **Settings → Domains**. Add a domain you own (e.g. `ellawright.art`). Vercel will show what to set at your domain registrar (DNS). Their free tier includes custom domains.

## Note about the secret editor

The edit page and its “secret unlock” use **localStorage** in the browser. So:

- Changes made in the editor are stored only on the device/browser where you edited.
- To update the live site for everyone, edit the content in the code (e.g. `lib/site.ts`, `lib/data.ts`, `lib/about.ts`) and push to GitHub so Vercel redeploys.

If you later want edits to be saved for all visitors, you’d need a backend or database; for now, “public and free” means the site is live and readable by everyone, and you update it by changing the code and pushing.
