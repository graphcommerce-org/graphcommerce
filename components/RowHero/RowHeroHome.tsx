import React from 'react'
import { makeStyles } from '@material-ui/core'
import logoReachBgShadow from './logo-reach-bg-shadow-secondary.svg'
import RowHero, { RowHeroProps } from '.'
import { vpCalc } from '../Theme'

const useStyles = makeStyles(
  {
    triangleRoot: {
      background: `url(${logoReachBgShadow}) no-repeat bottom right`,
      backgroundSize: vpCalc(200, 1200),
    },
  },
  { name: 'RowHeroHome' },
)

const RowHeroHome: React.FC<RowHeroProps> = (props) => {
  const { triangleRoot } = useStyles()
  return <RowHero {...props} triangleBgProps={{ classes: { root: triangleRoot } }} />
}

export default RowHeroHome
