import { makeStyles, Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import { UseStyles } from '@reachdigital/next-ui/Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    deleteButton: {
      margin: `0 auto 40px auto`,
      display: 'block',
    },
  }),
  { name: 'DeleteAddressButton' },
)

type DeleteAddressButtonProps = UseStyles<typeof useStyles>

export default function DeleteAddressButton(props: DeleteAddressButtonProps) {
  const classes = useStyles(props)

  return (
    <Button type='submit' variant='text' color='primary' className={classes.deleteButton}>
      Delete this address
    </Button>
  )
}
