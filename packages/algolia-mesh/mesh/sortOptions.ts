import {
  AlgoliaindexSettings,
  MeshContext,
  ProductAttributeSortInput,
  SortEnum,
  SortField,
} from '@graphcommerce/graphql-mesh'
import { nonNullable } from '@graphcommerce/magento-customer'
import { AttributeList } from './getAttributeList'
import { getIndexName } from './getIndexName'

export type SortingOptions = Record<string, SortField & { dirs: SortEnum[] }>

export function sortingOptions(
  settings: AlgoliaindexSettings,
  attributeList: AttributeList,
  context: MeshContext,
): SortingOptions {
  const sortRecord: SortingOptions = {
    relevance: { label: 'Relevance', value: 'relevance', dirs: ['DESC'] },
  }

  ;(settings.replicas ?? [])
    .map((replica) => {
      if (!replica) return null

      const regex = new RegExp(
        `virtual\\(${getIndexName(context)}_(?<sortIndex>.*)_(?<dir>[^_]+)\\)`,
      )

      const res = regex.exec(replica)
      if (!res) return null

      const { dir, sortIndex } = res.groups ?? {}

      return dir.toUpperCase() === 'DESC'
        ? { dir: 'DESC' as const, sortIndex }
        : { dir: 'ASC' as const, sortIndex }
    })
    .filter(nonNullable)
    .forEach((curr) => {
      let attributeCode = curr.sortIndex
      if (curr.sortIndex.startsWith('price')) attributeCode = 'price'

      if (!sortRecord[attributeCode]) {
        sortRecord[attributeCode] = {
          value: attributeCode,
          label: attributeList.find((attr) => attr.code === attributeCode)?.label,
          dirs: [curr.dir],
        }
      } else {
        sortRecord[attributeCode].dirs.push(curr.dir)
      }
    }, {})

  return sortRecord
}

export function getSortedIndex(
  context: MeshContext,
  sortInput: ProductAttributeSortInput | null = {},
  sortOptions: SortingOptions,
  settings: AlgoliaindexSettings,
): string {
  const baseIndex = getIndexName(context)
  const availableSorting = Object.values(sortOptions)
  const requestedSort = Object.entries(sortInput ?? {}).filter(nonNullable)
  if (!requestedSort.length) return baseIndex

  const foundSort = requestedSort.find(([sortAttr, sortValue]) => {
    return availableSorting.some(
      (sorting) => sorting.value === sortAttr && sorting.dirs.includes(sortValue ?? 'ASC'),
    )
  })

  if (!foundSort) {
    console.log(
      'Requested sort not found in available sorting options, falling back to relevance',
      { requestedSort },
    )
    return baseIndex
  }

  const [attr, dir] = foundSort

  const found = settings.replicas?.find((replica) => {
    return (
      replica?.startsWith(`virtual(${baseIndex}_${attr}`) &&
      replica?.endsWith(`${dir?.toLowerCase()})`)
    )
  })

  return found ? found?.slice(8, -1) : baseIndex
}
