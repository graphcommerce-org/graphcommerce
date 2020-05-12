import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, {
  PageWithLayoutFull,
  PageLayoutProps,
  getStaticProps as getPageLayout,
} from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import { useHeaderSpacing } from 'components/Header'
import RowPeopleWithTextFlipped from 'components/RowPeopleWithText/RowPeopleWithTextFlipped'

const Contact: PageWithLayoutFull = ({ page }) => {
  const header = useHeaderSpacing()
  return (
    <div className={header.marginTop}>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowPeopleWithText: RowPeopleWithTextFlipped,
        }}
      />
    </div>
  )
}

Contact.layout = LayoutFull

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: await getPageLayout({ url: '/contact', locale: 'nl' }),
})
