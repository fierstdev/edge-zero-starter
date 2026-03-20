// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import { getPlatformProxy } from 'wrangler';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let env = {};

try {
  ({ env } = await getPlatformProxy({
    configPath: path.join(__dirname, 'wrangler.jsonc'),
    envFiles: [],
    persist: {
      path: path.join(__dirname, '../../.wrangler-state'),
    },
    remoteBindings: false,
  }));
} catch (error) {
  console.warn('Edge Zero starter/cms could not load Wrangler bindings. Falling back to local SQLite.', error);
}

if (env['edge-zero-db']) {
  globalThis.D1_BINDING = env['edge-zero-db'];
}

if (env.MEDIA) {
  globalThis.MEDIA = env.MEDIA;
}
