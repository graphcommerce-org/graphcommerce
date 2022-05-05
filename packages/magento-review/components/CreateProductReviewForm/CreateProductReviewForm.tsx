import { useQuery } from '@graphcommerce/graphql'
import { ProductReviewRatingInput } from '@graphcommerce/graphql-mesh'
import { ApolloCustomerErrorAlert } from '@graphcommerce/magento-customer'
import {
  Form,
  responsiveVal,
  FormActions,
  FormRow,
  StarRatingField,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@graphcommerce/lingui-next'
import { Box, TextField, Typography, Alert, Button, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { CreateProductReviewDocument } from './CreateProductReview.gql'
import { ProductReviewRatingsMetadataDocument } from './ProductReviewRatingsMetadata.gql'

type CreateProductReviewFormProps = {
  sku: string
  nickname?: string
  sx?: SxProps<Theme>
}

const name = 'CreateProductReviewForm' as const
const parts = [
  'root',
  'ratingContainer',
  'rating',
  'ratingLabel',
  'submitButton',
  'cancelButton',
  'formActions',
] as const
const { classes } = extendableComponent(name, parts)

export function CreateProductReviewForm(props: CreateProductReviewFormProps) {
  const { sku, nickname, sx = [] } = props
  const router = useRouter()
  const [ratings, setRatings] = useState<ProductReviewRatingInput[]>([])

  const { data, loading } = useQuery(ProductReviewRatingsMetadataDocument)

  const form = useFormGqlMutation(
    CreateProductReviewDocument,
    {
      defaultValues: { sku, nickname },
      onBeforeSubmit: (formData) => ({
        ...formData,
        ratings: ratings.some((r) => r.value_id === '') ? [] : ratings,
      }),
    },
    { errorPolicy: 'all' },
  )
  const { handleSubmit, muiRegister, formState, required, error } = form
  const submitHandler = handleSubmit(() => {})

  useEffect(() => {
    if (loading || !data) return

    // set initial state
    if (ratings.length === 0) {
      const reviewMetadataRatings = data.productReviewRatingsMetadata.items.map((metadata) => ({
        id: metadata?.id ?? '',
        value_id: '',
      }))

      setRatings(reviewMetadataRatings)
    }
  }, [loading, data, ratings.length])

  if (!data) return null

  if (formState.isSubmitSuccessful && data) {
    return (
      <>
        <Alert severity='success' variant='standard'>
          <Trans>Thank you! Your review was successfully submitted for approval</Trans>
        </Alert>
        <Box mt={6}>
          <Button variant='pill' color='secondary' size='large' onClick={() => router.back()}>
            <Trans>Continue shopping</Trans>
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate className={classes.root} sx={sx}>
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.nickname || !!error}
          label={<Trans>Name</Trans>}
          required={required.nickname}
          {...muiRegister('nickname', { required: required.nickname })}
          helperText={formState.errors.nickname?.message}
          disabled={formState.isSubmitting}
          InputProps={{
            readOnly: typeof nickname !== 'undefined',
          }}
        />
      </FormRow>

      <Box
        className={classes.ratingContainer}
        sx={(theme) => ({
          marginBottom: theme.spacings.xxs,
        })}
      >
        {data?.productReviewRatingsMetadata?.items?.map((item) => (
          <FormRow
            key={item?.id}
            className={classes.rating}
            sx={{
              paddingBottom: 'unset',
              gridTemplateColumns: `minmax(${responsiveVal(60, 80)}, 0.1fr) max-content`,
              alignItems: 'center',
            }}
          >
            <Typography
              variant='subtitle1'
              component='span'
              className={classes.ratingLabel}
              sx={{
                fontWeight: 'normal',
                justifySelf: 'left',
              }}
            >
              {item?.name}
            </Typography>
            {item && (
              <StarRatingField
                id={item?.id ?? ''}
                size='large'
                onChange={(id, value) => {
                  const productReviewRatingInputValue =
                    data.productReviewRatingsMetadata.items.find((meta) => meta?.id === id)?.values[
                      value - 1
                    ]

                  const ratingsArr = [...ratings]

                  const clonedProductReviewRatingInputValue = ratingsArr.find(
                    (meta) => meta.id === id,
                  )

                  if (
                    !clonedProductReviewRatingInputValue ||
                    typeof productReviewRatingInputValue?.value_id === undefined
                  ) {
                    console.error('Cannot find product review rating input value in local state')
                    return
                  }

                  clonedProductReviewRatingInputValue.value_id =
                    productReviewRatingInputValue?.value_id ?? ''

                  setRatings(ratingsArr)
                }}
              />
            )}
          </FormRow>
        ))}
      </Box>

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
          minRows={4}
        />
      </FormRow>

      <FormActions
        className={classes.formActions}
        sx={(theme) => ({
          gridAutoFlow: 'row',
          gap: 8,
          marginTop: theme.spacings.xxs,
        })}
      >
        <Button
          variant='pill'
          color='primary'
          type='submit'
          size='medium'
          className={classes.submitButton}
          sx={{
            width: responsiveVal(200, 250),
            height: responsiveVal(40, 50),
          }}
        >
          <Trans>Submit review</Trans>
        </Button>
        <Button
          variant='text'
          color='primary'
          onClick={() => router.back()}
          className={classes.cancelButton}
          sx={{
            display: 'block',
            maxWidth: 'max-content',
            margin: '0 auto',
          }}
        >
          <Trans>Cancel</Trans>
        </Button>
      </FormActions>

      <ApolloCustomerErrorAlert error={error} />
    </Form>
  )
}
