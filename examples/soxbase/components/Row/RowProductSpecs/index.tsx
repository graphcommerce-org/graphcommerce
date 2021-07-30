import { makeStyles, Theme } from '@material-ui/core'
import { ProductSpecs, ProductSpecsProps } from '@reachdigital/magento-product'
import { Row, SectionContainer } from '@reachdigital/next-ui'
import React from 'react'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

type RowProductSpecsProps = RowProductSpecsFragment & ProductSpecsProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
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
    <Row className={classes.root}>
      <SectionContainer
        labelLeft='Product specifications'
        classes={{ sectionHeader: classes.sectionHeader }}
      >
        <ProductSpecs aggregations={aggregations} />
      </SectionContainer>
    </Row>
  )
}
