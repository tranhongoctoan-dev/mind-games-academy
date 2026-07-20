// Post-build: mirror static output to `dist/` so the project satisfies
// tooling / hosts that expect a `dist` folder.
import { existsSync, rmSync, cpSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const candidates = [
  resolve(root, '.output/public'),
  resolve(root, '.vercel/output/static'),
]

const source = candidates.find((p) => existsSync(p))
if (!source) {
  console.warn('[post-build] No static output found; skipping dist copy.')
  process.exit(0)
}

const dest = resolve(root, 'dist')
if (existsSync(dest)) rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
cpSync(source, dest, { recursive: true })
console.log(`[post-build] Copied ${source} -> ${dest}`)
