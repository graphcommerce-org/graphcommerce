import { Container, makeStyles, Theme } from '@material-ui/core'
import { MotionValue, m } from 'framer-motion'
import React from 'react'
import { useMotionValueValue } from '../../../framer-utils'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'sticky',
    },
  }),
  {
    name: 'SheetBillboard',
  },
)

type SheetBillboardBaseProps = {
  children: React.ReactNode
  offsetTop: MotionValue<number>
}

type SheetBillboardProps = SheetBillboardBaseProps & UseStyles<typeof useStyles>

/*
  SheetBillboard
 - makes the children sticky to the parent container
 - determines top offset based on header height dynamically
*/
export default function SheetBillboard(props: SheetBillboardProps) {
  const { children, offsetTop } = props
  const classes = useStyles(props)

  const top = useMotionValueValue(offsetTop, (v) => v)

  return (
    <Container maxWidth={false} className={classes.root} style={{ top }}>
      <>{children}</>
    </Container>
  )
}
