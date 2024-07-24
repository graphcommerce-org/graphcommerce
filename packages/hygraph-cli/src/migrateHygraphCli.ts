import fs from 'fs'
import { loadConfig } from '@graphcommerce/next-config'
import dotenv from 'dotenv'
import prompts, { PromptObject } from 'prompts'
import { UpsertClient } from './UpsertClient'
import * as availableMigrations from './migrations'
import { readSchema } from './readSchema'
import { MigrationFunction, Schema } from './types'
import { getConfig } from './utils/getConfig'
import { getEnvironment } from './utils/getEndpointUrl'
import { getManagementClient } from './utils/getManagementClient'
import { graphcommerceLog } from './utils/graphCommerceLog'

dotenv.config()

export async function migrateHygraphCli() {
  const hygraphConfig = getConfig(loadConfig(process.cwd()))

  /**
   * Extracting the current GC version. Are we gonna use the current version to determine which
   * scripts should be runned? Or do we let the user pick the migration from a list? 🤔
   */
  const packageJson = fs.readFileSync('package.json', 'utf8')
  const packageData = JSON.parse(packageJson)
  const graphcommerceVersion = packageData.dependencies['@graphcommerce/next-ui']
  graphcommerceLog(`Graphcommerce version: ${graphcommerceVersion}`, 'info')

  const mangementClient = getManagementClient(hygraphConfig)
  // Extract the currently existing models, components and enumerations from the Hygraph schema.
  const schemaViewer = await readSchema(mangementClient, hygraphConfig.projectId)
  const schema: Schema = schemaViewer.viewer.project.environment.contentModel

  // A list of possible migrations
  const possibleMigrations: [string, MigrationFunction][] = Object.entries(availableMigrations)

  // Here we setup the list we ask the user to choose from
  const selectMigrationInput: PromptObject<string> = {
    type: 'select',
    name: 'selectedMigration',
    message: '\x1b[36m\x1b[1m[]: Select migration',
    choices: possibleMigrations.map(([name, migration]) => ({
      title: name,
      value: { name, migration },
    })),
  }

  // Here we ask the user to choose a migration from a list of possible migrations
  try {
    graphcommerceLog('Available migrations: ', 'info')
    const selectMigrationOutput = await prompts(selectMigrationInput)

    let { migration, name } = selectMigrationOutput.selectedMigration as {
      name: string
      migration: MigrationFunction
    }

    graphcommerceLog(
      `You have selected the ${selectMigrationOutput.selectedMigration.name} migration`,
      'info',
    )

    try {
      const { endpoint, migrations } = await getEnvironment(mangementClient, hygraphConfig)

      const migrationExists = migrations.find(
        (m) => m.name?.startsWith(name) && m.status === 'SUCCESS',
      )
      if (migrationExists) {
        if (!process.argv.includes('--force')) {
          graphcommerceLog(
            `Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. To rerun this migration use the --force option. Exiting now..`,
            'info',
          )
          process.exit(1)
        } else {
          graphcommerceLog(
            `Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. Using --force, rerunning migration..`,
            'warning',
          )
        }
        name = `${name}-${Date.now()}`
      }

      // Here we try to run the migration
      const result = await migration(
        schema,
        new UpsertClient({ authToken: hygraphConfig.authToken, endpoint, name }, schema),
      )

      graphcommerceLog(`Migration result: ${JSON.stringify(result)}`, 'info')
      if (!result) {
        graphcommerceLog(
          'No migration client found. Please make sure your GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file is correct.',
        )
        process.exit(1)
      }
      if (result.status !== 'SUCCESS') {
        graphcommerceLog(`Migration not successful: ${result.status} ${name}:\n${result.errors}`)
        process.exit(1)
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
    graphcommerceLog(`An error occurred: ${error}`, 'error')
  }
}
