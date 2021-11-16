import { PageOptions } from '@graphcommerce/framer-next-pages'
import { SheetShellBaseProps } from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import React from 'react'
import FullPageShell from '../components/AppShell/FullPageShell'

function IndexPage() {
  return (
    <Container>todo: hier allemaal blokken tonen met ingangen naar de documentatie Index</Container>
  )
}

const pageOptions: PageOptions<SheetShellBaseProps> = {
  SharedComponent: FullPageShell,
}
IndexPage.pageOptions = pageOptions

export default IndexPage

// GetPageStaticProps
export const getStaticProps = () => {
  return {
    props: {},
  }

  // readdirSync

  // const postsDirectory = path.join(process.cwd(), 'posts')
  // const filenames = await fs.readdir(postsDirectory)

  // const posts = filenames.map(async (filename) => {
  //   const filePath = path.join(postsDirectory, filename)
  //   const fileContents = await fs.readFile(filePath, 'utf8')

  //   // Generally you would parse/transform the contents
  //   // For example you can transform markdown to HTML here

  //   return {
  //     filename,
  //     content: fileContents,
  //   }
  // })
  // // By returning { props: { posts } }, the Blog component
  // // will receive `posts` as a prop at build time
  // return {
  //   props: {
  //     posts: await Promise.all(posts),
  //   },
  // }
}
