/// <reference types="google.maps" />
import { Box, List, ListItemButton, ListItemText, Paper, Popper, Typography } from '@mui/material'

export type AddressAutocompletePopperProps = {
  activeIndex: number
  anchorElement: HTMLElement | null
  listboxId: string
  open: boolean
  predictions: google.maps.places.PlacePrediction[]
  onActiveIndexChange: (index: number) => void
  onSelect: (prediction: google.maps.places.PlacePrediction) => void
}

export function AddressAutocompletePopper({
  activeIndex,
  anchorElement,
  listboxId,
  open,
  predictions,
  onActiveIndexChange,
  onSelect,
}: AddressAutocompletePopperProps) {
  return (
    <Popper
      anchorEl={anchorElement}
      open={open}
      placement='bottom-start'
      sx={(theme) => ({
        width: anchorElement?.offsetWidth,
        zIndex: theme.zIndex.modal + 1,
      })}
    >
      <Paper elevation={8}>
        <List id={listboxId} role='listbox' disablePadding>
          {predictions.map((prediction, index) => (
            <ListItemButton
              id={`${listboxId}-option-${index}`}
              // A session returns unique place IDs, so this is stable within the list.
              key={prediction.placeId}
              role='option'
              aria-selected={index === activeIndex}
              selected={index === activeIndex}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => onActiveIndexChange(index)}
              onClick={() => onSelect(prediction)}
            >
              <ListItemText
                primary={prediction.mainText?.text ?? prediction.text.text}
                secondary={prediction.secondaryText?.text}
                slotProps={{
                  primary: { variant: 'body2' },
                  secondary: { variant: 'body2' },
                }}
              />
            </ListItemButton>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1.25, py: 0.625 }}>
            <Typography
              translate='no'
              sx={{ color: 'text.secondary', typography: 'caption', whiteSpace: 'nowrap' }}
            >
              Google Maps
            </Typography>
          </Box>
        </List>
      </Paper>
    </Popper>
  )
}
