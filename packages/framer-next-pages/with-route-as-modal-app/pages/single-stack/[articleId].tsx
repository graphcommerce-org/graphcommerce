import { AnimatePresence, motion } from 'framer-motion'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'
import StackedDrawer from '../../components/StackedDrawer'
import { StackOptions } from '../_app'

function ArticlePage({ articleId }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <StackedDrawer>
      <StackDebug />
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            style={{ position: 'absolute', left: 0, top: 0 }}
            key={articleId}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
          >
            <h1>Single Stack {articleId}</h1>
            <Grid />
          </motion.div>
        </AnimatePresence>
      </div>
    </StackedDrawer>
  )
}

const stackOptions: StackOptions = {
  stack: true,
  scope: ({ router }) => router.pathname,
}
ArticlePage.stackOptions = stackOptions

export default ArticlePage

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticProps({
  params: { articleId },
}: GetStaticPropsContext<{ articleId: string }>) {
  return { props: { articleId } }
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getStaticPaths() {
  return {
    paths: data.map((articleId) => ({ params: { articleId: articleId.toString() } })),
    fallback: false,
  }
}
