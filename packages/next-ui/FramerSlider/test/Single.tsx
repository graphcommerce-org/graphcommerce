import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import SliderSlide from '../SliderSlide'
import SingleItemSlider from '../variants/SingleItemSlider'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      padding: `${theme.spacings.sm} 0 ${theme.spacings.lg}`,
      height: 300,
    },
    scroller: {
      gap: theme.spacings.sm,
    },
    slide: {
      padding: 6,
      boxShadow: theme.shadows[8],
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      color: theme.palette.text.secondary,
      background: theme.palette.secondary.main,
    },
    nav: {
      bottom: `calc(${theme.spacings.lg} - 20px)`,
    },
  }),
  { name: 'Single' },
)

export default function Single() {
  const { slide, ...classes } = useStyles()
  return (
    <SingleItemSlider classes={classes}>
      <SliderSlide classes={{ slide }}>1</SliderSlide>
      <SliderSlide classes={{ slide }}>2</SliderSlide>
      <SliderSlide classes={{ slide }}>3</SliderSlide>
      <SliderSlide classes={{ slide }}>4</SliderSlide>
      <SliderSlide classes={{ slide }}>5</SliderSlide>
    </SingleItemSlider>
  )
}
