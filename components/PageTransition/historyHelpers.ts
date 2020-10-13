import { PartialDeep } from 'type-fest'
import { historyStateVar } from './typePolicies'

const phases: GQLPhase[] = [
  'LOADING',
  'LOCATION_CHANGED',
  'REGISTERED',
  'SCROLL_SAVED',
  'SCROLLING',
  'SCROLLED',
  'FINISHED',
]

export function afterPhase(after: GQLPhase) {
  return phases.indexOf(historyStateVar().phase) >= phases.indexOf(after)
}

export function untillPhase(before: GQLPhase) {
  return phases.indexOf(historyStateVar().phase) <= phases.indexOf(before)
}

export function betweenPhases(start: GQLPhase, end: GQLPhase) {
  return afterPhase(start) && untillPhase(end)
}

export function updateHistory(incomming: PartialDeep<GQLHistoryStateQuery['historyState']>) {
  const history = historyStateVar()
  const historyState: GQLHistoryStateQuery['historyState'] = {
    ...history,
    ...(incomming as GQLHistoryStateQuery['historyState']),
  }

  return historyStateVar(historyState)
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

export function updatePage(
  incomming: Omit<PartialDeep<GQLHistoryStateQuery['historyState']>, 'pages'>,
  page: PartialDeep<GQLHistoryStateQuery['historyState']['pages'][0]>,
  pageIdx?: number,
) {
  const actual = historyStateVar()
  const idx = pageIdx ?? actual.idx
  const historyState: GQLHistoryStateQuery['historyState'] = {
    ...actual,
    ...(incomming as GQLHistoryStateQuery['historyState']),
  }

  const pages = [...historyState.pages]
  pages[idx] = {
    ...{ holdPrevious: true, x: 0, y: 0 },
    ...historyState.pages[idx],
    ...page,
  }

  historyStateVar({ ...historyState, pages })
  return historyStateVar()
}
