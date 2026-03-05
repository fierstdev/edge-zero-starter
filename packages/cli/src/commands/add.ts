import * as p from '@clack/prompts';
import pc from 'picocolors';

export async function addCommand(blockName: string) {
  p.intro(pc.bgCyan(pc.black(' Edge Zero Blocks ')));

  const s = p.spinner();
  s.start(`Fetching block ${blockName}...`);

  // Stubbed implementation for now
  await new Promise(resolve => setTimeout(resolve, 1000));

  s.stop(`Added block ${blockName}`);
  
  p.outro(pc.green(`Block ${pc.bold(blockName)} successfully added to your project!`));
}
