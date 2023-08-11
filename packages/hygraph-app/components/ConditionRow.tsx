import { Typography, Box } from '@mui/material'

const backgroundColors = {
  and_1: '#757de8',
  and_2: '#002984',
  buffer: '#f44336',
}

export function ConditionRow(props) {
  const { condition, index, type } = props

  let backgroundColor
  if (type === 'buffer') {
    backgroundColor = backgroundColors.buffer
  }
  if (type === 'and') {
    if (index % 2 === 0) {
      backgroundColor = backgroundColors.and_1
    } else {
      backgroundColor = backgroundColors.and_2
    }
  }

  return (
    <>
      <Typography
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          pr: theme.spacings.xs,
          py: theme.spacings.xxs,
          position: 'relative',
        })}
      >
        <Box
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '0',
              left: '-10px',
              transform: 'translateX(-50%)',
              width: '10px',
              height: '100%',
              backgroundColor,
            },
          }}
        />
        {condition.property}
      </Typography>
      <Typography
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          pr: theme.spacings.xs,
          py: theme.spacings.xxs,
        })}
      >
        {condition.operator ?? 'N/A'}
      </Typography>
      <Typography
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          pr: theme.spacings.xs,
          py: theme.spacings.xxs,
        })}
      >
        {condition.value}
      </Typography>
    </>
  )
}
