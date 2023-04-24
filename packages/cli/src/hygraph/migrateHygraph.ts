/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import readline from 'readline'
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'
import { dynamicRow } from './migrations/dynamicRow'

export async function migrateHygraph() {
  let forceRun = false

  // Interface to determine if force run should be enabled
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  const affirmativeAnswers = ['y', 'yes', 'Y', 'YES']

  const handleKeypress = (key: string) => {
    if (affirmativeAnswers.includes(key.toLowerCase())) {
      console.log('\nForce run enabled')
      forceRun = true
    } else {
      console.log('\nForce run disabled')
      forceRun = false
    }

    process.stdin.pause()
  }

  // Listen for keypress events
  process.stdin.on('keypress', handleKeypress)
  process.stdin.setRawMode(true)
  process.stdin.resume()

  console.log('Enable force run? (y/n)')

  // Wait for input
  await new Promise<void>((resolve) => {
    process.stdin.once('data', () => {
      // Stop listening for input
      process.stdin.removeListener('keypress', handleKeypress)
      process.stdin.setRawMode(false)

      resolve()
    })
  })

  // TODO: Choose migration
  // TODO: GC-Version based migration
  const possibleMigrations: [string, (name: string | undefined) => Promise<MigrationInfo>][] = [
    ['add_dynamic_rows', dynamicRow],
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
