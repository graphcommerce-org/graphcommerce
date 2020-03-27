import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { initApolloClient } from '../../lib/apollo'
import { useGetAllRowHeroVideosQuery } from '../../generated/graphql'
import RowHeroVideo from '.'
import { theme } from '../../layout/FullLayout'

export default {
  title: 'row|RowHeroVideo',
  component: RowHeroVideo,
  decorators: [withKnobs, withMuiTheme({ Default: theme })],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowHeroVideosQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowHeroVideos.map(props => <RowHeroVideo {...props} key={props.id} />)
}
