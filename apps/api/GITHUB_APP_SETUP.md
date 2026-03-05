# Edge Zero GitHub App Setup

The Edge Zero Platform API (`apps/api`) requires a GitHub App to automatically create and manage repositories on behalf of your users.

Please complete these steps before proceeding:

## 1. Create the GitHub App
1. Go to your GitHub Organization -> **Settings** -> **Developer settings** -> **GitHub Apps** -> **New GitHub App**.
2. **GitHub App name**: `Edge Zero Platform` (or similar)
3. **Homepage URL**: `https://edgezero.dev`
4. **Webhook**: Active=False (We don't need webhooks yet).
5. **Permissions**:
   - **Repository permissions**:
     - `Administration`: **Read & write** (Needed to create repos from templates)
     - `Contents`: **Read & write** (Needed to inject files/workflows)
     - `Metadata`: **Read-only** (Mandatory)
6. **Where can this GitHub App be installed?**: **Any account** (So your users can install it).
7. Click **Create GitHub App**.

## 2. Gather Credentials
Once created, you need two things for the local `.dev.vars` file:

1. **App ID**: Found at the top of the General settings page.
2. **Private Key**: Scroll down and generate a New Private Key. It will download a `.pem` file.

## 3. Configure Local API Worker
Create a file at `apps/api/.dev.vars` and add:

```env
GITHUB_APP_ID="your-app-id"
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n..."
```

*(Note: Ensure you replace actual newlines in the private key with literal `\n` characters if your environment requires a single-line string, or keep it multi-line if Cloudflare `.dev.vars` supports it).*
