import { Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { RelatedProductsFragment } from '@reachdigital/magento-product-types/RelatedProducts.gql'
import SidebarSlider from '@reachdigital/next-ui/FramerSlider/variants/SidebarSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import renderers from '../ProductListItems/renderers'
import { RowProductRelatedFragment } from './RowProductRelated.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    h2: {
      fontSize: responsiveVal(16, 40),
    },
    item: {
      minWidth: responsiveVal(200, 400),
    },
  }),
  { name: 'RowProductRelated' },
)

type RowProductRelatedProps = RowProductRelatedFragment & RelatedProductsFragment

export default function RowProductRelated(props: RowProductRelatedProps) {
  const { title, related_products } = props
  const classes = useStyles()

  if (!related_products || related_products.length === 0) return null
  return (
    <SidebarSlider
      sidebar={
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
      }
    >
      {related_products.map((item) =>
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
