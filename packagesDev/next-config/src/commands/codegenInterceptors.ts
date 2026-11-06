import dotenv from 'dotenv'
import { loadConfig } from '../config/loadConfig'
import { findPlugins } from '../interceptors/findPlugins'
import { generateInterceptors } from '../interceptors/generateInterceptors'
import { updatePackageExports } from '../interceptors/updatePackageExports'
import { writeInterceptors } from '../interceptors/writeInterceptors'
import { resolveDependency } from '../utils/resolveDependency'

dotenv.config({ quiet: true })

export async function codegenInterceptors() {
  const conf = loadConfig(process.cwd())

  const [plugins] = findPlugins(conf)

  // Update package.json exports before generating interceptors
  console.info('🔄 Updating package.json exports for plugins...')
  await updatePackageExports(plugins)

  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug,
    true,
  )

  await writeInterceptors(generatedInterceptors)

  console.info('✅ Generated interceptors and moved original files')
}
