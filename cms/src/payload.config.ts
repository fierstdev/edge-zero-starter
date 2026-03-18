import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { r2Storage } from '@payloadcms/storage-r2'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

// Import Collections
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { FormSubmissions } from './collections/FormSubmissions'

// Import Globals
import { Identity } from './globals/Identity'
import { Header } from './globals/Header'
import { Theme } from './globals/Theme'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const livePreviewUrl = process.env.PAYLOAD_LIVE_PREVIEW_URL || 'http://localhost:4321'
const d1Binding = globalThis.D1_BINDING
const mediaBucket = globalThis.MEDIA

const plugins: any[] = []

if (mediaBucket) {
  plugins.push(
    r2Storage({
      bucket: mediaBucket,
      collections: {
        media: true,
      },
    }),
  )
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      url: livePreviewUrl,
      collections: ['pages'],
    },
    components: {
      afterNav: [
        './components/RoleStyles#RoleStyles'
      ],
    },
    
  },
  collections: [
    Users,
    Pages,
    Media,
    FormSubmissions,
  ],
  globals: [
    Identity,
    Theme,
    Header,
    Footer
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: d1Binding
    ? sqliteD1Adapter({
        binding: d1Binding as any,
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./payload.db',
        },
      }),
  plugins,
})
