import { makeStyles, Theme } from '@material-ui/core'
import ChevronRight from '@material-ui/icons/ChevronRight'
import PageLink from 'next/link'
import React from 'react'
import Button, { ButtonProps } from '../Button'
import { UseStyles } from '../Styles'

const useStyles = makeStyles((theme: Theme) => ({
  buttonLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    padding: `${theme.spacings.xs} 0`,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 0,
    ...theme.typography.body1,
    '& > *': {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyContent: 'space-between',
      gap: `${theme.spacings.xs}`,
    },
  },
}))

type NextButtonLinkProps = {
  title: string
  url: string
  endIcon?: React.ReactNode
} & ButtonProps &
  UseStyles<typeof useStyles>

export default function NextButtonLink(props: NextButtonLinkProps) {
  const { title, url, endIcon, ...buttonProps } = props
  const classes = useStyles(props)

  return (
    <PageLink href={url} passHref>
      <Button {...buttonProps} className={classes.buttonLink}>
        <span>{title}</span>
        {endIcon ?? <ChevronRight color='inherit' />}
      </Button>
    </PageLink>
  )
}
