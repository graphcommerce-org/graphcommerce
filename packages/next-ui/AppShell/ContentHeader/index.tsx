import { Container, Fab } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import { SheetHeader, SheetHeaderProps } from '@reachdigital/framer-sheet'
import Link from 'next/link'
import React from 'react'
import SvgImage from '../../SvgImage'
import { iconClose } from '../../icons'
import BackButton from '../BackButton'
import useSheetStyles from '../SheetShellBase/useSheetStyles'

type ContentHeaderProps = Omit<SheetHeaderProps, 'back' | 'close'>

/**
 * Render a Sheet compatible header that: *
 *
 * - Close the overlay if there is a previous page present
 *
 *   - Fallback to `{ backFallbackHref: string}`
 * - Render a Back button if there is a page to go back to
 *
 *   - Fallback to `{ backFallbackHref: string}`
 * - Render the primary action as a pill on desktop
 * - Render the primary action as text on mobile
 * - Render the back action as FAB on desktop
 * - Render the back action as Arrow on mobile
 * - Render the secondary action as Pill on desktop
 * - Render the secondary action as Text on desktop?
 *
 * Questions:
 *
 * - How does the secondary corespond to the back action, do we have secondary actions or can those be removed?
 *
 * @param props
 * @returns
 */
export default function ContentHeader(props: ContentHeaderProps) {
  const router = usePageRouter()
  const { backSteps } = usePageContext()
  const sheetClasses = useSheetStyles(props)

  return (
    <Container maxWidth={false}>
      <SheetHeader
        {...props}
        back={
          backSteps > 1 && (
            <BackButton type='button' onClick={() => router.back()}>
              Back
            </BackButton>
          )
        }
        close={
          backSteps > 0 ? (
            <Fab size='small' type='button' onClick={() => router.go(backSteps * -1)}>
              <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
            </Fab>
          ) : (
            <Link href='/' passHref>
              <Fab size='small'>
                <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
              </Fab>
            </Link>
          )
        }
        classes={sheetClasses}
      />
    </Container>
  )
}
