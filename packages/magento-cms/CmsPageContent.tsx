import { Container, Typography } from '@mui/material'
import type { CmsPageContentFragment } from './CmsPageContent.gql'

export type CmsPageContentProps = CmsPageContentFragment

export function CmsPageContent(props: CmsPageContentProps) {
  const { content_heading, content } = props
  return (
    <Container>
      {content_heading && (
        <Typography variant='h2' component='h1'>
          {content_heading}
        </Typography>
      )}
      {/* eslint-disable-next-line react/no-danger */}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </Container>
  )
}
