import {
  breakpointVal,
  DateTimeFormat,
  extendableComponent,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten, Typography } from '@mui/material'
import type { CreditMemoFragment } from './CreditMemo.gql'

export type CreditMemoDetailsProps = {
  creditMemo: CreditMemoFragment
  sx?: SxProps<Theme>
}

const componentName = 'CreditMemoDetails'
const parts = [
  'sectionContainer',
  'creditMemoDetailTitle',
  'creditMemoDetailContainer',
  'creditMemoDetailRow',
] as const
const { classes } = extendableComponent(componentName, parts)

export function CreditMemoDetails(props: CreditMemoDetailsProps) {
  const { creditMemo, sx = [] } = props
  const { number, id } = creditMemo

  return (
    <SectionContainer
      labelLeft={<Trans>Credit Memo details</Trans>}
      sx={[
        (theme) => ({
          padding: theme.spacings.sm,
          marginBottom: theme.spacings.md,
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.default
              : lighten(theme.palette.background.default, 0.15),
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '& .SectionHeader-root': {
            mt: 0,
            mb: theme.spacings.xs,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className={classes.creditMemoDetailContainer}
        sx={[
          (theme) => ({
            gridColumnGap: theme.spacings.xxl,
            gridRowGap: theme.spacings.md,
            display: 'grid',
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: '1fr 1fr',
              marginTop: theme.spacings.xxs,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box className={classes.creditMemoDetailRow}>
          <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Credit Memo number</Trans>}
            className={classes.creditMemoDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <Typography>{number}</Typography>
          </SectionContainer>
        </Box>

        <Box className={classes.creditMemoDetailRow}>
          {/* <SectionContainer
            variantLeft='h5'
            labelLeft={<Trans>Credit Memo ID</Trans>}
            className={classes.creditMemoDetailTitle}
            sx={{ '& .SectionHeader-root': { marginTop: 0, paddingBottom: '4px' } }}
          >
            <Typography>{id}</Typography>
          </SectionContainer> */}
        </Box>
      </Box>
    </SectionContainer>
  )
}
