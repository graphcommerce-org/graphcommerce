import { loadConfig } from '../loadConfig'
import { exportConfigToEnv } from '../utils/exportConfigToEnv'

// eslint-disable-next-line @typescript-eslint/require-await
export async function exportConfig() {
  const conf = loadConfig(process.cwd())
  // eslint-disable-next-line no-console
  console.log(exportConfigToEnv(conf))
}
