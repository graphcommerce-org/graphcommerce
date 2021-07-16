import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import SvgImage, { SvgImageProps } from '../SvgImage'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexFlow: 'column',
  },
  inline: {
    flexFlow: 'unset',
  },
}))

export type TitleProps = {
  children: React.ReactNode
  icon?: Pick<SvgImageProps, 'src'>
  size?: 'small' | 'medium'
  component: React.ElementType
}

export default function Title(props: TitleProps) {
  const { children, icon, size = 'medium', component } = props
  const classes = useStyles()
  const small = size === 'small'

  return (
    <div className={clsx(classes.container, small && classes.inline)}>
      {icon && (
        <SvgImage
          src={icon as any} /* why doesn't this prop work without any? */
          size={small ? 28 : 56}
          mobileSize={small ? 28 : 56}
          loading='eager'
        />
      )}
      <Typography variant={small ? 'h5' : 'h2'} component={component ?? 'h1'}>
        {children}
      </Typography>
    </div>
  )
}
