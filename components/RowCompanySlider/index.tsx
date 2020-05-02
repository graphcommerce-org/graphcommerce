import React from 'react'
import { ContainerProps, Container, makeStyles } from '@material-ui/core'
import ScrollSnapSlider, { ScrollSnapSliderProps } from '../ScrollSnapSlider'
import Asset from '../Asset'
import { vpCalc } from '../Theme'

export type RowCompanySliderProps = GQLRowCompanySliderFragment &
  ContainerProps & {
    slider?: ScrollSnapSliderProps
  }

const useStyles = makeStyles(
  {
    asset: {
      width: vpCalc(161, 290),
      height: vpCalc(100, 175),
      objectFit: 'contain',
    },
  },
  { name: 'RowCompanySlider' },
)

const RowCompanySlider: React.FC<RowCompanySliderProps> = ({
  companies,
  slider,
  ...containerProps
}) => {
  const classes = useStyles()

  return (
    <Container {...containerProps}>
      <ScrollSnapSlider {...slider}>
        {companies.map((company) => {
          if (!company.logo?.width || !company.logo?.height) return null
          return (
            <Asset
              className={classes.asset}
              asset={company.logo}
              key={company.id}
              alt={company.name}
              width={Math.round((company.logo.width / company.logo.height) * 100)}
            />
          )
        })}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
