import React from 'react'
import { GetStaticProps } from 'next'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from 'components/PageLayout'
import ContentRenderer from 'components/ContentRenderer'
import getPageLayoutProps from 'components/PageLayout/getPageLayoutProps'
import RowContactBoxed from 'components/RowContact/RowContactBoxed'

const BuildWebshop: PageWithLayoutFull = ({ page }) => {
  console.log('the: ', page)
  return (
    <div>
      <ContentRenderer
        content={page.content}
        renderers={{
          RowContact: RowContactBoxed,
        }}
      />
    </div>
  )
}

BuildWebshop.layout = LayoutFull

export default BuildWebshop

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => ({
  props: {
    ...(await getPageLayoutProps({ url: '/webshop-laten-bouwen', locale: 'nl' })),
    headerTheme: 'on-green',
  },
})
