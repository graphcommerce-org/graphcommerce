// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BatchMigrationCreateComponentInput,
  BatchMigrationCreateEnumerationInput,
  BatchMigrationCreateModelInput,
} from '@hygraph/management-sdk'
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'

export type Migration = (name: string | undefined) => Promise<MigrationInfo>

export type Schema = {
  models: BatchMigrationCreateModelInput[]
  components: BatchMigrationCreateComponentInput[]
  enumerations: BatchMigrationCreateEnumerationInput[]
}
