import { Image, ImageProps } from '@graphcommerce/image'
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { IconSvg } from '../IconSvg'
import ellypsisVertical from '../icons/ellypsis-vertical.svg'

type ActionableCardProps = {
  image?: ImageProps

  price?: React.ReactNode

  actions?: React.ReactNode[]
}

function ActionableCardAction(props: {}) {}

function ActionableCardMenu(props: { actions: React.ReactNode[] }) {
  const { actions } = props
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleClick}>
        <IconSvg src={ellypsisVertical} sx={{ fill: 'currentColor' }} />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {actions.map((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MenuItem key={index} onClick={handleClose}>
            {action}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export function ActionableCard(props: ActionableCardProps) {
  const { image, price, actions } = props

  const isActionMenu = React.Children.count(actions) > 1

  return (
    <Box>
      {image && <Image {...image} />}
      hoi
      {price && <Typography variant='h6'>{price}</Typography>}
    </Box>
  )
}
