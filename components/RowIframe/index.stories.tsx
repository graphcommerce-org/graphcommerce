import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowIframesQuery } from 'generated/apollo'
import RowIframe from '.'

export default {
  title: 'row|RowIframe',
  component: RowIframe,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowIframesQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowIframes.map((props) => <RowIframe {...props} key={props.id} />)
}
