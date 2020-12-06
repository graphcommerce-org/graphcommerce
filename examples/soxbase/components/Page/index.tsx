import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import RowColumnOne from '../RowColumnOne'
import RowColumnThree from '../RowColumnThree'
import RowColumnTwo from '../RowColumnTwo'
import RowHeroBanner from '../RowHeroBanner'
import RowProductGrid from '../RowProductGrid'
import { PageFragment } from './Page.gql'

type ContentTypeRenderer = TypeRenderer<PageFragment['content'][0]>

const defaultRenderer: Partial<ContentTypeRenderer> = {
  RowColumnOne,
  RowColumnTwo,
  RowColumnThree,
  RowHeroBanner,
  RowProductGrid,
}

export type PageProps = PageFragment & { renderer?: Partial<ContentTypeRenderer> }

export default function Page({ content, renderer }: PageProps) {
  const mergedRenderer = { ...defaultRenderer, ...renderer }

  return (
    <>
      {content.map((item) => (
        <RenderType renderer={mergedRenderer as ContentTypeRenderer} key={item.id} {...item} />
      ))}
    </>
  )
}
