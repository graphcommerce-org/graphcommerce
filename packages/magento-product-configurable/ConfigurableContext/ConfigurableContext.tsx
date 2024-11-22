import type { Context, Dispatch, SetStateAction } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ConfigurableProductFormFragment } from './ConfigurableProductForm.gql'
import cheapestVariant from './cheapestVariant'

type ConfigurableProductFormProps = ConfigurableProductFormFragment & {
  sku: string
  children?: React.ReactNode
}

export type Selected = { [attrCode: string]: number }
export type Variants = NonNullable<ConfigurableProductFormProps['variants']>
type GetVariants = (values?: Selected) => Variants
type GetUids = (values?: Selected) => string[]

type ConfigurableContext = {
  selection: Selected
  variants: Variants
  cheapest: Variants[0]
  select: Dispatch<SetStateAction<Selected>>
  options: ConfigurableProductFormFragment['configurable_options']
  getVariants: GetVariants
  getUids: GetUids
}
const contexts: { [sku: string]: Context<ConfigurableContext> } = {}

function configurableContext(sku: string): Context<ConfigurableContext> {
  if (contexts?.[sku]) return contexts[sku]
  contexts[sku] = createContext<ConfigurableContext>({
    selection: {},
    variants: [],
    cheapest: {},
    select: () => {},
    options: undefined,
    getVariants: () => [],
    getUids: () => [],
  })

  return contexts[sku]
}

type AttributeTree = {
  code: string
  values: AttributeValues
}
type AttributeValues = {
  [index: string]: {
    variants: NonNullable<ConfigurableProductFormProps['variants']>
    attribute?: AttributeTree
  }
}

function generateAttrTree(
  idx: number,
  options: ConfigurableProductFormProps['configurable_options'],
  variants: ConfigurableProductFormProps['variants'],
  selected: Selected,
  tree?: AttributeTree,
) {
  const attribute = options?.[idx]
  if (!attribute || !attribute.attribute_code) return tree

  const attributeTree: AttributeTree = { code: attribute.attribute_code, values: {} }

  attribute.values?.forEach((val) => {
    if (!val?.uid) return
    const newSelected = { ...selected, [attributeTree.code]: [val.uid] } as Selected

    const filteredVariants = variants?.filter(
      (variant) =>
        !!variant?.attributes?.find(
          (attr) => attr?.code === attribute.attribute_code && val.uid === attr?.uid,
        ),
    )

    attributeTree.values[val.uid] = {
      variants: filteredVariants ?? [],
      attribute: generateAttrTree(idx + 1, options, filteredVariants, newSelected),
    }
  })

  return attributeTree
}

function traverseAttrTree(selection: Selected, attrTree: AttributeTree | undefined): Variants {
  if (!attrTree) return []

  const id = selection?.[attrTree.code]
  const attrVal = id ? attrTree.values[id] : undefined

  // We have a request, but isn't found in the current tree node
  if (id && !attrVal) return []

  if (attrVal?.attribute) return traverseAttrTree(selection, attrVal.attribute)
  if (attrVal?.variants) return attrVal.variants

  const attrValues = Object.entries(attrTree.values)
  const variantList: NonNullable<ConfigurableProductFormProps['variants']> = []

  attrValues.forEach(([optionId, attrVal2]) => {
    variantList.push(
      ...(attrVal2.attribute
        ? traverseAttrTree({ ...selection, [attrTree.code]: Number(optionId) }, attrVal2.attribute)
        : attrVal2.variants),
    )
  })

  return variantList
}

export function ConfigurableContextProvider(props: ConfigurableProductFormProps) {
  const { children, sku, configurable_options, variants: providedVariants } = props
  const [selection, select] = useState<Selected>({})

  if (!configurable_options || !providedVariants)
    throw Error('please provide configurabl_options and variants')

  const lookupTree = useMemo(
    () => generateAttrTree(0, configurable_options, providedVariants, {}),
    [configurable_options, providedVariants],
  )

  const getVariants: GetVariants = useCallback(
    (options: Selected = {}) => traverseAttrTree(options, lookupTree),
    [lookupTree],
  )

  const getUids: GetUids = useCallback(
    (options: Selected = {}) =>
      (getVariants(options as unknown as Selected) ?? [])
        .map((variant) => (variant?.attributes?.map((attr) => attr?.uid) ?? []) as string[])
        .flat(),
    [getVariants],
  )

  const context = configurableContext(sku)
  const variants = getVariants(selection)

  const value = useMemo(
    () => ({
      selection,
      variants,
      cheapest: cheapestVariant(variants),
      select,
      getVariants,
      getUids,
      options: configurable_options,
    }),
    [configurable_options, getUids, getVariants, selection, variants],
  )

  return <context.Provider value={value}>{children}</context.Provider>
}

export function useConfigurableContext(sku: string): ConfigurableContext {
  return useContext(configurableContext(sku))
}
