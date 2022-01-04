import { Image } from '@graphcommerce/image'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import React from 'react'
import { OrderCardItemImageFragment } from '../../hooks/OrderCardItemImage.gql'

export type OrderCardItemImageProps = Omit<OrderCardItemImageFragment, 'uid'>

const useStyles = makeStyles({ name: 'OrderCardItemImage' })({
  image: {
    width: 88,
    height: 88,
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default function OrderCardItemImage(props: OrderCardItemImageProps) {
  const { thumbnail } = props
  const { classes } = useStyles()

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
        <div className={clsx(classes.placeholder, classes.image)} />
      )}
    </>
  )
}
