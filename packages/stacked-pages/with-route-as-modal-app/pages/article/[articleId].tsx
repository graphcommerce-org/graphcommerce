import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Article from '../../components/Article'
import Grid, { data } from '../../components/Grid'
import { useStackLevel, useStackRouter } from '../_app'

function ArticlePage({ articleId }) {
  const router = useRouter()
  const stackRouter = useStackRouter()
  const stackLevel = useStackLevel()

  return (
    <motion.div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        background: '#fff',
        padding: `40px 240px 40px 40px`,
        right: -200,
        width: 600 + 200,
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        originY: 0,
      }}
      animate='enter'
      exit='exit'
      initial='exit'
      variants={{
        enter: { y: 0, opacity: 1, x: stackLevel * 40 },
        exit: { y: 0, x: 100, opacity: 0 },
      }}
      transition={{ ease: 'easeOut' }}
    >
      <Article id={articleId} pathname={router.pathname} />
      {stackRouter.pathname}
      {stackLevel}
      {JSON.stringify(stackRouter.query)}
      <Link href='/'>
        <a>Link</a>
      </Link>
      <Grid />
      {Array(100)
        .fill(undefined)
        .map((_, idx) => idx)
        .map((idx) => (
          <br key={idx} />
        ))}
    </motion.div>
  )
}

ArticlePage.stack = true

export default ArticlePage

export function getStaticProps({ params: { articleId } }) {
  return { props: { articleId } }
}

export function getStaticPaths() {
  return {
    paths: data.map((articleId) => ({
      params: { articleId: articleId.toString() },
    })),
    fallback: false,
  }
}
