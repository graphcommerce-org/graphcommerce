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
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          textAlign: 'center',
          padding: '2px 0 3px',
          '& a': {
            color: theme.palette.primary.contrastText,
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none',
            },
          },
          '& .MuiContainer-root': {
            marginBottom: 0,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <RowColumnOne {...content} />
    </Box>
  )
}
