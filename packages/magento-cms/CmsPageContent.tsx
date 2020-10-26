import { Typography, Container } from '@material-ui/core'
import React from 'react'
import { CmsPageContentFragment } from './CmsPageContent.graphql'

export default function CmsPageContent(props: CmsPageContentFragment) {
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
