import React from 'react'
import { makeStyles, Theme, Paper } from '@material-ui/core'
import { GQLRowPeopleWithTextFragment } from '../../generated/graphql'
import { FilestackPicture } from '../FilestackPicture'
import Container, { ContainerStyles } from '../Container'
import { LinkInternal } from '../LinkInternal/LinkInternal'
import { MimeTypes } from '../PictureResponsive'
import { vpCalc } from '../../layout/FullLayout'
import RichText from '../RichText'

type StyleProps = { scrolling: boolean } & GQLRowPeopleWithTextFragment

const useContainerStyles = makeStyles<Theme, ContainerStyles>((theme: Theme) => ({
  left: {},
  right: {},
  container: {},
  spread: { backgroundColor: theme.palette.grey[300] },
}))

const useStyles = makeStyles<Theme>(theme => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    display: 'grid',
    padding: vpCalc(16, 64),
    gridRowGap: theme.spacing(4),
    gridColumnGap: theme.spacing(3),
    justifyContent: 'space-around',
    gridTemplateColumns: `repeat(auto-fill, ${vpCalc(80, 120)})`,
    fallbacks: {
      gridTemplateColumns: `repeat(auto-fill, ${vpCalc(80, 120, true)})`,
    },
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

      {links.map(link => (
        <LinkInternal {...link} key={link.id} />
      ))}
    </>
  )

  const Right = () => (
    <Paper elevation={10} className={classes.paper}>
      {personList?.people.map(({ avatar }) => (
        <FilestackPicture
          src={avatar.url}
          type={(avatar.mimeType as MimeTypes) ?? 'image/png'}
          width={83}
          height={((avatar.width || 1) / (avatar.height || 1)) * 83}
          key={avatar.id}
        />
      ))}
    </Paper>
  )

  return <Container left={<Left />} right={<Right />} leftWidth={0.5} classes={container} />
}

export default RowPeopleWithText
