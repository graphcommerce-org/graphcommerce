import fs from 'node:fs'
import { resolveDependenciesSync } from './resolveDependenciesSync'

export type ResolveDependencyReturn = {
  dependency: string
  denormalized: string
  root: string
  fromRoot: string
  fromModule: string
  source?: string
}

export type ResolveDependency = (
  req: string,
  options?: { includeSources?: boolean },
) => ResolveDependencyReturn

export const resolveDependency = (cwd: string = process.cwd()) => {
  const dependencies = resolveDependenciesSync(cwd)
  return (dependency: string, { includeSources = false } = {}): ResolveDependencyReturn => {
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
          throw Error(`Can't find plugin ${dependency}`)
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
}
