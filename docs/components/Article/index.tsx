import { Container } from '@material-ui/core'
import React from 'react'
import { ArticleHead } from '../ArticleHead'

export const Article = ({ children, meta }) => (
  <Container>
    <ArticleHead meta={meta} />
    <article>{children}</article>
  </Container>
)
