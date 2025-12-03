import { spawn } from 'child_process'

function run(cmd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, { stdio: 'inherit', cwd: process.cwd(), shell: true })
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} failed`))))
  })
}

/** Run all code generation steps in sequence using separate processes */
export async function codegen() {
  await run('graphcommerce copy-files')
  await run('graphcommerce codegen-config')
  await run('graphcommerce codegen-config-values')
  await run('graphcommerce codegen-interceptors')
}
