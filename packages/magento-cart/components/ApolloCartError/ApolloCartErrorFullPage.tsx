import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import {
  ApolloErrorFullPage,
  ApolloErrorFullPageProps,
  iconSadFace,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorFullPageProps = Omit<ApolloErrorFullPageProps, 'icon'>

export function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  const { error, ...passedProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity ? <Button onClick={clear}>Reset Cart</Button> : undefined

  return (
    <ApolloErrorFullPage
      error={error}
      icon={<SvgImageSimple src={iconSadFace} size='xxl' />}
      button={action}
      {...passedProps}
    />
  )
}
