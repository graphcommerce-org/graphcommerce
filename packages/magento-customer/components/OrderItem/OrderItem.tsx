import { Image } from '@graphcommerce/image'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { Money } from '@graphcommerce/magento-store'
import { NextLink, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { OrderCardItemImageFragment } from '../../hooks/OrderCardItemImage.gql'
import type { OrderItemFragment } from './OrderItem.gql'

type OrderItemProps = OrderItemFragment & Omit<OrderCardItemImageFragment, 'uid'>

const rowImageSize = responsiveVal(70, 110)

type OwnerState = { hasOptions: boolean }
const componentName = 'OrderItem'
const parts = [
  'root',
  'itemWithoutOptions',
  'picture',
  'pictureSpacing',
  'image',
  'productLink',
  'itemName',
  'itemNameWithOptions',
  'itemPrice',
  'quantity',
  'rowPrice',
  'optionsList',
  'option',
] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export function OrderItem(props: OrderItemProps) {
  const {
    product_url_key,
    selected_options,
    product_sale_price,
    quantity_ordered,
    product_name,
    thumbnail,
  } = props
  const productLink = useProductLink({
    __typename: 'SimpleProduct' as const,
    url_key: product_url_key,
  })

  const hasOptions = Boolean(selected_options && selected_options.length >= 1)

  const classes = withState({ hasOptions })

  return (
    <Box
      className={classes.root}
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'grid',
        gridTemplate: `
          "picture itemName itemName itemName"
          "picture itemOptions itemOptions itemOptions"
          "picture itemPrice quantity rowPrice"
        `,
        gridTemplateColumns: `${rowImageSize} repeat(3, 1fr)`,
        columnGap: theme.spacings.sm,
        alignItems: 'baseline',
        typography: 'body1',
        py: theme.spacings.xxs,
        [theme.breakpoints.up('sm')]: {
          gridTemplate: `
            "picture itemName itemName itemName itemName"
            "picture itemOptions itemPrice quantity rowPrice"
          `,
          gridTemplateColumns: `${rowImageSize} 4fr 1fr 1fr minmax(75px, 1fr)`,
        },

        '&:not(.hasOptions)': {
          display: 'grid',
          gridTemplate: `
            "picture itemName itemName itemName"
            "picture itemPrice quantity rowPrice"`,
          alignItems: 'center',
          gridTemplateColumns: `${rowImageSize} repeat(3, 1fr)`,
          [theme.breakpoints.up('sm')]: {
            gridTemplate: `
              "picture itemName itemPrice quantity rowPrice"
            `,
            gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(75px, 1fr)`,
          },
        },
      })}
    >
      <Box className={classes.picture} sx={{ gridArea: 'picture' }}>
        <Box href={productLink} component={NextLink} className={classes.productLink}>
          <Box className={classes.pictureSpacing}>
            {thumbnail?.url && thumbnail?.label && (
              <Image
                alt={thumbnail?.label ?? ''}
                width={104}
                height={86}
                src={thumbnail?.url ?? ''}
                className={classes.image}
                sx={(theme) => ({
                  backgroundColor: theme.palette.background.image,
                })}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Box
        href={productLink}
        component={NextLink}
        className={classes.itemName}
        sx={(theme) => ({
          typography: 'h5',
          fontWeight: 500,
          gridArea: 'itemName',
          color: theme.palette.text.primary,
          textDecoration: 'none',
          flexWrap: 'nowrap',
          maxWidth: 'max-content',
          '&.hasOptions': {
            alignSelf: 'flex-end',
          },
        })}
      >
        {product_name}
      </Box>

      <Box
        className={classes.itemPrice}
        sx={(theme) => ({
          gridArea: 'itemPrice',
          textAlign: 'left',
          color: theme.palette.text.secondary,
        })}
      >
        <Money {...product_sale_price} />
      </Box>

      <Box
        className={classes.quantity}
        sx={{ gridArea: 'quantity', justifySelf: 'center' }}
      >{`${quantity_ordered}x`}</Box>

      <Box className={classes.rowPrice} sx={{ gridArea: 'rowPrice', textAlign: 'right' }}>
        <Money
          currency={product_sale_price.currency}
          value={(product_sale_price.value ?? 0) * (quantity_ordered ?? 1)}
        />
      </Box>

      {hasOptions && (
        <Box className={classes.optionsList} sx={{ gridArea: 'itemOptions', cursor: 'default' }}>
          {selected_options?.map((option) => (
            <Box
              key={option?.label}
              className={classes.option}
              sx={(theme) => ({
                color: theme.palette.grey['500'],
                marginRight: theme.spacings.xs,
                paddingBottom: '1px',
                display: 'inline',
              })}
            >
              {option?.value}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
