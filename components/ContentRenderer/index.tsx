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
import RowContact from 'components/RowContact'
import RowGoogleMap from 'components/RowGoogleMap'
import ContentRenderer, { Renderers, setRenderers } from './ContentRenderer'

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
  RowContact,
  RowGoogleMap,
})

export default ContentRenderer
export type { Renderers }
