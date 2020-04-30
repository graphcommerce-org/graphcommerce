import React from 'react'
import RichText from '../RichText'
import Link from '../Link'

/**
 * @deprecated Please use ../Link directly
 */
const LinkInternal: React.FC<GQLLinkInternalFragment> = ({ page, id, title, description }) => {
  if (!page) {
    return <div>InternalLink (id: {id}) doesn&apos;t have a page assigned..</div>
  }

  const GraphCmsLink = (
    <Link href={page.url} metaRobots={page.metaRobots}>
      {title ?? page.title}
    </Link>
  )

  if (description) {
    return (
      <div>
        <RichText {...description} />
        {GraphCmsLink}
      </div>
    )
  }

  return GraphCmsLink
}

export default LinkInternal
