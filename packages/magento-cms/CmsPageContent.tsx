import { Typography, Container } from '@mui/material'
import { CmsPageContentFragment } from './CmsPageContent.gql'

export function CmsPageContent(props: CmsPageContentFragment) {
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
