import { Button, IconSvg, MessageSnackbar, iconChevronRight } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { SetStateAction } from 'react'

export type CompareMessageSnackbarProps = {
  count: number | undefined
  name: string | null | undefined
  displayMessageBar: boolean
  setDisplayMessageBar: (value: SetStateAction<boolean>) => void
}

export function CompareMessageSnackbar(props: CompareMessageSnackbarProps) {
  const { count, name, displayMessageBar, setDisplayMessageBar } = props

  return (
    <MessageSnackbar
      open={displayMessageBar}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.stopPropagation()
      }}
      onClose={() => {
        setDisplayMessageBar(false)
      }}
      variant='pill'
      severity='success'
      action={
        count && count > 1 ? (
          <Button
            href='/compare'
            id='view-wishlist-button'
            size='medium'
            variant='pill'
            color='secondary'
            fullWidth
            endIcon={<IconSvg src={iconChevronRight} />}
          >
            <Trans id='View comparison' />
          </Button>
        ) : null
      }
    >
      <>
        <Trans
          id='<0>{name}</0> has been added to your comparison!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
        {count === 1 ? (
          <>
            {' '}
            <Trans id='Add another product to start comparing.' />
          </>
        ) : null}
      </>
    </MessageSnackbar>
  )
}
