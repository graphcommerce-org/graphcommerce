import { usePrivateQueryMask } from '@graphcommerce/graphql'
import { cssFlag, cssNotFlag } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useCustomerSession } from '../../hooks/useCustomerSession'

export type CustomerGuestMaskProps = {
  /** Allowed to pass null */
  loggedOut: React.ReactNode
  /** Allowed to pass null */
  loggedIn: React.ReactNode
  /** Allowed to pass null */
  skeleton: React.ReactNode
}

export function GuestOrCustomerMask(props: CustomerGuestMaskProps) {
  const { loggedOut: loggedOutContent, loggedIn: loggedInContent, skeleton } = props
  const { mask } = usePrivateQueryMask()
  const { loggedIn } = useCustomerSession()

  return (
    <>
      {mask && loggedOutContent && (
        <Box
          sx={{
            display: 'contents',
            '&:empty': { display: 'none' },
            [cssFlag('private-query')]: { display: 'none' },
          }}
        >
          {loggedOutContent}
        </Box>
      )}
      <Box
        sx={{
          display: 'contents',
          '&:empty': { display: 'none' },
          [cssNotFlag('private-query')]: { display: 'none' },
        }}
      >
        {mask ? skeleton : loggedIn ? loggedInContent : loggedOutContent}
      </Box>
    </>
  )
}
