// eslint-disable-next-line import/no-extraneous-dependencies
import type { Model, Component, Enumeration } from '@hygraph/management-sdk'
import type { MigrationInfo } from '@hygraph/management-sdk/dist/src/ManagementAPIClient'

export type Migration = (name: string | undefined) => Promise<MigrationInfo>

export type Schema = {
  models: Model[]
  components: Component[]
  enumerations: Enumeration[]
}
