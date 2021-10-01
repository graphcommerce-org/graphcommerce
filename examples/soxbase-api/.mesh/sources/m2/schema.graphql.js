const { buildSchema, Source } = require('graphql');

const source = new Source(/* GraphQL */`
schema {
  query: Query
  mutation: Mutation
}

type Query {
  """Get a list of available store views and their config information."""
  availableStores(
    """Filter store views by current store group"""
    useCurrentGroup: Boolean
  ): [StoreConfig]
  """Returns information about shopping cart"""
  cart(cart_id: String!): Cart
  categories(
    """Identifies which Category filter inputs to search for and return."""
    filters: CategoryFilterInput
    """Specifies the maximum number of results to return at once. This attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
  ): CategoryResult
  """The category query searches for categories that match the criteria specified in the search and filter attributes."""
  category(
    """Id of the category."""
    id: Int
  ): CategoryTree @deprecated(reason: "Use 'categoryList' query instead of 'category' query")
  """Returns an array of categories based on the specified filters."""
  categoryList(
    """Identifies which Category filter inputs to search for and return."""
    filters: CategoryFilterInput
  ): [CategoryTree]
  """The Checkout Agreements information"""
  checkoutAgreements: [CheckoutAgreement]
  """The CMS block query returns information about CMS blocks"""
  cmsBlocks(
    """Identifiers of the CMS blocks"""
    identifiers: [String]
  ): CmsBlocks
  """The CMS page query returns information about a CMS page"""
  cmsPage(
    """Id of the CMS page"""
    id: Int
    """Identifier of the CMS page"""
    identifier: String
  ): CmsPage
  """Return products that have been added to the specified compare list"""
  compareList(uid: ID!): CompareList
  """The countries query provides information for all countries."""
  countries: [Country]
  """The countries query provides information for a single country."""
  country(id: String): Country
  """The currency query returns information about store currency."""
  currency: Currency
  """The customAttributeMetadata query returns the attribute type, given an attribute code and entity type"""
  customAttributeMetadata(attributes: [AttributeInput!]!): CustomAttributeMetadata
  """The customer query returns information about a customer account"""
  customer: Customer
  """Returns information about the customer shopping cart"""
  customerCart: Cart!
  """The query returns the contents of a customer's downloadable products"""
  customerDownloadableProducts: CustomerDownloadableProducts
  customerOrders: CustomerOrders @deprecated(reason: "Use orders from customer instead")
  """Return a list of customer payment tokens"""
  customerPaymentTokens: CustomerPaymentTokens
  """Retrieve secure PayPal url for Payments Pro Hosted Solution transaction."""
  getHostedProUrl(input: HostedProUrlInput!): HostedProUrl
  """Retrieve payment credentials for transaction. Use this query for Payflow Link and Payments Advanced payment methods."""
  getPayflowLinkToken(input: PayflowLinkTokenInput!): PayflowLinkToken
  isEmailAvailable(
    """The new customer email"""
    email: String!
  ): IsEmailAvailableOutput
  mollieCustomerOrder(
    """The hash added to your custom URL"""
    hash: String
  ): CustomerOrder
  molliePaymentMethods(input: MolliePaymentMethodsInput): MolliePaymentMethodsOutput
  """The pickup locations query searches for locations that match the search request requirements."""
  pickupLocations(
    """Perform search by location using radius and search term."""
    area: AreaInput
    """Apply filters by attributes."""
    filters: PickupLocationFilterInput
    """Specifies which attribute to sort on, and whether to return the results in ascending or descending order."""
    sort: PickupLocationSortInput
    """The maximum number of pickup locations to return at once. The attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
    """Information about products which should be delivered."""
    productsInfo: [ProductInfoInput]
  ): PickupLocations
  """Retrieves metadata required by clients to render the Reviews section."""
  productReviewRatingsMetadata: ProductReviewRatingsMetadata!
  """The products query searches for products that match the criteria specified in the search and filter attributes."""
  products(
    """Performs a full-text search using the specified key words."""
    search: String
    """Identifies which product attributes to search for and return."""
    filter: ProductAttributeFilterInput
    """Specifies the maximum number of results to return at once. This attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
    """Specifies which attributes to sort on, and whether to return the results in ascending or descending order."""
    sort: ProductAttributeSortInput
  ): Products
  """The store config query"""
  storeConfig: StoreConfig
  """The urlResolver query returns the relative URL for a specified product, category or CMS page, using as input a url_key appended by the url_suffix, if one exists"""
  urlResolver(url: String!): EntityUrl
  """The wishlist query returns the contents of a customer's wish list"""
  wishlist: WishlistOutput @deprecated(reason: "Moved under \`Customer\` \`wishlist\`")
}

"""The type contains information about a store config"""
type StoreConfig {
  """Footer Miscellaneous HTML"""
  absolute_footer: String
  """Indicates whether guest users can write product reviews. Possible values: 1 (Yes) and 0 (No)"""
  allow_guests_to_write_product_reviews: String
  """The value of the Allow Gift Messages for Order Items option"""
  allow_items: String
  """The value of the Allow Gift Messages on Order Level option"""
  allow_order: String
  """Enable autocomplete on login and forgot password forms"""
  autocomplete_on_storefront: Boolean
  """Base currency code"""
  base_currency_code: String
  """Base link URL for the store"""
  base_link_url: String
  """Base media URL for the store"""
  base_media_url: String
  """Base static URL for the store"""
  base_static_url: String
  """Base URL for the store"""
  base_url: String
  """Braintree cc vault status."""
  braintree_cc_vault_active: String
  """Default Sort By."""
  catalog_default_sort_by: String
  """Corresponds to the 'Display Prices In Product Lists' field. It indicates how FPT information is displayed on category pages"""
  category_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  """Category URL Suffix."""
  category_url_suffix: String
  """CMS Home Page"""
  cms_home_page: String
  """CMS No Cookies Page"""
  cms_no_cookies: String
  """CMS No Route Page"""
  cms_no_route: String
  """A code assigned to the store to identify it"""
  code: String @deprecated(reason: "Use \`store_code\` instead.")
  """The configuration setting determines which thumbnail should be used in the cart for configurable products."""
  configurable_thumbnail_source: String
  """Copyright"""
  copyright: String
  """Default Meta Description"""
  default_description: String
  """Default display currency code"""
  default_display_currency_code: String
  """Default Meta Keywords"""
  default_keywords: String
  """Default Page Title"""
  default_title: String
  """Display Demo Store Notice"""
  demonotice: Int
  """Default Web URL"""
  front: String
  """Products per Page on Grid Default Value."""
  grid_per_page: Int
  """Products per Page on Grid Allowed Values."""
  grid_per_page_values: String
  """Scripts and Style Sheets"""
  head_includes: String
  """Favicon Icon"""
  head_shortcut_icon: String
  """Logo Image"""
  header_logo_src: String
  """The ID number assigned to the store"""
  id: Int @deprecated(reason: "Use \`store_code\` instead.")
  """Indicates whether the store view has been designated as the default within the store group"""
  is_default_store: Boolean
  """Indicates whether the store group has been designated as the default within the website"""
  is_default_store_group: Boolean
  """List Mode."""
  list_mode: String
  """Products per Page on List Default Value."""
  list_per_page: Int
  """Products per Page on List Allowed Values."""
  list_per_page_values: String
  """Store locale"""
  locale: String
  """Logo Image Alt"""
  logo_alt: String
  """Logo Attribute Height"""
  logo_height: Int
  """Logo Attribute Width"""
  logo_width: Int
  """Indicates whether wishlists are enabled (1) or disabled (0)"""
  magento_wishlist_general_is_enabled: String
  """The minimum number of characters required for a valid password."""
  minimum_password_length: String
  """Default No-route URL"""
  no_route: String
  """Payflow Pro vault status."""
  payment_payflowpro_cc_vault_active: String
  """Corresponds to the 'Display Prices On Product View Page' field. It indicates how FPT information is displayed on product pages"""
  product_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  """Indicates whether product reviews are enabled. Possible values: 1 (Yes) and 0 (No)"""
  product_reviews_enabled: String
  """Product URL Suffix."""
  product_url_suffix: String
  """The number of different character classes required in a password (lowercase, uppercase, digits, special characters)."""
  required_character_classes_number: String
  """The ID of the root category"""
  root_category_id: Int @deprecated(reason: "Use \`root_category_uid\` instead")
  """The unique ID for a \`CategoryInterface\` object."""
  root_category_uid: ID
  """Corresponds to the 'Display Prices In Sales Modules' field. It indicates how FPT information is displayed on cart, checkout, and order pages"""
  sales_fixed_product_tax_display_setting: FixedProductTaxDisplaySettings
  """Secure base link URL for the store"""
  secure_base_link_url: String
  """Secure base media URL for the store"""
  secure_base_media_url: String
  """Secure base static URL for the store"""
  secure_base_static_url: String
  """Secure base URL for the store"""
  secure_base_url: String
  """Email to a Friend configuration."""
  send_friend: SendFriendConfiguration
  """Show Breadcrumbs for CMS Pages"""
  show_cms_breadcrumbs: Int
  """The unique ID of the store view. In the Admin, this is called the Store View Code. When making a GraphQL call, assign this value to the \`Store\` header to provide the scope"""
  store_code: ID
  """The unique ID assigned to the store group. In the Admin, this is called the Store Name"""
  store_group_code: ID
  """The label assigned to the store group"""
  store_group_name: String
  """The label assigned to the store view"""
  store_name: String
  """The store view sort order"""
  store_sort_order: Int
  """Timezone of the store"""
  timezone: String
  """Page Title Prefix"""
  title_prefix: String
  """Page Title Separator."""
  title_separator: String
  """Page Title Suffix"""
  title_suffix: String
  """The configuration determines if the store code should be used in the URL"""
  use_store_in_url: Boolean
  """The unique ID for the website"""
  website_code: ID
  """The ID number assigned to the website store"""
  website_id: Int @deprecated(reason: "The field should not be used on the storefront")
  """The label assigned to the website"""
  website_name: String
  """The unit of weight"""
  weight_unit: String
  """Welcome Text"""
  welcome: String
}

"""This enumeration display settings for the fixed product tax"""
enum FixedProductTaxDisplaySettings {
  """The displayed price includes the FPT amount without displaying the ProductPrice.fixed_product_taxes values. This value corresponds to 'Including FPT only'"""
  INCLUDE_FPT_WITHOUT_DETAILS
  """The displayed price includes the FPT amount while displaying the values of ProductPrice.fixed_product_taxes separately. This value corresponds to 'Including FPT and FPT description'"""
  INCLUDE_FPT_WITH_DETAILS
  """The displayed price does not include the FPT amount. The values of ProductPrice.fixed_product_taxes and the price including the FPT are displayed separately. This value corresponds to 'Excluding FPT, Including FPT description and final price'"""
  EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS
  """The displayed price does not include the FPT amount. The values from ProductPrice.fixed_product_taxes are not displayed. This value corresponds to 'Excluding FPT'"""
  EXCLUDE_FPT_WITHOUT_DETAILS
  """The FPT feature is not enabled. You can omit  ProductPrice.fixed_product_taxes from your query"""
  FPT_DISABLED
}

type SendFriendConfiguration {
  """Indicates whether the Email to a Friend feature is enabled."""
  enabled_for_customers: Boolean!
  """Indicates whether the Email to a Friend feature is enabled for guests."""
  enabled_for_guests: Boolean!
}

type Cart {
  """An array of coupons that have been applied to the cart"""
  applied_coupon: AppliedCoupon @deprecated(reason: "Use applied_coupons instead")
  """An array of \`AppliedCoupon\` objects. Each object contains the \`code\` text attribute, which specifies the coupon code"""
  applied_coupons: [AppliedCoupon]
  """Available payment methods"""
  available_payment_methods: [AvailablePaymentMethod]
  billing_address: BillingCartAddress
  email: String
  """The entered gift message for the cart"""
  gift_message: GiftMessage
  """The unique ID for a \`Cart\` object"""
  id: ID!
  is_virtual: Boolean!
  items: [CartItemInterface]
  """Available issuers for the selected payment method"""
  mollie_available_issuers: [MollieIssuer]
  prices: CartPrices
  selected_payment_method: SelectedPaymentMethod
  shipping_addresses: [ShippingCartAddress]!
  total_quantity: Float!
}

type AppliedCoupon {
  code: String!
}

type AvailablePaymentMethod {
  """The payment method code"""
  code: String!
  """Available issuers for this payment method"""
  mollie_available_issuers: [MollieIssuer]
  """Retrieve meta information for this payment method (image)"""
  mollie_meta: MolliePaymentMethodMeta!
  """The payment method title."""
  title: String!
}

type MollieIssuer {
  code: String
  image: String!
  name: String
  svg: String!
}

type MolliePaymentMethodMeta {
  image: String
}

type BillingCartAddress implements CartAddressInterface {
  city: String!
  company: String
  country: CartAddressCountry!
  customer_notes: String @deprecated(reason: "The field is used only in shipping address")
  firstname: String!
  lastname: String!
  postcode: String
  region: CartAddressRegion
  street: [String]!
  telephone: String!
}

interface CartAddressInterface {
  city: String!
  company: String
  country: CartAddressCountry!
  firstname: String!
  lastname: String!
  postcode: String
  region: CartAddressRegion
  street: [String]!
  telephone: String!
}

type CartAddressCountry {
  code: String!
  label: String!
}

type CartAddressRegion {
  code: String
  label: String
  region_id: Int
}

"""Contains the text of a gift message, its sender, and recipient"""
type GiftMessage {
  """Sender name"""
  from: String!
  """Gift message text"""
  message: String!
  """Recipient name"""
  to: String!
}

interface CartItemInterface {
  id: String! @deprecated(reason: "Use \`uid\` instead")
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

type CartItemPrices {
  """An array of discounts to be applied to the cart item"""
  discounts: [Discount]
  price: Money!
  row_total: Money!
  row_total_including_tax: Money!
  """The total of all discounts applied to the item"""
  total_item_discount: Money
}

"""Defines an individual discount. A discount can be applied to the cart as a whole or to an item."""
type Discount {
  """The amount of the discount"""
  amount: Money!
  """A description of the discount"""
  label: String!
}

"""A Money object defines a monetary value, including a numeric value and a currency code."""
type Money {
  """A three-letter currency code, such as USD or EUR"""
  currency: CurrencyEnum
  """A number expressing a monetary value"""
  value: Float
}

"""The list of available currency codes"""
enum CurrencyEnum {
  AFN
  ALL
  AZN
  DZD
  AOA
  ARS
  AMD
  AWG
  AUD
  BSD
  BHD
  BDT
  BBD
  BYN
  BZD
  BMD
  BTN
  BOB
  BAM
  BWP
  BRL
  GBP
  BND
  BGN
  BUK
  BIF
  KHR
  CAD
  CVE
  CZK
  KYD
  GQE
  CLP
  CNY
  COP
  KMF
  CDF
  CRC
  HRK
  CUP
  DKK
  DJF
  DOP
  XCD
  EGP
  SVC
  ERN
  EEK
  ETB
  EUR
  FKP
  FJD
  GMD
  GEK
  GEL
  GHS
  GIP
  GTQ
  GNF
  GYD
  HTG
  HNL
  HKD
  HUF
  ISK
  INR
  IDR
  IRR
  IQD
  ILS
  JMD
  JPY
  JOD
  KZT
  KES
  KWD
  KGS
  LAK
  LVL
  LBP
  LSL
  LRD
  LYD
  LTL
  MOP
  MKD
  MGA
  MWK
  MYR
  MVR
  LSM
  MRO
  MUR
  MXN
  MDL
  MNT
  MAD
  MZN
  MMK
  NAD
  NPR
  ANG
  YTL
  NZD
  NIC
  NGN
  KPW
  NOK
  OMR
  PKR
  PAB
  PGK
  PYG
  PEN
  PHP
  PLN
  QAR
  RHD
  RON
  RUB
  RWF
  SHP
  STD
  SAR
  RSD
  SCR
  SLL
  SGD
  SKK
  SBD
  SOS
  ZAR
  KRW
  LKR
  SDG
  SRD
  SZL
  SEK
  CHF
  SYP
  TWD
  TJS
  TZS
  THB
  TOP
  TTD
  TND
  TMM
  USD
  UGX
  UAH
  AED
  UYU
  UZS
  VUV
  VEB
  VEF
  VND
  CHE
  CHW
  XOF
  WST
  YER
  ZMK
  ZWD
  TRY
  AZM
  ROL
  TRL
  XPF
}

"""The ProductInterface contains attributes that are common to all types of products. Note that descriptions may not be available for custom and EAV attributes."""
interface ProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
}

"""CategoryInterface contains the full set of attributes that can be returned in a category search."""
interface CategoryInterface {
  available_sort_by: [String]
  """Breadcrumbs, parent categories info."""
  breadcrumbs: [Breadcrumb]
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled"""
  canonical_url: String
  children_count: String
  """Category CMS Block."""
  cms_block: CmsBlock
  """Timestamp indicating when the category was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  custom_layout_update_file: String
  """The attribute to use for sorting."""
  default_sort_by: String
  """An optional description of the category."""
  description: String
  display_mode: String
  filter_price_range: Float
  """An ID that uniquely identifies the category."""
  id: Int @deprecated(reason: "Use the \`uid\` argument instead.")
  image: String
  include_in_menu: Int
  is_anchor: Int
  landing_page: Int
  """Indicates the depth of the category within the tree."""
  level: Int
  meta_description: String
  meta_keywords: String
  meta_title: String
  """The display name of the category."""
  name: String
  """Category Path."""
  path: String
  """Category path in store."""
  path_in_store: String
  """The position of the category relative to other categories at the same level in tree."""
  position: Int
  """The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not."""
  product_count: Int
  """The list of products assigned to the category."""
  products(
    """Specifies the maximum number of results to return at once. This attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
    """Specifies which attributes to sort on, and whether to return the results in ascending or descending order."""
    sort: ProductAttributeSortInput
  ): CategoryProducts
  """The unique ID for a \`CategoryInterface\` object."""
  uid: ID!
  """Timestamp indicating when the category was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """The url key assigned to the category."""
  url_key: String
  """The url path assigned to the category."""
  url_path: String
  """The part of the category URL that is appended after the url key"""
  url_suffix: String
}

"""Breadcrumb item."""
type Breadcrumb {
  """Category ID."""
  category_id: Int @deprecated(reason: "Use the \`category_uid\` argument instead.")
  """Category level."""
  category_level: Int
  """Category name."""
  category_name: String
  """The unique ID for a \`Breadcrumb\` object."""
  category_uid: ID!
  """Category URL key."""
  category_url_key: String
  """Category URL path."""
  category_url_path: String
}

"""CMS block defines all CMS block information"""
type CmsBlock {
  """CMS block content"""
  content: String
  """CMS block identifier"""
  identifier: String
  """CMS block title"""
  title: String
}

"""ProductAttributeSortInput specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order. It's possible to sort products using searchable attributes with enabled 'Use in Filter Options' option"""
input ProductAttributeSortInput {
  """Attribute label: Product Name"""
  name: SortEnum
  """Sort by the position assigned to each product."""
  position: SortEnum
  """Attribute label: Price"""
  price: SortEnum
  """Sort by the search relevance score (default)."""
  relevance: SortEnum
}

"""This enumeration indicates whether to return results in ascending or descending order"""
enum SortEnum {
  ASC
  DESC
}

"""The category products object returned in the Category query."""
type CategoryProducts {
  """An array of products that are assigned to the category."""
  items: [ProductInterface]
  """An object that includes the page_info and currentPage values specified in the query."""
  page_info: SearchResultPageInfo
  """The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not."""
  total_count: Int
}

"""SearchResultPageInfo provides navigation for the query response"""
type SearchResultPageInfo {
  """Specifies which page of results to return"""
  current_page: Int
  """Specifies the maximum number of items to return"""
  page_size: Int
  """Total pages"""
  total_pages: Int
}

type ComplexTextValue {
  """HTML format"""
  html: String!
}

"""Product image information. Contains the image URL and label."""
type ProductImage implements MediaGalleryInterface {
  """Whether the image is hidden from view."""
  disabled: Boolean
  """The label of the product image or video."""
  label: String
  """The media item's position after it has been sorted."""
  position: Int
  """The URL of the product image or video."""
  url: String
}

"""Contains basic information about a product image or video."""
interface MediaGalleryInterface {
  """Whether the image is hidden from view."""
  disabled: Boolean
  """The label of the product image or video."""
  label: String
  """The media item's position after it has been sorted."""
  position: Int
  """The URL of the product image or video."""
  url: String
}

"""MediaGalleryEntry defines characteristics about images and videos associated with a specific product."""
type MediaGalleryEntry {
  """Contains a ProductMediaGalleryEntriesContent object."""
  content: ProductMediaGalleryEntriesContent
  """Whether the image is hidden from view."""
  disabled: Boolean
  """The path of the image on the server."""
  file: String
  """The identifier assigned to the object."""
  id: Int @deprecated(reason: "Use \`uid\` instead.")
  """The alt text displayed on the UI when the user points to the image."""
  label: String
  """image or video."""
  media_type: String
  """The media item's position after it has been sorted."""
  position: Int
  """Array of image types. It can have the following values: image, small_image, thumbnail."""
  types: [String]
  """The unique ID for a \`MediaGalleryEntry\` object."""
  uid: ID!
  """Contains a ProductMediaGalleryEntriesVideoContent object."""
  video_content: ProductMediaGalleryEntriesVideoContent
}

"""ProductMediaGalleryEntriesContent contains an image in base64 format and basic information about the image."""
type ProductMediaGalleryEntriesContent {
  """The image in base64 format."""
  base64_encoded_data: String
  """The file name of the image."""
  name: String
  """The MIME type of the file, such as image/png."""
  type: String
}

"""ProductMediaGalleryEntriesVideoContent contains a link to a video file and basic information about the video."""
type ProductMediaGalleryEntriesVideoContent {
  """Must be external-video."""
  media_type: String
  """A description of the video."""
  video_description: String
  """Optional data about the video."""
  video_metadata: String
  """Describes the video source."""
  video_provider: String
  """The title of the video."""
  video_title: String
  """The URL to the video."""
  video_url: String
}

"""ProductPrices is deprecated, replaced by PriceRange. The ProductPrices object contains the regular price of an item, as well as its minimum and maximum prices. Only composite products, which include bundle, configurable, and grouped products, can contain a minimum and maximum price."""
type ProductPrices {
  """The highest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the to value."""
  maximalPrice: Price @deprecated(reason: "Use PriceRange.maximum_price.")
  """The lowest possible final price for all the options defined within a composite product. If you are specifying a price range, this would be the from value."""
  minimalPrice: Price @deprecated(reason: "Use PriceRange.minimum_price.")
  """The base price of a product."""
  regularPrice: Price @deprecated(reason: "Use regular_price from PriceRange.minimum_price or PriceRange.maximum_price.")
}

"""Price is deprecated, replaced by ProductPrice. The Price object defines the price of a product as well as any tax-related adjustments."""
type Price {
  """An array that provides information about tax, weee, or weee_tax adjustments."""
  adjustments: [PriceAdjustment] @deprecated(reason: "Price is deprecated, use ProductPrice.")
  """The price of a product plus a three-letter currency code."""
  amount: Money @deprecated(reason: "Price is deprecated, use ProductPrice.")
}

"""PriceAdjustment is deprecated. Taxes will be included or excluded in the price. The PricedAdjustment object defines the amount of money to apply as an adjustment, the type of adjustment to apply, and whether the item is included or excluded from the adjustment."""
type PriceAdjustment {
  """The amount of the price adjustment and its currency code."""
  amount: Money
  """Indicates whether the adjustment involves tax, weee, or weee_tax."""
  code: PriceAdjustmentCodesEnum @deprecated(reason: "PriceAdjustment is deprecated.")
  """Indicates whether the entity described by the code attribute is included or excluded from the adjustment."""
  description: PriceAdjustmentDescriptionEnum @deprecated(reason: "PriceAdjustment is deprecated.")
}

"""PriceAdjustment.code is deprecated. This enumeration contains values defined in modules other than the Catalog module."""
enum PriceAdjustmentCodesEnum {
  TAX
  WEEE
  WEEE_TAX
}

"""PriceAdjustmentDescriptionEnum is deprecated. This enumeration states whether a price adjustment is included or excluded."""
enum PriceAdjustmentDescriptionEnum {
  INCLUDED
  EXCLUDED
}

"""Price range for a product. If the product has a single price, the minimum and maximum price will be the same."""
type PriceRange {
  """The highest possible price for the product."""
  maximum_price: ProductPrice
  """The lowest possible price for the product."""
  minimum_price: ProductPrice!
}

"""Represents a product price."""
type ProductPrice {
  """The price discount. Represents the difference between the regular and final price."""
  discount: ProductDiscount
  """The final price of the product after discounts applied."""
  final_price: Money!
  """The multiple FPTs that can be applied to a product price."""
  fixed_product_taxes: [FixedProductTax]
  """The regular price of the product."""
  regular_price: Money!
}

"""A discount applied to a product price."""
type ProductDiscount {
  """The actual value of the discount."""
  amount_off: Float
  """The discount expressed a percentage."""
  percent_off: Float
}

"""A single FPT that can be applied to a product price."""
type FixedProductTax {
  """Amount of the FPT as a money object."""
  amount: Money
  """The label assigned to the FPT to be displayed on the frontend."""
  label: String
}

"""A price based on the quantity purchased."""
type TierPrice {
  """The price discount that this tier represents."""
  discount: ProductDiscount
  final_price: Money
  """The minimum number of items that must be purchased to qualify for this price tier."""
  quantity: Float
}

"""ProductLinks contains information about linked products, including the link type and product type of each item."""
interface ProductLinksInterface {
  """One of related, associated, upsell, or crosssell."""
  link_type: String
  """The SKU of the linked product."""
  linked_product_sku: String
  """The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable)."""
  linked_product_type: String
  """The position within the list of product links."""
  position: Int
  """The identifier of the linked product."""
  sku: String
}

type ProductReviews {
  """An array of product reviews."""
  items: [ProductReview]!
  """Metadata for pagination rendering."""
  page_info: SearchResultPageInfo!
}

"""Details of a product review"""
type ProductReview {
  """The average rating for product review."""
  average_rating: Float!
  """Date indicating when the review was created."""
  created_at: String!
  """The customer's nickname. Defaults to the customer name, if logged in"""
  nickname: String!
  """Contains details about the reviewed product"""
  product: ProductInterface!
  """An array of ratings by rating category, such as quality, price, and value"""
  ratings_breakdown: [ProductReviewRating]!
  """The summary (title) of the review"""
  summary: String!
  """The review text."""
  text: String!
}

type ProductReviewRating {
  """The label assigned to an aspect of a product that is being rated, such as quality or price"""
  name: String!
  """The rating value given by customer. By default, possible values range from 1 to 5."""
  value: String!
}

"""This enumeration states whether a product stock status is in stock or out of stock"""
enum ProductStockStatus {
  IN_STOCK
  OUT_OF_STOCK
}

"""ProductTierPrices is deprecated and has been replaced by TierPrice. The ProductTierPrices object defines a tier price, which is a quantity discount offered to a specific customer group."""
type ProductTierPrices {
  """The ID of the customer group."""
  customer_group_id: String @deprecated(reason: "customer_group_id is not relevant for storefront.")
  """The percentage discount of the item."""
  percentage_value: Float @deprecated(reason: "ProductTierPrices is deprecated. Use TierPrice.discount.")
  """The number of items that must be purchased to qualify for tier pricing."""
  qty: Float @deprecated(reason: "ProductTierPrices is deprecated, use TierPrice.quantity.")
  """The price of the fixed price item."""
  value: Float @deprecated(reason: "ProductTierPrices is deprecated. Use TierPrice.final_price")
  """The ID assigned to the website."""
  website_id: Float @deprecated(reason: "website_id is not relevant for storefront.")
}

"""The object contains URL rewrite details"""
type UrlRewrite {
  """Request parameters"""
  parameters: [HttpQueryParameter]
  """Request URL"""
  url: String
}

"""The object details of target path parameters"""
type HttpQueryParameter {
  """Parameter name"""
  name: String
  """Parameter value"""
  value: String
}

"""Website is deprecated because it is should not be used on storefront. The type contains information about a website"""
type Website {
  """A code assigned to the website to identify it"""
  code: String @deprecated(reason: "The field should not be used on the storefront.")
  """The default group ID that the website has"""
  default_group_id: String @deprecated(reason: "The field should not be used on the storefront.")
  """The ID number assigned to the website"""
  id: Int @deprecated(reason: "The field should not be used on the storefront.")
  """Specifies if this is the default website"""
  is_default: Boolean @deprecated(reason: "The field should not be used on the storefront.")
  """The website name. Websites use this name to identify it easier."""
  name: String @deprecated(reason: "The field should not be used on the storefront.")
  """The attribute to use for sorting websites"""
  sort_order: Int @deprecated(reason: "The field should not be used on the storefront.")
}

type CartPrices {
  applied_taxes: [CartTaxItem]
  discount: CartDiscount @deprecated(reason: "Use discounts instead ")
  """An array of applied discounts"""
  discounts: [Discount]
  grand_total: Money
  subtotal_excluding_tax: Money
  subtotal_including_tax: Money
  subtotal_with_discount_excluding_tax: Money
}

type CartTaxItem {
  amount: Money!
  label: String!
}

type CartDiscount {
  amount: Money!
  label: [String]!
}

type SelectedPaymentMethod {
  """The payment method code"""
  code: String!
  """Retrieve meta information for this payment method (image)"""
  mollie_meta: MolliePaymentMethodMeta!
  """The purchase order number."""
  purchase_order_number: String
  """The payment method title."""
  title: String!
}

type ShippingCartAddress implements CartAddressInterface {
  available_shipping_methods: [AvailableShippingMethod]
  cart_items: [CartItemQuantity] @deprecated(reason: "\`cart_items_v2\` should be used instead")
  cart_items_v2: [CartItemInterface]
  city: String!
  company: String
  country: CartAddressCountry!
  customer_notes: String
  firstname: String!
  items_weight: Float @deprecated(reason: "This information shoud not be exposed on frontend")
  lastname: String!
  pickup_location_code: String
  postcode: String
  region: CartAddressRegion
  selected_shipping_method: SelectedShippingMethod
  street: [String]!
  telephone: String!
}

type AvailableShippingMethod {
  amount: Money!
  available: Boolean!
  base_amount: Money @deprecated(reason: "The field should not be used on the storefront")
  carrier_code: String!
  carrier_title: String!
  error_message: String
  """Could be null if method is not available"""
  method_code: String
  """Could be null if method is not available"""
  method_title: String
  price_excl_tax: Money!
  price_incl_tax: Money!
}

"""Deprecated: \`cart_items\` field of \`ShippingCartAddress\` returns now  \`CartItemInterface\` instead of \`CartItemQuantity\`"""
type CartItemQuantity {
  cart_item_id: Int! @deprecated(reason: "\`cart_items\` field of \`ShippingCartAddress\` returns now \`CartItemInterface\` instead of \`CartItemQuantity\`")
  quantity: Float! @deprecated(reason: "\`cart_items\` field of \`ShippingCartAddress\` returns now \`CartItemInterface\` instead of \`CartItemQuantity\`")
}

type SelectedShippingMethod {
  amount: Money!
  base_amount: Money @deprecated(reason: "The field should not be used on the storefront")
  carrier_code: String!
  carrier_title: String!
  method_code: String!
  method_title: String!
}

"""CategoryFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for."""
input CategoryFilterInput {
  """Filter by the unique category ID for a \`CategoryInterface\` object."""
  category_uid: FilterEqualTypeInput
  """Deprecated: use 'category_uid' to filter uniquely identifiers of categories."""
  ids: FilterEqualTypeInput
  """Filter by the display name of the category."""
  name: FilterMatchTypeInput
  """Filter by the unique parent category ID for a \`CategoryInterface\` object."""
  parent_category_uid: FilterEqualTypeInput
  """Filter by the unique parent category ID for a \`CategoryInterface\` object."""
  parent_id: FilterEqualTypeInput
  """Filter by the part of the URL that identifies the category."""
  url_key: FilterEqualTypeInput
  """Filter by the URL path for the category."""
  url_path: FilterEqualTypeInput
}

"""Defines a filter that matches the input exactly."""
input FilterEqualTypeInput {
  """A string to filter on"""
  eq: String
  """An array of values to filter on"""
  in: [String]
}

"""Defines a filter that performs a fuzzy search."""
input FilterMatchTypeInput {
  """One or more words to filter on"""
  match: String
}

"""A collection of CategoryTree objects and pagination information."""
type CategoryResult {
  """A list of categories that match the filter criteria."""
  items: [CategoryTree]
  """An object that includes the page_info and currentPage values specified in the query."""
  page_info: SearchResultPageInfo
  """The total number of categories that match the criteria."""
  total_count: Int
}

"""Category Tree implementation."""
type CategoryTree implements CategoryInterface {
  available_sort_by: [String]
  """Breadcrumbs, parent categories info."""
  breadcrumbs: [Breadcrumb]
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Categories' is enabled"""
  canonical_url: String
  """Child categories tree."""
  children: [CategoryTree]
  children_count: String
  """Category CMS Block."""
  cms_block: CmsBlock
  """Timestamp indicating when the category was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  custom_layout_update_file: String
  """The attribute to use for sorting."""
  default_sort_by: String
  """An optional description of the category."""
  description: String
  display_mode: String
  filter_price_range: Float
  """An ID that uniquely identifies the category."""
  id: Int @deprecated(reason: "Use the \`uid\` argument instead.")
  image: String
  include_in_menu: Int
  is_anchor: Int
  landing_page: Int
  """Indicates the depth of the category within the tree."""
  level: Int
  meta_description: String
  meta_keywords: String
  meta_title: String
  """The display name of the category."""
  name: String
  """Category Path."""
  path: String
  """Category path in store."""
  path_in_store: String
  """The position of the category relative to other categories at the same level in tree."""
  position: Int
  """The number of products in the category that are marked as visible. By default, in complex products, parent products are visible, but their child products are not."""
  product_count: Int
  """The list of products assigned to the category."""
  products(
    """Specifies the maximum number of results to return at once. This attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
    """Specifies which attributes to sort on, and whether to return the results in ascending or descending order."""
    sort: ProductAttributeSortInput
  ): CategoryProducts
  """The unique ID for a \`CategoryInterface\` object."""
  uid: ID!
  """Timestamp indicating when the category was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """The url key assigned to the category."""
  url_key: String
  """The url path assigned to the category."""
  url_path: String
  """The part of the category URL that is appended after the url key"""
  url_suffix: String
}

"""Defines all Checkout Agreement information"""
type CheckoutAgreement {
  """Checkout Agreement identifier"""
  agreement_id: Int!
  """Checkout Agreement checkbox text"""
  checkbox_text: String!
  """Checkout Agreement content"""
  content: String!
  """Checkout Agreement content height"""
  content_height: String
  """Is Checkout Agreement content in HTML format"""
  is_html: Boolean!
  mode: CheckoutAgreementMode!
  """Checkout Agreement name"""
  name: String!
}

enum CheckoutAgreementMode {
  AUTO
  MANUAL
}

"""CMS blocks information"""
type CmsBlocks {
  """An array of CMS blocks"""
  items: [CmsBlock]
}

"""CMS page defines all CMS page information"""
type CmsPage {
  """CMS page content"""
  content: String
  """CMS page content heading"""
  content_heading: String
  """Identifier of the CMS page"""
  identifier: String
  """CMS page meta description"""
  meta_description: String
  """CMS page meta keywords"""
  meta_keywords: String
  """CMS page meta title"""
  meta_title: String
  """CMS page content heading"""
  page_layout: String
  """CMS page title"""
  title: String
  """URL key of CMS page"""
  url_key: String
}

type CompareList {
  """An array of attributes that can be used for comparing products"""
  attributes: [ComparableAttribute]
  """The number of items in the compare list"""
  item_count: Int!
  """An array of products to compare"""
  items: [ComparableItem]
  """The unique ID assigned to the compare list"""
  uid: ID!
}

type ComparableAttribute {
  """An attribute code that is enabled for product comparisons"""
  code: String!
  """The label of the attribute code"""
  label: String!
}

type ComparableItem {
  """An array of product attributes that can be used to compare products"""
  attributes: [ProductAttribute]!
  """Contains details about a product in a compare list"""
  product: ProductInterface!
  """The unique ID of an item in a compare list"""
  uid: ID!
}

type ProductAttribute {
  """The unique identifier for a product attribute code."""
  code: String!
  """The display value of the attribute"""
  value: String!
}

type Country {
  available_regions: [Region]
  full_name_english: String
  full_name_locale: String
  """The unique ID for a \`Country\` object."""
  id: String
  three_letter_abbreviation: String
  two_letter_abbreviation: String
}

type Region {
  code: String
  """The unique ID for a \`Region\` object."""
  id: Int
  name: String
}

type Currency {
  available_currency_codes: [String]
  base_currency_code: String
  base_currency_symbol: String
  default_display_currecy_code: String @deprecated(reason: "Symbol was missed. Use \`default_display_currency_code\`.")
  default_display_currecy_symbol: String @deprecated(reason: "Symbol was missed. Use \`default_display_currency_symbol\`.")
  default_display_currency_code: String
  default_display_currency_symbol: String
  exchange_rates: [ExchangeRate]
}

type ExchangeRate {
  currency_to: String
  rate: Float
}

"""AttributeInput specifies the attribute_code and entity_type to search"""
input AttributeInput {
  """The unique identifier for an attribute code. This value should be in lowercase letters without spaces."""
  attribute_code: String
  """The type of entity that defines the attribute"""
  entity_type: String
}

"""CustomAttributeMetadata defines an array of attribute_codes and entity_types"""
type CustomAttributeMetadata {
  """An array of attributes"""
  items: [Attribute]
}

"""Attribute contains the attribute_type of the specified attribute_code and entity_type"""
type Attribute {
  """The unique identifier for an attribute code. This value should be in lowercase letters without spaces."""
  attribute_code: String
  """Attribute options list."""
  attribute_options: [AttributeOption]
  """The data type of the attribute"""
  attribute_type: String
  """The type of entity that defines the attribute"""
  entity_type: String
  """The frontend input type of the attribute"""
  input_type: String
}

"""Attribute option."""
type AttributeOption {
  """Attribute option label."""
  label: String
  """Attribute option value."""
  value: String
}

"""Customer defines the customer name and address and other details"""
type Customer {
  """An array containing the customer's shipping and billing addresses"""
  addresses: [CustomerAddress]
  """Indicates whether the customer has enabled remote shopping assistance"""
  allow_remote_shopping_assistance: Boolean!
  """The contents of the customer's compare list"""
  compare_list: CompareList
  """Timestamp indicating when the account was created"""
  created_at: String
  """The customer's date of birth"""
  date_of_birth: String
  """The ID assigned to the billing address"""
  default_billing: String
  """The ID assigned to the shipping address"""
  default_shipping: String
  """The customer's date of birth"""
  dob: String @deprecated(reason: "Use \`date_of_birth\` instead")
  """The customer's email address. Required"""
  email: String
  """The customer's first name"""
  firstname: String
  """The customer's gender (Male - 1, Female - 2)"""
  gender: Int
  group_id: Int @deprecated(reason: "Customer group should not be exposed in the storefront scenarios")
  """The ID assigned to the customer"""
  id: Int @deprecated(reason: "id is not needed as part of Customer because on server side it can be identified based on customer token used for authentication. There is no need to know customer ID on the client side.")
  """Indicates whether the customer is subscribed to the company's newsletter"""
  is_subscribed: Boolean
  """The customer's family name"""
  lastname: String
  """The customer's middle name"""
  middlename: String
  orders(
    """Defines the filter to use for searching customer orders"""
    filter: CustomerOrdersFilterInput
    """Specifies which page of results to return. The default value is 1"""
    currentPage: Int = 1
    """Specifies the maximum number of results to return at once. The default value is 20"""
    pageSize: Int = 20
  ): CustomerOrders
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """Contains the customer's product reviews"""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The customer's Value-added tax (VAT) number (for corporate customers)"""
  taxvat: String
  """Contains a customer's wish lists"""
  wishlist: Wishlist! @deprecated(reason: "Use \`Customer.wishlists\` or \`Customer.wishlist_v2\`")
  """Retrieve the specified wish list identified by the unique ID for a \`Wishlist\` object"""
  wishlist_v2(id: ID!): Wishlist
  """An array of wishlists. In Magento Open Source, customers are limited to one wish list. The number of wish lists is configurable for Magento Commerce"""
  wishlists(
    """Specifies the maximum number of results to return at once. This attribute is optional."""
    pageSize: Int = 20
    """Specifies which page of results to return. The default value is 1."""
    currentPage: Int = 1
  ): [Wishlist]!
}

"""CustomerAddress contains detailed information about a customer's billing and shipping addresses"""
type CustomerAddress {
  """The city or town"""
  city: String
  """The customer's company"""
  company: String
  """The customer's country"""
  country_code: CountryCodeEnum
  """The customer's country"""
  country_id: String @deprecated(reason: "Use \`country_code\` instead.")
  custom_attributes: [CustomerAddressAttribute] @deprecated(reason: "Custom attributes should not be put into container")
  """The customer ID"""
  customer_id: Int @deprecated(reason: "customer_id is not needed as part of CustomerAddress, address ID (id) is unique identifier for the addresses.")
  """Indicates whether the address is the default billing address"""
  default_billing: Boolean
  """Indicates whether the address is the default shipping address"""
  default_shipping: Boolean
  """Address extension attributes"""
  extension_attributes: [CustomerAddressAttribute]
  """The fax number"""
  fax: String
  """The first name of the person associated with the shipping/billing address"""
  firstname: String
  """The ID assigned to the address object"""
  id: Int
  """The family name of the person associated with the shipping/billing address"""
  lastname: String
  """The middle name of the person associated with the shipping/billing address"""
  middlename: String
  """The customer's ZIP or postal code"""
  postcode: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """An object containing the region name, region code, and region ID"""
  region: CustomerAddressRegion
  """The unique ID for a pre-defined region"""
  region_id: Int
  """An array of strings that define the street number and name"""
  street: [String]
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The telephone number"""
  telephone: String
  """The customer's Value-added tax (VAT) number (for corporate customers)"""
  vat_id: String
}

"""The list of countries codes"""
enum CountryCodeEnum {
  """Afghanistan"""
  AF
  """Åland Islands"""
  AX
  """Albania"""
  AL
  """Algeria"""
  DZ
  """American Samoa"""
  AS
  """Andorra"""
  AD
  """Angola"""
  AO
  """Anguilla"""
  AI
  """Antarctica"""
  AQ
  """Antigua & Barbuda"""
  AG
  """Argentina"""
  AR
  """Armenia"""
  AM
  """Aruba"""
  AW
  """Australia"""
  AU
  """Austria"""
  AT
  """Azerbaijan"""
  AZ
  """Bahamas"""
  BS
  """Bahrain"""
  BH
  """Bangladesh"""
  BD
  """Barbados"""
  BB
  """Belarus"""
  BY
  """Belgium"""
  BE
  """Belize"""
  BZ
  """Benin"""
  BJ
  """Bermuda"""
  BM
  """Bhutan"""
  BT
  """Bolivia"""
  BO
  """Bosnia & Herzegovina"""
  BA
  """Botswana"""
  BW
  """Bouvet Island"""
  BV
  """Brazil"""
  BR
  """British Indian Ocean Territory"""
  IO
  """British Virgin Islands"""
  VG
  """Brunei"""
  BN
  """Bulgaria"""
  BG
  """Burkina Faso"""
  BF
  """Burundi"""
  BI
  """Cambodia"""
  KH
  """Cameroon"""
  CM
  """Canada"""
  CA
  """Cape Verde"""
  CV
  """Cayman Islands"""
  KY
  """Central African Republic"""
  CF
  """Chad"""
  TD
  """Chile"""
  CL
  """China"""
  CN
  """Christmas Island"""
  CX
  """Cocos (Keeling) Islands"""
  CC
  """Colombia"""
  CO
  """Comoros"""
  KM
  """Congo-Brazzaville"""
  CG
  """Congo-Kinshasa"""
  CD
  """Cook Islands"""
  CK
  """Costa Rica"""
  CR
  """Côte d’Ivoire"""
  CI
  """Croatia"""
  HR
  """Cuba"""
  CU
  """Cyprus"""
  CY
  """Czech Republic"""
  CZ
  """Denmark"""
  DK
  """Djibouti"""
  DJ
  """Dominica"""
  DM
  """Dominican Republic"""
  DO
  """Ecuador"""
  EC
  """Egypt"""
  EG
  """El Salvador"""
  SV
  """Equatorial Guinea"""
  GQ
  """Eritrea"""
  ER
  """Estonia"""
  EE
  """Ethiopia"""
  ET
  """Falkland Islands"""
  FK
  """Faroe Islands"""
  FO
  """Fiji"""
  FJ
  """Finland"""
  FI
  """France"""
  FR
  """French Guiana"""
  GF
  """French Polynesia"""
  PF
  """French Southern Territories"""
  TF
  """Gabon"""
  GA
  """Gambia"""
  GM
  """Georgia"""
  GE
  """Germany"""
  DE
  """Ghana"""
  GH
  """Gibraltar"""
  GI
  """Greece"""
  GR
  """Greenland"""
  GL
  """Grenada"""
  GD
  """Guadeloupe"""
  GP
  """Guam"""
  GU
  """Guatemala"""
  GT
  """Guernsey"""
  GG
  """Guinea"""
  GN
  """Guinea-Bissau"""
  GW
  """Guyana"""
  GY
  """Haiti"""
  HT
  """Heard &amp; McDonald Islands"""
  HM
  """Honduras"""
  HN
  """Hong Kong SAR China"""
  HK
  """Hungary"""
  HU
  """Iceland"""
  IS
  """India"""
  IN
  """Indonesia"""
  ID
  """Iran"""
  IR
  """Iraq"""
  IQ
  """Ireland"""
  IE
  """Isle of Man"""
  IM
  """Israel"""
  IL
  """Italy"""
  IT
  """Jamaica"""
  JM
  """Japan"""
  JP
  """Jersey"""
  JE
  """Jordan"""
  JO
  """Kazakhstan"""
  KZ
  """Kenya"""
  KE
  """Kiribati"""
  KI
  """Kuwait"""
  KW
  """Kyrgyzstan"""
  KG
  """Laos"""
  LA
  """Latvia"""
  LV
  """Lebanon"""
  LB
  """Lesotho"""
  LS
  """Liberia"""
  LR
  """Libya"""
  LY
  """Liechtenstein"""
  LI
  """Lithuania"""
  LT
  """Luxembourg"""
  LU
  """Macau SAR China"""
  MO
  """Macedonia"""
  MK
  """Madagascar"""
  MG
  """Malawi"""
  MW
  """Malaysia"""
  MY
  """Maldives"""
  MV
  """Mali"""
  ML
  """Malta"""
  MT
  """Marshall Islands"""
  MH
  """Martinique"""
  MQ
  """Mauritania"""
  MR
  """Mauritius"""
  MU
  """Mayotte"""
  YT
  """Mexico"""
  MX
  """Micronesia"""
  FM
  """Moldova"""
  MD
  """Monaco"""
  MC
  """Mongolia"""
  MN
  """Montenegro"""
  ME
  """Montserrat"""
  MS
  """Morocco"""
  MA
  """Mozambique"""
  MZ
  """Myanmar (Burma)"""
  MM
  """Namibia"""
  NA
  """Nauru"""
  NR
  """Nepal"""
  NP
  """Netherlands"""
  NL
  """Netherlands Antilles"""
  AN
  """New Caledonia"""
  NC
  """New Zealand"""
  NZ
  """Nicaragua"""
  NI
  """Niger"""
  NE
  """Nigeria"""
  NG
  """Niue"""
  NU
  """Norfolk Island"""
  NF
  """Northern Mariana Islands"""
  MP
  """North Korea"""
  KP
  """Norway"""
  NO
  """Oman"""
  OM
  """Pakistan"""
  PK
  """Palau"""
  PW
  """Palestinian Territories"""
  PS
  """Panama"""
  PA
  """Papua New Guinea"""
  PG
  """Paraguay"""
  PY
  """Peru"""
  PE
  """Philippines"""
  PH
  """Pitcairn Islands"""
  PN
  """Poland"""
  PL
  """Portugal"""
  PT
  """Qatar"""
  QA
  """Réunion"""
  RE
  """Romania"""
  RO
  """Russia"""
  RU
  """Rwanda"""
  RW
  """Samoa"""
  WS
  """San Marino"""
  SM
  """São Tomé & Príncipe"""
  ST
  """Saudi Arabia"""
  SA
  """Senegal"""
  SN
  """Serbia"""
  RS
  """Seychelles"""
  SC
  """Sierra Leone"""
  SL
  """Singapore"""
  SG
  """Slovakia"""
  SK
  """Slovenia"""
  SI
  """Solomon Islands"""
  SB
  """Somalia"""
  SO
  """South Africa"""
  ZA
  """South Georgia & South Sandwich Islands"""
  GS
  """South Korea"""
  KR
  """Spain"""
  ES
  """Sri Lanka"""
  LK
  """St. Barthélemy"""
  BL
  """St. Helena"""
  SH
  """St. Kitts & Nevis"""
  KN
  """St. Lucia"""
  LC
  """St. Martin"""
  MF
  """St. Pierre & Miquelon"""
  PM
  """St. Vincent & Grenadines"""
  VC
  """Sudan"""
  SD
  """Suriname"""
  SR
  """Svalbard & Jan Mayen"""
  SJ
  """Swaziland"""
  SZ
  """Sweden"""
  SE
  """Switzerland"""
  CH
  """Syria"""
  SY
  """Taiwan"""
  TW
  """Tajikistan"""
  TJ
  """Tanzania"""
  TZ
  """Thailand"""
  TH
  """Timor-Leste"""
  TL
  """Togo"""
  TG
  """Tokelau"""
  TK
  """Tonga"""
  TO
  """Trinidad & Tobago"""
  TT
  """Tunisia"""
  TN
  """Turkey"""
  TR
  """Turkmenistan"""
  TM
  """Turks & Caicos Islands"""
  TC
  """Tuvalu"""
  TV
  """Uganda"""
  UG
  """Ukraine"""
  UA
  """United Arab Emirates"""
  AE
  """United Kingdom"""
  GB
  """United States"""
  US
  """Uruguay"""
  UY
  """U.S. Outlying Islands"""
  UM
  """U.S. Virgin Islands"""
  VI
  """Uzbekistan"""
  UZ
  """Vanuatu"""
  VU
  """Vatican City"""
  VA
  """Venezuela"""
  VE
  """Vietnam"""
  VN
  """Wallis & Futuna"""
  WF
  """Western Sahara"""
  EH
  """Yemen"""
  YE
  """Zambia"""
  ZM
  """Zimbabwe"""
  ZW
}

type CustomerAddressAttribute {
  """Attribute code"""
  attribute_code: String
  """Attribute value"""
  value: String
}

"""CustomerAddressRegion defines the customer's state or province"""
type CustomerAddressRegion {
  """The state or province name"""
  region: String
  """The address region code"""
  region_code: String
  """The unique ID for a pre-defined region"""
  region_id: Int
}

"""Identifies the filter to use for filtering orders."""
input CustomerOrdersFilterInput {
  """Filters by order number."""
  number: FilterStringTypeInput
}

"""Defines a filter for an input string."""
input FilterStringTypeInput {
  """Filters items that are exactly the same as the specified string."""
  eq: String
  """Filters items that are exactly the same as entries specified in an array of strings."""
  in: [String]
  """Defines a filter that performs a fuzzy search using the specified string."""
  match: String
}

"""The collection of orders that match the conditions defined in the filter"""
type CustomerOrders {
  """An array of customer orders"""
  items: [CustomerOrder]!
  """An object that includes the current_page, page_info, and page_size values specified in the query"""
  page_info: SearchResultPageInfo
  """The total count of customer orders"""
  total_count: Int
}

"""Contains details about each of the customer's orders"""
type CustomerOrder {
  """The billing address for the order"""
  billing_address: OrderAddress
  """The shipping carrier for the order delivery"""
  carrier: String
  """Comments about the order"""
  comments: [SalesCommentItem]
  created_at: String @deprecated(reason: "Use the order_date attribute instead")
  """A list of credit memos"""
  credit_memos: [CreditMemo]
  """The entered gift message for the order"""
  gift_message: GiftMessage
  grand_total: Float @deprecated(reason: "Use the totals.grand_total attribute instead")
  """The unique ID for a \`CustomerOrder\` object"""
  id: ID!
  increment_id: String @deprecated(reason: "Use the id attribute instead")
  """A list of invoices for the order"""
  invoices: [Invoice]!
  """An array containing the items purchased in this order"""
  items: [OrderItemInterface]
  """The order number"""
  number: String!
  """The date the order was placed"""
  order_date: String!
  order_number: String! @deprecated(reason: "Use the number attribute instead")
  """Payment details for the order"""
  payment_methods: [OrderPaymentMethod]
  """A list of shipments for the order"""
  shipments: [OrderShipment]
  """The shipping address for the order"""
  shipping_address: OrderAddress
  """The delivery method for the order"""
  shipping_method: String
  """The current status of the order"""
  status: String!
  """Contains details about the calculated totals for this order"""
  total: OrderTotal
}

"""OrderAddress contains detailed information about an order's billing and shipping addresses"""
type OrderAddress {
  """The city or town"""
  city: String!
  """The customer's company"""
  company: String
  """The customer's country"""
  country_code: CountryCodeEnum
  """The fax number"""
  fax: String
  """The first name of the person associated with the shipping/billing address"""
  firstname: String!
  """The family name of the person associated with the shipping/billing address"""
  lastname: String!
  """The middle name of the person associated with the shipping/billing address"""
  middlename: String
  """The customer's order ZIP or postal code"""
  postcode: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """The state or province name"""
  region: String
  """The unique ID for a \`Region\` object of a pre-defined region"""
  region_id: ID
  """An array of strings that define the street number and name"""
  street: [String]!
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The telephone number"""
  telephone: String!
  """The customer's Value-added tax (VAT) number (for corporate customers)"""
  vat_id: String
}

"""Comment item details"""
type SalesCommentItem {
  """The text of the message"""
  message: String!
  """The timestamp of the comment"""
  timestamp: String!
}

"""Credit memo details"""
type CreditMemo {
  """Comments on the credit memo"""
  comments: [SalesCommentItem]
  """The unique ID for a \`CreditMemo\` object"""
  id: ID!
  """An array containing details about refunded items"""
  items: [CreditMemoItemInterface]
  """The sequential credit memo number"""
  number: String!
  """Contains details about the total refunded amount"""
  total: CreditMemoTotal
}

"""Credit memo item details"""
interface CreditMemoItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`CreditMemoItemInterface\` object"""
  id: ID!
  """The order item the credit memo is applied to"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product, including selected options"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """The number of refunded items"""
  quantity_refunded: Float
}

"""Order item details"""
interface OrderItemInterface {
  """The final discount information for the product"""
  discounts: [Discount]
  """The entered option for the base product, such as a logo or image"""
  entered_options: [OrderItemOption]
  """The unique ID for a \`OrderItemInterface\` object"""
  id: ID!
  """The name of the base product"""
  product_name: String
  """The sale price of the base product, including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The type of product, such as simple, configurable, etc."""
  product_type: String
  """URL key of the base product"""
  product_url_key: String
  """The number of canceled items"""
  quantity_canceled: Float
  """The number of invoiced items"""
  quantity_invoiced: Float
  """The number of units ordered for this item"""
  quantity_ordered: Float
  """The number of refunded items"""
  quantity_refunded: Float
  """The number of returned items"""
  quantity_returned: Float
  """The number of shipped items"""
  quantity_shipped: Float
  """The selected options for the base product, such as color or size"""
  selected_options: [OrderItemOption]
  """The status of the order item"""
  status: String
}

"""Represents order item options like selected or entered"""
type OrderItemOption {
  """The name of the option"""
  label: String!
  """The value of the option"""
  value: String!
}

"""Credit memo price details"""
type CreditMemoTotal {
  """An adjustment manually applied to the order"""
  adjustment: Money!
  """The final base grand total amount in the base currency"""
  base_grand_total: Money!
  """The applied discounts to the credit memo"""
  discounts: [Discount]
  """The final total amount, including shipping, discounts, and taxes"""
  grand_total: Money!
  """Contains details about the shipping and handling costs for the credit memo"""
  shipping_handling: ShippingHandling
  """The subtotal of the invoice, excluding shipping, discounts, and taxes"""
  subtotal: Money!
  """The credit memo tax details"""
  taxes: [TaxItem]
  """The shipping amount for the credit memo"""
  total_shipping: Money!
  """The amount of tax applied to the credit memo"""
  total_tax: Money!
}

"""The Shipping handling details"""
type ShippingHandling {
  """The shipping amount, excluding tax"""
  amount_excluding_tax: Money
  """The shipping amount, including tax"""
  amount_including_tax: Money
  """The applied discounts to the shipping"""
  discounts: [ShippingDiscount]
  """Contains details about taxes applied for shipping"""
  taxes: [TaxItem]
  """The total amount for shipping"""
  total_amount: Money!
}

"""Defines an individual shipping discount. This discount can be applied to shipping."""
type ShippingDiscount {
  """The amount of the discount"""
  amount: Money!
}

"""The tax item details"""
type TaxItem {
  """The amount of tax applied to the item"""
  amount: Money!
  """The rate used to calculate the tax"""
  rate: Float!
  """A title that describes the tax"""
  title: String!
}

"""Invoice details"""
type Invoice {
  """Comments on the invoice"""
  comments: [SalesCommentItem]
  """The unique ID for a \`Invoice\` object"""
  id: ID!
  """Invoiced product details"""
  items: [InvoiceItemInterface]
  """Sequential invoice number"""
  number: String!
  """Invoice total amount details"""
  total: InvoiceTotal
}

"""Invoice item details"""
interface InvoiceItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`InvoiceItemInterface\` object"""
  id: ID!
  """Contains details about an individual order item"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The number of invoiced items"""
  quantity_invoiced: Float
}

"""Contains price details from an invoice"""
type InvoiceTotal {
  """The final base grand total amount in the base currency"""
  base_grand_total: Money!
  """The applied discounts to the invoice"""
  discounts: [Discount]
  """The final total amount, including shipping, discounts, and taxes"""
  grand_total: Money!
  """Contains details about the shipping and handling costs for the invoice"""
  shipping_handling: ShippingHandling
  """The subtotal of the invoice, excluding shipping, discounts, and taxes"""
  subtotal: Money!
  """The invoice tax details"""
  taxes: [TaxItem]
  """The shipping amount for the invoice"""
  total_shipping: Money!
  """The amount of tax applied to the invoice"""
  total_tax: Money!
}

"""Contains details about the payment method used to pay for the order"""
type OrderPaymentMethod {
  """Additional data per payment method type"""
  additional_data: [KeyValue]
  """The label that describes the payment method"""
  name: String!
  """The payment method code that indicates how the order was paid for"""
  type: String!
}

"""The key-value type"""
type KeyValue {
  """The name part of the name/value pair"""
  name: String
  """The value part of the name/value pair"""
  value: String
}

"""Order shipment details"""
type OrderShipment {
  """Comments added to the shipment"""
  comments: [SalesCommentItem]
  """The unique ID for a \`OrderShipment\` object"""
  id: ID!
  """Contains items included in the shipment"""
  items: [ShipmentItemInterface]
  """The sequential credit shipment number"""
  number: String!
  """Contains shipment tracking details"""
  tracking: [ShipmentTracking]
}

"""Order shipment item details"""
interface ShipmentItemInterface {
  """The unique ID for a \`ShipmentItemInterface\` object"""
  id: ID!
  """Associated order item"""
  order_item: OrderItemInterface
  """Name of the base product"""
  product_name: String
  """Sale price for the base product"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """Number of shipped items"""
  quantity_shipped: Float!
}

"""Order shipment tracking details"""
type ShipmentTracking {
  """The shipping carrier for the order delivery"""
  carrier: String!
  """The tracking number of the order shipment"""
  number: String
  """The shipment tracking title"""
  title: String!
}

"""Contains details about the sales total amounts used to calculate the final price"""
type OrderTotal {
  """The final base grand total amount in the base currency"""
  base_grand_total: Money!
  """The applied discounts to the order"""
  discounts: [Discount]
  """The final total amount, including shipping, discounts, and taxes"""
  grand_total: Money!
  """Contains details about the shipping and handling costs for the order"""
  shipping_handling: ShippingHandling
  """The subtotal of the order, excluding shipping, discounts, and taxes"""
  subtotal: Money!
  """The order tax details"""
  taxes: [TaxItem]
  """The shipping amount for the order"""
  total_shipping: Money!
  """The amount of tax applied to the order"""
  total_tax: Money!
}

type Wishlist {
  """The unique ID for a \`Wishlist\` object"""
  id: ID
  items: [WishlistItem] @deprecated(reason: "Use field \`items_v2\` from type \`Wishlist\` instead")
  """The number of items in the wish list"""
  items_count: Int
  """An array of items in the customer's wish list"""
  items_v2(currentPage: Int = 1, pageSize: Int = 20): WishlistItems
  """An encrypted code that Magento uses to link to the wish list"""
  sharing_code: String
  """The time of the last modification to the wish list"""
  updated_at: String
}

type WishlistItem {
  """The time when the customer added the item to the wish list"""
  added_at: String
  """The customer's comment about this item"""
  description: String
  """The unique ID for a \`WishlistItem\` object"""
  id: Int
  product: ProductInterface
  """The quantity of this wish list item"""
  qty: Float
}

type WishlistItems {
  """A list of items in the wish list"""
  items: [WishlistItemInterface]!
  """Contains pagination metadata"""
  page_info: SearchResultPageInfo
}

interface WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

type SelectedCustomizableOption {
  """The unique ID for a \`CustomizableRadioOption\`, \`CustomizableDropDownOption\`, \`CustomizableMultipleOption\`, etc. of \`CustomizableOptionInterface\` objects"""
  customizable_option_uid: ID!
  id: Int! @deprecated(reason: "Use SelectedCustomizableOption.customizable_option_uid instead")
  is_required: Boolean!
  label: String!
  sort_order: Int!
  type: String!
  values: [SelectedCustomizableOptionValue]!
}

type SelectedCustomizableOptionValue {
  """The unique ID for a \`CustomizableMultipleValue\`, \`CustomizableRadioValue\`, \`CustomizableCheckboxValue\`, \`CustomizableDropDownValue\`, etc. objects"""
  customizable_option_value_uid: ID!
  id: Int! @deprecated(reason: "Use SelectedCustomizableOptionValue.customizable_option_value_uid instead")
  label: String!
  price: CartItemSelectedOptionValuePrice!
  value: String!
}

type CartItemSelectedOptionValuePrice {
  type: PriceTypeEnum!
  units: String!
  value: Float!
}

"""This enumeration the price type."""
enum PriceTypeEnum {
  FIXED
  PERCENT
  DYNAMIC
}

type CustomerDownloadableProducts {
  """List of purchased downloadable items"""
  items: [CustomerDownloadableProduct]
}

type CustomerDownloadableProduct {
  date: String
  download_url: String
  order_increment_id: String
  remaining_downloads: String
  status: String
}

type CustomerPaymentTokens {
  """An array of payment tokens"""
  items: [PaymentToken]!
}

"""The stored payment method available to the customer"""
type PaymentToken {
  """Stored account details"""
  details: String
  """The payment method code associated with the token"""
  payment_method_code: String!
  """The public hash of the token"""
  public_hash: String!
  type: PaymentTokenTypeEnum!
}

"""The list of available payment token types"""
enum PaymentTokenTypeEnum {
  card
  account
}

"""The required input to request the secure URL for Payments Pro Hosted Solution payment."""
input HostedProUrlInput {
  """The unique ID that identifies the customer's cart"""
  cart_id: String!
}

"""Contains secure URL used for Payments Pro Hosted Solution payment method."""
type HostedProUrl {
  """Secure Url generated by PayPal"""
  secure_form_url: String
}

"""Input required to fetch payment token information for Payflow Link and Payments Advanced payment methods."""
input PayflowLinkTokenInput {
  """The unique ID that identifies the customer's cart"""
  cart_id: String!
}

"""Contains information used to generate PayPal iframe for transaction. Applies to Payflow Link and Payments Advanced payment methods."""
type PayflowLinkToken {
  """Mode for Payflow transaction"""
  mode: PayflowLinkMode
  """PayPal URL used for requesting Payflow form"""
  paypal_url: String
  """Secure token generated by PayPal"""
  secure_token: String
  """Secure token ID generated by PayPal"""
  secure_token_id: String
}

"""Mode for payment: TEST or LIVE. Applies to Payflow Link and Payments Advanced payment methods."""
enum PayflowLinkMode {
  TEST
  LIVE
}

type IsEmailAvailableOutput {
  """Is email availabel value"""
  is_email_available: Boolean
}

input MolliePaymentMethodsInput {
  amount: Float!
  currency: String!
}

type MolliePaymentMethodsOutput {
  methods: [MolliePaymentMethod]
}

type MolliePaymentMethod {
  code: String
  image: String
  name: String
}

"""AreaInput defines the parameters which will be used for filter by specified location."""
input AreaInput {
  """The radius for the search in KM."""
  radius: Int!
  """The country code where search must be performed. Required parameter together with region, city or postcode."""
  search_term: String!
}

"""PickupLocationFilterInput defines the list of attributes and filters for the search."""
input PickupLocationFilterInput {
  """Filter by city."""
  city: FilterTypeInput
  """Filter by country."""
  country_id: FilterTypeInput
  """Filter by pickup location name."""
  name: FilterTypeInput
  """Filter by pickup location code."""
  pickup_location_code: FilterTypeInput
  """Filter by postcode."""
  postcode: FilterTypeInput
  """Filter by region."""
  region: FilterTypeInput
  """Filter by region id."""
  region_id: FilterTypeInput
  """Filter by street."""
  street: FilterTypeInput
}

"""FilterTypeInput specifies which action will be performed in a query """
input FilterTypeInput {
  """Equals"""
  eq: String
  finset: [String]
  """From. Must be used with 'to'"""
  from: String
  """Greater than"""
  gt: String
  """Greater than or equal to"""
  gteq: String
  """In. The value can contain a set of comma-separated values"""
  in: [String]
  """Like. The specified value can contain % (percent signs) to allow matching of 0 or more characters"""
  like: String
  """Less than"""
  lt: String
  """Less than or equal to"""
  lteq: String
  """More than or equal to"""
  moreq: String
  """Not equal to"""
  neq: String
  """Not in. The value can contain a set of comma-separated values"""
  nin: [String]
  """Not null"""
  notnull: String
  """Is null"""
  null: String
  """To. Must be used with 'from'"""
  to: String
}

"""PickupLocationSortInput specifies attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order."""
input PickupLocationSortInput {
  """City where pickup location is placed."""
  city: SortEnum
  """Name of the contact person."""
  contact_name: SortEnum
  """Id of the country in two letters."""
  country_id: SortEnum
  """Description of the pickup location."""
  description: SortEnum
  """Distance to the address, requested by distance filter. Applicable only with distance filter. If distance sort order is present, all other sort orders will be ignored."""
  distance: SortEnum
  """Contact email of the pickup location."""
  email: SortEnum
  """Contact fax of the pickup location."""
  fax: SortEnum
  """Geographic latitude where pickup location is placed."""
  latitude: SortEnum
  """Geographic longitude where pickup location is placed."""
  longitude: SortEnum
  """The pickup location name. Customer use this to identify the pickup location."""
  name: SortEnum
  """Contact phone number of the pickup location."""
  phone: SortEnum
  """A code assigned to pickup location to identify the source."""
  pickup_location_code: SortEnum
  """Postcode where pickup location is placed."""
  postcode: SortEnum
  """Name of the region."""
  region: SortEnum
  """Id of the region."""
  region_id: SortEnum
  """Street where pickup location is placed."""
  street: SortEnum
}

"""Product Information used for Pickup Locations search."""
input ProductInfoInput {
  """Product SKU."""
  sku: String!
}

"""Top level object returned in a pickup locations search."""
type PickupLocations {
  """An array of pickup locations that match the specific search request."""
  items: [PickupLocation]
  """An object that includes the page_info and currentPage values specified in the query."""
  page_info: SearchResultPageInfo
  """The number of products returned."""
  total_count: Int
}

"""Defines Pickup Location information."""
type PickupLocation {
  city: String
  contact_name: String
  country_id: String
  description: String
  email: String
  fax: String
  latitude: Float
  longitude: Float
  name: String
  phone: String
  pickup_location_code: String
  postcode: String
  region: String
  region_id: Int
  street: String
}

type ProductReviewRatingsMetadata {
  """List of product reviews sorted by position"""
  items: [ProductReviewRatingMetadata]!
}

type ProductReviewRatingMetadata {
  """An encoded rating ID."""
  id: String!
  """The label assigned to an aspect of a product that is being rated, such as quality or price"""
  name: String!
  """List of product review ratings sorted by position."""
  values: [ProductReviewRatingValueMetadata]!
}

type ProductReviewRatingValueMetadata {
  """A ratings scale, such as the number of stars awarded"""
  value: String!
  """An encoded rating value id."""
  value_id: String!
}

"""ProductAttributeFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for."""
input ProductAttributeFilterInput {
  """Attribute label: Activity"""
  activity: FilterEqualTypeInput
  """Attribute label: Category Gear"""
  category_gear: FilterEqualTypeInput
  """Deprecated: use \`category_uid\` to filter product by category id."""
  category_id: FilterEqualTypeInput
  """Filter product by the unique ID for a \`CategoryInterface\` object."""
  category_uid: FilterEqualTypeInput
  """Attribute label: Climate"""
  climate: FilterEqualTypeInput
  """Attribute label: Collar"""
  collar: FilterEqualTypeInput
  """Attribute label: Color"""
  color: FilterEqualTypeInput
  """Attribute label: Colors"""
  colors: FilterEqualTypeInput
  """Attribute label: Compatible Phones"""
  compatible_phones: FilterEqualTypeInput
  """Attribute label: Debug: colors"""
  debug_colors: FilterMatchTypeInput
  """Attribute label: Debug: labels"""
  debug_labels: FilterMatchTypeInput
  """Attribute label: Debug: landmarks"""
  debug_landmarks: FilterMatchTypeInput
  """Attribute label: Description"""
  description: FilterMatchTypeInput
  """Attribute label: Dominant color"""
  dominant_color: FilterEqualTypeInput
  """Attribute label: Eco Collection"""
  eco_collection: FilterEqualTypeInput
  """Attribute label: Erin Recommends"""
  erin_recommends: FilterEqualTypeInput
  """Attribute label: Features"""
  features_bags: FilterEqualTypeInput
  """Attribute label: Format"""
  format: FilterEqualTypeInput
  """Attribute label: Gender"""
  gender: FilterEqualTypeInput
  """Attribute label: Material"""
  material: FilterEqualTypeInput
  """Attribute label: Product Name"""
  name: FilterMatchTypeInput
  """Attribute label: New"""
  new: FilterEqualTypeInput
  """Attribute label: Pattern"""
  pattern: FilterEqualTypeInput
  """Attribute label: Performance Fabric"""
  performance_fabric: FilterEqualTypeInput
  """Attribute label: Price"""
  price: FilterRangeTypeInput
  """Attribute label: Art"""
  print_art: FilterEqualTypeInput
  """Attribute label: Holiday"""
  print_holiday: FilterEqualTypeInput
  """Attribute label: Search Labels"""
  print_labels: FilterEqualTypeInput
  """Attribute label: Search Landmarks"""
  print_landmarks: FilterEqualTypeInput
  """Attribute label: Landscape"""
  print_landscape: FilterEqualTypeInput
  """Attribute label: Mood"""
  print_mood: FilterEqualTypeInput
  """Attribute label: Type"""
  print_type: FilterEqualTypeInput
  """Attribute label: Sale"""
  sale: FilterEqualTypeInput
  """Attribute label: Short Description"""
  short_description: FilterMatchTypeInput
  """Attribute label: Size"""
  size: FilterEqualTypeInput
  """Attribute label: SKU"""
  sku: FilterEqualTypeInput
  """Attribute label: Sleeve"""
  sleeve: FilterEqualTypeInput
  """Attribute label: Strap/Handle"""
  strap_bags: FilterEqualTypeInput
  """Attribute label: Style Bags"""
  style_bags: FilterEqualTypeInput
  """Attribute label: Style Bottom"""
  style_bottom: FilterEqualTypeInput
  """Attribute label: Style General"""
  style_general: FilterEqualTypeInput
  """The part of the URL that identifies the product"""
  url_key: FilterEqualTypeInput
}

"""Defines a filter that matches a range of values, such as prices or dates."""
input FilterRangeTypeInput {
  """The beginning of the range"""
  from: String
  """The end of the range"""
  to: String
}

"""The Products object is the top-level object returned in a product search."""
type Products {
  """Layered navigation aggregations."""
  aggregations: [Aggregation]
  """Layered navigation filters array."""
  filters: [LayerFilter] @deprecated(reason: "Use aggregations instead")
  """An array of products that match the specified search criteria."""
  items: [ProductInterface]
  """An object that includes the page_info and currentPage values specified in the query."""
  page_info: SearchResultPageInfo
  """An object that includes the default sort field and all available sort fields."""
  sort_fields: SortFields
  """The number of products that are marked as visible. By default, in complex products, parent products are visible, but their child products are not."""
  total_count: Int
}

"""A bucket that contains information for each filterable option (such as price, category \`UID\`, and custom attributes)."""
type Aggregation {
  """Attribute code of the aggregation group."""
  attribute_code: String!
  """The number of options in the aggregation group."""
  count: Int
  """The aggregation display name."""
  label: String
  """Array of options for the aggregation."""
  options: [AggregationOption]
}

type AggregationOption implements AggregationOptionInterface {
  """The number of items that match the aggregation option."""
  count: Int
  """Aggregation option display label."""
  label: String
  """The internal ID that represents the value of the option."""
  value: String!
}

interface AggregationOptionInterface {
  """The number of items that match the aggregation option."""
  count: Int
  """Aggregation option display label."""
  label: String
  """The internal ID that represents the value of the option."""
  value: String!
}

type LayerFilter {
  """Array of filter items."""
  filter_items: [LayerFilterItemInterface] @deprecated(reason: "Use Aggregation.options instead.")
  """Count of filter items in filter group."""
  filter_items_count: Int @deprecated(reason: "Use Aggregation.count instead.")
  """Layered navigation filter name."""
  name: String @deprecated(reason: "Use Aggregation.label instead.")
  """Request variable name for filter query."""
  request_var: String @deprecated(reason: "Use Aggregation.attribute_code instead.")
}

interface LayerFilterItemInterface {
  """Count of items by filter."""
  items_count: Int @deprecated(reason: "Use AggregationOption.count instead.")
  """Filter label."""
  label: String @deprecated(reason: "Use AggregationOption.label instead.")
  """Value for filter request variable to be used in query."""
  value_string: String @deprecated(reason: "Use AggregationOption.value instead.")
}

"""SortFields contains a default value for sort fields and all available sort fields."""
type SortFields {
  """Default value of sort fields."""
  default: String
  """Available sort fields."""
  options: [SortField]
}

type SortField {
  """Label of sort field."""
  label: String
  """Attribute code of sort field."""
  value: String
}

"""EntityUrl is an output object containing the \`id\`, \`relative_url\`, and \`type\` attributes"""
type EntityUrl {
  canonical_url: String @deprecated(reason: "The canonical_url field is deprecated, use relative_url instead.")
  """The unique ID for a \`ProductInterface\`, \`CategoryInterface\`, \`CmsPage\`, etc. object associated with the specified url. This could be a product UID, category UID, or cms page UID."""
  entity_uid: ID
  """The ID assigned to the object associated with the specified url. This could be a product ID, category ID, or page ID."""
  id: Int @deprecated(reason: "Use \`entity_uid\` instead.")
  """301 or 302 HTTP code for url permanent or temporary redirect or 0 for the 200 no redirect"""
  redirectCode: Int
  """The internal relative URL. If the specified  url is a redirect, the query returns the redirected URL, not the original."""
  relative_url: String
  """One of PRODUCT, CATEGORY, or CMS_PAGE."""
  type: UrlRewriteEntityTypeEnum
}

"""This enumeration defines the entity type."""
enum UrlRewriteEntityTypeEnum {
  CMS_PAGE
  PRODUCT
  CATEGORY
}

"""Deprecated: \`Wishlist\` type should be used instead"""
type WishlistOutput {
  """An array of items in the customer's wish list"""
  items: [WishlistItem] @deprecated(reason: "Use field \`items\` from type \`Wishlist\` instead")
  """The number of items in the wish list"""
  items_count: Int @deprecated(reason: "Use field \`items_count\` from type \`Wishlist\` instead")
  """When multiple wish lists are enabled, the name the customer assigns to the wishlist"""
  name: String @deprecated(reason: "This field is related to Commerce functionality and is always \`null\` in Open Source edition")
  """An encrypted code that Magento uses to link to the wish list"""
  sharing_code: String @deprecated(reason: "Use field \`sharing_code\` from type \`Wishlist\` instead")
  """The time of the last modification to the wish list"""
  updated_at: String @deprecated(reason: "Use field \`updated_at\` from type \`Wishlist\` instead")
}

type Mutation {
  addBundleProductsToCart(input: AddBundleProductsToCartInput): AddBundleProductsToCartOutput
  addConfigurableProductsToCart(input: AddConfigurableProductsToCartInput): AddConfigurableProductsToCartOutput
  addDownloadableProductsToCart(input: AddDownloadableProductsToCartInput): AddDownloadableProductsToCartOutput
  """Add any type of product to the cart"""
  addProductsToCart(cartId: String!, cartItems: [CartItemInput!]!): AddProductsToCartOutput
  """Add products to the specified compare list"""
  addProductsToCompareList(input: AddProductsToCompareListInput): CompareList
  """Adds one or more products to the specified wish list. This mutation supports all product types"""
  addProductsToWishlist(wishlistId: ID!, wishlistItems: [WishlistItemInput!]!): AddProductsToWishlistOutput
  addSimpleProductsToCart(input: AddSimpleProductsToCartInput): AddSimpleProductsToCartOutput
  addVirtualProductsToCart(input: AddVirtualProductsToCartInput): AddVirtualProductsToCartOutput
  applyCouponToCart(input: ApplyCouponToCartInput): ApplyCouponToCartOutput
  """Assign the specified compare list to the logged in customer"""
  assignCompareListToCustomer(uid: ID!): AssignCompareListToCustomerOutput
  """Changes the password for the logged-in customer"""
  changeCustomerPassword(currentPassword: String!, newPassword: String!): Customer
  """Creates Client Token for Braintree Javascript SDK initialization."""
  createBraintreeClientToken: String!
  """Creates a new compare list. The compare list is saved for logged in customers"""
  createCompareList(input: CreateCompareListInput): CompareList
  """Create customer account"""
  createCustomer(input: CustomerInput!): CustomerOutput
  """Create customer address"""
  createCustomerAddress(input: CustomerAddressInput!): CustomerAddress
  """Create customer account"""
  createCustomerV2(input: CustomerCreateInput!): CustomerOutput
  """Creates an empty shopping cart for a guest or logged in user"""
  createEmptyCart(input: createEmptyCartInput): String
  """Creates a Klarna Payments Session."""
  createKlarnaPaymentsSession(input: createKlarnaPaymentsSessionInput): createKlarnaPaymentsSessionOutput
  createMollieTransaction(input: MollieTransactionInput): MollieTransactionOutput @deprecated(reason: "Using the Order.mollie_redirect_url attribuut")
  """Initiates a transaction and receives a token. Use this mutation for Payflow Pro and Payments Pro payment methods"""
  createPayflowProToken(input: PayflowProTokenInput!): CreatePayflowProTokenOutput
  """Initiates an Express Checkout transaction and receives a token. Use this mutation for Express Checkout and Payments Standard payment methods."""
  createPaypalExpressToken(input: PaypalExpressTokenInput!): PaypalExpressTokenOutput
  """Creates a product review for the specified SKU"""
  createProductReview(input: CreateProductReviewInput!): CreateProductReviewOutput!
  """Delete the specified compare list"""
  deleteCompareList(uid: ID!): DeleteCompareListOutput
  """Delete customer address"""
  deleteCustomerAddress(id: Int!): Boolean
  """Delete a customer payment token"""
  deletePaymentToken(public_hash: String!): DeletePaymentTokenOutput
  """Retrieve the customer token"""
  generateCustomerToken(email: String!, password: String!): CustomerToken
  """Request a customer token so that an administrator can perform remote shopping assistance"""
  generateCustomerTokenAsAdmin(input: GenerateCustomerTokenAsAdminInput!): GenerateCustomerTokenAsAdminOutput
  """Handles payment response and saves payment in Quote. Use this mutations for Payflow Pro and Payments Pro payment methods."""
  handlePayflowProResponse(input: PayflowProResponseInput!): PayflowProResponseOutput
  """Merges the source cart into the destination cart"""
  mergeCarts(source_cart_id: String!, destination_cart_id: String): Cart!
  mollieProcessTransaction(input: MollieProcessTransactionInput): MollieProcessTransactionOutput
  mollieRestoreCart(input: MollieResetCartInput): MollieResetCartOutput
  placeOrder(input: PlaceOrderInput): PlaceOrderOutput
  removeCouponFromCart(input: RemoveCouponFromCartInput): RemoveCouponFromCartOutput
  removeItemFromCart(input: RemoveItemFromCartInput): RemoveItemFromCartOutput
  """Remove products from the specified compare list"""
  removeProductsFromCompareList(input: RemoveProductsFromCompareListInput): CompareList
  """Removes one or more products from the specified wish list"""
  removeProductsFromWishlist(wishlistId: ID!, wishlistItemsIds: [ID!]!): RemoveProductsFromWishlistOutput
  """Adds all products from a customer's previous order to the cart."""
  reorderItems(orderNumber: String!): ReorderItemsOutput
  """Request an email with a reset password token for the registered customer identified by the specified email."""
  requestPasswordResetEmail(email: String!): Boolean
  """Reset a customer's password using the reset password token that the customer received in an email after requesting it using requestPasswordResetEmail."""
  resetPassword(email: String!, resetPasswordToken: String!, newPassword: String!): Boolean
  """Revoke the customer token"""
  revokeCustomerToken: RevokeCustomerTokenOutput
  """Recommends Product by Sending Single/Multiple Email"""
  sendEmailToFriend(input: SendEmailToFriendInput): SendEmailToFriendOutput
  setBillingAddressOnCart(input: SetBillingAddressOnCartInput): SetBillingAddressOnCartOutput
  setGuestEmailOnCart(input: SetGuestEmailOnCartInput): SetGuestEmailOnCartOutput
  setPaymentMethodAndPlaceOrder(input: SetPaymentMethodAndPlaceOrderInput): PlaceOrderOutput @deprecated(reason: "Should use setPaymentMethodOnCart and placeOrder mutations in single request.")
  setPaymentMethodOnCart(input: SetPaymentMethodOnCartInput): SetPaymentMethodOnCartOutput
  setShippingAddressesOnCart(input: SetShippingAddressesOnCartInput): SetShippingAddressesOnCartOutput
  setShippingMethodsOnCart(input: SetShippingMethodsOnCartInput): SetShippingMethodsOnCartOutput
  """Subscribes the specified email to a newsletter"""
  subscribeEmailToNewsletter(email: String!): SubscribeEmailToNewsletterOutput
  updateCartItems(input: UpdateCartItemsInput): UpdateCartItemsOutput
  """Deprecated. Use UpdateCustomerV2 instead."""
  updateCustomer(input: CustomerInput!): CustomerOutput
  """Update customer address"""
  updateCustomerAddress(id: Int!, input: CustomerAddressInput): CustomerAddress
  updateCustomerEmail(email: String!, password: String!): CustomerOutput
  """Update the customer's personal information"""
  updateCustomerV2(input: CustomerUpdateInput!): CustomerOutput
  """Updates one or more products in the specified wish list"""
  updateProductsInWishlist(wishlistId: ID!, wishlistItems: [WishlistItemUpdateInput!]!): UpdateProductsInWishlistOutput
}

input AddBundleProductsToCartInput {
  cart_id: String!
  cart_items: [BundleProductCartItemInput]!
}

input BundleProductCartItemInput {
  bundle_options: [BundleOptionInput]!
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput!
}

input BundleOptionInput {
  id: Int!
  quantity: Float!
  value: [String]!
}

input CustomizableOptionInput {
  """The customizable option id of the product"""
  id: Int
  """The string value of the option"""
  value_string: String!
}

input CartItemInput {
  """An array of entered options for the base product, such as personalization text"""
  entered_options: [EnteredOptionInput]
  """For child products, the SKU of its parent product"""
  parent_sku: String
  quantity: Float!
  """The selected options for the base product, such as color or size with  unique ID for a \`CustomizableRadioOption\`, \`CustomizableDropDownOption\`, \`ConfigurableProductOptionsValues\`, etc. objects"""
  selected_options: [ID]
  sku: String!
}

"""Defines a customer-entered option"""
input EnteredOptionInput {
  """The unique ID for a \`CustomizableFieldOption\`, \`CustomizableFileOption\`, \`CustomizableAreaOption\`, etc. of \`CustomizableOptionInterface\` objects"""
  uid: ID!
  """Text the customer entered"""
  value: String!
}

type AddBundleProductsToCartOutput {
  cart: Cart!
}

input AddConfigurableProductsToCartInput {
  cart_id: String!
  cart_items: [ConfigurableProductCartItemInput]!
}

input ConfigurableProductCartItemInput {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput!
  """Configurable product SKU."""
  parent_sku: String
  """Deprecated. Use CartItemInput.sku instead."""
  variant_sku: String
}

type AddConfigurableProductsToCartOutput {
  cart: Cart!
}

input AddDownloadableProductsToCartInput {
  cart_id: String!
  cart_items: [DownloadableProductCartItemInput]!
}

input DownloadableProductCartItemInput {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput!
  downloadable_product_links: [DownloadableProductLinksInput]
}

input DownloadableProductLinksInput {
  link_id: Int!
}

type AddDownloadableProductsToCartOutput {
  cart: Cart!
}

type AddProductsToCartOutput {
  """The cart after products have been added"""
  cart: Cart!
  """An error encountered while adding an item to the cart."""
  user_errors: [CartUserInputError]!
}

"""An error encountered while adding an item to the the cart."""
type CartUserInputError {
  """Cart-specific error code"""
  code: CartUserInputErrorType!
  """A localized error message"""
  message: String!
}

enum CartUserInputErrorType {
  PRODUCT_NOT_FOUND
  NOT_SALABLE
  INSUFFICIENT_STOCK
  UNDEFINED
}

input AddProductsToCompareListInput {
  """An array of product IDs to add to the compare list"""
  products: [ID]!
  """The unique identifier of the compare list to modify"""
  uid: ID!
}

"""Defines the items to add to a wish list"""
input WishlistItemInput {
  """An array of options that the customer entered"""
  entered_options: [EnteredOptionInput]
  """For complex product types, the SKU of the parent product"""
  parent_sku: String
  """The amount or number of items to add"""
  quantity: Float!
  """An array of strings corresponding to options the customer selected"""
  selected_options: [ID]
  """The SKU of the product to add. For complex product types, specify the child product SKU"""
  sku: String!
}

"""Contains the customer's wish list and any errors encountered"""
type AddProductsToWishlistOutput {
  """An array of errors encountered while adding products to a wish list"""
  user_errors: [WishListUserInputError]!
  """Contains the wish list with all items that were successfully added"""
  wishlist: Wishlist!
}

"""An error encountered while performing operations with WishList."""
type WishListUserInputError {
  """Wishlist-specific error code"""
  code: WishListUserInputErrorType!
  """A localized error message"""
  message: String!
}

enum WishListUserInputErrorType {
  PRODUCT_NOT_FOUND
  UNDEFINED
}

input AddSimpleProductsToCartInput {
  cart_id: String!
  cart_items: [SimpleProductCartItemInput]!
}

input SimpleProductCartItemInput {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput!
}

type AddSimpleProductsToCartOutput {
  cart: Cart!
}

input AddVirtualProductsToCartInput {
  cart_id: String!
  cart_items: [VirtualProductCartItemInput]!
}

input VirtualProductCartItemInput {
  customizable_options: [CustomizableOptionInput]
  data: CartItemInput!
}

type AddVirtualProductsToCartOutput {
  cart: Cart!
}

input ApplyCouponToCartInput {
  cart_id: String!
  coupon_code: String!
}

type ApplyCouponToCartOutput {
  cart: Cart!
}

type AssignCompareListToCustomerOutput {
  """The contents of the customer's compare list"""
  compare_list: CompareList
  result: Boolean!
}

input CreateCompareListInput {
  """An array of product IDs to add to the compare list"""
  products: [ID]
}

input CustomerInput {
  """The customer's date of birth"""
  date_of_birth: String
  """Deprecated: Use \`date_of_birth\` instead"""
  dob: String
  """The customer's email address. Required for customer creation"""
  email: String
  """The customer's first name"""
  firstname: String
  """The customer's gender (Male - 1, Female - 2)"""
  gender: Int
  """Indicates whether the customer is subscribed to the company's newsletter"""
  is_subscribed: Boolean
  """The customer's family name"""
  lastname: String
  """The customer's middle name"""
  middlename: String
  """The customer's password"""
  password: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The customer's Tax/VAT number (for corporate customers)"""
  taxvat: String
}

type CustomerOutput {
  customer: Customer!
}

input CustomerAddressInput {
  """The city or town"""
  city: String
  """The customer's company"""
  company: String
  """The customer's country"""
  country_code: CountryCodeEnum
  """Deprecated: use \`country_code\` instead."""
  country_id: CountryCodeEnum
  """Deprecated: Custom attributes should not be put into container."""
  custom_attributes: [CustomerAddressAttributeInput]
  """Indicates whether the address is the default billing address"""
  default_billing: Boolean
  """Indicates whether the address is the default shipping address"""
  default_shipping: Boolean
  """The fax number"""
  fax: String
  """The first name of the person associated with the shipping/billing address"""
  firstname: String
  """The family name of the person associated with the shipping/billing address"""
  lastname: String
  """The middle name of the person associated with the shipping/billing address"""
  middlename: String
  """The customer's ZIP or postal code"""
  postcode: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """An object containing the region name, region code, and region ID"""
  region: CustomerAddressRegionInput
  """An array of strings that define the street number and name"""
  street: [String]
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The telephone number"""
  telephone: String
  """The customer's Tax/VAT number (for corporate customers)"""
  vat_id: String
}

input CustomerAddressAttributeInput {
  """Attribute code"""
  attribute_code: String!
  """Attribute value"""
  value: String!
}

"""CustomerAddressRegionInput defines the customer's state or province"""
input CustomerAddressRegionInput {
  """The state or province name"""
  region: String
  """The address region code"""
  region_code: String
  """The unique ID for a pre-defined region"""
  region_id: Int
}

input CustomerCreateInput {
  """Indicates whether the customer has enabled remote shopping assistance"""
  allow_remote_shopping_assistance: Boolean
  """The customer's date of birth"""
  date_of_birth: String
  """Deprecated: Use \`date_of_birth\` instead"""
  dob: String
  """The customer's email address. Required for customer creation"""
  email: String!
  """The customer's first name"""
  firstname: String!
  """The customer's gender (Male - 1, Female - 2)"""
  gender: Int
  """Indicates whether the customer is subscribed to the company's newsletter"""
  is_subscribed: Boolean
  """The customer's family name"""
  lastname: String!
  """The customer's middle name"""
  middlename: String
  """The customer's password"""
  password: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The customer's Tax/VAT number (for corporate customers)"""
  taxvat: String
}

input createEmptyCartInput {
  cart_id: String
}

input createKlarnaPaymentsSessionInput {
  cart_id: String!
}

type createKlarnaPaymentsSessionOutput {
  """The payment method client token"""
  client_token: String
  """The payment method categories"""
  payment_method_categories: [Categories]
}

type Categories {
  """The payment method assets"""
  asset_urls: [Assets]
  """The payment method identifier"""
  identifier: String!
  """The payment method name"""
  name: String!
}

type Assets {
  """The payment method logo url (descriptive)"""
  descriptive: String
  """The payment method logo url (standard)"""
  standard: String
}

input MollieTransactionInput {
  issuer: String
  payment_token: String!
}

type MollieTransactionOutput {
  checkout_url: String
}

"""Input required to fetch payment token information for Payflow Pro and Payments Pro payment methods."""
input PayflowProTokenInput {
  """The unique ID that identifies the customer's cart"""
  cart_id: String!
  """A set of relative URLs that PayPal uses for callback."""
  urls: PayflowProUrlInput!
}

"""A set of relative URLs that PayPal will use in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payflow Pro and Payment Pro payment methods."""
input PayflowProUrlInput {
  """The relative URL of the page that PayPal will redirect to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html."""
  cancel_url: String!
  """The relative URL of the transaction error page that PayPal will redirect to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html."""
  error_url: String!
  """The relative URL of the final confirmation page that PayPal will redirect to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html."""
  return_url: String!
}

"""Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods."""
type CreatePayflowProTokenOutput {
  response_message: String!
  result: Int!
  result_code: Int!
  secure_token: String!
  secure_token_id: String!
}

"""Defines the attributes required to receive a payment token for Express Checkout and Payments Standard payment methods."""
input PaypalExpressTokenInput {
  """The unique ID that identifies the customer's cart"""
  cart_id: String!
  """Payment method code"""
  code: String!
  """Indicates whether the buyer selected the quick checkout button. The default value is false"""
  express_button: Boolean
  """A set of relative URLs that PayPal uses in response to various actions during the authorization process"""
  urls: PaypalExpressUrlsInput!
  """Indicates whether the buyer clicked the PayPal credit button. The default value is false"""
  use_paypal_credit: Boolean
}

"""A set of relative URLs that PayPal will use in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Express Checkout and Payments Standard payment methods."""
input PaypalExpressUrlsInput {
  """The relative URL of the page that PayPal will redirect to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html."""
  cancel_url: String!
  """The relative URL of the page that PayPal will redirect to when the payment has been put on hold for additional review. This condition mostly applies to ACH transactions, and is not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success_pending.html, the relative URL is paypal/action/success_pending.html. """
  pending_url: String
  """The relative URL of the final confirmation page that PayPal will redirect to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html."""
  return_url: String!
  """The relative URL of the order confirmation page that PayPal will redirect to when the payment is successful and additional confirmation is not needed. Not applicable to most PayPal solutions. If the full URL to this page is https://www.example.com/paypal/action/success.html, the relative URL is paypal/action/success.html."""
  success_url: String
}

"""Contains the token returned by PayPal and a set of URLs that allow the buyer to authorize payment and adjust checkout details. Applies to Express Checkout and Payments Standard payment methods."""
type PaypalExpressTokenOutput {
  """A set of URLs that allow the buyer to authorize payment and adjust checkout details"""
  paypal_urls: PaypalExpressUrlList
  """The token returned by PayPal"""
  token: String
}

"""A set of URLs that allow the buyer to authorize payment and adjust checkout details for Express Checkout and Payments Standard transactions."""
type PaypalExpressUrlList {
  """The PayPal URL that allows the buyer to edit their checkout details"""
  edit: String
  """The URL to the PayPal login page"""
  start: String
}

input CreateProductReviewInput {
  """The customer's nickname. Defaults to the customer name, if logged in"""
  nickname: String!
  """Ratings details by category. e.g price: 5, quality: 4 etc"""
  ratings: [ProductReviewRatingInput]!
  """The SKU of the reviewed product"""
  sku: String!
  """The summary (title) of the review"""
  summary: String!
  """The review text."""
  text: String!
}

input ProductReviewRatingInput {
  """An encoded rating ID."""
  id: String!
  """An encoded rating value id."""
  value_id: String!
}

type CreateProductReviewOutput {
  """Contains the completed product review"""
  review: ProductReview!
}

type DeleteCompareListOutput {
  """Indicates whether the compare list was successfully deleted"""
  result: Boolean!
}

type DeletePaymentTokenOutput {
  customerPaymentTokens: CustomerPaymentTokens
  result: Boolean!
}

type CustomerToken {
  """The customer token"""
  token: String
}

input GenerateCustomerTokenAsAdminInput {
  """The email address of the customer requesting remote shopping assistance"""
  customer_email: String!
}

type GenerateCustomerTokenAsAdminOutput {
  """The generated customer token"""
  customer_token: String!
}

"""Input required to complete payment. Applies to Payflow Pro and Payments Pro payment methods."""
input PayflowProResponseInput {
  cart_id: String!
  paypal_payload: String!
}

type PayflowProResponseOutput {
  cart: Cart!
}

input MollieProcessTransactionInput {
  """The payment token returned from the PlaceOrder call/added to the return URL"""
  payment_token: String!
}

type MollieProcessTransactionOutput {
  """The cart is only available when the payment status is failed, canceled or expired."""
  cart: Cart
  paymentStatus: PaymentStatusEnum
}

enum PaymentStatusEnum {
  CREATED
  PAID
  AUTHORIZED
  CANCELED
  SHIPPING
  COMPLETED
  EXPIRED
  PENDING
  REFUNDED
  ERROR
}

input MollieResetCartInput {
  """The unique ID that identifies the customer's cart"""
  cart_id: String!
}

type MollieResetCartOutput {
  cart: Cart!
}

input PlaceOrderInput {
  cart_id: String!
}

type PlaceOrderOutput {
  order: Order!
}

type Order {
  mollie_payment_token: String
  mollie_redirect_url: String
  order_id: String @deprecated(reason: "The order_id field is deprecated, use order_number instead.")
  """The unique ID for a \`Order\` object."""
  order_number: String!
}

input RemoveCouponFromCartInput {
  cart_id: String!
}

type RemoveCouponFromCartOutput {
  cart: Cart
}

input RemoveItemFromCartInput {
  cart_id: String!
  """Deprecated. Use \`cart_item_uid\` instead."""
  cart_item_id: Int
  """Required field. The unique ID for a \`CartItemInterface\` object"""
  cart_item_uid: ID
}

type RemoveItemFromCartOutput {
  cart: Cart!
}

input RemoveProductsFromCompareListInput {
  """An array of product IDs to remove from the compare list"""
  products: [ID]!
  """The unique identifier of the compare list to modify"""
  uid: ID!
}

"""Contains the customer's wish list and any errors encountered"""
type RemoveProductsFromWishlistOutput {
  """An array of errors encountered while deleting products from a wish list"""
  user_errors: [WishListUserInputError]!
  """Contains the wish list with after items were successfully deleted"""
  wishlist: Wishlist!
}

type ReorderItemsOutput {
  """Contains detailed information about the customer's cart."""
  cart: Cart!
  """An array of reordering errors."""
  userInputErrors: [CheckoutUserInputError]!
}

"""An error encountered while adding an item the the cart."""
type CheckoutUserInputError {
  """Checkout-specific error code"""
  code: CheckoutUserInputErrorCodes!
  """Localized error message"""
  message: String!
  """Path to the input field that caused an error. See the GraphQL specification about path errors for details: http://spec.graphql.org/draft/#sec-Errors"""
  path: [String]!
}

enum CheckoutUserInputErrorCodes {
  REORDER_NOT_AVAILABLE
  PRODUCT_NOT_FOUND
  NOT_SALABLE
  INSUFFICIENT_STOCK
  UNDEFINED
}

type RevokeCustomerTokenOutput {
  result: Boolean!
}

input SendEmailToFriendInput {
  product_id: Int!
  recipients: [SendEmailToFriendRecipientInput]!
  sender: SendEmailToFriendSenderInput!
}

input SendEmailToFriendRecipientInput {
  email: String!
  name: String!
}

input SendEmailToFriendSenderInput {
  email: String!
  message: String!
  name: String!
}

type SendEmailToFriendOutput {
  recipients: [SendEmailToFriendRecipient]
  sender: SendEmailToFriendSender
}

type SendEmailToFriendRecipient {
  email: String!
  name: String!
}

type SendEmailToFriendSender {
  email: String!
  message: String!
  name: String!
}

input SetBillingAddressOnCartInput {
  billing_address: BillingAddressInput!
  cart_id: String!
}

input BillingAddressInput {
  address: CartAddressInput
  customer_address_id: Int
  """Set billing address same as shipping"""
  same_as_shipping: Boolean
  """Deprecated: use \`same_as_shipping\` field instead"""
  use_for_shipping: Boolean
}

input CartAddressInput {
  city: String!
  company: String
  country_code: String!
  firstname: String!
  lastname: String!
  postcode: String
  region: String
  region_id: Int
  """Determines whether to save the address in the customer's address book. The default value is true"""
  save_in_address_book: Boolean
  street: [String]!
  telephone: String!
}

type SetBillingAddressOnCartOutput {
  cart: Cart!
}

input SetGuestEmailOnCartInput {
  cart_id: String!
  email: String!
}

type SetGuestEmailOnCartOutput {
  cart: Cart!
}

input SetPaymentMethodAndPlaceOrderInput {
  cart_id: String!
  payment_method: PaymentMethodInput!
}

input PaymentMethodInput {
  braintree: BraintreeInput
  braintree_cc_vault: BraintreeCcVaultInput
  """Payment method code"""
  code: String!
  """Required input for PayPal Hosted pro payments"""
  hosted_pro: HostedProInput
  klarna: KlarnaInput
  """The card token provided by Mollie Components"""
  mollie_card_token: String
  """Provided the issuer chosen by the end-user"""
  mollie_selected_issuer: String
  """Required input for Payflow Express Checkout payments"""
  payflow_express: PayflowExpressInput
  """Required input for PayPal Payflow Link and Payments Advanced payments"""
  payflow_link: PayflowLinkInput
  """Required input type for PayPal Payflow Pro and Payment Pro payments"""
  payflowpro: PayflowProInput
  """Required input type for PayPal Payflow Pro vault payments"""
  payflowpro_cc_vault: VaultTokenInput
  """Required input for Express Checkout and Payments Standard payments"""
  paypal_express: PaypalExpressInput
  """Purchase order number"""
  purchase_order_number: String
}

input BraintreeInput {
  """Contains a fingerprint provided by Braintree JS SDK and should be sent with sale transaction details to the Braintree payment gateway. Should be specified only in a case if Kount (advanced fraud protection) is enabled for Braintree payment integration."""
  device_data: String
  """States whether an entered by a customer credit/debit card should be tokenized for later usage. Required only if Vault is enabled for Braintree payment integration."""
  is_active_payment_token_enabler: Boolean!
  """The one-time payment token generated by Braintree payment gateway based on card details. Required field to make sale transaction."""
  payment_method_nonce: String!
}

input BraintreeCcVaultInput {
  device_data: String
  public_hash: String!
}

"""A set of relative URLs that PayPal will use in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payments Pro Hosted Solution payment method."""
input HostedProInput {
  """The relative URL of the page that PayPal will redirect to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html."""
  cancel_url: String!
  """The relative URL of the final confirmation page that PayPal will redirect to upon payment success. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html."""
  return_url: String!
}

input KlarnaInput {
  """The authorization token must be provided to set any Klarna Payments method"""
  authorization_token: String!
}

"""Required input for Payflow Express Checkout payments"""
input PayflowExpressInput {
  """The unique ID of the PayPal user"""
  payer_id: String!
  """The token returned by the createPaypalExpressToken mutation"""
  token: String!
}

"""A set of relative URLs that PayPal will use in response to various actions during the authorization process. Magento prepends the base URL to this value to create a full URL. For example, if the full URL is https://www.example.com/path/to/page.html, the relative URL is path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods."""
input PayflowLinkInput {
  """The relative URL of the page that PayPal will redirect to when the buyer cancels the transaction in order to choose a different payment method. If the full URL to this page is https://www.example.com/paypal/action/cancel.html, the relative URL is paypal/action/cancel.html."""
  cancel_url: String!
  """The relative URL of the transaction error page that PayPal will redirect to upon payment error. If the full URL to this page is https://www.example.com/paypal/action/error.html, the relative URL is paypal/action/error.html."""
  error_url: String!
  """The relative URL of the order confirmation page that PayPal will redirect to when the payment is successful and additional confirmation is not needed. If the full URL to this page is https://www.example.com/paypal/action/return.html, the relative URL is paypal/action/return.html."""
  return_url: String!
}

"""Required input for Payflow Pro and Payments Pro payment methods."""
input PayflowProInput {
  """Required input for credit card related information"""
  cc_details: CreditCardDetailsInput!
  """States whether details about the customer's credit/debit card should be tokenized for later usage. Required only if Vault is enabled for PayPal Payflow Pro payment integration."""
  is_active_payment_token_enabler: Boolean
}

"""Required fields for Payflow Pro and Payments Pro credit card payments"""
input CreditCardDetailsInput {
  """Credit card expiration month"""
  cc_exp_month: Int!
  """Credit card expiration year"""
  cc_exp_year: Int!
  """Last 4 digits of the credit card"""
  cc_last_4: Int!
  """Credit card type"""
  cc_type: String!
}

"""Required input for payment methods with Vault support."""
input VaultTokenInput {
  """The public hash of the payment token"""
  public_hash: String!
}

"""Required input for Express Checkout and Payments Standard payments"""
input PaypalExpressInput {
  """The unique ID of the PayPal user"""
  payer_id: String!
  """The token returned by the createPaypalExpressToken mutation"""
  token: String!
}

input SetPaymentMethodOnCartInput {
  cart_id: String!
  payment_method: PaymentMethodInput!
}

type SetPaymentMethodOnCartOutput {
  cart: Cart!
}

input SetShippingAddressesOnCartInput {
  cart_id: String!
  shipping_addresses: [ShippingAddressInput]!
}

input ShippingAddressInput {
  address: CartAddressInput
  customer_address_id: Int
  customer_notes: String
  """The code of Pickup Location which will be used for In-Store Pickup."""
  pickup_location_code: String
}

type SetShippingAddressesOnCartOutput {
  cart: Cart!
}

input SetShippingMethodsOnCartInput {
  cart_id: String!
  shipping_methods: [ShippingMethodInput]!
}

input ShippingMethodInput {
  carrier_code: String!
  method_code: String!
}

type SetShippingMethodsOnCartOutput {
  cart: Cart!
}

type SubscribeEmailToNewsletterOutput {
  """Returns the status of the subscription request"""
  status: SubscriptionStatusesEnum
}

enum SubscriptionStatusesEnum {
  NOT_ACTIVE
  SUBSCRIBED
  UNSUBSCRIBED
  UNCONFIRMED
}

input UpdateCartItemsInput {
  cart_id: String!
  cart_items: [CartItemUpdateInput]!
}

input CartItemUpdateInput {
  """Deprecated. Use \`cart_item_uid\` instead."""
  cart_item_id: Int
  """The unique ID for a \`CartItemInterface\` object"""
  cart_item_uid: ID
  customizable_options: [CustomizableOptionInput]
  """Gift message details for the cart item"""
  gift_message: GiftMessageInput
  quantity: Float
}

"""Contains the text of a gift message, its sender, and recipient"""
input GiftMessageInput {
  """Sender name"""
  from: String!
  """Gift message text"""
  message: String!
  """Recipient name"""
  to: String!
}

type UpdateCartItemsOutput {
  cart: Cart!
}

input CustomerUpdateInput {
  """Indicates whether the customer has enabled remote shopping assistance"""
  allow_remote_shopping_assistance: Boolean
  """The customer's date of birth"""
  date_of_birth: String
  """Deprecated: Use \`date_of_birth\` instead"""
  dob: String
  """The customer's first name"""
  firstname: String
  """The customer's gender (Male - 1, Female - 2)"""
  gender: Int
  """Indicates whether the customer is subscribed to the company's newsletter"""
  is_subscribed: Boolean
  """The customer's family name"""
  lastname: String
  """The customer's middle name"""
  middlename: String
  """An honorific, such as Dr., Mr., or Mrs."""
  prefix: String
  """A value such as Sr., Jr., or III"""
  suffix: String
  """The customer's Tax/VAT number (for corporate customers)"""
  taxvat: String
}

"""Defines updates to items in a wish list"""
input WishlistItemUpdateInput {
  """Customer-entered comments about the item"""
  description: String
  """An array of options that the customer entered"""
  entered_options: [EnteredOptionInput]
  """The new amount or number of this item"""
  quantity: Float
  """An array of strings corresponding to options the customer selected"""
  selected_options: [ID]
  """The unique ID for a \`WishlistItemInterface\` object"""
  wishlist_item_id: ID!
}

"""Contains the customer's wish list and any errors encountered"""
type UpdateProductsInWishlistOutput {
  """An array of errors encountered while updating products in a wish list"""
  user_errors: [WishListUserInputError]!
  """Contains the wish list with all items that were successfully updated"""
  wishlist: Wishlist!
}

"""ProductLinks is an implementation of ProductLinksInterface."""
type ProductLinks implements ProductLinksInterface {
  """One of related, associated, upsell, or crosssell."""
  link_type: String
  """The SKU of the linked product."""
  linked_product_sku: String
  """The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable)."""
  linked_product_type: String
  """The position within the list of product links."""
  position: Int
  """The identifier of the linked product."""
  sku: String
}

"""PhysicalProductInterface contains attributes specific to tangible products."""
interface PhysicalProductInterface {
  """The weight of the item, in units defined by the store."""
  weight: Float
}

"""CustomizableAreaOption contains information about a text area that is defined as part of a customizable option."""
type CustomizableAreaOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """The Stock Keeping Unit of the base product."""
  product_sku: String
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An object that defines a text area."""
  value: CustomizableAreaValue
}

"""The CustomizableOptionInterface contains basic information about a customizable option. It can be implemented by several types of configurable options."""
interface CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
}

"""CustomizableAreaValue defines the price and sku of a product whose page contains a customized text area."""
type CustomizableAreaValue {
  """The maximum number of characters that can be entered for this customizable option."""
  max_characters: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The unique ID for a \`CustomizableAreaValue\` object."""
  uid: ID!
}

"""CustomizableDateOption contains information about a date picker that is defined as part of a customizable option."""
type CustomizableDateOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """The Stock Keeping Unit of the base product."""
  product_sku: String
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An object that defines a date field in a customizable option."""
  value: CustomizableDateValue
}

"""CustomizableDateValue defines the price and sku of a product whose page contains a customized date picker."""
type CustomizableDateValue {
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The unique ID for a \`CustomizableDateValue\` object."""
  uid: ID!
}

"""CustomizableDropDownOption contains information about a drop down menu that is defined as part of a customizable option."""
type CustomizableDropDownOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An array that defines the set of options for a drop down menu."""
  value: [CustomizableDropDownValue]
}

"""CustomizableDropDownValue defines the price and sku of a product whose page contains a customized drop down menu."""
type CustomizableDropDownValue {
  """The ID assigned to the value."""
  option_type_id: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableDropDownValue\` object."""
  uid: ID!
}

"""CustomizableMultipleOption contains information about a multiselect that is defined as part of a customizable option."""
type CustomizableMultipleOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An array that defines the set of options for a multiselect."""
  value: [CustomizableMultipleValue]
}

"""CustomizableMultipleValue defines the price and sku of a product whose page contains a customized multiselect."""
type CustomizableMultipleValue {
  """The ID assigned to the value."""
  option_type_id: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableMultipleValue\` object."""
  uid: ID!
}

"""CustomizableFieldOption contains information about a text field that is defined as part of a customizable option."""
type CustomizableFieldOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """The Stock Keeping Unit of the base product."""
  product_sku: String
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An object that defines a text field."""
  value: CustomizableFieldValue
}

"""CustomizableFieldValue defines the price and sku of a product whose page contains a customized text field."""
type CustomizableFieldValue {
  """The maximum number of characters that can be entered for this customizable option."""
  max_characters: Int
  """The price of the custom value."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The unique ID for a \`CustomizableFieldValue\` object."""
  uid: ID!
}

"""CustomizableFileOption contains information about a file picker that is defined as part of a customizable option."""
type CustomizableFileOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """The Stock Keeping Unit of the base product."""
  product_sku: String
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An object that defines a file value."""
  value: CustomizableFileValue
}

"""CustomizableFileValue defines the price and sku of a product whose page contains a customized file picker."""
type CustomizableFileValue {
  """The file extension to accept."""
  file_extension: String
  """The maximum width of an image."""
  image_size_x: Int
  """The maximum height of an image."""
  image_size_y: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The unique ID for a \`CustomizableFileValue\` object."""
  uid: ID!
}

"""Contains information about a product video."""
type ProductVideo implements MediaGalleryInterface {
  """Whether the image is hidden from view."""
  disabled: Boolean
  """The label of the product image or video."""
  label: String
  """The media item's position after it has been sorted."""
  position: Int
  """The URL of the product image or video."""
  url: String
  """Contains a ProductMediaGalleryEntriesVideoContent object."""
  video_content: ProductMediaGalleryEntriesVideoContent
}

"""CustomizableProductInterface contains information about customizable product options."""
interface CustomizableProductInterface {
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
}

"""CustomizableRadioOption contains information about a set of radio buttons that are defined as part of a customizable option."""
type CustomizableRadioOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An array that defines a set of radio buttons."""
  value: [CustomizableRadioValue]
}

"""CustomizableRadioValue defines the price and sku of a product whose page contains a customized set of radio buttons."""
type CustomizableRadioValue {
  """The ID assigned to the value."""
  option_type_id: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The order in which the radio button is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableRadioValue\` object."""
  uid: ID!
}

"""CustomizableCheckbbixOption contains information about a set of checkbox values that are defined as part of a customizable option."""
type CustomizableCheckboxOption implements CustomizableOptionInterface {
  """Option ID."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether the option is required."""
  required: Boolean
  """The order in which the option is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableOptionInterface\` object."""
  uid: ID!
  """An array that defines a set of checkbox values."""
  value: [CustomizableCheckboxValue]
}

"""CustomizableCheckboxValue defines the price and sku of a product whose page contains a customized set of checkbox values."""
type CustomizableCheckboxValue {
  """The ID assigned to the value."""
  option_type_id: Int
  """The price assigned to this option."""
  price: Float
  """FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """The Stock Keeping Unit for this option."""
  sku: String
  """The order in which the checkbox value is displayed."""
  sort_order: Int
  """The display name for this option."""
  title: String
  """The unique ID for a \`CustomizableCheckboxValue\` object."""
  uid: ID!
}

"""A virtual product is non-tangible product that does not require shipping and is not kept in inventory."""
type VirtualProduct implements ProductInterface & CustomizableProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
}

"""A simple product is tangible and are usually sold as single units or in fixed quantities."""
type SimpleProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
  """The weight of the item, in units defined by the store."""
  weight: Float
}

"""ProductFilterInput is deprecated, use @ProductAttributeFilterInput instead. ProductFilterInput defines the filters to be used in the search. A filter contains at least one attribute, a comparison operator, and the value that is being searched for."""
input ProductFilterInput {
  """Category ID the product belongs to."""
  category_id: FilterTypeInput
  """The product's country of origin."""
  country_of_manufacture: FilterTypeInput
  """Timestamp indicating when the product was created."""
  created_at: FilterTypeInput
  """The name of a custom layout."""
  custom_layout: FilterTypeInput
  """XML code that is applied as a layout update to the product page."""
  custom_layout_update: FilterTypeInput
  """Detailed information about the product. The value can include simple HTML tags."""
  description: FilterTypeInput
  """Indicates whether a gift message is available."""
  gift_message_available: FilterTypeInput
  """Indicates whether additional attributes have been created for the product."""
  has_options: FilterTypeInput
  """The relative path to the main image on the product page."""
  image: FilterTypeInput
  """The label assigned to a product image."""
  image_label: FilterTypeInput
  """A number representing the product's manufacturer."""
  manufacturer: FilterTypeInput
  """The numeric maximal price of the product. Do not include the currency code."""
  max_price: FilterTypeInput
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: FilterTypeInput
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: FilterTypeInput
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: FilterTypeInput
  """The numeric minimal price of the product. Do not include the currency code."""
  min_price: FilterTypeInput
  """The product name. Customers use this name to identify the product."""
  name: FilterTypeInput
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  news_from_date: FilterTypeInput
  """The end date for new product listings."""
  news_to_date: FilterTypeInput
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: FilterTypeInput
  """The keyword required to perform a logical OR comparison."""
  or: ProductFilterInput
  """The price of an item."""
  price: FilterTypeInput
  """Indicates whether the product has required options."""
  required_options: FilterTypeInput
  """A short description of the product. Its use depends on the theme."""
  short_description: FilterTypeInput
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: FilterTypeInput
  """The relative path to the small image, which is used on catalog pages."""
  small_image: FilterTypeInput
  """The label assigned to a product's small image."""
  small_image_label: FilterTypeInput
  """The beginning date that a product has a special price."""
  special_from_date: FilterTypeInput
  """The discounted price of the product. Do not include the currency code."""
  special_price: FilterTypeInput
  """The end date that a product has a special price."""
  special_to_date: FilterTypeInput
  """The file name of a swatch image"""
  swatch_image: FilterTypeInput
  """The relative path to the product's thumbnail image."""
  thumbnail: FilterTypeInput
  """The label assigned to a product's thumbnail image."""
  thumbnail_label: FilterTypeInput
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: FilterTypeInput
  """Timestamp indicating when the product was updated."""
  updated_at: FilterTypeInput
  """The part of the URL that identifies the product"""
  url_key: FilterTypeInput
  url_path: FilterTypeInput
  """The weight of the item, in units defined by the store."""
  weight: FilterTypeInput
}

"""ProductSortInput is deprecated, use @ProductAttributeSortInput instead. ProductSortInput specifies the attribute to use for sorting search results and indicates whether the results are sorted in ascending or descending order."""
input ProductSortInput {
  """The product's country of origin."""
  country_of_manufacture: SortEnum
  """Timestamp indicating when the product was created."""
  created_at: SortEnum
  """The name of a custom layout."""
  custom_layout: SortEnum
  """XML code that is applied as a layout update to the product page."""
  custom_layout_update: SortEnum
  """Detailed information about the product. The value can include simple HTML tags."""
  description: SortEnum
  """Indicates whether a gift message is available."""
  gift_message_available: SortEnum
  """Indicates whether additional attributes have been created for the product."""
  has_options: SortEnum
  """The relative path to the main image on the product page."""
  image: SortEnum
  """The label assigned to a product image."""
  image_label: SortEnum
  """A number representing the product's manufacturer."""
  manufacturer: SortEnum
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: SortEnum
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: SortEnum
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: SortEnum
  """The product name. Customers use this name to identify the product."""
  name: SortEnum
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  news_from_date: SortEnum
  """The end date for new product listings."""
  news_to_date: SortEnum
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: SortEnum
  """The price of the item."""
  price: SortEnum
  """Indicates whether the product has required options."""
  required_options: SortEnum
  """A short description of the product. Its use depends on the theme."""
  short_description: SortEnum
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: SortEnum
  """The relative path to the small image, which is used on catalog pages."""
  small_image: SortEnum
  """The label assigned to a product's small image."""
  small_image_label: SortEnum
  """The beginning date that a product has a special price."""
  special_from_date: SortEnum
  """The discounted price of the product."""
  special_price: SortEnum
  """The end date that a product has a special price."""
  special_to_date: SortEnum
  """The file name of a swatch image"""
  swatch_image: SortEnum
  """The relative path to the product's thumbnail image."""
  thumbnail: SortEnum
  """The label assigned to a product's thumbnail image."""
  thumbnail_label: SortEnum
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: SortEnum
  """Timestamp indicating when the product was updated."""
  updated_at: SortEnum
  """The part of the URL that identifies the product"""
  url_key: SortEnum
  url_path: SortEnum
  """The weight of the item, in units defined by the store."""
  weight: SortEnum
}

type LayerFilterItem implements LayerFilterItemInterface {
  """Count of items by filter."""
  items_count: Int @deprecated(reason: "Use AggregationOption.count instead.")
  """Filter label."""
  label: String @deprecated(reason: "Use AggregationOption.label instead.")
  """Value for filter request variable to be used in query."""
  value_string: String @deprecated(reason: "Use AggregationOption.value instead.")
}

"""A simple product wish list Item"""
type SimpleWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

"""A virtual product wish list item"""
type VirtualWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

"""Simple Cart Item"""
type SimpleCartItem implements CartItemInterface {
  customizable_options: [SelectedCustomizableOption]!
  """The entered gift message for the cart item"""
  gift_message: GiftMessage
  id: String! @deprecated(reason: "Use \`uid\` instead")
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

"""Virtual Cart Item"""
type VirtualCartItem implements CartItemInterface {
  customizable_options: [SelectedCustomizableOption]!
  id: String! @deprecated(reason: "Use \`uid\` instead")
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

"""Downloadable Cart Item"""
type DownloadableCartItem implements CartItemInterface {
  customizable_options: [SelectedCustomizableOption]!
  id: String! @deprecated(reason: "Use \`uid\` instead")
  """An array containing information about the links for the added to cart downloadable product"""
  links: [DownloadableProductLinks]
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """DownloadableProductSamples defines characteristics of a downloadable product"""
  samples: [DownloadableProductSamples]
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

"""DownloadableProductLinks defines characteristics of a downloadable product"""
type DownloadableProductLinks {
  id: Int @deprecated(reason: "This information should not be exposed on frontend")
  is_shareable: Boolean @deprecated(reason: "This information should not be exposed on frontend")
  link_type: DownloadableFileTypeEnum @deprecated(reason: "\`sample_url\` serves to get the downloadable sample")
  number_of_downloads: Int @deprecated(reason: "This information should not be exposed on frontend")
  """The price of the downloadable product"""
  price: Float
  sample_file: String @deprecated(reason: "\`sample_url\` serves to get the downloadable sample")
  sample_type: DownloadableFileTypeEnum @deprecated(reason: "\`sample_url\` serves to get the downloadable sample")
  """URL to the downloadable sample"""
  sample_url: String
  """A number indicating the sort order"""
  sort_order: Int
  """The display name of the link"""
  title: String
  """The unique ID for a \`DownloadableProductLinks\` object."""
  uid: ID!
}

enum DownloadableFileTypeEnum {
  FILE
  URL
}

"""DownloadableProductSamples defines characteristics of a downloadable product"""
type DownloadableProductSamples {
  id: Int @deprecated(reason: "This information should not be exposed on frontend")
  sample_file: String @deprecated(reason: "\`sample_url\` serves to get the downloadable sample")
  sample_type: DownloadableFileTypeEnum @deprecated(reason: "\`sample_url\` serves to get the downloadable sample")
  """URL to the downloadable sample"""
  sample_url: String
  """A number indicating the sort order"""
  sort_order: Int
  """The display name of the sample"""
  title: String
}

"""DownloadableProduct defines a product that the customer downloads"""
type DownloadableProduct implements ProductInterface & CustomizableProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  """An array containing information about the links for this downloadable product"""
  downloadable_product_links: [DownloadableProductLinks]
  """An array containing information about samples of this downloadable product."""
  downloadable_product_samples: [DownloadableProductSamples]
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """A value of 1 indicates that each link in the array must be purchased separately"""
  links_purchased_separately: Int
  """The heading above the list of downloadable products"""
  links_title: String
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
}

type DownloadableOrderItem implements OrderItemInterface {
  """The final discount information for the product"""
  discounts: [Discount]
  """A list of downloadable links that are ordered from the downloadable product"""
  downloadable_links: [DownloadableItemsLinks]
  """The entered option for the base product, such as a logo or image"""
  entered_options: [OrderItemOption]
  """The unique ID for a \`OrderItemInterface\` object"""
  id: ID!
  """The name of the base product"""
  product_name: String
  """The sale price of the base product, including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The type of product, such as simple, configurable, etc."""
  product_type: String
  """URL key of the base product"""
  product_url_key: String
  """The number of canceled items"""
  quantity_canceled: Float
  """The number of invoiced items"""
  quantity_invoiced: Float
  """The number of units ordered for this item"""
  quantity_ordered: Float
  """The number of refunded items"""
  quantity_refunded: Float
  """The number of returned items"""
  quantity_returned: Float
  """The number of shipped items"""
  quantity_shipped: Float
  """The selected options for the base product, such as color or size"""
  selected_options: [OrderItemOption]
  """The status of the order item"""
  status: String
}

"""DownloadableProductLinks defines characteristics of a downloadable product"""
type DownloadableItemsLinks {
  """A number indicating the sort order"""
  sort_order: Int
  """The display name of the link"""
  title: String
  """The unique ID for a \`DownloadableItemsLinks\` object."""
  uid: ID!
}

type DownloadableInvoiceItem implements InvoiceItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """A list of downloadable links that are invoiced from the downloadable product"""
  downloadable_links: [DownloadableItemsLinks]
  """The unique ID for a \`InvoiceItemInterface\` object"""
  id: ID!
  """Contains details about an individual order item"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The number of invoiced items"""
  quantity_invoiced: Float
}

type DownloadableCreditMemoItem implements CreditMemoItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """A list of downloadable links that are refunded from the downloadable product"""
  downloadable_links: [DownloadableItemsLinks]
  """The unique ID for a \`CreditMemoItemInterface\` object"""
  id: ID!
  """The order item the credit memo is applied to"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product, including selected options"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """The number of refunded items"""
  quantity_refunded: Float
}

"""A downloadable product wish list item"""
type DownloadableWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """An array containing information about the selected links"""
  links_v2: [DownloadableProductLinks]
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
  """An array containing information about the selected samples"""
  samples: [DownloadableProductSamples]
}

type BundleCartItem implements CartItemInterface {
  bundle_options: [SelectedBundleOption]!
  customizable_options: [SelectedCustomizableOption]!
  """The entered gift message for the cart item"""
  gift_message: GiftMessage
  id: String! @deprecated(reason: "Use \`uid\` instead")
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

type SelectedBundleOption {
  id: Int! @deprecated(reason: "Use \`uid\` instead")
  label: String!
  type: String!
  """The unique ID for a \`SelectedBundleOption\` object"""
  uid: ID!
  values: [SelectedBundleOptionValue]!
}

type SelectedBundleOptionValue {
  """Use \`uid\` instead"""
  id: Int!
  label: String!
  price: Float!
  quantity: Float!
  """The unique ID for a \`SelectedBundleOptionValue\` object"""
  uid: ID!
}

"""BundleItem defines an individual item in a bundle product."""
type BundleItem {
  """An ID assigned to each type of item in a bundle product."""
  option_id: Int @deprecated(reason: "Use \`uid\` instead")
  """An array of additional options for this bundle item."""
  options: [BundleItemOption]
  """he relative position of this item compared to the other bundle items."""
  position: Int
  """Indicates whether the item must be included in the bundle."""
  required: Boolean
  """The SKU of the bundle product."""
  sku: String
  """The display name of the item."""
  title: String
  """The input type that the customer uses to select the item. Examples include radio button and checkbox."""
  type: String
  """The unique ID for a \`BundleItem\` object."""
  uid: ID
}

"""BundleItemOption defines characteristics and options for a specific bundle item."""
type BundleItemOption {
  """Indicates whether the customer can change the number of items for this option."""
  can_change_quantity: Boolean
  """The ID assigned to the bundled item option."""
  id: Int @deprecated(reason: "Use \`uid\` instead")
  """Indicates whether this option is the default option."""
  is_default: Boolean
  """The text that identifies the bundled item option."""
  label: String
  """When a bundle item contains multiple options, the relative position of this option compared to the other options."""
  position: Int
  """The price of the selected option."""
  price: Float
  """One of FIXED, PERCENT, or DYNAMIC."""
  price_type: PriceTypeEnum
  """Contains details about this product option."""
  product: ProductInterface
  """Indicates the quantity of this specific bundle item."""
  qty: Float @deprecated(reason: "The \`qty\` is deprecated. Use \`quantity\` instead.")
  """Indicates the quantity of this specific bundle item."""
  quantity: Float
  """The unique ID for a \`BundleItemOption\` object."""
  uid: ID!
}

"""BundleProduct defines basic features of a bundle product and contains multiple BundleItems."""
type BundleProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  """Indicates whether the bundle product has a dynamic price."""
  dynamic_price: Boolean
  """Indicates whether the bundle product has a dynamic SK."""
  dynamic_sku: Boolean
  """Indicates whether the bundle product has a dynamically calculated weight."""
  dynamic_weight: Boolean
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """An array containing information about individual bundle items."""
  items: [BundleItem]
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  """One of PRICE_RANGE or AS_LOW_AS."""
  price_view: PriceViewEnum
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """Indicates whether to ship bundle items together or individually."""
  ship_bundle_items: ShipBundleItemsEnum
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
  """The weight of the item, in units defined by the store."""
  weight: Float
}

"""This enumeration defines whether a bundle product's price is displayed as the lowest possible value or as a range."""
enum PriceViewEnum {
  PRICE_RANGE
  AS_LOW_AS
}

"""This enumeration defines whether bundle items must be shipped together."""
enum ShipBundleItemsEnum {
  TOGETHER
  SEPARATELY
}

type BundleOrderItem implements OrderItemInterface {
  """A list of bundle options that are assigned to the bundle product"""
  bundle_options: [ItemSelectedBundleOption]
  """The final discount information for the product"""
  discounts: [Discount]
  """The entered option for the base product, such as a logo or image"""
  entered_options: [OrderItemOption]
  """The unique ID for a \`OrderItemInterface\` object"""
  id: ID!
  """The name of the base product"""
  product_name: String
  """The sale price of the base product, including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The type of product, such as simple, configurable, etc."""
  product_type: String
  """URL key of the base product"""
  product_url_key: String
  """The number of canceled items"""
  quantity_canceled: Float
  """The number of invoiced items"""
  quantity_invoiced: Float
  """The number of units ordered for this item"""
  quantity_ordered: Float
  """The number of refunded items"""
  quantity_refunded: Float
  """The number of returned items"""
  quantity_returned: Float
  """The number of shipped items"""
  quantity_shipped: Float
  """The selected options for the base product, such as color or size"""
  selected_options: [OrderItemOption]
  """The status of the order item"""
  status: String
}

"""A list of options of the selected bundle product"""
type ItemSelectedBundleOption {
  """The unique ID for a \`ItemSelectedBundleOption\` object"""
  id: ID! @deprecated(reason: "Use \`uid\` instead")
  """The label of the option"""
  label: String!
  """The unique ID for a \`ItemSelectedBundleOption\` object"""
  uid: ID!
  """A list of products that represent the values of the parent option"""
  values: [ItemSelectedBundleOptionValue]
}

"""A list of values for the selected bundle product"""
type ItemSelectedBundleOptionValue {
  """The unique ID for a \`ItemSelectedBundleOptionValue\` object"""
  id: ID! @deprecated(reason: "Use \`uid\` instead")
  """The price of the child bundle product"""
  price: Money!
  """The name of the child bundle product"""
  product_name: String!
  """The SKU of the child bundle product"""
  product_sku: String!
  """Indicates how many of this bundle product were ordered"""
  quantity: Float!
  """The unique ID for a \`ItemSelectedBundleOptionValue\` object"""
  uid: ID!
}

type BundleInvoiceItem implements InvoiceItemInterface {
  """A list of bundle options that are assigned to the bundle product"""
  bundle_options: [ItemSelectedBundleOption]
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`InvoiceItemInterface\` object"""
  id: ID!
  """Contains details about an individual order item"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The number of invoiced items"""
  quantity_invoiced: Float
}

type BundleShipmentItem implements ShipmentItemInterface {
  """A list of bundle options that are assigned to the bundle product"""
  bundle_options: [ItemSelectedBundleOption]
  """The unique ID for a \`ShipmentItemInterface\` object"""
  id: ID!
  """Associated order item"""
  order_item: OrderItemInterface
  """Name of the base product"""
  product_name: String
  """Sale price for the base product"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """Number of shipped items"""
  quantity_shipped: Float!
}

type BundleCreditMemoItem implements CreditMemoItemInterface {
  """A list of bundle options that are assigned to the bundle product"""
  bundle_options: [ItemSelectedBundleOption]
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`CreditMemoItemInterface\` object"""
  id: ID!
  """The order item the credit memo is applied to"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product, including selected options"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """The number of refunded items"""
  quantity_refunded: Float
}

type BundleWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """An array containing information about the selected bundle items"""
  bundle_options: [SelectedBundleOption]
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

type ConfigurableCartItem implements CartItemInterface {
  configurable_options: [SelectedConfigurableOption]!
  customizable_options: [SelectedCustomizableOption]
  """The entered gift message for the cart item"""
  gift_message: GiftMessage
  id: String! @deprecated(reason: "Use \`uid\` instead")
  prices: CartItemPrices
  product: ProductInterface!
  quantity: Float!
  """The unique ID for a \`CartItemInterface\` object"""
  uid: ID!
}

type SelectedConfigurableOption {
  """The unique ID for a \`ConfigurableProductOptions\` object"""
  configurable_product_option_uid: ID!
  """The unique ID for a \`ConfigurableProductOptionsValues\` object"""
  configurable_product_option_value_uid: ID!
  id: Int! @deprecated(reason: "Use SelectedConfigurableOption.configurable_product_option_uid instead")
  option_label: String!
  value_id: Int! @deprecated(reason: "Use SelectedConfigurableOption.configurable_product_option_value_uid instead")
  value_label: String!
}

type SalesItemInterface {
  """The entered gift message for the order item"""
  gift_message: GiftMessage
}

"""GroupedProduct defines a grouped product"""
type GroupedProduct implements ProductInterface & PhysicalProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """An array containing grouped product items"""
  items: [GroupedProductItem]
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
  """The weight of the item, in units defined by the store."""
  weight: Float
}

"""GroupedProductItem contains information about an individual grouped product item"""
type GroupedProductItem {
  """The relative position of this item compared to the other group items"""
  position: Int
  """The ProductInterface object, which contains details about this product option"""
  product: ProductInterface
  """The quantity of this grouped product item"""
  qty: Float
}

"""A grouped product wish list item"""
type GroupedProductWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

"""Deprecated: use type \`PaypalExpressTokenOutput\` instead"""
type PaypalExpressToken {
  """A set of URLs that allow the buyer to authorize payment and adjust checkout details"""
  paypal_urls: PaypalExpressUrlList @deprecated(reason: "Use field \`paypal_urls\` of type \`PaypalExpressTokenOutput\` instead")
  """The token returned by PayPal"""
  token: String @deprecated(reason: "Use field \`token\` of type \`PaypalExpressTokenOutput\` instead")
}

"""Contains the secure information used to authorize transaction. Applies to Payflow Pro and Payments Pro payment methods."""
type PayflowProToken {
  response_message: String!
  result: Int!
  result_code: Int!
  secure_token: String!
  secure_token_id: String!
}

"""ConfigurableProduct defines basic features of a configurable product and its simple product variants"""
type ConfigurableProduct implements ProductInterface & PhysicalProductInterface & CustomizableProductInterface {
  activity: String
  """The attribute set assigned to the product."""
  attribute_set_id: Int @deprecated(reason: "The field should not be used on the storefront.")
  backorder_delivery_date: String
  backorder_delivery_period: Int
  """Relative canonical URL. This value is returned only if the system setting 'Use Canonical Link Meta Tag For Products' is enabled"""
  canonical_url: String
  """The categories assigned to a product."""
  categories: [CategoryInterface]
  category_gear: String
  climate: String
  collar: String
  color: Int
  colors: String
  compatible_phones: Int
  """An array of linked simple product items"""
  configurable_options: [ConfigurableProductOptions]
  """Metadata for the specified configurable options selection"""
  configurable_product_options_selection(configurableOptionValueUids: [ID!]): ConfigurableProductOptionsSelection
  """The product's country of origin."""
  country_of_manufacture: String
  """Timestamp indicating when the product was created."""
  created_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Crosssell Products"""
  crosssell_products: [ProductInterface]
  """Detailed information about the product. The value can include simple HTML tags."""
  description: ComplexTextValue
  dominant_color: Int
  eco_collection: Int
  erin_recommends: Int
  features_bags: String
  format: Int
  gender: String
  """Indicates whether a gift message is available."""
  gift_message_available: String
  """The ID number assigned to the product."""
  id: Int @deprecated(reason: "Use the \`uid\` field instead.")
  """The relative path to the main image on the product page."""
  image: ProductImage
  in_stock_delivery_period: Int
  """A number representing the product's manufacturer."""
  manufacturer: Int
  material: Int
  """An array of Media Gallery objects."""
  media_gallery: [MediaGalleryInterface]
  """An array of MediaGalleryEntry objects."""
  media_gallery_entries: [MediaGalleryEntry] @deprecated(reason: "Use product's \`media_gallery\` instead")
  """A brief overview of the product for search results listings, maximum 255 characters."""
  meta_description: String
  """A comma-separated list of keywords that are visible only to search engines."""
  meta_keyword: String
  """A string that is displayed in the title bar and tab of the browser and in search results lists."""
  meta_title: String
  """The product name. Customers use this name to identify the product."""
  name: String
  new: Int
  """The beginning date for new product listings, and determines if the product is featured as a new product."""
  new_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The end date for new product listings."""
  new_to_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """Product stock only x left count"""
  only_x_left_in_stock: Float
  """An array of options for a customizable product."""
  options: [CustomizableOptionInterface]
  """If the product has multiple options, determines where they appear on the product page."""
  options_container: String
  pattern: String
  performance_fabric: Int
  """A ProductPrices object, indicating the price of an item."""
  price: ProductPrices @deprecated(reason: "Use price_range for product price information.")
  """A PriceRange object, indicating the range of prices for the product"""
  price_range: PriceRange!
  """An array of TierPrice objects."""
  price_tiers: [TierPrice]
  print_art: String
  print_holiday: String
  print_labels: String
  print_landmarks: String
  print_landscape: String
  print_mood: String
  print_pattern_swatch: Int
  print_type: String
  """An array of ProductLinks objects."""
  product_links: [ProductLinksInterface]
  """The average of all the ratings given to the product."""
  rating_summary: Float!
  """Related Products"""
  related_products: [ProductInterface]
  """The total count of all the reviews given to the product."""
  review_count: Int!
  """The list of products reviews."""
  reviews(
    """Specifies the maximum number of results to return at once."""
    pageSize: Int = 20
    """Specifies which page of results to return."""
    currentPage: Int = 1
  ): ProductReviews!
  sale: Int
  """A short description of the product. Its use depends on the theme."""
  short_description: ComplexTextValue
  size: Int
  """A number or code assigned to a product to identify the product, options, price, and manufacturer."""
  sku: String
  sleeve: String
  """The relative path to the small image, which is used on catalog pages."""
  small_image: ProductImage
  """The beginning date that a product has a special price."""
  special_from_date: String @deprecated(reason: "The field should not be used on the storefront.")
  """The discounted price of the product."""
  special_price: Float
  """The end date that a product has a special price."""
  special_to_date: String
  """Stock status of the product"""
  stock_status: ProductStockStatus
  strap_bags: String
  style_bags: String
  style_bottom: String
  style_general: String
  """The file name of a swatch image"""
  swatch_image: String
  """The relative path to the product's thumbnail image."""
  thumbnail: ProductImage
  """The price when tier pricing is in effect and the items purchased threshold has been reached."""
  tier_price: Float @deprecated(reason: "Use price_tiers for product tier price information.")
  """An array of ProductTierPrices objects."""
  tier_prices: [ProductTierPrices] @deprecated(reason: "Use price_tiers for product tier price information.")
  """One of simple, virtual, bundle, downloadable, grouped, or configurable."""
  type_id: String @deprecated(reason: "Use __typename instead.")
  """The unique ID for a \`ProductInterface\` object."""
  uid: ID!
  """Timestamp indicating when the product was updated."""
  updated_at: String @deprecated(reason: "The field should not be used on the storefront.")
  """Upsell Products"""
  upsell_products: [ProductInterface]
  """The part of the URL that identifies the product"""
  url_key: String
  url_path: String @deprecated(reason: "Use product's \`canonical_url\` or url rewrites instead")
  """URL rewrites list"""
  url_rewrites: [UrlRewrite]
  """The part of the product URL that is appended after the url key"""
  url_suffix: String
  """An array of variants of products"""
  variants: [ConfigurableVariant]
  """An array of websites in which the product is available."""
  websites: [Website] @deprecated(reason: "The field should not be used on the storefront.")
  """The weight of the item, in units defined by the store."""
  weight: Float
}

"""ConfigurableProductOptions defines configurable attributes for the specified product"""
type ConfigurableProductOptions {
  """A string that identifies the attribute"""
  attribute_code: String
  """The ID assigned to the attribute"""
  attribute_id: String @deprecated(reason: "Use attribute_uid instead")
  """The ID assigned to the attribute"""
  attribute_id_v2: Int @deprecated(reason: "Use attribute_uid instead")
  """The unique ID for a \`Attribute\` object"""
  attribute_uid: ID!
  """The configurable option ID number assigned by the system"""
  id: Int @deprecated(reason: "Use uid instead")
  """A string that describes the configurable product option, which is displayed on the UI"""
  label: String
  """A number that indicates the order in which the attribute is displayed"""
  position: Int
  """This is the same as a product's id field"""
  product_id: Int @deprecated(reason: "\`product_id\` is not needed and can be obtained from it's parent")
  """The unique ID for a \`ConfigurableProductOptions\` object"""
  uid: ID!
  """Indicates whether the option is the default"""
  use_default: Boolean
  """An array that defines the value_index codes assigned to the configurable product"""
  values: [ConfigurableProductOptionsValues]
}

"""ConfigurableProductOptionsValues contains the index number assigned to a configurable product option"""
type ConfigurableProductOptionsValues {
  """The label of the product on the default store"""
  default_label: String
  """The label of the product"""
  label: String
  """The label of the product on the current store"""
  store_label: String
  """Swatch data for configurable product option"""
  swatch_data: SwatchDataInterface
  """The unique ID for a \`ConfigurableProductOptionsValues\` object"""
  uid: ID
  """Indicates whether to use the default_label"""
  use_default_value: Boolean
  """A unique index number assigned to the configurable product option"""
  value_index: Int @deprecated(reason: "Use \`uid\` instead")
}

interface SwatchDataInterface {
  """Value of swatch item (HEX color code, image link or textual value)"""
  value: String
}

"""Metadata corresponding to the configurable options selection."""
type ConfigurableProductOptionsSelection {
  """Product images and videos corresponding to the specified configurable options selection."""
  media_gallery: [MediaGalleryInterface]
  """Configurable options available for further selection based on current selection."""
  options_available_for_selection: [ConfigurableOptionAvailableForSelection]
  """Variant represented by the specified configurable options selection. It is expected to be null, until selections are made for each configurable option."""
  variant: SimpleProduct
}

"""Configurable option available for further selection based on current selection."""
type ConfigurableOptionAvailableForSelection {
  """Attribute code that uniquely identifies configurable option."""
  attribute_code: String!
  """Configurable option values available for further selection."""
  option_value_uids: [ID]!
}

"""An array containing all the simple product variants of a configurable product"""
type ConfigurableVariant {
  attributes: [ConfigurableAttributeOption]
  product: SimpleProduct
}

"""ConfigurableAttributeOption contains the value_index (and other related information) assigned to a configurable product option"""
type ConfigurableAttributeOption {
  """The ID assigned to the attribute"""
  code: String
  """A string that describes the configurable attribute option"""
  label: String
  """The unique ID for a \`ConfigurableAttributeOption\` object"""
  uid: ID!
  """A unique index number assigned to the configurable product option"""
  value_index: Int
}

"""A configurable product wish list item"""
type ConfigurableWishlistItem implements WishlistItemInterface {
  """The date and time the item was added to the wish list"""
  added_at: String!
  """The SKU of the simple product corresponding to a set of selected configurable options"""
  child_sku: String!
  """An array of selected configurable options"""
  configurable_options: [SelectedConfigurableOption]
  """Custom options selected for the wish list item"""
  customizable_options: [SelectedCustomizableOption]!
  """The description of the item"""
  description: String
  """The unique ID for a \`WishlistItemInterface\` object"""
  id: ID!
  """Product details of the wish list item"""
  product: ProductInterface
  """The quantity of this wish list item"""
  quantity: Float!
}

type OrderItem implements OrderItemInterface {
  """The final discount information for the product"""
  discounts: [Discount]
  """The entered option for the base product, such as a logo or image"""
  entered_options: [OrderItemOption]
  """The unique ID for a \`OrderItemInterface\` object"""
  id: ID!
  """The name of the base product"""
  product_name: String
  """The sale price of the base product, including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The type of product, such as simple, configurable, etc."""
  product_type: String
  """URL key of the base product"""
  product_url_key: String
  """The number of canceled items"""
  quantity_canceled: Float
  """The number of invoiced items"""
  quantity_invoiced: Float
  """The number of units ordered for this item"""
  quantity_ordered: Float
  """The number of refunded items"""
  quantity_refunded: Float
  """The number of returned items"""
  quantity_returned: Float
  """The number of shipped items"""
  quantity_shipped: Float
  """The selected options for the base product, such as color or size"""
  selected_options: [OrderItemOption]
  """The status of the order item"""
  status: String
}

type InvoiceItem implements InvoiceItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`InvoiceItemInterface\` object"""
  id: ID!
  """Contains details about an individual order item"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product including selected options"""
  product_sale_price: Money!
  """The SKU of the base product"""
  product_sku: String!
  """The number of invoiced items"""
  quantity_invoiced: Float
}

type ShipmentItem implements ShipmentItemInterface {
  """The unique ID for a \`ShipmentItemInterface\` object"""
  id: ID!
  """Associated order item"""
  order_item: OrderItemInterface
  """Name of the base product"""
  product_name: String
  """Sale price for the base product"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """Number of shipped items"""
  quantity_shipped: Float!
}

type CreditMemoItem implements CreditMemoItemInterface {
  """Contains information about the final discount amount for the base product, including discounts on options"""
  discounts: [Discount]
  """The unique ID for a \`CreditMemoItemInterface\` object"""
  id: ID!
  """The order item the credit memo is applied to"""
  order_item: OrderItemInterface
  """The name of the base product"""
  product_name: String
  """The sale price for the base product, including selected options"""
  product_sale_price: Money!
  """SKU of the base product"""
  product_sku: String!
  """The number of refunded items"""
  quantity_refunded: Float
}

interface SwatchLayerFilterItemInterface {
  """Data required to render swatch filter item"""
  swatch_data: SwatchData
}

type SwatchData {
  """Type of swatch filter item: 1 - text, 2 - image"""
  type: String
  """Value for swatch item (text or image link)"""
  value: String
}

type SwatchLayerFilterItem implements LayerFilterItemInterface & SwatchLayerFilterItemInterface {
  """Count of items by filter."""
  items_count: Int @deprecated(reason: "Use AggregationOption.count instead.")
  """Filter label."""
  label: String @deprecated(reason: "Use AggregationOption.label instead.")
  """Data required to render swatch filter item"""
  swatch_data: SwatchData
  """Value for filter request variable to be used in query."""
  value_string: String @deprecated(reason: "Use AggregationOption.value instead.")
}

type ImageSwatchData implements SwatchDataInterface {
  """Thumbnail swatch image URL"""
  thumbnail: String
  """Value of swatch item (HEX color code, image link or textual value)"""
  value: String
}

type TextSwatchData implements SwatchDataInterface {
  """Value of swatch item (HEX color code, image link or textual value)"""
  value: String
}

type ColorSwatchData implements SwatchDataInterface {
  """Value of swatch item (HEX color code, image link or textual value)"""
  value: String
}

`, `.mesh/sources/m2/schema.graphql`);

module.exports = buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});