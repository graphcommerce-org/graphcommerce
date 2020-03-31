import React, { ReactNode } from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { ClassNameMap, ClassKeyOfStyles } from '@material-ui/styles/withStyles'

export type ContainerProps = {
  left?: ReactNode
  right?: ReactNode
  size?: 'md' | 'lg' | 'xl'
  stretch?: 'left' | 'right' | 'both'
  // stretchSize?: 'xlarge'
  leftWidth?: number
  wrapperHeight?: number
  equalHeight?: true
}

// const useStyles = makeStyles<Theme, ContainerProps>(theme => ({
const useStyles = makeStyles((theme: Theme) => ({
  container: ({ leftWidth = 0.61, stretch, size = 'lg' }: ContainerProps) => {
    // TODO make value responsive..
    const containerPadding = 20

    return {
      width: '100%',
      display: 'grid',
      gridTemplateAreas: `
          'marginleft left left marginright'
          'marginleft right right marginright'
          'marginleft spread spread marginright'`,
      gridTemplateColumns: `
        ${containerPadding}px
        minmax(0, ${leftWidth}fr)
        minmax(0, ${1 - leftWidth}fr)
        ${containerPadding}px`,

      [theme.breakpoints.up('sm')]: {
        gridTemplateAreas: `
          'marginleft left right marginright'
          'marginleft spread spread marginright'`,
        ...(stretch === 'left' && {
          gridTemplateAreas: `
          'left left right marginright'
          'spread spread spread marginright'`,
        }),
        ...(stretch === 'right' && {
          gridTemplateAreas: `
          'marginleft left right right'
          'marginleft spread spread spread'`,
        }),
        ...(stretch === 'both' && {
          gridTemplateAreas: `
          'left left right right'
          'spread spread spread spread'`,
        }),
      },
      [theme.breakpoints.up(size)]: {
        gridTemplateColumns: `
          minmax(${containerPadding}px, 1fr)
          ${leftWidth * (theme.breakpoints.values[size] - containerPadding * 2)}px
          ${(1 - leftWidth) * (theme.breakpoints.values[size] - containerPadding * 2)}px
          minmax(${containerPadding}px, 1fr);`,
      },
    }
  },
  left: ({ stretch, wrapperHeight, equalHeight }: ContainerProps) => ({
    gridArea: 'left',
    ...(wrapperHeight && { height: `${wrapperHeight}px` }),
    ...(equalHeight && { height: '100%' }),
    // ...(stretch === 'left' &&
    //   stretchSize === 'xlarge' && {
    //     paddingLeft: `calc(100vw - ${theme.breakpoints.values.xl}) / 2)`,
    //   }),
  }),
  right: ({ stretch, wrapperHeight, equalHeight }: ContainerProps) => ({
    gridArea: 'right',
    ...(wrapperHeight && { height: `${wrapperHeight}px` }),
    ...(equalHeight && { height: '100%' }),
    // ...(stretch === 'right' &&
    //   stretchSize === 'xlarge' && {
    //     paddingRight: `calc(100vw - ${theme.breakpoints.values.xl}) / 2)`,
    //   }),
  }),
  spread: ({ stretch }: ContainerProps) => ({
    gridArea: 'spread',
    // ...(stretch === 'left' &&
    //   stretchSize === 'xlarge' && {
    //     paddingLeft: `calc(100vw - ${theme.breakpoints.values.xl}) / 2)`,
    //     paddingRight: `calc(100vw - ${theme.breakpoints.values.xl}) / 2)`,
    //   }),
  }),
}))

export type ContainerStyles = keyof ReturnType<typeof useStyles>

type WithOptionalStyles = {
  classes?: ClassNameMap<ClassKeyOfStyles<Styles>>
}

const Container: React.FC<ContainerProps & WithOptionalStyles> = props => {
  const classes = useStyles(props)
  const { left, right, children } = props

  return (
    <div className={classes.container}>
      {left && <div className={classes.left}>{left}</div>}
      {right && <div className={classes.right}>{right}</div>}
      {children && <div className={classes.spread}>{children}</div>}
    </div>
  )
}

export default Container
