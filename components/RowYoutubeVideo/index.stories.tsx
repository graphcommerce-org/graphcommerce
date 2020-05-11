import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowYoutubeVideosQuery } from 'generated/apollo'
import RowYoutubeVideo from '.'

export default {
  title: 'row|RowYoutubeVideo',
  component: RowYoutubeVideo,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowYoutubeVideosQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowYoutubeVideos.map((props) => <RowYoutubeVideo {...props} key={props.videoId} />)
}
