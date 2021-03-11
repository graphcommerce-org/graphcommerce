/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fs from 'fs'
import { FetchResult } from '@apollo/client'
import { config } from 'dotenv'
import { print } from 'graphql'
import fetch from 'node-fetch'
import { EnvConfigDocument, EnvConfigQuery } from './EnvConfig.gql'

config()

async function configToPublicEnv() {
  const req = await fetch('http://localhost:3001/api/graphql', {
    headers: {
      accept: '*/*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      operationName: null,
      variables: null,
      query: print(EnvConfigDocument),
    }),
    // '{"operationName":null,"variables":{},"query":"{\\n  availableStores {\\n    absolute_footer\\n    allow_guests_to_write_product_reviews\\n    allow_items\\n    allow_order\\n    autocomplete_on_storefront\\n    base_currency_code\\n    store_code\\n    store_name\\n    locale\\n    base_currency_code\\n    default_display_currency_code\\n    title_suffix\\n    title_prefix\\n    title_separator\\n    default_title\\n    cms_home_page\\n    catalog_default_sort_by\\n    category_url_suffix\\n    product_url_suffix\\n    base_link_url\\n    root_category_uid\\n    weight_unit\\n  }\\n}\\n"}',
    method: 'POST',
  })
  const response = ((await req.json()) || {}) as FetchResult<EnvConfigQuery>

  const data = Object.fromEntries(
    (response.data!.envConfig || []).map((entry) => [entry!.store_code, entry]),
  )
  fs.writeFile('./global-manifest.json', JSON.stringify(data), (err) => {
    if (err) throw err
    console.info('Global data manifest written to file')
  })
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
// eslint-disable-next-line no-console
configToPublicEnv().then(console.log).catch(console.error)
