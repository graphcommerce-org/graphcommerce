import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import { initApolloClient } from '../../lib/apollo'
import { useGetAllRowHeroVideosQuery } from '../../generated/graphql'
import RowHeroVideo from '.'

export default {
  title: 'row|RowHeroVideo',
  component: RowHeroVideo,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowHeroVideosQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowHeroVideos.map((props) => <RowHeroVideo {...props} key={props.id} />)
}
