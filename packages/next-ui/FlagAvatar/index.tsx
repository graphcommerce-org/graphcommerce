import { Avatar, AvatarProps } from '@mui/material'
import { makeStyles } from '../Styles/tssReact'
import React from 'react'

const useStyles = makeStyles({ name: 'FlagAvatar' })({
  root: {},
})

export type FlagAvatarProps = { country: string } & Omit<AvatarProps, 'src'>

export default function FlagAvatar(props: FlagAvatarProps) {
  const { country, ...avatarProps } = props
  const { classes } = useStyles(props)

  return (
    <Avatar
      {...avatarProps}
      classes={classes}
      imgProps={{ loading: 'lazy' }}
      alt={country}
      src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/${country}.svg`}
    >
      {country.toLocaleUpperCase()}
    </Avatar>
  )
}
