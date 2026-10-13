import React from 'react'
import type { UseIntlListFormatOptions } from './useIntlListFormat'
import { useIntlListFormat } from './useIntlListFormat'

export type ListFormatProps = {
  children: React.ReactNode[]
} & UseIntlListFormatOptions

function ListFormatMultiple(props: {
  childArray: React.ReactNode[]
  options: UseIntlListFormatOptions
}) {
  const { childArray, options } = props
  const formatter = useIntlListFormat(options)

  const fauxChildren = childArray.map((child, index) => `${index}`) ?? []
  const parts = formatter.formatToParts(fauxChildren)

  return (
    <>
      {parts.map((part, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {part.type === 'literal' ? part.value : childArray[part.value]}
        </React.Fragment>
      ))}
    </>
  )
}

/** @public */
export function ListFormat(props: ListFormatProps) {
  const { children, ...options } = props
  const childArray = React.Children.toArray(children)

  // A single item needs no list formatting; skip creating an Intl.ListFormat, which loads its locale data on first use.
  if (childArray.length < 2) return <>{childArray}</>

  return <ListFormatMultiple childArray={childArray} options={options} />
}
