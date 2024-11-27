import type { GetServerSideProps } from 'next'
import type {} from '@graphcommerce/next-ui'

export const getAssetLinksServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('Content-Type', 'application/json')

  const package_name = import.meta.graphCommerce.googlePlaystore?.packageName
  const sha256_cert_fingerprints = import.meta.graphCommerce.googlePlaystore
    ?.sha256CertificateFingerprint

  if (!package_name || !sha256_cert_fingerprints) return { notFound: true }

  context.res.setHeader('Cache-Control', 'max-age=604800, public')
  // https://developer.android.com/training/app-links/verify-android-applinks#web-assoc
  context.res.write(
    JSON.stringify([
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: { namespace: 'android_app', package_name, sha256_cert_fingerprints },
      },
    ]),
  )
  context.res.end()
  return { props: {} }
}
