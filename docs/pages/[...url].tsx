import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SheetShellBaseProps, Title } from '@graphcommerce/next-ui'
import { Container, Typography } from '@material-ui/core'
import React from 'react'
import FullPageShell from '../components/AppShell/FullPageShell'
import FullPageShellHeader from '../components/AppShell/FullPageShellHeader'

function SectionPage(props) {
  const { title, dir } = props

  return (
    <>
      <FullPageShellHeader>
        <Title size='small'>{title}</Title>
      </FullPageShellHeader>
      <Container>
        <Typography variant='h6' component='h1'>
          {title}
        </Typography>
        todo: hier alle .mdx files binnen de "{dir}" directory tonen
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellBaseProps> = {
  SharedComponent: FullPageShell,
}
SectionPage.pageOptions = pageOptions

export default SectionPage

export const getStaticProps = async ({ params }) => {
  const { url } = params

  // TODO: check if the directory exists within pages & contains mdx files
  // if not: 404

  return {
    props: {
      // title: url[0].split('-').join(' '),
      // dir: url,
    },
  }
}

export const getStaticPaths = () => {
  // todo: fetch all possible paths based on .mdx files in the 'url' directory
  return {
    paths: [{ params: { url: ['introduction'] } }],
    fallback: 'blocking',
  }
}
