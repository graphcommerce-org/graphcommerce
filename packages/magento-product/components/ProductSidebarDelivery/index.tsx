import {
  responsiveVal,
  iconOrderBefore,
  SvgIcon,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Box, darken, lighten, Typography } from '@mui/material'

const parts = ['root', 'text', 'image', 'title', 'subtitle'] as const
const { classes } = extendableComponent('ProductSidebarDelivery', parts)

export default function ProductSidebarDelivery() {
  return (
    <Box
      className={classes.root}
      sx={(theme) => ({
        display: 'grid',
        alignItems: 'center',
        gridTemplate: `
          "image title"
          ".     subtitle"
        `,
        gridTemplateColumns: `min-content auto`,
        columnGap: theme.spacings.xxs,
        marginTop: theme.spacings.xxs,
        background:
          theme.palette.mode === 'light'
            ? darken(theme.palette.background.default, 0.01)
            : lighten(theme.palette.background.default, 0.2),
        padding: theme.spacings.xxs,
        borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
      })}
    >
      <SvgIcon
        className={classes.image}
        src={iconOrderBefore}
        size='small'
        sx={{ gridArea: 'image' }}
      />
      <Typography
        className={classes.title}
        variant='body2'
        component='div'
        sx={{ gridArea: 'title', fontWeight: 600 }}
      >
        Order before 22:00
      </Typography>
      <Typography
        className={classes.subtitle}
        variant='body2'
        component='div'
        sx={(theme) => ({ gridArea: 'subtitle', color: theme.palette.text.primary })}
      >
        Next day delivery - Shipping free
      </Typography>
    </Box>
  )
}
