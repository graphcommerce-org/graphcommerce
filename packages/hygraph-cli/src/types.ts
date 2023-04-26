// eslint-disable-next-line import/no-extraneous-dependencies
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'

export type Migration = (name: string | undefined) => Promise<MigrationInfo>
