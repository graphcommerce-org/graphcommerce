import fs from 'node:fs/promises'
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { sync as globSync } from 'glob'
import { resolveDependenciesSync } from '../utils/resolveDependenciesSync'
import { GenerateInterceptorsReturn } from './generateInterceptors'

function checkFileExists(file: string) {
  return fs
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

export async function writeInterceptors(
  interceptors: GenerateInterceptorsReturn,
  cwd: string = process.cwd(),
) {
  const dependencies = resolveDependenciesSync(cwd)
  const existing: string[] = []
  dependencies.forEach((dependency) => {
    const files = globSync(
      [`${dependency}/**/*.interceptor.tsx`, `${dependency}/**/*.interceptor.ts`],
      { cwd },
    )
    existing.push(...files)
  })

  const written = Object.entries(interceptors).map(async ([, plugin]) => {
    const extension = plugin.sourcePath.endsWith('.tsx') ? '.tsx' : '.ts'
    const relativeFile = `${plugin.fromRoot}.interceptor${extension}`

    if (existing.includes(relativeFile)) {
      delete existing[existing.indexOf(relativeFile)]
    }
    if (existing.includes(`./${relativeFile}`)) {
      delete existing[existing.indexOf(`./${relativeFile}`)]
    }

    const fileToWrite = path.join(cwd, relativeFile)

    const isSame =
      (await checkFileExists(fileToWrite)) &&
      (await fs.readFile(fileToWrite, 'utf8')).toString() === plugin.template

    if (!isSame) await fs.writeFile(fileToWrite, plugin.template)
  })

  // Cleanup unused interceptors
  const cleaned = existing.map(
    async (file) => (await checkFileExists(file)) && (await fs.unlink(file)),
  )

  await Promise.all(written)
  await Promise.all(cleaned)
}
