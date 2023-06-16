import { Accordion, AccordionSummary, AccordionDetails, SxProps, Theme } from '@mui/material'
import { useState, ReactNode } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown } from '../icons'

export type ActionCardAccordionProps = {
  summary: ReactNode
  details: ReactNode
  right: ReactNode
  sx?: SxProps<Theme>
}

export function ActionCardAccordion(props: ActionCardAccordionProps) {
  const { summary, details, right, sx } = props
  const [open, setOpen] = useState(true)
  const handleChange = () => setOpen(!open)

  return (
    <Accordion
      square
      onChange={handleChange}
      expanded={open}
      variant='outlined'
      disableGutters
      sx={[
        (theme) => ({
          backgroundColor: 'transparent ',
          '&.Mui-expanded': { my: 0 },
          '::before': { display: 'none' },
          border: 'none',
          '&:not(.Mui-expanded)': { borderBottom: `1px solid ${theme.palette.divider}` },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={<IconSvg src={iconChevronDown} />}
        sx={{
          px: 0,
          typography: 'h6',
          minHeight: 54,
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 0,
          },
        }}
      >
        <div>{summary}</div>
        {right}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>{details}</AccordionDetails>
    </Accordion>
  )
}
