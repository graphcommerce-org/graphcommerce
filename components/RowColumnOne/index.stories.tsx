import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from '../../lib/apollo'
import RowColumnOne from '.'
import { useGetAllRowColumOneQuery } from '../../generated/apollo'

export default {
  title: 'row|RowColumnOne',
  component: RowColumnOne,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowColumOneQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowColumnOnes.map((props) => <RowColumnOne {...props} key={props.id} />)
}
