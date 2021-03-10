import { makeStyles, Container, Theme, Typography } from '@material-ui/core'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import ButtonLink from '../PageLink/ButtonLink'
import { RowButtonLinkListFragment } from './RowButtonLinkList.gql'

export type RowButtonLinkListProps = RowButtonLinkListFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      maxWidth: 820,
      marginBottom: theme.spacings.lg,
    },
    h1: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
    root: ({ links }: RowButtonLinkListProps) => ({
      display: 'grid',
      gridTemplateColumns: links.some((link) => (link.title?.length ?? 0) > 30)
        ? undefined
        : `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
      columnGap: theme.spacings.sm,
    }),
    caption: {
      display: 'block',
      padding: `${theme.spacings.xs} 0`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
  }),
  { name: 'RowButtonLinkList' },
)

export default function RowButtonLinkList(props: RowButtonLinkListProps) {
  const { title, links } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth='md' className={classes.container}>
      <SectionContainer label={title}>
        <div className={classes.root}>
          {links?.map((link) => (
            <ButtonLink key={link.title} {...link} url={`/${link.url}`} title={link.title ?? ''} />
          ))}
        </div>
      </SectionContainer>
    </Container>
  )
}
