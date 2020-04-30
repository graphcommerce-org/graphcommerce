import React from 'react'
import { Theme, makeStyles, Avatar, Badge, Fab } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import zIndex from '@material-ui/core/styles/zIndex'
import logo from '../../public/images/magento-webshop-reach-digital.svg'
import { vpCalc } from '../Theme'
import Menu from '../Menu'
import Link from '../Link'
import Asset from '../Asset'

const useStyles = makeStyles(
  ({ gridSpacing }: Theme) => ({
    navigation: {
      display: 'grid',
      gridTemplateAreas: `
      'spaceleft before before before spaceright'
      'spaceleft menu logo contact spaceright'`,
      gridTemplateColumns: `${gridSpacing.column} 46px auto 46px ${gridSpacing.column}`,
      gridTemplateRows: `${gridSpacing.row} auto`,
      justifyItems: 'center',
      width: '100%',
    },
    '@media (min-width: 1024px)': {
      navigation: {
        height: 250,
      },
    },
    logo: {
      zIndex: zIndex.appBar,
      gridArea: 'logo',
      '& img': {
        maxHeight: vpCalc(46, 72),
        display: 'block',
        marginTop: 3,
      },
    },
    menu: {
      gridArea: 'menu',
    },
    contact: {
      gridArea: 'contact',
    },
    avatar: {
      backgroundColor: 'transparent',
    },
    avatarFab: {
      boxShadow: 'none',
    },
    avatarImg: {
      display: 'block',
    },
    avatarPhone: {
      padding: 0,
    },
    avatarPhoneIcon: {
      fontSize: 12,
    },
  }),
  { name: 'Header' },
)

const Header: React.FC<{
  menu: GQLMenuFragment
  page: GQLPageMetaFragment
  team: ReadonlyArray<GQLPersonFragment>
}> = ({ menu, page, team }) => {
  const classes = useStyles()

  const person = team[Math.floor(Math.random() * team.length)]

  return (
    <header className={classes.navigation}>
      <Link
        // todo(paales): Have a way to make these common links dynamic?
        href={page.locale === 'nl' ? '/' : `/${page.locale}`}
        metaRobots='INDEX_FOLLOW'
        className={classes.logo}
      >
        <img src={logo} alt='Logo' />
      </Link>
      <div className={classes.menu}>
        <Menu menu={menu} page={page} />
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
          <Fab size='small' classes={{ root: classes.avatarFab }} name='contact'>
            <Link
              // todo(paales): Have a way to make these common links dynamic?
              href={page.locale === 'nl' ? '/contact' : `/${page.locale}/contact`}
              metaRobots='INDEX_FOLLOW'
            >
              <Avatar classes={{ colorDefault: classes.avatar }}>
                <Asset
                  alt={person.name}
                  className={classes.avatarImg}
                  asset={person.avatar}
                  width={40}
                />
              </Avatar>
            </Link>
          </Fab>
        </Badge>
      </div>
    </header>
  )
}

export default Header
