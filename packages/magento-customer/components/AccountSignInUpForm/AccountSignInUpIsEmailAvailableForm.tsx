import { extendableComponent } from '@graphcommerce/next-ui'
import { FormProvider } from '@graphcommerce/react-hook-form'
import { SxProps, Theme } from '@mui/material'
import { useFormIsEmailAvailable } from '../../hooks'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { AccountSignInUpFormComponents } from './AccountSignInUpFormComponents'

export type AccountSignInUpIsEmailAvailableFormProps = {
  sx?: SxProps<Theme>
  titleContainerSx: SxProps<Theme>
  firstName: string
  email?: string | null
}

const parts = ['root', 'titleContainer'] as const
const { classes } = extendableComponent('AccountSignInUpIsEmailAvailableForm', parts)

export function AccountSignInUpIsEmailAvailableForm(
  props: AccountSignInUpIsEmailAvailableFormProps,
) {
  const { sx = [], titleContainerSx, email, firstName } = props
  const { mode, form, autoSubmitting, submit } = useFormIsEmailAvailable({ email })
  return (
    <FormProvider {...form}>
      <AccountSignInUpFormComponents
        sx={sx}
        mode={mode}
        autoSubmitting={autoSubmitting}
        submit={submit}
        classes={classes}
        titleContainerSx={titleContainerSx}
        email={email}
        firstName={firstName}
      />
      <ApolloCustomerErrorAlert error={form.error} />
    </FormProvider>
  )
}
