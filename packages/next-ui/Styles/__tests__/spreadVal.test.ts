import { spreadLinear, spreadVal } from '../spreadVal'

it('generates the right spreadVal', () => {
  const s = (val: unknown) => JSON.stringify(val)

  expect(s(spreadLinear(15, 18, 'xl'))).toMatchInlineSnapshot(`"[15,15.53,16.2,17.28,18]"`)
  expect(s(spreadLinear(15, 18))).toMatchInlineSnapshot(`"[15,16.31,18,18,18]"`)

  expect(s(spreadVal(15, 18, 'xl'))).toMatchInlineSnapshot(`"[15,15.09,15.48,16.73,18]"`)
  expect(s(spreadVal(15, 18))).toMatchInlineSnapshot(`"[15,15.57,18,18,18]"`)
})
