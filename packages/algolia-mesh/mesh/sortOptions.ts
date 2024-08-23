import {
  AlgoliasettingsResponse,
  MeshContext,
  ProductAttributeSortInput,
  SortEnum,
  SortField,
} from '@graphcommerce/graphql-mesh'
import { nonNullable } from '@graphcommerce/magento-customer'
import { AttributeList } from './getAttributeList'
import { getIndexName } from './getIndexName'

export type SortingOptions = Record<string, SortField & { dirs: SortEnum[] }>

export async function sortingOptions(
  settings: AlgoliasettingsResponse,
  attributeList: AttributeList,
  context: MeshContext,
): Promise<SortingOptions> {
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

export async function getSortedIndex(
  context: MeshContext,
  settings: Promise<AlgoliasettingsResponse>,
  sortInput: ProductAttributeSortInput | null = {},
): Promise<string> {
  const baseIndex = getIndexName(context)
  // const availableSorting = Object.values(sortOptions)
  const [attr, dir] = Object.entries(sortInput ?? {}).filter(nonNullable)?.[0] ?? []
  if (!attr || !dir) return baseIndex

  const found = (await settings).replicas?.find(
    (replica) =>
      replica?.startsWith(`virtual(${baseIndex}_${attr}`) &&
      replica?.endsWith(`${dir?.toLowerCase()})`),
  )

  return found ? found?.slice(8, -1) : baseIndex
}
