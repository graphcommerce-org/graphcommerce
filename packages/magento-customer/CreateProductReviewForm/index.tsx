import { useQuery } from '@apollo/client'
import { TextField, Typography } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import Form from '@reachdigital/next-ui/Form'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormRow from '@reachdigital/next-ui/Form/FormRow'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ProductReviewRatingInput } from '../../graphql'
import StarRatingField from '../StarRatingField'
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
} from './CreateProductReview.gql'
import { ProductReviewRatingsMetadataDocument } from './ProductReviewRatingsMetadata.gql'

type CreateProductReviewFormProps = {
  sku: string
}

export default function CreateProductReviewForm(props: CreateProductReviewFormProps) {
  const { sku } = props

  const { data: productReviewRatingsMetadata, loading } = useQuery(
    ProductReviewRatingsMetadataDocument,
  )

  const [ratings, setRatings] = useState<ProductReviewRatingInput[]>([])

  const form = useFormGqlMutation<
    CreateProductReviewMutation,
    CreateProductReviewMutationVariables
  >(CreateProductReviewDocument, {
    defaultValues: { sku },
    onBeforeSubmit: (data) =>
      // todo: add ratings
      ({
        ...data,
      }),
  })
  const { handleSubmit, muiRegister, formState, required, error } = form
  const submitHandler = handleSubmit(() => {})
  const router = useRouter()

  useEffect(() => {
    if (!loading || !productReviewRatingsMetadata) return

    // initialize data when there is no state yet
    if (ratings.length === 0) {
      const reviewMetadataRatings =
        productReviewRatingsMetadata.productReviewRatingsMetadata.items.map((metadata) => ({
          id: metadata?.id ?? '',
          value_id: '',
        }))

      setRatings(reviewMetadataRatings)
    }
  }, [loading, productReviewRatingsMetadata, ratings.length])

  if (!productReviewRatingsMetadata) return <>loading</>

  return (
    <Form onSubmit={submitHandler} noValidate>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.nickname || !!error}
          label='Name'
          required={required.nickname}
          {...muiRegister('nickname', { required: required.nickname })}
          helperText={formState.errors.nickname?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      {productReviewRatingsMetadata?.productReviewRatingsMetadata?.items?.map((prrvm) => (
        <FormRow key={prrvm?.id}>
          <Typography variant='h5' component='span'>
            {prrvm?.name}
          </Typography>
          {prrvm && (
            <StarRatingField
              {...prrvm}
              value={(ratings.find((r) => r.id === prrvm.id) ?? ''}
              onChange={(id, value_id) => {
                // todo: sla de data op in eigen state
                // zet juiste value op basis van dezelfde state
                // const rating = ratings.find((r) => r.id === id)
                // rating?.value_id = value_id
              }}
            />
          )}
        </FormRow>
      ))}

      {/* TODO: rating breakdown implementeren */}

      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.summary || !!error}
          label='Summary'
          required={required.summary}
          {...muiRegister('summary', { required: required.summary })}
          helperText={formState.errors.summary?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.text || !!error}
          label='Review'
          required={required.text}
          {...muiRegister('text', { required: required.text })}
          helperText={formState.errors.text?.message}
          disabled={formState.isSubmitting}
          multiline
        />
      </FormRow>

      {/* TODO: pros & cons implementeren, maar nog niks mee doen */}

      <FormActions>
        <Button variant='pill' color='primary' text='bold' type='submit'>
          Submit review
        </Button>
        <Button variant='text' color='primary' onClick={() => router.back()}>
          Cancel
        </Button>
      </FormActions>

      <ApolloErrorAlert error={error} />
    </Form>
  )
}
