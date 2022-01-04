import { UseStyles } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductShortDescriptionFragment } from './ProductShortDescription.gql'

const useStyles = makeStyles({ name: 'ProductShortDescription' })({
  root: {
    '& > p': {
      marginTop: 0,
    },
  },
})

type ProductShortDescriptionProps = ProductShortDescriptionFragment & UseStyles<typeof useStyles>

export default function ProductShortDescription(props: ProductShortDescriptionProps) {
  const { short_description } = props
  const { classes } = useStyles(props)

  return (
    <Typography
      variant='body1'
      component='div'
      classes={{ root: classes.root }}
      dangerouslySetInnerHTML={{ __html: short_description?.html ?? '' }}
    />
  )
}
