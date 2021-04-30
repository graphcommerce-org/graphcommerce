import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {},
    head: {
      display: 'grid',
      justifyContent: 'space-between',
      gridTemplateColumns: 'auto auto',
      alignItems: 'center',
      marginBottom: theme.spacings.md,
    },
    title: {
      textTransform: 'uppercase',
    },
  }),
  { name: 'ContainerWithHeader' },
)

type ContainerWithHeaderProps = {
  title: string
  rightArea: React.ReactNode
  children: React.ReactNode
} & UseStyles<typeof useStyles>

export default function ContainerWithHeader(props: ContainerWithHeaderProps) {
  const { title, rightArea, children } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.container}>
      <div className={classes.head}>
        <Typography variant='h3' component='h2' className={classes.title}>
          {title}
        </Typography>
        <div>{rightArea}</div>
      </div>
      {children}
    </Container>
  )
}
