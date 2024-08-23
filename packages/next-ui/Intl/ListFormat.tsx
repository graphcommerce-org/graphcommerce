import React, { useMemo } from 'react'
import { useLocale } from '../hooks'

type ListFormatProps = {
  children: React.ReactNode[]
  listStyle?: Intl.ListFormatOptions['style']
} & Omit<Intl.ListFormatOptions, 'style'>

export function ListFormat(props: ListFormatProps) {
  const { children, localeMatcher, listStyle: style, type } = props

  const locale = useLocale()

  const formatter = useMemo(
    () => new Intl.ListFormat(locale, { localeMatcher, style, type }),
    [locale, localeMatcher, style, type],
  )

  const childArray = React.Children.toArray(children)
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
