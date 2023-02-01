import { Money } from '@graphcommerce/magento-store';
import { Trans } from '@lingui/react';
import { Box } from '@mui/material';
import { ProductPagePriceFragment } from './ProductPagePrice.gql';

export function ProductPagePriceTiers(props: {
  priceTiers: ProductPagePriceFragment['price_tiers']
}) {
  const { priceTiers } = props;

  return (
    <Box>
      {priceTiers?.map(priceTier => (
        <div key={ priceTier?.quantity }>
          <Trans
            id='Buy {quantity} for {price} and save {percent}%'
            values={{
              quantity: priceTier?.quantity,
              price: <Money {...priceTier?.final_price} />,
              percent: priceTier?.discount?.percent_off,
            }}
          />
        </div>
      ))}
    </Box>
  )
}
