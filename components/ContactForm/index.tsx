import React from 'react'
import { Button, FormHelperText, makeStyles, Theme, TextField } from '@material-ui/core'
import { SubmitContactFormDocument } from '../../generated/apollo'
import { useMutationForm } from '../../lib/apollo-form'

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const ContactForm: React.FC = () => {
  const classes = useStyles()
  const {
    onSubmit,
    errors,
    register,
    required,
    result: { error, data, loading },
  } = useMutationForm<GQLSubmitContactFormMutation, GQLSubmitContactFormMutationVariables>(
    SubmitContactFormDocument,
  )

  const subjects: { [K in GQLContactSubject]: string } = {
    COLLABORATION: 'Samenwerking',
    MODULE: 'Module',
    NEW_PROJECT: 'Nieuw Project',
    VACANCY: 'Vacature',
    OTHER: 'Overig',
  }

  return (
    <>
      <form noValidate onSubmit={onSubmit}>
        <TextField
          margin='normal'
          variant='outlined'
          error={!!errors.name}
          className={classes.formControl}
          label='Naam'
          name='name'
          required={required.name}
          inputRef={register({ required: required.name })}
          helperText={errors.name && 'Naam is verplicht'}
        />

        <TextField
          margin='normal'
          variant='outlined'
          error={!!errors.email}
          className={classes.formControl}
          label='Emailadres'
          name='email'
          required={required.email}
          inputRef={register({ required: required.email })}
          helperText={errors.name && 'Emailadres is verplicht'}
        />

        <TextField
          margin='normal'
          variant='outlined'
          error={!!errors.phoneNumber}
          className={classes.formControl}
          label='Telefoonnummer'
          name='phoneNumber'
          required={required.phoneNumber}
          inputRef={register({ required: required.phoneNumber })}
          helperText={errors.phoneNumber && 'Telefoonnummer is verplicht'}
        />

        <TextField
          margin='normal'
          variant='outlined'
          select
          SelectProps={{ native: true }}
          error={!!errors.subject}
          className={classes.formControl}
          label='Onderwerp'
          name='subject'
          required={required.subject}
          inputRef={register({ required: required.subject })}
          helperText={errors.subject && 'Onderwerp is verplicht'}
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
          margin='normal'
          variant='outlined'
          multiline
          rowsMax={6}
          error={!!errors.message}
          className={classes.formControl}
          label='Bericht'
          name='message'
          inputProps={{ style: { minHeight: 'calc(10em * 1.1876)' } }}
          required={required.message}
          inputRef={register({ required: required.message })}
          helperText={errors.message && 'Bericht is verplicht'}
        />

        <Button type='submit' disabled={loading || !!data?.createContactForm?.id}>
          Submit
        </Button>
        {error && (
          <FormHelperText error>
            {error.message} Please email to info@reachdigital.nl
          </FormHelperText>
        )}
        {data?.createContactForm?.id && <FormHelperText>Bedankt voor je bericht</FormHelperText>}
        {data?.createContactForm === null && (
          <FormHelperText error>
            Message was send, but couldn&apos;t be saved.. Please email to info@reachdigital.nl
          </FormHelperText>
        )}
      </form>
    </>
  )
}

export default ContactForm
