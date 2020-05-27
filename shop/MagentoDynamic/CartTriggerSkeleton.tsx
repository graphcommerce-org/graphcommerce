import React from 'react'
import classes from '@magento/venia-ui/lib/components/Header/cartTrigger.css'
import Icon from '@magento/venia-ui/lib/components/Icon'
import { ShoppingCart as ShoppingCartIcon } from 'react-feather'

const CartTriggerSkeleton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
> = (props, ref) => {
  return (
    <button type='button' className={classes.root} {...props} ref={ref}>
      <Icon classes={{ root: classes.iconClass }} src={ShoppingCartIcon} />
    </button>
  )
}

export default React.forwardRef(CartTriggerSkeleton)
