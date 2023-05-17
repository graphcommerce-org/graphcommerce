/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'
import prompts, { PromptObject } from 'prompts'
import {
  dynamicRow,
  GraphCommerce6,
  removeRowColumnOne,
  removeRowColumnThree,
  removeRowColumnTwo,
  removeRowLinks,
} from './migrations'

export async function migrateHygraph() {
  const forceRun = true

  const possibleMigrations: [string, (name: string | undefined) => Promise<MigrationInfo>][] = [
    ['Dynamic Rows', dynamicRow],
    ['Upgrade to GraphCommerce 6', GraphCommerce6],
    ['Remove RowColumnOne', removeRowColumnOne],
    ['Remove RowColumnTwo', removeRowColumnTwo],
    ['Remove RowColumnThree', removeRowColumnThree],
    ['Remove RowLinks', removeRowLinks],
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

/**
 * TODO: GC-Version based migration
 *
 * What we want is to enter a GC version. And based on this version we want to run migrations. So
 * one gives the old GC version and the desired one, and the CLI calculates which model updates are
 * necessary.
 *
 * 1. Read out the current model => //? This can be done with the Management API viewer prop
 * 2. Read out the current GC version
 * 3. Read out the desired GC version
 * 4. Calculate the necessary migrations
 * 5. Run the migrations, no errors should occur
 */
