import { UseStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      ...theme.typography.body2,
      paddingLeft: theme.spacings.xs,
    },
  }),
  { name: 'EmailHelperList' },
)

type HelperListProps = UseStyles<typeof useStyles>

export default function EmailHelperList(props: HelperListProps) {
  const classes = useStyles(props)

  return (
    <ul className={clsx(classes.root)}>
      <li>
        <Trans>E-mail address of existing customers will be recognized, sign in is optional.</Trans>
      </li>
      <li>
        <Trans>Fill in password fields to create an account.</Trans>
      </li>
      <li>
        <Trans>Leave passwords fields empty to order as guest.</Trans>
      </li>
    </ul>
  )
}
