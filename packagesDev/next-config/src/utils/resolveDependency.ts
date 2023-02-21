import fs from 'node:fs'
import { resolveDependenciesSync } from './resolveDependenciesSync'

export type ResolveDependencyReturn = {
  dependency: string
  denormalized: string
  root: string
  fromRoot: string
  fromModule: string
}

export type ResolveDependency = (req: string) => ResolveDependencyReturn

export const resolveDependency = (cwd: string = process.cwd()) => {
  const dependencies = resolveDependenciesSync(cwd)
  return (dependency: string): ResolveDependencyReturn => {
    let dependencyPaths = {
      root: '.',
      dependency,
      fromRoot: dependency,
      fromModule: dependency,
      denormalized: dependency,
    }

    dependencies.forEach((root, depCandidate) => {
      if (dependency === depCandidate || dependency.startsWith(`${depCandidate}/`)) {
        const relative = dependency.replace(depCandidate, '')

        const rootCandidate = dependency.replace(depCandidate, root)
        const fromRoot = [
          `${rootCandidate}`,
          `${rootCandidate}/index`,
          `${rootCandidate}/src/index`,
        ].find((location) =>
          ['ts', 'tsx'].find((extension) => fs.existsSync(`${location}.${extension}`)),
        )
        if (!fromRoot) throw Error("Can't find plugin target")
        const denormalized = fromRoot.replace(root, depCandidate)

        dependencyPaths = {
          root,
          dependency,
          denormalized,
          fromRoot,
          fromModule: !relative ? '.' : `./${relative.split('/')[relative.split('/').length - 1]}`,
        }
      }
    })
    return dependencyPaths
  }
}
