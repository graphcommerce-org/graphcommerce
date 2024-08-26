import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { responsiveVal, Button, extendableComponent } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Box, FormControl, SxProps, Theme } from '@mui/material'
import { ApplyCouponFormDocument } from './ApplyCouponForm.gql'

export type ApplyCouponFormProps = { sx?: SxProps<Theme> }

const name = 'ApplyCouponForm'
const parts = ['couponForm', 'button'] as const
const { classes } = extendableComponent(name, parts)

export function ApplyCouponForm(props: ApplyCouponFormProps) {
  const { sx = [] } = props
  const form = useFormGqlMutationCart(ApplyCouponFormDocument)
  const { handleSubmit, control, formState, required, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      noValidate
      className={classes.couponForm}
      sx={[
        (theme) => ({
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: `1fr minmax(min-content, ${responsiveVal(70, 140)})`,
          gridColumnGap: theme.spacings.sm,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <TextFieldElement
        variant='outlined'
        type='text'
        error={!!formState.errors.couponCode || !!error}
        required={required.couponCode}
        name='couponCode'
        rules={{ required: required.couponCode }}
        control={control}
        helperText={formState.errors.couponCode?.message}
        disabled={formState.isSubmitting}
        showValid
      />
      <FormControl>
        <Button
          type='submit'
          className={classes.button}
          loading={formState.isSubmitting}
          color='secondary'
          variant='pill'
          sx={{ whiteSpace: 'nowrap' }}
        >
          <Trans id='Apply' />
        </Button>
      </FormControl>

      <ApolloCartErrorAlert error={error} />
    </Box>
  )
}
