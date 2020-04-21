import React from 'react'
import { setStaticProps, setRenderers } from './ContentRenderer'
import RowHero from '../RowHero'
import RowColumnThree from '../RowColumnThree'
import RowCompanySlider from '../RowCompanySlider'
import RowPeopleWithText from '../RowPeopleWithText'
import RowRecentBlogPost from '../RowRecentBlogPost'

export const registerRenderers = () => {
  setRenderers({
    RowHero,
    RowColumnOne: () => <div>RowColumnOne Not yet implemented</div>,
    RowColumnTwo: () => <div>RowColumnTwo Not yet implemented</div>,
    RowColumnThree,
    RowCompanySlider,
    RowPeopleWithText,
    RowRecentBlogPost,
    RowServicesWithText: () => <div>RowServicesWithText not yet implemented</div>,
  })
}

export const registerGetStaticProps = async () => {
  setStaticProps({
    RowRecentBlogPost: () => import('../RowRecentBlogPost'),
  })
}
