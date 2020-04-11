import React from 'react'
import { GetStaticProps } from 'next'
import dynamic from 'next/dynamic'
import { Container } from '@material-ui/core'
import { LayoutPage } from '../lib/layout'
import LayoutFull, { PageLayoutProps } from '../components/PageLayout'
import { StaticPageVariables } from '../lib/staticParams'
import ContentRenderer from '../components/ContentRenderer'

const ContactForm = dynamic(() => import('../components/ContactForm'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const Contact: LayoutPage<PageLayoutProps> = ({ pages }) => {
  return (
    <>
      <ContentRenderer content={pages[0].content} />

      <Container>
        <ContactForm />
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
