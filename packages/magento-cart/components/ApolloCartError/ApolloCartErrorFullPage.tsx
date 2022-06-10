import {
  ApolloCustomerErrorFullPage,
  ApolloCustomerErrorFullPageProps,
} from '@graphcommerce/magento-customer'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { iconSadFace, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorFullPageProps = Omit<ApolloCustomerErrorFullPageProps, 'icon'>

export function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  const { error, button } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })

  return (
    <ApolloCustomerErrorFullPage
      {...props}
      icon={<IconSvg src={iconSadFace} size='xxl' />}
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
