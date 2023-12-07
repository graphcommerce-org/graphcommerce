import { RichText } from '@graphcommerce/graphcms-ui'
import { ColumnThree } from '@graphcommerce/next-ui'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RowColumnThreeProps = { colOne: { raw: any }; colTwo: { raw: any }; colThree: { raw: any } }

export function RowColumnThree(props: RowColumnThreeProps) {
  const { colOne, colTwo, colThree } = props

  return (
    <ColumnThree
      colOneContent={<RichText {...colOne} />}
      colTwoContent={<RichText {...colTwo} />}
      colThreeContent={<RichText {...colThree} />}
    />
  )
}
