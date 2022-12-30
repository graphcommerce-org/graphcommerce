/* eslint-disable import/no-extraneous-dependencies */
import { useQuery } from '@apollo/client'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-hook-form'
import {
  TestEmailCartDocument,
  TestEmailCartMutation,
  TestEmailCartMutationVariables,
} from '../__mocks__/TestEmailCart.gql'
import { TestEmailCartGetDocument, TestEmailCartGetQuery } from '../__mocks__/TestEmailCartGet.gql'
import {
  TestShippingAddressFormDocument,
  TestShippingAddressFormMutation,
  TestShippingAddressFormMutationVariables,
} from '../__mocks__/TestShippingAddressForm.gql'
import {
  FormProviderApollo,
  SubmitValidHandler,
  useFormApollo,
  useFormApolloContext,
  useFormApolloData,
  useFormApolloError,
} from '../hooks/useFormApollo'

import '@testing-library/jest-dom'

const FormState = () => {
  const { isSubmitted, isSubmitting, isSubmitSuccessful, isDirty } =
    useFormState<TestShippingAddressFormMutationVariables>()

  return (
    <>
      <div data-testid='isSubmitted'>{isSubmitted ? '1' : ''}</div>
      <div data-testid='isSubmitting'>{isSubmitting ? '1' : ''}</div>
      <div data-testid='isSubmitSuccessful'>{isSubmitSuccessful ? '1' : ''}</div>
      {isSubmitted ? <div data-testid='submitted' /> : <div data-testid='notSubmitted' />}
      {isSubmitting ? <div data-testid='submitting' /> : <div data-testid='notSubmitting' />}
      {isSubmitSuccessful ? <div data-testid='successful' /> : <div data-testid='notSuccessful' />}
      {isDirty ? <div data-testid='dirty' /> : <div data-testid='notDirty' />}
    </>
  )
}

const FormResult = () => {
  const data = useFormApolloData<TestShippingAddressFormMutation>()
  const error = useFormApolloError()

  return (
    <>
      <div data-testid='result'>{JSON.stringify(data)}</div>
      <div data-testid='networkError'>{error?.networkError?.message}</div>
      <div data-testid='graphQLErrors'>{error?.graphQLErrors[0]?.message}</div>
    </>
  )
}

let count = 0

type FormProps = {
  onValid?: SubmitValidHandler<
    TestShippingAddressFormMutation,
    TestShippingAddressFormMutationVariables
  >
}

const FormShippingAddress = (props: FormProps) => {
  const { onValid } = props
  const [internalCount, setInternalCount] = useState(0)
  const form = useFormApollo({ mutation: TestShippingAddressFormDocument })
  count++

  return (
    <FormProviderApollo {...form}>
      <form onSubmit={form.handleSubmit(onValid)}>
        <button type='submit'>Submit</button>
        <button
          type='button'
          data-testid='state'
          onClick={() => setInternalCount(internalCount + 1)}
        >
          Increment
        </button>
        <div data-testid='rendercount'>{count}</div>
        <FormState />
        <FormResult />
      </form>
    </FormProviderApollo>
  )
}

