import { D1Database, R2Bucket } from '@cloudflare/workers-types';

declare global {
  var D1_BINDING: D1Database | undefined;
  var MEDIA: R2Bucket | undefined;
}

export {};
