import { Box } from '@mui/material'

export default function MDXWrapper({ children }) {
  return (
    <Box
      sx={(theme) => ({
        overflow: 'hidden',
        '& h1': {
          marginTop: 0,
        },
        '& *': {
          wordBreak: 'break-word',
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
        },
        '& pre': {
          background: theme.palette.background.image,
          display: 'inline-block',
          padding: '20px',
          maxWidth: '100%',
        },
      })}
    >
      {children}
    </Box>
  )
}
