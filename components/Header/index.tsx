import React from 'react'
import { Theme, makeStyles, Avatar, Badge, Fab } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import zIndex from '@material-ui/core/styles/zIndex'
import { vpCalc } from 'components/Theme'
import Link from 'components/Link'
import Asset from 'components/Asset'
import TriangleBg from 'components/TriangleBg'
import HeaderMenu from './HeaderMenu'
import logo from './magento-webshop-reach-digital.svg'

export const useHeaderSpacing = makeStyles(
  ({ gridSpacing }: Theme) => ({
    marginTop: { marginTop: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingTop: { paddingTop: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingBottom: { paddingBottom: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
  }),
  { name: 'Header' },
)

const useStyles = makeStyles(
  ({ gridSpacing }: Theme) => ({
    navigation: {
      display: 'grid',
      gridTemplateAreas: `
      'menu logo contact'`,
      padding: `${gridSpacing.row} ${gridSpacing.column}`,
      gridTemplateColumns: `46px auto 46px`,
      gridTemplateRows: `auto`,
      justifyItems: 'center',
      width: '100%',
      // 2xGridspacing, Logo Height, Logo Margin
      marginBottom: `calc(${gridSpacing.row} * -2 + ${vpCalc(46, 72)} * -1 - 3px)`,
    },
    logo: ({ theme }: HeaderProps) => ({
      zIndex: zIndex.appBar,
      gridArea: 'logo',
      filter: theme === 'on-green' ? `invert(1)` : undefined,
    }),
    logoImg: { maxHeight: vpCalc(46, 72), display: 'block', marginTop: 3 },
    menu: { gridArea: 'menu', zIndex: zIndex.appBar },
    contact: { gridArea: 'contact', zIndex: zIndex.appBar },
    avatar: { backgroundColor: 'transparent' },
    avatarFab: { boxShadow: 'none' },
    avatarImg: { display: 'block' },
    avatarPhone: { padding: 0 },
    avatarPhoneIcon: { fontSize: 12 },
    headerDecoration: {
      width: 235,
      height: 200,
      left: -60,
      top: -60,
      position: 'absolute',
      zIndex: 1,
      pointerEvents: 'none',
    },
  }),
  { name: 'Header' },
)

export type HeaderTheme = undefined | 'on-green'

type HeaderProps = GQLHeaderFragment &
  GQLPageMetaFragment & {
    theme: HeaderTheme
  }

const Header: React.FC<HeaderProps> = (props) => {
  const { menuPages, contactPage, contactAvatar, homePage, theme, ...page } = props
  const classes = useStyles(props)

  return (
    <header className={classes.navigation}>
      {!theme && <TriangleBg className={classes.headerDecoration} color='primary' blur flip />}
      {homePage && (
        <Link href={homePage.url} metaRobots={homePage.metaRobots} className={classes.logo}>
          <img src={logo} alt='Logo' className={classes.logoImg} />
        </Link>
      )}
      <div className={classes.menu}>
        <HeaderMenu menuPages={menuPages} {...page} />
      </div>
      <div className={classes.contact}>
        <Badge
          classes={{ badge: classes.avatarPhone }}
          badgeContent={<PhoneIcon htmlColor='#fff' classes={{ root: classes.avatarPhoneIcon }} />}
          overlap='circle'
          color='primary'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          variant='standard'
        >
          <Fab size='small' classes={{ root: classes.avatarFab }} aria-label={contactPage?.title}>
            {contactPage && (
              <Link
                href={contactPage.url}
                metaRobots={contactPage.metaRobots}
                aria-label={contactPage?.title}
              >
                <Avatar classes={{ colorDefault: classes.avatar }}>
                  {contactAvatar && (
                    <Asset
                      alt={contactAvatar.name}
                      className={classes.avatarImg}
                      asset={contactAvatar.avatar}
                      width={40}
                    />
                  )}
                </Avatar>
              </Link>
            )}
          </Fab>
        </Badge>
      </div>
    </header>
  )
}

export default Header
