import React from 'react'
import { Typography, Container } from '@material-ui/core'
// import RichContent from '@magento/venia-ui/lib/components/RichContent'

export default function CmsPageContent(props: GQLCmsPageContentFragment) {
  const { content_heading, content } = props
  return (
    <Container>
      {content_heading && (
        <Typography variant='h1' component='h1'>
          {content_heading}
        </Typography>
      )}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  )
}
