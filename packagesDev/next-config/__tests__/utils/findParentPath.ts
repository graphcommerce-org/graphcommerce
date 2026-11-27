import fs from 'fs'
import os from 'os'
import path from 'path'
import { findParentPath } from '../../src/utils/findParentPath'

const root = fs.mkdtempSync(path.join(os.tmpdir(), 'find-parent-path-'))

const write = (dir: string, packageJson: object) => {
  fs.mkdirSync(path.join(root, dir), { recursive: true })
  fs.writeFileSync(path.join(root, dir, 'package.json'), JSON.stringify(packageJson))
}

write('.', {
  name: '@graphcommerce/private',
  workspaces: ['graphcommerce', 'graphcommerce/examples/*'],
})
write('graphcommerce', { name: '@graphcommerce/graphcommerce', workspaces: ['examples/*'] })
write('graphcommerce/examples/shop', { name: '@graphcommerce/shop' })
write('.tmp/worktree', { name: '@graphcommerce/private', workspaces: ['graphcommerce'] })
write('.tmp/worktree/graphcommerce', { name: '@graphcommerce/graphcommerce' })

afterAll(() => fs.rmSync(root, { recursive: true, force: true }))

it('returns the parent that has the directory as a workspace', () => {
  expect(findParentPath(path.join(root, 'graphcommerce/examples/shop'))).toBe(
    path.join(root, 'graphcommerce'),
  )
  expect(findParentPath(path.join(root, 'graphcommerce'))).toBe(root)
  expect(findParentPath(path.join(root, '.tmp/worktree/graphcommerce'))).toBe(
    path.join(root, '.tmp/worktree'),
  )
})

it('returns null for a checkout inside another repository', () => {
  expect(findParentPath(path.join(root, '.tmp/worktree'))).toBeNull()
})
