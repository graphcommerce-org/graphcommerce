import dotenv from 'dotenv'
import { loadConfig } from '../config/loadConfig'
import { findPlugins } from '../interceptors/findPlugins'
import { generateInterceptors } from '../interceptors/generateInterceptors'
import { writeInterceptors } from '../interceptors/writeInterceptors'
import { resolveDependency } from '../utils/resolveDependency'

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
