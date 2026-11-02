// Copies the guide and quiz JSON from the backend (the source of truth) into the frontend,
// where it is used as the offline fallback. Run with: npm run sync-data
import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const from = join(here, '../../backend/src/main/resources/data')
const to = join(here, '../src/data')
for (const f of ['guides.json', 'quiz.json']) {
  copyFileSync(join(from, f), join(to, f))
  console.log(`copied ${f}`)
}
