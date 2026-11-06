# Vercel Environment Variables Import Guide

This guide explains how to import all environment variables from `mitchiesvars.json` into your new Vercel account.

## File Location
- **File:** `mitchiesvars.json` (in project root)
- **Status:** ✅ NOT committed to GitHub (in .gitignore)
- **Contains:** All production, preview, and development environment variables

## How to Import (3 Methods)

### Method 1: Vercel CLI (Recommended)
```bash
# 1. Make sure you're logged in to your NEW Vercel account
vercel login

# 2. Link to your new Vercel project
vercel link

# 3. Upload the env vars
vercel env pull

# 4. Or manually import using Vercel dashboard
```

### Method 2: Vercel Dashboard (Manual)
1. Go to your Vercel project: **vercel.com/projects**
2. Select your weedmaps project
3. Click **Settings** → **Environment Variables**
4. For each variable in `mitchiesvars.json`:
   - **Name:** Use the key (e.g., `DATABASE_URL`)
   - **Value:** Copy from the `value` field
   - **Type:** Choose from dropdown (encrypted/plain)
   - **Environments:** Select production, preview, development

### Method 3: Programmatic Import
```bash
# Using Vercel API (requires VERCEL_TOKEN)
curl -X POST "https://api.vercel.com/v10/projects/PROJECT_ID/env" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d @mitchiesvars.json
```

## Environment Variables Included

### Database (Neon PostgreSQL)
- `DATABASE_URL` - Main database connection
- `DATABASE_URL_UNPOOLED` - Unpooled connection for migrations

### Email (Resend)
- `RESEND_API_KEY` - API key for sending emails
- `MAIL_FROM` - Sender email address
- `ADMIN_EMAIL` - Admin notification email

### Images (Cloudinary)
- `CLOUDINARY_CLOUD_NAME` - Cloud account name
- `CLOUDINARY_API_KEY` - API credentials (encrypted)
- `CLOUDINARY_API_SECRET` - API secret (encrypted)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Public cloud name
- `CLOUDINARY_FOLDER` - Default folder for uploads

### Payments (NOWPayments)
- `NOWPAYMENTS_API_KEY` - Crypto payments API key
- `NOWPAYMENTS_IPN_SECRET` - Webhook secret

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Production domain

## After Import

### Verify in Vercel Dashboard
1. Go to **Settings** → **Environment Variables**
2. Confirm all variables are listed
3. Check that encrypted variables show as `[encrypted]`
4. Trigger a new deployment to apply changes

### Redeploy
```bash
# Force a new deployment to pick up the vars
vercel --prod
```

## Security Notes

✅ **Safe to keep locally:** `mitchiesvars.json` is in `.gitignore` and will never be pushed to GitHub

⚠️ **Before sharing:** Never commit this file or share it in messages

🔐 **Sensitive data:** Database credentials and API keys are marked as "encrypted" in Vercel

## If Something Goes Wrong

1. **Variables not showing?** → Check you're in the right Vercel project/team
2. **Deployment fails?** → Verify all required vars are set (check build logs)
3. **Wrong account?** → Run `vercel logout && vercel login` with correct account

## Updating Variables

When you need to update a variable:

1. **Locally:** Edit `mitchiesvars.json` and keep it in sync
2. **In Vercel:** Update via Dashboard or CLI, then pull locally:
   ```bash
   vercel env pull
   ```

## Need to Create New Variables?

1. Add to `mitchiesvars.json` locally
2. Import via Vercel CLI or Dashboard
3. Test in preview deployment first

---

**Support:** If you hit any issues during import, check Vercel's [Environment Variables Documentation](https://vercel.com/docs/projects/environment-variables)
