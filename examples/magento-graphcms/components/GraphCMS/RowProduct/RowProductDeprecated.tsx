import { Box } from '@mui/material'
import { RowProductFragment } from './graphql/RowProduct.gql'

export function RowProductDeprecated(props: RowProductFragment) {
  const { variant, identity } = props
  return process.env.NODE_ENV === 'development' ? (
    <Box
      sx={(theme) => ({
        p: 2,
        m: 3,
        border: `3px dashed ${theme.palette.error.light}`,
        borderRadius: 2,
      })}
    >
      RowProduct with identity ‘{identity}’ and variant ‘{variant}’, should be migrated in Hygraph
      to a RowCategory component.
    </Box>
  ) : null
}
