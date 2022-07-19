import {
  ApolloCustomerErrorFullPage,
  ApolloCustomerErrorFullPageProps,
} from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { iconShoppingBag, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useCurrentCartId } from '../../hooks'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'
import { EmptyCart } from '../EmptyCart/EmptyCart'

export type ApolloCartErrorFullPageProps = Omit<ApolloCustomerErrorFullPageProps, 'icon'>

export function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  const { error, button } = props
  const clear = useClearCurrentCartId()
  const { currentCartId } = useCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })

  if (noSuchEntity)
    return (
      <EmptyCart
        button={
          currentCartId ? (
            <Button onClick={clear}>
              <Trans id='Reset Cart' />
            </Button>
          ) : undefined
        }
      />
    )

  return (
    <ApolloCustomerErrorFullPage
      {...props}
      icon={<IconSvg src={iconShoppingBag} size='xxl' />}
      button={
        noSuchEntity ? (
          <Button onClick={clear}>
            <Trans id='Reset Cart' />
          </Button>
        ) : (
          button
        )
      }
    />
  )
}
