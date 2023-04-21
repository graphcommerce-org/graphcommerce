/* eslint-disable import/no-extraneous-dependencies */
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'
import { dynamicRow } from './migrations/dynamicRow'

export async function migrateHygraph() {
  const forceRun = true

  const possibleMigrations: [string, (name: string | undefined) => Promise<MigrationInfo>][] = [
    ['migrationDynamicRows_fake2', dynamicRow],
  ]

  for (const [name, migration] of possibleMigrations) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await migration(forceRun ? undefined : name)
      console.log(result)

      if (result.status !== 'SUCCESS') {
        throw new Error(`Migration not successful: ${result.status} ${name}:\n${result.errors}`)
      }

      console.log(`Migration successful: ${name}`)
    } catch (err) {
      if (err instanceof Error) {
        const garbledErrorIndex = err.message.indexOf(': {"')
        const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message
        console.error(msg)
      }
    }
  }
}
