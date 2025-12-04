import type { MeshContext, SortEnum, SortField } from '@graphcommerce/graphql-mesh'
import type { GetAlgoliaSettingsReturn } from './getAlgoliaSettings'
import type { AttributeList } from './getAttributeList'
import { getIndexName } from './getIndexName'

export type SortingOptions = Record<string, SortField & { dirs: SortEnum[] }>

export function sortFieldsOptions(
  settings: GetAlgoliaSettingsReturn,
  attributeList: AttributeList,
  context: MeshContext,
): SortField[] {
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
    .filter((v) => !!v)
    .forEach((curr) => {
      let attributeCode = curr.sortIndex
      if (curr.sortIndex.startsWith('price')) attributeCode = 'price'

      if (!sortRecord[attributeCode]) {
        sortRecord[attributeCode] = {
          value: attributeCode,
          label: attributeList.find((attr) => attr.code === attributeCode)?.label,
          dirs: [curr.dir],
        }
      } else if (!sortRecord[attributeCode].dirs.includes(curr.dir)) {
        sortRecord[attributeCode].dirs.push(curr.dir)
      }
    }, {})

  return Object.values(sortRecord)
}
