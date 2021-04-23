import { Container, makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { ColumnOneProps } from '../ColumnOne'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      marginBottom: theme.spacings.lg,
      marginTop: theme.spacings.lg,
      textAlign: 'center',
      maxWidth: `calc(1050px + calc(${theme.spacings.md} * 2))`,
      margin: `0 auto`,
      position: 'relative',
    },
    imageContainer: {
      margin: `0 auto`,
      textAlign: `center`,
      '& img': {
        width: `100%`,
        height: `auto`,
      },
    },
  }),
  { name: 'ColumnOneCentered' },
)

export default function ColumnOneCentered(props: ColumnOneProps) {
  const { children } = props
  const classes = useStyles(props)

  return (
    <Container>
      <div className={classes.wrapper}>{children}</div>
    </Container>
  )
}
