import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Theme } from '@material-ui/core'
import Asset from '../Asset'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    margin: `${theme.spacings.xl} 0 ${theme.spacings.xl}`,
    '& img, & video': {
      maxWidth: '100%',
      height: 'auto',
    },
  },
}))

const RowImageOrVideo: React.FC<GQLRowImageOrVideoFragment> = (props) => {
  const classes = useStyles()
  const { asset } = props

  return (
    <Container>
      <div className={classes.root}>
        <Asset asset={asset} width={1500} />
      </div>
    </Container>
  )
}

export default RowImageOrVideo
