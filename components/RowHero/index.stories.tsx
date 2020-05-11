import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowHeroQuery } from 'generated/apollo'
import RowHero from '.'

export default {
  title: 'row|RowHero',
  component: RowHero,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowHeroQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowHeroes.map((props) => <RowHero {...props} key={props.id} />)
}
