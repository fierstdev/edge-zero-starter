import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { App } from 'octokit';

type Bindings = {
  PAYLOAD_API_URL: string;
  GITHUB_APP_ID: string;
  GITHUB_APP_PRIVATE_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for dashboard communication
app.use('/*', cors({
  origin: ['http://localhost:3000', 'https://edgezero.dev'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

app.get('/', (c) => {
  return c.text('Edge Zero Control Plane API is running.');
});

app.post('/projects/create', async (c) => {
  const authHeader = c.req.header('Authorization');
  let token = '';

  if (authHeader && authHeader.startsWith('Bearer ')) {
    // The CLI passes 'Bearer [API_KEY]'
    token = authHeader.substring(7);
  }

  if (!token) {
    return c.json({ error: 'Unauthorized. Missing API Key.' }, 401);
  }

  const body = await c.req.json().catch(() => ({}));
  const { name } = body;

  if (!name) {
    return c.json({ error: 'Project name is required' }, 400);
  }

  // 1. Validate user token against Payload CMS
  const payloadUrl = c.env.PAYLOAD_API_URL || 'http://localhost:3000';
  const userReq = await fetch(`${payloadUrl}/api/users/me`, {
    headers: {
      'Authorization': `users API-Key ${token}`,
    }
  });

  if (!userReq.ok) {
    return c.json({ error: 'Unauthorized. Invalid Edge Zero API Key.' }, 401);
  }

  const { user } = await userReq.json() as any;

  if (!user || !user.githubInstallationId) {
    return c.json({ error: 'GitHub account not linked. Please install the Edge Zero GitHub App.' }, 400);
  }

  console.log(`[API Worker] Provisioning repository ${name} on behalf of GitHub Installation ${user.githubInstallationId}`);

  // 2. Initialize GitHub App
  // Cloudflare .dev.vars sometimes passes literal "\n" strings instead of actual linebreaks,
  // which breaks the crypto parser. We replace them here.
  const privateKey = c.env.GITHUB_APP_PRIVATE_KEY.replace(/\\n/g, '\n');
  
  const ghApp = new App({
    appId: c.env.GITHUB_APP_ID,
    privateKey: privateKey,
  });

  try {
    // 3. Get an installation octokit instance for the specific user
    const octokit = await ghApp.getInstallationOctokit(user.githubInstallationId);

    // 4. Hit the repository generation endpoint
    // POST /repos/{template_owner}/{template_repo}/generate
    const response = await octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
      template_owner: 'austinfierst',
      template_repo: 'edge-zero-starter',
      name: name,
      private: true,
      include_all_branches: false,
    });

    const newRepoUrl = response.data.clone_url;

    return c.json({
      success: true,
      repoUrl: newRepoUrl,
      message: 'Repository provisioned successfully via GitHub App',
    });
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    return c.json({ error: `Failed to provision repository: ${error.message}` }, 500);
  }
});

export default app;
