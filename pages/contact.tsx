import React from 'react'
import { GetStaticProps } from 'next'
import { Container, Typography } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import { StaticPageVariables } from '../lib/staticParams'
import ContentRenderer from '../components/ContentRenderer'
import ContactFormLoader from '../components/ContactForm'
import { useHeaderSpacing } from '../components/Header'
import RowPeopleWithTextFlipped from '../components/RowPeopleWithText/RowPeopleWithTextFlipped'

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
      <Container>
        <Typography variant='h3' color='primary'>
          Contact
        </Typography>
        <ContactFormLoader />
      </Container>
    </div>
  )
}

Contact.layout = LayoutFull

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/contact', locale: 'nl' }

  const { getStaticProps: get } = await import('../components/PageLayout')
  return { props: await get(params) }
}
