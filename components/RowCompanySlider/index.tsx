import React from 'react'
import { ContainerProps, Container, makeStyles, Theme } from '@material-ui/core'
import ScrollSnapSlider, { ScrollSnapSliderProps } from 'components/ScrollSnapSlider'
import Asset from 'components/Asset'
import { vpCalc } from 'components/Theme'

export type RowCompanySliderProps = GQLRowCompanySliderFragment &
  Omit<ContainerProps, 'children'> & {
    slider?: ScrollSnapSliderProps
  }

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      borderBottom: `1px solid rgba(0,0,0,0.05)`,
      marginBottom: theme.spacings.xl,
      paddingTop: theme.spacings.sm,
      paddingBottom: theme.spacings.sm,
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
  const { asset, wrapper, ...containerClasses } = useStyles(props)

  return (
    <div className={wrapper}>
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
    </div>
  )
}

export default RowCompanySlider
