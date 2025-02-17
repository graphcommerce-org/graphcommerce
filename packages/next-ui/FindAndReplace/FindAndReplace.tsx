import React from 'react'

export type FindAndReplacerProps = { part: string }

type FindAndReplaceTuple = [string, React.FC<FindAndReplacerProps> | React.ReactNode]

export type FindAndReplaceProps = {
  source: string
  findAndReplace: [FindAndReplaceTuple, ...FindAndReplaceTuple[]]
}

export function FindAndReplace(props: FindAndReplaceProps) {
  const { source, findAndReplace } = props

  // Create a regex pattern that matches any of the strings to be replaced
  const pattern = new RegExp(
    `(${findAndReplace.map(([find]) => find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g',
  )

  // Split the string and map parts to either original string or replaced content
  const parts = source.split(pattern)

  return parts.map((part, index) => {
    const key = `${part}-${index}`
    // Check if this part matches any of our replacement keys
    const Replacement = findAndReplace.find(([find]) => find === part)?.[1]

    if (!Replacement) return <React.Fragment key={key}>{part}</React.Fragment>
    if (typeof Replacement === 'function') {
      return <Replacement part={part} key={key} />
    }
    return <React.Fragment key={key}>{Replacement}</React.Fragment>
  })
}
