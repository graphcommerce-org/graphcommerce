import { Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
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
  children: React.ReactNode
  containsBigLinks: boolean
}

export type ButtonLinkListProps = UseStyles<typeof useStyles> & ButtonLinkListPropsBase

export function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, children } = props
  const classes = useStyles(props)

  return (
    <Row maxWidth='md' className={classes.container}>
      <SectionContainer labelLeft={title}>
        <div className={classes.links}>{children}</div>
      </SectionContainer>
    </Row>
  )
}
