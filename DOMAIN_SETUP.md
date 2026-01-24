# Setting Up renaym.com Custom Domain

This guide walks you through configuring your custom domain `renaym.com` with GitHub Pages.

## Changes Made

The following files have been updated to use `renaym.com`:

1. ✅ **next.config.mjs** - Removed `/renaym` base path
2. ✅ **terraform.tfvars** - Updated `next_public_url` to `https://renaym.com`
3. ✅ **.env.local** - Added production URL comment
4. ✅ **public/CNAME** - Created with `renaym.com`

## DNS Configuration

Configure your DNS settings with your domain registrar:

### Option 1: Apex Domain (renaym.com)

Add these **A records** pointing to GitHub Pages:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### Option 2: www Subdomain (www.renaym.com)

Add a **CNAME record**:

```
Type: CNAME
Name: www
Value: paulegradie.github.io
```

### Recommended: Both Apex and www

Set up both options above, then configure one to redirect to the other in GitHub Pages settings.

## GitHub Repository Settings

1. Go to your repository: `https://github.com/paulegradie/Renaym`
2. Navigate to **Settings** → **Pages**
3. Under **Custom domain**, enter: `renaym.com`
4. Click **Save**
5. Wait for DNS check to complete (may take a few minutes)
6. Once verified, check **Enforce HTTPS** (recommended)

## Deployment

After DNS is configured and GitHub Pages settings are updated:

1. **Commit the changes**:
   ```bash
   git add .
   git commit -m "Configure custom domain renaym.com"
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the Next.js site
   - Deploy to GitHub Pages
   - Site will be available at `https://renaym.com`

## Update GitHub Secrets

Update the `WEBSITE_URL` secret in your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Update or create `WEBSITE_URL` with value: `https://renaym.com`

This ensures the Terraform deployment uses the correct CORS settings.

## Verification

After deployment completes:

1. Visit `https://renaym.com` - should load your site
2. Check that API calls work (test the pricing/checkout flow)
3. Verify HTTPS certificate is active (padlock icon in browser)

## Troubleshooting

### DNS not propagating
- DNS changes can take up to 48 hours (usually much faster)
- Check DNS propagation: https://dnschecker.org

### GitHub Pages not recognizing domain
- Ensure CNAME file is in the `out` directory after build
- Check that DNS records are correctly configured
- Try removing and re-adding the custom domain in GitHub settings

### HTTPS certificate issues
- Wait 24 hours after DNS verification
- Ensure "Enforce HTTPS" is checked in GitHub Pages settings
- Certificate is automatically provisioned by GitHub

### API CORS errors
- Ensure Terraform has been redeployed with new `next_public_url`
- Check that `API_GATEWAY_URL` secret is set correctly
- Verify Lambda CORS configuration allows `https://renaym.com`

## Next Steps

1. Configure DNS records with your registrar
2. Set custom domain in GitHub Pages settings
3. Commit and push the changes
4. Redeploy Terraform infrastructure (if needed for CORS update)
5. Test the live site!

## Additional Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Configuration Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

