import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
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
import { Trans } from '@lingui/react'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Box, Typography, Alert, Button, SxProps, Theme } from '@mui/material'
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
  const { handleSubmit, control, formState, required, error } = form
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
          <Trans id='Thank you! Your review was successfully submitted for approval' />
        </Alert>
        <Box mt={6}>
          <Button variant='pill' color='secondary' size='large' onClick={() => router.back()}>
            <Trans id='Continue shopping' />
          </Button>
        </Box>
      </>
    )
  }

  return (
    <Form onSubmit={submitHandler} noValidate className={classes.root} sx={sx}>
      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          error={!!formState.errors.nickname || !!error}
          label={<Trans id='Name' />}
          required={required.nickname}
          name='nickname'
          rules={{ required: required.nickname }}
          showValid
          control={control}
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
        <TextFieldElement
          variant='outlined'
          type='text'
          error={!!formState.errors.summary || !!error}
          label={<Trans id='Summary' />}
          required={required.summary}
          name='summary'
          rules={{ required: required.summary }}
          control={control}
          showValid
          helperText={formState.errors.summary?.message}
          disabled={formState.isSubmitting}
        />
      </FormRow>

      <FormRow>
        <TextFieldElement
          variant='outlined'
          type='text'
          error={!!formState.errors.text || !!error}
          label={<Trans id='Review' />}
          required={required.text}
          name='text'
          rules={{ required: required.text }}
          control={control}
          showValid
          helperText={formState.errors.text?.message}
          disabled={formState.isSubmitting}
          multiline
          minRows={4}
        />
      </FormRow>

      <FormActions className={classes.formActions} sx={{ gridAutoFlow: 'row' }}>
        <Button
          variant='pill'
          color='primary'
          type='submit'
          size='medium'
          className={classes.submitButton}
        >
          <Trans id='Submit review' />
        </Button>
      </FormActions>

      <ApolloCustomerErrorAlert error={error} />
    </Form>
  )
}
