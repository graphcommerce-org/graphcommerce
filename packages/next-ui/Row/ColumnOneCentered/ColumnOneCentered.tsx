import { ContainerProps, styled } from '@mui/material'
import { ColumnOne } from '../ColumnOne/ColumnOne'

const Wrapper = styled('div')(({ theme }) =>
  theme.unstable_sx({
    marginBottom: theme.spacings.lg,
    marginTop: theme.spacings.lg,
    textAlign: 'center',
    maxWidth: theme.rv`calc(1050px + calc(${theme.spacings.md} * 2))`,
    margin: `0 auto`,
    position: 'relative',
  }),
)

export function ColumnOneCentered(props: ContainerProps) {
  const { children } = props

  return (
    <ColumnOne>
      <Wrapper>{children}</Wrapper>
    </ColumnOne>
  )
}
