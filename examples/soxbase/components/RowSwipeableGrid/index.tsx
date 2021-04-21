import { Theme, Typography, makeStyles } from '@material-ui/core'
import { ProductListItemsFragment } from '@reachdigital/magento-product-types/ProductListItems.gql'
import SidebarSlider from '@reachdigital/next-ui/FramerSlider/variants/SidebarSlider'
import RenderType from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import renderers from '../ProductListItems/renderers'
import { RowSwipeableGridFragment } from './RowSwipeableGrid.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    h2: {
      // fontSize: responsiveVal(16, 40),
    },
    item: {
      minWidth: responsiveVal(200, 900),
    },
  }),
  { name: 'RowProductRelated' },
)

type RowProductRelatedProps = RowSwipeableGridFragment & ProductListItemsFragment

export default function RowSwipeableGrid(props: RowProductRelatedProps) {
  const { title, items } = props
  const classes = useStyles()

  if (!items || items.length === 0) return null
  return (
    <SidebarSlider
      sidebar={
        <Typography variant='h2' className={classes.h2}>
          {title}
        </Typography>
      }
    >
      {items.map((item) =>
        item ? (
          <RenderType
            key={item.uid ?? ''}
            renderer={renderers}
            {...item}
            classes={{ item: classes.item }}
            imageOnly
          />
        ) : null,
      )}
    </SidebarSlider>
  )
}
