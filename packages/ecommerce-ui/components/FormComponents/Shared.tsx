import { Box, Button, Stack } from '@mui/material'
import { FC, PropsWithChildren } from 'react'
import { ResetFormButton } from './ResetFormButton'

export const BoxMargin: FC<PropsWithChildren> = ({ children }) => (
  <Box sx={{ marginY: 2 }}>{children}</Box>
)

export const SubmitButton: FC = () => (
  <Stack direction='row' spacing={2}>
    <ResetFormButton />
    <Button type='submit' color='primary'>
      {' '}
      Submit
    </Button>
  </Stack>
)
