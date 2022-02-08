import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { SvgIcon, iconCancelAlt, extendableComponent } from '@graphcommerce/next-ui'
import { lighten, Button, Box, SxProps, Theme } from '@mui/material'
import { CouponFragment } from '../Api/Coupon.gql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.gql'

export type RemoveCouponFormProps = CouponFragment & { sx?: SxProps<Theme> }

const name = 'RemoveCouponForm' as const
const parts = ['root', 'button'] as const
const { classes } = extendableComponent(name, parts)

export default function RemoveCouponForm(props: RemoveCouponFormProps) {
  const { applied_coupons, sx } = props
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box component='form' onSubmit={submitHandler} noValidate className={classes.root} sx={sx}>
      <Button
        type='submit'
        variant='text'
        color='secondary'
        className={classes.button}
        endIcon={<SvgIcon src={iconCancelAlt} />}
        sx={(theme) => ({
          fontWeight: 600,
          background: lighten(theme.palette.secondary.light, theme.palette.action.hoverOpacity),
          '& svg': {
            stroke: 'transparent',
            fill: theme.palette.secondary.main,
          },
        })}
      >
        {applied_coupons?.[0]?.code}
      </Button>
      <ApolloCartErrorAlert error={error} />
    </Box>
  )
}
