// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2026 Edge Zero Contributors
import { D1Database, R2Bucket } from '@cloudflare/workers-types';

declare global {
  var D1_BINDING: D1Database | undefined;
  var MEDIA: R2Bucket | undefined;
}

export {};
