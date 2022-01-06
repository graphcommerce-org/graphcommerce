import {
  ColumnTwoWithTop,
  ColumnTwoWithTopProps,
  makeStyles,
  useMergedClasses,
  UseStyles,
  typography,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import React from 'react'
import { ProductPageDescriptionFragment } from './ProductPageDescription.gql'

const useStyles = makeStyles({ name: 'ProductPageDescription' })((theme) => ({
  /* nested styles because we don't know beforehand which elements the description contains */
  description: {
    '& p:first-of-type': {
      marginTop: 0,
    },
    '& p, & li': {
      ...typography(theme, 'body1'),
      fontWeight: 400,

      [theme.breakpoints.up('md')]: {
        ...typography(theme, 'h3'),
        fontWeight: 400,
        '@supports (font-variation-settings: normal)': {
          fontVariationSettings: "'wght' 420",
        },
      },
    },
    '& ul': {
      padding: 0,
      margin: 0,
      display: 'inline',
      listStyleType: 'none',
    },
    '& li': {
      display: 'inline',
    },
  },
}))

export type ProductPageDescriptionProps = ProductPageDescriptionFragment &
  Omit<ColumnTwoWithTopProps, 'top' | 'left'> &
  UseStyles<typeof useStyles>

export default function ProductPageDescription(props: ProductPageDescriptionProps) {
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const { description, name, right } = props

  return (
    <ColumnTwoWithTop
      top={
        <Typography variant='h1' component='h2'>
          {name}
        </Typography>
      }
      left={
        description && (
          <div
            className={classes.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: description.html }}
          />
        )
      }
      right={right}
    />
  )
}
