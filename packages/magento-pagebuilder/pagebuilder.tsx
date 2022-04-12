import React, { useMemo } from 'react'
import { ContentTypeFactory } from './factory'
import { parseStorageHtml } from './parseStorageHtml'

/** Page Builder component for rendering Page Builder master storage format in React */
export function PageBuilder({ html, classes = {} }: { html: string; classes: any }) {
  const data = useMemo(() => parseStorageHtml(html), [html])
  return data.children.map((child, i) => (
    <div className={classes.root} key={i}>
      <ContentTypeFactory data={child} />
    </div>
  ))
}
