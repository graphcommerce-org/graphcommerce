import { FieldPath, FieldValues, useWatch } from '@graphcommerce/ecommerce-ui'
import {
  ActionCard,
  ActionCardListForm,
  ActionCardProps,
  FormRow,
  useStorefrontConfig,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { CompanyName } from './CompanyName'
import { CompanyVAT } from './CompanyVAT'
import { CompanyFieldsOptions, useCompanyFieldsForm } from './useCompanyFieldsForm'

export type CompanyFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = CompanyFieldsOptions<TFieldValues, TName>

export function CompanyFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CompanyFieldsProps<TFieldValues, TName>) {
  const { ...rest } = props
  const form = useCompanyFieldsForm(rest)
  const { name, control } = form

  const isCompany = useWatch({ name: name.isCompany, control })

  const enable =
    useStorefrontConfig().customerCompanyFieldsEnable ??
    import.meta.graphCommerce.customerCompanyFieldsEnable

  if (!enable) return null

  return (
    <>
      <FormRow>
        <ActionCardListForm<ActionCardProps, TFieldValues>
          render={ActionCard}
          control={control}
          name={name.isCompany}
          size='medium'
          layout='inline'
          variant='outlined'
          color='secondary'
          required
          items={[
            { value: false, title: t`Private` },
            { value: true, title: t`Business` },
          ]}
        />
      </FormRow>

      {/* <FormDivider /> */}

      {/* <SwitchElement
        label={<Trans>Company</Trans>}
        control={control}
        name={name.isCompany}
        color='secondary'
      /> */}

      {/* <CheckboxElement label={<Trans>Company</Trans>} control={control} name={name.isCompany} /> */}
      {isCompany && (
        <FormRow>
          <CompanyName {...props} />
          {import.meta.graphCommerce.magentoVersion >= 245 && <CompanyVAT {...props} />}
        </FormRow>
      )}
    </>
  )
}
