import React from 'react'
import FilestackPicture from '../FilestackPicture'
import { MimeTypes } from '../PictureResponsive'
import ScrollSnapSlider from '../ScrollSnapSlider'
import Container from '../Container'

const RowCompanySlider: React.FC<GQLRowCompanySliderFragment> = ({ companies }) => {
  return (
    <Container>
      <ScrollSnapSlider>
        {companies.map((company) => (
          <FilestackPicture
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
            height={100}
            src={company.logo.url}
            type={(company.logo.mimeType as MimeTypes) ?? 'image/png'}
          />
        ))}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
