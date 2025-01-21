import {
  ApolloErrorSnackbar,
  EmailElement,
  FormPersist,
  TextFieldElement,
  useFieldArray,
  useFormGqlMutation,
  type Control,
} from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import {
  CustomerDocument,
  useCustomerQuery,
  useCustomerSession,
} from '@graphcommerce/magento-customer'
import type { ProductPageItemFragment } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  Button,
  Container,
  extendableComponent,
  Fab,
  FormRow,
  iconClose,
  iconEmail,
  IconSvg,
  LinkOrButton,
  Overlay,
  OverlayHeader,
  sxx,
} from '@graphcommerce/next-ui'
import { alpha, Box, IconButton } from '@mui/material'
import { useState } from 'react'
import {
  SendEmailToFriendDocument,
  type SendEmailToFriendMutationVariables,
} from '../../graphql/SendEmailToFriend.gql'

export type SendEmailToFriendProps = {
  product: ProductPageItemFragment
}

const componentName = 'SendEmailToFriend'
const { classes } = extendableComponent(componentName, ['root', 'recipients', 'recipient'])

function FieldArray(props: { control: Control<SendEmailToFriendMutationVariables> }) {
  const { control } = props
  const recipients = useFieldArray({
    control,
    name: 'input.recipients',
    rules: { minLength: 1 },
  })

  return (
    <>
      <Box
        component='h5'
        sx={(theme) => ({
          typography: 'h6',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: theme.spacings.xs,
          mb: theme.spacings.xs,
        })}
      >
        <Box>Recipients</Box>
        <Button
          onClick={() => recipients.append({ name: '', email: '' })}
          variant='pill'
          color='inherit'
        >
          Add recipient
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} className={classes.recipients}>
        {recipients.fields.map((recipient, idx) => (
          <Box
            className={classes.recipient}
            key={recipient.id}
            sx={(theme) => ({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr auto',
              gap: theme.spacings.xs,
              p: theme.spacings.xs,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: theme.shape.borderRadius,

              '&:not(:first-child)': {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: 'none',
              },
              '&:not(:last-child)': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            })}
          >
            <TextFieldElement
              control={control}
              name={`input.recipients.${idx}.name`}
              label='Name'
              required
            />
            <EmailElement
              control={control}
              name={`input.recipients.${idx}.email`}
              label='Email'
              required
            />
            <Box>
              <IconButton
                onClick={() => recipients.remove(idx)}
                size='small'
                disabled={recipients.fields.length === 1}
              >
                <IconSvg src={iconClose} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  )
}

export function SendEmailToFriendForm(props: SendEmailToFriendProps & { onClose: () => void }) {
  const { product, onClose } = props

  const customer = useCustomerQuery(CustomerDocument).data?.customer
  const name = customer
    ? [customer.prefix, customer.firstname, customer.middlename, customer.lastname, customer.suffix]
        .filter((v) => !!v)
        .join(' ')
    : undefined
  const email = customer?.email ?? undefined

  const form = useFormGqlMutation(
    SendEmailToFriendDocument,
    {
      defaultValues: {
        input: {
          sender: { name, email },
          product_id: product.id ?? undefined,
          recipients: [{}],
        },
      },
      onComplete: () => {},
    },
    { errorPolicy: 'all' },
  )
  const submit = form.handleSubmit(() => {})

  return (
    <form onSubmit={submit} noValidate>
      <OverlayHeader
        onClose={onClose}
        primary={
          <LinkOrButton
            type='submit'
            button={{ variant: 'pill' }}
            color='primary'
            loading={form.formState.isSubmitting}
          >
            Send
          </LinkOrButton>
        }
      >
        Send to friend
      </OverlayHeader>

      <Container maxWidth='md' sx={(theme) => ({ pt: theme.spacings.md })}>
        <FormRow>
          <TextFieldElement
            control={form.control}
            name='input.sender.name'
            label='From Name'
            required
            variant='outlined'
          />
          <EmailElement
            control={form.control}
            name='input.sender.email'
            label='From Email'
            required
          />
        </FormRow>
        <FormRow>
          <TextFieldElement
            multiline
            minRows={4}
            control={form.control}
            name='input.sender.message'
            label='Message'
            required
          />
        </FormRow>

        <FieldArray control={form.control} />

        <ApolloErrorSnackbar error={form.error} />
      </Container>

      <FormPersist form={form} name='SendEmailToFriend' />
    </form>
  )
}

export function SendEmailToFriendBase(props: SendEmailToFriendProps) {
  const { product } = props

  const [open, setOpen] = useState(true)

  const preventAnimationBubble = (
    e: React.TouchEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation()
    if (e.type === 'mousedown') {
      e.preventDefault()
    }
  }

  return (
    <>
      <Fab
        onClick={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        onMouseDown={preventAnimationBubble}
        onTouchStart={preventAnimationBubble}
        size='responsive'
        color='inherit'
        sx={sxx((theme) => ({
          boxShadow: theme.shadows[6],
          backgroundColor:
            theme.palette.mode === 'light' ? theme.palette.background.paper : 'transparent',
          flex: '0 0 auto',
          '& svg': {
            stroke:
              theme.palette.mode === 'light'
                ? theme.palette.text.secondary
                : theme.palette.background.paper,
          },
          '&:hover': {
            backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
          },
        }))}
        title='Send to friend'
        aria-label='Send to friend'
        icon={iconEmail}
        loading={false}
      />

      <Overlay active={open} onClosed={() => setOpen(false)}>
        <SendEmailToFriendForm product={product} onClose={() => setOpen(false)} />
      </Overlay>
    </>
  )
}

export function SendEmailToFriend(props: SendEmailToFriendProps) {
  const { product } = props

  const { enabled_for_customers = false, enabled_for_guests = false } =
    useQuery(StoreConfigDocument).data?.storeConfig?.send_friend ?? {}

  const { loggedIn } = useCustomerSession()
  if (loggedIn && !enabled_for_customers) return null
  if (!loggedIn && !enabled_for_guests) return null

  return <SendEmailToFriendBase product={product} />
}
