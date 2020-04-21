import React from 'react'
import { GetStaticProps } from 'next'
import { makeStyles, Theme, Button, SvgIcon } from '@material-ui/core'
import LayoutFull, { PageWithLayoutFull, PageLayoutProps } from '../components/PageLayout'
import ContentRenderer from '../components/ContentRenderer'
import { StaticPageVariables } from '../lib/staticParams'
import RichText from '../components/RichText'
import Asset from '../components/Asset'
import Container from '../components/Container'
import Link from '../components/Link'
import { chevronRight } from '../components/Icons'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: 'center',
  },
  introText: {
    color: theme.palette.tertiary.contrastText,
    '& a': {
      color: theme.palette.tertiary.contrastText,
      textDecoration: 'underline',
    },
  },
  video: {
    position: 'absolute',
    zIndex: -1,
    top: '0',
    height: '100%',
    margin: '0 auto',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  aboutUsIntroContainer: {
    position: 'relative',
    zIndex: 0,
    background: theme.palette.tertiary['500'],
    [theme.breakpoints.up('md')]: {
      paddingTop: 250,
      marginTop: -250,
      paddingBottom: 250,
    },
  },
  ctaBlock: {
    padding: 30,
    marginTop: 42,
    borderRadius: 3,
    border: '1px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& small .MuiTypography-body1': {
      ...theme.typography.body2,
    },
  },
}))

const useContainerStyles = makeStyles<Theme>({
  left: { alignSelf: 'stretch' },
  root: { alignItems: 'center' },
  after: { position: 'relative' },
})

const RowHero: React.FC<GQLRowHeroFragment> = ({ text, asset, links }) => {
  const classes = useStyles()
  const containerClasses = useContainerStyles()

  const left = (
    <div className={classes.introText}>
      <RichText {...text} />
      {links.map((link) => {
        if (link.__typename === 'LinkInternal' && link.page && link.description)
          return (
            <div key={link.id} className={classes.ctaBlock}>
              <small>
                <RichText {...link.description} />
              </small>
              <Link href={link.page.url} metaRobots={link.page.metaRobots!}>
                {console.log(chevronRight)}
                <Button color='primary' endIcon={<SvgIcon>{chevronRight}</SvgIcon>}>
                  {link.title}
                </Button>
              </Link>
            </div>
          )
        return undefined
      })}
    </div>
  )

  return (
    <div className={classes.aboutUsIntroContainer}>
      <Asset asset={asset} autoPlay loop muted playsInline className={classes.video} />
      <Container left={left} leftWidth={0.5} classes={containerClasses} spaceBetween />
    </div>
  )
}
// @todo this probably shouldnt be a portfolioListQuery
const AboutUs: PageWithLayoutFull<GQLGetPortfolioListQuery> = ({ page }) => {
  return (
    <>
      <ContentRenderer content={page.content} customRenderers={{ RowHero }} />
    </>
  )
}

AboutUs.layout = LayoutFull

export default AboutUs

export const getStaticProps: GetStaticProps<PageLayoutProps> = async () => {
  const params: StaticPageVariables = {
    url: '/over-reach-digital-magento-experts',
    locale: 'nl',
  }
  const { getStaticProps: get } = await import('../components/PageLayout')
  return { props: await get(params) }
}
