import {
  ApolloErrorFullPage,
  ApolloErrorAlertProps,
  iconPerson,
  SvgIcon,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button } from '@mui/material'
import PageLink from 'next/link'
import { useExtractCustomerErrors } from '../../hooks/useExtractCustomerErrors'

type ApolloCustomerErrorFullPageProps = {
  signInHref: string
  signUpHref: string
} & ApolloErrorAlertProps

export default function ApolloCustomerErrorFullPage(props: ApolloCustomerErrorFullPageProps) {
  const { signInHref, signUpHref } = props
  const { error, unauthorized } = useExtractCustomerErrors(props)

  return (
    <ApolloErrorFullPage
      error={error}
      icon={<SvgIcon src={iconPerson} size='xxl' />}
      button={
        unauthorized ? (
          <PageLink href={signInHref} passHref>
            <Button variant='contained' color='primary' size='large'>
              <Trans>Login</Trans>
            </Button>
          </PageLink>
        ) : undefined
      }
      altButton={
        unauthorized ? (
          <PageLink href={signUpHref} passHref>
            <Button variant='text' color='primary'>
              <Trans>Or create an account</Trans>
            </Button>
          </PageLink>
        ) : undefined
      }
    />
  )
}
