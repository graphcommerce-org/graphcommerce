/**
 * Copy of the internal inertia animation for dragging
 *
 * https://github.com/framer/motion/blob/main/src/gestures/drag/VisualElementDragControls.ts#L545-L558
 */
export const INERTIA_ANIM = {
  type: 'inertia',
  bounceStiffness: 200,
  bounceDamping: 40,
  timeConstant: 750,
  restDelta: 1,
}

/** Copy of INERTIA_ANIM, but converted to `type = 'spring'` */
export const SPRING_ANIM = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
  restDelta: 1,
  restSpeed: 10,
}
