import { Container, makeStyles, Theme } from '@material-ui/core'
import { ProductSpecs, ProductSpecsProps } from '@reachdigital/magento-product'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import React from 'react'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

type RowProductSpecsProps = RowProductSpecsFragment & ProductSpecsProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginBottom: `${theme.spacings.xl}`,
      ...theme.typography.body1,
    },
    sectionHeader: {
      marginBottom: theme.spacings.md,
    },
  }),
  {
    name: 'RowProductSpecs',
  },
)

export default function RowProductSpecs(props: RowProductSpecsProps) {
  const { aggregations } = props
  const classes = useStyles()

  if (!aggregations) {
    return null
  }

  return (
    <Container className={classes.root}>
      <SectionContainer label='Product specifications' classes={classes}>
        <ProductSpecs aggregations={aggregations} />
      </SectionContainer>
    </Container>
  )
}
