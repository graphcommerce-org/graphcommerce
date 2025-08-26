import dotenv from 'dotenv'
import { loadConfig } from '../../config/loadConfig'
import { resolveDependency } from '../../utils/resolveDependency'
import { findPlugins } from '../findPlugins'
import { generateInterceptors } from '../generateInterceptors'
import { writeInterceptors } from '../writeInterceptors'

dotenv.config()

// eslint-disable-next-line @typescript-eslint/require-await
export async function codegenInterceptors() {
  const conf = loadConfig(process.cwd())

  const [plugins] = findPlugins(conf)

  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug,
    true,
  )

  await writeInterceptors(generatedInterceptors)

  console.info('✅ Generated interceptors and moved original files')
}
