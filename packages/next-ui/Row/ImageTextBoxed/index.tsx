import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      border: `1px solid ${theme.palette.divider}`,
      justifyItems: 'center',
      columnGap: `${theme.spacings.lg}`,
      padding: 0,
      [theme.breakpoints.up('md')]: {
        background: 'none',
        gridTemplateColumns: '1fr auto',
        columnGap: `${theme.spacings.lg}`,
      },
      borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
      overflow: 'hidden',
    },
    asset: {
      height: '100%',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '100%',
        width: responsiveVal(100, 600),
      },
      '& img': {
        height: '100% !important',
        width: '100% !important',
        objectFit: `cover`,
      },
    },
    copy: {
      padding: `${theme.spacings.lg} 0`,
      color: theme.palette.text.primary,
      maxWidth: '80%',
      display: 'grid',
      alignContent: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
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
  { name: 'ImageTextBoxed' },
)

export type ImageTextBoxedProps = UseStyles<typeof useStyles> & {
  children: React.ReactNode
  item?: React.ReactNode
}

export default function ImageTextBoxed(props: ImageTextBoxedProps) {
  const { children, item } = props
  const classes = useStyles(props)

  return (
    <Row>
      <div className={classes.wrapper}>
        <div className={classes.copy}>{children}</div>
        <div className={classes.asset}>{item}</div>
      </div>
    </Row>
  )
}
