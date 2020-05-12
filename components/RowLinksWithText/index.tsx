import React from 'react'
import { makeStyles, Theme, Container, ContainerProps } from '@material-ui/core'
import RichText from 'components/RichText'
import { UseStyles, vpCalc } from 'components/Theme'
import { UseRichTextStyles } from 'components/RichText/useRichTextStyles'
import Link from 'components/Link'

const useStyles = makeStyles(
  ({ spacings, gridSpacing, breakpoints }: Theme) => ({
    root: {
      gridColumnGap: gridSpacing.column,
      gridRowGap: spacings.xl,
      marginBottom: spacings.xl,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,
      [breakpoints.up('sm')]: {
        gridTemplateColumns: `1fr ${vpCalc(320, 620)}`,
        gridTemplateAreas: `"one two"`,
      },
    },
    linkList: {
      marginTop: vpCalc(20, 40),
      display: 'flex',
      margin: `0 calc(${spacings.md} * -1) 0 0`,
      '& > *': { margin: `0 ${spacings.md} 0 0` },
    },
    linkListItem: {
      display: 'block',
      padding: `${spacings.sm} 0`,
      borderBottom: `2px solid rgba(0,0,0,0.05)`,
    },
  }),
  { name: 'RowColumnTwo' },
)

export type RowLinksWithTextProps = GQLRowLinksWithTextFragment &
  UseStyles<typeof useStyles> &
  ContainerProps & {
    richTextClasses?: UseRichTextStyles['classes']
  }

const RowLinksWithText: React.FC<RowLinksWithTextProps> = (props) => {
  const { links, pages, text, richTextClasses, ...containerProps } = props
  const { linkList, linkListItem, ...containerClasses } = useStyles(props)

  return (
    <Container maxWidth='lg' {...containerProps} classes={containerClasses}>
      <div>
        <RichText {...text} classes={richTextClasses} />
        <div className={linkList}>
          {links.map((link) => {
            if (!link.page) return null
            return (
              <Link
                href={link.page.url}
                metaRobots={link.page.metaRobots}
                key={link.id}
                variant='body1'
                underline='always'
              >
                {link.title}
              </Link>
            )
          })}
        </div>
      </div>
      <div>
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.url}
            metaRobots={page.metaRobots}
            color='inherit'
            variant='h3'
            className={linkListItem}
          >
            {page.title}
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default RowLinksWithText
