import type { SxProps, Theme } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { IconSvg } from '../IconSvg'
import { iconChevronDown } from '../icons'

export type ActionCardAccordionProps = {
  summary: ReactNode
  details: ReactNode
  right: ReactNode
  sx?: SxProps<Theme>
  defaultExpanded?: boolean
}

export function ActionCardAccordion(props: ActionCardAccordionProps) {
  const { summary, details, right, defaultExpanded = true, sx } = props
  const [expanded, setExpanded] = useState(defaultExpanded)
  const handleChange = () => setExpanded(!expanded)

  return (
    <Accordion
      square
      onChange={handleChange}
      expanded={expanded}
      variant='outlined'
      disableGutters
      sx={[
        (theme) => ({
          backgroundColor: 'transparent ',
          '&.Mui-expanded': { my: 0 },
          '::before': { display: 'none' },
          border: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
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
          typography: 'subtitle1',
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
