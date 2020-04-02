import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { ClassNameMap, ClassKeyOfStyles } from '@material-ui/styles/withStyles'
import { vpCalc } from '../../layout/FullLayout'

export type ContainerProps = {
  before?: React.ReactNode
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
  size?: 'md' | 'lg' | 'xl'
  stretch?: 'left' | 'right' | 'both'
  spaceBetween?: true
  leftWidth?: number
}

// const useStyles = makeStyles<Theme, ContainerProps>(theme => ({
const useStyles = makeStyles(
  (theme: Theme) => ({
    root: ({ leftWidth = 0.618, stretch, size = 'lg', spaceBetween }: ContainerProps) => {
      const spacing = vpCalc(18, 60)
      const spacingBetween = spaceBetween ? vpCalc(27, 90) : '0px'
      const breakpoint = theme.breakpoints.values[size]

      return {
        width: '100%',
        display: 'grid',
        justifyContent: 'stretch',
        gridTemplateAreas: `
          'spaceleft before before before spaceright'
          'spaceleft left left left spaceright'
          'spaceleft spacebetween spacebetween spacebetween spaceright'
          'spaceleft right right right spaceright'
          'spaceleft after after after spaceright'`,
        gridTemplateRows: `auto auto ${spacingBetween} auto auto`,
        gridTemplateColumns: `
          ${spacing}
          minmax(0, ${leftWidth}fr)
          ${spacingBetween}
          minmax(0, ${1 - leftWidth}fr)
          ${spacing}`,

        [theme.breakpoints.up('sm')]: {
          gridTemplateRows: '1fr auto 1fr',
          gridTemplateAreas: `
            'spaceleft before before before spaceright'
            'spaceleft left spacebetween right spaceright'
            'spaceleft after after after after'`,
          ...(stretch === 'left' && {
            gridTemplateAreas: `
              'before before before before spaceright'
              'left left spacebetween right spaceright'
              'before before before before spaceright'`,
          }),
          ...(stretch === 'right' && {
            gridTemplateAreas: `
              'spaceleft before before before before'
              'spaceleft left spacebetween right right'
              'spaceleft after after after after'`,
          }),
          ...(stretch === 'both' && {
            gridTemplateAreas: `
              'before before before before before'
              'left left spacebetween right right'
              'after after after after after'`,
          }),
        },
        [theme.breakpoints.up(size)]: {
          gridTemplateColumns: `
          auto
          calc(${leftWidth} * (${breakpoint}px - ${spacing} * 2 - ${spacingBetween}))
          ${spacingBetween}
          calc(${1 - leftWidth} * (${breakpoint}px - ${spacing} * 2 - ${spacingBetween}))
          auto`,
        },
      }
    },
    left: { gridArea: 'left' },
    right: { gridArea: 'right' },
    before: {
      gridArea: 'before',
      alignSelf: 'stretch',
    },
    after: {
      gridArea: 'after',
      alignSelf: 'stretch',
    },
  }),
  { name: 'Container' },
)

export type ContainerStyles = keyof ReturnType<typeof useStyles>

type WithOptionalStyles = {
  classes?: ClassNameMap<ClassKeyOfStyles<ContainerStyles>>
}

const Container: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ContainerProps & WithOptionalStyles
> = (props, ref) => {
  const classes = useStyles(props)
  const { before, left, right, children } = props

  return (
    <div className={classes.root} ref={ref}>
      <div className={classes.before}>{before}</div>
      <div className={classes.left}>{left}</div>
      <div className={classes.right}>{right}</div>
      <div className={classes.after}>{children}</div>
    </div>
  )
}

export default React.forwardRef(Container)
