import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import { TextSwatchDataFragment } from './TextSwatchData.gql'
import { SwatchDataProps } from './types'

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & { sx?: SxProps<Theme> }

type OwnerState = Pick<SwatchDataProps, 'size'>
const name = 'TextSwatchData' as const
const parts = ['root', 'value', 'price', 'label', 'storeLabel', 'content'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function TextSwatchData(props: TextSwatchDataProps) {
  const { store_label, size = 'medium', price, value, sx = [] } = props

  const classes = withState({ size })

  return (
    <Box
      className={classes.root}
      sx={[{ width: '100%', height: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {size !== 'small' ? (
        <>
          <Box
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Box
              className={classes.label}
              sx={{
                typography: 'subtitle2',
                marginRight: '5px',
              }}
            >
              {value}
            </Box>

            <Box
              className={classes.value}
              sx={{
                typography: 'body2',
                justifySelf: 'end',
                margin: 'auto 0',
              }}
            >
              <Money {...price} />
            </Box>
          </Box>

          {size === 'large' && store_label !== value && (
            <Box
              className={classes.storeLabel}
              sx={{
                typography: 'body2',
                textAlign: 'left',
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
