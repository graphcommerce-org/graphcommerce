import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
import initApolloClient from 'lib/apollo'
import { useGetAllRowContactQuery } from 'generated/apollo'
import RowContact from '.'

export default {
  title: 'row|RowContact',
  component: RowContact,
  decorators: [withKnobs],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowContactQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowContacts.map((props) => <RowContact {...props} key={props.id} />)
}
