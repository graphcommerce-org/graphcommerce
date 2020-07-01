import React from 'react'
import classes from '@magento/venia-ui/lib/components/Header/cartTrigger.css'
import ShoppingCart from '@material-ui/icons/ShoppingCart'

const CartTriggerSkeleton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
> = (props, ref) => {
  return (
    <button type='button' className={classes.root} {...props} ref={ref}>
      <ShoppingCart />
    </button>
  )
}

export default React.forwardRef(CartTriggerSkeleton)
