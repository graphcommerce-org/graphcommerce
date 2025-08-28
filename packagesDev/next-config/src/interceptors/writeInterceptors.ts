import { stat } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'path'
import { glob } from 'glob'
import { findParentPath } from '../utils/findParentPath'
import type { GenerateInterceptorsReturn } from './generateInterceptors'

export async function fsExists(file: string): Promise<boolean> {
  try {
    await fs.access(file, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}
export async function fsRealpath(file: string): Promise<string> {
  return (await fsExists(file)) ? fs.realpath(file) : file
}

export async function restoreOriginalFile(fileWithOriginalInTheName: string): Promise<boolean> {
  const restoredPath = fileWithOriginalInTheName.replace(/\.original\.(tsx?)$/, '.$1')

  if (await fsExists(fileWithOriginalInTheName)) {
    // Remove the current interceptor file if it exists
    if (await fsExists(restoredPath)) {
      await fs.unlink(restoredPath)
    }
    // Restore the original file
    await fs.rename(fileWithOriginalInTheName, restoredPath)
    return true
  }
  return false
}

export async function findDotOriginalFiles(cwd: string) {
  let parentPath = findParentPath(process.cwd())
  while (parentPath) {
    const p = findParentPath(parentPath)
    if (p) parentPath = p
    else break
  }

  return Promise.all(
    (
      await glob([`${parentPath}/**/*.original.tsx`, `${parentPath}/**/*.original.ts`], { cwd })
    ).map((file) => fs.realpath(file)),
  )
}

export async function writeInterceptors(
  interceptors: GenerateInterceptorsReturn,
  cwd: string = process.cwd(),
) {
  const processedFiles: string[] = []
  const existingDotOriginalFiles = findDotOriginalFiles(cwd)

  // Process each interceptor
  const written = Object.entries(interceptors).map(async ([, plugin]) => {
    const extension = plugin.sourcePath.endsWith('.tsx') ? '.tsx' : '.ts'

    const targetFileName = `${plugin.fromRoot}${extension}`
    const fileNameDotOriginal = `${plugin.fromRoot}.original${extension}`
    const targetFilePath = await fsRealpath(path.resolve(cwd, targetFileName))
    const dotOriginalPath = await fsRealpath(path.resolve(cwd, fileNameDotOriginal))

    processedFiles.push(dotOriginalPath)

    const targetSource = (await fsExists(targetFilePath))
      ? await fs.readFile(targetFilePath, 'utf8')
      : null

    const dotOriginalSource = (await fsExists(dotOriginalPath))
      ? await fs.readFile(dotOriginalPath, 'utf8')
      : null

    const isPreviouslyApplied = dotOriginalSource !== null && targetSource?.includes('/* hash:')

    let status = ''
    if (isPreviouslyApplied) {
      if (targetSource === plugin.template) {
        status = '✅ Unchanged interceptor'
      } else {
        status = '🔄 Updating interceptor'
        await fs.writeFile(targetFilePath, plugin.template)
      }
    } else {
      status = '🆕 Creating interceptor'
      await fs.rename(targetFilePath, dotOriginalPath)
      await fs.writeFile(targetFilePath, plugin.template)
    }

    console.log(`${status} ${plugin.dependency}`)
    Object.entries(plugin.targetExports).forEach(([target, plugins]) => {
      plugins.forEach((plugin) => {
        console.log(`  🔌 ${target} <- ${plugin.sourceModule}`)
      })
    })
  })

  await Promise.all(written)

  const toRestore = (await existingDotOriginalFiles).filter(
    (file) => !processedFiles.includes(file),
  )
  await Promise.all(
    toRestore.map((file) => {
      console.log(`↩ Removing old interceptor ${file}`)
      return restoreOriginalFile(file)
    }),
  )
}
