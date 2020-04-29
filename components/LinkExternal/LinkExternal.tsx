import React from 'react'
import RichText from '../RichText'

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
