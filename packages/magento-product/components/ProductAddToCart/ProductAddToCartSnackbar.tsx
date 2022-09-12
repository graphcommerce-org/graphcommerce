import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  iconChevronRight,
  IconSvg,
  MessageSnackbar,
  ErrorSnackbar,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import PageLink from 'next/link'
import { useFormProductAddToCart } from './ProductAddToCartForm'

type AddToCartMessageProps = { name?: string | null }

export function ProductAddToCartSnackbar(props: AddToCartMessageProps) {
  const { name } = props
  const { formState, error, data } = useFormProductAddToCart()

  return (
    <>
      <ApolloCartErrorSnackbar error={error} />

      <ErrorSnackbar
        variant='pill'
        severity='error'
        open={(data?.addProductsToCart?.user_errors?.length ?? 0) > 0}
        action={
          <Button size='medium' variant='pill' color='secondary'>
            <Trans id='Ok' />
          </Button>
        }
      >
        <>{data?.addProductsToCart?.user_errors?.map((e) => e?.message).join(', ')}</>
      </ErrorSnackbar>

      <MessageSnackbar
        open={
          !formState.isSubmitting &&
          formState.isSubmitSuccessful &&
          !error?.message &&
          !data?.addProductsToCart?.user_errors?.length
        }
        variant='pill'
        action={
          <PageLink href='/cart' passHref>
            <Button
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='View shopping cart' />
            </Button>
          </PageLink>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your shopping cart!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
      </MessageSnackbar>
    </>
  )
}
