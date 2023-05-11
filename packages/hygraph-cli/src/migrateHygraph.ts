/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import readline from 'readline'
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'
import prompts, { PromptObject } from 'prompts'
import { dynamicRow, GraphCommerce6 } from './migrations'

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

  const possibleMigrations: [string, (name: string | undefined) => Promise<MigrationInfo>][] = [
    ['add_dynamic_rows', dynamicRow],
    ['GraphCommerce6', GraphCommerce6],
  ]
  console.log('\x1b[1m%s\x1b[0m', '[GraphCommerce]: Available migrations: ')

  const question: PromptObject<string> | PromptObject<string>[] = {
    type: 'select',
    name: 'selectedMigration',
    message: '[GraphCommerce]: Select migration',
    choices: [],
  }

  for (const [name, migration] of possibleMigrations) {
    if (Array.isArray(question.choices)) {
      question?.choices?.push({ title: name, value: { name, migration } })
    }
  }

  // TODO: GC-Version based migration
  /** Here we choose a migration from a list of possible migrations */
  try {
    const response = await prompts(question)
    const { migration, name } = response.selectedMigration
    console.log(`You have selected the ${response.selectedMigration.name} migration`)

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await migration(forceRun ? undefined : name)
      console.log(result)
      if (result.status !== 'SUCCESS') {
        throw new Error(
          `[GraphCommerce]: Migration not successful: ${result.status} ${name}:\n${result.errors}`,
        )
      }
      console.log(`Migration successful: ${name}`)
    } catch (err) {
      if (err instanceof Error) {
        const garbledErrorIndex = err.message.indexOf(': {"')
        const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message
        console.error('\x1b[31m\x1b[1m%s\x1b[0m', `[GraphCommerce]: ${msg}`)
      }
    }
  } catch (error) {
    console.error('\x1b[31m\x1b[1m%s\x1b[0m', '[GraphCommerce]: An error occurred:', error)
  }
}
