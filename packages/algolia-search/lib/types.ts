export type AlgoliaProductHit = {
  algoliaLastUpdateAtCET: string
  categories: { [key: string]: string[] }
  categories_without_path: string[]
  categoryIds: string[]
  created_at: string
  image_url: string
  name: string
  objectID: string
  price: {
    [key: string]: {
      default: number
      default_formated: string
      default_original_formated: string
      special_from_date: number
      special_to_date: string
    }
  }
  price_with_tax: {
    [key: string]: {
      default: number
      default_formated: string
      default_original_formated: string
      special_from_date: number
      special_to_date: string
    }
  }
  rating_summary: number | null
  sku: string
  thumbnail_url: string
  type_id: string
  url: string
  visibility_catalog: number
  visibility_search: number
  __position: number
}

export type AlgoliaCategoryHit = {
  objectID: string
  name: string
  path: string
  product_count: number
  level: number
  url: string
  include_in_menu: number
  _tags: string[]
  popularity: number
  algoliaLastUpdateAtCET: string | Date
}

export type AlgoliaPageHit = {
  objectID: string
  name: string
  slug: string
  url: string
  content: string
  algoliaLastUpdateAtCET: string
}
