import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { extendableComponent } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box, Chip } from '@mui/material'
import type { CouponFragment } from '../Api/Coupon.gql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.gql'

export type RemoveCouponFormProps = CouponFragment & { sx?: SxProps<Theme> }

const name = 'RemoveCouponForm'
const parts = ['root', 'button'] as const
const { classes } = extendableComponent(name, parts)

export function RemoveCouponForm(props: RemoveCouponFormProps) {
  const { applied_coupons, sx } = props
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  if (!applied_coupons?.[0]?.code) return null

  return (
    <Box className={classes.root} sx={sx}>
      <Chip
        label={applied_coupons?.[0]?.code}
        onDelete={submitHandler}
        size='responsive'
        sx={{ typography: 'overline' }}
      />
      <ApolloCartErrorAlert error={error} />
    </Box>
  )
}
