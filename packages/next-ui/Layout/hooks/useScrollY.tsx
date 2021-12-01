import useLayoutContext from './useLayoutContext'

export function useScrollY() {
  return useLayoutContext().scroll
}
