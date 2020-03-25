import dynamic from 'next/dynamic'
import { Renderers } from './ContentRenderer'
import { GQLHeroBannerFragment } from '../../generated/graphql'

export const registerDefaultRenderer = (renderers: Renderers) => {
  renderers.HeroBanner = dynamic<GQLHeroBannerFragment>(() => import('../HeroBanner'))
}
