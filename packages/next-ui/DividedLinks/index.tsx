import { Link, makeStyles, Theme, Typography } from '@material-ui/core'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../Styles'

type LinkData = {
  href: string
  text: string
}

type DividedLinksProps = {
  divider: React.ReactNode
  links: LinkData[]
  textColor: 'primary' | 'secondary'
} & UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    divider: {
      padding: `0 ${theme.spacings.xxs} 0 ${theme.spacings.xxs}`,
    },
  }),
  {
    name: 'DividedLinks',
  },
)

export default function DividedLinks(props: DividedLinksProps) {
  const { textColor, links, divider } = props
  const classes = useStyles(props)

  const dividerComponent = (
    <Typography component='span' variant='body1' className={classes.divider}>
      {divider}
    </Typography>
  )

  return (
    <>
      {links.map((link, index) => (
        <React.Fragment key={link.href}>
          <PageLink passHref href={`/${link.href}`}>
            <Link color={textColor}>{link.text}</Link>
          </PageLink>

          {index < links.length - 1 && <>{dividerComponent}</>}
        </React.Fragment>
      ))}
    </>
  )
}
