import {
  iconClose,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
  Overlay,
  useFabSize,
  useIconSvgSize,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Fab } from '@mui/material'
import { m } from 'framer-motion'
import { useState } from 'react'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenu } from './MegaMenu'

type Props = MegaMenuQueryFragment & {
  active: boolean
  close: () => void
}

export function MegaMenuOverlay(props: Props) {
  const { menu, active, close } = props

  const fabSize = useFabSize('responsive')
  const svgSize = useIconSvgSize('large')
  const [activeIndex, setActiveIndex] = useState<number | null>()

  // Overlaypane moet animeren

  return (
    <Overlay
      active={active}
      close={close}
      variantMd='left'
      sizeMd='full'
      justifyMd='start'
      variantSm='bottom'
      sizeSm='floating'
      justifySm='start'
      sx={{ '& .sizeMdFull': { minWidth: 'auto !important' } }}
    >
      <m.div layout style={{ display: 'grid' }}>
        <LayoutOverlayHeader
          switchPoint={0}
          noAlign
          sx={{ '&.noAlign': { marginBottom: 0 } }}
          primary={
            <Fab
              onClick={close}
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
          secondary='<<'
        >
          <LayoutTitle size='small' component='span'>
            <Trans id='Navigation' />
          </LayoutTitle>
        </LayoutOverlayHeader>

        <MegaMenu menu={menu} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </m.div>
    </Overlay>
  )
}
