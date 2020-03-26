import dynamic from 'next/dynamic'
import { Renderers } from './ContentRenderer'
import { GQLRowHeroVideoFragment } from '../../generated/graphql'

export const registerDefaultRenderer = (renderers: Renderers) => {
  renderers.RowHeroVideo = dynamic<GQLRowHeroVideoFragment>(() => import('../RowHeroVideo'))
}
