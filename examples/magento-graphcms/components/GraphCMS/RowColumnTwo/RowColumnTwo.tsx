import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnTwo } from '@graphcommerce/next-ui'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowColumnTwoProps = { colOne: { raw: any }; colTwo: { raw: any } }

export function RowColumnTwo(props: RowColumnTwoProps) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwo colOneContent={<RichText {...colOne} />} colTwoContent={<RichText {...colTwo} />} />
  )
}
