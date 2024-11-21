/* eslint-disable import/no-extraneous-dependencies */
import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { Page } from '@playwright/test'
import { CartAgreementsDocument } from '../components/CartAgreementsForm/CartAgreements.gql'

export async function fillCartAgreementsForm(
  page: Page,
  client: ApolloClient<NormalizedCacheObject>,
) {
  const res = (await client.query({ query: CartAgreementsDocument })).data

  for await (const agreement of res.checkoutAgreements ?? []) {
    // eslint-disable-next-line no-continue
    if (!agreement?.agreement_id || agreement?.mode === 'AUTO') continue

    await page.locator(`input[name="agreement\\[${agreement.agreement_id}\\]"]`).click()
  }
}
