import { Button, MessageSnackbar } from '@graphcommerce/next-ui'
import { IconSvg } from '@graphcommerce/next-ui/IconSvg'
import { iconClose } from '@graphcommerce/next-ui/icons'
import { Box, NoSsr, SxProps, Theme } from '@mui/material'
import { useState } from 'react'
import { RowColumnOne } from '../RowColumnOne/RowColumnOne'
import { StoreMessageFragment } from './StoreMessage.gql'
import { Trans } from '@lingui/react'

type Props = {
  content: StoreMessageFragment['storeMessage']
  sx?: SxProps<Theme>
  closeIcon?: React.ReactNode
  dismissable?: boolean
  storageType?: 'sessionStorage' /* | 'localStorage'*/
}

export function StoreMessage(props: Props) {
  const { content, sx = [], closeIcon, dismissable = false, storageType = 'sessionStorage' } = props

  const storage = globalThis[storageType]
  const [visible, setVisible] = useState<boolean>(
    dismissable ? storage?.[`store_message_${content?.id}_hidden`] !== '1' : true,
  )

  if (!content) return null

  const msg = (
    <>
      <MessageSnackbar open variant='pill' anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Trans id='You have been successfully subscribed to our newsletter.' />
      </MessageSnackbar>
      <Box
        sx={[
          (theme) => ({
            backgroundColor: `${theme.palette.primary.dark}`,
            '& .MuiContainer-root': {
              marginBottom: 0,
              color: `${theme.palette.primary.contrastText}`,
              textAlign: 'center',
              paddingTop: `calc(${theme.spacings.xs} * 0.5)`,
              paddingBottom: `calc(${theme.spacings.xs} * 0.5)`,
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <RowColumnOne {...content} />
        {dismissable && (
          <Button
            onClick={() => {
              setVisible(false)
              storage[`store_message_${content.id}_hidden`] = 1
            }}
          >
            {closeIcon || <IconSvg src={iconClose} size='large' />}
          </Button>
        )}
      </Box>
    </>
  )

  if (!dismissable) return msg
  return <NoSsr>{visible && msg}</NoSsr>
}
