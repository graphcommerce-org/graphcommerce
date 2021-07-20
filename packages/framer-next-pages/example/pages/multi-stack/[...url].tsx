/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageContext, usePageRouter } from '@reachdigital/framer-next-pages'
import { SheetVariant, SPRING_ANIM } from '@reachdigital/framer-sheet'
import { motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Grid from '../../components/Grid'
import SheetShell, { SheetShellProps } from '../../components/SheetShell'

function MultiStack() {
  const [expanded, setExpanded] = useState(true)
  const router = usePageRouter()
  const { backSteps } = usePageContext()
  const [variant] = router.query.url as string[]
  const page = Number.isNaN(Number(router.query.url?.[1])) ? 0 : Number(router.query.url?.[1])

  return (
    <>
      {/* <SheetHeader
        styles={styles}
        back={
          backSteps > 1 && (
            <button type='button' onClick={() => router.back()}>
              Back
            </button>
          )
        }
        close={
          backSteps > 0 ? (
            <button type='button' onClick={() => router.go(backSteps * -1)}>
              Close
            </button>
          ) : (
            <Link href='/'>
              <a>fallback close</a>
            </Link>
          )
        }
        primary={
          <Link href={`/multi-stack/${variant}/${page + 1}`}>
            <a>{page + 1}</a>
          </Link>
        }
      /> */}

      <button type='button' onClick={() => setExpanded(!expanded)}>
        {expanded ? 'collapse' : 'expand'}
      </button>

      <h1>
        Overlay{' '}
        {page > 0 && (
          <Link href={`/multi-stack/${variant}/${page - 1}`}>
            <a>{page - 1}</a>
          </Link>
        )}{' '}
        {page}{' '}
        <Link href={`/multi-stack/${variant}/${page + 1}`}>
          <a>{page + 1}</a>
        </Link>
      </h1>

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
MultiStack.pageOptions = pageOptions

export default MultiStack

type ParsedUrlQuery = { url: [SheetVariant, string] }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: [
      { params: { url: ['bottom', '0'] } },
      { params: { url: ['left', '0'] } },
      { params: { url: ['right', '0'] } },
      { params: { url: ['top', '0'] } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<SheetShellProps, ParsedUrlQuery> = async (ctx) => {
  const variant = ctx.params?.url?.[0] ?? 'top'
  const variants = ['top', 'left', 'bottom', 'right']

  return { props: { variant: variants.includes(variant) ? variant : 'top' } }
}
