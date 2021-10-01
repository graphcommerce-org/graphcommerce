import { ContainerProps, styled } from '@mui/material'
import React from 'react'
import ColumnOne from '../ColumnOne'

const Wrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacings.lg,
  marginTop: theme.spacings.lg,
  textAlign: 'center',
  maxWidth: `calc(1050px + calc(${theme.spacings.md} * 2))`,
  margin: `0 auto`,
  position: 'relative',
}))

export default function ColumnOneCentered(props: ContainerProps) {
  const { children } = props

  return (
    <ColumnOne>
      <Wrapper>{children}</Wrapper>
    </ColumnOne>
  )
}
