import { makeStyles, Container, Theme, Typography } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import ButtonLink from '../PageLink/ButtonLink'
import { RowButtonLinkListFragment } from './RowButtonLinkList.gql'

const useStyles = makeStyles((theme: Theme) => ({
  h1: {
    textAlign: 'center',
    ...theme.typography.h2,
  },
  root: {
    display: 'grid',
    marginBottom: theme.spacings.lg,
  },
  preheader: {
    color: 'rgba(0,0,0,0.4)',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: responsiveVal(12, 17),
    padding: `${theme.spacings.xs} 0`,
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
}))

export type RowButtonLinkListProps = RowButtonLinkListFragment

export default function RowButtonLinkList(props: RowButtonLinkListProps) {
  const { title, links } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.root}>
      <Typography variant='h2' className={classes.preheader}>
        {title}
      </Typography>

      {links?.map((link) => (
        <ButtonLink
          key={link.title}
          {...link}
          url={`/${link.url}`}
          title={link.title ?? link.url}
        />
      ))}
    </Container>
  )
}
