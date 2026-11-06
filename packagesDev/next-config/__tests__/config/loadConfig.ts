import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Worker } from 'node:worker_threads'
import { demoConfig } from '../../src/config/demoConfig'

const loadConfigUrl = new URL('../../dist/config/loadConfig.js', import.meta.url).href

// Loads the config in a worker thread and posts the path of the temporary config file.
const workerCode = `
const fs = require('node:fs')
const { syncBuiltinESMExports } = require('node:module')
const { parentPort, workerData } = require('node:worker_threads')
const writeFileSync = fs.writeFileSync
fs.writeFileSync = (file, ...args) => {
  if (String(file).includes('.graphcommerce.tmp.')) parentPort.postMessage(String(file))
  return writeFileSync(file, ...args)
}
syncBuiltinESMExports()
import(workerData.loadConfigUrl).then(({ loadConfig }) => loadConfig(workerData.cwd))
`

function temporaryConfigFile(cwd: string) {
  return new Promise<string>((resolve, reject) => {
    const worker = new Worker(workerCode, {
      eval: true,
      workerData: { loadConfigUrl, cwd },
      stdout: true,
      stderr: true,
    })
    worker.once('message', (file: string) => {
      resolve(file)
      void worker.terminate()
    })
    worker.once('error', reject)
  })
}

describe('loadConfig', () => {
  it('gives each worker thread its own temporary config file', async () => {
    const cwd = mkdtempSync(join(tmpdir(), 'gc-load-config-'))
    writeFileSync(
      join(cwd, 'graphcommerce.config.ts'),
      `export default ${JSON.stringify(demoConfig)}\n`,
    )

    try {
      const [first, second] = await Promise.all([
        temporaryConfigFile(cwd),
        temporaryConfigFile(cwd),
      ])
      expect(first).not.toBe(second)
    } finally {
      rmSync(cwd, { recursive: true, force: true })
    }
  })
})
