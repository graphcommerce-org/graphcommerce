import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowGoogleMapQuery } from 'generated/apollo'
import RowGoogleMap from '.'

export default {
  title: 'row|RowGoogleMap',
  component: RowGoogleMap,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowGoogleMapQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowGoogleMap.map((props) => <RowGoogleMap {...props} key={props.id} />)
}
