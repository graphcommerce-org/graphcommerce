import { Container, Typography } from '@mui/material'
import type { CmsPageContentFragment } from './CmsPageContent.gql'

export type CmsPageContentProps = { cmsPage: CmsPageContentFragment }

export function CmsPageContent(props: CmsPageContentProps) {
  const { cmsPage } = props
  return (
    <Container>
      {cmsPage.content_heading && (
        <Typography variant='h2' component='h1'>
          {cmsPage.content_heading}
        </Typography>
      )}
      {/* eslint-disable-next-line react/no-danger */}
      {cmsPage.content && <div dangerouslySetInnerHTML={{ __html: cmsPage.content }} />}
    </Container>
  )
}
