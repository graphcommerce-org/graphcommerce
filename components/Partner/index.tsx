import React from 'react'
import Asset from 'components/Asset'
import { Link } from '@material-ui/core'

const Partner: React.FC<GQLPartnerFragment> = (props) => {
  const { name, url, logo } = props

  return (
    <Link href={url} title={name} target='_blank' rel='noopener nofollow noreferrer'>
      <Asset asset={logo} width={95} />
    </Link>
  )
}

export default Partner
