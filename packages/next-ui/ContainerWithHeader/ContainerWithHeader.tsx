import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { Row } from '../Row/Row'
import { extendableComponent } from '../Styles'

const { selectors, classes } = extendableComponent('ContainerWithHeader', [
  'root',
  'head',
  'title',
  'right',
] as const)

export type ContainerWithHeaderProps = {
  title: string
  rightArea: React.ReactNode
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function ContainerWithHeader(props: ContainerWithHeaderProps) {
  const { title, rightArea, children, sx } = props

  return (
    <Row className={classes.root} sx={sx}>
      <Box
        className={classes.head}
        sx={(theme) => ({
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: 'auto auto',
          alignItems: 'end',
          marginBottom: theme.spacings.md,
        })}
      >
        <Typography
          variant='h5'
          component='h2'
          className={classes.title}
          sx={{ lineHeight: 1, textTransform: 'uppercase' }}
        >
          {title}
        </Typography>
        <Typography component='div' variant='subtitle1' className={classes.right}>
          {rightArea}
        </Typography>
      </Box>
      {children}
    </Row>
  )
}

ContainerWithHeader.selectors = selectors
