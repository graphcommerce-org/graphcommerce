import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ProductSpecsFragment } from './ProductSpecs.gql'

const useStyles = makeStyles((theme: Theme) => ({
  specs: {
    display: 'grid',
    justifyContent: 'start',
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

export type ProductSpecsProps = ProductSpecsFragment & UseStyles<typeof useStyles>

export default function ProductSpecs(props: ProductSpecsProps) {
  const { aggregations } = props
  const classes = useStyles(props)
  const filter = ['price', 'category_id', 'size', 'new', 'sale', 'color']
  const specs = aggregations?.filter(
    (attr) => !filter.includes(attr?.attribute_code ?? '') && attr?.options?.[0]?.value !== '0',
  )

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
