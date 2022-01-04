import { Theme, Typography, TypographyProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { UseStyles } from '../../Styles'
import { classesPicker } from '../../Styles/classesPicker'
import { responsiveVal } from '../../Styles/responsiveVal'
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
      overflow: 'hidden',
      '& svg': {
        width: responsiveVal(24, 28),
        height: responsiveVal(24, 28),
        strokeWidth: 1.4,
      },
      '& > *': {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
    containerGutterTop: {
      marginTop: theme.spacings.xl,
    },
    containerGutterBottom: {
      marginBottom: theme.spacings.lg,
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
  const { children, icon, size = 'medium', component, variant } = props
  const classes = useStyles(props)
  const small = size === 'small'

  const gutterTop = !!(props.gutterTop ?? size !== 'small')
  const gutterBottom = !!(props.gutterBottom ?? size !== 'small')

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
