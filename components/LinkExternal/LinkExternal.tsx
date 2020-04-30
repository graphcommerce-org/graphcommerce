import React from 'react'
import RichText from '../RichText'

/**
 * @deprecated Please use an <a href={url} target='_blank'></a> directly
 */
const LinkExternal: React.FC<GQLLinkExternalFragment> = ({ url, title, description }) => {
  if (description) {
    return (
      <div>
        <div>
          <RichText {...description} />
        </div>
        <a href={url} rel='nofollow noopener noreferrer' target='_blank'>
          {title}
        </a>
      </div>
    )
  }

  return (
    <a href={url} rel='nofollow noopener noreferrer' target='_blank'>
      {title}
    </a>
  )
}

export default LinkExternal
