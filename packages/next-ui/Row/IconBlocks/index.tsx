import { Typography } from '@mui/material'
import React from 'react'
import { Row } from '..'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'IconBlocks' })((theme) => ({
  container: {
    maxWidth: 820,
  },
  title: {
    marginBottom: `${theme.spacings.md}`,
  },
  optionsWrapper: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
    gap: `${theme.spacings.sm}`,
  },
  block: {
    display: 'grid',
    gridAutoFlow: 'row',
    justifyItems: 'center',
    gap: `${theme.spacings.xs}`,
    border: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacings.sm}`,
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  wrapper: {
    paddingTop: `${theme.spacings.lg}`,
  },
}))

export type ServiceOptionsProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
}

export function IconBlocks(props: ServiceOptionsProps) {
  const { title, children } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <Row className={classes.container}>
      <div className={classes.wrapper}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        <div className={classes.optionsWrapper}>{children}</div>
      </div>
    </Row>
  )
}
