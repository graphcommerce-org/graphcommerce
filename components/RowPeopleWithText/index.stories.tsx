import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from '../../lib/apollo'
import { useGetRowPeopleWithTextsQuery } from '../../generated/graphql'
import RowPeopleWithText from '.'

export default {
  title: 'row|RowPeopleWithText',
  component: RowPeopleWithText,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetRowPeopleWithTextsQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowPeopleWithTexts.map((props) => <RowPeopleWithText {...props} key={props.id} />)
}
