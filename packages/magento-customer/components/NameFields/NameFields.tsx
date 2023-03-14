import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { assertFormGqlOperation, Controller, UseFormReturn } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

type NameFieldValues = {
  firstname?: string
  lastname?: string
  prefix?: string
}

type NameFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  readOnly?: boolean
  prefix?: boolean
  prefixes?: string[]
}

export function NameFields(props: NameFieldProps) {
  const mr = i18n._(/* i18n */ 'Mr')
  const mrs = i18n._(/* i18n */ 'Mrs')
  const other = i18n._(/* i18n */ 'Other')

  const { prefix, form, readOnly, prefixes = [mr, mrs, other] } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, formState, muiRegister, required, valid } = form

  return (
    <>
      {prefix && (
        <FormRow>
          <Controller
            defaultValue={prefixes[0]}
            control={control}
            name='prefix'
            render={({ field: { ref, onChange, ...field }, fieldState }) => (
              <TextField
                variant='outlined'
                select
                error={!!fieldState.error}
                label={<Trans id='Prefix' />}
                required={!!required?.prefix}
                helperText={fieldState.error?.message}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                InputProps={{
                  readOnly,
                  endAdornment: <InputCheckmark show={valid.prefix} select />,
                }}
                {...field}
              >
                {prefixes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </FormRow>
      )}

      <FormRow>
        <TextFieldElement
          control={form.control}
          name='firstname'
          required={required.firstname}
          variant='outlined'
          type='text'
          label={<Trans id='First Name' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.firstname} />,
          }}
        />
        <TextFieldElement
          control={form.control}
          name='lastname'
          required={required.lastname}
          variant='outlined'
          type='text'
          label={<Trans id='Last Name' />}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.lastname} />,
          }}
        />
      </FormRow>
    </>
  )
}
