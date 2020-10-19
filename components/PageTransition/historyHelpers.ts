import { SetRequired } from 'type-fest'
import { historyStateVar } from './typePolicies'

const phases: GQLPhase[] = ['LOADING', 'LOCATION_CHANGED', 'REGISTERED']

export function afterPhase(after: GQLPhase) {
  return phases.indexOf(historyStateVar().phase) >= phases.indexOf(after)
}

export function untillPhase(before: GQLPhase) {
  return phases.indexOf(historyStateVar().phase) <= phases.indexOf(before)
}

export function betweenPhases(start: GQLPhase, end: GQLPhase) {
  return afterPhase(start) && untillPhase(end)
}

export function updateHistory(incomming: Partial<GQLHistoryStateQuery['historyState']>) {
  return historyStateVar({
    ...historyStateVar(),
    ...incomming,
  })
}

export function getPage(idx?: number) {
  const history = historyStateVar()
  const currIdx = idx ?? history.idx
  if (history.pages[currIdx]) return history.pages[currIdx]
  return undefined
}

export function getCurrentIdx() {
  return historyStateVar().idx
}
export function getPrevIdx() {
  return historyStateVar().idx - 1
}
export function getNextIdx() {
  return historyStateVar().idx + 1
}
export function getFromIdx() {
  const history = historyStateVar()
  return history?.direction === 'FORWARD' ? getPrevIdx() : getNextIdx()
}
export function getFromPage() {
  return getPage(getFromIdx())
}

// To close all overlays in one go, we find the first page that doesn't require the background to be holded.
export function getUpPage(idx: number) {
  const history = historyStateVar()
  const upPages = history.pages.slice(0, idx).filter((page) => page.holdBackground === false)
  return upPages?.[upPages.length - 1] as GQLHistoryStatePage | undefined
}

export function updatePage(
  incomming: Omit<Partial<GQLHistoryStateQuery['historyState']>, 'pages'>,
  page: Partial<GQLHistoryStateQuery['historyState']['pages'][0]>,
  pageIdx?: number,
) {
  const actual = historyStateVar()
  const historyState = { ...actual, ...incomming }

  const idx = pageIdx ?? actual.idx
  const pages = [...historyState.pages]
  pages[idx] = {
    ...{ holdBackground: true, x: 0, y: 0 },
    ...historyState.pages[idx],
    ...page,
  }

  return historyStateVar({ ...historyState, pages })
}

export function addPage(
  incomming: Omit<Partial<GQLHistoryStateQuery['historyState']>, 'pages'>,
  page: SetRequired<Partial<GQLHistoryStateQuery['historyState']['pages'][0]>, 'href' | 'as'>,
  pageIdx: number,
) {
  return historyStateVar({
    ...historyStateVar(),
    ...incomming,
    pages: [
      ...historyStateVar().pages.slice(0, pageIdx),
      { x: 0, y: 0, holdBackground: true, title: '', ...page },
    ],
  })
}
