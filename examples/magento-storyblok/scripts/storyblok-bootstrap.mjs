#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { loadConfig } from '@graphcommerce/next-config/loadConfig'

const DEFAULT_SOURCE_SPACE = '291439709879423'
const REGION_HOSTS = {
  eu: 'mapi.storyblok.com',
  us: 'api-us.storyblok.com',
  ca: 'api-ca.storyblok.com',
  ap: 'api-ap.storyblok.com',
  cn: 'app.storyblokchina.cn',
}

const config = loadConfig(process.cwd())
const TARGET_SPACE = config.storyblok.spaceId
const SOURCE_SPACE = config.storyblok.sourceSpaceId ?? DEFAULT_SOURCE_SPACE

if (TARGET_SPACE === SOURCE_SPACE) {
  console.error(
    `Error: storyblok.spaceId equals the source space (${SOURCE_SPACE}). ` +
      'Bootstrap is meant for seeding a new, empty space.',
  )
  process.exit(1)
}

// Refuse to run on a non-empty space. Bootstrap's pushes upsert by slug/name,
// so re-running against a populated space overwrites manual content edits,
// component schema tweaks, and can create duplicate assets.
async function assertTargetIsEmpty() {
  const credsPath = join(homedir(), '.storyblok', 'credentials.json')
  let creds
  try {
    creds = JSON.parse(readFileSync(credsPath, 'utf8'))
  } catch {
    console.error(`Could not read ${credsPath}. Run 'storyblok login' first.`)
    process.exit(1)
  }
  const credsKey = Object.keys(creds)[0]
  const token = creds[credsKey]?.password
  const region = creds[credsKey]?.region ?? 'eu'
  const host = REGION_HOSTS[region] ?? REGION_HOSTS.eu

  const res = await fetch(
    `https://${host}/v1/spaces/${TARGET_SPACE}/stories?per_page=2`,
    { headers: { Authorization: token } },
  )
  if (!res.ok) {
    console.error(`Failed to check target space: ${res.status} ${await res.text()}`)
    process.exit(1)
  }
  const { stories = [] } = await res.json()

  // Fresh spaces contain a single auto-generated "Home" story at slug "home".
  const isFreshSpace =
    stories.length === 0 || (stories.length === 1 && stories[0].slug === 'home')
  if (!isFreshSpace) {
    console.error(
      `Target space ${TARGET_SPACE} already contains content (${stories.length}+ stories). ` +
        'Bootstrap refuses to overwrite existing data. If you really want to reseed, ' +
        'run the storyblok CLI commands manually.',
    )
    process.exit(1)
  }
}

const run = (cmd) => {
  console.log(`\n$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

await assertTargetIsEmpty()

console.log(`Bootstrapping Storyblok space ${TARGET_SPACE} from source space ${SOURCE_SPACE}.`)

run(`storyblok components push --space ${TARGET_SPACE} --from ${SOURCE_SPACE} --separate-files`)
run(`storyblok assets push --space ${TARGET_SPACE} --from ${SOURCE_SPACE} --update-stories`)
run(`storyblok stories push --space ${TARGET_SPACE} --from ${SOURCE_SPACE}`)

console.log('\nBootstrap complete.')
