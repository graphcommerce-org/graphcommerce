import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import Row from '../../Row'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    header: {
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,0.08)',
      overflow: 'hidden',
      maxWidth: 800,
      margin: `0 auto ${theme.spacings.lg} auto`,
    },
    copy: {
      color: '#fff',
      display: 'grid',
      justifyItems: 'end',
      alignContent: 'end',
      padding: `${theme.spacings.lg} ${theme.spacings.md}`,
      minHeight: '30vh',
      '& > *': {
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
      },
    },
    asset: {
      position: 'absolute',
      top: '0',
      zIndex: -1,
      width: '100%',
      height: '100%',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
      [theme.breakpoints.up('md')]: {
        height: '100%',
      },
    },
  }),
  { name: 'BlogHeader' },
)

type BlogHeaderProps = UseStyles<typeof useStyles> & {
  asset?: React.ReactNode
}

export default function BlogHeader(props: BlogHeaderProps) {
  const { asset } = props
  const classes = useStyles()

  return (
    <Row>
      <div className={classes.header}>
        <Typography variant='body1' className={classes.copy} />
        {asset && <div className={classes.asset}>{asset}</div>}
      </div>
    </Row>
  )
}
