/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageDepth, usePageDirection } from '@reachdigital/framer-next-pages'
import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import FocusLock from 'react-focus-lock/UI'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'
import StackedDrawer from '../../components/StackedDrawer'

const sidecar = dynamic(() => import('react-focus-lock/sidecar'), { ssr: false }) as React.FC

function ArticlePage({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) {
  const direction = usePageDirection()
  const depth = usePageDepth()

  type Custom = {
    depth: typeof depth
    direction: typeof direction
    exiting: boolean
  }

  return (
    <FocusLock disabled={depth < 0} sideCar={sidecar} returnFocus>
      <StackedDrawer variant='left'>
        <StackDebug />
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          <AnimatePresence initial={false} custom={{ depth, direction, exiting: true }}>
            <motion.div
              key={articleId}
              data-key={articleId}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                padding: 20,
                paddingLeft: 60,
                background: '#fff',
              }}
              custom={{ depth, direction, exiting: false }}
              initial='initial'
              animate={{ x: 0 }}
              exit='exit'
              variants={{
                initial: (c: Custom) => {
                  if (c.direction === 1) return { x: '100%' }
                  return { x: '-100%' }
                },
                exit: (c: Custom) => {
                  if (!c.depth && c.exiting && c.direction === 1) return { x: '-100%' }
                  if (!c.depth && c.exiting && c.direction === -1) return { x: '100%' }
                  return { x: 0 }
                },
              }}
              transition={{ type: 'spring', duration: 0.4 }}
            >
              <h1>Single Stack {articleId}</h1>
              <Grid />
            </motion.div>
          </AnimatePresence>
        </div>
      </StackedDrawer>
    </FocusLock>
  )
}

ArticlePage.pageOptions = {
  overlayGroup: 'left',
  sharedKey: (router) => router.pathname,
} as PageOptions

export default ArticlePage

type ParsedUrlQuery = { articleId: string }
export async function getStaticPaths(): Promise<GetStaticPathsResult<ParsedUrlQuery>> {
  return {
    paths: data.map((articleId) => ({ params: { articleId: articleId.toString() } })),
    fallback: false,
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext<ParsedUrlQuery>) {
  return {
    props: ctx.params,
  }
}
