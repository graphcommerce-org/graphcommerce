import { Theme, makeStyles } from '@material-ui/core'
import React from 'react'
import Row from '..'
import SectionContainer from '../../SectionContainer'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      maxWidth: 820,
    },
    h1: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
    overline: {
      display: 'block',
      padding: `${theme.spacings.xs} 0`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    links: ({ containsBigLinks }: ButtonLinkListPropsBase) => ({
      display: 'grid',
      gridTemplateColumns: containsBigLinks
        ? undefined
        : `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
      columnGap: theme.spacings.sm,
    }),
  }),
  { name: 'ButtonLinkList' },
)

type ButtonLinkListPropsBase = {
  title: string
  links: React.ReactNode
  containsBigLinks: boolean
}

export type ButtonLinkListProps = UseStyles<typeof useStyles> & ButtonLinkListPropsBase

export default function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, links } = props
  const classes = useStyles(props)

  return (
    <Row maxWidth='md' className={classes.container}>
      <SectionContainer labelLeft={title}>
        <div className={classes.links}>{links}</div>
      </SectionContainer>
    </Row>
  )
}
