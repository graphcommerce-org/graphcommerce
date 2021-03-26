import React from 'react'
import { UseFormMethods } from 'react-hook-form'

type UseFormCheckmarksProps = {
  formMethods: Pick<UseFormMethods, 'watch' | 'errors'> & {
    required: { [key: string]: boolean }
  }
  icon: React.ReactNode
}

export type FormCheckmarks = {
  checkmarks: { [key: string]: React.ReactNode | undefined }
}

export default function useFormCheckmarks(props: UseFormCheckmarksProps): FormCheckmarks {
  const { formMethods, icon } = props
  const { required, errors, watch } = formMethods
  const fields = {}

  Object.keys(required).forEach((key) => {
    fields[key] = !errors[key] && watch(key) ? icon : undefined
  })

  return {
    checkmarks: fields,
  }
}
