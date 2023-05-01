import { Box, Container } from '@mui/material'

type CompareListIntroTextProps = {
  children: React.ReactNode
}

export function CompareListIntroText({ children }: CompareListIntroTextProps) {
  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        textAlign: 'center',
        paddingBottom: 2,
        background: theme.palette.background.paper,
        zIndex: 11,
      })}
    >
      <Container>{children}</Container>
    </Box>
  )
}
