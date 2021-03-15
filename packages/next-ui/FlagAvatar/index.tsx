import { makeStyles, Theme, Avatar } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      marginRight: theme.spacing(1),
    },
  }),
  { name: 'IconTitle' },
)

type FlagAvatarProps = {
  flagSrc: string
  alt: string
  className: string
  fallbackCountry: unknown
}

function getFlagSource(flagSource, fallbackCountry) {
  if (flagSource) {
    const country = flagSource.includes(':')
      ? flagSource?.split(':')[0]
      : flagSource?.split('_')[1].toLowerCase()
    return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${country}.svg`
  }
  return `https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${
    fallbackCountry?.two_letter_abbreviation.toLowerCase() || 'eu'
  }.svg`
}

export default function FlagAvatar(props: FlagAvatarProps) {
  const { flagSrc, alt, fallbackCountry, className } = props
  const classes = useStyles()

  return (
    <Avatar
      className={className || classes.avatar}
      alt={alt}
      src={getFlagSource(flagSrc, fallbackCountry)}
    />
  )
}
