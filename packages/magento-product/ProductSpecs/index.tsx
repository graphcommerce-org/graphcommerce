import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { ProductSpecsFragment } from './ProductSpecs.gql'

const useStyles = makeStyles((theme: Theme) => ({
  specs: {
    display: 'grid',
    margin: 0,
    padding: 0,
    gap: theme.spacings.xs,
    '& > *': {
      display: 'grid',
      gridTemplateColumns: `minmax(${responsiveVal(150, 200)}, 1fr) 1fr`,
      gap: theme.spacings.xs,
    },
  },
  options: {
    display: 'grid',
    gridAutoFlow: 'row',
  },
}))

export type ProductSpecsProps = ProductSpecsFragment

export default function ProductSpecs(props: ProductSpecsProps) {
  const { aggregations } = props
  const classes = useStyles()

  const filter = ['price', 'category_id', 'size', 'new']
  const specs = aggregations?.filter((attribute) => {
    if (
      filter.includes(String(attribute?.attribute_code)) ||
      (attribute?.options && attribute?.options[0] && attribute?.options[0].value === '0')
    )
      return false
    return true
  })
  if (specs?.length === 0) {
    return null
  }
  return (
    <ul className={classes.specs}>
      {specs?.map((aggregation) => (
        <li key={aggregation?.attribute_code}>
          <div>{aggregation?.label}</div>
          <div className={classes.options}>
            {aggregation?.options?.map((option) => (
              <span key={option?.label}>{option?.label === '1' ? 'Yes' : option?.label}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}
