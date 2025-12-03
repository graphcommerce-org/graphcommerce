import {
  breakpointVal,
  DateTimeFormat,
  extendableComponent,
  lightenColor,
  SectionContainer,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, Typography } from '@mui/material'
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
      sx={sxx(
        (theme) => ({
          padding: theme.spacings.sm,
          marginBottom: theme.spacings.md,
          background: lightenColor(theme.vars.palette.background.default, 0.15),
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
          ...theme.applyStyles('light', {
            background: theme.vars.palette.background.default,
          }),
        }),
        sx,
      )}
    >
      <Box
        className={classes.creditMemoDetailContainer}
        sx={sxx(
          (theme) => ({
            gridColumnGap: theme.spacings.xxl,
            gridRowGap: theme.spacings.md,
            display: 'grid',
            [theme.breakpoints.up('sm')]: {
              gridTemplateColumns: '1fr 1fr',
              marginTop: theme.spacings.xxs,
            },
          }),
          sx,
        )}
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
