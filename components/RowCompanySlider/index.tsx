import React from 'react'
import ScrollSnapSlider from '../ScrollSnapSlider'
import Container from '../Container'
import Asset from '../Asset'

const RowCompanySlider: React.FC<GQLRowCompanySliderFragment> = ({ companies }) => {
  return (
    <Container>
      <ScrollSnapSlider>
        {companies.map((company) => (
          <Asset
            asset={company.logo}
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
          />
        ))}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
