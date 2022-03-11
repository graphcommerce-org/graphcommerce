import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { TextSwatchDataFragment } from './TextSwatchData.gql'
import { SwatchDataProps } from './types'

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & { sx?: SxProps<Theme> }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'TextSwatchData' as const
const parts = ['root', 'value', 'price', 'label', 'storeLabel'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function TextSwatchData(props: TextSwatchDataProps) {
  const { store_label, size = 'medium', price, value, sx = [] } = props

  const classes = withState({ size })

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          display: 'grid',
          width: '100%',
          textAlign: 'start',
          gridColumnGap: theme.spacings.sm,

          '&:not(.sizeSmall)': {
            gridTemplateAreas: `
              "label value"
              "delivery delivery"
            `,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {size !== 'small' ? (
        <>
          <Box
            className={classes.label}
            sx={{
              typography: 'subtitle2',
              gridArea: 'label',
            }}
          >
            {value}
          </Box>
          <Box
            className={classes.value}
            sx={{
              typography: 'body2',
              gridArea: 'value',
              justifySelf: 'end',
              margin: 'auto 0',
            }}
          >
            <Money {...price} />
          </Box>
          {size === 'large' && store_label !== value && (
            <Box
              className={classes.storeLabel}
              sx={{
                typography: 'body2',
                gridArea: 'delivery',
                color: 'text.disabled',
              }}
            >
              {store_label}
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ typography: 'subtitle2', whiteSpace: 'nowrap' }}>{value ?? store_label}</Box>
      )}
    </Box>
  )
}
