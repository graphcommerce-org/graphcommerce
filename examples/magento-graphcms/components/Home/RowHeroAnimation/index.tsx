import { responsiveVal } from '@graphcommerce/next-ui'
import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core'
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
      display: 'grid',
      gridTemplateRows: 'auto auto',
      justifyItems: 'stretch',
      '& > *': {
        zIndex: 1,
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
      '& > span': {
        display: 'block',
        ...theme.typography.h3,
        fontSize: responsiveVal(16, 33),
        marginBottom: '0.8em',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: responsiveVal(16, 29),
      lineHeight: 1.7,
      marginBottom: responsiveVal(30, 50),
    },
    main: {
      float: 'right',
      width: '80%',
      [theme.breakpoints.up('md')]: {
        width: 650,
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
      borderRadius: responsiveVal(4, 14),
      background: 'linear-gradient(45deg, #85FFFC 0%, #85FFFC 10%, #CEFF99 100%)',
      fontSize: responsiveVal(15, 20),
      lineHeight: 1.4,
      fontWeight: 600,
      border: '1px solid #3D6161',
      padding: `${responsiveVal(6, 6)} ${responsiveVal(20, 35)}`,
      '&:before': {
        content: '""',
        position: 'absolute',
        left: '-4px',
        top: '-4px',
        background: 'linear-gradient(35deg, #55A3A1 60%, #CEFF99 86%, #55A3A1 92% )',
        backgroundSize: '400%',
        width: 'calc(100% + 8px)',
        height: 'calc(100% + 8px)',
        zIndex: '-1',
        borderRadius: responsiveVal(6, 16),
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
      borderRadius: responsiveVal(5, 15),
      fontSize: responsiveVal(14, 17),
      padding: `${responsiveVal(2, 8)} ${responsiveVal(20, 38)}`,
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
            <Typography variant='h1' className={classes.title}>
              <span>Graphcommerce®</span>
              The future of e-commerce is headless.
            </Typography>
            <div className={classes.main}>
              <Typography paragraph variant='h3' className={classes.h3}>
                GraphCommerce® is an open source, headless e-commerce storefront build with GraphQL,
                React, Typescript and Next.js.
              </Typography>
              <div className={classes.buttonGroup}>
                <Button
                  href='https://graphcommerce.vercel.app/'
                  variant='contained'
                  size='large'
                  color='primary'
                  className={classes.styledButton}
                >
                  View live demo
                </Button>
                <Button href='/' variant='outlined' size='large' className={classes.copyButton}>
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
