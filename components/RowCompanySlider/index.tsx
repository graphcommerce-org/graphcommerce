import React from 'react'
import { ContainerProps } from '@material-ui/core'
import ScrollSnapSlider from '../ScrollSnapSlider'
import Container from '../Container'
import Asset from '../Asset'

export type RowCompanySliderProps = GQLRowCompanySliderFragment & ContainerProps

const RowCompanySlider: React.FC<GQLRowCompanySliderFragment> = ({
  companies,
  ...containerProps
}) => {
  return (
    <Container {...containerProps}>
      <ScrollSnapSlider>
        {companies.map((company) => {
          if (!company.logo?.width || !company.logo?.height) return null
          return (
            <Asset
              asset={company.logo}
              key={company.id}
              width={Math.round((company.logo.width / company.logo.height) * 100)}
            />
          )
        })}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
