import {
  iconClose,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
  Overlay,
  useFabSize,
  iconChevronLeft,
  useIconSvgSize,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Button, Fab, ListItem, styled, Typography } from '@mui/material'
import { m } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenu } from './MegaMenu'

const MotionDiv = styled(m.div)({})

type Props = MegaMenuQueryFragment & {
  active: boolean
  addLevel: boolean
  close: () => void
}

export function MegaMenuOverlay(props: Props) {
  const { menu, active, close, addLevel = false } = props

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
          menu={
            addLevel
              ? {
                  items: [
                    {
                      include_in_menu: 1,
                      name: 'Home',
                      uid: 'home',
                      url_path: '/',
                    },
                    {
                      include_in_menu: 1,
                      name: 'Products',
                      uid: '#',
                      url_path: '#',
                      children: menu?.items,
                    },
                  ],
                }
              : menu
          }
          itemsAfter={
            <ListItem sx={{ gridColumnStart: 1 }}>
              <Typography
                variant='h3'
                sx={{
                  minWidth: 200,
                  mr: 4,
                  ml: 4,
                  justifyContent: 'space-between',
                  borderRadius: 0,
                }}
              >
                After
              </Typography>
            </ListItem>
          }
          open={open}
          setOpen={setOpen}
          addLevel={addLevel}
        />
      </MotionDiv>
    </Overlay>
  )
}
