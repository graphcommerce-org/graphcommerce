import { DeepAwait, deepAwait } from '../lib/deepAwait'

export type TypeEqual<Target, Value> = (<T>() => T extends Target ? 1 : 2) extends <
  T,
>() => T extends Value ? 1 : 2
  ? true
  : false

export const expectType = <Type>(_: Type): void => void 0

type Example = {
  promiseField: Promise<true>
  noPromise: boolean
  nested: Promise<{
    href: string
    promiseNested: Promise<string>
  }>
}
type Example2 = [Promise<true>, Promise<true>, false, Example]
type Example3 = Promise<string>

it('correctly deeply removes all promises from types', () => {
  type ExpectedExample = {
    promiseField: true
    noPromise: boolean
    nested: {
      href: string
      promiseNested: string
    }
  }

  expectType<TypeEqual<DeepAwait<Example>, ExpectedExample>>(true)
  expectType<TypeEqual<DeepAwait<Example2>, [true, true, false, ExpectedExample]>>(true)
  expectType<TypeEqual<DeepAwait<Example3>, string>>(true)
})

it('correctly deeply removes all promises from values', async () => {
  const example: Example = {
    promiseField: Promise.resolve(true),
    noPromise: false,
    nested: Promise.resolve({
      href: 'string',
      promiseNested: Promise.resolve('string'),
    }),
  }

  const example2: Example2 = [Promise.resolve(true), Promise.resolve(true), false, example]
  const example3: Example3 = Promise.resolve(true)

  const example1Result = {
    promiseField: true,
    noPromise: false,
    nested: {
      href: 'string',
      promiseNested: 'string',
    },
  }
  expect(await deepAwait(example)).toEqual(example1Result)
  expect(await deepAwait(example2)).toEqual([true, true, false, example1Result])
  expect(await deepAwait(example3)).toEqual(true)

  expect(await deepAwait([example, example2, example3])).toEqual([
    example1Result,
    [true, true, false, example1Result],
    true,
  ])
})
