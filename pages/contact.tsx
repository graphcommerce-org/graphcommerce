import React from 'react'
import { GetStaticProps } from 'next'
import { Container, Typography } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import { StaticPageVariables } from '../lib/staticParams'
import ContentRenderer from '../components/ContentRenderer'
import ContactFormLoader from '../components/ContactForm'

const Contact: PageWithLayoutFull = ({ page }) => {
  return (
    <>
      <ContentRenderer content={page.content} />
      <Container>
        <Typography variant='h3'>Neem contact op</Typography>
        <ContactFormLoader />
      </Container>
    </>
  )
}

Contact.layout = LayoutFull

export default Contact

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = { url: '/contact', locale: 'nl' }

  const getStaticData = await import('../components/PageLayout/server/getStaticData')
  return { props: await getStaticData.default(params) }
}
