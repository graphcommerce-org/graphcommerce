import RichText from '@reachdigital/graphcms-ui/RichText'
import { ColumnOneCentered } from '@reachdigital/next-ui'
import React from 'react'
import type { RowColumnOneProps } from '.'

function RowColumnOneCentered(props: RowColumnOneProps) {
  const { colOne, richTextOneClasses } = props

  return (
    <ColumnOneCentered>
      <RichText {...colOne} classes={richTextOneClasses} />
    </ColumnOneCentered>
  )
}

export default RowColumnOneCentered
