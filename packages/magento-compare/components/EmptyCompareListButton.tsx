import { usePageContext, useGo } from '@graphcommerce/framer-next-pages'
import { useMutation } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
import { Button } from '@mui/material'
import { DeleteCompareListDocument } from '../graphql/DeleteCompareList.gql'
import { useClearCurrentCompareListUid } from '../hooks/useClearCurrentCompareListUid'

export function EmptyCompareListButton(props: { compareListUid: string }) {
  const { compareListUid } = props

  const onCompleted = useClearCurrentCompareListUid()
  const [deleteCompareList] = useMutation(DeleteCompareListDocument, {
    variables: { uid: compareListUid },
    onCompleted,
  })
  const { closeSteps } = usePageContext()
  const go = useGo(closeSteps * -1)

  return (
    <Button
      variant='pill'
      sx={{ whiteSpace: 'nowrap' }}
      onClick={() => {
        go()

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        deleteCompareList()
      }}
    >
      <Trans id='Empty comparelist' />
    </Button>
  )
}
