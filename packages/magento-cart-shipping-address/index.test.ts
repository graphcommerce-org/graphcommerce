import { fileURLToPath } from 'node:url'
import ts from 'typescript'

it('exports the modules that a shop imports', () => {
  const root = fileURLToPath(new URL('.', import.meta.url))
  const files = ts.sys
    .readDirectory(root, ['.ts', '.tsx'])
    .filter((file) => !file.includes('/node_modules/') && !/\.test\.tsx?$/.test(file))
  const program = ts.createProgram(files, {
    noEmit: true,
    noResolve: true,
    jsx: ts.JsxEmit.ReactJSX,
  })
  const checker = program.getTypeChecker()
  const index = program.getSourceFile(`${root}index.ts`)
  const moduleSymbol = index && checker.getSymbolAtLocation(index)
  const exported = moduleSymbol ? checker.getExportsOfModule(moduleSymbol).map((s) => s.name) : []

  expect(exported).toEqual(
    expect.arrayContaining([
      'GetAddressesDocument',
      'isCartAddressACustomerAddress',
      'isSameAddress',
    ]),
  )
})
