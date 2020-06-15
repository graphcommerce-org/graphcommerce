import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import RichText from 'components/RichText'
import AspectRatioContainer from 'components/AspectRatioContainer'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: `grid`,
    gridColumnGap: theme.gridSpacing.column,
    gridRowGap: theme.gridSpacing.row,
    gridTemplateAreas: `
    'left right'
    `,
    gridTemplateColumns: `33.33333% 1fr`,
    marginBottom: `${theme.spacings.xl}`,

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `40% 1fr`,
    },

    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `
      'right'
      'left'`,
    },
  },
  left: {
    gridArea: `left`,
  },
  right: {
    gridArea: `right`,
    position: `relative`,
  },
  iphoneContainer: {
    width: `46.255%`,
    position: `absolute`,
    right: `6%`,
    top: `4.5%`,
  },
  videoContainer: {
    top: `14%`,
    left: `13.33%`,
    width: `80.8%`,
    position: `absolute`,
  },
}))

const RowIphoneWithText: React.FC<GQLRowIphoneWithTextFragment> = (props) => {
  const classes = useStyles()
  const {
    backgroundImageWithPhone,
    iPhoneVideo,
    themeImage,
    colOne,
    colTwoOptional,
    colThreeOptional,
  } = props

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.left}>
          <RichText {...colOne} />
          {colTwoOptional ? <RichText {...colTwoOptional} /> : ''}
          {colThreeOptional ? <RichText {...colThreeOptional} /> : ''}
        </div>
        <div className={classes.right}>
          {/* @Q: hoe zorg ik nu dat width/height attrs worden van AspectRatioContainer in TS? */}
          {themeImage ? (
            <AspectRatioContainer width={908} height={1136}>
              <Asset asset={themeImage} width={908} />
            </AspectRatioContainer>
          ) : (
            ''
          )}

          <div className={classes.iphoneContainer}>
            <AspectRatioContainer width={475} height={898}>
              <Asset asset={backgroundImageWithPhone} width={475} />
            </AspectRatioContainer>
            {iPhoneVideo ? (
              <div className={classes.videoContainer}>
                <AspectRatioContainer width={480} height={916}>
                  <Asset asset={iPhoneVideo} width={340} />
                </AspectRatioContainer>
              </div>
            ) : (
              ''
            )}
          </div>

          {/* <div className={classes.phone}>
            <div className={classes.phoneOuter}>
              <Asset asset={backgroundImageWithPhone} width={420} />
            </div>
            {/* {iPhoneVideo ? (
              <div className={classes.phoneVideo}>
                <Asset asset={iPhoneVideo} width={340} />
              </div>
            ) : (
              ''
            )} */}
          {/* </div> */}
        </div>
      </div>
    </Container>
  )
}

export default RowIphoneWithText
