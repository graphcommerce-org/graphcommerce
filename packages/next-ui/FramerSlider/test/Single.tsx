import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SingleItemSlider from '../variants/SingleItemSlider'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
    },
    scroller: {
      gap: theme.spacings.sm,
    },
    item: {},
    bg: {
      padding: 6,
      width: '100%',
      height: 200,
      boxShadow: theme.shadows[8],
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      color: theme.palette.secondary.contrastText,
      background: theme.palette.secondary.main,
    },
    nav: {
      bottom: `calc(${theme.spacings.lg} - 20px)`,
    },
  }),
  { name: 'Single' },
)

export default function Single() {
  const { bg, ...classes } = useStyles()
  return (
    <SingleItemSlider classes={classes}>
      <div className={bg}>1</div>
      <div className={bg}>2</div>
      <div className={bg}>3</div>
      <div className={bg}>4</div>
      <div className={bg}>5</div>
    </SingleItemSlider>
  )
}
