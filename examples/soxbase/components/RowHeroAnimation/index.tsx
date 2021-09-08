import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { responsiveVal } from '@reachdigital/next-ui'
import React from 'react'
import Animation from './Animation'

const useStyles = makeStyles(
  (theme: Theme) => ({
    hero: {
      background: '#001727',
      position: 'relative',
    },
    copy: {
      padding: `${responsiveVal(20, 40)} 0 ${responsiveVal(60, 300)} 0`,
      color: '#fff',
      display: 'grid',
      gridTemplateRows: 'auto auto',
      justifyItems: 'stretch',
      '& > *': {
        zIndex: 1,
      },
      '& > * > *': {
        padding: `${responsiveVal(10, 20)} 0`,
      },
    },
    title: {
      width: '80%',
      fontSize: responsiveVal(30, 140),
      lineHeight: responsiveVal(40, 160),
    },
    body: {
      paddingLeft: '20%',
      [theme.breakpoints.up('md')]: {
        paddingLeft: '50%',
      },
    },
  }),
  { name: 'RowHeroAnimation' },
)

export default function RowHeroAnimation() {
  const classes = useStyles()

  return (
    <Container maxWidth={false}>
      <div className={classes.hero}>
        <Animation />
        <div className={classes.copy}>
          <Container>
            <Typography variant='h3'>Graphcommerce®</Typography>
            <Typography variant='h2' className={classes.title}>
              Where the future of e-commerce is headless.
            </Typography>
            <Typography variant='h3' className={classes.body}>
              GraphCommerce® is an open source, headless e-commerce storefront build with GraphQL,
              React, Typescript and Next.js.
            </Typography>
          </Container>
        </div>
      </div>
    </Container>
  )
}
