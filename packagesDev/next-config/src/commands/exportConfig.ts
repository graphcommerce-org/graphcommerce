import dotenv from 'dotenv'
import { loadConfig } from '../config/loadConfig'
import { exportConfigToEnv } from '../config/utils/exportConfigToEnv'

dotenv.config({ quiet: true })

// eslint-disable-next-line @typescript-eslint/require-await
export async function exportConfig() {
  const conf = loadConfig(process.cwd())
  // eslint-disable-next-line no-console
  console.log(exportConfigToEnv(conf))
}