describe('useFormApollo', () => {
  it('it doesnt rerender and is able to submit successfully', async () => {
    const TestShippingAddressFormMock: MockedResponse<TestShippingAddressFormMutation> = {
      request: {
        query: TestShippingAddressFormDocument,
        variables: { customerNote: 'joi' },
      },
      result: { data: { setShippingAddressesOnCart: { cart: { id: '123' } } } },
    }

    count = 0
    const { findByTestId, getByTestId, findByText } = render(
      <MockedProvider mocks={[TestShippingAddressFormMock]} addTypename={false}>
        <FormShippingAddress />
      </MockedProvider>,
    )

    // Default State
    expect((await findByTestId('result')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitted')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitting')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeFalsy()

    fireEvent.click(await findByText('Submit'))

    expect((await findByTestId('rendercount')).innerHTML).toBe('1')

    fireEvent.click(await findByTestId('state'))
    expect((await findByTestId('rendercount')).innerHTML).toBe('2')

    expect((await findByTestId('result')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitted')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitting')).innerHTML).toBeTruthy()
    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeFalsy()

    await waitFor(() => expect(getByTestId('successful')).toBeTruthy())

    expect((await findByTestId('isSubmitted')).innerHTML).toBeTruthy()
    expect((await findByTestId('isSubmitting')).innerHTML).toBeFalsy()
    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeTruthy()
    expect((await findByTestId('rendercount')).innerHTML).toBe('2')

    expect((await findByTestId('result')).innerHTML).toMatchInlineSnapshot(
      `"{"setShippingAddressesOnCart":{"cart":{"id":"123"}}}"`,
    )
    expect((await findByTestId('networkError')).innerHTML).toBeFalsy()
    expect((await findByTestId('graphQLErrors')).innerHTML).toBeFalsy()
    expect((await findByTestId('rendercount')).innerHTML).toBe('2')
  })

  it(`networkError occured and isSubmitSuccessful is false`, async () => {
    const TestShippingAddressFormMock: MockedResponse<TestShippingAddressFormMutation> = {
      request: {
        query: TestShippingAddressFormDocument,
        variables: { customerNote: 'joi' },
      },
      error: new Error('Network Error'),
    }

    count = 0
    const { findByTestId, getByTestId, findByText } = render(
      <MockedProvider mocks={[TestShippingAddressFormMock]} addTypename={false}>
        <FormShippingAddress />
      </MockedProvider>,
    )

    fireEvent.click(await findByText('Submit'))
    expect((await findByTestId('isSubmitting')).innerHTML).toBeTruthy()

    await waitFor(() => expect(getByTestId('notSubmitting')).toBeTruthy())

    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeFalsy()
    expect((await findByTestId('result')).innerHTML).toBeFalsy()
    expect((await findByTestId('networkError')).innerHTML).toBe('Network Error')
    expect((await findByTestId('graphQLErrors')).innerHTML).toBeFalsy()
    expect((await findByTestId('rendercount')).innerHTML).toBe('1')
  })

  it(`graphqlErrors occured and isSubmitSuccessful is false`, async () => {
    const TestShippingAddressFormMock: MockedResponse<TestShippingAddressFormMutation> = {
      request: {
        query: TestShippingAddressFormDocument,
        variables: { customerNote: 'joi' },
      },
      result: { errors: [new GraphQLError('GraphQL Error')] },
    }

    count = 0
    const { findByTestId, getByTestId, findByText } = render(
      <MockedProvider mocks={[TestShippingAddressFormMock]} addTypename={false}>
        <FormShippingAddress />
      </MockedProvider>,
    )

    fireEvent.click(await findByText('Submit'))
    expect((await findByTestId('isSubmitting')).innerHTML).toBeTruthy()

    await waitFor(() => expect(getByTestId('notSubmitting')).toBeTruthy())

    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeFalsy()
    expect((await findByTestId('result')).innerHTML).toBeFalsy()
    expect((await findByTestId('networkError')).innerHTML).toBeFalsy()
    expect((await findByTestId('graphQLErrors')).innerHTML).toBe('GraphQL Error')
    expect((await findByTestId('rendercount')).innerHTML).toBe('1')
  })

  it('should be possible to modify the variables', async () => {
    const TestShippingAddressFormMock = {
      request: {
        query: TestShippingAddressFormDocument,
        variables: { customerNote: 'joi2' },
      },
      result: { data: { setShippingAddressesOnCart: { cart: { id: '123' } } } },
    }

    count = 0
    let result: TestShippingAddressFormMutation | undefined
    const { findByTestId, getByTestId, findByText } = render(
      <MockedProvider mocks={[TestShippingAddressFormMock]} addTypename={false}>
        <FormShippingAddress
          onValid={async (exec, variables) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            result = (await exec({
              ...variables,
              customerNote: 'joi2',
            })) as TestShippingAddressFormMutation
          }}
        />
      </MockedProvider>,
    )

    fireEvent.click(await findByText('Submit'))
    expect((await findByTestId('isSubmitting')).innerHTML).toBeTruthy()
    await waitFor(() => expect(getByTestId('notSubmitting')).toBeTruthy())

    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeTruthy()
    expect((await findByTestId('result')).innerHTML).toMatchInlineSnapshot(
      `"{"setShippingAddressesOnCart":{"cart":{"id":"123"}}}"`,
    )
    expect((await findByTestId('networkError')).innerHTML).toBeFalsy()
    expect((await findByTestId('graphQLErrors')).innerHTML).toBeFalsy()
    expect((await findByTestId('rendercount')).innerHTML).toBe('1')
    expect(result).toMatchObject(TestShippingAddressFormMock.result.data)
  })

  function FormSyncWithQuery() {
    const { reset, watch } = useFormApolloContext<
      TestEmailCartMutation,
      TestEmailCartMutationVariables
    >()
    const { data } = useQuery(TestEmailCartGetDocument, { variables: { cartId: '123' } })
    const cartId = data?.cart?.id
    const email = data?.cart?.email ?? undefined
    useEffect(async () => {
      reset({ cartId, email }, { keepValues: true })
    }, [cartId, email, reset])
    return <div data-testid='watchedEmail'>{watch('email')}</div>
  }

  const FormEmailCart = () => {
    const form = useFormApollo(
      { mutation: TestEmailCartDocument },
      { defaultValues: { cartId: '123' } },
    )

    return (
      <FormProviderApollo {...form}>
        <form onSubmit={form.handleSubmit()}>
          <button type='submit'>Submit</button>
          <input type='text' data-testid='email' {...form.register('email')} />
          <div data-testid='rendercount'>{count}</div>
          <FormState />
          <FormResult />
          <FormSyncWithQuery />
        </form>
      </FormProviderApollo>
    )
  }

  it('updates the form when the results come in', async () => {
    const TestEmailCartMock: MockedResponse<TestEmailCartMutation> = {
      request: {
        query: TestEmailCartDocument,
        variables: { cartId: '123', email: 'paul@reachdigital.nl' },
      },
      result: {
        data: { setGuestEmailOnCart: { cart: { id: '123', email: 'paul@reachdigital.nl' } } },
      },
    }

    const TestEmailCartGetMock: MockedResponse<TestEmailCartGetQuery> = {
      request: {
        query: TestEmailCartGetDocument,
        variables: { cartId: '123' },
      },
      result: {
        data: { cart: { id: '123', email: 'paul2@reachdigital.nl' } },
      },
      delay: 100,
    }

    const { findByTestId, getByTestId, findByText } = render(
      <MockedProvider mocks={[TestEmailCartMock, TestEmailCartGetMock]} addTypename={false}>
        <FormEmailCart />
      </MockedProvider>,
    )

    fireEvent.change(getByTestId('email'), { target: { value: 'paul@reachdigital.nl' } })

    expect(await findByTestId('dirty')).toBeInTheDocument()

    fireEvent.click(await findByText('Submit'))

    expect((await findByTestId('isSubmitting')).innerHTML).toBeTruthy()

    await waitFor(() => expect(getByTestId('notSubmitting')).toBeTruthy())

    expect((await findByTestId('networkError')).innerHTML).toBeFalsy()
    expect((await findByTestId('graphQLErrors')).innerHTML).toBeFalsy()

    expect((await findByTestId('isSubmitSuccessful')).innerHTML).toBeTruthy()
    expect((await findByTestId('result')).innerHTML).toMatchInlineSnapshot(
      `"{"setGuestEmailOnCart":{"cart":{"id":"123","email":"paul@reachdigital.nl"}}}"`,
    )

    expect((await findByTestId('watchedEmail')).innerHTML).toBe('')
  })
})
