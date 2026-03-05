import * as p from '@clack/prompts';
import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import pc from 'picocolors';
import Conf from 'conf';

const DASHBOARD_URL = process.env.EDGE_ZERO_LOCAL ? 'http://localhost:8787' : 'https://api.edgezero.dev';

export async function createCommand(projectName?: string) {
  p.intro(pc.bgCyan(pc.black(' Edge Zero Platform ')));

  const config = new Conf({ projectName: 'edge-zero' });
  const token = config.get('access_token');

  if (!token) {
    p.log.error(pc.red('You must be logged in to create a project.'));
    p.log.info(`Run ${pc.cyan('edge-zero login')} to authenticate.`);
    process.exit(1);
  }

  const project = await p.group(
    {
      name: () => {
        if (projectName) return Promise.resolve(projectName);
        return p.text({
          message: 'What is your project named?',
          placeholder: 'my-edge-zero-app',
          validate: (value) => {
            if (!value) return 'Please enter a project name.';
          },
        });
      },
    },
    {
      onCancel: () => {
        p.cancel('Operation cancelled.');
        process.exit(0);
      },
    }
  );

  const targetDir = resolve(process.cwd(), project.name);
  const s = p.spinner();

  s.start(`Provisioning repository via Edge Zero API...`);

  let newRepoUrl = '';

  try {
    const response = await fetch(`${DASHBOARD_URL}/projects/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name: project.name })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || response.statusText);
    }

    const data = await response.json() as { repoUrl?: string };
    
    if (!data.repoUrl) {
       throw new Error("API did not return a repository URL.");
    }
    newRepoUrl = data.repoUrl;

    s.stop(`Repository provisioned: ${pc.cyan(newRepoUrl)}`);
  } catch (error) {
    s.stop(`Failed to provision repository.`);
    p.log.error(pc.red(String(error)));
    process.exit(1);
  }

  s.start(`Cloning your new repository locally...`);
  try {
    execSync(`git clone ${newRepoUrl} ${project.name}`, { stdio: 'ignore' });
    s.stop(`Cloned repository to ./${project.name}`);
  } catch (error) {
    s.stop(`Failed to clone repository.`);
    p.log.error(pc.red(String(error)));
    process.exit(1);
  }

  s.start(`Installing dependencies via pnpm`);
  try {
    execSync(`pnpm install`, { cwd: targetDir, stdio: 'ignore' });
    s.stop(`Installed dependencies`);
  } catch (error) {
    s.stop(`Failed to install dependencies.`);
    p.log.error(pc.red(String(error)));
    p.log.warn(`You may need to run ${pc.cyan('pnpm install')} manually in the ${pc.cyan(project.name)} directory.`);
  }

  p.outro(pc.green(`Project ${pc.bold(project.name)} successfully scaffolded and linked to GitHub! 🎉`));
}
