import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'
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
    typography: {
      ...theme.typography.h3,
      fontSize: responsiveVal(28, 32),
      fontWeight: 700,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h2,
      },
    },
    icon: {
      [theme.breakpoints.down('sm')]: {
        width: 48,
        height: 48,
      },
    },
    inline: {
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
  component?: React.ElementType
} & UseStyles<typeof useStyles>

export default function Title(props: TitleProps) {
  const { children, icon, size = 'medium', component } = props
  const classes = useStyles(props)
  const small = size === 'small'

  return (
    <div className={clsx(classes.container, small && classes.inline)}>
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
        variant={small ? 'h5' : 'h2'}
        component={component ?? 'h1'}
        className={small ? undefined : classes.typography}
      >
        {children}
      </Typography>
    </div>
  )
}
