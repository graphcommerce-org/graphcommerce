import { ProductSpecs, ProductSpecsProps } from '@graphcommerce/magento-product'
import { Row, SectionContainer } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'

type SpecsProps = RowProductFragment & ProductSpecsProps

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      ...theme.typography.body1,
    },
    sectionHeaderWrapper: {
      marginBottom: theme.spacings.md,
    },
  }),
  { name: 'Specs' },
)

export default function Specs(props: SpecsProps) {
  const { title, aggregations } = props
  const classes = useStyles()

  if (!aggregations) return null

  return (
    <Row className={classes.root}>
      <SectionContainer
        labelLeft={title}
        classes={{ sectionHeaderWrapper: classes.sectionHeaderWrapper }}
      >
        <ProductSpecs aggregations={aggregations} />
      </SectionContainer>
    </Row>
  )
}
