/* eslint-disable react/forbid-foreign-prop-types */
import { LoadingButton as Button, LoadingButtonProps } from '@mui/lab'
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
type LoadingButtonPropTypes = typeof Button & { propTypes: Record<string, Requireable<any>> }
if (process.env.NODE_ENV !== 'production' && (Button as LoadingButtonPropTypes).propTypes) {
  ;(Button as LoadingButtonPropTypes).propTypes.variant = PropTypes.oneOfType([
    (Button as LoadingButtonPropTypes).propTypes.variant,
    PropTypes.string,
  ])
}

export type ButtonProps = LoadingButtonProps
export { Button }
