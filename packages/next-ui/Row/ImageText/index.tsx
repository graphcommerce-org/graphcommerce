import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, typography, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ImageText' })((theme) => ({
  wrapper: {
    display: 'grid',
    background:
      theme.palette.mode === 'light'
        ? theme.palette.background.image
        : theme.palette.background.paper,
    justifyItems: 'center',
    columnGap: theme.spacings.lg,
    paddingTop: theme.spacings.lg,
    paddingBottom: theme.spacings.lg,
    [theme.breakpoints.up('md')]: {
      paddingTop: 0,
      paddingBottom: 0,
      background: 'none',
      gridTemplateColumns: '1fr 1fr',
    },
    borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
  },
  asset: {
    height: '100%',
    width: '100%',
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
      borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
    ...typography(theme, 'body2'),
    [theme.breakpoints.up('md')]: {
      ...typography(theme, 'h4'),
    },
    color: theme.palette.text.primary,
  },
}))

export type ImageTextProps = UseStyles<typeof useStyles> & {
  item?: React.ReactNode
  children: React.ReactNode
}

export default function ImageText(props: ImageTextProps) {
  const { item, children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row maxWidth={false}>
      <Row className={classes.wrapper}>
        <div className={classes.asset}>{item}</div>
        <div className={classes.copy}>{children}</div>
      </Row>{' '}
    </Row>
  )
}
