import fs from 'node:fs'
import path from 'path'
import { GenerateInterceptorsReturn } from './generateInterceptors'

export function writeInterceptors(
  interceptors: GenerateInterceptorsReturn,
  cwd: string = process.cwd(),
) {
  Object.entries(interceptors).forEach(([target, plugin]) => {
    // eslint-disable-next-line no-console
    const fileToWrite = `${path.join(cwd, plugin.fromRoot)}.interceptor.tsx`

    if (
      !fs.existsSync(fileToWrite) ||
      fs.readFileSync(fileToWrite, 'utf8').toString() !== plugin.template
    ) {
      fs.writeFileSync(fileToWrite, plugin.template)
    }
  })
}
