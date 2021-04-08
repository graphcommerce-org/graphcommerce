import child_process from 'child_process'
import { writeFile } from 'fs/promises'
import { promisify } from 'util'

const exec = promisify(child_process.exec)

;(async () => {
  const { stdout } = await exec('yarn workspaces info --json')
  const json = JSON.parse(JSON.parse(stdout).data) as {
    [name: string]: {
      location: string
      workspaceDependencies: string[]
      mismatchedWorkspaceDependencies: string[]
    }
  }
  const entries = Object.entries(json)

  const excludes = ['docs', 'examples/', 'packagesDev']

  const packages = entries
    .filter(([, b]) => excludes.every((exclude) => !b.location.startsWith(exclude)))
    .map(([p]) => p)

  await writeFile('src/modules.json', JSON.stringify(packages))
})().catch(console.error)
