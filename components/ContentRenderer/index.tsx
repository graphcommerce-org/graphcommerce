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
import RowIframe from 'components/RowIframe'
import RowIpadHorizontal from 'components/RowIpadHorizontal'
import RowIpadVertical from 'components/RowIpadVertical'
import RowIphoneWithText from 'components/RowIphoneWithText'
import RowLaptop from 'components/RowLaptop'
import RowLaptopWithText from 'components/RowLaptopWithText'
import RowLineHorizontal from 'components/RowLineHorizontal'
import RowImageOrVideo from 'components/RowImageOrVideo'
import RowPhonesSlider from 'components/RowPhonesSlider'
import RowVacancy from 'components/RowVacancy'
import RowQuote from 'components/RowQuote'
import RowCollaboration from 'components/RowCollaboration'
import RowIntro from 'components/RowIntro'
import RowTitle from 'components/RowTitle'
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
  RowIframe,
  RowIpadHorizontal,
  RowIpadVertical,
  RowLaptop,
  RowLaptopWithText,
  RowIphoneWithText,
  RowLineHorizontal,
  RowImageOrVideo,
  RowPhonesSlider,
  RowVacancy,
  RowQuote,
  RowCollaboration,
  RowIntro,
  RowTitle,
})

export default ContentRenderer
export type { Renderers }
