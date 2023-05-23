import { loadConfig } from '../loadConfig.js'
import { exportConfigToEnv } from '../utils/exportConfigToEnv.js'

// eslint-disable-next-line @typescript-eslint/require-await
export async function exportConfig() {
  const conf = loadConfig(process.cwd())
  console.log(exportConfigToEnv(conf))
}
