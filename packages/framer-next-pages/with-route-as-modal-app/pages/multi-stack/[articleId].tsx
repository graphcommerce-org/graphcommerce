/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageDepth } from '@reachdigital/framer-next-pages'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import dynamic from 'next/dynamic'
import React from 'react'
import FocusLock from 'react-focus-lock/UI'
import Grid, { data } from '../../components/Grid'
import StackDebug from '../../components/StackedDebugger'
import StackedDrawer from '../../components/StackedDrawer'

const sidecar = dynamic(() => import('react-focus-lock/sidecar'), { ssr: false }) as React.FC

function ArticlePage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { articleId } = props
  const depth = usePageDepth()

  return (
    <FocusLock disabled={depth < 0} sideCar={sidecar} returnFocus>
      <StackedDrawer variant='right'>
        <StackDebug />
        <div style={{ padding: 20, paddingLeft: 60 }}>
          <h1>Multi Stack {articleId}</h1>
          <Grid />
        </div>
      </StackedDrawer>
    </FocusLock>
  )
}

ArticlePage.pageOptions = { overlay: 'right' } as PageOptions

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
