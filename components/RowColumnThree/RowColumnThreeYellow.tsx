import React from 'react'
import { Container, makeStyles, Theme } from '@material-ui/core'
import RowColumnThree from '.'
import { vpCalc } from '../Theme'
import backgroundSvg from './logo-reach-bg-solid.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: `relative`,
      background: theme.palette.secondary.main,
      marginTop: `calc(${theme.spacings.xl} * -1)`,
      marginBottom: theme.spacings.xl,
      boxShadow: theme.boxShadows.lg,
      overflow: 'hidden',
      '& h2': {
        fontSize: vpCalc(18, 25),
      },
    },
    textContainer: {
      position: 'relative',
    },
    svgBackground: {
      position: 'absolute',
      bottom: '-6%',
      left: 0,
      zIndex: -0,
      width: '112%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  }),
  { name: 'RowColumnThreeYellow' },
)

const rowColumThreeStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > div': {
      padding: `0 ${theme.spacings.sm}`,
    },
  },
}))

const RowColumnThreeYellow: React.FC<GQLRowColumnThreeFragment> = (props) => {
  const classes = useStyles()
  const rowColumnThreeClasses = rowColumThreeStyles()

  return (
    <Container maxWidth='lg'>
      <div className={classes.root}>
        <img className={classes.svgBackground} src={backgroundSvg} alt='Reach Logo' />
        <div className={classes.textContainer}>
          <RowColumnThree classes={rowColumnThreeClasses} {...props} />
        </div>
      </div>
    </Container>
  )
}

export default RowColumnThreeYellow
