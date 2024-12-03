import { generateConfig } from '../config/commands/generateConfig'
import { codegenInterceptors } from '../interceptors/commands/codegenInterceptors'
import { copyFiles } from './copyFiles'

/** Run all code generation steps in sequence */
export async function codegen() {
  // Copy files from packages to project
  console.log('🔄 Copying files from packages to project...')
  await copyFiles()

  // Generate GraphCommerce config types
  console.log('⚙️  Generating GraphCommerce config types...')
  await generateConfig()

  // Generate interceptors
  console.log('🔌 Generating interceptors...')
  await codegenInterceptors()
}
