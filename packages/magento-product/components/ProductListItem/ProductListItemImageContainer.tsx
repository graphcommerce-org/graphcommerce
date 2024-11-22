import { breakpointVal, responsiveVal } from '@graphcommerce/next-ui'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

type ProductImageContainerProps = BoxProps

export function ProductImageContainer(props: ProductImageContainerProps) {
  const { sx = [] } = props

  return (
    <Box
      {...props}
      sx={[
        (theme) => ({
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
          '& > picture, & > .ProductListItem-placeholder': {
            gridArea: '1 / 1 / 3 / 3',
            margin: `calc(${responsiveVal(8, 12)} * -1)`,
            height: 'auto',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}

export type ProductListItemImageAreaKeys = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'
export type ProductListsItemImageAreaProps = Partial<
  Record<ProductListItemImageAreaKeys, React.ReactNode>
> & {
  classes: {
    topLeft?: string
    topRight?: string
    bottomLeft?: string
    bottomRight?: string
  }
}

export function ProductListItemImageAreas(props: ProductListsItemImageAreaProps) {
  const { topLeft, topRight, bottomLeft, bottomRight, classes } = props

  return (
    <>
      <Box
        sx={{
          gridArea: '1 / 1 / 2 / 2',
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
          gridArea: '1 / 2 / 2 / 3',
          zIndex: 1,
        }}
        className={classes.topRight}
      >
        {topRight}
      </Box>
      <Box
        sx={{
          alignSelf: 'flex-end',
          gridArea: '2 / 1 / 3 / 2',
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
          gridArea: '2 / 2 / 3 / 3',
          zIndex: 1,
          justifySelf: 'end',
        }}
        className={classes.bottomRight}
      >
        {bottomRight}
      </Box>
    </>
  )
}
