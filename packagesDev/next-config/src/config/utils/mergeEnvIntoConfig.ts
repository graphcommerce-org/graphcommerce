/* eslint-disable import/no-extraneous-dependencies */
import { mergeDeep, cloneDeep } from '@apollo/client/utilities'
import chalk from 'chalk'
import { get, set } from 'lodash'
import snakeCase from 'lodash/snakeCase'
import {
  z,
  ZodObject,
  ZodBoolean,
  ZodArray,
  ZodString,
  ZodNumber,
  ZodNullable,
  ZodOptional,
  ZodEffects,
  ZodRawShape,
} from 'zod'
import diff from './diff'

const fmt = (s: string) => s.split(/(\d+)/).map(snakeCase).join('')
const pathStr = (path: string[]) => ['GC', ...path].map(fmt).join('_').toUpperCase()
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
  | ZodNullable<any>
  | ZodOptional<any>
  | ZodEffects<any>
  | ZodObject<any>
  | ZodArray<any>
  | ZodString
  | ZodNumber
  | ZodBoolean

export function configToEnvSchema(schema: ZodNode) {
  const envSchema: ZodRawShape = {}
  const envToDot: Record<string, string> = {}

  function walk(incomming: ZodNode, path: string[] = []) {
    let node = incomming

    if (node instanceof ZodNullable) node = node.unwrap()
    if (node instanceof ZodOptional) node = node.unwrap()
    if (node instanceof ZodEffects) node = node.innerType()

    if (node instanceof ZodObject) {
      if (path.length > 0) {
        envSchema[pathStr(path)] = z
          .string()
          .optional()
          .refine(isJSON, { message: `Invalid JSON` })
          .transform((val) => (val ? JSON.parse(val) : val))
        envToDot[pathStr(path)] = dotNotation(path)
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
        envSchema[pathStr(path)] = z
          .string()
          .optional()
          .refine(isJSON, { message: `Invalid JSON` })
          .transform((val) => (val ? JSON.parse(val) : val))
        envToDot[pathStr(path)] = dotNotation(path)
      }

      arr.forEach((key) => {
        walk((node as unknown as ZodArray<ZodNode>).element, [...path, String(key)])
      })

      return
    }

    if (node instanceof ZodString || node instanceof ZodNumber) {
      envSchema[pathStr(path)] = node.optional()
      envToDot[pathStr(path)] = dotNotation(path)
      return
    }

    if (node instanceof ZodBoolean) {
      envSchema[pathStr(path)] = z
        .enum(['true', '1', 'false', '0'])
        .optional()
        .transform((v) => {
          if (v === 'true' || v === '1') return true
          if (v === 'false' || v === '0') return false
          return v
        })
      envToDot[pathStr(path)] = dotNotation(path)
      return
    }

    throw Error(`Unknown type in schema ${node.constructor.name}`)
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

export function mergeEnvIntoConfig(
  schema: ZodNode,
  config: Record<string, unknown>,
  env: Record<string, string | undefined>,
) {
  const filterEnv = Object.fromEntries(Object.entries(env).filter(([key]) => key.startsWith('GC_')))

  const newConfig = cloneDeep(config)
  const [envSchema, envToDot] = configToEnvSchema(schema)
  const result = envSchema.safeParse(filterEnv)

  const applyResult: ApplyResult = []

  if (!result.success) {
    Object.entries(result.error.flatten().fieldErrors).forEach(([envVar, error]) => {
      const dotVar = envToDot[envVar]
      const envValue = filterEnv[envVar]
      applyResult.push({ envVar, envValue, dotVar, error })
    })
    return [undefined, applyResult] as const
  }

  Object.entries(result.data).forEach(([envVar, value]) => {
    const dotVar = envToDot[envVar]
    const envValue = filterEnv[envVar]

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
    const envVariableFmt = `${envVar}='${envValue}'`
    const dotVariableFmt = chalk.bold.underline(`import.meta.graphCommerce.${dotVar}`)

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

    if (from === undefined && to === undefined)
      return ` = ${baseLog}: (ignored, no change/wrong format)`
    if (from === undefined && to !== undefined) return ` ${chalk.green('+')} ${baseLog}: ${toFmt}`
    if (from !== undefined && to === undefined) return ` ${chalk.red('-')} ${baseLog}: ${fromFmt}`
    return ` ${chalk.yellowBright('~')} ${baseLog}: ${fromFmt} => ${toFmt}`
  })

  let header = chalk.blueBright(`info`)
  if (hasWarning) header = chalk.yellowBright(`warning`)
  if (hasError) header = chalk.yellowBright(`error`)

  header += `   - Loaded GraphCommerce env variables`

  return [header, ...lines].join('\n')
}
