import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import Row from '..'
import SectionContainer from '../../SectionContainer'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      maxWidth: 820,
    },
    h1: {
      textAlign: 'center',
      ...theme.typography.h2,
    },
    captionOldOld: {
      display: 'block',
      padding: `${theme.spacings.xs} 0`,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
    },
  }),
  { name: 'ButtonLinkList' },
)

const useLinkStyles = makeStyles(
  (theme: Theme) => ({
    links: ({ containsBigLinks }: any) => ({
      display: 'grid',
      gridTemplateColumns: containsBigLinks
        ? undefined
        : `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
      columnGap: theme.spacings.sm,
    }),
  }),
  { name: 'ButtonLinkListLinks' },
)

export type ButtonLinkListProps = UseStyles<typeof useStyles & typeof useLinkStyles> & {
  title: string
  links: React.ReactNode
  containsBigLinks: boolean
}

export default function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, links } = props
  const classes = useStyles(props)
  const linkClasses = useLinkStyles(props)

  return (
    <Row maxWidth='md' className={classes.container}>
      <SectionContainer labelLeft={title}>
        <div className={linkClasses.links}>{links}</div>
      </SectionContainer>
    </Row>
  )
}
