import { GQLLinkExternalFragment } from '../../generated/graphql'

export const LinkExternal: React.FC<GQLLinkExternalFragment> = ({ url, exTitle, description }) => {
  if (description) {
    return (
      <div>
        <div>{description}</div>
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
