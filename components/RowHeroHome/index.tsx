import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import LinkInternal from '../LinkInternal/LinkInternal'
import LinkExternal from '../LinkExternal/LinkExternal'
import RichText from '../RichText'
import Container, { ContainerStyles } from '../Container'
import logoReachBgShadow from './logo-reach-bg-shadow-secondary.svg'
import Asset from '../Asset'

const useContainerStyles = makeStyles<Theme, ContainerStyles>((theme: Theme) => ({
  left: {
    alignSelf: 'stretch',
  },
  right: {},
  root: {
    background: `linear-gradient(to bottom right, transparent 50%, ${theme.palette.secondary.main} 50%)`,
    minHeight: 'calc(90vh - 60px)',
    alignItems: 'center',
  },
  after: {
    position: 'relative',
  },
  before: {},
}))

const useStyles = makeStyles({
  assetContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    minHeight: '50vh',
    overflow: 'hidden',
  },
  asset: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '100%',
    width: 'auto',
  },
  logo: {
    position: 'absolute',
    height: '100%',
    maxWidth: '92%',
    bottom: 0,
    right: 0,
  },
})

const RowHeroHome: React.FC<GQLRowHeroFragment> = ({ text, asset, links }) => {
  const classes = useStyles()
  const containerClasses = useContainerStyles()

  const left = asset && (
    <div className={classes.assetContainer}>
      <Asset asset={asset} autoPlay loop muted playsInline className={classes.asset} width={332} />
    </div>
  )

  const right = (
    <>
      <RichText {...text} />
      <div>
        {links.map((link) => {
          if (link.__typename === 'LinkInternal') return <LinkInternal {...link} key={link.id} />
          if (link.__typename === 'LinkExternal') return <LinkExternal {...link} key={link.id} />
          return undefined
        })}
      </div>
    </>
  )

  return (
    <Container left={left} right={right} leftWidth={0.5} classes={containerClasses} spaceBetween>
      <img src={`${logoReachBgShadow}`} alt='Logo Reach Digital' className={classes.logo} />
    </Container>
  )
}

export default RowHeroHome
