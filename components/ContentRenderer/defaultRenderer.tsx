import React from 'react'
import dynamic from 'next/dynamic'
import { Renderers, setRenderers } from './ContentRenderer'

const registerDefaultRenderer = () => {
  const renderers = {
    RowHero: dynamic<GQLRowHeroFragment>(() => import('../RowHero')),
    RowColumnOne: dynamic<GQLRowColumnOneFragment>(() => import('../RowColumnOne')),
    RowColumnTwo: dynamic<GQLRowColumnTwoFragment>(() => import('../RowColumnTwo')),
    RowColumnThree: dynamic<GQLRowColumnThreeFragment>(() => import('../RowColumnThree')),
    RowCompanySlider: dynamic<GQLRowCompanySliderFragment>(() => import('../RowCompanySlider')),
    RowPeopleWithText: dynamic<GQLRowPeopleWithTextFragment>(() => import('../RowPeopleWithText')),
    RowRecentBlogPost: () => <div>RecentBlogPosts not yet implemented</div>,
    RowServicesWithText: () => <div>RowServicesWithText not yet implemented</div>,
    RowYoutubeVideo: dynamic<GQLRowYoutubeVideoFragment>(() => import('../RowYoutubeVideo')),
  } as Required<Renderers>
  setRenderers(renderers)
}

export default registerDefaultRenderer
