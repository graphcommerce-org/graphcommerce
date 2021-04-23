import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { Maybe } from 'graphql/jsutils/Maybe'
import React, { PropsWithChildren } from 'react'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    gap: `${theme.spacings.lg} 0`,
    gridTemplateAreas: `"title"
    "description"
    "usps"`,
    marginBottom: theme.spacings.xl,
    [theme.breakpoints.up('md')]: {
      gridTemplateAreas: `"title ."
      "description usps"`,
      gridTemplateColumns: '1fr auto',
      gap: `${theme.spacings.sm} ${theme.spacings.xl}`,
    },
  },
  name: {
    ...theme.typography.h1,
  },
  description: {
    gridArea: 'description',
    '& p:first-of-type': {
      marginTop: 0,
    },
    '& p, & li': {
      ...theme.typography.h4,
      fontWeight: 400,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h3,
        fontWeight: 400,
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

type ProductDescriptionProps = PropsWithChildren<
  UseStyles<typeof useStyles> & {
    name?: Maybe<string>
    description: React.ReactNode
  }
>

export default function ProductDescription(props: ProductDescriptionProps) {
  const { children, name, description } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root}>
      <Typography variant='h2' className={classes.name}>
        {name}
      </Typography>
      <div className={classes.description}>{description}</div>
      {children}
    </Container>
  )
}
