import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetRowPeopleWithTextsQuery, useGetAllPeopleQuery } from 'generated/apollo'
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
  const { data: allPeople } = useGetAllPeopleQuery({ client: initApolloClient() })

  if (!data || !allPeople) return null
  return data.rowPeopleWithTexts.map((props) => (
    <RowPeopleWithText {...props} {...allPeople} key={props.id} />
  ))
}
