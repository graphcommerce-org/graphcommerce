import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

type DividedLinksProps = {
  icon?: React.ReactNode
} & Pick<TypographyProps, 'color'> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline',
      padding: `0 ${theme.spacings.xxs} 0 ${theme.spacings.xxs}`,
    },
  }),
  { name: 'Separator' },
)

export default function Separator(props: DividedLinksProps) {
  const { color, icon } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      {icon ?? (
        <Typography component='span' variant='body1' color={color}>
          |
        </Typography>
      )}
    </div>
  )
}
