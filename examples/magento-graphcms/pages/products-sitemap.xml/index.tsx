import { getSitemapPaths } from '@graphcommerce/magento-product/server'
import { GetServerSideProps } from 'next'
import { getServerSideSitemapLegacy } from 'next-sitemap'

// https://github.com/magento/magento2/blob/ea0cf6395753078e45af8c4a5ddc1ea2c4d91092/app/etc/di.xml#L1971
const pageSize = parseInt(process.env.MAGENTO_MAX_PAGE_SIZE ?? '0', 10) || 300

export const getServerSideProps: GetServerSideProps = async (context) => {
  const paths = await getSitemapPaths(context, pageSize)

  context.res.setHeader(
    'Cache-Control',
    `public, s-maxage=${60 * 60 * 2}, stale-while-revalidate=${60 * 60 * 24}`,
  )
  const result = getServerSideSitemapLegacy(context, paths)
  return result
}

export default function SitemapIndex() {}
