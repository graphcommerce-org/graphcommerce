import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { UpsellProductsFragment } from '@reachdigital/magento-product-types/UpsellProducts.gql'
import SidebarSlider from '@reachdigital/next-ui/FramerSlider/variants/SidebarSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import renderers from '../ProductListItems/renderers'
import { RowProductUpsellsFragment } from './RowProductUpsells.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    h2: {
      fontSize: responsiveVal(16, 40),
    },
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'RowProductUpsells' },
)

type RowProductUpsellsProps = RowProductUpsellsFragment & UpsellProductsFragment

export default function RowProductUpsells(props: RowProductUpsellsProps) {
  const { title, upsell_products } = props
  const classes = useStyles()

  if (!upsell_products || upsell_products.length === 0) return null
  return (
    <SidebarSlider
      sidebar={
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
      }
    >
      {upsell_products.map((item) =>
        item ? (
          <RenderType
            key={item.id ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes.item }}
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
