import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import svgLaptopBg from './laptop-frame.svg'
import laptopShadow from './laptop-shadow.png'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: `${theme.spacings.xl}`,
  },
  laptopContainer: {
    marginTop: `-50%`,
    position: `relative`,
    '& img': {
      maxWidth: '100%',
    },
  },
  laptopShadow: {
    left: `-5.5%`,
    width: `112.2%`,
    height: `auto`,
    opacity: `0.17`,
    position: `absolute`,
    maxWidth: `none !important`,
    marginTop: `-6.76%`,
  },
  laptopContent: {
    height: `84%`,
    width: `79.5%`,
    position: 'absolute',
    top: `5%`,
    left: `10.3%`,
    display: `flex`,
    alignItems: `center`,
    '& video': {
      width: `100%`,
      height: `auto`,
    },
  },
  bgImg: {
    width: '100%',
    textAlign: 'center',
    '& img, & picture': {
      maxWidth: `100%`,
      height: `auto`,
    },
  },
}))

const RowLaptop: React.FC<GQLRowLaptopFragment> = (props) => {
  const classes = useStyles()
  const { laptopContent, backgroundImage } = props

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.bgImg}>
          {backgroundImage && <Asset asset={backgroundImage} width='1440' />}
        </div>
        <div className={classes.laptopContainer}>
          <img className={classes.laptopShadow} src={laptopShadow} alt='' />
          <img src={svgLaptopBg} alt='' />
          <div className={classes.laptopContent}>
            <Asset asset={laptopContent} width={1160} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RowLaptop
