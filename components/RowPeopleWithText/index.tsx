import React from 'react'
import { Theme, makeStyles, Paper } from '@material-ui/core'
import Container from '../Container'
import { vpCalc, UseStyles } from '../Theme'
import RichText from '../RichText'
import Asset from '../Asset'
import { CRGetStaticProps } from '../ContentRenderer/ContentRenderer'
import { UseRichTextStyles } from '../RichText/useRichTextStyles'
import Link from '../Link'

const useStyles = makeStyles(
  (theme: Theme) => ({
    linkList: {
      display: 'flex',
      margin: `0 calc(${theme.spacings.md} * -1) 0 0`,
      '& > *': { margin: `0 ${theme.spacings.md} 0 0` },
    },
    paper: {
      backgroundColor: theme.palette.primary.main,
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

type RowPeopleWithTextProps = GQLRowPeopleWithTextFragment &
  GQLGetAllPeopleQuery &
  UseStyles<typeof useStyles> & {
    richTextClasses?: UseRichTextStyles['classes']
  }

const RowPeopleWithText: React.FC<RowPeopleWithTextProps> = (props) => {
  const { links, text, people, richTextClasses } = props
  const classes = useStyles(props)

  const Left: React.FC = () => (
    <>
      <RichText {...text} classes={richTextClasses} />
      <div className={classes.linkList}>
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
    </>
  )

  const Right: React.FC = () => (
    <Paper elevation={10} className={classes.paper}>
      {people.map(({ avatar, id }) => (
        <Asset asset={avatar} width={83} key={id} compression='lossy' />
      ))}
    </Paper>
  )

  return <Container left={<Left />} right={<Right />} leftWidth={0.5} spaceBetween />
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
