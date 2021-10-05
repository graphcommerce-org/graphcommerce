/**
 * Value between 0.1 - 3.0
 *
 * Will be multiplied by animation values to adjust animation speed while preserving the animation feel
 */
const inertiaAnimationModifier = 3.0
const springAnimationModifier = 2.0

/**
 * Copy of the internal inertia animation for dragging
 *
 * https://github.com/framer/motion/blob/main/src/gestures/drag/VisualElementDragControls.ts#L545-L558
 */
export const INERTIA_ANIM = {
  type: 'inertia',
  bounceStiffness: 200 * inertiaAnimationModifier,
  bounceDamping: 40 * inertiaAnimationModifier,
  timeConstant: 750 * inertiaAnimationModifier,
  restDelta: 1,
}

/** Copy of INERTIA_ANIM, but converted to `type = 'spring'` */
export const SPRING_ANIM = {
  type: 'spring',
  stiffness: 200 * springAnimationModifier,
  damping: 40 * springAnimationModifier,
  restDelta: 1,
  restSpeed: 10 * springAnimationModifier,
}
