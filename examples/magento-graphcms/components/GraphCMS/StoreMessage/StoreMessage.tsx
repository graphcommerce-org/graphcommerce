import { Box, SxProps, Theme } from '@mui/material'
import { RowColumnOne } from '../RowColumnOne/RowColumnOne'
import { RowColumnOneFragment } from '../RowColumnOne/RowColumnOne.gql'

type Props = {
  sx?: SxProps<Theme>
  content: RowColumnOneFragment
}

export function StoreMessage(props: Props) {
  const { sx = [], content } = props

  if (!content) return null

  return (
    <Box
      sx={[
        (theme) => ({
          backgroundColor: `${theme.palette.primary.dark}`,
          '& .MuiContainer-root': {
            marginBottom: 0,
            color: `${theme.palette.primary.contrastText}`,
            textAlign: 'center',
            paddingTop: `calc(${theme.spacings.xs} * 0.5)`,
            paddingBottom: `calc(${theme.spacings.xs} * 0.5)`,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <RowColumnOne {...content} />
    </Box>
  )
}
