/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export default function isFolderEmpty(root: string, name: string): boolean {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'yarn-debug.log',
    'yarn-error.log',
  ]

  const conflicts = fs
    .readdirSync(root)
    .filter((file) => !validFiles.includes(file))
    // Support IntelliJ IDEA-based editors
    .filter((file) => !/\.iml$/.test(file))

  if (conflicts.length > 0) {
    console.log(`The directory ${chalk.green(name)} contains files, updating...`)
    console.log(`Please check your git diff to see what has changed`)
    console.log()
    return false
  }

  return true
}
