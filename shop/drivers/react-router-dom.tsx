import { History, LocationState, createMemoryHistory, createBrowserHistory } from 'history'

export type {
  BrowserRouterProps,
  HashRouterProps,
  LinkProps,
  NavLinkProps,
  RedirectProps,
  RouteChildrenProps,
  RouteComponentProps,
  RouteProps,
  RouterChildContext,
  SwitchProps,
  match,
} from 'react-router-dom'

export {
  BrowserRouter,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Prompt,
  Redirect,
  Route,
  Router,
  StaticRouter,
  Switch,
  generatePath,
  matchPath,
  // useHistory,
  useLocation,
  useParams,
  useRouteMatch,
  withRouter,
} from 'node_modules/react-router-dom'

let historyState: History<any>
function history<S>() {
  if (!historyState) {
    historyState =
      typeof window !== 'undefined' ? createBrowserHistory<S>() : createMemoryHistory<S>()
  }
  return historyState
}

export function useHistory<HistoryLocationState = LocationState>(): History<HistoryLocationState> {
  return history<HistoryLocationState>()
}
