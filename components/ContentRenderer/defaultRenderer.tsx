import dynamic from 'next/dynamic'
import { Renderers } from './ContentRenderer'

const registerDefaultRenderer = (renderers: Renderers) => {
  renderers.RowHero = dynamic<GQLRowHeroFragment>(() => import('../RowHero'))
}

export default registerDefaultRenderer
