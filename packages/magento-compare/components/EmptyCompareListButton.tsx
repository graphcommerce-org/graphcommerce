import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { useMutation } from '@graphcommerce/graphql'
import type { LinkOrButtonProps } from '@graphcommerce/next-ui'
import { LinkOrButton, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { DeleteCompareListDocument } from '../graphql/DeleteCompareList.gql'
import { useCompareList } from '../hooks'
import { useClearCurrentCompareListUid } from '../hooks/useClearCurrentCompareListUid'

export type EmptyCompareListButtonProps = Omit<LinkOrButtonProps, 'onClick' | 'children'>

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
        sx: sxx({ whiteSpace: 'nowrap' }, button.sx),
      }}
      link={{
        ...link,
        sx: sxx({ whiteSpace: 'nowrap' }, link.sx),
      }}
      onClick={() => {
        go()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        deleteCompareList()
      }}
    >
      <Trans>Empty comparelist</Trans>
    </LinkOrButton>
  )
}
