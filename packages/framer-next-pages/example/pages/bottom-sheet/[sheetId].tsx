/* eslint-disable @typescript-eslint/require-await */
import { PageOptions } from '@reachdigital/framer-next-pages'
import SheetBackdrop from '@reachdigital/framer-next-pages/Sheet/SheetBackdrop'
import SheetContainer from '@reachdigital/framer-next-pages/Sheet/SheetContainer'
import SheetContext from '@reachdigital/framer-next-pages/Sheet/SheetContext'
import SheetPanel from '@reachdigital/framer-next-pages/Sheet/SheetPanel'
import { SPRING_ANIM } from '@reachdigital/framer-next-pages/Sheet/animation'
import { motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { usePageRouter } from '../../../PageContext'
import Grid, { data } from '../../components/Grid'

function SheetPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { sheetId } = props
  const [expanded, setExpanded] = useState(true)
  const router = useRouter()
  const pageRouter = usePageRouter()

  const isActive = router.asPath === pageRouter.asPath

  return (
    <SheetContext snapPoints={['top', 'bottom']}>
      <SheetBackdrop />
      <SheetContainer>
        <SheetPanel open={isActive} onSnap={(snapPoint) => snapPoint === 'bottom' && router.back()}>
          {/* <StackDebug /> */}
          <button type='button' onClick={() => setExpanded(!expanded)}>
            {expanded ? 'collapse' : 'expand'}
          </button>

          <motion.div
            style={{ fontFamily: 'sans-serif', overflow: 'hidden' }}
            variants={{
              collapsed: { height: 60 },
              expanded: { height: 'auto' },
            }}
            initial='expanded'
            animate={expanded ? 'expanded' : 'collapsed'}
            transition={SPRING_ANIM}
          >
            <Grid />
          </motion.div>
          <div>{sheetId}</div>
        </SheetPanel>
      </SheetContainer>
    </SheetContext>
  )
}

SheetPage.pageOptions = { overlay: 'sheet' } as PageOptions

export default SheetPage

type ParsedUrlQuery = { sheetId: string }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: data.map((articleId) => ({ params: { sheetId: articleId.toString() } })),
    fallback: false,
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext<ParsedUrlQuery>) {
  return {
    props: ctx.params,
  }
}
