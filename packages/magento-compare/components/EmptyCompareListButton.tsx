import { usePageContext, useGo } from '@graphcommerce/framer-next-pages'
import { useMutation } from '@graphcommerce/graphql'
import { LinkOrButton, LinkOrButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Button, ButtonProps } from '@mui/material'
import { DeleteCompareListDocument } from '../graphql/DeleteCompareList.gql'
import { useCompareList } from '../hooks'
import { useClearCurrentCompareListUid } from '../hooks/useClearCurrentCompareListUid'

type EmptyCompareListButtonProps = Omit<LinkOrButtonProps, 'onClick' | 'children'>

export function EmptyCompareListButton(props: EmptyCompareListButtonProps) {
  const { button = {}, link = {} } = props
  const compareList = useCompareList()

  const onCompleted = useClearCurrentCompareListUid()
  const [deleteCompareList] = useMutation(DeleteCompareListDocument, {
    variables: { uid: compareList.data?.compareList?.uid ?? '' },
    onCompleted,
  })
  const { closeSteps } = usePageContext()
  const go = useGo(closeSteps * -1)

  if (!compareList.data?.compareList?.uid) return null

  return (
    <LinkOrButton
      {...props}
      color='secondary'
      button={{
        variant: 'pill',
        ...button,
        sx: [
          {
            whiteSpace: 'nowrap',
          },
          ...(Array.isArray(button.sx) ? button.sx : [button.sx]),
        ],
      }}
      link={{
        ...link,
        sx: [
          {
            whiteSpace: 'nowrap',
          },
          ...(Array.isArray(link.sx) ? link.sx : [link.sx]),
        ],
      }}
      onClick={() => {
        go()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        deleteCompareList()
      }}
    >
      <Trans id='Empty comparelist' />
    </LinkOrButton>
  )
}
