import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import svgIpadBg from './vertical-tablet-frame.svg'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: `${theme.spacings.xxl} 0 ${theme.spacings.lg}`,
  },
  iPadContainer: {
    width: `70%`,
    marginTop: `-78%`,
    position: `relative`,
    '& img, & picture': {
      width: '100%',
    },
  },
  iPadContent: {
    top: `9.5%`,
    left: `13.5%`,
    width: `72.5%`,
    height: `77%`,
    display: `flex`,
    alignItems: `center`,
    position: `absolute`,
    '& video': {
      width: `100%`,
      height: `auto`,
    },
  },
  bgImg: {
    width: '100%',
    textAlign: 'center',
    '& img': {
      maxWidth: `100%`,
      height: `auto`,
    },
  },
}))

const RowIpadVertical: React.FC<GQLRowIpadVerticalFragment> = (props) => {
  const classes = useStyles()
  const { iPadContent, backgroundImage } = props
  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.bgImg}>
          {backgroundImage && <Asset asset={backgroundImage} width='1440' />}
        </div>
        <div className={classes.iPadContainer}>
          <img src={svgIpadBg} alt='' />
          <div className={classes.iPadContent}>
            <Asset asset={iPadContent} width={740} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RowIpadVertical
