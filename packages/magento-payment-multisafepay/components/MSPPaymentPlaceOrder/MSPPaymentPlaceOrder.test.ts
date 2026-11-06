import { fileURLToPath } from 'node:url'
import ts from 'typescript'

// The GraphQL documents of this package are generated only in a project, so the test checks the
// names of the component with TypeScript and does not render it.
it('uses only declared names', () => {
  const file = fileURLToPath(new URL('./MSPPaymentPlaceOrder.tsx', import.meta.url))
  const program = ts.createProgram([file], {
    noEmit: true,
    noResolve: true,
    jsx: ts.JsxEmit.ReactJSX,
    types: [],
  })
  const cannotFindName = 2304
  const undeclared = ts
    .getPreEmitDiagnostics(program)
    .filter(
      (diagnostic) => diagnostic.file?.fileName === file && diagnostic.code === cannotFindName,
    )

  expect(undeclared.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))).toEqual([])
})
