import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { ProductSpecs, ProductSpecsProps } from '@reachdigital/magento-product'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: `${theme.spacings.xl}`,
    ...theme.typography.body1,
  },
  labelContainer: {
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
      <SectionHeader
        labelLeft='Product specifications'
        classes={{ labelContainer: classes.labelContainer }}
      />

      <div className={classes.specs}>
        <ProductSpecs aggregations={aggregations} />
      </div>
    </Container>
  )
}
