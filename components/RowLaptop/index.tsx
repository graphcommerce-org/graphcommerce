import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import svgLaptopBg from './laptop-frame.svg'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: `${theme.spacings.xl} 0 ${theme.spacings.lg}`,
  },
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
    '& img': {
      maxWidth: `100%`,
      height: `auto`,
    },
  },
}))

const RowLaptop: React.FC<GQLRowLaptopFragment> = (props) => {
  const classes = useStyles()
  const { laptopcontent, backgroundimage } = props
  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.bgImg}>
          {backgroundimage && <Asset asset={backgroundimage} width='1440' />}
        </div>
        <div className={classes.iPadContainer}>
          <img src={svgLaptopBg} alt='' />
          <div className={classes.iPadContent}>
            {console.log(laptopcontent)}
            {laptopcontent ? <Asset asset={laptopcontent} /> : ''}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default RowLaptop
