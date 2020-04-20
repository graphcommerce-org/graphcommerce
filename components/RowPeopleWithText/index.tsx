import React from 'react'
import { Theme, makeStyles, Paper } from '@material-ui/core'
import Container from '../Container'
import LinkInternal from '../LinkInternal/LinkInternal'
import { vpCalc } from '../Theme'
import RichText from '../RichText'
import Asset from '../Asset'

const useContainerStyles = makeStyles<Theme>((theme: Theme) => ({
  after: { backgroundColor: theme.palette.grey[300] },
}))

const useStyles = makeStyles<Theme>((theme) => ({
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
}))

const RowPeopleWithText: React.FC<GQLRowPeopleWithTextFragment> = ({ links, text, personList }) => {
  const container = useContainerStyles()
  const classes = useStyles()

  const Left = () => (
    <>
      <RichText {...text} />

      {links.map((link) => (
        <LinkInternal {...link} key={link.id} />
      ))}
    </>
  )

  const Right = () => (
    <Paper elevation={10} className={classes.paper}>
      {personList?.people.map(({ avatar }) => (
        <Asset asset={avatar} width={83} key={avatar.id} compression='lossy' />
      ))}
    </Paper>
  )

  return (
    <Container left={<Left />} right={<Right />} leftWidth={0.5} classes={container} spaceBetween />
  )
}

export default RowPeopleWithText
