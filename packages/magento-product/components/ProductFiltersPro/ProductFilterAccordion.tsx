import { Button, IconSvg, iconChevronDown } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import { useState, ReactNode } from 'react'

type ProductFilterAccordionProps = {
  summary: ReactNode
  details: ReactNode
  renderButton: ReactNode
  onClear: () => void
}

export function ProductFilterAccordion(props: ProductFilterAccordionProps) {
  const { summary, details, onClear, renderButton } = props
  const [open, setOpen] = useState(true)
  const handleChange = () => setOpen(!open)

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

        {onClear && renderButton && (
          <Button
            variant='inline'
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            sx={{
              ml: 1,
              px: 0,
            }}
          >
            <Trans id='Clear' />
          </Button>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>{details}</AccordionDetails>
    </Accordion>
  )
}
