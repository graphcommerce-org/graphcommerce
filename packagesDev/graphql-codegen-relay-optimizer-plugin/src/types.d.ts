/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module '@ardatan/relay-compiler/lib/core/Schema' {
  export function create(schema: string): import('relay-compiler').Schema
}

declare module '@ardatan/relay-compiler/lib/core/IRPrinter' {
  export function print(schema: import('relay-compiler').Schema, document: unknown): string
}

declare module '@ardatan/relay-compiler/lib/core/CompilerContext' {
  let CompilerContext: typeof import('relay-compiler').CompilerContext
  export = CompilerContext
}

declare module '@ardatan/relay-compiler/lib/transforms/SkipRedundantNodesTransform' {
  let transform: typeof import('relay-compiler/lib/transforms/SkipRedundantNodesTransform.js')
  export = transform
}

declare module '@ardatan/relay-compiler/lib/transforms/InlineFragmentsTransform' {
  let transform: typeof import('relay-compiler/lib/transforms/InlineFragmentsTransform.js')
  export = transform
}

declare module '@ardatan/relay-compiler/lib/transforms/ApplyFragmentArgumentTransform' {
  let transform: typeof import('relay-compiler/lib/transforms/ApplyFragmentArgumentTransform.js')
  export = transform
}

declare module '@ardatan/relay-compiler/lib/transforms/FlattenTransform' {
  let transform: typeof import('relay-compiler/lib/transforms/FlattenTransform.js')
  export = transform
}

declare module '@ardatan/relay-compiler/lib/core/RelayParser' {
  let RelayParser: typeof import('relay-compiler/lib/core/RelayParser.js')
  export = RelayParser
}
