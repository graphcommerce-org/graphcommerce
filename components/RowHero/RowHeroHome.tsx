import React from 'react'
import { makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'
import logoReachBgShadow from './logo-reach-bg-shadow-secondary.svg'
import RowHero, { RowHeroProps } from '.'

const useStyles = makeStyles(
  {
    triangleRoot: {
      background: `url(${logoReachBgShadow}) no-repeat bottom right`,
      backgroundSize: vpCalc(200, 1200),
    },
    h1: { fontWeight: 400 },
  },
  { name: 'RowHeroHome' },
)

const RowHeroHome: React.FC<RowHeroProps> = (props) => {
  const { triangleRoot, h1 } = useStyles()
  return (
    <RowHero
      {...props}
      triangleBgProps={{ classes: { root: triangleRoot } }}
      richTextClasses={{ h1 }}
    />
  )
}

export default RowHeroHome
