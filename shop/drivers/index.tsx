import makeUrl from '@magento/venia-ui/lib/util/makeUrl'

export {
  Link,
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
  return new URL(makeUrl(url, options), process.env.MAGENTO_BACKEND_URL).toString()
}

export { default as Adapter } from './adapter'
