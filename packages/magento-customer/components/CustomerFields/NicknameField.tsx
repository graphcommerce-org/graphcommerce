import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import { assertFormGqlOperation, useFormContext } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'

export function NicknameField() {
  const methods = useFormContext()
  assertFormGqlOperation(methods)
  const { control, formState, required, error, getValues } = methods
  return (
    <FormRow>
      <TextFieldElement
        variant='outlined'
        type='text'
        error={!!formState.errors.nickname || !!error}
        label={<Trans id='Name' />}
        required={required.nickname}
        control={control}
        name='nickname'
        helperText={<> {formState.errors.nickname?.message ?? ''} </>}
        disabled={formState.isSubmitting}
        InputProps={{
          readOnly: typeof getValues('nickname') !== 'undefined',
        }}
      />
    </FormRow>
  )
}
