import React from 'react'
import { Theme, makeStyles, Avatar, Badge, Fab } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone'
import zIndex from '@material-ui/core/styles/zIndex'
import { vpCalc } from 'components/Theme'
import Link from 'next/link'
import MagentoDynamic from 'components/MagentoDynamic/MagentoDynamic'
import CartTriggerSkeleton from 'components/MagentoDynamic/CartTriggerSkeleton'
import logo from './magento-webshop-reach-digital.svg'
import HeaderMenu, { HeaderMenuProps } from './HeaderMenu'

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
    logo: {
      gridArea: 'logo',
    },
    logoImg: { maxHeight: vpCalc(46, 72), display: 'block', marginTop: 3 },
    menu: { gridArea: 'menu' },
    contact: { gridArea: 'contact' },
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
    headerDecorationLarge: {
      top: -55,
      left: -70,
      width: '40vw',
      height: '24vw',
      position: 'absolute',
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'blur(30px)',
    },
  }),
  { name: 'Header' },
)

type HeaderProps = HeaderMenuProps

export default function Header(props: HeaderProps) {
  const { menu, urlResolver } = props
  const classes = useStyles(props)

  return (
    <>
      <header className={classes.navigation}>
        <Link href='/' passHref>
          <a className={classes.logo}>
            <img src={logo} alt='Logo' className={classes.logoImg} />
          </a>
        </Link>

        <div className={classes.menu}>
          <HeaderMenu menu={menu} urlResolver={urlResolver} />
        </div>

        <div className={classes.contact}>
          <Badge
            classes={{ badge: classes.avatarPhone }}
            badgeContent={
              <PhoneIcon htmlColor='#fff' classes={{ root: classes.avatarPhoneIcon }} />
            }
            overlap='circle'
            color='primary'
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            variant='standard'
          >
            <Fab
              size='small'
              classes={{ root: classes.avatarFab }}
              aria-label='contact'
              component='div'
            >
              <Avatar classes={{ colorDefault: classes.avatar }}>
                <MagentoDynamic
                  loader={() => import('@magento/venia-ui/lib/components/Header/cartTrigger')}
                  skeleton={(ref) => <CartTriggerSkeleton ref={ref} />}
                />
              </Avatar>
            </Fab>
          </Badge>
        </div>
      </header>

      <MagentoDynamic
        loader={() => import('@magento/venia-ui/lib/components/MiniCart')}
        skeleton={(ref) => <div ref={ref} />}
      />
    </>
  )
}
