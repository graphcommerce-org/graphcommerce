import React from 'react'
import { setStaticProps, setRenderers } from './ContentRenderer'
import RowHero from '../RowHero'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowColumnOne from '../RowColumnOne'
import RowCompanySlider from '../RowCompanySlider'
import RowPeopleWithText from '../RowPeopleWithText'
import RowRecentBlogPost from '../RowRecentBlogPost'
import RowYoutubeVideo from '../RowYoutubeVideo'
import RowIconWithTextList from '../RowIconWithTextList'
import RowLinksWithText from '../RowLinksWithText'

export const registerRenderers = () => {
  setRenderers({
    RowHero,
    RowColumnOne,
    RowColumnTwo,
    RowColumnThree,
    RowCompanySlider,
    RowPeopleWithText,
    RowRecentBlogPost,
    RowIconWithTextList,
    RowLinksWithText,
    RowYoutubeVideo,
  })
}

export const registerGetStaticProps = () =>
  setStaticProps({
    RowRecentBlogPost: () => import('../RowRecentBlogPost'),
    RowPeopleWithText: () => import('../RowPeopleWithText'),
    RowColumnOne: () => import('../RowColumnOne/RowColumnOneAwards'),
  })
