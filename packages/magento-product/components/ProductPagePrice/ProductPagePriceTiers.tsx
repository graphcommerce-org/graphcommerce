import { Money } from '@graphcommerce/magento-store';
import { Trans } from '@lingui/react';
import { Box, SxProps, Theme } from '@mui/material';
import { ProductPagePriceFragment } from './ProductPagePrice.gql';

type ProductPagePriceTiersProps = {
  sx?: SxProps<Theme>
} & ProductPagePriceFragment

export function ProductPagePriceTiers(props: ProductPagePriceTiersProps) {
  const { price_tiers, sx = [] } = props;

  return (
    <Box sx={[
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}>
      {price_tiers?.map(priceTier => (
        <div key={ priceTier?.quantity }>
          <Trans
            id='Buy {quantity} for <Money/> and save {percent}%'
            components={{ Money: <Money {...priceTier?.final_price} /> }}
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
