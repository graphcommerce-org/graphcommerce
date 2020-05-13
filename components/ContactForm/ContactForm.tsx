import React, { useEffect } from 'react'
import { Button, FormHelperText, TextField } from '@material-ui/core'
import { useMutationForm, emailPattern, phonePattern } from 'components/useMutationForm'
import { SubmitContactFormDocument } from 'generated/apollo'
import { ChevronRight } from 'components/Icons'
import useContactStyles from './useContactStyles'
import sendSlackNotification from './sendSlackNotification'

const ContactForm: React.FC = ({ children }) => {
  const classes = useContactStyles()
  const {
    onSubmit,
    errors,
    register,
    required,
    result: { error, data, loading },
  } = useMutationForm<GQLSubmitContactFormMutation, GQLSubmitContactFormMutationVariables>(
    SubmitContactFormDocument,
  )

  useEffect(() => {
    if (data?.createContactForm?.id) sendSlackNotification(data.createContactForm)
  }, [data])

  const subjects: { [K in GQLContactSubject]: string } = {
    COLLABORATION: 'Samenwerking',
    MODULE: 'Module',
    NEW_PROJECT: 'Nieuw Project',
    VACANCY: 'Vacature',
    OTHER: 'Anders',
  }

  return (
    <>
      {children}
      <form noValidate onSubmit={onSubmit} className={classes.form}>
        <TextField
          variant='filled'
          error={!!errors.name}
          label='Naam'
          id='name'
          name='name'
          className={classes.name}
          required={required.name}
          inputRef={register({ required: required.name })}
          helperText={errors?.name?.message}
        />

        <TextField
          variant='filled'
          type='email'
          error={!!errors.email}
          label='Emailadres'
          id='email'
          name='email'
          className={classes.email}
          required={required.email}
          inputRef={register({
            required: required.email,
            pattern: { value: emailPattern, message: 'Emailadres is ongeldig' },
          })}
          helperText={errors?.email?.message}
        />

        <TextField
          variant='filled'
          type='tel'
          error={!!errors.phoneNumber}
          label='Telefoonnummer'
          id='phoneNumber'
          name='phoneNumber'
          className={classes.phoneNumber}
          required={required.phoneNumber}
          inputRef={register({
            required: required.phoneNumber,
            pattern: { value: phonePattern, message: 'Telefoonnummer is ongeldig' },
          })}
          helperText={errors?.phoneNumber?.message}
        />

        <TextField
          variant='filled'
          select
          SelectProps={{ native: true }}
          error={!!errors.subject}
          label='Onderwerp'
          id='subject'
          name='subject'
          className={classes.subject}
          required={required.subject}
          inputRef={register({ required: required.subject })}
          helperText={errors?.subject?.message}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label*/}
          {!required.subject && <option value='' />}
          {Object.entries(subjects).map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </TextField>

        <TextField
          variant='filled'
          multiline
          className={classes.message}
          error={!!errors.message}
          label='Bericht'
          id='message'
          name='message'
          inputProps={{ style: { minHeight: 'calc(10em * 1.1876)' } }}
          required={required.message}
          inputRef={register({ required: required.message })}
          helperText={errors?.subject?.message}
        />

        <div className={classes.error}>
          {error && (
            <FormHelperText error>
              {error.message} Please email to info@reachdigital.nl
            </FormHelperText>
          )}
          {data?.createContactForm === null && (
            <FormHelperText error>
              Message was send, but couldn&apos;t be saved.. Please email to info@reachdigital.nl
            </FormHelperText>
          )}
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={loading || !!data?.createContactForm?.id}
          className={classes.submit}
          size='large'
          endIcon={!data?.createContactForm?.id && <ChevronRight />}
        >
          {data?.createContactForm?.id ? 'Bericht is verzonden! 🎉' : 'Verzend'}
        </Button>
      </form>
    </>
  )
}

export default ContactForm
