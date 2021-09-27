import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { UseStyles } from '@graphcommerce/next-ui'
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
  const { data: tokenData } = useQuery(CustomerTokenDocument)
  const classes = useStyles(props)

  if (!tokenData?.customerToken) return <></>

  return (
    <ul className={clsx(classes.root)}>
      <li>E-mail address of existing customers will be recognized, sign in is optional.</li>
      <li>Fill in password fields to create an account.</li>
      <li>Leave passwords fields empty to order as guest.</li>
    </ul>
  )
}
