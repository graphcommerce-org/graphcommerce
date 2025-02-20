import { ActionCardListForm } from '@graphcommerce/ecommerce-ui'
import type { AddToCartItemSelector } from '@graphcommerce/magento-product'
import { useFormAddProductsToCart } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import {
  ActionCard,
  filterNonNullableKeys,
  ListFormat,
  SectionHeader,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Link } from '@mui/material'
import { useMemo } from 'react'
import type { DownloadableProductOptionsFragment } from '../../graphql'

export type DownloadableProductOptionsProps = AddToCartItemSelector & {
  product: DownloadableProductOptionsFragment
}

export function DownloadableProductOptions(props: DownloadableProductOptionsProps) {
  const { product, index = 0 } = props
  const { control } = useFormAddProductsToCart()

  const {
    links_purchased_separately,
    links_title,
    downloadable_product_links,
    downloadable_product_samples,
  } = product

  const options = useMemo(
    () =>
      filterNonNullableKeys(downloadable_product_links, ['title']).map((item) => {
        const newItem: ActionCardProps = {
          value: item.uid,
          title: item.title,
          price: <Money value={item.price} />,
          details: item.sample_url ? <Link href={item.sample_url}>View Sample</Link> : null,
        }
        return newItem
      }),
    [downloadable_product_links],
  )

  const samples = filterNonNullableKeys(downloadable_product_samples, [
    'sort_order',
    'title',
    'sample_url',
  ]).sort((a, b) => a.sort_order - b.sort_order)

  return (
    <>
      <Box>
        <SectionHeader labelLeft={links_title} />
        <ActionCardListForm
          multiple={links_purchased_separately !== 1}
          size='medium'
          required
          control={control}
          name={`cartItems.${index}.selected_options_record.downloadable`}
          render={ActionCard}
          items={options}
        />
      </Box>

      {samples.length > 0 ? (
        <Box>
          <SectionHeader labelLeft='Samples' />
          <ListFormat>
            {samples.map((sample) => (
              <Link key={sample.sample_url} href={sample.sample_url}>
                {sample.title}
              </Link>
            ))}
          </ListFormat>
        </Box>
      ) : null}
    </>
  )
}
