import React from 'react'
import { Theme, makeStyles, Paper, Container, ContainerProps } from '@material-ui/core'
import RichText from '../RichText'
import Asset from '../Asset'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'
import { UseRichTextStyles } from '../RichText/useRichTextStyles'
import Link from '../Link'
import { vpCalc, UseStyles } from '../Theme'

const useStyles = makeStyles(
  ({ gridSpacing, breakpoints, spacings, palette }: Theme) => ({
    root: {
      gridColumnGap: gridSpacing.gutter,
      gridRowGap: gridSpacing.row,
      marginBottom: gridSpacing.gutter,
      display: `grid`,
      gridTemplateColumns: `1fr`,
      gridTemplateAreas: `"one" "two"`,
      [breakpoints.up('md')]: {
        gridTemplateColumns: `1fr ${vpCalc(320, 620)}`,
        gridTemplateAreas: `"one two"`,
      },
      alignItems: 'center',
    },
    textContainer: { gridArea: 'one' },
    peopleContainer: { gridArea: 'two' },
    linkList: {
      marginTop: vpCalc(20, 40),
      display: 'flex',
      margin: `0 calc(${spacings.md} * -1) 0 0`,
      '& > *': { margin: `0 ${spacings.md} 0 0` },
    },
    paper: {
      backgroundColor: palette.primary.main,
      display: 'grid',
      padding: vpCalc(16, 64),
      gridRowGap: vpCalc(8, 32),
      gridColumnGap: vpCalc(8, 32),
      justifyContent: 'space-around',
      gridTemplateColumns: `repeat(auto-fill, ${vpCalc(80, 120)})`,
      '& img': {
        width: vpCalc(80, 120),
        height: 'auto',
        display: 'block',
        mixBlendMode: 'multiply',
      },
    },
  }),
  { name: 'RowPeopleWithText' },
)

const useRichTextStyles = makeStyles(
  ({ palette }: Theme) => ({
    paragraph: {
      color: palette.primary.mutedText,
    },
  }),
  { name: 'RowPeopleWithTextRichText' },
)

export type RowPeopleWithTextProps = GQLRowPeopleWithTextFragment &
  GQLGetAllPeopleQuery &
  UseStyles<typeof useStyles> & {
    richTextClasses?: UseRichTextStyles['classes']
  } & ContainerProps

const RowPeopleWithText: React.FC<RowPeopleWithTextProps> = (props) => {
  const { links, text, people, richTextClasses, ...containerProps } = props
  const { linkList, paper, textContainer, peopleContainer, ...containerClasses } = useStyles(props)
  const richText = useRichTextStyles({ classes: richTextClasses })

  return (
    <Container {...containerProps} classes={containerClasses}>
      <div className={textContainer}>
        <RichText {...text} classes={richText} />
        {links.length > 0 && (
          <div className={linkList}>
            {links.map((link) => {
              if (!link.page) return null
              return (
                <Link
                  href={link.page.url}
                  metaRobots={link.page.metaRobots}
                  key={link.id}
                  variant='body1'
                >
                  {link.title}
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <div className={peopleContainer}>
        <Paper elevation={8} className={paper}>
          {people.map(({ avatar, id, name }) => (
            <Asset asset={avatar} width={83} key={id} alt={name} />
          ))}
        </Paper>
      </div>
    </Container>
  )
}

export default RowPeopleWithText

export const getStaticProps: CRGetStaticProps<
  GQLRowPeopleWithTextFragment,
  GQLGetAllPeopleQuery
> = async () => {
  const { default: client } = await import('../../lib/apollo')
  const { GetAllPeopleDocument } = await import('../../generated/apollo')

  const { data } = await client().query<GQLGetAllPeopleQuery, GQLGetAllPeopleQueryVariables>({
    query: GetAllPeopleDocument,
  })

  return data
}
