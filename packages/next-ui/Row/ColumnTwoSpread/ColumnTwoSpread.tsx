import { ColumnTwo, ColumnTwoProps } from '../ColumnTwo/ColumnTwo'

type StyleProps = { nodeLength: boolean }

export type ColumnTwoSpreadProps = StyleProps & ColumnTwoProps

/**
 * @deprecated
 */

export function ColumnTwoSpread(props: ColumnTwoSpreadProps) {
  const { nodeLength, sx = [], ...colProps } = props
  return (
    <ColumnTwo
      {...colProps}
      className='ColumnTwoSpread'
      sx={[
        (theme) => ({
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: `1fr 1fr 1fr`,
            gridTemplateAreas: nodeLength ? `"one one two"` : `"one two two"`,
            '& h2, & h3': {
              '&:empty': {
                display: 'block',
                minHeight: 30,
              },
            },
          },
          gridTemplateColumns: `1fr`,
          gridTemplateAreas: `"one" "two"`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
