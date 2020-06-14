import React from 'react'
import RichContent from '@magento/venia-ui/lib/components/RichContent'

export default function CmsPageContent(props: GQLCmsPageContentFragment) {
  const { content, content_heading } = props
  return (
    <>
      <h1>{content_heading}</h1>}
      <RichContent html={content} />
    </>
  )
}
