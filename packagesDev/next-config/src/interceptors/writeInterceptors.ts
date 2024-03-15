import fs from 'node:fs'
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { sync as globSync } from 'glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { GenerateInterceptorsReturn } from './generateInterceptors'

export function writeInterceptors(
  interceptors: GenerateInterceptorsReturn,
  cwd: string = process.cwd(),
) {
  const dependencies = resolveDependenciesSync(cwd)
  const existing: string[] = []
  dependencies.forEach((dependency) => {
    const files = globSync(`${dependency}/**/*.interceptor.tsx`, { cwd })
    existing.push(...files)
  })

  Object.entries(interceptors).forEach(([, plugin]) => {
    const relativeFile = `${plugin.fromRoot}.interceptor.tsx`

    if (existing.includes(relativeFile)) {
      delete existing[existing.indexOf(relativeFile)]
    }
    if (existing.includes(`./${relativeFile}`)) {
      delete existing[existing.indexOf(`./${relativeFile}`)]
    }

    const fileToWrite = path.join(cwd, relativeFile)

    const isSame =
      fs.existsSync(fileToWrite) &&
      fs.readFileSync(fileToWrite, 'utf8').toString() === plugin.template

    if (!isSame) fs.writeFileSync(fileToWrite, plugin.template)
  })

  // Cleanup unused interceptors
  existing.forEach((file) => fs.existsSync(file) && fs.unlinkSync(file))
}
