import { ProductSpecs, ProductSpecsProps } from '@graphcommerce/magento-product'
import { Row, SectionContainer } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { RowProductSpecsFragment } from './RowProductSpecs.gql'

type RowProductSpecsProps = RowProductSpecsFragment & ProductSpecsProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      ...theme.typography.body1,
    },
    sectionHeaderWrapper: {
      marginBottom: theme.spacings.md,
    },
  }),
  { name: 'RowProductSpecs' },
)

export default function RowProductSpecs(props: RowProductSpecsProps) {
  const { aggregations } = props
  const classes = useStyles()

  if (!aggregations) return null

  return (
    <Row className={classes.root}>
      <SectionContainer
        labelLeft='Product specifications'
        classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
      >
        <ProductSpecs aggregations={aggregations} />
      </SectionContainer>
    </Row>
  )
}
