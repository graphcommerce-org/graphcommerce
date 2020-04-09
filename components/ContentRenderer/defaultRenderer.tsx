import dynamic from 'next/dynamic'
import { Renderers } from './ContentRenderer'
import { GQLRowHeroFragment } from '../../generated/graphql'

const registerDefaultRenderer = (renderers: Renderers) => {
  renderers.RowHero = dynamic<GQLRowHeroFragment>(() => import('../RowHero'))
}

export default registerDefaultRenderer
