import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import RichText from '../RichText'
import Container from '../Container'
import logoReachBgShadow from './logo-reach-bg-shadow-secondary.svg'
import Asset from '../Asset'
import { RowHeroProps } from '.'
import Link from '../Link'

const useContainerStyles = makeStyles<Theme>((theme: Theme) => ({
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

const useStyles = makeStyles(
  {
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
  },
  { name: 'RowHeroHome' },
)

const RowHeroHome: React.FC<RowHeroProps> = ({ text, asset, links, richTextClasses }) => {
  const classes = useStyles()
  const containerClasses = useContainerStyles()

  const left = asset && (
    <div className={classes.assetContainer}>
      <Asset asset={asset} autoPlay loop muted playsInline className={classes.asset} width={332} />
    </div>
  )

  const right = (
    <>
      <RichText {...text} classes={richTextClasses} />
      <div>
        {links.map((link) => {
          if (link.__typename === 'LinkInternal' && link.page)
            return (
              <Link href={link.page.url} metaRobots={link.page.metaRobots} key={link.id}>
                {link.title}
              </Link>
            )
          if (link.__typename === 'LinkExternal')
            return (
              <a href={link.url} target='_blank' rel='noopener nofollow noreferrer' key={link.id}>
                {link.title}
              </a>
            )
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
