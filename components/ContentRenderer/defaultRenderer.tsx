import React from 'react'
import { Renderers, setRenderers } from './ContentRenderer'
import RowHero from '../RowHero'
import RowColumnThree from '../RowColumnThree'
import RowCompanySlider from '../RowCompanySlider'
import RowPeopleWithText from '../RowPeopleWithText'
import RowRecentBlogPost from '../RowRecentBlogPost'

const registerDefaultRenderer = () => {
  const renderers = {
    RowHero,
    RowColumnOne: () => <div>RowColumnOne Not yet implemented</div>,
    RowColumnTwo: () => <div>RowColumnTwo Not yet implemented</div>,
    RowColumnThree,
    RowCompanySlider,
    RowPeopleWithText,
    RowRecentBlogPost,
    RowServicesWithText: () => <div>RowServicesWithText not yet implemented</div>,
  } as Renderers
  setRenderers(renderers)
}

export default registerDefaultRenderer
