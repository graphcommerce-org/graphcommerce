import { UseStyles, makeStyles, useMergedClasses } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'

const useStyles = makeStyles({ name: 'EmailHelperList' })((theme) => ({
  root: {
    ...theme.typography.body2,
    paddingLeft: theme.spacings.xs,
  },
}))

type HelperListProps = UseStyles<typeof useStyles>

export default function EmailHelperList(props: HelperListProps) {
  const classes = useMergedClasses(useStyles().classes, props.classes)

  return (
    <ul className={classes.root}>
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
