import { TextFieldElement, useForm, useWatch } from '@graphcommerce/ecommerce-ui'
import { FormRow, extendableComponent } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { FormEventHandler, useEffect } from 'react'
import { UseSearchBoxProps } from 'react-instantsearch-hooks'

const name = 'SearchBox' as const
const parts = ['root', 'totalProducts'] as const
const { classes } = extendableComponent(name, parts)

type SearchBoxProps = {
  refine: (value: string) => void
  defaultValue?: string
} & UseSearchBoxProps

export function SearchBox(props: SearchBoxProps) {
  const { defaultValue: dvalue, refine } = props

  const form = useForm({ defaultValues: { defaultValue: dvalue } })

  const { defaultValue } = useWatch({ ...form })

  useEffect(() => {})

  return (
    <Box
      className={classes.root}
      component='form'
      noValidate
      onChange={() => {
        if (defaultValue) refine(defaultValue)
      }}
    >
      <FormRow>
        <TextFieldElement
          name='defaultValue'
          control={form.control}
          variant='outlined'
          type='text'
          placeholder={i18n._(/* i18n */ 'Search')}
          defaultValue={defaultValue}
          validation={{ minLength: 2 }}
        />
      </FormRow>
    </Box>
  )
}
