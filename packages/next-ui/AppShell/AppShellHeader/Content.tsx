import { Box, capitalize, Divider, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../..'

type StyleProps = {
  floatingMd: boolean
  floatingSm: boolean
}

type Classes = 'content' | 'left' | 'center' | 'right' | 'divider'
type Floating = 'floatingMd' | 'floatingSm'
type Matrix<T extends string, M extends string> = `${T}${Capitalize<M>}`
type all = Matrix<Classes, Floating>

const useStyles = makeStyles(
  (theme: Theme) => ({
    content: {
      position: 'absolute',
      left: 0,
      width: '100%',
      display: 'grid',
      gridTemplateAreas: `"left center right"`,
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      padding: `${theme.page.vertical} 0`,

      marginTop: `calc(${theme.page.vertical} * -1)`,

      background: theme.palette.background.default,

      [theme.breakpoints.up('md')]: {
        padding: `${theme.page.vertical} ${theme.page.horizontal}`,
      },
    },
    contentFloatingMd: {
      [theme.breakpoints.up('md')]: {
        background: 'none',
        pointerEvents: 'none',
        '& > div *': { pointerEvents: 'all' },
      },
    },
    contentFloatingSm: {
      [theme.breakpoints.down('sm')]: {
        background: 'none',
        pointerEvents: 'none',
        '& > div *': { pointerEvents: 'all' },
      },
    },
    left: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'left',
      justifyContent: 'start',
    },
    center: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'center',
      justifyContent: 'start',
      overflow: 'hidden',
    },
    centerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    right: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.sm,
      gridArea: 'right',
      justifyContent: 'end',
    },
    divider: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    dividerFloatingSm: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    dividerFloatingMd: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
  { name: 'Content' },
)

export type ContentProps = {
  children?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  divider?: React.ReactNode
} & StyleProps &
  UseStyles<typeof useStyles>

export default function Content(props: ContentProps) {
  const { left, children, right, divider, floatingMd, floatingSm: floatingSm } = props
  const classes = useStyles({ floatingMd, floatingSm: floatingSm })

  const className = (className: Classes) =>
    clsx(classes[className], {
      [classes?.[`${className}${capitalize('floatingMd')}`]]: floatingMd,
      [classes?.[`${className}${capitalize('floatingSm')}`]]: floatingSm,
    })

  return (
    <div className={className('content')}>
      <div className={className('left')}>{left}</div>
      <div className={className('center')}>{children}</div>
      <div className={className('right')}>{right}</div>
      <div className={className('divider')}>{divider ?? <Divider />}</div>
    </div>
  )
}
