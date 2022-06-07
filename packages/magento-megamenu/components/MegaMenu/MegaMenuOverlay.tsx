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
import { Box, Fab, styled } from '@mui/material'
import { m } from 'framer-motion'
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
  const { menu, active, close, addLevel = true } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')

  const [open, setOpen] = useState<string>()

  const reset = () => {
    if (open) {
      setOpen(open[0])
    }
  }

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
              boxShadow: 'none',
              marginLeft: `calc((${fabSize} - ${svgSize}) * -0.5)`,
              marginRight: `calc((${fabSize} - ${svgSize}) * -0.5)`,
            }}
            size='responsive'
            disabled={!active}
          >
            <IconSvg src={iconClose} size='large' />
          </Fab>
        }
        secondary={
          <Fab
            onClick={(e) => {
              if (open) {
                reset()
              }
              e.preventDefault()
              e.stopPropagation()
            }}
            size='responsive'
          >
            <IconSvg src={iconChevronLeft} size='large' />
          </Fab>
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
                      name: 'Products',
                      uid: '#',
                      url_path: '#',
                      children: menu?.items,
                    },
                  ],
                }
              : menu
          }
          open={open}
          setOpen={setOpen}
          addLevel={addLevel}
        />
      </MotionDiv>
    </Overlay>
  )
}
