import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

const useStyles = makeStyles()(
  (theme: Theme) => ({
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
      ...theme.typography.body2,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h4,
      },
      color: theme.palette.text.primary,
    },
  }),
  { name: 'ImageText' },
)

export type ImageTextProps = UseStyles<typeof useStyles> & {
  item?: React.ReactNode
  children: React.ReactNode
}

export default function ImageText(props: ImageTextProps) {
  const { item, children } = props
  const { classes } = useStyles(props)

  return (
    <Row maxWidth={false}>
      <Row className={classes.wrapper}>
        <div className={classes.asset}>{item}</div>
        <div className={classes.copy}>{children}</div>
      </Row>{' '}
    </Row>
  )
}
