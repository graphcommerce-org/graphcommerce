import { CustomerFab, CustomerMenuFabItem } from '@graphcommerce/magento-customer'
import { WishlistFab, WishlistMenuFabItem } from '@graphcommerce/magento-wishlist'
import {
  iconClose,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
  Overlay,
  useFabSize,
  DarkLightModeMenuSecondaryItem,
  iconChevronLeft,
  useIconSvgSize,
  MenuFabSecondaryItem,
  iconCustomerService,
  iconHeart,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Fab, ListItem, styled } from '@mui/material'
import { m } from 'framer-motion'
import { useState } from 'react'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenu } from './MegaMenu'
import { MegaMenuItem } from './MegaMenuItem'

const MotionDiv = styled(m.div)({})

type Props = MegaMenuQueryFragment & {
  active: boolean
  addLevel: boolean
  close: () => void
}

export function MegaMenuOverlay(props: Props) {
  const { menu, active, close, addLevel } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const [open, setOpen] = useState<string>('/')

  const resetAndClose = () => {
    if (open) {
      setOpen(open[0])
    }
    close()
  }

  return (
    <Overlay
      active={active}
      close={resetAndClose}
      variantMd='left'
      sizeMd='full'
      justifyMd='start'
      variantSm='bottom'
      sizeSm='floating'
      justifySm='start'
      sx={{ '& .sizeMdFull': { minWidth: 'auto !important' } }}
    >
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={{ '&.noAlign': { marginBottom: 0 } }}
        primary={
          <Fab
            onClick={resetAndClose}
            sx={{
              marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
              marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
            }}
            color='inherit'
            size='responsive'
            disabled={!active}
          >
            <IconSvg src={iconClose} size='large' />
          </Fab>
        }
        secondary={
          open &&
          open !== '/' && (
            <Fab
              onClick={(e) => {
                if (open) {
                  setOpen(open[0])
                }
                e.preventDefault()
                e.stopPropagation()
              }}
              color='inherit'
              size='responsive'
            >
              <IconSvg src={iconChevronLeft} size='large' />
            </Fab>
          )
        }
      >
        <LayoutTitle size='small' component='span'>
          <Trans id='Navigation' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <MotionDiv layout='position'>
        <MegaMenu
          itemsBefore={[
            <MegaMenuItem href='/' open={open}>
              <Trans id='Home' />
            </MegaMenuItem>,
            <MegaMenuItem href='/new' open={open}>
              <Trans id='New' />
            </MegaMenuItem>,
            <MegaMenuItem href='/blog' open={open}>
              <Trans id='Blog' />
            </MegaMenuItem>,
          ]}
          menu={menu}
          addLevel={addLevel}
          itemsAfter={[
            <CustomerMenuFabItem key='account' guestHref='/account/signin' authHref='/account'>
              <Trans id='Account' />
            </CustomerMenuFabItem>,
            <MenuFabSecondaryItem
              key='service'
              icon={<IconSvg src={iconCustomerService} size='medium' />}
              href='/service'
            >
              <Trans id='Customer Service' />
            </MenuFabSecondaryItem>,
            <WishlistMenuFabItem key='wishlist' icon={<IconSvg src={iconHeart} size='medium' />}>
              <Trans id='Wishlist' />
            </WishlistMenuFabItem>,
            <DarkLightModeMenuSecondaryItem key='darkmode' />,
          ]}
          open={open}
          setOpen={setOpen}
        />
      </MotionDiv>
    </Overlay>
  )
}
