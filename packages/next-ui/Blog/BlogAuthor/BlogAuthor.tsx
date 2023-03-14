import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { SxProps, Theme } from '@mui/material/styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { useDateTimeFormat } from '../../hooks'

export type BlogAuthorProps = {
  author: string
  date: string
  sx?: SxProps<Theme>
}

export function BlogAuthor(props: BlogAuthorProps) {
  const { author, date, sx = [] } = props

  const formatter = useDateTimeFormat({ month: 'long', day: 'numeric' })

  return (
    <Box
      maxWidth='md'
      sx={[
        {
          display: 'flex',
          justifyContent: 'left',
          margin: `0 auto`,
          marginBottom: (theme) => theme.spacings.md,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Chip
        sx={{
          borderRadius: '99em',
          height: responsiveVal(44, 66),
          '& .MuiChip-label': {
            paddingLeft: responsiveVal(10, 14),
            paddingRight: responsiveVal(14, 18),
          },
          '& .MuiAvatar-root': {
            width: responsiveVal(28, 44),
            height: responsiveVal(28, 44),
          },
        }}
        variant='outlined'
        size='medium'
        avatar={<Avatar>{author.charAt(0).toUpperCase()}</Avatar>}
        label={
          <section>
            <Box slot='Author' sx={{ lineHeight: 1.4 }}>
              {author}
            </Box>
            <Box sx={(theme) => ({ lineHeight: 1.4, color: theme.palette.text.disabled })}>
              {formatter.format(new Date(date))}
            </Box>
          </section>
        }
      />
    </Box>
  )
}
