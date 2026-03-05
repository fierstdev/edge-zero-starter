#!/usr/bin/env node

import { cac } from 'cac';
import { createCommand } from './commands/create.js';
import { loginCommand } from './commands/login.js';
import { addCommand } from './commands/add.js';

const cli = cac('edge-zero');

cli
  .command('create [project-name]', 'Scaffold a new Edge Zero project')
  .action(createCommand);

cli
  .command('login', 'Authenticate your Pro license')
  .action(loginCommand);

cli
  .command('add <block-name>', 'Add a UI block to your project')
  .action(addCommand);

cli.help();
cli.parse();
