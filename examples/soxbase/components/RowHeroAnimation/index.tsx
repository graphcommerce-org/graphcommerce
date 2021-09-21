import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'
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
      padding: `${responsiveVal(20, 100)} 0 ${responsiveVal(60, 300)} 0`,
      margin: '0 auto',
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
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
      fontWeight: 700,
      fontSize: responsiveVal(20, 130),
      lineHeight: responsiveVal(40, 140),
    },
    body: {
      fontWeight: 600,
      marginBottom: responsiveVal(10, 50),
    },
    main: {
      float: 'right',
      width: '80%',
      [theme.breakpoints.up('md')]: {
        width: 700,
      },
    },
    buttonGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: responsiveVal(20, 40),
      '& > *': {
        minWidth: 'max-content',
      },
    },
    styledButton: {
      borderRadius: 14,
      background: 'linear-gradient(45deg, #85FFFC 0%, #85FFFC 10%, #CEFF99 100%)',
      fontSize: responsiveVal(15, 21),
      fontWeight: 600,
      border: '1px solid #001727',
      padding: `${responsiveVal(2, 6)} ${responsiveVal(20, 35)}`,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '-4px',
        background:
          'linear-gradient(45deg, #55A3A1 30%, #CEFF99 36%, #55A3A1 42%, #55A3A1 80%, #CEFF99 86%, #55A3A1 92% )',
        backgroundSize: '400%',
        width: 'calc(100% + 8px)',
        height: 'calc(100% + 8px)',
        zIndex: '-1',
        borderRadius: '16px',
        animation: `$glow 25s linear infinite`,
      },
    },
    '@keyframes glow': {
      '0%': {
        backgroundPosition: '0 0',
      },
      '100%': {
        backgroundPosition: '-400% 0%',
      },
    },
    copyButton: {
      borderRadius: 15,
      fontSize: responsiveVal(14, 17),
      padding: `${responsiveVal(2, 12)} ${responsiveVal(20, 38)}`,
      fontFamily: 'Menlo,ui-monospace,SFMono-Regular,monospace',
      borderColor: 'rgba(255,255,255,0.4)',
      background: 'rgba(255,255,255,0.1)',
    },
  }),
  { name: 'RowHeroAnimation' },
)

export default function RowHeroAnimation() {
  const classes = useStyles()

  return (
    <Container maxWidth={false} disableGutters>
      <div className={classes.hero}>
        <Animation />
        <div className={classes.copy}>
          <Container>
            <Typography variant='h3'>Graphcommerce®</Typography>
            <Typography variant='h2' className={classes.title}>
              Where the future of e-commerce is headless.
            </Typography>
            <div className={classes.main}>
              <Typography variant='h3' className={classes.body}>
                GraphCommerce® is an open source, headless e-commerce storefront build with GraphQL,
                React, Typescript and Next.js.
              </Typography>
              <div className={classes.buttonGroup}>
                <Button href='/' variant='contained' size='large' className={classes.styledButton}>
                  View live demo
                </Button>
                <Button
                  href='/'
                  variant='outlined'
                  size='large'
                  color='inherit'
                  className={classes.copyButton}
                >
                  $ npm install graphcommerce
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </Container>
  )
}
