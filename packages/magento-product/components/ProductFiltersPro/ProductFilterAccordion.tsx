import { breakpointVal, IconSvg, iconChevronDown } from '@graphcommerce/next-ui'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useState, ReactNode } from 'react'

type ProductFilterAccordionProps = {
  summary: ReactNode
  details: ReactNode
}

export function ProductFilterAccordion(props: ProductFilterAccordionProps) {
  const [open, setOpen] = useState<boolean>(true)
  const handleChange = () => setOpen(!open)
  const { summary, details } = props

  return (
    <Accordion
      square
      onChange={handleChange}
      expanded={open}
      variant='outlined'
      sx={{
        backgroundColor: 'transparent ',
        '::before': { display: 'none' },
      }}
    >
      <AccordionSummary
        onClick={(e) => e.preventDefault()}
        expandIcon={<IconSvg src={iconChevronDown} />}
        sx={[
          (theme) => ({
            px: theme.spacings.sm,
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              columnGap: 2,
              justifyContent: 'space-between',
              '& .MuiBox-root': {
                width: '100%',
                '& .SectionHeader-root': {
                  justifyContent: 'space-between',
                  marginBottom: 0,
                  '& .SectionHeader-left': {
                    color: theme.palette.text.primary,
                    fontSize: theme.typography.body1.fontSize,
                  },
                  '& .SectionHeader-right > button': {
                    padding: 0,
                    margin: 0,
                    fontSize: theme.typography.body1.fontSize,
                  },
                },
              },
            },
          }),
          Boolean(open) && {
            '&:hover:not(.Mui-disabled)': {
              cursor: 'default',
            },
          },
        ]}
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.sm })}>{details}</AccordionDetails>
    </Accordion>
  )
}
