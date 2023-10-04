import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  useWishlistItems,
  WishlistItemActionCard,
  WishlistItemActionCardProps,
} from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  iconHeart,
  FullPageMessage,
  Button,
  LayoutTitle,
  IconSvg,
  LayoutOverlayHeader,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Theme, useMediaQuery } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function WishlistPage() {
  const wishlistItemsData = useWishlistItems()

  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'), {
    defaultMatches: false,
  })

  const size: WishlistItemActionCardProps['size'] = isMobile ? 'small' : 'large'

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Wishlist')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        <LayoutTitle component='span' size='small'>
          <Trans id='Wishlist' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[!!wishlistItemsData]}
        fallback={
          <Container maxWidth='md'>
            <FullPageMessage
              title={<Trans id='Loading wishlist' />}
              icon={<IconSvg src={iconHeart} size='xxl' />}
            >
              <Trans id='We are fetching your favorite products, one moment please!' />
            </FullPageMessage>
          </Container>
        }
      >
        <Container maxWidth='md'>
          {!wishlistItemsData.data || wishlistItemsData.data.length === 0 ? (
            <FullPageMessage
              title={<Trans id='Your wishlist is empty' />}
              icon={<IconSvg src={iconHeart} size='xxl' />}
              button={
                <Button href='/' variant='pill' color='primary' size='large'>
                  <Trans id='Continue shopping' />
                </Button>
              }
            >
              <Trans id='Discover our collection and add items to your wishlist!' />
            </FullPageMessage>
          ) : null}

          {wishlistItemsData.data && wishlistItemsData.data.length > 0 ? (
            <>
              <LayoutTitle icon={iconHeart}>
                <Trans id='Wishlist' />
              </LayoutTitle>
              <Container maxWidth='md'>
                {wishlistItemsData.data?.map((item) => {
                  if (!item?.id) return null
                  return <WishlistItemActionCard key={item.id} {...item} size={size} />
                })}
              </Container>
            </>
          ) : null}
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
