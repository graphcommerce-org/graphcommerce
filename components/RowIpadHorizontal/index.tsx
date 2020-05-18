import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container } from '@material-ui/core'
import svgIpadBg from './horizontal-tablet-frame.svg'
import Asset from '../Asset'

const useStyles = makeStyles({
  iPadContainer: {
    marginTop: `-45%`,
    position: `relative`,
    '& img': {
      maxWidth: '100%',
    },
  },
  iPadContent: {
    height: `85.3%`,
    width: `72.5%`,
    position: 'absolute',
    top: `7%`,
    left: `13.5%`,
    display: `flex`,
    '& video': {
      width: `100%`,
      height: `auto`,
    },
  },
  bgImg: {
    width: '100%',
    textAlign: 'center',
  },
})

const RowIpadHorizontal: React.FC<GQLRowIpadHorizontalFragment> = (props) => {
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
            <Asset asset={iPadContent} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RowIpadHorizontal
