// managed by: graphcommerce
// to modify this file, change it to managed by: local

import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { FullPageMessage, iconError, IconSvg } from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  type LayoutNavigationProps,
} from '../../../../../components'
import { graphqlSsrClient } from '../../../../../lib/graphql/graphqlSsrClient'

type ErrorType = 'not-sharable' | 'unknown'

type Props = { errorType: ErrorType }

export default function DownloadLinkPage(props: Props) {
  const { errorType } = props
  return (
    <FullPageMessage
      icon={<IconSvg src={iconError} size='xxl' />}
      title={<>Error while downloading file</>}
    >
      {errorType === 'not-sharable' && (
        <>
          The requested file of found, but is not &ldquo;Sharable&rdquo; and can therefor not be
          downloaded.
        </>
      )}
    </FullPageMessage>
  )
}

DownloadLinkPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export const getServerSideProps: GetServerSideProps<Props & LayoutNavigationProps> = async (
  context,
) => {
  const { query } = context
  const id = query?.id

  const staticClient = graphqlSsrClient(context)
  const conf = await staticClient.query({ query: StoreConfigDocument })

  const baseUrl = conf.data.storeConfig?.secure_base_url
  if (!baseUrl) return { notFound: true }

  const downloadUrl = new URL(baseUrl)
  downloadUrl.pathname = `/downloadable/download/link/id/${id}`

  const response = await fetch(downloadUrl, {
    redirect: 'manual',
  })

  async function pageResponse(errorType: ErrorType) {
    const layout = staticClient.query({
      query: LayoutDocument,
      fetchPolicy: cacheFirst(staticClient),
    })
    return {
      props: {
        errorType,
        ...(await layout).data,
        apolloState: staticClient.cache.extract(),
      },
    }
  }

  if (response.status === 302) {
    const location = response.headers.get('Location')
    const requestSignIn = location?.includes('customer/account/login')
    if (requestSignIn) return pageResponse('not-sharable')
    return pageResponse('unknown')
  }

  if (response.status !== 200 || !response.body) return { notFound: true }

  context.res.setHeader(
    'Content-Type',
    response.headers.get('Content-Type') ?? 'application/octet-stream',
  )
  context.res.setHeader(
    'Content-Disposition',
    response.headers.get('Content-Disposition') ?? 'attachment',
  )

  await response.body.pipeTo(
    new WritableStream<Uint8Array>({
      write: (chunk) => {
        context.res.write(chunk)
      },
      close() {
        context.res.end()
      },
    }),
  )

  return pageResponse('unknown')
}
