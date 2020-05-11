import React from 'react'
import RowHero from 'components/RowHero'
import RowColumnThree from 'components/RowColumnThree'
import RowColumnTwo from 'components/RowColumnTwo'
import RowColumnOne from 'components/RowColumnOne'
import RowCompanySlider from 'components/RowCompanySlider'
import RowPeopleWithText from 'components/RowPeopleWithText'
import RowRecentBlogPost from 'components/RowRecentBlogPost'
import RowYoutubeVideo from 'components/RowYoutubeVideo'
import RowIconWithTextList from 'components/RowIconWithTextList'
import RowLinksWithText from 'components/RowLinksWithText'
import { setStaticProps, setRenderers } from './ContentRenderer'

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
    RowRecentBlogPost: () => import('components/RowRecentBlogPost'),
    RowPeopleWithText: () => import('components/RowPeopleWithText'),
    RowColumnOne: () => import('components/RowColumnOne/RowColumnOneAwards'),
  })
