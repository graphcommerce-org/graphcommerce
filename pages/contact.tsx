import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import { useHeaderSpacing } from 'components/Header'
import RowPeopleWithTextFlipped from 'components/RowPeopleWithText/RowPeopleWithTextFlipped'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'

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
  props: await getPageLayoutProps({ url: '/contact', locale: 'nl' }),
})
