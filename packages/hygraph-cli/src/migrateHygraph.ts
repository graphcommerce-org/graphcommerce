import fs from 'fs'
import { loadConfig } from '@graphcommerce/next-config'
import type { MigrationInfo } from '@hygraph/management-sdk/dist/src/ManagementAPIClient'
import dotenv from 'dotenv'
import prompts, { PromptObject } from 'prompts'
import { graphcommerceLog } from './log-functions'
import * as migrations from './migrations'
import { readSchema } from './readSchema'
import { Schema } from './types'

dotenv.config()

export async function migrateHygraph() {
  const config = loadConfig(process.cwd())

  /**
   * Extracting the current GC version. Are we gonna use the current version to determine which
   * scripts should be runned? Or do we let the user pick the migration from a list? 🤔
   */
  const packageJson = fs.readFileSync('package.json', 'utf8')
  const packageData = JSON.parse(packageJson)
  const graphcommerceVersion = packageData.dependencies['@graphcommerce/next-ui']

  graphcommerceLog(`Graphcommerce version: ${graphcommerceVersion}`, 'info')

  // Extract the currently existing models, components and enumerations from the Hygraph schema.
  const schemaViewer = await readSchema(config)
  const schema: Schema = schemaViewer.viewer.project.environment.contentModel

  // A list of possible migrations
  const possibleMigrations: [string, (schema: Schema) => Promise<0 | MigrationInfo>][] =
    Object.entries(migrations)

  // Here we setup the list we ask the user to choose from
  const selectMigrationInput: PromptObject<string> | PromptObject<string>[] = {
    type: 'select',
    name: 'selectedMigration',
    message: '\x1b[36m\x1b[1m[GraphCommerce]: Select migration',
    choices: [],
  }

  for (const [name, migration] of possibleMigrations) {
    if (Array.isArray(selectMigrationInput.choices)) {
      selectMigrationInput?.choices?.push({ title: name, value: { name, migration } })
    }
  }

  // Here we ask the user to choose a migration from a list of possible migrations
  try {
    graphcommerceLog('Available migrations: ', 'info')
    const selectMigrationOutput = await prompts(selectMigrationInput)
    const { migration, name } = selectMigrationOutput.selectedMigration
    graphcommerceLog(
      `You have selected the ${selectMigrationOutput.selectedMigration.name} migration`,
      'info',
    )

    try {
      // Here we try to run the migration
      // eslint-disable-next-line no-await-in-loop
      const result = await migration(schema)

      graphcommerceLog(`Migration result: ${JSON.stringify(result)}`, 'info')
      if (!result) {
        throw new Error(
          '[GraphCommerce]: No migration client found. Please make sure your GC_HYGRAPH_WRITE_ACCESS_ENDPOINT and GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file are correct.',
        )
      }
      if (result.status !== 'SUCCESS') {
        throw new Error(
          `[GraphCommerce]: Migration not successful: ${result.status} ${name}:\n${result.errors}`,
        )
      }

      graphcommerceLog(`Migration successful: ${name}`, 'info')
    } catch (err) {
      if (err instanceof Error) {
        const garbledErrorIndex = err.message.indexOf(': {"')
        const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message
        graphcommerceLog(`${msg}`, 'error')
      }
    }
  } catch (error) {
    graphcommerceLog(`[GraphCommerce]: An error occurred: ${error}`, 'error')
  }
}
