'use client'

import { Container } from '@mui/material'

export type CmsPageContentProps = {
  content?: string | null
  contentHeading?: string | null
}

/** Client-side CMS page content renderer Simplified version that doesn't require productListRenderer */
export function CmsPageContent({ content, contentHeading }: CmsPageContentProps) {
  return (
    <Container maxWidth='md'>
      {contentHeading && <h1>{contentHeading}</h1>}
      {/* eslint-disable-next-line react/no-danger */}
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </Container>
  )
}
