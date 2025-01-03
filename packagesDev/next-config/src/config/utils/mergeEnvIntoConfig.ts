/* eslint-disable import/no-extraneous-dependencies */
import { cloneDeep, mergeDeep } from '@apollo/client/utilities'
import chalk from 'chalk'
import { get, set } from 'lodash'
import snakeCase from 'lodash/snakeCase'
import type { ZodAny, ZodRawShape, ZodTypeAny } from 'zod'
import {
  z,
  ZodArray,
  ZodBoolean,
  ZodDefault,
  ZodEffects,
  ZodEnum,
  ZodNullable,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
} from 'zod'
import diff from './diff'

const fmt = (s: string) => s.split(/(\d+)/).map(snakeCase).join('')
export const toEnvStr = (path: string[]) => ['GC', ...path].map(fmt).join('_').toUpperCase()
const dotNotation = (pathParts: string[]) =>
  pathParts
    .map((v) => {
      const idx = Number(v)
      return !Number.isNaN(idx) ? `[${idx}]` : v
    })
    .join('.')

function isJSON(str: string | undefined): boolean {
  if (!str) return true
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export type ZodNode =
  | ZodNullable<ZodTypeAny>
  | ZodOptional<ZodTypeAny>
  | ZodEffects<ZodTypeAny>
  | ZodObject<ZodRawShape>
  | ZodArray<ZodTypeAny>
  | ZodString
  | ZodNumber
  | ZodBoolean
  | ZodAny

export function configToEnvSchema(schema: ZodNode) {
  const envSchema: ZodRawShape = {}
  const envToDot: Record<string, string> = {}

  function walk(incomming: ZodNode, path: string[] = []) {
    let node = incomming

    if (node instanceof ZodEffects) node = node.innerType()
    if (node instanceof ZodOptional) node = node.unwrap()
    if (node instanceof ZodNullable) node = node.unwrap()
    if (node instanceof ZodDefault) node = node.removeDefault()

    if (node instanceof ZodObject) {
      if (path.length > 0) {
        envSchema[toEnvStr(path)] = z
          .string()
          .optional()
          .refine(isJSON, { message: 'Invalid JSON' })
          .transform((val) => (val ? JSON.parse(val) : val))
        envToDot[toEnvStr(path)] = dotNotation(path)
      }

      const typeNode = node as unknown as ZodObject<ZodRawShape>

      Object.keys(typeNode.shape).forEach((key) => {
        walk(typeNode.shape[key], [...path, key])
      })

      return
    }

    if (node instanceof ZodArray) {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      if (path.length > 0) {
        envSchema[toEnvStr(path)] = z
          .string()
          .optional()
          .refine(isJSON, { message: 'Invalid JSON' })
          .transform((val) => (val ? JSON.parse(val) : val))
        envToDot[toEnvStr(path)] = dotNotation(path)
      }

      arr.forEach((key) => {
        walk((node as unknown as ZodArray<ZodNode>).element, [...path, String(key)])
      })

      return
    }

    if (node instanceof ZodNumber) {
      envSchema[toEnvStr(path)] = z.coerce.number().optional()
      envToDot[toEnvStr(path)] = dotNotation(path)
      return
    }

    if (node instanceof ZodString || node instanceof ZodEnum) {
      envSchema[toEnvStr(path)] = node.optional()
      envToDot[toEnvStr(path)] = dotNotation(path)
      return
    }

    if (node instanceof ZodBoolean) {
      envSchema[toEnvStr(path)] = z
        .enum(['true', '1', 'false', '0'])
        .optional()
        .transform((v) => {
          if (v === 'true' || v === '1') return true
          if (v === 'false' || v === '0') return false
          return v
        })
      envToDot[toEnvStr(path)] = dotNotation(path)
      return
    }

    throw Error(
      `[@graphcommerce/next-config] Unknown type in schema ${node.constructor.name}. This is probably a bug please create an issue.`,
    )
  }
  walk(schema)

  return [z.object(envSchema), envToDot] as const
}

export type ApplyResultItem = {
  envVar: string
  envValue: unknown
  dotVar?: string | undefined
  from?: unknown
  to?: unknown
  error?: string[]
  warning?: string[]
}
export type ApplyResult = ApplyResultItem[]

const filterEnv = (env: Record<string, string | undefined>) =>
  Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith('GC_')))

export function mergeEnvIntoConfig(
  schema: ZodNode,
  config: Record<string, unknown>,
  env: Record<string, string | undefined>,
) {
  const filteredEnv = filterEnv(env)

  const newConfig = cloneDeep(config)
  const [envSchema, envToDot] = configToEnvSchema(schema)
  const result = envSchema.safeParse(filteredEnv)

  const applyResult: ApplyResult = []

  if (!result.success) {
    Object.entries(result.error.flatten().fieldErrors).forEach(([envVar, error]) => {
      const dotVar = envToDot[envVar]
      const envValue = filteredEnv[envVar]
      applyResult.push({ envVar, envValue, dotVar, error })
    })
    return [undefined, applyResult] as const
  }

  Object.entries(result.data).forEach(([envVar, value]) => {
    const dotVar = envToDot[envVar]
    const envValue = filteredEnv[envVar]

    if (!dotVar) {
      applyResult.push({ envVar, envValue })
      return
    }

    const dotValue = get(newConfig, dotVar)
    const merged = mergeDeep(dotValue, value)

    const from = diff(merged, dotValue)
    const to = diff(dotValue, merged)

    applyResult.push({ envVar, envValue, dotVar, from, to })
    set(newConfig, dotVar, merged)
  })

  return [newConfig, applyResult] as const
}

/**
 * Prints the applied env variables to the console
 *
 * The format is:
 *
 * - If from and to is empty, the value is unchanged: `=` (white)
 * - If the from is empty, a new value is applied: `+` (green)
 * - If the to is empty, a value is removed: `-` (red)
 * - If both from and to is not empty, a value is changed: `~` (yellow)
 */
export function formatAppliedEnv(applyResult: ApplyResult) {
  let hasError = false
  let hasWarning = false
  const lines = applyResult.map(({ from, to, envValue, envVar, dotVar, error, warning }) => {
    const fromFmt = chalk.red(JSON.stringify(from))
    const toFmt = chalk.green(JSON.stringify(to))
    const envVariableFmt = `${envVar}`
    const dotVariableFmt = chalk.bold.underline(`${dotVar}`)

    const baseLog = `${envVariableFmt} => ${dotVariableFmt}`

    if (error) {
      hasError = true
      return `${chalk.red(` ⨉ ${envVariableFmt}`)} => ${error.join(', ')}`
    }
    if (warning) {
      hasWarning = true
      return `${chalk.yellowBright(` ‼ ${envVariableFmt}`)} => ${warning.join(', ')}`
    }

    if (!dotVar) return chalk.red(`${envVariableFmt} => ignored (no matching config)`)

    if (from === undefined && to === undefined) return ` = ${baseLog}: (ignored)`
    if (from === undefined && to !== undefined) return ` ${chalk.green('+')} ${baseLog}`
    if (from !== undefined && to === undefined) return ` ${chalk.red('-')} ${baseLog}`
    return ` ${chalk.yellowBright('~')} ${baseLog}`
  })

  let header = chalk.blueBright('info')
  if (hasWarning) header = chalk.yellowBright('warning')
  if (hasError) header = chalk.yellowBright('error')

  header += '   - Loaded GraphCommerce env variables'

  return [header, ...lines].join('\n')
}
