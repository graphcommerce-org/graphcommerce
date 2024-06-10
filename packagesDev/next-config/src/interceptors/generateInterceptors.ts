import path from 'node:path'
import fs from 'node:fs/promises'
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphCommerceDebugConfig } from '../generated/config'
import { ResolveDependency } from '../utils/resolveDependency'
import { findOriginalSource } from './findOriginalSource'
import {
  Interceptor,
  MaterializedPlugin,
  PluginConfig,
  generateInterceptor,
  isPluginConfig,
  moveRelativeDown,
} from './generateInterceptor'

export type GenerateInterceptorsReturn = Record<string, MaterializedPlugin>

export async function generateInterceptors(
  plugins: PluginConfig[],
  resolve: ResolveDependency,
  config?: GraphCommerceDebugConfig | null | undefined,
  force?: boolean,
): Promise<GenerateInterceptorsReturn> {
  const byTargetModuleAndExport = moveRelativeDown(plugins).reduce<Record<string, Interceptor>>(
    (acc, plug) => {
      let { sourceModule: pluginPath } = plug
      if (!isPluginConfig(plug) || !plug.enabled) return acc

      const result = resolve(plug.targetModule, { includeSources: true })
      const { error, resolved } = findOriginalSource(plug, result, resolve)

      if (error) {
        console.log(error.message)
        return acc
      }

      const { fromRoot } = resolved

      if (pluginPath.startsWith('.')) {
        const resolvedPlugin = resolve(pluginPath)
        if (resolvedPlugin) {
          pluginPath = path.relative(
            resolved.fromRoot.split('/').slice(0, -1).join('/'),
            resolvedPlugin.fromRoot,
          )
        }
      }

      if (!acc[resolved.fromRoot]) {
        acc[resolved.fromRoot] = {
          ...resolved,
          target: `${resolved.fromRoot}.interceptor`,
          targetExports: {},
        } as Interceptor
      }

      if (!acc[fromRoot].targetExports[plug.targetExport])
        acc[fromRoot].targetExports[plug.targetExport] = []

      acc[fromRoot].targetExports[plug.targetExport].push({ ...plug, sourceModule: pluginPath })

      return acc
    },
    {},
  )

  return Object.fromEntries(
    await Promise.all(
      Object.entries(byTargetModuleAndExport).map(async ([target, interceptor]) => {
        const file = `${interceptor.fromRoot}.interceptor.tsx`

        const originalSource =
          !force &&
          (await fs
            .access(file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false))
            ? (await fs.readFile(file)).toString()
            : undefined

        return [
          target,
          await generateInterceptor(interceptor, config ?? {}, originalSource),
        ] as const
      }),
    ),
  )
}
