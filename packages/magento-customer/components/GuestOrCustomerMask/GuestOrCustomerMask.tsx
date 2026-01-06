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

  // When not masking, we know the actual state - render directly without CSS hiding
  if (!mask) return <>{loggedIn ? loggedInContent : loggedOutContent}</>

  return (
    <>
      {loggedOutContent && (
        <Box sx={{ display: 'contents', [cssFlag('private-query')]: { display: 'none' } }}>
          {loggedOutContent}
        </Box>
      )}
      <Box sx={{ display: 'contents', [cssNotFlag('private-query')]: { display: 'none' } }}>
        {skeleton}
      </Box>
    </>
  )
}
