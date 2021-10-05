/**
 * Value between 0.1 - 2.0
 *
 * Will be multiplied by animation values to adjust animation speed while preserving the animation feel
 */
const inertiaAnimationSpeed = 3.0
const springAnimationSpeed = 2.0

/**
 * Copy of the internal inertia animation for dragging
 *
 * https://github.com/framer/motion/blob/main/src/gestures/drag/VisualElementDragControls.ts#L545-L558
 */
export const INERTIA_ANIM = {
  type: 'inertia',
  bounceStiffness: 200 * inertiaAnimationSpeed,
  bounceDamping: 40 * inertiaAnimationSpeed,
  timeConstant: 750 * inertiaAnimationSpeed,
  restDelta: 1,
}

/** Copy of INERTIA_ANIM, but converted to `type = 'spring'` */
export const SPRING_ANIM = {
  type: 'spring',
  stiffness: 200 * springAnimationSpeed,
  damping: 40 * springAnimationSpeed,
  restDelta: 1,
  restSpeed: 10 * springAnimationSpeed,
}
