import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import React from 'react'
import { responsiveVal } from '../..'
import { UseStyles } from '../../Styles'
import { classesPicker } from '../../Styles/classesPicker'
import { SvgImageProps } from '../../SvgImage'
import SvgImageSimple from '../../SvgImage/SvgImageSimple'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      flexFlow: 'unset',
      [theme.breakpoints.up('md')]: {
        flexFlow: 'column',
      },
    },
    containerSizeSmall: {
      flexFlow: 'unset',
      '& svg': {
        width: responsiveVal(24, 28),
        height: responsiveVal(24, 28),
        strokeWidth: 1.4,
      },
    },
    containerGutterBottom: {
      marginBottom: theme.spacings.lg,
    },
    containerGutterTop: {
      marginTop: theme.spacings.xl,
    },
    typography: {},
  }),
  { name: 'Title' },
)

export type TitleProps = {
  children: React.ReactNode
  icon?: SvgImageProps['src']
  size?: 'small' | 'medium'
  variant?: TypographyProps['variant']
  gutterTop?: boolean
  gutterBottom?: boolean
  component?: React.ElementType
} & UseStyles<typeof useStyles>

export const LayoutTitle = React.forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, gutterBottom, gutterTop, icon, size = 'medium', component, variant } = props
  const classes = useStyles(props)
  const small = size === 'small'

  const className = classesPicker(classes, { size, gutterBottom, gutterTop })

  return (
    <div {...className('container')}>
      {icon && <SvgImageSimple src={icon} size={small ? 'large' : 'xl'} />}
      <Typography
        ref={ref}
        variant={variant || (small ? 'h6' : 'h3')}
        component={component ?? 'h1'}
        className={small ? undefined : classes.typography}
      >
        {children}
      </Typography>
    </div>
  )
})
