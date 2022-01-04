import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { OrderCardItemImageFragment } from '../../hooks/OrderCardItemImage.gql'
import { OrderItemFragment } from './OrderItem.gql'

type OrderItemProps = OrderItemFragment & Omit<OrderCardItemImageFragment, 'uid'>

const rowImageSize = responsiveVal(70, 125)
const useStyles = makeStyles({ name: 'OrderItem' })((theme: Theme) => ({
  root: {
    display: 'grid',
    gridTemplate: `
      "picture itemName itemName itemName"
      "picture itemOptions itemOptions itemOptions"
      "picture itemPrice quantity rowPrice"
        `,
    gridTemplateColumns: `${rowImageSize} repeat(3, 1fr)`,
    columnGap: theme.spacings.sm,
    alignItems: 'baseline',
    ...theme.typography.body1,
    marginBottom: theme.spacings.lg,
    marginTop: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      gridTemplate: `
        "picture itemName itemName itemName itemName"
        "picture itemOptions itemPrice quantity rowPrice"
      `,
      gridTemplateColumns: `${rowImageSize} 4fr 1fr 1fr minmax(75px, 1fr)`,
      marginBottom: theme.spacings.md,
    },
  },
  itemWithoutOptions: {
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
  picture: {
    gridArea: 'picture',
    width: rowImageSize,
    height: rowImageSize,
    padding: responsiveVal(5, 10),
    border: `1px solid rgba(0,0,0,0.15)`,
    borderRadius: '50%',
  },
  pictureSpacing: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    flexShrink: 0,
    userSelect: 'none',
    borderRadius: '50%',
    justifyContent: 'center',
    backgroundColor: 'rgb(248,248,248)',
  },
  image: {
    gridColumn: 1,
    backgroundColor: theme.palette.background.image,
    objectFit: 'cover',
    display: 'block',
    transform: 'scale(1.1)',
  },
  productLink: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  itemName: {
    ...theme.typography.h5,
    fontWeight: 500,
    gridArea: 'itemName',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    flexWrap: 'nowrap',
    maxWidth: 'max-content',
  },
  itemNameWithOptions: {
    alignSelf: 'flex-end',
  },
  itemPrice: {
    gridArea: 'itemPrice',
    textAlign: 'left',
    color: theme.palette.text.disabled,
  },
  quantity: {
    gridArea: 'quantity',
    justifySelf: 'center',
  },
  rowPrice: {
    gridArea: 'rowPrice',
    textAlign: 'right',
  },
  optionsList: {
    gridArea: 'itemOptions',
    cursor: 'default',
  },
  option: {
    color: theme.palette.grey['500'],
    marginRight: theme.spacings.xs,
    paddingBottom: 1,
    display: 'inline',
  },
}))

export default function OrderItem(props: OrderItemProps) {
  const {
    product_url_key,
    selected_options,
    product_sale_price,
    quantity_ordered,
    product_name,
    thumbnail,
  } = props
  const { classes } = useStyles()
  const productLink = `/product/${product_url_key}`

  const hasOptions = selected_options && selected_options.length >= 1

  return (
    <div className={clsx(classes.root, !hasOptions && classes.itemWithoutOptions)}>
      <div className={classes.picture}>
        <PageLink href={productLink}>
          <a className={classes.productLink}>
            <div className={classes.pictureSpacing}>
              {thumbnail?.url && thumbnail?.label && (
                <Image
                  alt={thumbnail?.label ?? ''}
                  width={104}
                  height={86}
                  src={thumbnail?.url ?? ''}
                  className={classes.image}
                />
              )}
            </div>
          </a>
        </PageLink>
      </div>

      <PageLink href={productLink}>
        <a className={clsx(classes.itemName, hasOptions && classes.itemNameWithOptions)}>
          {product_name}
        </a>
      </PageLink>

      <div className={classes.itemPrice}>
        <Money {...product_sale_price} />
      </div>

      <div className={classes.quantity}>{`${quantity_ordered}x`}</div>

      <div className={classes.rowPrice}>
        <Money
          currency={product_sale_price.currency}
          value={(product_sale_price.value ?? 0) * (quantity_ordered ?? 1)}
        />
      </div>

      {hasOptions && (
        <div className={classes.optionsList}>
          {selected_options?.map((option) => (
            <div key={option?.label} className={classes.option}>
              {option?.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
