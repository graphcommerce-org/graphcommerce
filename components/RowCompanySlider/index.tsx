import React from 'react'
import { ContainerProps, Container, makeStyles, Theme } from '@material-ui/core'
import ScrollSnapSlider, { ScrollSnapSliderProps } from '../ScrollSnapSlider'
import Asset from '../Asset'
import { vpCalc } from '../Theme'

export type RowCompanySliderProps = GQLRowCompanySliderFragment &
  ContainerProps & {
    slider?: ScrollSnapSliderProps
  }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
    asset: {
      width: vpCalc(161, 290),
      height: vpCalc(100, 175),
      objectFit: 'contain',
    },
  }),
  { name: 'RowCompanySlider' },
)

const RowCompanySlider: React.FC<RowCompanySliderProps> = (props) => {
  const { companies, slider, ...containerProps } = props
  const { asset, ...containerClasses } = useStyles(props)

  return (
    <Container {...containerProps} classes={containerClasses}>
      <ScrollSnapSlider {...slider}>
        {companies.map((company) => {
          if (!company.logo?.width || !company.logo?.height) return null
          return (
            <Asset
              className={asset}
              asset={company.logo}
              key={company.id}
              alt={company.name}
              width={173}
            />
          )
        })}
      </ScrollSnapSlider>
    </Container>
  )
}

export default RowCompanySlider
