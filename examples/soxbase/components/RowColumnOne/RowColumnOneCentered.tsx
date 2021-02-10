import { makeStyles, Container, Theme } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import React from 'react'
import type { RowColumnOneProps } from '.'

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
  { name: 'RowColumnOneCentered' },
)

function RowColumnOneCentered(props: RowColumnOneProps) {
  const classes = useStyles(props)
  const { colOne, richTextOneClasses } = props
  return (
    <Container>
      <div className={classes.wrapper}>
        <RichText {...colOne} classes={richTextOneClasses} />
      </div>
    </Container>
  )
}

export default RowColumnOneCentered
