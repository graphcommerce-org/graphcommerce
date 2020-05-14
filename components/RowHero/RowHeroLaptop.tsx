import React from 'react'
import { makeStyles } from '@material-ui/core'
import DeviceContainerLaptop from 'components/DeviceContainer/Laptop'
import Asset from 'components/Asset'
import RowHero, { RowHeroProps } from '.'

const useStyles = makeStyles(
  {
    h1: { fontWeight: 400 },
    assetArea: { width: '100%', height: 'auto' },
  },
  { name: 'RowHeroLaptop' },
)

const RowHeroLaptop: React.FC<RowHeroProps> = (props) => {
  const { asset } = props
  const { h1, assetArea } = useStyles(props)
  return (
    <RowHero {...props} richTextClasses={{ h1 }}>
      <DeviceContainerLaptop>
        {asset && <Asset asset={asset} className={assetArea} />}
      </DeviceContainerLaptop>
    </RowHero>
  )
}

export default RowHeroLaptop
