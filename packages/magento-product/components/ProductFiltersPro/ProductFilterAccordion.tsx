import { IconSvg, iconChevronDown } from '@graphcommerce/next-ui'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useState, ReactNode } from 'react'

type ProductFilterAccordionProps = {
  summary: ReactNode
  details: ReactNode
}

export function ProductFilterAccordion(props: ProductFilterAccordionProps) {
  const [open, setOpen] = useState(true)
  const handleChange = () => setOpen(!open)
  const { summary, details } = props

  return (
    <Accordion
      square
      onChange={handleChange}
      expanded={open}
      variant='outlined'
      sx={(theme) => ({
        backgroundColor: 'transparent ',
        '&.Mui-expanded': { my: 0 },
        '::before': { display: 'none' },
        border: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={<IconSvg src={iconChevronDown} />}
        sx={[
          (theme) => ({
            px: theme.spacings.xxs,
          }),
        ]}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.sm })}>{details}</AccordionDetails>
    </Accordion>
  )
}
