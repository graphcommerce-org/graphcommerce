import { Trans } from '@lingui/react'
import { Badge, Button } from '@mui/material'

export function FallbackCompareButton() {
  return (
    <Badge color='primary'>
      <Button sx={{ color: 'red' }}>
        <Trans id='Compare' />
      </Button>
    </Badge>
  )
}
