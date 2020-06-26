import React from 'react'
import classes from '@magento/venia-ui/lib/components/Header/cartTrigger.css'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import Icon from '@magento/venia-ui/lib/components/Icon'

const CartTriggerSkeleton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
> = (props, ref) => {
  return (
    <button type='button' className={classes.root} {...props} ref={ref}>
      <Icon src={ShoppingCart} attrs={{ stroke: 'rgb(var(--venia-text))' }} />
    </button>
  )
}

export default React.forwardRef(CartTriggerSkeleton)
