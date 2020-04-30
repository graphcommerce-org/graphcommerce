import React from 'react'
import { ContainerProps, Container } from '@material-ui/core'
import ScrollSnapSlider, { ScrollSnapSliderProps } from '../ScrollSnapSlider'
import Asset from '../Asset'

export type RowCompanySliderProps = GQLRowCompanySliderFragment &
  ContainerProps & {
    slider?: ScrollSnapSliderProps
  }

const RowCompanySlider: React.FC<RowCompanySliderProps> = ({
  companies,
  slider,
  ...containerProps
}) => {
  return (
    <Container {...containerProps}>
      <ScrollSnapSlider {...slider}>
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
