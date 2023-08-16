// eslint-disable-next-line import/no-extraneous-dependencies
import { Model, Component, Enumeration } from '@hygraph/management-sdk'
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'

export type Migration = (name: string | undefined) => Promise<MigrationInfo>

export type Schema = {
  models: Model[]
  components: Component[]
  enumerations: Enumeration[]
}
