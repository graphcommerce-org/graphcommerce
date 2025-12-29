import type { ApolloClient } from '@graphcommerce/graphql'
import {
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  useCustomerSession,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  filterNonNullableKeys,
  iconDownload,
  LayoutOverlayHeader,
  LayoutTitle,
  RelativeToTimeFormat,
  SectionContainer,
  type GetStaticProps,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Container, Link, Typography } from '@mui/material'
import React from 'react'
import { DownloadsPageDocument } from '../../graphql/queries/DownloadsPage.gql'

export type DownloadsPageProps = Record<string, unknown>
type DownloadsGetStaticProps = GetStaticProps<Record<string, unknown>, DownloadsPageProps>

export function DownloadsPage() {
  const dashboard = useCustomerQuery(DownloadsPageDocument, {
    fetchPolicy: 'cache-and-network',
  })

  const downloads = filterNonNullableKeys(dashboard.data?.customerDownloadableProducts?.items)

  const session = useCustomerSession()

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconDownload}>
          <Trans>Downloads</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <WaitForCustomer waitFor={dashboard}>
          <PageMeta title={t`Downloads`} metaRobots={['noindex']} />

          <LayoutTitle
            icon={iconDownload}
            sx={(theme) => ({ mb: theme.spacings.xs })}
            gutterBottom={false}
          >
            <Trans>Downloads</Trans>
          </LayoutTitle>

          <Box>
            <SectionContainer labelLeft={<Trans>Downloads</Trans>}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, auto)',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Typography variant='subtitle1'>
                  <Trans>Order</Trans>
                </Typography>
                <Typography variant='subtitle1'>
                  <Trans>Download</Trans>
                </Typography>
                <Typography variant='subtitle1'>
                  <Trans>Remaining</Trans>
                </Typography>
                <Typography variant='subtitle1'>
                  <Trans>Status</Trans>
                </Typography>
                <Typography variant='subtitle1'>
                  <Trans>Date</Trans>
                </Typography>

                {downloads.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <React.Fragment key={index}>
                    <Box>
                      <Link href={`/account/orders/view?orderNumber=${item.order_increment_id}`}>
                        {item.order_increment_id}
                      </Link>
                    </Box>
                    <Box>
                      {item.status === 'available' ? (
                        <Link href={item.download_url} color='secondary'>
                          Download now
                        </Link>
                      ) : (
                        <Typography variant='subtitle1'>Order not completed</Typography>
                      )}
                    </Box>
                    <Box>{item.remaining_downloads}</Box>
                    <Box>{item.status}</Box>
                    <Box>
                      <RelativeToTimeFormat date={item.date} />
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
            </SectionContainer>
          </Box>
        </WaitForCustomer>
      </Container>
    </>
  )
}

export function createGetStaticProps(client: ApolloClient): DownloadsGetStaticProps {
  return async (context) => {
    if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

    const conf = client.query({ query: StoreConfigDocument })

    return {
      props: {
        apolloState: await conf.then(() => client.cache.extract()),
        variantMd: 'bottom',
        up: { href: '/account', title: t`Account` },
      },
    }
  }
}
