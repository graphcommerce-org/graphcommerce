import { ApolloErrorFullPage, ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import { graphqlErrorByCategory } from '@graphcommerce/magento-graphql'
import { iconSadFace, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { useClearCurrentCartId } from '../../hooks/useClearCurrentCartId'

export type ApolloCartErrorFullPageProps = Omit<ApolloErrorFullPageProps, 'icon'>

export function ApolloCartErrorFullPage(props: ApolloCartErrorFullPageProps) {
  const { error, ...passedProps } = props
  const clear = useClearCurrentCartId()

  const [, noSuchEntity] = graphqlErrorByCategory({ category: 'graphql-no-such-entity', error })
  const action = noSuchEntity ? (
    <Button onClick={clear}>
      <Trans id='Reset Cart' />
    </Button>
  ) : undefined

  return (
    <ApolloErrorFullPage
      error={error}
      icon={<IconSvg src={iconSadFace} size='xxl' />}
      button={action}
      {...passedProps}
    />
  )
}
