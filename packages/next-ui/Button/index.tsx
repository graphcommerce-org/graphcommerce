/* eslint-disable react/forbid-foreign-prop-types */
import { LoadingButton, LoadingButtonProps } from '@mui/lab'
import PropTypes, { Requireable } from 'prop-types'

/**
 * This is temporary until Material UI solves that the variant proptype is not:
 *
 * ```ts
 * variant: PropTypes.oneOf(['contained', 'outlined', 'text'])
 * ```
 *
 * It should be something like
 *
 * ```ts
 * variant: PropTypes.oneOfType([
 *   PropTypes.oneOf(['contained', 'outlined', 'text']),
 *   PropTypes.string,
 * ]),
 * ```
 *
 * https://github.com/mui-org/material-ui/blob/master/packages/mui-lab/src/LoadingButton/LoadingButton.js#L269
 */
type LoadingButtonPropTypes = typeof LoadingButton & { propTypes: Record<string, Requireable<any>> }
if (process.env.NODE_ENV !== 'production' && (LoadingButton as LoadingButtonPropTypes).propTypes) {
  ;(LoadingButton as LoadingButtonPropTypes).propTypes.variant = PropTypes.oneOfType([
    (LoadingButton as LoadingButtonPropTypes).propTypes.variant,
    PropTypes.string,
  ])
}

export type ButtonProps = LoadingButtonProps
export { LoadingButton }
export default LoadingButton
