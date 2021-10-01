import { Image } from '@graphcommerce/image'
import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { ImageSwatchDataFragment } from './ImageSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      height: responsiveVal(40, 80),
      width: responsiveVal(40, 80),
      border: `3px solid ${theme.palette.grey[300]}`,
      boxSizing: 'border-box',
      borderRadius: '50%',
      objectFit: 'cover',
    },
    sizeSmall: {
      width: 20,
      height: 20,
    },
  }),
  { name: 'ImageSwatchData' },
)
type ImageSwatchDataProps = ImageSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function ImageSwatchData(props: ImageSwatchDataProps) {
  const classes = useStyles(props)
  const { value, thumbnail, store_label, size } = props
  return (
    <>
      {thumbnail ? (
        <Image
          src={thumbnail}
          width={classes.sizeSmall ? 20 : 40}
          height={classes.sizeSmall ? 20 : 40}
          alt={value ?? ''}
          className={clsx({
            [classes.root]: true,
            [classes.sizeSmall]: size === 'small',
          })}
        />
      ) : (
        <div>{store_label}</div>
      )}
    </>
  )
}
