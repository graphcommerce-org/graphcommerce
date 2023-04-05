import {
  Button,
  iconChevronRight,
  iconCompare,
  IconSvg,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { SetStateAction } from 'react'

export function CompareMessageSnackbar(props: {
  count: number | undefined
  name: string | null | undefined
  displayMessageBar: boolean
  setDisplayMessageBar: (value: SetStateAction<boolean>) => void
}) {
  const { count, name, displayMessageBar, setDisplayMessageBar } = props

  if (count && count > 2) return null

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
      action={
        count && count > 1 ? (
          <Button
            href='/compare'
            id='view-wishlist-button'
            size='medium'
            variant='pill'
            color='secondary'
            startIcon={<IconSvg src={iconCompare} />}
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
