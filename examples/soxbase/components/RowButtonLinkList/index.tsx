import { makeStyles, Theme } from '@material-ui/core'
import ButtonLinkList from '@reachdigital/next-ui/Row/ButtonLinkList'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import ButtonLink from '../PageLink/ButtonLink'
import { RowButtonLinkListFragment } from './RowButtonLinkList.gql'

export type RowButtonLinkListProps = RowButtonLinkListFragment

// TODO: move these styles somehow...
const useStyles = makeStyles(
  (theme: Theme) => ({
    links: ({ links }: RowButtonLinkListProps) => ({
      display: 'grid',
      gridTemplateColumns: links.some((link) => (link.title?.length ?? 0) > 30)
        ? undefined
        : `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
      columnGap: theme.spacings.sm,
    }),
  }),
  { name: 'RowButtonLinkList' },
)

export default function RowButtonLinkList(props: RowButtonLinkListProps) {
  const { title, links } = props
  const classes = useStyles(props)

  return (
    <ButtonLinkList title={title}>
      <div className={classes.links}>
        {links?.map((link) => (
          <ButtonLink key={link.title} {...link} url={`/${link.url}`} title={link.title ?? ''} />
        ))}
      </div>
    </ButtonLinkList>
  )
}
