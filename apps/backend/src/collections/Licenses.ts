import type { CollectionConfig } from 'payload'
import crypto from 'crypto'

export const Licenses: CollectionConfig = {
  slug: 'licenses',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'licenseKey', 'updatedAt'],
  },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'licenseKey', type: 'text', required: true, unique: true },
    { 
      name: 'status', 
      type: 'select', 
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Expired / Cancelled', value: 'expired' },
      ] 
    },
    { name: 'lemonSqueezyCustomerId', type: 'text' },
  ],
  endpoints: [
    {
      path: '/lemonsqueezy-webhook',
      method: 'post',
      handler: async (req) => {
        const payload = req.payload; 
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

        try {
          // 1. Extract the raw text stream from the Web Request
          const rawText = await req.text!();
          const signatureHeader = req.headers.get('x-signature') || '';

          // 2. Verify the signature against the raw string
          const hmac = crypto.createHmac('sha256', secret);
          const digest = Buffer.from(hmac.update(rawText).digest('hex'), 'utf8');
          const signature = Buffer.from(signatureHeader, 'utf8');

          if (!crypto.timingSafeEqual(digest, signature)) {
            return Response.json({ error: 'Invalid signature' }, { status: 401 });
          }

          // 3. Parse the JSON now that we know it is secure
          const event = JSON.parse(rawText);

          // Type safety check
          if (!event || !event.meta || !event.data) {
             return Response.json({ error: 'Malformed webhook payload' }, { status: 400 });
          }

          const eventName = event.meta.event_name;
          const attributes = event.data.attributes;

          // 4. Handle License Key Creation
          if (eventName === 'license_key_created') {
            await payload.create({
              collection: 'licenses',
              data: {
                email: attributes.user_email,
                licenseKey: attributes.key,
                status: 'active',
                lemonSqueezyCustomerId: String(attributes.customer_id),
              },
            });
          }

          // 5. Handle Subscription Cancellations or Expirations
          if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
            const existingLicense = await payload.find({
              collection: 'licenses',
              where: { lemonSqueezyCustomerId: { equals: String(attributes.customer_id) } },
            });

            if (existingLicense.docs.length > 0) {
              await payload.update({
                collection: 'licenses',
                id: existingLicense.docs[0].id,
                data: { status: 'expired' },
              });
            }
          }

          return Response.json({ message: 'Webhook processed successfully' }, { status: 200 });
        } catch (error) {
          console.error('Webhook Error:', error);
          return Response.json({ error: 'Internal Server Error' }, { status: 500 });
        }
      },
    },
  ],
}