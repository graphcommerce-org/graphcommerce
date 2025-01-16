import { Container } from '@mui/material'
import type { CmsPageContentFragment } from './CmsPageContent.gql'

export type CmsPageContentProps = { cmsPage: CmsPageContentFragment }

export function CmsPageContent(props: CmsPageContentProps) {
  const { cmsPage } = props
  return (
    <Container>
      {/* eslint-disable-next-line react/no-danger */}
      {cmsPage.content && <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} />}
    </Container>
  )
}
