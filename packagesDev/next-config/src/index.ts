import { readFileSync } from 'fs'
import withTranspileModules from 'next-transpile-modules'
import { PackageJson } from 'type-fest'
import possibleModules from './modules.json'

export function withGraphCommerce(modules: string[] = []) {
  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8')) as PackageJson
  const bla = Object.keys(packageJson.dependencies ?? {})
  const availableModules = possibleModules.filter((path) => bla.includes(path))

  return withTranspileModules([...modules, ...availableModules], { resolveSymlinks: true })
}
