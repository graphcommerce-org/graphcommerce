import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useWishlistItems, WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  iconHeart,
  FullPageMessage,
  Button,
  LayoutTitle,
  IconSvg,
  LayoutOverlayHeader,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { CircularProgress, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function WishlistPage() {
  const wishlistItems = useWishlistItems()

  return (
    <>
      <PageMeta title={t`Wishlist`} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={(theme) => ({
          '&.noAlign': { marginBottom: theme.spacings.sm },
          '& + .MuiContainer-root': { marginBottom: theme.spacings.sm },
        })}
      >
        <LayoutTitle component='span' size='small' icon={iconHeart}>
          <Trans>Wishlist</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[wishlistItems]}
        fallback={
          <FullPageMessage title={<Trans>Loading</Trans>} icon={<CircularProgress />}>
            <Trans>We are fetching your favorite products, one moment please!</Trans>
          </FullPageMessage>
        }
      >
        <Container maxWidth='md'>
          {wishlistItems.items.length === 0 ? (
            <FullPageMessage
              title={<Trans>Your wishlist is empty</Trans>}
              icon={<IconSvg src={iconHeart} size='xxl' />}
              button={
                <Button href='/' variant='pill' color='primary' size='large'>
                  <Trans>Continue shopping</Trans>
                </Button>
              }
            >
              <Trans>Discover our collection and add items to your wishlist!</Trans>
            </FullPageMessage>
          ) : (
            <>
              {wishlistItems.items.map((item) => (
                <WishlistItemActionCard key={item.id} item={item} />
              ))}
            </>
          )}
        </Container>
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
