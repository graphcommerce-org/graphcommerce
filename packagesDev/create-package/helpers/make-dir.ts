import fs from 'fs'

export default function makeDir(root: string, options = { recursive: true }) {
  return fs.promises.mkdir(root, options)
}
