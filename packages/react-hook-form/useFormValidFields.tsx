import { UseFormMethods } from 'react-hook-form'

type UseFormValidFieldsProps = {
  form: Pick<UseFormMethods, 'watch' | 'errors'> & { required: Record<string, boolean> }
}

/**
 * @param props
 * @returns Key value pair with field names as key and boolean as value indicating whether the field is valid
 */
export default function useFormValidFields(
  props: UseFormValidFieldsProps,
): Record<string, boolean> {
  const { form } = props
  const { required, errors, watch } = form
  const fields = {}

  Object.keys(required).forEach((key) => {
    fields[key] = !errors[key] && watch(key)
  })

  return fields
}
