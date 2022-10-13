import { IconSvg } from '@graphcommerce/next-ui'
import iconControls from '@graphcommerce/next-ui/icons/controls.svg'
import iconRefresh from '@graphcommerce/next-ui/icons/refresh.svg'
import { Trans } from '@lingui/react'
import { Chip } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useFilterActions } from '../ProductListFilters/helpers/filterActions'

type ProductListActionsProps = {
  showAll: boolean
  setShowAll: Dispatch<SetStateAction<boolean>>
}

export function ProductListActions(props: ProductListActionsProps) {
  const { showAll, setShowAll } = props
  const { clearAllFilters } = useFilterActions({})

  const actions = {
    show_all: {
      label: !showAll ? <Trans id='Show all' /> : <Trans id='Show less' />,
      icon: <IconSvg src={iconControls} size='large' />,
      onClick: () => setShowAll(!showAll),
    },
    reset: {
      label: <Trans id='Reset' />,
      icon: <IconSvg src={iconRefresh} size='large' />,
      onClick: () => clearAllFilters(),
    },
  }

  return (
    <>
      {Object.keys(actions).map((action) => (
        <Chip
          component='button'
          size='responsive'
          clickable
          icon={actions[action].icon}
          label={actions[action].label}
          sx={{
            '& .MuiChip-icon': {
              fontSize: '20px',
            },
          }}
          onClick={actions[action].onClick}
        />
      ))}
    </>
  )
}
