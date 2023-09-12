import { Box, SxProps, Theme } from '@mui/material'

// UseFormLayoutProps is used by forms that implement FormLayout. It is used to pass the children to the FormLayout
// component and pass on the original form layout back to form. Example:

// return (
//   <ExampleForm>
//     {({original, control}) => ( <----- original is the original form layout, control is the form control.
//       {original}
//       <TextField control={control} name='example'/> <----- this is a new form field added to the form, also called the form children
//     )}
//   </ExampleForm>
// )

export type UseFormLayoutProps<T> = Pick<FormLayoutProps<T>, 'children'>

export type FormLayoutProps<T> = {
  form: T
  original: React.ReactNode
  children?: (
    props: {
      original: React.ReactNode
    } & T,
  ) => React.ReactNode
  sx?: SxProps<Theme>
}

// This component is used to render a form layout. The form layout accepts a "original" form element, which usually consisist
// of a set of form fields. FormLayout is used in some standard GraphCommerce forms, such as the CreateProductReviewForm,
// ShippingAddressForm, and UpdateDefaultAddressForm. This means these forms will be customizable when using these forms.

export function FormLayout<T>(props: FormLayoutProps<T>) {
  const { children, original, form, sx } = props
  return <Box sx={sx}>{children ? children({ original, ...form }) : original}</Box>
}
