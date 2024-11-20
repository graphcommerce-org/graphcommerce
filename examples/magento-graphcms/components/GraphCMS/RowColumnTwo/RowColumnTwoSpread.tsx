import { getNodeLength, RichText } from '@graphcommerce/hygraph-ui'
import { ElementOrTextNode } from '@graphcommerce/hygraph-ui/components/RichText/types'
import { ColumnTwoSpread } from '@graphcommerce/next-ui'
import { RowColumnTwoFragment } from './RowColumnTwo.gql'

const getColumnCount = (props: RowColumnTwoFragment, columnId: number) => {
  const colOneLength = getNodeLength(props.colOne.raw as ElementOrTextNode)
  const colTwoLength = getNodeLength(props.colTwo.raw as ElementOrTextNode)

  if (colOneLength >= colTwoLength && columnId === 1) return 2
  if (colOneLength >= colTwoLength && columnId === 2) return 1
  if (colOneLength < colTwoLength && columnId === 1) return 1
  if (colOneLength < colTwoLength && columnId === 2) return 2
  return 1
}

export function RowColumnTwoSpread(props: RowColumnTwoFragment) {
  const { colOne, colTwo } = props

  return (
    <ColumnTwoSpread
      {...props}
      nodeLength={
        getNodeLength(colOne.raw as ElementOrTextNode) >=
        getNodeLength(colTwo.raw as ElementOrTextNode)
      }
      colOneContent={
        <RichText
          {...colOne}
          sxRenderer={{
            paragraph: (theme) => ({
              columnCount: { xs: 1, md: getColumnCount(props, 1) },
              columnGap: theme.spacings.md,
            }),
          }}
        />
      }
      colTwoContent={
        <RichText
          {...colTwo}
          sxRenderer={{
            paragraph: (theme) => ({
              columnCount: { xs: 1, md: getColumnCount(props, 2) },
              columnGap: theme.spacings.md,
            }),
          }}
        />
      }
    />
  )
}
