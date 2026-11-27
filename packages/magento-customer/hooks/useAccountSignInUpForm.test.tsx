// @vitest-environment happy-dom
import type * as ReactHookForm from '@graphcommerce/react-hook-form'
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAccountSignInUpForm } from './useAccountSignInUpForm'

vi.mock('@graphcommerce/next-config/config', () => ({ enableGuestCheckoutLogin: true }))
vi.mock('@graphcommerce/framer-next-pages', () => ({ usePageContext: () => undefined }))
vi.mock('@graphcommerce/next-ui', () => ({ useUrlQuery: () => [{}, async () => {}] }))
vi.mock('@graphcommerce/graphql', () => ({ useQuery: () => ({ data: undefined }) }))
vi.mock('./useCustomerPermissions', () => ({ useCustomerAccountCanSignUp: () => true }))
const session = vi.hoisted(() => ({
  current: {
    token: undefined as string | undefined,
    valid: false,
    email: undefined as string | undefined,
  },
}))
vi.mock('./useCustomerSession', () => ({ useCustomerSession: () => session.current }))
vi.mock('@graphcommerce/react-hook-form', async () => {
  const rhf = await vi.importActual<typeof ReactHookForm>('react-hook-form')
  return {
    useWatch: rhf.useWatch,
    useFormGqlQuery: (_document: unknown, options: Parameters<typeof rhf.useForm>[0]) => ({
      ...rhf.useForm(options),
      data: { isEmailAvailable: { is_email_available: false } },
    }),
  }
})

describe('useAccountSignInUpForm', () => {
  beforeEach(() => {
    session.current = { token: undefined, valid: false, email: undefined }
  })

  it('fills in the email of the expired session without a cached customer', () => {
    session.current = { token: 'test-token', valid: false, email: 'customer@example.test' }
    const { result } = renderHook(() => useAccountSignInUpForm())

    expect(result.current.mode).toBe('session-expired')
    expect(result.current.form.getValues('email')).toBe('customer@example.test')
  })

  it('shows the password step after an email submitted with Enter', async () => {
    const { result } = renderHook(() => useAccountSignInUpForm())

    const email = result.current.form.register('email', { required: true })
    await act(() =>
      email.onChange({ target: { name: 'email', value: 'a@example.com' }, type: 'change' }),
    )
    await act(() => result.current.submit())

    expect(result.current.mode).toBe('signin')
  })
})
