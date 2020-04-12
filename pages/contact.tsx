import React from 'react'
import { GetStaticProps } from 'next'
import { Container, Typography } from '@material-ui/core'
import { LayoutPage } from '../lib/layout'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import { StaticPageVariables } from '../lib/staticParams'
import ContentRenderer from '../components/ContentRenderer'
import ContactFormLoader from '../components/ContactForm'

const Contact: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return (
    <>
      <ContentRenderer content={pages[0].content} />

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

  const data = await Promise.all([
    import('../components/PageLayout/server/getStaticData').then((module) =>
      module.default(params),
    ),
    import('../components/Breadcrumb/server/getStaticData').then((module) =>
      module.default(params),
    ),
  ])

  return { props: { ...data[0], ...data[1] } }
}
