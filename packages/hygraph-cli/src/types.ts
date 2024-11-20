// eslint-disable-next-line import/no-extraneous-dependencies
import type { Model, Component, Enumeration, Locale, Stage } from '@hygraph/management-sdk'
import type { MigrationInfo } from '@hygraph/management-sdk/dist/src/ManagementAPIClient'
import type { UpsertClient } from './UpsertClient'

export type Migration = (name: string | undefined) => Promise<MigrationInfo>

export type MigrationFunction = (schema: Schema, client: UpsertClient) => Promise<0 | MigrationInfo>

export type Schema = {
  models: Model[]
  components: Component[]
  enumerations: Enumeration[]
  locales: Locale[]
  stages: Stage[]
}
