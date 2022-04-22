import React, { Suspense } from 'react'
import customContentTypes from './ContentTypes/customContentTypes'
import { getRenderType } from './renderTypes'

/** Create an instance of a content type component based on configuration */
export const ContentTypeFactory = ({ data }) => {
  const { isHidden, ...props } = data

  const Component = getRenderType(props.contentType)
  if (Component) {
    // const Component = renderContentType(contentTypeConfig.component, props)

    return <Component {...props}>{Component}</Component>
  }

  return null
}

const renderContentType = (Component, data) => (
  <Component {...data}>
    {data.children.map((childTreeItem, i) => (
      <ContentTypeFactory key={i} data={childTreeItem} />
    ))}
  </Component>
)
