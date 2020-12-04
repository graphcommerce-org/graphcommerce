import { CartPaymentMethodsFragment, CartPaymentMethodsFragmentDoc } from './CartPaymentMethods.gql'

type CartPaymentMethodsProps = CartPaymentMethodsFragment

export default function CartPaymentMethods(props: CartPaymentMethodsProps) {
  const { available_payment_methods } = props
  return (
    <div>
      {available_payment_methods?.map((pm) => (
        <div key={pm?.code}>{pm?.title}</div>
      ))}
    </div>
  )
}
