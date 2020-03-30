import React from 'react'
import { styled } from '@material-ui/core'
import { GQLRowCompanySliderFragment } from '../../generated/graphql'
import { FilestackPicture } from '../FilestackPicture'
import { ImageTypes } from '../PictureResponsive'
import { ScrollSnapSlider } from '../ScrollSnapSlider'

// Using https://cssinjs.org/styled-jss?v=v2.2.3#default-styled-function
const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))

const Slide = styled(FilestackPicture)({
  // width: '225px',
})

const RowCompanySlider: React.FC<GQLRowCompanySliderFragment> = ({ companies }) => {
  return (
    <Container>
      <ScrollSnapSlider>
        {companies.map(company => (
          <Slide
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
            height={100}
            src={company.logo.url}
            type={(company.logo.mimeType as ImageTypes) ?? 'image/png'}
          />
        ))}
        {companies.map(company => (
          <Slide
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
            height={100}
            src={company.logo.url}
            type={(company.logo.mimeType as ImageTypes) ?? 'image/png'}
          />
        ))}
        {companies.map(company => (
          <Slide
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
            height={100}
            src={company.logo.url}
            type={(company.logo.mimeType as ImageTypes) ?? 'image/png'}
          />
        ))}
        {companies.map(company => (
          <Slide
            key={company.id}
            width={Math.round((company.logo.width! / company.logo.height!) * 100)}
            height={100}
            src={company.logo.url}
            type={(company.logo.mimeType as ImageTypes) ?? 'image/png'}
          />
        ))}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
