import React from 'react'
import { Renderers, setRenderers } from './ContentRenderer'
import RowHero from '../RowHero'
import RowColumnThree from '../RowColumnThree'
import RowCompanySlider from '../RowCompanySlider'
import RowPeopleWithText from '../RowPeopleWithText'

const registerDefaultRenderer = () => {
  const renderers = {
    RowHero,
    RowColumnOne: () => <div>RowColumnOne Not yet implemented</div>,
    RowColumnTwo: () => <div>RowColumnTwo Not yet implemented</div>,
    RowColumnThree,
    RowCompanySlider,
    RowPeopleWithText,
    RowRecentBlogPost: () => <div>RecentBlogPosts not yet implemented</div>,
    RowServicesWithText: () => <div>RowServicesWithText not yet implemented</div>,
  } as Required<Renderers>
  setRenderers(renderers)
}

export default registerDefaultRenderer
