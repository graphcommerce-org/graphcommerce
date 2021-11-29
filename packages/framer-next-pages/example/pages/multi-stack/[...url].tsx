/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageContext, usePageRouter } from '@graphcommerce/framer-next-pages'
import { Sheet, SheetProps } from '@graphcommerce/next-ui'
import { motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Grid from '../../components/Grid'

function MultiStack() {
  const [expanded, setExpanded] = useState(true)
  const router = usePageRouter()
  const { backSteps } = usePageContext()
  const [variant] = router.query.url as string[]
  const page = Number.isNaN(Number(router.query.url?.[1])) ? 0 : Number(router.query.url?.[1])

  return (
    <>
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

const pageOptions: PageOptions<SheetProps> = {
  overlayGroup: 'bottom',
  Layout: Sheet,
  sharedKey: ({ asPath }) => asPath,
}
MultiStack.pageOptions = pageOptions

export default MultiStack

type ParsedUrlQuery = { url: [SheetProps['variantSm'], string] }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: [
      { params: { url: ['bottom', '0'] } },
      { params: { url: ['left', '0'] } },
      { params: { url: ['right', '0'] } },
      // { params: { url: ['top', '0'] } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<SheetProps, ParsedUrlQuery> = async (ctx) => {
  const variant = ctx.params?.url?.[0] ?? 'top'
  const variants = ['top', 'left', 'bottom', 'right']

  return {
    props: {
      variantMd: variants.includes(variant) ? variant : 'top',
      variantSm: variants.includes(variant) ? variant : 'top',
    },
  }
}
