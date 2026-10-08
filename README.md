# Fresh Start Cleaning — Website + Private Request Dashboard

This package is a working Node.js website for **Fresh Start Cleaning** in Bemidji, MN and nearby surrounding areas.

## What is included

- Pink/purple public website based on the Fresh Start Cleaning branding
- Services: standard, deep, move-in/move-out, post-construction, and personalized cleaning
- Customer quote + appointment request form
- Free-text description so customers can explain exactly what they need
- Optional photo uploads (up to 5 photos, 7 MB each)
- Preferred date and time request
- Customer status tracking code
- **Private owner login** at `/owner/login`
- Private dashboard with Pending / Approved / Declined requests
- Owner can approve, keep pending, decline, or enter an alternate/confirmed date and time
- Prefilled “Text Customer” button for sending an update
- No fake reviews or testimonials

## Important behavior

A customer submission is **not an automatic booking**. It stays `pending` until the owner changes it in the private dashboard.

## Run it locally

1. Install Node.js 18 or newer.
2. Open a terminal in this folder.
3. Run:

   ```bash
   npm install
   ```

4. Copy `.env.example` to `.env`.
5. Set a strong `SESSION_SECRET` and private `OWNER_PASSWORD` in `.env`.
6. Run:

   ```bash
   npm start
   ```

7. Open `http://localhost:3000`.
8. Owner login: `http://localhost:3000/owner/login`

## Before putting it online

- Use HTTPS in production.
- Set `NODE_ENV=production` so the session cookie requires HTTPS.
- Use a strong unique owner password and long random session secret.
- This starter stores request data in `data/requests.json` and uploaded photos in `uploads/`. For higher traffic, move those to a hosted database and private object storage.
- The “Text Customer” button opens a prefilled SMS on a compatible phone/device. Fully automatic texting would require a provider such as Twilio and account credentials.
- The dashboard URL is not linked publicly, but privacy comes from the password-protected server session — not from hiding the URL.

## Deployment

This app can be deployed to a Node-compatible host. Make sure the host supports persistent storage if you keep the included JSON/photo storage. If the host has ephemeral storage, use a database + object storage before relying on it for real customer requests.
