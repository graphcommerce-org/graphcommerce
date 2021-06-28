import { Fab, makeStyles, Theme } from '@material-ui/core'
import { usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import { SheetHeader, SheetHeaderProps } from '@reachdigital/framer-sheet'
import { m } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import SvgImage from '../../SvgImage'
import { iconClose } from '../../icons'
import BackButton from '../BackButton'

type ContentHeaderProps = Omit<SheetHeaderProps, 'back' | 'close'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    title: {
      alignSelf: 'center',
      ...theme.typography.h5,
    },
    divider: {
      borderBottom: '1px solid #ddd',
    },
    sheetHeader: {
      position: 'sticky',
      top: 0,
      background: theme.palette.background.default,
    },
    sheetHeaderActions: {
      display: 'grid',
      gridTemplateColumns: '1fr 3fr 1fr',
      gridAutoFlow: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 4,
    },
    sheetHeaderActionRight: {
      justifySelf: 'flex-end',
    },
    fab: {
      boxShadow: 'none',
    },
  }),
  { name: 'ContentHeader' },
)

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
  const { title } = props
  const router = usePageRouter()
  const { closeSteps, backSteps } = usePageContext()
  const classes = useStyles(props)

  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // const { contentRef } = useSheetContext()

  // const { y } = useElementScroll(contentRef)

  // const opacityFadseOut = useTransform(y, [0, 15], [1, 0])
  // const opacityFadeIn = useTransform(y, [0, 15], [0, 1])

  return (
    <SheetHeader
      divider={<m.div className={classes.divider} style={{ opacity: 1 }} />}
      {...props}
      back={
        backSteps > 0 && (
          <BackButton type='button' onClick={() => router.back()}>
            Back
          </BackButton>
        )
      }
      close={
        closeSteps > 0 ? (
          <Fab
            size='small'
            type='button'
            onClick={() => router.go(closeSteps * -1)}
            classes={{ root: classes.fab }}
          >
            <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
          </Fab>
        ) : (
          <Link href='/' passHref>
            <Fab size='small' classes={{ root: classes.fab }}>
              <SvgImage src={iconClose} alt='Close overlay' loading='eager' />
            </Fab>
          </Link>
        )
      }
      classes={classes}
    >
      <m.div style={{ opacity: 1 }} className={classes.title}>
        {title}
      </m.div>
    </SheetHeader>
  )
}
