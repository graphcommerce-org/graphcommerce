import { Trans } from '@lingui/react'
import { Box, Button, Checkbox } from '@mui/material'

export function FallbackCompareButton() {
  return (
    <Box>
      <Button
        variant='contained'
        onMouseDown={(e) => e.stopPropagation()}
        startIcon={<Checkbox checked={false} />}
      >
        <Trans id='Compare' />
      </Button>
    </Box>
  )
}
