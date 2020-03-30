import React from 'react'
import { number, withKnobs } from '@storybook/addon-knobs'
// @ts-ignore
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { initApolloClient } from '../../lib/apollo'
import { useGetAllRowCompanySlidersQuery } from '../../generated/graphql'
import { theme } from '../../layout/FullLayout'
import RowCompanySlider from '.'

export default {
  title: 'row|RowCompanySlider',
  component: RowCompanySlider,
  decorators: [withKnobs, withMuiTheme({ Default: theme })],
}

export const GraphCMS = () => {
  const { data } = useGetAllRowCompanySlidersQuery({
    client: initApolloClient(),
    variables: { skip: number('GraphCMS Entry #', 0) },
  })
  if (!data) return null
  return data.rowCompanySliders.map(props => <RowCompanySlider {...props} key={props.id} />)
}
