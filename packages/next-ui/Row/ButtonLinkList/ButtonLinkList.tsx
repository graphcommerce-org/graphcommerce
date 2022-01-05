import React from 'react'
import Row from '..'
import SectionContainer from '../../SectionContainer'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles<StyleProps>({ name: 'ButtonLinkList' })(
  (theme, { containsBigLinks }) => ({
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
    links: {
      display: 'grid',
      gridTemplateColumns: containsBigLinks
        ? undefined
        : `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
      columnGap: theme.spacings.sm,
    },
  }),
)

type StyleProps = {
  containsBigLinks: boolean
}

export type ButtonLinkListProps = UseStyles<typeof useStyles> & {
  title: string
  children: React.ReactNode
} & StyleProps

export function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, children, containsBigLinks } = props
  const classes = useMergedClasses(useStyles({ containsBigLinks }).classes, props.classes)

  return (
    <Row maxWidth='md' className={classes.container}>
      <SectionContainer labelLeft={title}>
        <div className={classes.links}>{children}</div>
      </SectionContainer>
    </Row>
  )
}
