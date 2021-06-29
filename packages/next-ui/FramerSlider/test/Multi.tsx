import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import MultiItemSlider from '../variants/MultiItemSlider'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
    },
    scroller: {
      gap: theme.spacings.sm,
    },
    item: {
      padding: 6,
      width: 200,
      height: 200,
      boxShadow: theme.shadows[8],
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      color: theme.palette.text.secondary,
      background: theme.palette.secondary.main,
    },
    itemAlt: {
      padding: 6,
      width: 200,
      height: 200,
      boxShadow: theme.shadows[8],
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
  }),
  { name: 'Multi' },
)

export default function Multi() {
  const { item, itemAlt, ...classes } = useStyles()
  return (
    <MultiItemSlider classes={classes}>
      <div className={item}>1</div>
      <div className={itemAlt}>2</div>
      <div className={item}>3</div>
      <div className={itemAlt}>4</div>
      <div className={item}>5</div>
      <div className={itemAlt}>6</div>
      <div className={item}>7</div>
      <div className={itemAlt}>8</div>
      <div className={item}>9</div>
      <div className={itemAlt}>10</div>
      <div className={item}>11</div>
      <div className={itemAlt}>12</div>
      <div className={item}>13</div>
      <div className={itemAlt}>14</div>
      <div className={item}>15</div>
      <div className={itemAlt}>16</div>
      <div className={item}>17</div>
      <div className={itemAlt}>18</div>
      <div className={item}>19</div>
      <div className={itemAlt}>20</div>
      <div className={item}>21</div>
      <div className={itemAlt}>22</div>
    </MultiItemSlider>
  )
}
