import { Container, Theme, Typography, makeStyles } from '@material-ui/core'
import ProductSpecs, { ProductSpecsProps } from '@reachdigital/magento-product/ProductSpecs'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: `${theme.spacings.xl}`,
    ...theme.typography.body1,
  },
  title: {
    ...theme.typography.caption,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacings.sm,
    paddingBottom: theme.spacings.sm,
  },
  specs: {
    display: 'grid',
    justifyContent: 'start',
  },
}))

type RowProductSpecsProps = RowProductSpecsFragment & ProductSpecsProps

export default function RowProductSpecs(props: RowProductSpecsProps) {
  const { aggregations } = props
  const classes = useStyles()

  if (!aggregations) {
    return null
  }

  return (
    <Container className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        Product specifications
      </Typography>
      <div className={classes.specs}>
        <ProductSpecs aggregations={aggregations} />
      </div>
    </Container>
  )
}
