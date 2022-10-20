import { resolveDependenciesSync } from './resolveDependenciesSync'

export type ResolveDependencyReturn = {
  dependency: string
  root: string
  fromRoot: string
  fromModule: string
}

export type ResolveDependency = (req: string) => ResolveDependencyReturn

export const resolveDependency = (cwd: string = process.cwd()) => {
  const dependencies = resolveDependenciesSync(cwd)
  return (dependency: string): ResolveDependencyReturn => {
    let dependencyPaths = { root: '.', dependency, fromRoot: dependency, fromModule: dependency }

    dependencies.forEach((root, depCandidate) => {
      if (dependency.startsWith(depCandidate)) {
        const relative = dependency.replace(depCandidate, '')
        const fromRoot = dependency.replace(depCandidate, root)

        dependencyPaths = {
          root,
          dependency,
          fromRoot,
          fromModule: !relative ? '.' : `./${relative.split('/')[relative.split('/').length - 1]}`,
        }
      }
    })
    return dependencyPaths
  }
}
