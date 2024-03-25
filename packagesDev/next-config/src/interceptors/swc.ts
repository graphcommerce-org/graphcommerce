import { Output, Program, parseSync as parseSyncCore, printSync as printSyncCode } from '@swc/core'

export function parseSync(src: string) {
  return parseSyncCore(src, {
    syntax: 'typescript',
    tsx: true,
    comments: true,
  })
}

export function printSync(m: Program): Output {
  return printSyncCode(m)
}
