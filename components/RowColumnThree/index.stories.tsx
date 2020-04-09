import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from '../../lib/apollo'
import RowColumnThree from '.'
import { useGetAllRowColumThreeQuery } from '../../generated/apollo'

export default {
  title: 'row|RowColumnThree',
  component: RowColumnThree,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowColumThreeQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowColumnThrees.map((props) => <RowColumnThree {...props} key={props.id} />)
}
