import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Switch,
  SwitchProps,
} from '@material-ui/core'
import { ApolloCustomerErrorAlert } from '@reachdigital/magento-customer'
import { Controller } from '@reachdigital/react-hook-form'
import React from 'react'

const useStyles = makeStyles(() => ({
  labelRoot: {
    marginRight: 0,
  },
}))

// TODO: correct form value type...

// export type NewsletterToggleProps<
//   Q extends Record<string, any> = Record<string, any>,
//   V extends Record<string, any> = Record<string, any>,
// > = SwitchProps & {
//   name: string
//   form: Pick<UseFormGqlMutationReturn<Q, V>, 'control' | 'formState' | 'error'>
//   loading?: boolean
// }

export type NewsletterToggleProps = SwitchProps & {
  name: string
  form: any
  loading?: boolean
  disabled?: boolean
}

export default function NewsletterToggle(props: NewsletterToggleProps) {
  const { name, form, disabled, loading, ...switchProps } = props
  const { control, formState, error } = form
  const classes = useStyles(props)

  if (disabled || loading) return <Switch disabled color='primary' {...switchProps} />

  return (
    <form noValidate>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name: controlName, ref, onBlur } }) => (
          <FormControl error={!!formState.errors[name]}>
            <FormControlLabel
              classes={{ root: classes.labelRoot }}
              label=''
              control={<Switch color='primary' {...switchProps} />}
              checked={value}
              inputRef={ref}
              onBlur={onBlur}
              name={controlName}
              onChange={(e) => onChange((e as React.ChangeEvent<HTMLInputElement>).target.checked)}
            />
            {formState.errors[name]?.message && (
              <FormHelperText>{formState.errors[name]?.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
