import { makeStyles } from '@material-ui/core'
import StoreSwitcherButton from '@reachdigital/magento-store/switcher/StoreSwitcherButton'

import React from 'react'

const useStyles = makeStyles({
  root: {
    position: 'sticky',
  },
})

export type FooterProps = unknown

export default function Footer() {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <StoreSwitcherButton />
    </footer>
  )
}
