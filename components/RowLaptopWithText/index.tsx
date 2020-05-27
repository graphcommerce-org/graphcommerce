import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import RichText from 'components/RichText'
import svgLaptopBg from './laptop-frame.svg'
import laptopShadow from './laptop-shadow.png'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: `${theme.spacings.xl} 0 0`,
    display: `grid`,
    gridTemplateAreas: `
      'backgroundimage text'
      'laptop laptop'
    `,
    gridTemplateColumns: '60% 1fr',
    '@media(max-width: 1100px)': {
      gridTemplateColumns: '50% 1fr',
    },
    '@media(max-width: 768px)': {
      gridTemplateAreas: `
      'backgroundimage laptop'
      'text text'
      `,
      gridTemplateColumns: `1fr 1fr`,
      alignItems: 'end',
    },
    gridColumnGap: `${theme.gridSpacing.column}`,
    gridRowGap: `${theme.gridSpacing.row}`,
    paddingBottom: `${theme.spacings.xl}`,
  },
  laptopOuter: {
    gridArea: 'laptop',
    marginLeft: '10%',
    transform: `translateX(8%)`,
    marginTop: '-45%',
    '@media(max-width: 1100px)': {
      marginTop: '-15%',
    },
    '@media(max-width: 768px)': {
      marginTop: '0%',
    },
  },
  laptopContainer: {
    position: `relative`,
    '& img': {
      maxWidth: '100%',
      objectFit: 'contain',
    },
    '@media(max-width: 768px)': {
      marginLeft: '-100%',
    },
  },
  backgroundImage: {
    gridArea: 'backgroundimage',
  },
  textContainer: {
    gridArea: 'text',
    padding: `0 ${theme.spacings.md}`,
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

const RowLaptopWithText: React.FC<GQLRowLaptopWithTextFragment> = (props) => {
  const classes = useStyles()
  const { laptopContent, backgroundImage, colOne } = props

  if (typeof window !== 'undefined') {
    document.body.style.overflowX = 'hidden'
  }

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.backgroundImage}>
          <div className={classes.bgImg}>
            {backgroundImage && <Asset asset={backgroundImage} width='1440' />}
          </div>
        </div>
        <div className={classes.textContainer}>
          <RichText {...colOne} />
        </div>
        <div className={classes.laptopOuter}>
          <div className={classes.laptopContainer}>
            <img className={classes.laptopShadow} src={laptopShadow} alt='' />
            <img src={svgLaptopBg} alt='' />
            <div className={classes.laptopContent}>
              <Asset asset={laptopContent} width={1160} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RowLaptopWithText
