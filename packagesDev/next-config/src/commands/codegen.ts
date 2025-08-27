import { generateConfig } from '../config/commands/generateConfig'
import { generateConfigValues } from '../config/commands/generateConfigValues'
import { codegenInterceptors } from '../interceptors/commands/codegenInterceptors'
import { copyFiles } from './copyFiles'

/** Run all code generation steps in sequence */
export async function codegen() {
  // Copy files from packages to project
  console.info('🔄 Copying files from packages to project...')
  await copyFiles()

  // Generate GraphCommerce config types
  console.info('⚙️  Generating GraphCommerce config types...')
  await generateConfig()

  // Generate config values for treeshaking
  console.info('📦 Generating treeshakable config values...')
  await generateConfigValues()

  // Generate interceptors
  console.info('🔌 Generating interceptors...')
  await codegenInterceptors()
}
