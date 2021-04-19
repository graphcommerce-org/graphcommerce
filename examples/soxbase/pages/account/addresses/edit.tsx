import { useQuery } from '@apollo/client'
import { Box, Container, makeStyles, NoSsr, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import { AccountDashboardAddressesDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardAddresses.gql'
import DeleteCustomerAddressForm from '@reachdigital/magento-customer/DeleteCustomerAddressForm'
import EditAddressForm from '@reachdigital/magento-customer/EditAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import Button from '@reachdigital/next-ui/Button'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { useRouter } from 'next/router'
import React from 'react'
import SheetLayout, { SheetLayoutProps } from '../../../components/AppShell/SheetLayout'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

const useStyles = makeStyles(
  (theme: Theme) => ({
    deleteButton: {
      margin: `0 auto ${theme.spacings.md} auto`,
      display: 'block',
    },
  }),
  { name: 'EditAddressPage' },
)

function EditAddressPage(props: Props) {
  const { countries } = props
  const router = useRouter()
  const { addressId } = router.query
  const classes = useStyles()

  const { data, loading } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'network-only',
    ssr: false,
  })

  const numAddressId = Number(addressId)
  const addresses = data?.customer?.addresses
  const address = addresses?.filter((a) => a?.id === numAddressId)?.[0]

  return (
    <Container maxWidth='md'>
      <PageMeta title='Edit address' metaDescription='Edit an address' metaRobots={['noindex']} />
      <NoSsr>
        <IconTitle
          iconSrc='/icons/desktop_addresses.svg'
          title='Addresses'
          alt='addresses'
          size='large'
        />

        <SectionContainer label='Edit address'>
          {!address && !loading && (
            <Box marginTop={3}>
              <IconTitle
                iconSrc='/icons/desktop_addresses.svg'
                title='Address not found'
                alt='address'
                size='small'
              />
            </Box>
          )}

          {loading && (
            <div>
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
              <Skeleton height={72} />
            </div>
          )}

          {address && !loading && <EditAddressForm countries={countries} address={address} />}

          {address && !loading && (
            <DeleteCustomerAddressForm
              button={() => (
                <Button
                  type='submit'
                  variant='text'
                  color='primary'
                  className={classes.deleteButton}
                >
                  Delete this address
                </Button>
              )}
              addressId={address?.id ?? undefined}
            />
          )}
        </SectionContainer>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetLayoutProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetLayout,
  sharedKey: () => 'account-addresses',
  sharedProps: { variant: 'bottom', size: 'max' },
}
EditAddressPage.pageOptions = pageOptions

export default EditAddressPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
