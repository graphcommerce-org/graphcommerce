import fs from 'node:fs'
import { resolveDependenciesSync } from './resolveDependenciesSync'

export type ResolveDependencyReturn =
  | undefined
  | {
      dependency: string
      denormalized: string
      root: string
      fromRoot: string
      fromModule: string
      source?: string
    }

export type ResolveDependency = (
  req: string,
  options?: { includeSources?: boolean; optional?: boolean },
) => ResolveDependencyReturn

export const resolveDependency = (cwd: string = process.cwd()) => {
  const dependencies = resolveDependenciesSync(cwd)

  function resolve(
    dependency: string,
    options: { includeSources?: boolean } = {},
  ): ResolveDependencyReturn {
    const { includeSources = false } = options

    let dependencyPaths = {
      root: '.',
      source: '',
      dependency,
      fromRoot: dependency,
      fromModule: dependency,
      denormalized: dependency,
    }

    dependencies.forEach((root, depCandidate) => {
      if (dependency === depCandidate || dependency.startsWith(`${depCandidate}/`)) {
        const relative = dependency.replace(depCandidate, '')

        const rootCandidate = dependency.replace(depCandidate, root)

        let source = ''
        const fromRoot = [
          `${rootCandidate}`,
          `${rootCandidate}/index`,
          `${rootCandidate}/src/index`,
        ].find((location) =>
          ['ts', 'tsx'].find((extension) => {
            const exists = fs.existsSync(`${location}.${extension}`)

            if (includeSources && exists)
              source = fs.readFileSync(`${location}.${extension}`, 'utf-8')
            return exists
          }),
        )

        if (!fromRoot) {
          return
        }

        const denormalized = fromRoot.replace(root, depCandidate)

        let fromModule = !relative
          ? '.'
          : `./${relative.split('/')[relative.split('/').length - 1]}`

        if (dependency.startsWith('./')) fromModule = `.${relative}`

        dependencyPaths = { root, dependency, denormalized, fromRoot, fromModule, source }
      }
    })
    return dependencyPaths
  }

  return resolve
}
