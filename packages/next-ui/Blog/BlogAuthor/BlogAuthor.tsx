import { Avatar, Box, Chip, SxProps, Theme } from '@mui/material'
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
        sx={(theme) => ({
          borderRadius: '99em',
          height: theme.responsiveTemplate`${[44, 66]}px`,
          '& .MuiChip-label': {
            pl: theme.responsiveTemplate`${[10, 14]}px`,
            pr: theme.responsiveTemplate`${[14, 18]}px`,
          },
          '& .MuiAvatar-root': {
            width: theme.responsiveTemplate`${[28, 44]}px`,
            height: theme.responsiveTemplate`${[28, 44]}px`,
          },
        })}
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
