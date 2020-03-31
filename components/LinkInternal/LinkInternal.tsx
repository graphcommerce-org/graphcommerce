import React from 'react'
import { GQLLinkInternalFragment } from '../../generated/graphql'
import { Link } from '../../graphcms'

export const LinkInternal: React.FC<GQLLinkInternalFragment> = ({
  page,
  id,
  title,
  description,
}) => {
  if (!page) {
    return <div>InternalLink (id: {id}) doesn&apos;t have a page assigned..</div>
  }

  const GraphCmsLink = (
    <Link href={page.url} metaRobots={page.metaRobots!}>
      {title ?? page.title}
    </Link>
  )

  if (description) {
    return (
      <div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: description.html }} />
        {GraphCmsLink}
      </div>
    )
  }

  return GraphCmsLink
}
