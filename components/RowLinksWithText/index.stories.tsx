import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowLinksWithTextsQuery } from 'generated/apollo'
import RowLinksWithText from '.'

export default {
  title: 'row|RowColumnTwo',
  component: RowLinksWithText,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowLinksWithTextsQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowLinksWithTexts.map((props) => <RowLinksWithText {...props} key={props.id} />)
}
