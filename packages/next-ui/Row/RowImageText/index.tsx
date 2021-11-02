import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      background:
        theme.palette.type === 'light'
          ? theme.palette.background.image
          : theme.palette.background.paper,
      justifyItems: 'center',
      columnGap: theme.spacings.lg,
      padding: `${theme.spacings.xl} 0`,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        background: 'none',
        gridTemplateColumns: '1fr 1fr',
      },
    },
    asset: {
      height: '100%',
      width: '100%',
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    copy: {
      marginTop: theme.spacings.lg,
      color: theme.palette.text.primary,
      maxWidth: '80%',
      display: 'grid',
      alignContent: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
        marginTop: 0,
      },
      '& > *': {
        maxWidth: 'max-content',
      },
    },
    url: {
      ...theme.typography.body2,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h4,
      },
      color: theme.palette.text.primary,
    },
  }),
  { name: 'RowImageText' },
)

export type RowImageTextProps = UseStyles<typeof useStyles> & {
  item?: React.ReactNode
  children: React.ReactNode
}

export default function RowImageText(props: RowImageTextProps) {
  const { item, children } = props
  const classes = useStyles(props)

  return (
    <Row className={classes.wrapper}>
      <div className={classes.asset}>{item}</div>
      <div className={classes.copy}>{children}</div>
    </Row>
  )
}
