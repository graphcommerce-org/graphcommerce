import { TextField, debounce, createStyles, makeStyles, Theme } from '@material-ui/core'
import { useMutationForm } from 'components/useMutationForm'
import { UpdateItemQuantityDocument } from 'generated/apollo'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quantity: {
      width: 60,
    },
    quantityInput: {
      textAlign: 'center',
    },
  }),
)

export default function UpdateItemQuantity(props: GQLUpdateItemQuantityMutationVariables) {
  const { register, errors, onSubmit, required } = useMutationForm<
    GQLUpdateItemQuantityMutation,
    GQLUpdateItemQuantityMutationVariables
  >({ mutation: UpdateItemQuantityDocument, values: props, mode: 'onChange' })
  const classes = useStyles()

  return (
    <form noValidate onChange={debounce(onSubmit, 500)}>
      <TextField
        variant='standard'
        size='small'
        type='number'
        // onChange={updateQuantity}
        className={classes.quantity}
        inputProps={{ className: classes.quantityInput, min: 1 }}
        // variant='filled'
        error={!!errors.quantity}
        // label='Quantity'
        id='quantity'
        name='quantity'
        // className={classes.name}
        required={required.quantity}
        inputRef={register({ required: required.quantity })}
        helperText={errors?.quantity?.message}
      />
    </form>
  )
}
