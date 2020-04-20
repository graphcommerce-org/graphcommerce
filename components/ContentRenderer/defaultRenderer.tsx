import React from 'react'
import { Renderers, setRenderers } from './ContentRenderer'
import RowHero from '../RowHero'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowColumnOne from '../RowColumnOne'
import RowCompanySlider from '../RowCompanySlider'
import RowPeopleWithText from '../RowPeopleWithText'
import RowYoutubeVideo from '../RowYoutubeVideo'

const registerDefaultRenderer = () => {
  const renderers = {
    RowHero,
    RowColumnOne,
    RowColumnTwo,
    RowColumnThree,
    RowCompanySlider,
    RowPeopleWithText,
    RowRecentBlogPost: () => <div>RecentBlogPosts not yet implemented</div>,
    RowServicesWithText: () => <div>RowServicesWithText not yet implemented</div>,
    RowYoutubeVideo,
  } as Required<Renderers>
  setRenderers(renderers)
}

export default registerDefaultRenderer
