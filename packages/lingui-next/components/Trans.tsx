import { Trans as BaseTrans } from '@lingui/react'
import React from 'react'
import { isElement } from 'react-is'

export function Trans({ children }: { children: React.ReactNode }) {
  const values: Record<string | number, unknown> = {}

  const childs = React.Children.toArray(children)
    .map((child, idx) => {
      if (isElement(child)) {
        let key = child.key ?? idx
        if (typeof child.key === 'string') key = child.key.replace('.$', '')

        values[key] = child
        return `<0>{${key}}</0>`
      }
      return child
    })
    .join('')

  return <BaseTrans id={childs} values={values} />
}
