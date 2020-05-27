import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import AspectRatioContainer from 'components/AspectRatioContainer'
import ScrollSnapSlider from 'components/ScrollSnapSlider'
import Asset from '../Asset'
import phoneContainer from './phone-container.svg'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: `${theme.spacings.xl} 0`,
  },
  bgImgContainer: {
    position: `relative`,
    [theme.breakpoints.down('xs')]: {
      display: `none`,
    },
  },
  bgImg: {
    position: `absolute`,
    width: `100%`,
    top: `0`,
    '& img': {
      maxWidth: `100%`,
      height: 'auto',
    },
  },
  phonesContainer: {
    display: `flex`,
    justifyContent: 'space-between',
    marginTop: `-48%`,
    [theme.breakpoints.down('xs')]: {
      display: `none`,
    },
  },
  phoneContainer: {
    width: `calc(100% / 3)`,
    position: `relative`,
    [theme.breakpoints.down('xs')]: {
      display: `none`,
    },
  },
  phone: {
    width: `100%`,
    position: `absolute`,
    top: `0`,
    height: `auto`,
  },
  phoneContent: {
    paddingTop: `23%`,
    paddingBottom: `30%`,
    width: `70%`,
    position: `relative`,
    left: `50%`,
    transform: `translateX(-50%)`,
  },
  slideContainer: {
    display: `none`,
    [theme.breakpoints.down('xs')]: {
      display: `block`,
    },
  },
  slidePhoneContainer: {
    width: '102.5%',
    margin: `0 -10%`,
    flexShrink: 0,
    position: `relative`,
  },
}))

const RowPhonesSlider: React.FC<GQLRowPhonesSliderFragment> = (props) => {
  const classes = useStyles()
  const { backgroundImage, phoneOneContent, phoneTwoContent, phoneThreeContent } = props

  return (
    <Container>
      <div className={classes.root}>
        {backgroundImage ? (
          <div className={classes.bgImgContainer}>
            <AspectRatioContainer height={backgroundImage.height} width={backgroundImage.width}>
              <div className={classes.bgImg}>
                <Asset asset={backgroundImage} width={backgroundImage.width} />
              </div>
            </AspectRatioContainer>
          </div>
        ) : (
          ''
        )}
        <div className={classes.phonesContainer}>
          {[phoneOneContent, phoneTwoContent, phoneThreeContent].map((item, index) => {
            return (
              <div key={index} className={classes.phoneContainer}>
                <img className={classes.phone} src={phoneContainer} alt='Phone background' />
                <div className={classes.phoneContent}>
                  <AspectRatioContainer width={340} height={602}>
                    <Asset asset={item} width={item.width} />
                  </AspectRatioContainer>
                </div>
              </div>
            )
          })}
        </div>

        <div className={classes.slideContainer}>
          <ScrollSnapSlider>
            {[phoneOneContent, phoneTwoContent, phoneThreeContent].map((item, index) => {
              return (
                <div key={index} className={classes.slidePhoneContainer}>
                  <img className={classes.phone} src={phoneContainer} alt='Phone background' />
                  <div className={classes.phoneContent}>
                    <AspectRatioContainer width={340} height={602}>
                      <Asset asset={item} width={item.width} />
                    </AspectRatioContainer>
                  </div>
                </div>
              )
            })}
          </ScrollSnapSlider>
        </div>
      </div>
    </Container>
  )
}

export default RowPhonesSlider
