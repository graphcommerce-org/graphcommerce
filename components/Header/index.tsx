import React from 'react'
import { Theme, makeStyles, Avatar, Badge, Fab } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import zIndex from '@material-ui/core/styles/zIndex'
import logo from '../../public/images/magento-webshop-reach-digital.svg'
import { vpCalc } from '../Theme'
import HeaderMenu from './HeaderMenu'
import Link from '../Link'
import Asset from '../Asset'

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
    logo: { zIndex: zIndex.appBar, gridArea: 'logo' },
    logoImg: { maxHeight: vpCalc(46, 72), display: 'block', marginTop: 3 },
    menu: { gridArea: 'menu', zIndex: zIndex.appBar },
    contact: { gridArea: 'contact', zIndex: zIndex.appBar },
    avatar: { backgroundColor: 'transparent' },
    avatarFab: { boxShadow: 'none' },
    avatarImg: { display: 'block' },
    avatarPhone: { padding: 0 },
    avatarPhoneIcon: { fontSize: 12 },
  }),
  { name: 'Header' },
)

const Header: React.FC<GQLHeaderFragment & GQLPageMetaFragment> = ({
  menuPages,
  contactPage,
  contactAvatar,
  homePage,
  ...page
}) => {
  const classes = useStyles()

  return (
    <header className={classes.navigation}>
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
          <Fab size='small' classes={{ root: classes.avatarFab }} name='contact'>
            {contactPage && (
              <Link href={contactPage.url} metaRobots={contactPage.metaRobots}>
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
