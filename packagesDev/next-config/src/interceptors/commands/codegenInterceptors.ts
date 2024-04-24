import { loadConfig } from '../../config/loadConfig'
import { resolveDependency } from '../../utils/resolveDependency'
import { findPlugins } from '../findPlugins'
import { generateInterceptors } from '../generateInterceptors'
import { writeInterceptors } from '../writeInterceptors'

// eslint-disable-next-line @typescript-eslint/require-await
export async function codegenInterceptors() {
  const conf = loadConfig(process.cwd())

  const [plugins, errors] = findPlugins(conf)

  const generatedInterceptors = await generateInterceptors(
    plugins,
    resolveDependency(),
    conf.debug,
    true,
  )

  // const generated = Date.now()
  // console.log('Generated interceptors in', generated - found, 'ms')

  await writeInterceptors(generatedInterceptors)
}
