import { Theme, Typography, TypographyProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import SvgImage, { SvgImageProps } from '../SvgImage'

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
    typography: {},
    icon: {
      [theme.breakpoints.down('lg')]: {
        width: 48,
        height: 48,
      },
    },
    small: {
      flexFlow: 'unset',
    },
  }),
  {
    name: 'Title',
  },
)

export type TitleProps = {
  children: React.ReactNode
  icon?: SvgImageProps['src']
  size?: 'small' | 'medium'
  variant?: TypographyProps['variant']
  component?: React.ElementType
} & UseStyles<typeof useStyles>

const Title = React.forwardRef<HTMLDivElement, TitleProps>((props, ref) => {
  const { children, icon, size = 'medium', component, variant } = props
  const classes = useStyles(props)
  const small = size === 'small'

  return (
    <div className={clsx(classes.container, small && classes.small)}>
      {icon && (
        <SvgImage
          src={icon}
          size={small ? 30 : 56}
          mobileSize={small ? 20 : 56}
          loading='eager'
          classes={{ root: small ? undefined : classes.icon }}
        />
      )}
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

export default Title
