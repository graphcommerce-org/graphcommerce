import React from 'react'
// import RichContent from '@magento/venia-ui/lib/components/RichContent'

export default function CmsPageContent(props: GQLCmsPageContentFragment) {
  const { content_heading, content } = props
  return (
    <>
      {content_heading && <h1>{content_heading}</h1>}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
