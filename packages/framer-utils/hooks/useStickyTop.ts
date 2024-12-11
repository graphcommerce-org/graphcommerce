import type { MotionValue } from 'framer-motion'
import { motionValue, useTransform } from 'framer-motion'
import { numberToPx } from '../utils/numberToPx'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'
import type { Rect } from './useMotionRect'
import { useMotionRect } from './useMotionRect'
import { useMotionValueValue } from './useMotionValueValue'

type StickyTo = string | null
type Position = 'end' | 'center'

export type StickyStackConfig<E extends HTMLElement> = {
  /** Ref for the element to make sticky */
  ref: React.RefObject<E>
  /** Name for other sticky elements to provide the in the stickyTo value */
  name: string
  /** If it is the first element in the stack, set this to null. */
  to: StickyTo
  /** Whether the element should be sticky */
  sticky?: boolean
  /** How to position the element relative to the stickyTo element */
  position?: Position
}

type StickyItemMeasured = StickyStackConfig<HTMLElement> & { rect: Rect }

/**
 * We're using a motionValue to store the global sticky stack.
 *
 * Any other state management solution with selectors would also work.
 */
const stickyContext = motionValue<Record<string, StickyItemMeasured>>({})

function get(stickyName: string | null) {
  return stickyName ? stickyContext.get()[stickyName] : undefined
}

function has(stickyName: string) {
  return stickyContext.get()[stickyName] !== undefined
}

function set<E extends HTMLElement>(options: StickyStackConfig<E>, rect: MotionValue<Rect>) {
  const { name, sticky = true, position = 'end' } = options
  const current = { ...stickyContext.get() }
  current[name] = { ...options, rect: rect.get(), sticky, position }
  stickyContext.set(current)
}

function del<E extends HTMLElement>(options: StickyStackConfig<E>) {
  const current = { ...stickyContext.get() }
  delete current[options.name]
  stickyContext.set(current)
}

function findStickTo(to: StickyTo) {
  const sticky = get(to)
  if (!sticky) return null
  if (sticky.sticky) return sticky
  return findStickTo(sticky.to)
}

/**
 * An hook that allows you to create a sticky stack of elements.
 *
 * It calculates the top value of an element based on the size of elements in the stack before it.
 */
export function useStickyTop<E extends HTMLElement>(config: StickyStackConfig<E>) {
  const rect = useMotionRect(config.ref)

  if (!has(config.name)) set(config, rect)

  useIsomorphicLayoutEffect(() => {
    const onChange = () => set(config, rect)
    onChange()
    rect.on('change', onChange)

    return () => del(config)
  }, [config, rect])

  return useMotionValueValue(
    useTransform(() => {
      const getPosition = (self: StickyItemMeasured | undefined): number => {
        if (!self?.sticky) return 0

        const to = findStickTo(self?.to)
        if (!to) return 0

        const pos = self.position ?? 'end'
        switch (pos) {
          case 'center':
            return to.rect.height / 2 - self.rect.height / 2 + getPosition(to)
          case 'end':
            return (to.sticky ? to.rect.height : 0) + getPosition(to)
          default:
            throw new Error('Invalid position')
        }
      }

      return getPosition(get(config.name))
    }),
    (v) => v,
  )
}
