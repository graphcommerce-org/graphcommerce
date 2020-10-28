import fs from 'fs'
import os from 'os'

export default function updateJson(
  filePath: string,
  base: Record<string, unknown>,
  override: Record<string, unknown>,
) {
  let newBase = base
  try {
    newBase = JSON.parse(fs.readFileSync(filePath).toString())
  } catch {
    //
  }
  const packageJson = { ...newBase, ...override }
  fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + os.EOL)
}
