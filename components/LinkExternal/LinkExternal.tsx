import React from 'react'
import { GQLLinkExternalFragment } from '../../generated/graphql'
import RichText from '../RichText'

const LinkExternal: React.FC<GQLLinkExternalFragment> = ({ url, exTitle, description }) => {
  if (description) {
    return (
      <div>
        <div>
          <RichText {...description} />
        </div>
        <a href={url} rel='nofollow noopener noreferrer' target='_blank'>
          {exTitle}
        </a>
      </div>
    )
  }

  return (
    <a href={url} rel='nofollow noopener noreferrer' target='_blank'>
      {exTitle}
    </a>
  )
}

export default LinkExternal
