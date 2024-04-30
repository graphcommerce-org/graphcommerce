import { Typography } from '@mui/material'
import { StoreInfo } from './StoreInfo'
import type { StoreInfoWindowFragment } from './StoreInfoWindow'

type InfoWindowProps = {
  content: StoreInfoWindowFragment
}

export function StoreInfoWindow(props: InfoWindowProps) {
  const { content } = props
  const { city, name, street } = content

  return (
    <>
      <Typography variant='body1' sx={{ fontWeight: '700', lineHeight: '20px' }}>
        {name}
      </Typography>
      <Typography variant='body2' sx={(theme) => ({ fontWeight: '500', mb: theme.spacings.xs })}>
        {street}, {city}
      </Typography>
      <StoreInfo content={content} />
    </>
  )
}
