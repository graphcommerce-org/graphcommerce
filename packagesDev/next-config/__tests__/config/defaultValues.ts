import { GraphCommerceConfigSchema } from '../../src/generated/config'

it('applies the GraphQL default to a field without a value', () => {
  const { shape } = GraphCommerceConfigSchema()
  expect(shape.containerSizingShell.parse(undefined)).toBe('FULL_WIDTH')
  expect(shape.containerSizingShell.parse(null)).toBeNull()
  expect(shape.containerSizingShell.parse('BREAKPOINT')).toBe('BREAKPOINT')
})
