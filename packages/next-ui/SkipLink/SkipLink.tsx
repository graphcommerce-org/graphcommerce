import { Trans } from '@lingui/react'
import { Link } from '@mui/material'

export function SkipLink() {
  return (
    <Link
      href='#skip-nav'
      tabIndex={0}
      sx={(theme) => ({
        position: 'absolute',
        top: theme.page.vertical,
        zIndex: '-1',
        marginLeft: theme.page.horizontal,
        padding: theme.spacings.xxs,
        backgroundColor: theme.palette.background.paper,
        border: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        '&:focus': {
          zIndex: 9999,
        },
      })}
    >
      <Trans id='Skip to main content' />
    </Link>
  )
}
