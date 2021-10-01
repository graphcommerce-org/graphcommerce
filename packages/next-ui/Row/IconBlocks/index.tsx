import { Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
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
      border: `1px solid ${theme.palette.grey[300]}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    wrapper: {
      paddingTop: `${theme.spacings.lg}`,
    },
  }),
  { name: 'ServiceOptions' },
)

export type IconBlocksProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
}

export default function ServiceOptions(props: IconBlocksProps) {
  const { title, children } = props
  const classes = useStyles(props)

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
