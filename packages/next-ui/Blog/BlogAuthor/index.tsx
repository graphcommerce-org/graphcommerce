import { Avatar, Box, Chip, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { responsiveVal } from '../../Styles/responsiveVal'

export type BlogAuthorProps = {
  author: string
  date: string
  sx?: SxProps<Theme>
}

export function BlogAuthor(props: BlogAuthorProps) {
  const { author, date, sx = [] } = props

  const { locale } = useRouter()
  const formatter = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric' }),
    [locale],
  )

  return (
    <Box
      sx={[
        {
          display: 'flex',
          justifyContent: 'left',
          maxWidth: 800,
          margin: `0 auto`,
          marginBottom: (theme) => theme.spacings.md,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Chip
        sx={{
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
