#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { loadConfig } from '@graphcommerce/next-config/loadConfig'

const DEFAULT_SOURCE_SPACE = '291439709879423'

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

const run = (cmd) => {
  console.log(`\n$ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

console.log(`Bootstrapping Storyblok space ${TARGET_SPACE} from source space ${SOURCE_SPACE}.`)

run(`storyblok components push --space ${TARGET_SPACE} --from ${SOURCE_SPACE} --separate-files`)
run(`storyblok assets push --space ${TARGET_SPACE} --from ${SOURCE_SPACE} --update-stories`)
run(`storyblok stories push --space ${TARGET_SPACE} --from ${SOURCE_SPACE}`)

console.log('\nBootstrap complete.')
