import { Image } from '@graphcommerce/image'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { OrderCardItemImageFragment } from '../../hooks/OrderCardItemImage.graphql'

export type OrderCardItemImageProps = Omit<OrderCardItemImageFragment, 'uid'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    image: {
      width: 88,
      height: 88,
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  { name: 'OrderCardItemImage' },
)

export default function OrderCardItemImage(props: OrderCardItemImageProps) {
  const { thumbnail } = props
  const classes = useStyles()

  return (
    <>
      {thumbnail ? (
        <Image
          alt={thumbnail?.label ?? ''}
          width={64}
          height={64}
          src={thumbnail?.url ?? ''}
          className={classes.image}
        />
      ) : (
        <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
      )}
    </>
  )
}
