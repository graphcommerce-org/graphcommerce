/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import {
  AppBar,
  AppShellTitle,
  Title,
  LayoutOverlay,
  LayoutOverlayProps,
  LayoutOverlayVariant,
} from '@graphcommerce/next-ui'
import { Container } from '@material-ui/core'
import { motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { useState } from 'react'
import Grid from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'

function SingleStack() {
  const [expanded, setExpanded] = useState(true)
  const router = usePageRouter()

  const [variant] = router.query.url as string[]
  const page = Number.isNaN(Number(router.query.url?.[1])) ? 0 : Number(router.query.url?.[1])

  return (
    <>
      <AppBar noAlign>
        <Title size='small' component='span'>
          Overlay {variant} {page}
        </Title>
      </AppBar>
      <Container>
        <AppShellTitle>
          Overlay {variant} {page}
        </AppShellTitle>
        {page > 0 && (
          <Link href={`/single-stack/${variant}/${page - 1}`}>
            <a>{page - 1}</a>
          </Link>
        )}{' '}
        {page}{' '}
        <Link href={`/single-stack/${variant}/${page + 1}`}>
          <a>{page + 1}</a>
        </Link>
        <button type='button' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'collapse' : 'expand'}
        </button>
        <StackDebug />
        <motion.div
          style={{ fontFamily: 'sans-serif', overflow: 'hidden' }}
          variants={{
            collapsed: { height: 60 },
            expanded: { height: 'auto' },
          }}
          initial='expanded'
          animate={expanded ? 'expanded' : 'collapsed'}
        >
          <Grid />
        </motion.div>
        <div style={{ height: 2000 }}>hoi</div>
      </Container>
    </>
  )
}

const pageOptions: PageOptions = {
  overlayGroup: 'bottom',
  Layout: LayoutOverlay,
}
SingleStack.pageOptions = pageOptions

export default SingleStack

type ParsedUrlQuery = { url: [LayoutOverlayVariant, string] }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: [
      { params: { url: ['bottom', '0'] } },
      { params: { url: ['left', '0'] } },
      { params: { url: ['right', '0'] } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<LayoutOverlayProps, ParsedUrlQuery> = async (ctx) => {
  const variant: LayoutOverlayVariant = ctx.params?.url?.[0] ?? 'bottom'

  return {
    props: {
      variantMd: variant,
      variantSm: variant,
    },
  }
}
