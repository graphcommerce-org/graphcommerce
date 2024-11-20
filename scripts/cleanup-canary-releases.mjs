/**
 * Cleanup script for CHANGELOG.md files that:
 * 1. Removes canary releases (e.g., 8.0.1-canary.1) when their base version (8.0.1) has been released
 * 2. Removes empty changelog sections that don't contain any changes
 *
 * Usage:
 * - Run from the project root: `node scripts/cleanup-canary-releases.mjs`
 * - The script will recursively find all CHANGELOG.md files (skipping node_modules)
 * - It will only modify files that need changes
 * - Changes are logged to the console
 */

import { promises as fs } from 'fs'
import { join } from 'path'

// Regex to match canary version headers and their content
const canaryHeaderRegex =
  /\n## [0-9]+\.[0-9]+\.[0-9]+-canary\.[0-9]+\n(?:(?!\n## )[\s\S])*?(?=\n## |$)/g

// Regex to match truly empty h2 sections (no subsections or content)
const emptyH2Regex = /\n## [^\n]+\n(?!\s*###)(?:[\t ]*(?=\n## |$))/g

// Regex to extract version number without canary suffix
const versionExtractRegex = /## ([0-9]+\.[0-9]+\.[0-9]+)(?:-canary\.[0-9]+)/

function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number)
  const parts2 = v2.split('.').map(Number)

  for (let i = 0; i < 3; i++) {
    if (parts1[i] > parts2[i]) return 1
    if (parts1[i] < parts2[i]) return -1
  }
  return 0
}

function hasReleasedVersion(content, baseVersion) {
  // Find all non-canary versions
  const versions = [...content.matchAll(/\n## ([0-9]+\.[0-9]+\.[0-9]+)(?!-canary)\b/g)].map(
    (match) => match[1],
  )

  return versions.some((version) => compareVersions(version, baseVersion) >= 0)
}

function cleanupEmptyH2Sections(content) {
  let cleanedContent = content
  let previousContent
  do {
    previousContent = cleanedContent
    cleanedContent = cleanedContent.replace(emptyH2Regex, '\n')
  } while (cleanedContent !== previousContent)

  return cleanedContent
}

async function findChangelogFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const changelogPromises = files.map(async (file) => {
    if (file.name === 'node_modules') return []

    const fullPath = join(dir, file.name)
    if (file.isDirectory()) {
      const subDirFiles = await findChangelogFiles(fullPath)
      return subDirFiles
    }
    if (file.name === 'CHANGELOG.md') {
      return [fullPath]
    }
    return []
  })

  const changelogs = await Promise.all(changelogPromises)
  return changelogs.flat()
}

async function processChangelogFile(file) {
  const content = await fs.readFile(file, 'utf8')
  const canaryMatches = [...content.matchAll(canaryHeaderRegex)]
  let cleanedContent = content
  let hasChanges = false

  // Remove canary releases that have been released
  if (canaryMatches.length) {
    for (const match of canaryMatches) {
      const canarySection = match[0]
      const versionMatch = canarySection.match(versionExtractRegex)

      if (versionMatch) {
        const baseVersion = versionMatch[1]
        if (hasReleasedVersion(content, baseVersion)) {
          cleanedContent = cleanedContent.replace(canarySection, '')
          hasChanges = true
        }
      }
    }
  }

  // Clean up empty h2 sections
  const contentAfterEmptyCleanup = cleanupEmptyH2Sections(cleanedContent)
  if (contentAfterEmptyCleanup !== cleanedContent) {
    hasChanges = true
    cleanedContent = contentAfterEmptyCleanup
  }

  if (hasChanges) {
    cleanedContent = cleanedContent.replace(/\n{3,}/g, '\n\n')
    await fs.writeFile(file, cleanedContent)
    console.log(`Updated ${file}`)
  }
}

async function cleanupCanaryReleases(rootDir) {
  try {
    const changelogFiles = await findChangelogFiles(rootDir)
    await Promise.all(changelogFiles.map(processChangelogFile))
    console.log('Changelog cleanup completed!')
  } catch (error) {
    console.error('Error cleaning up changelogs:', error)
  }
}

// Run the script from the project root
await cleanupCanaryReleases(process.cwd())
