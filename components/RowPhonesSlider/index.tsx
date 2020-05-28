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
    [theme.breakpoints.up('sm')]: {
      marginTop: `-48%`,
    },
  },
  phoneContainer: {
    width: `calc(100% / 3)`,
    position: `relative`,
    [theme.breakpoints.down('xs')]: {
      width: `85%`,
      flexShrink: 0,
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
  phoneOuter: {
    position: `relative`,
    margin: `0 -10%`,
  },
}))

const RowPhonesSlider: React.FC<GQLRowPhonesSliderFragment> = (props) => {
  const classes = useStyles()
  const { backgroundImage, phoneOneContent, phoneTwoContent, phoneThreeContent } = props

  const PhoneContainer = (item: GQLAssetFragment) => (
    <div className={classes.phoneContainer}>
      <div className={classes.phoneOuter}>
        <img className={classes.phone} src={phoneContainer} alt='Phone background' />
        <div className={classes.phoneContent}>
          <AspectRatioContainer width={340} height={602}>
            <Asset asset={item} width={300} />
          </AspectRatioContainer>
        </div>
      </div>
    </div>
  )

  return (
    <Container disableGutters>
      <div className={classes.root}>
        {backgroundImage && backgroundImage.height && backgroundImage.width && (
          <div className={classes.bgImgContainer}>
            <AspectRatioContainer height={backgroundImage.height} width={backgroundImage.width}>
              <div className={classes.bgImg}>
                <Asset asset={backgroundImage} width={300} />
              </div>
            </AspectRatioContainer>
          </div>
        )}
        <div className={classes.phonesContainer}>
          <ScrollSnapSlider>
            <PhoneContainer {...phoneOneContent} />
            <PhoneContainer {...phoneTwoContent} />
            <PhoneContainer {...phoneThreeContent} />
          </ScrollSnapSlider>
        </div>
      </div>
    </Container>
  )
}

export default RowPhonesSlider
