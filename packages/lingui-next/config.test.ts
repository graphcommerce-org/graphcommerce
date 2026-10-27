import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { getCatalogs } from '@lingui/cli/api'
import { makeConfig } from '@lingui/conf'
import linguiNextConfig from './config'

it('extracts the messages of .ts and .tsx files, without declaration files', async () => {
  const rootDir = mkdtempSync(join(tmpdir(), 'gc-lingui-next-'))
  writeFileSync(join(rootDir, 'Component.tsx'), 'export {}\n')
  writeFileSync(join(rootDir, 'hook.ts'), 'export {}\n')
  writeFileSync(join(rootDir, 'types.d.ts'), 'export {}\n')

  try {
    const config = makeConfig(
      { ...linguiNextConfig({ locales: ['en'] }), rootDir },
      { skipValidation: true },
    )
    const [catalog] = await getCatalogs(config)

    expect(catalog.sourcePaths.map((file) => basename(file)).sort()).toEqual([
      'Component.tsx',
      'hook.ts',
    ])
  } finally {
    rmSync(rootDir, { recursive: true, force: true })
  }
})
