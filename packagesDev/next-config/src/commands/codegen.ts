import { codegenInterceptors } from './codegenInterceptors'
import { copyFiles } from './copyFiles'
import { generateConfig } from './generateConfig'
import { generateConfigValues } from './generateConfigValues'

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
