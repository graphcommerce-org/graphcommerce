import fs from 'fs'
import { GraphCommerceConfig, loadConfig } from '@graphcommerce/next-config'
import { MigrationInfo } from '@hygraph/management-sdk/dist/ManagementAPIClient'
import dotenv from 'dotenv'
import prompts, { PromptObject } from 'prompts'
import { graphcommerceLog } from './functions'
import { dynamicRow, GraphCommerce6 } from './migrations'
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
  const versionParts = graphcommerceVersion.split('.')
  const graphcommerceMinorVersion = `${versionParts[0]}.${versionParts[1]}`

  graphcommerceLog(`Graphcommerce version: ${graphcommerceVersion}`, 'info')

  // ? This goes unused for now
  const versionInput: PromptObject<string> | PromptObject<string>[] = {
    type: 'text',
    name: 'selectedVersion',
    message: '[GraphCommerce]: Select GraphCommerce version (Major.Minor e.g. 6.2)',
    validate: (value: string) => {
      // Validate the version format
      const versionRegex = /^\d+\.\d+$/
      return versionRegex.test(value)
        ? true
        : '[GraphCommerce]: Please enter a valid version (Major.Minor e.g. 6.2)'
    },
  }

  /**
   * Force run will run the migration even if it has already been run before. Hardcoded on true for
   * now. Could be a useful config for the user in a later version.
   */
  const forceRun = true

  // Extract the currently existing models, components and enumerations from the Hygraph schema.
  const schemaViewer = await readSchema(config)
  const schema: Schema = schemaViewer.viewer.project.environment.contentModel

  // A list of possible migrations
  const possibleMigrations: [
    string,
    (
      name: string | undefined,
      config: GraphCommerceConfig,
      schema: Schema,
    ) => Promise<MigrationInfo>,
  ][] = [
    ['Dynamic Rows', dynamicRow],
    ['Upgrade to GraphCommerce 6', GraphCommerce6],
  ]

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
      const result = await migration(forceRun ? undefined : name, config, schema)
      graphcommerceLog(`Migration result: ${JSON.stringify(result)}`, 'info')
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

/**
 * TODO: GC-Version based migration
 *
 * What we want is to enter a GC version. And based on this version we want to run migrations. So
 * one gives the old GC version and the desired one, and the CLI calculates which model updates are
 * necessary.
 *
 * 1. Read out the current schema => | DONE
 * 2. Read out the current GC version | DONE
 * 3. Read out the desired GC version | DONE
 * 4. Write migrations for GC6 and Dynamic Rows | DONE
 * 5. Run the migrations, no errors should occur | DONE
 *
 * Something we can also add is the possibility to run migrations based on the current schema &
 * version, we just determine what version a user is on and create all the entities in the schema.
 * If the apiId of an entity already exists, the migration will skip it and run the next entity.
 * This might be an additional automation for the user and not that necessary at the moment.
 */
