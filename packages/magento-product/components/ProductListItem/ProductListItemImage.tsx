import { Image, ImageProps } from '@graphcommerce/image'
import { breakpointVal, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import type { SetOptional } from 'type-fest'

export type OverlayAreaKeys = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'
export type OverlayAreas = Partial<Record<OverlayAreaKeys, React.ReactNode>>

export type ProductListItemImageProps = OverlayAreas & {
  aspectRatio?: [number, number]
  imageOnly?: boolean
} & SetOptional<ImageProps, 'src'>

const { classes } = extendableComponent('ProductListItem', [
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'imageContainer',
  'placeholder',
  'image',
] as const)

export function ProductListItemImage(props: ProductListItemImageProps) {
  const {
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    imageOnly = false,
    aspectRatio = [4, 3],
    ...imageProps
  } = props

  return (
    <Box
      sx={(theme) => ({
        display: 'grid',
        bgcolor: 'background.image',
        ...breakpointVal(
          'borderRadius',
          theme.shape.borderRadius * 2,
          theme.shape.borderRadius * 3,
          theme.breakpoints.values,
        ),
        overflow: 'hidden',
        padding: responsiveVal(8, 12),
        '& > picture': {
          gridArea: `1 / 1 / 3 / 3`,
          margin: `calc(${responsiveVal(8, 12)} * -1)`,
        },
      })}
      className={classes.imageContainer}
    >
      {imageProps?.src ? (
        <Image
          layout='fill'
          width={1}
          height={1}
          {...imageProps}
          src={imageProps.src}
          className={classes.image}
          sx={{ objectFit: 'contain', aspectRatio: `${aspectRatio[0] / aspectRatio[1]}` }}
        />
      ) : (
        <Box
          sx={{
            gridArea: `1 / 1 / 3 / 3`,
            typography: 'caption',
            display: 'flex',
            textAlign: 'center',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'background.default',
            userSelect: 'none',
          }}
          className={`${classes.placeholder} ${classes.image}`}
        >
          <Trans id='No Image' />
        </Box>
      )}

      {!imageOnly && (
        <>
          <Box
            sx={{
              gridArea: `1 / 1 / 2 / 2`,
              zIndex: 1,
            }}
            className={classes.topLeft}
          >
            {topLeft}
          </Box>
          <Box
            sx={{
              justifySelf: 'end',
              textAlign: 'right',
              gridArea: `1 / 2 / 2 / 3`,
              zIndex: 1,
            }}
            className={classes.topLeft}
          >
            {topRight}
          </Box>
          <Box
            sx={{
              alignSelf: 'flex-end',
              gridArea: `2 / 1 / 3 / 2`,
              zIndex: 1,
            }}
            className={classes.bottomLeft}
          >
            {bottomLeft}
          </Box>
          <Box
            sx={{
              textAlign: 'right',
              alignSelf: 'flex-end',
              gridArea: `2 / 2 / 3 / 3`,
              zIndex: 1,
              justifySelf: 'end',
            }}
            className={classes.bottomRight}
          >
            {bottomRight}
          </Box>
        </>
      )}
    </Box>
  )
}
