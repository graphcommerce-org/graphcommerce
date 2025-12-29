import { useFormState } from '@graphcommerce/ecommerce-ui'
import type { ButtonProps, LinkOrButtonProps } from '@graphcommerce/next-ui'
import { Button, LinkOrButton } from '@graphcommerce/next-ui'
import { useStoreSwitcherForm } from './useStoreSwitcher'

export function StoreSwitcherApplyButton(props: ButtonProps<'button'>) {
  const { control } = useStoreSwitcherForm()
  const formState = useFormState({ control })
  return <Button type='submit' loading={formState.isSubmitting} {...props} />
}

export function StoreSwitcherLinkOrButton(props: LinkOrButtonProps) {
  const { control } = useStoreSwitcherForm()
  const formState = useFormState({ control })
  return <LinkOrButton type='submit' loading={formState.isSubmitting} {...props} />
}
