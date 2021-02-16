import { Link as MuiLink } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import clsx from 'clsx'
import React from 'react'
import useOrderCardItemImagesStyles from '../OrderCardItemImages/OrderCardItemImagesStyles'
import { OrderCardItemImageFragment } from './OrderCardItemImage.gql'

export type OrderCardItemImageProps = OrderCardItemImageFragment & {
  key: string
}

export default function OrderCardItemImage(props: OrderCardItemImageProps) {
  const { url_key, thumbnail, key } = props
  const classes = useOrderCardItemImagesStyles()

  return (
    <PageLink href={`/product/${url_key}`}>
      <MuiLink underline='none'>
        <div key={key}>
          {thumbnail ? (
            <PictureResponsiveNext
              alt={thumbnail?.label ?? ''}
              width={64}
              height={64}
              src={thumbnail?.url ?? ''}
              type='image/jpeg'
              className={classes.image}
            />
          ) : (
            <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
          )}
        </div>
      </MuiLink>
    </PageLink>
  )
}
