import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowHeroQuery } from 'generated/apollo'
import RowHeroHome from './RowHeroHome'

export default {
  title: 'row|RowHeroHome',
  component: RowHeroHome,
  decorators: [withKnobs],
}

export const GraphCMS: React.FC = () => {
  const { data } = useGetAllRowHeroQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return (
    <>
      {data.rowHeroes.map((props) => (
        <RowHeroHome {...props} key={props.id} />
      ))}
    </>
  )
}
