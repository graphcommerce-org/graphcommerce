import { Money } from '@graphcommerce/magento-store';
import { Trans } from '@lingui/react';
import { Box, SxProps, Theme } from '@mui/material';
import { ProductPagePriceFragment } from './ProductPagePrice.gql';

type ProductPagePriceTiersProps = {
  sx?: SxProps<Theme>
} & ProductPagePriceFragment

export function ProductPagePriceTiers(props: ProductPagePriceTiersProps) {
  const { price_tiers, sx = [] } = props;

  if (!price_tiers?.length) return null;

  return (
    <Box sx={[
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>
      {price_tiers?.map(priceTier => (
        <div key={ priceTier?.quantity }>
          <Trans
            id='Buy {quantity} for <0/> and save {percent}%'
            components={{ 0: <Money {...priceTier?.final_price} /> }}
            values={{
              quantity: priceTier?.quantity,
              percent: priceTier?.discount?.percent_off,
            }}
          />
        </div>
      ))}
    </Box>
  )
}
