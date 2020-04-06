import React from 'react'
import { GQLMenuFragment, GQLLocale, GQLPageMetaFragment } from '../../generated/graphql'
import Link from '../Link'

type TreePage = GQLMenuFragment['pages'][0] & { children: TreePage[]; parent?: TreePage }
export type MenuProps = { mainMenu: GQLMenuFragment; page: GQLPageMetaFragment }

const Menu: React.FC<MenuProps> = ({ mainMenu, page }) => {
  const treePages: TreePage[] = mainMenu.pages.map((p) => ({ ...p, children: [] }))
  treePages.forEach((p, idx) => {
    const parentUrl = p.url.split('/').slice(0, -1).join('/')
    const parent = treePages.find((pp) => pp.url === parentUrl)
    p.parent = parent
    if (parent) parent.children.push(p)
  })
  const roots = treePages.filter((p) => !p.parent)

  const renderPage = (p: TreePage) => {
    return (
      <>
        <Link href={p.url} metaRobots={p.metaRobots!} key={p.id}>
          {p.title}
        </Link>
        {p.children && (
          <ul>
            {p.children.map((child) => (
              <li key={child.id}>{renderPage(child)}</li>
            ))}
          </ul>
        )}
      </>
    )
  }

  return (
    <ul>
      {roots.map((root) => (
        <li key={root.id}>{renderPage(root)}</li>
      ))}
    </ul>
  )
}

export default Menu
