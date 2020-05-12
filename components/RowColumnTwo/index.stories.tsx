import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowColumTwoQuery } from 'generated/apollo'
import RowColumnTwo from '.'

export default {
  title: 'row|RowColumnTwo',
  component: RowColumnTwo,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowColumTwoQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowColumnTwos.map((props) => <RowColumnTwo {...props} key={props.id} />)
}
