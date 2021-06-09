/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageRouter, usePageContext } from '@reachdigital/framer-next-pages'
import { SheetVariant, SPRING_ANIM } from '@reachdigital/framer-sheet'
import { motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticProps } from 'next'
import React, { useState } from 'react'
import Grid, { data } from '../../components/Grid'
import SheetShell, { SheetShellProps } from '../../components/SheetShell'

function SheetPage() {
  const [expanded, setExpanded] = useState(true)
  const router = usePageRouter()
  const { level } = usePageContext()

  return (
    <>
      <button
        type='button'
        onClick={() => {
          router.back()
          router.back()
        }}
      >
        close
      </button>

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
    </>
  )
}

const pageOptions: PageOptions = {
  overlayGroup: 'bottom',
  SharedComponent: SheetShell,
  sharedKey: ({ asPath }) => asPath,
}
SheetPage.pageOptions = pageOptions

export default SheetPage

type ParsedUrlQuery = { sheetId: SheetVariant }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: [
      { params: { sheetId: 'bottom' } },
      { params: { sheetId: 'left' } },
      { params: { sheetId: 'right' } },
      { params: { sheetId: 'top' } },
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<SheetShellProps, ParsedUrlQuery> = async (ctx) => {
  const sheetId = ctx.params?.sheetId
  return { props: { variant: sheetId ?? 'top' } }
}
