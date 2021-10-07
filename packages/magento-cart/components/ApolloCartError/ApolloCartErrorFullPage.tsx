import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  ApolloErrorFullPage,
  Button,
  SvgImage,
  ApolloErrorFullPageProps,
  iconLock,
  iconSadShoppingBag,
} from '@graphcommerce/next-ui'
import React from 'react'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorFullPageProps = Omit<ApolloErrorFullPageProps, 'icon'>

export default function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  const { error, ...passedProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity ? <Button onClick={clear}>Reset Cart</Button> : undefined

  return (
    <ApolloErrorFullPage
      error={error}
      icon={<SvgImage src={iconSadShoppingBag} size={148} alt='person' />}
      button={action}
      {...passedProps}
    />
  )
}
