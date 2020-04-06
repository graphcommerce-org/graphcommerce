import dynamic from 'next/dynamic'
import { Renderers } from './ContentRenderer'
import { GQLRowHeroVideoFragment } from '../../generated/graphql'

const registerDefaultRenderer = (renderers: Renderers) => {
  renderers.RowHeroVideo = dynamic<GQLRowHeroVideoFragment>(() => import('../RowHeroVideo'))
}

export default registerDefaultRenderer
