import * as p from '@clack/prompts';
import Conf from 'conf';
import pc from 'picocolors';
import open from 'open';
import http from 'node:http';
import crypto from 'node:crypto';

// For local testing, we might want to point this to localhost:3000
const DASHBOARD_URL = process.env.EDGE_ZERO_LOCAL ? 'http://localhost:3000' : 'https://edgezero.dev';

export async function loginCommand() {
  p.intro(pc.bgCyan(pc.black(' Edge Zero Platform ')));

  const config = new Conf({ projectName: 'edge-zero' });
  const s = p.spinner();

  s.start('Preparing authentication flow...');

  // Generate a random device code to prevent CSRF
  const deviceCode = crypto.randomBytes(16).toString('hex');
  const port = 3040; // We can make this dynamic later if port is in use

  const server = http.createServer((req, res) => {
    // We expect the dashboard to redirect here: http://localhost:3040/?token=abc-123
    const url = new URL(req.url || '', `http://localhost:${port}`);
    
    if (url.pathname === '/') {
      const token = url.searchParams.get('token');
      
      if (token) {
        config.set('access_token', token);
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <html>
            <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #fafafa;">
              <div style="text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h1 style="color: #10b981;">Authentication Successful!</h1>
                <p>You can close this window and return to your terminal.</p>
              </div>
            </body>
          </html>
        `);
        
        s.stop('Successfully authenticated with Edge Zero.');
        p.outro(pc.green('🎉 You are now logged in!'));
        
        server.close();
        process.exit(0);
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Authentication failed. No token provided.');
        s.stop('Authentication failed.');
        p.log.error(pc.red('The authentication server did not return a valid token.'));
        server.close();
        process.exit(1);
      }
    }
  });

  server.listen(port, async () => {
    s.message('Waiting for browser authentication...');
    const authUrl = `${DASHBOARD_URL}/cli/auth?code=${deviceCode}&port=${port}`;
    
    try {
      p.log.info(`Opening your browser to authenticate: ${pc.underline(pc.cyan(authUrl))}`);
      await open(authUrl);
    } catch (err) {
      p.log.warn(`Could not automatically open your browser. Please visit the URL above manually.`);
    }
  });

  // Keep the process alive, wait for the server callback
  // Add a timeout just in case the user walks away
  setTimeout(() => {
    s.stop('Authentication timed out.');
    p.log.error(pc.red('You did not complete authentication in time. Please try again.'));
    server.close();
    process.exit(1);
  }, 5 * 60 * 1000); // 5 minute timeout
}
