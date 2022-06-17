import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { ReactNode } from 'react'

type ConfigurableProductSubmitButtonProps = {
  additionalButtons?: ReactNode
  classes: {
    buttonWrapper: string
    button: string
  }
}

export function ConfigurableProductSubmitButton(props: ConfigurableProductSubmitButtonProps) {
  const { additionalButtons, classes } = props
  const { formState } = useFormProductAddToCart()

  return (
    <Box
      sx={(theme) => ({ display: 'flex', alignItems: 'center', columnGap: theme.spacings.xs })}
      className={classes.buttonWrapper}
    >
      <Button
        type='submit'
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        className={classes.button}
        sx={(theme) => ({
          marginTop: theme.spacings.sm,
          marginBottom: theme.spacings.sm,
          width: '100%',
        })}
      >
        <Trans id='Add to Cart' />
      </Button>
      {additionalButtons}
    </Box>
  )
}
