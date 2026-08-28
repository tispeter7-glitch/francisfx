FRANCIS FX ACADEMY — Static Website
=================================

This repository contains a premium, responsive, static website for FRANCIS FX ACADEMY (HTML, CSS, JavaScript). The site is educational only — it does not give financial advice or promise trading profits. Use this README to preview locally and deploy to GitHub Pages.

Contents
--------
- index.html — main site
- styles.css — dark, premium theme
- script.js — interactive behavior (menu, dashboard, progress, toasts)

Quick DNS and Pages checklist (make site live on www.francisfxacademy.com)
---------------------------------------------------------------------------
Follow these exact steps to make the custom domain live and enable HTTPS.

1) Add DNS records at your domain registrar/DNS host
- Create a CNAME record for the www host:
  - Host / Name: www
  - Type: CNAME
  - Value / Target: tispeter7-glitch.github.io
  - TTL: use default (e.g., 3600)

- (Optional) To serve the apex domain (francisfxacademy.com) and redirect to www, either:
  a) Add A records for the apex to GitHub Pages IPs (recommended):
     - Name: @ (or blank depending on provider)
     - Type: A
     - Values:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
  b) Or use your registrar's forwarding/redirect to forward francisfxacademy.com → https://www.francisfxacademy.com

2) Verify DNS propagation (examples)
- macOS / Linux:
  - dig +short CNAME www.francisfxacademy.com
  - dig +short www.francisfxacademy.com
  - curl -I -L https://www.francisfxacademy.com

- Windows (PowerShell):
  - nslookup www.francisfxacademy.com
  - curl.exe -I -L https://www.francisfxacademy.com

3) GitHub Pages & HTTPS
- A CNAME file is present in this repo with the domain: www.francisfxacademy.com
- Once DNS resolves, GitHub will provision TLS automatically. In the repo Settings → Pages you should see the custom domain and an option to "Enforce HTTPS". Enable it if available.

4) Troubleshooting
- If DNS doesn't resolve, check there are no conflicting records for the same host (e.g., both CNAME and A record for www).
- Use ALIAS/ANAME when your DNS provider supports them for apex records.

5) Want me to verify?
- After you add the CNAME (and optional apex records), tell me and I'll poll the domain, confirm HTTPS, and verify the live site content.



Local preview
-------------
Quick options to preview the site locally (no build step required):

1) Open directly
- Double-click index.html or open it from your browser (good for basic testing).

2) Simple local HTTP server (recommended)
- Python 3:  python -m http.server 8000
  then open http://localhost:8000

- Node (http-server):  npx http-server -p 8080
  then open http://localhost:8080

Deploy to GitHub Pages (manual)
------------------------------
1. Commit & push the branch to GitHub:
   git add -A
   git commit -m "Add Francis FX Academy site"
   git push origin <branch-name>

2. On GitHub (UI):
   - Go to the repository Settings → Pages
   - Under "Build and deployment" or "Source" choose Branch: select your branch (e.g., main or the feature branch) and folder: / (root)
   - Save. GitHub will publish a site and show the URL (https://<user>.github.io/<repo>/).

Deploy to GitHub Pages (Actions - recommended for branch builds)
-------------------------------------------------------------
If you prefer automatic publishing via GitHub Actions, create a workflow that builds (if needed) and deploys the static files. Example flow (recommended pattern):

- Use the official Pages Actions: actions/upload-pages-artifact and actions/deploy-pages.
- Create file: .github/workflows/pages.yml with a job that uploads the site contents and calls deploy-pages.

Example (brief):

  name: Deploy to GitHub Pages
  on:
    push:
      branches: [ main ]
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - name: Upload artifact
          uses: actions/upload-pages-artifact@v1
          with:
            path: '.'
        - name: Deploy
          uses: actions/deploy-pages@v1

After the workflow finishes the site will be available at the Pages URL for your repo.

Custom domain
-------------
- Add a CNAME file at repository root containing your domain name (one line).
- Configure your DNS provider: point A records to GitHub Pages IP addresses or set an ALIAS/ANAME as required.
- In GitHub Pages settings, set the custom domain and enable HTTPS.

Notes & next steps
------------------
- Payment & enrollment are demo placeholders. Integrate a secure payment provider (Stripe/PayPal) and a backend for real enrollment and authentication.
- The dashboard uses localStorage for demo progress — move to a secure server-side store for production and user accounts.
- Add server-side form handling or a service (Formspree, Netlify Forms) to accept contact messages.
- Replace demo content with real lessons (video hosting, protected assets) before providing paid access.

Disclaimer
----------
Forex and margin trading involve substantial risk. This site provides educational material only and is not financial advice. Do not risk money you cannot afford to lose. Consult a licensed financial professional for investment advice.

Support
-------
If you want a deployment workflow added (GitHub Actions), a README update with a custom domain example, or an example pages.yml committed to the repo, tell me which option and I will add it.

Adding a GH_PAGES_PAT (optional, recommended for reliable CI deploys)
----------------------------------------------------------------------
By default the workflow uses the built-in GITHUB_TOKEN. In some org or repo settings the GITHUB_TOKEN may not have permission to push a deployment branch. To make CI pushes reliable, create a Personal Access Token (PAT) with minimal scopes and add it as a repository secret named GH_PAGES_PAT.

1) Create a PAT
- Go to https://github.com/settings/tokens → Generate new token
- Scopes: repo (full control of private repos) OR select 'public_repo' for public-only repos. Keep other scopes minimal.
- Copy the token (you will not be able to see it again).

2) Add the secret to the repository
- Go to the repository on GitHub → Settings → Secrets & variables → Actions → New repository secret
- Name: GH_PAGES_PAT
- Value: paste the token

3) Workflow uses the secret
- The provided .github/workflows/pages.yml checks for GH_PAGES_PAT and uses it when available. If not set, it falls back to GITHUB_TOKEN.

4) Re-run workflow
- After adding the secret, re-run the workflow from the Actions UI or push a new commit to main to trigger an automatic deploy.

License
-------
Use and adapt the files in this repo as you wish. No warranty. 
