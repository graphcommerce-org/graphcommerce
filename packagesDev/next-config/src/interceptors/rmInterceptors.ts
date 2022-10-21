import fs from 'node:fs'
import glob from 'glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'

export function rmInterceptors(cwd: string = process.cwd()): string[] {
  const dependencies = resolveDependenciesSync(cwd)

  const removed: string[] = []
  dependencies.forEach((dependency) => {
    const files = glob.sync(`${dependency}/**/*.interceptor.tsx`, { cwd })
    files.forEach((file) => {
      fs.unlinkSync(file)
      removed.push(file)
    })
  })
  return removed
}
