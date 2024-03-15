import { parseSync, Identifier, printSync } from '@swc/core'
import { Visitor } from './Visitor'

class RenameVisitor extends Visitor {
  constructor(
    private replace: string[],
    private suffix: string,
  ) {
    super()
  }

  visitIdentifier(n: Identifier): Identifier {
    if (this.replace.includes(n.value)) n.value += this.suffix
    return n
  }
}

export function removeExports(source: string, replace: string[], suffix: string): string {
  const ast = parseSync(source, { syntax: 'typescript', tsx: true, comments: true })
  new RenameVisitor(replace, suffix).visitModule(ast)
  return printSync(ast).code
}
