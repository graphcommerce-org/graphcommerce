import React, { forwardRef } from 'react'
import type makeUrl from '@magento/venia-ui/lib/util/makeUrl'
import NextLink from 'next/link'
import type * as ReactRouterDom from 'react-router-dom'

export {
  Redirect,
  Route,
  Switch,
  withRouter,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
export { connect } from 'react-redux'

export const resourceUrl: typeof makeUrl = (url, options) => {
  if (!options) return url
  return new URL(url, process.env.MAGENTO_BACKEND_URL).toString()
}

export const Link: ReactRouterDom.Link = forwardRef(
  ({ component, to, replace, children, ...aProps }, ref) => {
    return (
      <NextLink href={to.toString()} replace={replace}>
        <a ref={ref} {...aProps}>
          {children}
        </a>
      </NextLink>
    )
  },
)

export { default as Adapter } from './adapter'
