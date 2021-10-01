import { Theme, Avatar, AvatarProps } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
  }),
  { name: 'FlagAvatar' },
)

export type FlagAvatarProps = { country: string } & Omit<AvatarProps, 'src'>

export default function FlagAvatar(props: FlagAvatarProps) {
  const { country, ...avatarProps } = props
  const classes = useStyles(props)

  return (
    <Avatar
      {...avatarProps}
      classes={classes}
      imgProps={{ loading: 'lazy' }}
      alt=''
      src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${country}.svg`}
    >
      {country.toLocaleUpperCase()}
    </Avatar>
  )
}
