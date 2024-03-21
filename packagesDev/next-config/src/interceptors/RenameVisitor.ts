/* eslint-disable max-classes-per-file */
import { Identifier } from '@swc/core'
import { Visitor } from './Visitor'

export class RenameVisitor extends Visitor {
  constructor(
    private replace: string[],
    private suffix: (v: string) => string,
  ) {
    super()
  }

  visitIdentifier(n: Identifier): Identifier {
    if (this.replace.includes(n.value)) n.value = this.suffix(n.value)
    return n
  }
}
