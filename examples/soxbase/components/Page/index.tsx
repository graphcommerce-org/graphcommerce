import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import RowColumnOne from '@reachdigital/graphcms-ui/RowColumnOne'
import RowColumnTwo from '@reachdigital/graphcms-ui/RowColumnTwo'
import RowColumnThree from '@reachdigital/graphcms-ui/RowColumnThree'
import { PageFragment } from './Page.gql'

type ContentTypeRenderer = TypeRenderer<PageFragment['content'][0]>

const renderer: ContentTypeRenderer = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
}

export type PageProps = PageFragment

export default function Page(props: PageFragment) {
  const { content } = props

  return (
    <>
      {content.map((item) => (
        <RenderType renderer={renderer} key={item.id} {...item} />
      ))}
    </>
  )
}
