import { StoreSwitcherButton } from '@graphcommerce/magento-store'
import { SvgImageSimple, UseStyles, Button } from '@graphcommerce/next-ui'
import {
  Box,
  Container,
  Divider,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { LightTheme } from '../Theme/ThemedProvider'
import ThemeWrapper from '../Theme/Wrapper'
import Logo from './Logo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    footer: {
      display: 'grid',
      gridTemplate: `
        "divider divider divider divider"
        "col1    col2    col3    ."
        "logo    .       .       copyright"
      `,
    },
  }),
  { name: 'Footer' },
)

export type FooterProps = UseStyles<typeof useStyles>

export default function Footer(props: FooterProps) {
  const classes = useStyles(props)

  return (
    <ThemeWrapper>
      <Container component='footer' maxWidth={false} className={clsx(classes.footer)}>
        <Box gridArea='divider' pt={10} pb={10}>
          <Divider />
        </Box>
        <Box gridArea='col1'>
          <Typography variant='h5'>Getting started</Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Installation
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Release notes
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Demo
          </Typography>
        </Box>
        <Box gridArea='col2'>
          <Typography variant='h5'>Community</Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            GitHub
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Slack
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Twitter
          </Typography>
        </Box>
        <Box gridArea='col3'>
          <Typography variant='h5'>Resources</Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Documentation
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            Blog
          </Typography>
        </Box>
        <Box gridArea='logo'>
          <Logo />
        </Box>
        <Box gridArea='copyright'>
          <Typography variant='subtitle1' color='textSecondary'>
            Made by Reach Digital
          </Typography>
        </Box>
      </Container>
    </ThemeWrapper>
  )
}
