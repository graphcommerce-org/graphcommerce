import { NextRouter } from 'next/router'
import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'

/** Same as useRouter but gives back the router of the previous page. */
export function usePrevPageRouter(): NextRouter | undefined {
  return useContext(pageRouterContext).prevRouter
}
