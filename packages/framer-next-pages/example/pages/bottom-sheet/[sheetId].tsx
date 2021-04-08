/* eslint-disable @typescript-eslint/require-await */
import { PageOptions, usePageDepth, usePageRouter } from '@reachdigital/framer-next-pages'
import {
  Sheet,
  SheetContainer,
  SheetBackdrop,
  SheetContent,
  SheetHeader,
} from '@reachdigital/next-ui/FramerModalSheet'
import { GetStaticPathsResult, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React from 'react'
import { data } from '../../components/Grid'

function SheetPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { sheetId } = props
  const depth = usePageDepth()
  const router = usePageRouter()

  return (
    <Sheet isOpen onClose={() => console.log('close')} snapPoints={[1000, 400, 200, 0]}>
      <SheetContainer>
        <SheetHeader />
        <SheetContent>{/* Your sheet content goes here */}</SheetContent>
      </SheetContainer>

      <SheetBackdrop />
    </Sheet>
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
