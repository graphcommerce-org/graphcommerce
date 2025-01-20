import type { CmsBlockFragment } from './CmsBlock.gql'

export type CmsBlockProps = { cmsBlock: CmsBlockFragment | null | undefined }

export function CmsBlock(props: CmsBlockProps) {
  const { cmsBlock } = props
  if (!cmsBlock?.content) return null
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: cmsBlock.content }} />
}
