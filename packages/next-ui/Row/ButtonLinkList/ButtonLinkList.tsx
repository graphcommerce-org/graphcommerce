import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { Row } from '..'
import { SectionContainer } from '../../SectionContainer'
import { extendableComponent } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'

export type ButtonLinkListProps = {
  title: string
  children: React.ReactNode
  sx?: SxProps<Theme>
} & OwnerState

type OwnerState = { containsBigLinks: boolean }

const compName = 'ButtonLinkList' as const
const parts = ['root', 'links'] as const
const { withState } = extendableComponent<OwnerState, typeof compName, typeof parts>(
  compName,
  parts,
)

export function ButtonLinkList(props: ButtonLinkListProps) {
  const { title, children, containsBigLinks, sx = [] } = props

  const classes = withState({ containsBigLinks })

  return (
    <Row
      maxWidth='md'
      className={classes.root}
      sx={[{ maxWidth: 820 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <SectionContainer labelLeft={title}>
        <Box
          className={classes.links}
          sx={(theme) => ({
            display: 'grid',
            columnGap: theme.spacings.sm,
            '&:not(.containsBigLinks)': {
              gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(210, 350)}, 1fr))`,
            },
          })}
        >
          {children}
        </Box>
      </SectionContainer>
    </Row>
  )
}
