/* eslint-disable @typescript-eslint/require-await */
import { PageOptions } from '@reachdigital/framer-next-pages'
import SheetBackdrop from '@reachdigital/framer-next-pages/Sheet/SheetBackdrop'
import SheetContainer from '@reachdigital/framer-next-pages/Sheet/SheetContainer'
import SheetContext from '@reachdigital/framer-next-pages/Sheet/SheetContext'
import SheetPanel from '@reachdigital/framer-next-pages/Sheet/SheetPanel'
import { SPRING_ANIM } from '@reachdigital/framer-next-pages/Sheet/animation'
import { motion, useIsPresent } from 'framer-motion'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { useState } from 'react'
import { data } from '../../components/Grid'

function SheetPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { sheetId } = props
  const isPresent = useIsPresent()

  const [expanded, setExpanded] = useState(true)

  return (
    <SheetContext snapPoints={[0, 300, 40, -100]}>
      <SheetContainer>
        <SheetPanel open={isPresent}>
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
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
            <br /> content
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
