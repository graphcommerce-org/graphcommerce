import { sxx } from '@graphcommerce/next-ui'
import type { ColumnTwoProps } from '../ColumnTwo/ColumnTwo'
import { ColumnTwo } from '../ColumnTwo/ColumnTwo'

type StyleProps = { nodeLength: boolean }

export type ColumnTwoSpreadProps = StyleProps & ColumnTwoProps

/** @public */
export function ColumnTwoSpread(props: ColumnTwoSpreadProps) {
  const { nodeLength, sx = [], ...colProps } = props
  return (
    <ColumnTwo
      {...colProps}
      className='ColumnTwoSpread'
      sx={sxx(
        (theme) => ({
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr 1fr',
            '& h2, & h3': {
              '&:empty': {
                display: 'block',
                minHeight: 30,
              },
            },
          },
          gridTemplateColumns: '1fr',
          gridTemplateAreas: '"one" "two"',
        }),
        nodeLength
          ? (theme) => ({
              [theme.breakpoints.up('md')]: {
                gridTemplateAreas: '"one one two"',
              },
            })
          : (theme) => ({
              [theme.breakpoints.up('md')]: {
                gridTemplateAreas: '"one two two"',
              },
            }),
        sx,
      )}
    />
  )
}
