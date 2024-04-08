# Form

The Form component is an extension of the (React Hook
Form)(https://react-hook-form.com/) package which adds new hooks.

## `useFormGqlMutation`

Simple example:

```tsx
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'

const mutation = gql`
  mutation ApplyCouponToCart($cartId: String!, $couponCode: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $couponCode }) {
      cart {
        id
      }
    }
  }
`

export default function MyComponent() {
  const form = useFormGqlMutation(mutation, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { errors, handleSubmit, register, formState, required, error } = form

  // We don't need to provide an actual handler as useFormGqlMutation already adds that.
  const submit = handleSubmit(() => {})

  return (
    <form onSubmit={submit} noValidate>
      <input
        type='text'
        {...register('couponCode', { required: required.couponCode })}
        disabled={formState.isSubmitting}
      />
      {errors.couponCode?.message || error?.message}
      <button type='submit'>submit</button>
    </form>
  )
}
```

## `useFormGqlQuery`

```tsx
import { useFormGqlQuery } from '@graphcommerce/react-hook-form'

const query = gql`
  query IsEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`

export default function MyComponent() {
  const form = useFormGqlQuery(query, {})
  const { errors, handleSubmit, register, formState, required, error } = form

  // We don't need to provide an actual handler as useFormGqlQuery already adds that.
  const submit = handleSubmit(() => {})

  return (
    <form onSubmit={submit} noValidate>
      <input
        type='text'
        {...register('couponCode', { required: required.couponCode })}
        disabled={formState.isSubmitting}
      />
      {errors.couponCode?.message || error?.message}
      <button type='submit'>submit</button>
    </form>
  )
}
```

## `FormAutoSubmit`

```tsx
import { FormAutoSubmit } from '@graphcommerce/react-hook-form'

export default function MyAutoSubmitForm() {
  // Regular useForm hook, but you can also use useFormGqlMutation
  const form = useForm()
  const { errors, handleSubmit, register, formState, required } = form

  const submit = handleSubmit(() => {
    console.log('submitted')
  })

  return (
    <form onSubmit={submit} noValidate>
      <FormAutoSubmit control={control} submit={submit} name={['couponCode']} wait={1200}>
      <input
        type='text'
        {...register('couponCode', { required: required.couponCode })}
      />
      {errors.couponCode?.message}
    </form>
  )
}
```

### `useFormPersist`

```tsx
import { useFormAutoSubmit } from '@graphcommerce/react-hook-form'

export default function MyAutoSubmitForm() {
  // Regular useForm hook, but you can also use useFormGqlMutation
  const form = useForm()
  const { errors, handleSubmit, register, formState, required } = form

  const submit = handleSubmit(() => {
    console.log('submitted')
  })
  const autoSubmitting = useFormPersist({ form, name: 'MyForm' })
  const disableFields = formState.isSubmitting && !autoSubmitting

  return (
    <form onSubmit={submit} noValidate>
      <input
        type='text'
        {...register('couponCode', { required: required.couponCode })}
        disabled={disableFields}
      />
      {errors.couponCode?.message}
    </form>
  )
}
```

## FAQ

### `Why is my useForm hook not submitting anything?`

```tsx
const form = useForm() // INCORRECT

const form useForm({ // CORRECT
  mode: 'onSubmit',
  defaultValues: {
   yourFieldName: 'default value',
  },
})

```
