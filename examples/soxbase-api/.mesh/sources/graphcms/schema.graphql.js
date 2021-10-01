const { buildSchema, Source } = require('graphql');

const source = new Source(/* GraphQL */`
schema {
  query: Query
  mutation: Mutation
}

directive @mark(
  """Marks if field is localized"""
  localized: Boolean
  """Marks if value is default"""
  default: Boolean
  """Marks if the locale is a part of the default fallback"""
  fallback: Boolean
  """Ordered list of fallback locales"""
  fallbackLocales: [String!]
  """Marks the pageInfo"""
  pageInfo: Boolean
  """Marks an aggregate type"""
  aggregate: Boolean
  """Marks a countable type"""
  countable: Boolean
  """Marks an edge type"""
  edge: Boolean
  """Marks a locale enum"""
  locale: Boolean
  """Marks asset url handler"""
  url: Boolean
  """Marks type of mutation kind"""
  mutationKind: _MutationKind
  """Marks kind of mutation input field"""
  mutationInputFieldKind: _MutationInputFieldKind
  """Marks filter and links to parent type"""
  filter: String
  """Marks filter kind"""
  filterKind: _FilterKind
  """Marks if corresponding field is list"""
  filterIsList: Boolean
  """Marks order by"""
  order: Boolean
  """Marks order direction"""
  orderDirection: _OrderDirection
  """Link to the Main type of the connection"""
  connection: String
  """Marks localizations field"""
  localizations: Boolean
  """Marks versions field on model"""
  modelVersions: Boolean
  """Marks document version field on Query"""
  documentVersion: Boolean
  """Marks stages field"""
  stages: Boolean
  """Specifies system createdAt field"""
  createdAtField: String
  """Specifies system updatedAt field"""
  updatedAtField: String
  """Specifies relation input kind"""
  relationInputKind: _RelationInputKind
  """Specifies relation kind (e.g. union relation or regular field relation)"""
  relationKind: _RelationKind
  """Specifies relation input cardinality"""
  relationInputCardinality: _RelationInputCardinality
  """Specifies relation input cardinality of reverse side"""
  reverseRelationInputCardinality: _RelationInputCardinality
  """Specifies model create input type"""
  createInputType: String
  """Specifies model create localization type"""
  createLocalizationInputType: String
  """Specifies GraphCMS field type"""
  fieldType: String
  """Specifies WhereUniqueInput type name"""
  whereUniqueInput: String
  """Specifies whether type is connect input"""
  isConnectInput: Boolean
  """Specifies relation input to be for abstract member type, not known master / origin side"""
  isMemberInput: Boolean
  """Specifies union type name"""
  unionType: Boolean
  """Specifies model a type is part of"""
  model: String
  """Specifies mode of system DateTime fields"""
  systemDateTimeFieldVariation: _SystemDateTimeFieldVariation
  """If versioned, documents of this model will be able to hold this amount of versions per stage"""
  versionRetentionCount: Int
  """If versioned, on publishing versions older than x days will be dropped"""
  versionRetentionPeriod: Int
  """Adds field validations"""
  validations: String
  """The model's storage ID"""
  storageId: String
  """Marks richText field return type"""
  isRichTextType: Boolean
  """Marks list richText field return type"""
  isListRichText: Boolean
  """The name of the associated RichText type"""
  richTextType: String
  """Marks relation fields that do not have a reverse side counterpart"""
  isUnidirectional: Boolean
  """Specifies if the filter's value can be replaced by the current user's id"""
  replaceableWithUserId: Boolean
) on OBJECT | FIELD_DEFINITION | ENUM_VALUE | ENUM | INPUT_FIELD_DEFINITION | INPUT_OBJECT | ARGUMENT_DEFINITION

directive @permission(
  """Policy resource names."""
  resources: [String!]
  """Policy action names."""
  actions: [String!]
) on FIELD_DEFINITION

directive @psql(
  """postgres table name"""
  table: String
  """postgres localization table name"""
  localizationTable: String
  """postgres column name"""
  column: [String!]
  """hardcoded postgres id value for enums"""
  id: String
  """postgres join on name"""
  join: [String!]
  """Specifies column for system id field"""
  idColumn: String
  """Specifies column for native sorting for relational fields"""
  prio: String
  """Specifies columns for union member fields"""
  memberColumns: [String!]
  """Specifies system updatedAt column"""
  updatedAtColumn: String
) on OBJECT | FIELD_DEFINITION | ENUM_VALUE | INPUT_FIELD_DEFINITION | ENUM | INPUT_OBJECT | ARGUMENT_DEFINITION

directive @remote(
  """url to fetch the remote content from"""
  url: String!
  """HTTP method used to fetch the remote content from"""
  method: String!
  """optional headers that will be sent in the remote call"""
  headers: Json
  """list of field apiIds that should be send as payload in the remote call"""
  requestParamFields: [String!]!
  """list of field storage ids that will available for templates and parameters for the remote call"""
  payloadFields: [String!]!
) on FIELD_DEFINITION

type Aggregate {
  count: Int!
}

"""Asset system model"""
type Asset implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [Asset!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [Asset!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  """The file handle"""
  handle: String!
  """The file name"""
  fileName: String!
  """The height of the file"""
  height: Float
  """The file width"""
  width: Float
  """The file size"""
  size: Float
  """The mime type of the file"""
  mimeType: String
  alt: String
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  assetRowHeroBanner(
    where: RowHeroBannerWhereInput
    orderBy: RowHeroBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`assetRowHeroBanner\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowHeroBanner!]!
  rowSpecialBannerAsset(
    where: RowSpecialBannerWhereInput
    orderBy: RowSpecialBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowSpecialBannerAsset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowSpecialBanner!]!
  assetRowProductBackstory(
    where: RowProductBackstoryWhereInput
    orderBy: RowProductBackstoryOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`assetRowProductBackstory\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowProductBackstory!]!
  assetPage(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`assetPage\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  assetPageLink(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`assetPageLink\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  """List of Asset versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
  """Get the url for the asset with provided transformations applied."""
  url(transformation: AssetTransformationInput): String!
}

input AssetConnectInput {
  """Document to connect"""
  where: AssetWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type AssetConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [AssetEdge!]!
  aggregate: Aggregate!
}

input AssetCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  handle: String!
  fileName: String!
  height: Float
  width: Float
  size: Float
  mimeType: String
  """alt input for default locale (en)"""
  alt: String
  assetRowHeroBanner: RowHeroBannerCreateManyInlineInput
  rowSpecialBannerAsset: RowSpecialBannerCreateManyInlineInput
  assetRowProductBackstory: RowProductBackstoryCreateManyInlineInput
  assetPage: PageCreateManyInlineInput
  assetPageLink: PageLinkCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: AssetCreateLocalizationsInput
}

input AssetCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  handle: String!
  fileName: String!
  height: Float
  width: Float
  size: Float
  mimeType: String
  alt: String
}

input AssetCreateLocalizationInput {
  """Localization input"""
  data: AssetCreateLocalizationDataInput!
  locale: Locale!
}

input AssetCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [AssetCreateLocalizationInput!]
}

input AssetCreateManyInlineInput {
  """Create and connect multiple existing Asset documents"""
  create: [AssetCreateInput!]
  """Connect multiple existing Asset documents"""
  connect: [AssetWhereUniqueInput!]
}

input AssetCreateOneInlineInput {
  """Create and connect one Asset document"""
  create: AssetCreateInput
  """Connect one existing Asset document"""
  connect: AssetWhereUniqueInput
}

"""An edge in a connection."""
type AssetEdge {
  """The item at the end of the edge."""
  node: Asset!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input AssetManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [AssetWhereInput!]
  """Logical OR on all given filters."""
  OR: [AssetWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [AssetWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  assetRowHeroBanner_every: RowHeroBannerWhereInput
  assetRowHeroBanner_some: RowHeroBannerWhereInput
  assetRowHeroBanner_none: RowHeroBannerWhereInput
  rowSpecialBannerAsset_every: RowSpecialBannerWhereInput
  rowSpecialBannerAsset_some: RowSpecialBannerWhereInput
  rowSpecialBannerAsset_none: RowSpecialBannerWhereInput
  assetRowProductBackstory_every: RowProductBackstoryWhereInput
  assetRowProductBackstory_some: RowProductBackstoryWhereInput
  assetRowProductBackstory_none: RowProductBackstoryWhereInput
  assetPage_every: PageWhereInput
  assetPage_some: PageWhereInput
  assetPage_none: PageWhereInput
  assetPageLink_every: PageLinkWhereInput
  assetPageLink_some: PageLinkWhereInput
  assetPageLink_none: PageLinkWhereInput
}

enum AssetOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  handle_ASC
  handle_DESC
  fileName_ASC
  fileName_DESC
  height_ASC
  height_DESC
  width_ASC
  width_DESC
  size_ASC
  size_DESC
  mimeType_ASC
  mimeType_DESC
  alt_ASC
  alt_DESC
}

"""Transformations for Assets"""
input AssetTransformationInput {
  image: ImageTransformationInput
  document: DocumentTransformationInput
  """Pass true if you want to validate the passed transformation parameters"""
  validateOptions: Boolean = false
}

input AssetUpdateInput {
  handle: String
  fileName: String
  height: Float
  width: Float
  size: Float
  mimeType: String
  """alt input for default locale (en)"""
  alt: String
  assetRowHeroBanner: RowHeroBannerUpdateManyInlineInput
  rowSpecialBannerAsset: RowSpecialBannerUpdateManyInlineInput
  assetRowProductBackstory: RowProductBackstoryUpdateManyInlineInput
  assetPage: PageUpdateManyInlineInput
  assetPageLink: PageLinkUpdateManyInlineInput
  """Manage document localizations"""
  localizations: AssetUpdateLocalizationsInput
}

input AssetUpdateLocalizationDataInput {
  handle: String
  fileName: String
  height: Float
  width: Float
  size: Float
  mimeType: String
  alt: String
}

input AssetUpdateLocalizationInput {
  data: AssetUpdateLocalizationDataInput!
  locale: Locale!
}

input AssetUpdateLocalizationsInput {
  """Localizations to create"""
  create: [AssetCreateLocalizationInput!]
  """Localizations to update"""
  update: [AssetUpdateLocalizationInput!]
  upsert: [AssetUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input AssetUpdateManyInlineInput {
  """Create and connect multiple Asset documents"""
  create: [AssetCreateInput!]
  """Connect multiple existing Asset documents"""
  connect: [AssetConnectInput!]
  """Override currently-connected documents with multiple existing Asset documents"""
  set: [AssetWhereUniqueInput!]
  """Update multiple Asset documents"""
  update: [AssetUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple Asset documents"""
  upsert: [AssetUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple Asset documents"""
  disconnect: [AssetWhereUniqueInput!]
  """Delete multiple Asset documents"""
  delete: [AssetWhereUniqueInput!]
}

input AssetUpdateManyInput {
  fileName: String
  height: Float
  width: Float
  size: Float
  mimeType: String
  """alt input for default locale (en)"""
  alt: String
  """Optional updates to localizations"""
  localizations: AssetUpdateManyLocalizationsInput
}

input AssetUpdateManyLocalizationDataInput {
  fileName: String
  height: Float
  width: Float
  size: Float
  mimeType: String
  alt: String
}

input AssetUpdateManyLocalizationInput {
  data: AssetUpdateManyLocalizationDataInput!
  locale: Locale!
}

input AssetUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [AssetUpdateManyLocalizationInput!]
}

input AssetUpdateManyWithNestedWhereInput {
  """Document search"""
  where: AssetWhereInput!
  """Update many input"""
  data: AssetUpdateManyInput!
}

input AssetUpdateOneInlineInput {
  """Create and connect one Asset document"""
  create: AssetCreateInput
  """Update single Asset document"""
  update: AssetUpdateWithNestedWhereUniqueInput
  """Upsert single Asset document"""
  upsert: AssetUpsertWithNestedWhereUniqueInput
  """Connect existing Asset document"""
  connect: AssetWhereUniqueInput
  """Disconnect currently connected Asset document"""
  disconnect: Boolean
  """Delete currently connected Asset document"""
  delete: Boolean
}

input AssetUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: AssetWhereUniqueInput!
  """Document to update"""
  data: AssetUpdateInput!
}

input AssetUpsertInput {
  """Create document if it didn't exist"""
  create: AssetCreateInput!
  """Update document if it exists"""
  update: AssetUpdateInput!
}

input AssetUpsertLocalizationInput {
  update: AssetUpdateLocalizationDataInput!
  create: AssetCreateLocalizationDataInput!
  locale: Locale!
}

input AssetUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: AssetWhereUniqueInput!
  """Upsert data"""
  data: AssetUpsertInput!
}

"""Identifies documents"""
input AssetWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [AssetWhereInput!]
  """Logical OR on all given filters."""
  OR: [AssetWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [AssetWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  handle: String
  """All values that are not equal to given value."""
  handle_not: String
  """All values that are contained in given list."""
  handle_in: [String!]
  """All values that are not contained in given list."""
  handle_not_in: [String!]
  """All values containing the given string."""
  handle_contains: String
  """All values not containing the given string."""
  handle_not_contains: String
  """All values starting with the given string."""
  handle_starts_with: String
  """All values not starting with the given string."""
  handle_not_starts_with: String
  """All values ending with the given string."""
  handle_ends_with: String
  """All values not ending with the given string"""
  handle_not_ends_with: String
  fileName: String
  """All values that are not equal to given value."""
  fileName_not: String
  """All values that are contained in given list."""
  fileName_in: [String!]
  """All values that are not contained in given list."""
  fileName_not_in: [String!]
  """All values containing the given string."""
  fileName_contains: String
  """All values not containing the given string."""
  fileName_not_contains: String
  """All values starting with the given string."""
  fileName_starts_with: String
  """All values not starting with the given string."""
  fileName_not_starts_with: String
  """All values ending with the given string."""
  fileName_ends_with: String
  """All values not ending with the given string"""
  fileName_not_ends_with: String
  height: Float
  """All values that are not equal to given value."""
  height_not: Float
  """All values that are contained in given list."""
  height_in: [Float!]
  """All values that are not contained in given list."""
  height_not_in: [Float!]
  """All values less than the given value."""
  height_lt: Float
  """All values less than or equal the given value."""
  height_lte: Float
  """All values greater than the given value."""
  height_gt: Float
  """All values greater than or equal the given value."""
  height_gte: Float
  width: Float
  """All values that are not equal to given value."""
  width_not: Float
  """All values that are contained in given list."""
  width_in: [Float!]
  """All values that are not contained in given list."""
  width_not_in: [Float!]
  """All values less than the given value."""
  width_lt: Float
  """All values less than or equal the given value."""
  width_lte: Float
  """All values greater than the given value."""
  width_gt: Float
  """All values greater than or equal the given value."""
  width_gte: Float
  size: Float
  """All values that are not equal to given value."""
  size_not: Float
  """All values that are contained in given list."""
  size_in: [Float!]
  """All values that are not contained in given list."""
  size_not_in: [Float!]
  """All values less than the given value."""
  size_lt: Float
  """All values less than or equal the given value."""
  size_lte: Float
  """All values greater than the given value."""
  size_gt: Float
  """All values greater than or equal the given value."""
  size_gte: Float
  mimeType: String
  """All values that are not equal to given value."""
  mimeType_not: String
  """All values that are contained in given list."""
  mimeType_in: [String!]
  """All values that are not contained in given list."""
  mimeType_not_in: [String!]
  """All values containing the given string."""
  mimeType_contains: String
  """All values not containing the given string."""
  mimeType_not_contains: String
  """All values starting with the given string."""
  mimeType_starts_with: String
  """All values not starting with the given string."""
  mimeType_not_starts_with: String
  """All values ending with the given string."""
  mimeType_ends_with: String
  """All values not ending with the given string"""
  mimeType_not_ends_with: String
  alt: String
  """All values that are not equal to given value."""
  alt_not: String
  """All values that are contained in given list."""
  alt_in: [String!]
  """All values that are not contained in given list."""
  alt_not_in: [String!]
  """All values containing the given string."""
  alt_contains: String
  """All values not containing the given string."""
  alt_not_contains: String
  """All values starting with the given string."""
  alt_starts_with: String
  """All values not starting with the given string."""
  alt_not_starts_with: String
  """All values ending with the given string."""
  alt_ends_with: String
  """All values not ending with the given string"""
  alt_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  assetRowHeroBanner_every: RowHeroBannerWhereInput
  assetRowHeroBanner_some: RowHeroBannerWhereInput
  assetRowHeroBanner_none: RowHeroBannerWhereInput
  rowSpecialBannerAsset_every: RowSpecialBannerWhereInput
  rowSpecialBannerAsset_some: RowSpecialBannerWhereInput
  rowSpecialBannerAsset_none: RowSpecialBannerWhereInput
  assetRowProductBackstory_every: RowProductBackstoryWhereInput
  assetRowProductBackstory_some: RowProductBackstoryWhereInput
  assetRowProductBackstory_none: RowProductBackstoryWhereInput
  assetPage_every: PageWhereInput
  assetPage_some: PageWhereInput
  assetPage_none: PageWhereInput
  assetPageLink_every: PageLinkWhereInput
  assetPageLink_some: PageLinkWhereInput
  assetPageLink_none: PageLinkWhereInput
}

"""References Asset record uniquely"""
input AssetWhereUniqueInput {
  id: ID
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

"""Representing a color value comprising of HEX, RGBA and css color values"""
type Color {
  hex: Hex!
  rgba: RGBA!
  css: String!
}

"""Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used."""
input ColorInput {
  hex: Hex
  rgba: RGBAInput
}

input ConnectPositionInput {
  """Connect document after specified document"""
  after: ID
  """Connect document before specified document"""
  before: ID
  """Connect document at first position"""
  start: Boolean
  """Connect document at last position"""
  end: Boolean
}

"""A date string, such as 2007-12-03 (YYYY-MM-DD), compliant with ISO 8601 standard for representation of dates using the Gregorian calendar."""
scalar Date

"""A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-timeformat outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representationof dates and times using the Gregorian calendar."""
scalar DateTime

enum DocumentFileTypes {
  jpg
  odp
  ods
  odt
  png
  svg
  txt
  webp
  docx
  pdf
  html
  doc
  xlsx
  xls
  pptx
  ppt
}

input DocumentOutputInput {
  """
  Transforms a document into a desired file type.
  See this matrix for format support:
  
  PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
  DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
  DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
  ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
  XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
  XLSX:	jpg, pdf, ods, png, svg, xls, and webp
  ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
  PPT:	jpg, odp, pdf, png, svg, pptx, and webp
  PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
  ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
  BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
  GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
  JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
  PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
  WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
  TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
  AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
  PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
  SVG:	jpg, odp, ods, odt, pdf, png, and webp
  HTML:	jpg, odt, pdf, svg, txt, and webp
  TXT:	jpg, html, odt, pdf, svg, and webp
  """
  format: DocumentFileTypes
}

"""Transformations for Documents"""
input DocumentTransformationInput {
  """Changes the output for the file."""
  output: DocumentOutputInput
}

type DocumentVersion {
  id: ID!
  stage: Stage!
  revision: Int!
  createdAt: DateTime!
  data: Json
}

type Footer implements Node {
  """System stage field"""
  stage: Stage!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [Footer!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt: DateTime!
  """The time the document was updated"""
  updatedAt: DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt: DateTime
  identity: String!
  copyright: String
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  socialLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`socialLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  legalLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`legalLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  """List of Footer versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input FooterConnectInput {
  """Document to connect"""
  where: FooterWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type FooterConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [FooterEdge!]!
  aggregate: Aggregate!
}

input FooterCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  copyright: String
  socialLinks: PageLinkCreateManyInlineInput
  legalLinks: PageLinkCreateManyInlineInput
}

input FooterCreateManyInlineInput {
  """Create and connect multiple existing Footer documents"""
  create: [FooterCreateInput!]
  """Connect multiple existing Footer documents"""
  connect: [FooterWhereUniqueInput!]
}

input FooterCreateOneInlineInput {
  """Create and connect one Footer document"""
  create: FooterCreateInput
  """Connect one existing Footer document"""
  connect: FooterWhereUniqueInput
}

"""An edge in a connection."""
type FooterEdge {
  """The item at the end of the edge."""
  node: Footer!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input FooterManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [FooterWhereInput!]
  """Logical OR on all given filters."""
  OR: [FooterWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [FooterWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  copyright: String
  """All values that are not equal to given value."""
  copyright_not: String
  """All values that are contained in given list."""
  copyright_in: [String!]
  """All values that are not contained in given list."""
  copyright_not_in: [String!]
  """All values containing the given string."""
  copyright_contains: String
  """All values not containing the given string."""
  copyright_not_contains: String
  """All values starting with the given string."""
  copyright_starts_with: String
  """All values not starting with the given string."""
  copyright_not_starts_with: String
  """All values ending with the given string."""
  copyright_ends_with: String
  """All values not ending with the given string"""
  copyright_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  socialLinks_every: PageLinkWhereInput
  socialLinks_some: PageLinkWhereInput
  socialLinks_none: PageLinkWhereInput
  legalLinks_every: PageLinkWhereInput
  legalLinks_some: PageLinkWhereInput
  legalLinks_none: PageLinkWhereInput
}

enum FooterOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  copyright_ASC
  copyright_DESC
}

input FooterUpdateInput {
  identity: String
  copyright: String
  socialLinks: PageLinkUpdateManyInlineInput
  legalLinks: PageLinkUpdateManyInlineInput
}

input FooterUpdateManyInlineInput {
  """Create and connect multiple Footer documents"""
  create: [FooterCreateInput!]
  """Connect multiple existing Footer documents"""
  connect: [FooterConnectInput!]
  """Override currently-connected documents with multiple existing Footer documents"""
  set: [FooterWhereUniqueInput!]
  """Update multiple Footer documents"""
  update: [FooterUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple Footer documents"""
  upsert: [FooterUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple Footer documents"""
  disconnect: [FooterWhereUniqueInput!]
  """Delete multiple Footer documents"""
  delete: [FooterWhereUniqueInput!]
}

input FooterUpdateManyInput {
  copyright: String
}

input FooterUpdateManyWithNestedWhereInput {
  """Document search"""
  where: FooterWhereInput!
  """Update many input"""
  data: FooterUpdateManyInput!
}

input FooterUpdateOneInlineInput {
  """Create and connect one Footer document"""
  create: FooterCreateInput
  """Update single Footer document"""
  update: FooterUpdateWithNestedWhereUniqueInput
  """Upsert single Footer document"""
  upsert: FooterUpsertWithNestedWhereUniqueInput
  """Connect existing Footer document"""
  connect: FooterWhereUniqueInput
  """Disconnect currently connected Footer document"""
  disconnect: Boolean
  """Delete currently connected Footer document"""
  delete: Boolean
}

input FooterUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: FooterWhereUniqueInput!
  """Document to update"""
  data: FooterUpdateInput!
}

input FooterUpsertInput {
  """Create document if it didn't exist"""
  create: FooterCreateInput!
  """Update document if it exists"""
  update: FooterUpdateInput!
}

input FooterUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: FooterWhereUniqueInput!
  """Upsert data"""
  data: FooterUpsertInput!
}

"""Identifies documents"""
input FooterWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [FooterWhereInput!]
  """Logical OR on all given filters."""
  OR: [FooterWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [FooterWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  copyright: String
  """All values that are not equal to given value."""
  copyright_not: String
  """All values that are contained in given list."""
  copyright_in: [String!]
  """All values that are not contained in given list."""
  copyright_not_in: [String!]
  """All values containing the given string."""
  copyright_contains: String
  """All values not containing the given string."""
  copyright_not_contains: String
  """All values starting with the given string."""
  copyright_starts_with: String
  """All values not starting with the given string."""
  copyright_not_starts_with: String
  """All values ending with the given string."""
  copyright_ends_with: String
  """All values not ending with the given string"""
  copyright_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  socialLinks_every: PageLinkWhereInput
  socialLinks_some: PageLinkWhereInput
  socialLinks_none: PageLinkWhereInput
  legalLinks_every: PageLinkWhereInput
  legalLinks_some: PageLinkWhereInput
  legalLinks_none: PageLinkWhereInput
}

"""References Footer record uniquely"""
input FooterWhereUniqueInput {
  id: ID
  identity: String
}

scalar Hex

enum ImageFit {
  """Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio."""
  clip
  """Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries."""
  crop
  """Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method."""
  scale
  """Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size."""
  max
}

input ImageResizeInput {
  """The width in pixels to resize the image to. The value must be an integer from 1 to 10000."""
  width: Int
  """The height in pixels to resize the image to. The value must be an integer from 1 to 10000."""
  height: Int
  """The default value for the fit parameter is fit:clip."""
  fit: ImageFit
}

"""Transformations for Images"""
input ImageTransformationInput {
  """Resizes the image"""
  resize: ImageResizeInput
}

"""Raw JSON value"""
scalar Json

"""Locale system enumeration"""
enum Locale {
  """System locale"""
  en
}

"""Representing a geolocation point with latitude and longitude"""
type Location {
  latitude: Float!
  longitude: Float!
  distance(from: LocationInput!): Float!
}

"""Input for a geolocation point with latitude and longitude"""
input LocationInput {
  latitude: Float!
  longitude: Float!
}

"""The Long scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1."""
scalar Long

type MagentoCategory implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [MagentoCategory!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [MagentoCategory!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  url: String!
  category: String
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  rowProductGrids(
    where: RowProductGridWhereInput
    orderBy: RowProductGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowProductGrids\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowProductGrid!]!
  """List of MagentoCategory versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input MagentoCategoryConnectInput {
  """Document to connect"""
  where: MagentoCategoryWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type MagentoCategoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [MagentoCategoryEdge!]!
  aggregate: Aggregate!
}

input MagentoCategoryCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  """url input for default locale (en)"""
  url: String!
  category: String
  rowProductGrids: RowProductGridCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: MagentoCategoryCreateLocalizationsInput
}

input MagentoCategoryCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  url: String!
}

input MagentoCategoryCreateLocalizationInput {
  """Localization input"""
  data: MagentoCategoryCreateLocalizationDataInput!
  locale: Locale!
}

input MagentoCategoryCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [MagentoCategoryCreateLocalizationInput!]
}

input MagentoCategoryCreateManyInlineInput {
  """Create and connect multiple existing MagentoCategory documents"""
  create: [MagentoCategoryCreateInput!]
  """Connect multiple existing MagentoCategory documents"""
  connect: [MagentoCategoryWhereUniqueInput!]
}

input MagentoCategoryCreateOneInlineInput {
  """Create and connect one MagentoCategory document"""
  create: MagentoCategoryCreateInput
  """Connect one existing MagentoCategory document"""
  connect: MagentoCategoryWhereUniqueInput
}

"""An edge in a connection."""
type MagentoCategoryEdge {
  """The item at the end of the edge."""
  node: MagentoCategory!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input MagentoCategoryManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [MagentoCategoryWhereInput!]
  """Logical OR on all given filters."""
  OR: [MagentoCategoryWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [MagentoCategoryWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  category: String
  """All values that are not equal to given value."""
  category_not: String
  """All values that are contained in given list."""
  category_in: [String!]
  """All values that are not contained in given list."""
  category_not_in: [String!]
  """All values containing the given string."""
  category_contains: String
  """All values not containing the given string."""
  category_not_contains: String
  """All values starting with the given string."""
  category_starts_with: String
  """All values not starting with the given string."""
  category_not_starts_with: String
  """All values ending with the given string."""
  category_ends_with: String
  """All values not ending with the given string"""
  category_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowProductGrids_every: RowProductGridWhereInput
  rowProductGrids_some: RowProductGridWhereInput
  rowProductGrids_none: RowProductGridWhereInput
}

enum MagentoCategoryOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  url_ASC
  url_DESC
  category_ASC
  category_DESC
}

input MagentoCategoryUpdateInput {
  """url input for default locale (en)"""
  url: String
  category: String
  rowProductGrids: RowProductGridUpdateManyInlineInput
  """Manage document localizations"""
  localizations: MagentoCategoryUpdateLocalizationsInput
}

input MagentoCategoryUpdateLocalizationDataInput {
  url: String
}

input MagentoCategoryUpdateLocalizationInput {
  data: MagentoCategoryUpdateLocalizationDataInput!
  locale: Locale!
}

input MagentoCategoryUpdateLocalizationsInput {
  """Localizations to create"""
  create: [MagentoCategoryCreateLocalizationInput!]
  """Localizations to update"""
  update: [MagentoCategoryUpdateLocalizationInput!]
  upsert: [MagentoCategoryUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input MagentoCategoryUpdateManyInlineInput {
  """Create and connect multiple MagentoCategory documents"""
  create: [MagentoCategoryCreateInput!]
  """Connect multiple existing MagentoCategory documents"""
  connect: [MagentoCategoryConnectInput!]
  """Override currently-connected documents with multiple existing MagentoCategory documents"""
  set: [MagentoCategoryWhereUniqueInput!]
  """Update multiple MagentoCategory documents"""
  update: [MagentoCategoryUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple MagentoCategory documents"""
  upsert: [MagentoCategoryUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple MagentoCategory documents"""
  disconnect: [MagentoCategoryWhereUniqueInput!]
  """Delete multiple MagentoCategory documents"""
  delete: [MagentoCategoryWhereUniqueInput!]
}

input MagentoCategoryUpdateManyInput {
  category: String
}

input MagentoCategoryUpdateManyWithNestedWhereInput {
  """Document search"""
  where: MagentoCategoryWhereInput!
  """Update many input"""
  data: MagentoCategoryUpdateManyInput!
}

input MagentoCategoryUpdateOneInlineInput {
  """Create and connect one MagentoCategory document"""
  create: MagentoCategoryCreateInput
  """Update single MagentoCategory document"""
  update: MagentoCategoryUpdateWithNestedWhereUniqueInput
  """Upsert single MagentoCategory document"""
  upsert: MagentoCategoryUpsertWithNestedWhereUniqueInput
  """Connect existing MagentoCategory document"""
  connect: MagentoCategoryWhereUniqueInput
  """Disconnect currently connected MagentoCategory document"""
  disconnect: Boolean
  """Delete currently connected MagentoCategory document"""
  delete: Boolean
}

input MagentoCategoryUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: MagentoCategoryWhereUniqueInput!
  """Document to update"""
  data: MagentoCategoryUpdateInput!
}

input MagentoCategoryUpsertInput {
  """Create document if it didn't exist"""
  create: MagentoCategoryCreateInput!
  """Update document if it exists"""
  update: MagentoCategoryUpdateInput!
}

input MagentoCategoryUpsertLocalizationInput {
  update: MagentoCategoryUpdateLocalizationDataInput!
  create: MagentoCategoryCreateLocalizationDataInput!
  locale: Locale!
}

input MagentoCategoryUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: MagentoCategoryWhereUniqueInput!
  """Upsert data"""
  data: MagentoCategoryUpsertInput!
}

"""Identifies documents"""
input MagentoCategoryWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [MagentoCategoryWhereInput!]
  """Logical OR on all given filters."""
  OR: [MagentoCategoryWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [MagentoCategoryWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  url: String
  """All values that are not equal to given value."""
  url_not: String
  """All values that are contained in given list."""
  url_in: [String!]
  """All values that are not contained in given list."""
  url_not_in: [String!]
  """All values containing the given string."""
  url_contains: String
  """All values not containing the given string."""
  url_not_contains: String
  """All values starting with the given string."""
  url_starts_with: String
  """All values not starting with the given string."""
  url_not_starts_with: String
  """All values ending with the given string."""
  url_ends_with: String
  """All values not ending with the given string"""
  url_not_ends_with: String
  category: String
  """All values that are not equal to given value."""
  category_not: String
  """All values that are contained in given list."""
  category_in: [String!]
  """All values that are not contained in given list."""
  category_not_in: [String!]
  """All values containing the given string."""
  category_contains: String
  """All values not containing the given string."""
  category_not_contains: String
  """All values starting with the given string."""
  category_starts_with: String
  """All values not starting with the given string."""
  category_not_starts_with: String
  """All values ending with the given string."""
  category_ends_with: String
  """All values not ending with the given string"""
  category_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowProductGrids_every: RowProductGridWhereInput
  rowProductGrids_some: RowProductGridWhereInput
  rowProductGrids_none: RowProductGridWhereInput
}

"""References MagentoCategory record uniquely"""
input MagentoCategoryWhereUniqueInput {
  id: ID
}

enum MetaRobots {
  INDEX_FOLLOW
  INDEX_NOFOLLOW
  NOINDEX_FOLLOW
  NOINDEX_NOFOLLOW
}

type Mutation {
  """Create one rowServiceOptions"""
  createRowServiceOptions(data: RowServiceOptionsCreateInput!): RowServiceOptions
  """Update one rowServiceOptions"""
  updateRowServiceOptions(where: RowServiceOptionsWhereUniqueInput!, data: RowServiceOptionsUpdateInput!): RowServiceOptions
  """Delete one rowServiceOptions from _all_ existing stages. Returns deleted document."""
  deleteRowServiceOptions(
    """Document to delete"""
    where: RowServiceOptionsWhereUniqueInput!
  ): RowServiceOptions
  """Upsert one rowServiceOptions"""
  upsertRowServiceOptions(where: RowServiceOptionsWhereUniqueInput!, upsert: RowServiceOptionsUpsertInput!): RowServiceOptions
  """Publish one rowServiceOptions"""
  publishRowServiceOptions(
    """Document to publish"""
    where: RowServiceOptionsWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowServiceOptions
  """Unpublish one rowServiceOptions from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowServiceOptions(
    """Document to unpublish"""
    where: RowServiceOptionsWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowServiceOptions
  """Update many RowServiceOptions documents"""
  updateManyRowServiceOptionsMultipleConnection(
    """Documents to apply update on"""
    where: RowServiceOptionsManyWhereInput
    """Updates to document content"""
    data: RowServiceOptionsUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowServiceOptionsConnection!
  """Delete many RowServiceOptions documents, return deleted documents"""
  deleteManyRowServiceOptionsMultipleConnection(
    """Documents to delete"""
    where: RowServiceOptionsManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowServiceOptionsConnection!
  """Publish many RowServiceOptions documents"""
  publishManyRowServiceOptionsMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: RowServiceOptionsManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowServiceOptionsConnection!
  """Find many RowServiceOptions documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowServiceOptionsMultipleConnection(
    """Identifies documents in draft stage"""
    where: RowServiceOptionsManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowServiceOptionsConnection!
  """Update many rowServiceOptionsMultiple"""
  updateManyRowServiceOptionsMultiple(
    """Documents to apply update on"""
    where: RowServiceOptionsManyWhereInput
    """Updates to document content"""
    data: RowServiceOptionsUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowServiceOptionsMultipleConnection)")
  """Delete many RowServiceOptions documents"""
  deleteManyRowServiceOptionsMultiple(
    """Documents to delete"""
    where: RowServiceOptionsManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowServiceOptionsMultipleConnection)")
  """Publish many RowServiceOptions documents"""
  publishManyRowServiceOptionsMultiple(
    """Identifies documents in each stage to be published"""
    where: RowServiceOptionsManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowServiceOptionsMultipleConnection)")
  """Unpublish many RowServiceOptions documents"""
  unpublishManyRowServiceOptionsMultiple(
    """Identifies documents in each stage"""
    where: RowServiceOptionsManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowServiceOptionsMultipleConnection)")
  """Create one product"""
  createProduct(data: ProductCreateInput!): Product
  """Update one product"""
  updateProduct(where: ProductWhereUniqueInput!, data: ProductUpdateInput!): Product
  """Delete one product from _all_ existing stages. Returns deleted document."""
  deleteProduct(
    """Document to delete"""
    where: ProductWhereUniqueInput!
  ): Product
  """Upsert one product"""
  upsertProduct(where: ProductWhereUniqueInput!, upsert: ProductUpsertInput!): Product
  """Publish one product"""
  publishProduct(
    """Document to publish"""
    where: ProductWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): Product
  """Unpublish one product from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishProduct(
    """Document to unpublish"""
    where: ProductWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): Product
  """Update many Product documents"""
  updateManyProductpagesConnection(
    """Documents to apply update on"""
    where: ProductManyWhereInput
    """Updates to document content"""
    data: ProductUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): ProductConnection!
  """Delete many Product documents, return deleted documents"""
  deleteManyProductpagesConnection(
    """Documents to delete"""
    where: ProductManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): ProductConnection!
  """Publish many Product documents"""
  publishManyProductpagesConnection(
    """Identifies documents in each stage to be published"""
    where: ProductManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): ProductConnection!
  """Find many Product documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyProductpagesConnection(
    """Identifies documents in draft stage"""
    where: ProductManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): ProductConnection!
  """Update many productpages"""
  updateManyProductpages(
    """Documents to apply update on"""
    where: ProductManyWhereInput
    """Updates to document content"""
    data: ProductUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyProductpagesConnection)")
  """Delete many Product documents"""
  deleteManyProductpages(
    """Documents to delete"""
    where: ProductManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyProductpagesConnection)")
  """Publish many Product documents"""
  publishManyProductpages(
    """Identifies documents in each stage to be published"""
    where: ProductManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyProductpagesConnection)")
  """Unpublish many Product documents"""
  unpublishManyProductpages(
    """Identifies documents in each stage"""
    where: ProductManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyProductpagesConnection)")
  """Create one rowHeroBanner"""
  createRowHeroBanner(data: RowHeroBannerCreateInput!): RowHeroBanner
  """Update one rowHeroBanner"""
  updateRowHeroBanner(where: RowHeroBannerWhereUniqueInput!, data: RowHeroBannerUpdateInput!): RowHeroBanner
  """Delete one rowHeroBanner from _all_ existing stages. Returns deleted document."""
  deleteRowHeroBanner(
    """Document to delete"""
    where: RowHeroBannerWhereUniqueInput!
  ): RowHeroBanner
  """Upsert one rowHeroBanner"""
  upsertRowHeroBanner(where: RowHeroBannerWhereUniqueInput!, upsert: RowHeroBannerUpsertInput!): RowHeroBanner
  """Publish one rowHeroBanner"""
  publishRowHeroBanner(
    """Document to publish"""
    where: RowHeroBannerWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowHeroBanner
  """Unpublish one rowHeroBanner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowHeroBanner(
    """Document to unpublish"""
    where: RowHeroBannerWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowHeroBanner
  """Update many RowHeroBanner documents"""
  updateManyRowHeroBannersConnection(
    """Documents to apply update on"""
    where: RowHeroBannerManyWhereInput
    """Updates to document content"""
    data: RowHeroBannerUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowHeroBannerConnection!
  """Delete many RowHeroBanner documents, return deleted documents"""
  deleteManyRowHeroBannersConnection(
    """Documents to delete"""
    where: RowHeroBannerManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowHeroBannerConnection!
  """Publish many RowHeroBanner documents"""
  publishManyRowHeroBannersConnection(
    """Identifies documents in each stage to be published"""
    where: RowHeroBannerManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowHeroBannerConnection!
  """Find many RowHeroBanner documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowHeroBannersConnection(
    """Identifies documents in draft stage"""
    where: RowHeroBannerManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowHeroBannerConnection!
  """Update many rowHeroBanners"""
  updateManyRowHeroBanners(
    """Documents to apply update on"""
    where: RowHeroBannerManyWhereInput
    """Updates to document content"""
    data: RowHeroBannerUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowHeroBannersConnection)")
  """Delete many RowHeroBanner documents"""
  deleteManyRowHeroBanners(
    """Documents to delete"""
    where: RowHeroBannerManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowHeroBannersConnection)")
  """Publish many RowHeroBanner documents"""
  publishManyRowHeroBanners(
    """Identifies documents in each stage to be published"""
    where: RowHeroBannerManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowHeroBannersConnection)")
  """Unpublish many RowHeroBanner documents"""
  unpublishManyRowHeroBanners(
    """Identifies documents in each stage"""
    where: RowHeroBannerManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowHeroBannersConnection)")
  """Create one rowSwipeableGrid"""
  createRowSwipeableGrid(data: RowSwipeableGridCreateInput!): RowSwipeableGrid
  """Update one rowSwipeableGrid"""
  updateRowSwipeableGrid(where: RowSwipeableGridWhereUniqueInput!, data: RowSwipeableGridUpdateInput!): RowSwipeableGrid
  """Delete one rowSwipeableGrid from _all_ existing stages. Returns deleted document."""
  deleteRowSwipeableGrid(
    """Document to delete"""
    where: RowSwipeableGridWhereUniqueInput!
  ): RowSwipeableGrid
  """Upsert one rowSwipeableGrid"""
  upsertRowSwipeableGrid(where: RowSwipeableGridWhereUniqueInput!, upsert: RowSwipeableGridUpsertInput!): RowSwipeableGrid
  """Publish one rowSwipeableGrid"""
  publishRowSwipeableGrid(
    """Document to publish"""
    where: RowSwipeableGridWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowSwipeableGrid
  """Unpublish one rowSwipeableGrid from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowSwipeableGrid(
    """Document to unpublish"""
    where: RowSwipeableGridWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowSwipeableGrid
  """Update many RowSwipeableGrid documents"""
  updateManyRowSwipeableGridsConnection(
    """Documents to apply update on"""
    where: RowSwipeableGridManyWhereInput
    """Updates to document content"""
    data: RowSwipeableGridUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowSwipeableGridConnection!
  """Delete many RowSwipeableGrid documents, return deleted documents"""
  deleteManyRowSwipeableGridsConnection(
    """Documents to delete"""
    where: RowSwipeableGridManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowSwipeableGridConnection!
  """Publish many RowSwipeableGrid documents"""
  publishManyRowSwipeableGridsConnection(
    """Identifies documents in each stage to be published"""
    where: RowSwipeableGridManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowSwipeableGridConnection!
  """Find many RowSwipeableGrid documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowSwipeableGridsConnection(
    """Identifies documents in draft stage"""
    where: RowSwipeableGridManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowSwipeableGridConnection!
  """Update many rowSwipeableGrids"""
  updateManyRowSwipeableGrids(
    """Documents to apply update on"""
    where: RowSwipeableGridManyWhereInput
    """Updates to document content"""
    data: RowSwipeableGridUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowSwipeableGridsConnection)")
  """Delete many RowSwipeableGrid documents"""
  deleteManyRowSwipeableGrids(
    """Documents to delete"""
    where: RowSwipeableGridManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowSwipeableGridsConnection)")
  """Publish many RowSwipeableGrid documents"""
  publishManyRowSwipeableGrids(
    """Identifies documents in each stage to be published"""
    where: RowSwipeableGridManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowSwipeableGridsConnection)")
  """Unpublish many RowSwipeableGrid documents"""
  unpublishManyRowSwipeableGrids(
    """Identifies documents in each stage"""
    where: RowSwipeableGridManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowSwipeableGridsConnection)")
  """Create one pageLink"""
  createPageLink(data: PageLinkCreateInput!): PageLink
  """Update one pageLink"""
  updatePageLink(where: PageLinkWhereUniqueInput!, data: PageLinkUpdateInput!): PageLink
  """Delete one pageLink from _all_ existing stages. Returns deleted document."""
  deletePageLink(
    """Document to delete"""
    where: PageLinkWhereUniqueInput!
  ): PageLink
  """Upsert one pageLink"""
  upsertPageLink(where: PageLinkWhereUniqueInput!, upsert: PageLinkUpsertInput!): PageLink
  """Publish one pageLink"""
  publishPageLink(
    """Document to publish"""
    where: PageLinkWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): PageLink
  """Unpublish one pageLink from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishPageLink(
    """Document to unpublish"""
    where: PageLinkWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): PageLink
  """Update many PageLink documents"""
  updateManyPageLinksConnection(
    """Documents to apply update on"""
    where: PageLinkManyWhereInput
    """Updates to document content"""
    data: PageLinkUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): PageLinkConnection!
  """Delete many PageLink documents, return deleted documents"""
  deleteManyPageLinksConnection(
    """Documents to delete"""
    where: PageLinkManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): PageLinkConnection!
  """Publish many PageLink documents"""
  publishManyPageLinksConnection(
    """Identifies documents in each stage to be published"""
    where: PageLinkManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): PageLinkConnection!
  """Find many PageLink documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyPageLinksConnection(
    """Identifies documents in draft stage"""
    where: PageLinkManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): PageLinkConnection!
  """Update many pageLinks"""
  updateManyPageLinks(
    """Documents to apply update on"""
    where: PageLinkManyWhereInput
    """Updates to document content"""
    data: PageLinkUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyPageLinksConnection)")
  """Delete many PageLink documents"""
  deleteManyPageLinks(
    """Documents to delete"""
    where: PageLinkManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyPageLinksConnection)")
  """Publish many PageLink documents"""
  publishManyPageLinks(
    """Identifies documents in each stage to be published"""
    where: PageLinkManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyPageLinksConnection)")
  """Unpublish many PageLink documents"""
  unpublishManyPageLinks(
    """Identifies documents in each stage"""
    where: PageLinkManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyPageLinksConnection)")
  """Create one magentoCategory"""
  createMagentoCategory(data: MagentoCategoryCreateInput!): MagentoCategory
  """Update one magentoCategory"""
  updateMagentoCategory(where: MagentoCategoryWhereUniqueInput!, data: MagentoCategoryUpdateInput!): MagentoCategory
  """Delete one magentoCategory from _all_ existing stages. Returns deleted document."""
  deleteMagentoCategory(
    """Document to delete"""
    where: MagentoCategoryWhereUniqueInput!
  ): MagentoCategory
  """Upsert one magentoCategory"""
  upsertMagentoCategory(where: MagentoCategoryWhereUniqueInput!, upsert: MagentoCategoryUpsertInput!): MagentoCategory
  """Publish one magentoCategory"""
  publishMagentoCategory(
    """Document to publish"""
    where: MagentoCategoryWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): MagentoCategory
  """Unpublish one magentoCategory from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishMagentoCategory(
    """Document to unpublish"""
    where: MagentoCategoryWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): MagentoCategory
  """Update many MagentoCategory documents"""
  updateManyMagentoCategoriesConnection(
    """Documents to apply update on"""
    where: MagentoCategoryManyWhereInput
    """Updates to document content"""
    data: MagentoCategoryUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): MagentoCategoryConnection!
  """Delete many MagentoCategory documents, return deleted documents"""
  deleteManyMagentoCategoriesConnection(
    """Documents to delete"""
    where: MagentoCategoryManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): MagentoCategoryConnection!
  """Publish many MagentoCategory documents"""
  publishManyMagentoCategoriesConnection(
    """Identifies documents in each stage to be published"""
    where: MagentoCategoryManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): MagentoCategoryConnection!
  """Find many MagentoCategory documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyMagentoCategoriesConnection(
    """Identifies documents in draft stage"""
    where: MagentoCategoryManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): MagentoCategoryConnection!
  """Update many magentoCategories"""
  updateManyMagentoCategories(
    """Documents to apply update on"""
    where: MagentoCategoryManyWhereInput
    """Updates to document content"""
    data: MagentoCategoryUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyMagentoCategoriesConnection)")
  """Delete many MagentoCategory documents"""
  deleteManyMagentoCategories(
    """Documents to delete"""
    where: MagentoCategoryManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyMagentoCategoriesConnection)")
  """Publish many MagentoCategory documents"""
  publishManyMagentoCategories(
    """Identifies documents in each stage to be published"""
    where: MagentoCategoryManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyMagentoCategoriesConnection)")
  """Unpublish many MagentoCategory documents"""
  unpublishManyMagentoCategories(
    """Identifies documents in each stage"""
    where: MagentoCategoryManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyMagentoCategoriesConnection)")
  """Create one rowProductRelated"""
  createRowProductRelated(data: RowProductRelatedCreateInput!): RowProductRelated
  """Update one rowProductRelated"""
  updateRowProductRelated(where: RowProductRelatedWhereUniqueInput!, data: RowProductRelatedUpdateInput!): RowProductRelated
  """Delete one rowProductRelated from _all_ existing stages. Returns deleted document."""
  deleteRowProductRelated(
    """Document to delete"""
    where: RowProductRelatedWhereUniqueInput!
  ): RowProductRelated
  """Upsert one rowProductRelated"""
  upsertRowProductRelated(where: RowProductRelatedWhereUniqueInput!, upsert: RowProductRelatedUpsertInput!): RowProductRelated
  """Publish one rowProductRelated"""
  publishRowProductRelated(
    """Document to publish"""
    where: RowProductRelatedWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductRelated
  """Unpublish one rowProductRelated from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductRelated(
    """Document to unpublish"""
    where: RowProductRelatedWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductRelated
  """Update many RowProductRelated documents"""
  updateManyRowProductRelatedsConnection(
    """Documents to apply update on"""
    where: RowProductRelatedManyWhereInput
    """Updates to document content"""
    data: RowProductRelatedUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductRelatedConnection!
  """Delete many RowProductRelated documents, return deleted documents"""
  deleteManyRowProductRelatedsConnection(
    """Documents to delete"""
    where: RowProductRelatedManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductRelatedConnection!
  """Publish many RowProductRelated documents"""
  publishManyRowProductRelatedsConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductRelatedManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductRelatedConnection!
  """Find many RowProductRelated documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductRelatedsConnection(
    """Identifies documents in draft stage"""
    where: RowProductRelatedManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductRelatedConnection!
  """Update many rowProductRelateds"""
  updateManyRowProductRelateds(
    """Documents to apply update on"""
    where: RowProductRelatedManyWhereInput
    """Updates to document content"""
    data: RowProductRelatedUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductRelatedsConnection)")
  """Delete many RowProductRelated documents"""
  deleteManyRowProductRelateds(
    """Documents to delete"""
    where: RowProductRelatedManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductRelatedsConnection)")
  """Publish many RowProductRelated documents"""
  publishManyRowProductRelateds(
    """Identifies documents in each stage to be published"""
    where: RowProductRelatedManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductRelatedsConnection)")
  """Unpublish many RowProductRelated documents"""
  unpublishManyRowProductRelateds(
    """Identifies documents in each stage"""
    where: RowProductRelatedManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductRelatedsConnection)")
  """Create one rowProductGrid"""
  createRowProductGrid(data: RowProductGridCreateInput!): RowProductGrid
  """Update one rowProductGrid"""
  updateRowProductGrid(where: RowProductGridWhereUniqueInput!, data: RowProductGridUpdateInput!): RowProductGrid
  """Delete one rowProductGrid from _all_ existing stages. Returns deleted document."""
  deleteRowProductGrid(
    """Document to delete"""
    where: RowProductGridWhereUniqueInput!
  ): RowProductGrid
  """Upsert one rowProductGrid"""
  upsertRowProductGrid(where: RowProductGridWhereUniqueInput!, upsert: RowProductGridUpsertInput!): RowProductGrid
  """Publish one rowProductGrid"""
  publishRowProductGrid(
    """Document to publish"""
    where: RowProductGridWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductGrid
  """Unpublish one rowProductGrid from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductGrid(
    """Document to unpublish"""
    where: RowProductGridWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductGrid
  """Update many RowProductGrid documents"""
  updateManyRowProductGridsConnection(
    """Documents to apply update on"""
    where: RowProductGridManyWhereInput
    """Updates to document content"""
    data: RowProductGridUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductGridConnection!
  """Delete many RowProductGrid documents, return deleted documents"""
  deleteManyRowProductGridsConnection(
    """Documents to delete"""
    where: RowProductGridManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductGridConnection!
  """Publish many RowProductGrid documents"""
  publishManyRowProductGridsConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductGridManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductGridConnection!
  """Find many RowProductGrid documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductGridsConnection(
    """Identifies documents in draft stage"""
    where: RowProductGridManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductGridConnection!
  """Update many rowProductGrids"""
  updateManyRowProductGrids(
    """Documents to apply update on"""
    where: RowProductGridManyWhereInput
    """Updates to document content"""
    data: RowProductGridUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductGridsConnection)")
  """Delete many RowProductGrid documents"""
  deleteManyRowProductGrids(
    """Documents to delete"""
    where: RowProductGridManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductGridsConnection)")
  """Publish many RowProductGrid documents"""
  publishManyRowProductGrids(
    """Identifies documents in each stage to be published"""
    where: RowProductGridManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductGridsConnection)")
  """Unpublish many RowProductGrid documents"""
  unpublishManyRowProductGrids(
    """Identifies documents in each stage"""
    where: RowProductGridManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductGridsConnection)")
  """Create one rowProductReviews"""
  createRowProductReviews(data: RowProductReviewsCreateInput!): RowProductReviews
  """Update one rowProductReviews"""
  updateRowProductReviews(where: RowProductReviewsWhereUniqueInput!, data: RowProductReviewsUpdateInput!): RowProductReviews
  """Delete one rowProductReviews from _all_ existing stages. Returns deleted document."""
  deleteRowProductReviews(
    """Document to delete"""
    where: RowProductReviewsWhereUniqueInput!
  ): RowProductReviews
  """Upsert one rowProductReviews"""
  upsertRowProductReviews(where: RowProductReviewsWhereUniqueInput!, upsert: RowProductReviewsUpsertInput!): RowProductReviews
  """Publish one rowProductReviews"""
  publishRowProductReviews(
    """Document to publish"""
    where: RowProductReviewsWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductReviews
  """Unpublish one rowProductReviews from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductReviews(
    """Document to unpublish"""
    where: RowProductReviewsWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductReviews
  """Update many RowProductReviews documents"""
  updateManyRowProductReviewsMultipleConnection(
    """Documents to apply update on"""
    where: RowProductReviewsManyWhereInput
    """Updates to document content"""
    data: RowProductReviewsUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductReviewsConnection!
  """Delete many RowProductReviews documents, return deleted documents"""
  deleteManyRowProductReviewsMultipleConnection(
    """Documents to delete"""
    where: RowProductReviewsManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductReviewsConnection!
  """Publish many RowProductReviews documents"""
  publishManyRowProductReviewsMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductReviewsManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductReviewsConnection!
  """Find many RowProductReviews documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductReviewsMultipleConnection(
    """Identifies documents in draft stage"""
    where: RowProductReviewsManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductReviewsConnection!
  """Update many rowProductReviewsMultiple"""
  updateManyRowProductReviewsMultiple(
    """Documents to apply update on"""
    where: RowProductReviewsManyWhereInput
    """Updates to document content"""
    data: RowProductReviewsUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductReviewsMultipleConnection)")
  """Delete many RowProductReviews documents"""
  deleteManyRowProductReviewsMultiple(
    """Documents to delete"""
    where: RowProductReviewsManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductReviewsMultipleConnection)")
  """Publish many RowProductReviews documents"""
  publishManyRowProductReviewsMultiple(
    """Identifies documents in each stage to be published"""
    where: RowProductReviewsManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductReviewsMultipleConnection)")
  """Unpublish many RowProductReviews documents"""
  unpublishManyRowProductReviewsMultiple(
    """Identifies documents in each stage"""
    where: RowProductReviewsManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductReviewsMultipleConnection)")
  """Create one footer"""
  createFooter(data: FooterCreateInput!): Footer
  """Update one footer"""
  updateFooter(where: FooterWhereUniqueInput!, data: FooterUpdateInput!): Footer
  """Delete one footer from _all_ existing stages. Returns deleted document."""
  deleteFooter(
    """Document to delete"""
    where: FooterWhereUniqueInput!
  ): Footer
  """Upsert one footer"""
  upsertFooter(where: FooterWhereUniqueInput!, upsert: FooterUpsertInput!): Footer
  """Publish one footer"""
  publishFooter(
    """Document to publish"""
    where: FooterWhereUniqueInput!
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): Footer
  """Unpublish one footer from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishFooter(
    """Document to unpublish"""
    where: FooterWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
  ): Footer
  """Update many Footer documents"""
  updateManyFootersConnection(
    """Documents to apply update on"""
    where: FooterManyWhereInput
    """Updates to document content"""
    data: FooterUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): FooterConnection!
  """Delete many Footer documents, return deleted documents"""
  deleteManyFootersConnection(
    """Documents to delete"""
    where: FooterManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): FooterConnection!
  """Publish many Footer documents"""
  publishManyFootersConnection(
    """Identifies documents in each stage to be published"""
    where: FooterManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): FooterConnection!
  """Find many Footer documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyFootersConnection(
    """Identifies documents in draft stage"""
    where: FooterManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): FooterConnection!
  """Update many footers"""
  updateManyFooters(
    """Documents to apply update on"""
    where: FooterManyWhereInput
    """Updates to document content"""
    data: FooterUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyFootersConnection)")
  """Delete many Footer documents"""
  deleteManyFooters(
    """Documents to delete"""
    where: FooterManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyFootersConnection)")
  """Publish many Footer documents"""
  publishManyFooters(
    """Identifies documents in each stage to be published"""
    where: FooterManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyFootersConnection)")
  """Unpublish many Footer documents"""
  unpublishManyFooters(
    """Identifies documents in each stage"""
    where: FooterManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyFootersConnection)")
  """Create one rowProductBackstory"""
  createRowProductBackstory(data: RowProductBackstoryCreateInput!): RowProductBackstory
  """Update one rowProductBackstory"""
  updateRowProductBackstory(where: RowProductBackstoryWhereUniqueInput!, data: RowProductBackstoryUpdateInput!): RowProductBackstory
  """Delete one rowProductBackstory from _all_ existing stages. Returns deleted document."""
  deleteRowProductBackstory(
    """Document to delete"""
    where: RowProductBackstoryWhereUniqueInput!
  ): RowProductBackstory
  """Upsert one rowProductBackstory"""
  upsertRowProductBackstory(where: RowProductBackstoryWhereUniqueInput!, upsert: RowProductBackstoryUpsertInput!): RowProductBackstory
  """Publish one rowProductBackstory"""
  publishRowProductBackstory(
    """Document to publish"""
    where: RowProductBackstoryWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductBackstory
  """Unpublish one rowProductBackstory from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductBackstory(
    """Document to unpublish"""
    where: RowProductBackstoryWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductBackstory
  """Update many RowProductBackstory documents"""
  updateManyRowProductBackstoriesConnection(
    """Documents to apply update on"""
    where: RowProductBackstoryManyWhereInput
    """Updates to document content"""
    data: RowProductBackstoryUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductBackstoryConnection!
  """Delete many RowProductBackstory documents, return deleted documents"""
  deleteManyRowProductBackstoriesConnection(
    """Documents to delete"""
    where: RowProductBackstoryManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductBackstoryConnection!
  """Publish many RowProductBackstory documents"""
  publishManyRowProductBackstoriesConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductBackstoryManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductBackstoryConnection!
  """Find many RowProductBackstory documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductBackstoriesConnection(
    """Identifies documents in draft stage"""
    where: RowProductBackstoryManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductBackstoryConnection!
  """Update many rowProductBackstories"""
  updateManyRowProductBackstories(
    """Documents to apply update on"""
    where: RowProductBackstoryManyWhereInput
    """Updates to document content"""
    data: RowProductBackstoryUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductBackstoriesConnection)")
  """Delete many RowProductBackstory documents"""
  deleteManyRowProductBackstories(
    """Documents to delete"""
    where: RowProductBackstoryManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductBackstoriesConnection)")
  """Publish many RowProductBackstory documents"""
  publishManyRowProductBackstories(
    """Identifies documents in each stage to be published"""
    where: RowProductBackstoryManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductBackstoriesConnection)")
  """Unpublish many RowProductBackstory documents"""
  unpublishManyRowProductBackstories(
    """Identifies documents in each stage"""
    where: RowProductBackstoryManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductBackstoriesConnection)")
  """Create one rowButtonLinkList"""
  createRowButtonLinkList(data: RowButtonLinkListCreateInput!): RowButtonLinkList
  """Update one rowButtonLinkList"""
  updateRowButtonLinkList(where: RowButtonLinkListWhereUniqueInput!, data: RowButtonLinkListUpdateInput!): RowButtonLinkList
  """Delete one rowButtonLinkList from _all_ existing stages. Returns deleted document."""
  deleteRowButtonLinkList(
    """Document to delete"""
    where: RowButtonLinkListWhereUniqueInput!
  ): RowButtonLinkList
  """Upsert one rowButtonLinkList"""
  upsertRowButtonLinkList(where: RowButtonLinkListWhereUniqueInput!, upsert: RowButtonLinkListUpsertInput!): RowButtonLinkList
  """Publish one rowButtonLinkList"""
  publishRowButtonLinkList(
    """Document to publish"""
    where: RowButtonLinkListWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowButtonLinkList
  """Unpublish one rowButtonLinkList from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowButtonLinkList(
    """Document to unpublish"""
    where: RowButtonLinkListWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowButtonLinkList
  """Update many RowButtonLinkList documents"""
  updateManyRowButtonLinkListsConnection(
    """Documents to apply update on"""
    where: RowButtonLinkListManyWhereInput
    """Updates to document content"""
    data: RowButtonLinkListUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowButtonLinkListConnection!
  """Delete many RowButtonLinkList documents, return deleted documents"""
  deleteManyRowButtonLinkListsConnection(
    """Documents to delete"""
    where: RowButtonLinkListManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowButtonLinkListConnection!
  """Publish many RowButtonLinkList documents"""
  publishManyRowButtonLinkListsConnection(
    """Identifies documents in each stage to be published"""
    where: RowButtonLinkListManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowButtonLinkListConnection!
  """Find many RowButtonLinkList documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowButtonLinkListsConnection(
    """Identifies documents in draft stage"""
    where: RowButtonLinkListManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowButtonLinkListConnection!
  """Update many rowButtonLinkLists"""
  updateManyRowButtonLinkLists(
    """Documents to apply update on"""
    where: RowButtonLinkListManyWhereInput
    """Updates to document content"""
    data: RowButtonLinkListUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowButtonLinkListsConnection)")
  """Delete many RowButtonLinkList documents"""
  deleteManyRowButtonLinkLists(
    """Documents to delete"""
    where: RowButtonLinkListManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowButtonLinkListsConnection)")
  """Publish many RowButtonLinkList documents"""
  publishManyRowButtonLinkLists(
    """Identifies documents in each stage to be published"""
    where: RowButtonLinkListManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowButtonLinkListsConnection)")
  """Unpublish many RowButtonLinkList documents"""
  unpublishManyRowButtonLinkLists(
    """Identifies documents in each stage"""
    where: RowButtonLinkListManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowButtonLinkListsConnection)")
  """Create one rowProductFeatureBoxed"""
  createRowProductFeatureBoxed(data: RowProductFeatureBoxedCreateInput!): RowProductFeatureBoxed
  """Update one rowProductFeatureBoxed"""
  updateRowProductFeatureBoxed(where: RowProductFeatureBoxedWhereUniqueInput!, data: RowProductFeatureBoxedUpdateInput!): RowProductFeatureBoxed
  """Delete one rowProductFeatureBoxed from _all_ existing stages. Returns deleted document."""
  deleteRowProductFeatureBoxed(
    """Document to delete"""
    where: RowProductFeatureBoxedWhereUniqueInput!
  ): RowProductFeatureBoxed
  """Upsert one rowProductFeatureBoxed"""
  upsertRowProductFeatureBoxed(where: RowProductFeatureBoxedWhereUniqueInput!, upsert: RowProductFeatureBoxedUpsertInput!): RowProductFeatureBoxed
  """Publish one rowProductFeatureBoxed"""
  publishRowProductFeatureBoxed(
    """Document to publish"""
    where: RowProductFeatureBoxedWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductFeatureBoxed
  """Unpublish one rowProductFeatureBoxed from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductFeatureBoxed(
    """Document to unpublish"""
    where: RowProductFeatureBoxedWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductFeatureBoxed
  """Update many RowProductFeatureBoxed documents"""
  updateManyRowProductFeatureBoxedsConnection(
    """Documents to apply update on"""
    where: RowProductFeatureBoxedManyWhereInput
    """Updates to document content"""
    data: RowProductFeatureBoxedUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductFeatureBoxedConnection!
  """Delete many RowProductFeatureBoxed documents, return deleted documents"""
  deleteManyRowProductFeatureBoxedsConnection(
    """Documents to delete"""
    where: RowProductFeatureBoxedManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductFeatureBoxedConnection!
  """Publish many RowProductFeatureBoxed documents"""
  publishManyRowProductFeatureBoxedsConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductFeatureBoxedManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductFeatureBoxedConnection!
  """Find many RowProductFeatureBoxed documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductFeatureBoxedsConnection(
    """Identifies documents in draft stage"""
    where: RowProductFeatureBoxedManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductFeatureBoxedConnection!
  """Update many rowProductFeatureBoxeds"""
  updateManyRowProductFeatureBoxeds(
    """Documents to apply update on"""
    where: RowProductFeatureBoxedManyWhereInput
    """Updates to document content"""
    data: RowProductFeatureBoxedUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductFeatureBoxedsConnection)")
  """Delete many RowProductFeatureBoxed documents"""
  deleteManyRowProductFeatureBoxeds(
    """Documents to delete"""
    where: RowProductFeatureBoxedManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductFeatureBoxedsConnection)")
  """Publish many RowProductFeatureBoxed documents"""
  publishManyRowProductFeatureBoxeds(
    """Identifies documents in each stage to be published"""
    where: RowProductFeatureBoxedManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductFeatureBoxedsConnection)")
  """Unpublish many RowProductFeatureBoxed documents"""
  unpublishManyRowProductFeatureBoxeds(
    """Identifies documents in each stage"""
    where: RowProductFeatureBoxedManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductFeatureBoxedsConnection)")
  """Create one rowProductUpsells"""
  createRowProductUpsells(data: RowProductUpsellsCreateInput!): RowProductUpsells
  """Update one rowProductUpsells"""
  updateRowProductUpsells(where: RowProductUpsellsWhereUniqueInput!, data: RowProductUpsellsUpdateInput!): RowProductUpsells
  """Delete one rowProductUpsells from _all_ existing stages. Returns deleted document."""
  deleteRowProductUpsells(
    """Document to delete"""
    where: RowProductUpsellsWhereUniqueInput!
  ): RowProductUpsells
  """Upsert one rowProductUpsells"""
  upsertRowProductUpsells(where: RowProductUpsellsWhereUniqueInput!, upsert: RowProductUpsellsUpsertInput!): RowProductUpsells
  """Publish one rowProductUpsells"""
  publishRowProductUpsells(
    """Document to publish"""
    where: RowProductUpsellsWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductUpsells
  """Unpublish one rowProductUpsells from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductUpsells(
    """Document to unpublish"""
    where: RowProductUpsellsWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductUpsells
  """Update many RowProductUpsells documents"""
  updateManyRowProductUpsellsMultipleConnection(
    """Documents to apply update on"""
    where: RowProductUpsellsManyWhereInput
    """Updates to document content"""
    data: RowProductUpsellsUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductUpsellsConnection!
  """Delete many RowProductUpsells documents, return deleted documents"""
  deleteManyRowProductUpsellsMultipleConnection(
    """Documents to delete"""
    where: RowProductUpsellsManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductUpsellsConnection!
  """Publish many RowProductUpsells documents"""
  publishManyRowProductUpsellsMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductUpsellsManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductUpsellsConnection!
  """Find many RowProductUpsells documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductUpsellsMultipleConnection(
    """Identifies documents in draft stage"""
    where: RowProductUpsellsManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductUpsellsConnection!
  """Update many rowProductUpsellsMultiple"""
  updateManyRowProductUpsellsMultiple(
    """Documents to apply update on"""
    where: RowProductUpsellsManyWhereInput
    """Updates to document content"""
    data: RowProductUpsellsUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductUpsellsMultipleConnection)")
  """Delete many RowProductUpsells documents"""
  deleteManyRowProductUpsellsMultiple(
    """Documents to delete"""
    where: RowProductUpsellsManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductUpsellsMultipleConnection)")
  """Publish many RowProductUpsells documents"""
  publishManyRowProductUpsellsMultiple(
    """Identifies documents in each stage to be published"""
    where: RowProductUpsellsManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductUpsellsMultipleConnection)")
  """Unpublish many RowProductUpsells documents"""
  unpublishManyRowProductUpsellsMultiple(
    """Identifies documents in each stage"""
    where: RowProductUpsellsManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductUpsellsMultipleConnection)")
  """Create one rowQuote"""
  createRowQuote(data: RowQuoteCreateInput!): RowQuote
  """Update one rowQuote"""
  updateRowQuote(where: RowQuoteWhereUniqueInput!, data: RowQuoteUpdateInput!): RowQuote
  """Delete one rowQuote from _all_ existing stages. Returns deleted document."""
  deleteRowQuote(
    """Document to delete"""
    where: RowQuoteWhereUniqueInput!
  ): RowQuote
  """Upsert one rowQuote"""
  upsertRowQuote(where: RowQuoteWhereUniqueInput!, upsert: RowQuoteUpsertInput!): RowQuote
  """Publish one rowQuote"""
  publishRowQuote(
    """Document to publish"""
    where: RowQuoteWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowQuote
  """Unpublish one rowQuote from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowQuote(
    """Document to unpublish"""
    where: RowQuoteWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowQuote
  """Update many RowQuote documents"""
  updateManyRowQuotesConnection(
    """Documents to apply update on"""
    where: RowQuoteManyWhereInput
    """Updates to document content"""
    data: RowQuoteUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowQuoteConnection!
  """Delete many RowQuote documents, return deleted documents"""
  deleteManyRowQuotesConnection(
    """Documents to delete"""
    where: RowQuoteManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowQuoteConnection!
  """Publish many RowQuote documents"""
  publishManyRowQuotesConnection(
    """Identifies documents in each stage to be published"""
    where: RowQuoteManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowQuoteConnection!
  """Find many RowQuote documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowQuotesConnection(
    """Identifies documents in draft stage"""
    where: RowQuoteManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowQuoteConnection!
  """Update many rowQuotes"""
  updateManyRowQuotes(
    """Documents to apply update on"""
    where: RowQuoteManyWhereInput
    """Updates to document content"""
    data: RowQuoteUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowQuotesConnection)")
  """Delete many RowQuote documents"""
  deleteManyRowQuotes(
    """Documents to delete"""
    where: RowQuoteManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowQuotesConnection)")
  """Publish many RowQuote documents"""
  publishManyRowQuotes(
    """Identifies documents in each stage to be published"""
    where: RowQuoteManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowQuotesConnection)")
  """Unpublish many RowQuote documents"""
  unpublishManyRowQuotes(
    """Identifies documents in each stage"""
    where: RowQuoteManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowQuotesConnection)")
  """Create one rowProductSpecs"""
  createRowProductSpecs(data: RowProductSpecsCreateInput!): RowProductSpecs
  """Update one rowProductSpecs"""
  updateRowProductSpecs(where: RowProductSpecsWhereUniqueInput!, data: RowProductSpecsUpdateInput!): RowProductSpecs
  """Delete one rowProductSpecs from _all_ existing stages. Returns deleted document."""
  deleteRowProductSpecs(
    """Document to delete"""
    where: RowProductSpecsWhereUniqueInput!
  ): RowProductSpecs
  """Upsert one rowProductSpecs"""
  upsertRowProductSpecs(where: RowProductSpecsWhereUniqueInput!, upsert: RowProductSpecsUpsertInput!): RowProductSpecs
  """Publish one rowProductSpecs"""
  publishRowProductSpecs(
    """Document to publish"""
    where: RowProductSpecsWhereUniqueInput!
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductSpecs
  """Unpublish one rowProductSpecs from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductSpecs(
    """Document to unpublish"""
    where: RowProductSpecsWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
  ): RowProductSpecs
  """Update many RowProductSpecs documents"""
  updateManyRowProductSpecsMultipleConnection(
    """Documents to apply update on"""
    where: RowProductSpecsManyWhereInput
    """Updates to document content"""
    data: RowProductSpecsUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductSpecsConnection!
  """Delete many RowProductSpecs documents, return deleted documents"""
  deleteManyRowProductSpecsMultipleConnection(
    """Documents to delete"""
    where: RowProductSpecsManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductSpecsConnection!
  """Publish many RowProductSpecs documents"""
  publishManyRowProductSpecsMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductSpecsManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductSpecsConnection!
  """Find many RowProductSpecs documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductSpecsMultipleConnection(
    """Identifies documents in draft stage"""
    where: RowProductSpecsManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductSpecsConnection!
  """Update many rowProductSpecsMultiple"""
  updateManyRowProductSpecsMultiple(
    """Documents to apply update on"""
    where: RowProductSpecsManyWhereInput
    """Updates to document content"""
    data: RowProductSpecsUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductSpecsMultipleConnection)")
  """Delete many RowProductSpecs documents"""
  deleteManyRowProductSpecsMultiple(
    """Documents to delete"""
    where: RowProductSpecsManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductSpecsMultipleConnection)")
  """Publish many RowProductSpecs documents"""
  publishManyRowProductSpecsMultiple(
    """Identifies documents in each stage to be published"""
    where: RowProductSpecsManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductSpecsMultipleConnection)")
  """Unpublish many RowProductSpecs documents"""
  unpublishManyRowProductSpecsMultiple(
    """Identifies documents in each stage"""
    where: RowProductSpecsManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductSpecsMultipleConnection)")
  """Create one rowBlogContent"""
  createRowBlogContent(data: RowBlogContentCreateInput!): RowBlogContent
  """Update one rowBlogContent"""
  updateRowBlogContent(where: RowBlogContentWhereUniqueInput!, data: RowBlogContentUpdateInput!): RowBlogContent
  """Delete one rowBlogContent from _all_ existing stages. Returns deleted document."""
  deleteRowBlogContent(
    """Document to delete"""
    where: RowBlogContentWhereUniqueInput!
  ): RowBlogContent
  """Upsert one rowBlogContent"""
  upsertRowBlogContent(where: RowBlogContentWhereUniqueInput!, upsert: RowBlogContentUpsertInput!): RowBlogContent
  """Publish one rowBlogContent"""
  publishRowBlogContent(
    """Document to publish"""
    where: RowBlogContentWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowBlogContent
  """Unpublish one rowBlogContent from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowBlogContent(
    """Document to unpublish"""
    where: RowBlogContentWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowBlogContent
  """Update many RowBlogContent documents"""
  updateManyRowBlogContentsConnection(
    """Documents to apply update on"""
    where: RowBlogContentManyWhereInput
    """Updates to document content"""
    data: RowBlogContentUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowBlogContentConnection!
  """Delete many RowBlogContent documents, return deleted documents"""
  deleteManyRowBlogContentsConnection(
    """Documents to delete"""
    where: RowBlogContentManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowBlogContentConnection!
  """Publish many RowBlogContent documents"""
  publishManyRowBlogContentsConnection(
    """Identifies documents in each stage to be published"""
    where: RowBlogContentManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowBlogContentConnection!
  """Find many RowBlogContent documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowBlogContentsConnection(
    """Identifies documents in draft stage"""
    where: RowBlogContentManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowBlogContentConnection!
  """Update many rowBlogContents"""
  updateManyRowBlogContents(
    """Documents to apply update on"""
    where: RowBlogContentManyWhereInput
    """Updates to document content"""
    data: RowBlogContentUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowBlogContentsConnection)")
  """Delete many RowBlogContent documents"""
  deleteManyRowBlogContents(
    """Documents to delete"""
    where: RowBlogContentManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowBlogContentsConnection)")
  """Publish many RowBlogContent documents"""
  publishManyRowBlogContents(
    """Identifies documents in each stage to be published"""
    where: RowBlogContentManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowBlogContentsConnection)")
  """Unpublish many RowBlogContent documents"""
  unpublishManyRowBlogContents(
    """Identifies documents in each stage"""
    where: RowBlogContentManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowBlogContentsConnection)")
  """Create one rowSpecialBanner"""
  createRowSpecialBanner(data: RowSpecialBannerCreateInput!): RowSpecialBanner
  """Update one rowSpecialBanner"""
  updateRowSpecialBanner(where: RowSpecialBannerWhereUniqueInput!, data: RowSpecialBannerUpdateInput!): RowSpecialBanner
  """Delete one rowSpecialBanner from _all_ existing stages. Returns deleted document."""
  deleteRowSpecialBanner(
    """Document to delete"""
    where: RowSpecialBannerWhereUniqueInput!
  ): RowSpecialBanner
  """Upsert one rowSpecialBanner"""
  upsertRowSpecialBanner(where: RowSpecialBannerWhereUniqueInput!, upsert: RowSpecialBannerUpsertInput!): RowSpecialBanner
  """Publish one rowSpecialBanner"""
  publishRowSpecialBanner(
    """Document to publish"""
    where: RowSpecialBannerWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowSpecialBanner
  """Unpublish one rowSpecialBanner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowSpecialBanner(
    """Document to unpublish"""
    where: RowSpecialBannerWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowSpecialBanner
  """Update many RowSpecialBanner documents"""
  updateManyRowSpecialBannersConnection(
    """Documents to apply update on"""
    where: RowSpecialBannerManyWhereInput
    """Updates to document content"""
    data: RowSpecialBannerUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowSpecialBannerConnection!
  """Delete many RowSpecialBanner documents, return deleted documents"""
  deleteManyRowSpecialBannersConnection(
    """Documents to delete"""
    where: RowSpecialBannerManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowSpecialBannerConnection!
  """Publish many RowSpecialBanner documents"""
  publishManyRowSpecialBannersConnection(
    """Identifies documents in each stage to be published"""
    where: RowSpecialBannerManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowSpecialBannerConnection!
  """Find many RowSpecialBanner documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowSpecialBannersConnection(
    """Identifies documents in draft stage"""
    where: RowSpecialBannerManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowSpecialBannerConnection!
  """Update many rowSpecialBanners"""
  updateManyRowSpecialBanners(
    """Documents to apply update on"""
    where: RowSpecialBannerManyWhereInput
    """Updates to document content"""
    data: RowSpecialBannerUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowSpecialBannersConnection)")
  """Delete many RowSpecialBanner documents"""
  deleteManyRowSpecialBanners(
    """Documents to delete"""
    where: RowSpecialBannerManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowSpecialBannersConnection)")
  """Publish many RowSpecialBanner documents"""
  publishManyRowSpecialBanners(
    """Identifies documents in each stage to be published"""
    where: RowSpecialBannerManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowSpecialBannersConnection)")
  """Unpublish many RowSpecialBanner documents"""
  unpublishManyRowSpecialBanners(
    """Identifies documents in each stage"""
    where: RowSpecialBannerManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowSpecialBannersConnection)")
  """Create one rowProductFeature"""
  createRowProductFeature(data: RowProductFeatureCreateInput!): RowProductFeature
  """Update one rowProductFeature"""
  updateRowProductFeature(where: RowProductFeatureWhereUniqueInput!, data: RowProductFeatureUpdateInput!): RowProductFeature
  """Delete one rowProductFeature from _all_ existing stages. Returns deleted document."""
  deleteRowProductFeature(
    """Document to delete"""
    where: RowProductFeatureWhereUniqueInput!
  ): RowProductFeature
  """Upsert one rowProductFeature"""
  upsertRowProductFeature(where: RowProductFeatureWhereUniqueInput!, upsert: RowProductFeatureUpsertInput!): RowProductFeature
  """Publish one rowProductFeature"""
  publishRowProductFeature(
    """Document to publish"""
    where: RowProductFeatureWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowProductFeature
  """Unpublish one rowProductFeature from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowProductFeature(
    """Document to unpublish"""
    where: RowProductFeatureWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowProductFeature
  """Update many RowProductFeature documents"""
  updateManyRowProductFeaturesConnection(
    """Documents to apply update on"""
    where: RowProductFeatureManyWhereInput
    """Updates to document content"""
    data: RowProductFeatureUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductFeatureConnection!
  """Delete many RowProductFeature documents, return deleted documents"""
  deleteManyRowProductFeaturesConnection(
    """Documents to delete"""
    where: RowProductFeatureManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowProductFeatureConnection!
  """Publish many RowProductFeature documents"""
  publishManyRowProductFeaturesConnection(
    """Identifies documents in each stage to be published"""
    where: RowProductFeatureManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowProductFeatureConnection!
  """Find many RowProductFeature documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowProductFeaturesConnection(
    """Identifies documents in draft stage"""
    where: RowProductFeatureManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowProductFeatureConnection!
  """Update many rowProductFeatures"""
  updateManyRowProductFeatures(
    """Documents to apply update on"""
    where: RowProductFeatureManyWhereInput
    """Updates to document content"""
    data: RowProductFeatureUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowProductFeaturesConnection)")
  """Delete many RowProductFeature documents"""
  deleteManyRowProductFeatures(
    """Documents to delete"""
    where: RowProductFeatureManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowProductFeaturesConnection)")
  """Publish many RowProductFeature documents"""
  publishManyRowProductFeatures(
    """Identifies documents in each stage to be published"""
    where: RowProductFeatureManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowProductFeaturesConnection)")
  """Unpublish many RowProductFeature documents"""
  unpublishManyRowProductFeatures(
    """Identifies documents in each stage"""
    where: RowProductFeatureManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowProductFeaturesConnection)")
  """Create one usps"""
  createUsps(data: UspsCreateInput!): Usps
  """Update one usps"""
  updateUsps(where: UspsWhereUniqueInput!, data: UspsUpdateInput!): Usps
  """Delete one usps from _all_ existing stages. Returns deleted document."""
  deleteUsps(
    """Document to delete"""
    where: UspsWhereUniqueInput!
  ): Usps
  """Upsert one usps"""
  upsertUsps(where: UspsWhereUniqueInput!, upsert: UspsUpsertInput!): Usps
  """Publish one usps"""
  publishUsps(
    """Document to publish"""
    where: UspsWhereUniqueInput!
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): Usps
  """Unpublish one usps from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishUsps(
    """Document to unpublish"""
    where: UspsWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
  ): Usps
  """Update many Usps documents"""
  updateManyUspsMultipleConnection(
    """Documents to apply update on"""
    where: UspsManyWhereInput
    """Updates to document content"""
    data: UspsUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): UspsConnection!
  """Delete many Usps documents, return deleted documents"""
  deleteManyUspsMultipleConnection(
    """Documents to delete"""
    where: UspsManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): UspsConnection!
  """Publish many Usps documents"""
  publishManyUspsMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: UspsManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): UspsConnection!
  """Find many Usps documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyUspsMultipleConnection(
    """Identifies documents in draft stage"""
    where: UspsManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): UspsConnection!
  """Update many uspsMultiple"""
  updateManyUspsMultiple(
    """Documents to apply update on"""
    where: UspsManyWhereInput
    """Updates to document content"""
    data: UspsUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyUspsMultipleConnection)")
  """Delete many Usps documents"""
  deleteManyUspsMultiple(
    """Documents to delete"""
    where: UspsManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyUspsMultipleConnection)")
  """Publish many Usps documents"""
  publishManyUspsMultiple(
    """Identifies documents in each stage to be published"""
    where: UspsManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyUspsMultipleConnection)")
  """Unpublish many Usps documents"""
  unpublishManyUspsMultiple(
    """Identifies documents in each stage"""
    where: UspsManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyUspsMultipleConnection)")
  """Create one rowContentLinks"""
  createRowContentLinks(data: RowContentLinksCreateInput!): RowContentLinks
  """Update one rowContentLinks"""
  updateRowContentLinks(where: RowContentLinksWhereUniqueInput!, data: RowContentLinksUpdateInput!): RowContentLinks
  """Delete one rowContentLinks from _all_ existing stages. Returns deleted document."""
  deleteRowContentLinks(
    """Document to delete"""
    where: RowContentLinksWhereUniqueInput!
  ): RowContentLinks
  """Upsert one rowContentLinks"""
  upsertRowContentLinks(where: RowContentLinksWhereUniqueInput!, upsert: RowContentLinksUpsertInput!): RowContentLinks
  """Publish one rowContentLinks"""
  publishRowContentLinks(
    """Document to publish"""
    where: RowContentLinksWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowContentLinks
  """Unpublish one rowContentLinks from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowContentLinks(
    """Document to unpublish"""
    where: RowContentLinksWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowContentLinks
  """Update many RowContentLinks documents"""
  updateManyRowContentLinksMultipleConnection(
    """Documents to apply update on"""
    where: RowContentLinksManyWhereInput
    """Updates to document content"""
    data: RowContentLinksUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowContentLinksConnection!
  """Delete many RowContentLinks documents, return deleted documents"""
  deleteManyRowContentLinksMultipleConnection(
    """Documents to delete"""
    where: RowContentLinksManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowContentLinksConnection!
  """Publish many RowContentLinks documents"""
  publishManyRowContentLinksMultipleConnection(
    """Identifies documents in each stage to be published"""
    where: RowContentLinksManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowContentLinksConnection!
  """Find many RowContentLinks documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowContentLinksMultipleConnection(
    """Identifies documents in draft stage"""
    where: RowContentLinksManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowContentLinksConnection!
  """Update many rowContentLinksMultiple"""
  updateManyRowContentLinksMultiple(
    """Documents to apply update on"""
    where: RowContentLinksManyWhereInput
    """Updates to document content"""
    data: RowContentLinksUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowContentLinksMultipleConnection)")
  """Delete many RowContentLinks documents"""
  deleteManyRowContentLinksMultiple(
    """Documents to delete"""
    where: RowContentLinksManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowContentLinksMultipleConnection)")
  """Publish many RowContentLinks documents"""
  publishManyRowContentLinksMultiple(
    """Identifies documents in each stage to be published"""
    where: RowContentLinksManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowContentLinksMultipleConnection)")
  """Unpublish many RowContentLinks documents"""
  unpublishManyRowContentLinksMultiple(
    """Identifies documents in each stage"""
    where: RowContentLinksManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowContentLinksMultipleConnection)")
  """Create one rowColumnOne"""
  createRowColumnOne(data: RowColumnOneCreateInput!): RowColumnOne
  """Update one rowColumnOne"""
  updateRowColumnOne(where: RowColumnOneWhereUniqueInput!, data: RowColumnOneUpdateInput!): RowColumnOne
  """Delete one rowColumnOne from _all_ existing stages. Returns deleted document."""
  deleteRowColumnOne(
    """Document to delete"""
    where: RowColumnOneWhereUniqueInput!
  ): RowColumnOne
  """Upsert one rowColumnOne"""
  upsertRowColumnOne(where: RowColumnOneWhereUniqueInput!, upsert: RowColumnOneUpsertInput!): RowColumnOne
  """Publish one rowColumnOne"""
  publishRowColumnOne(
    """Document to publish"""
    where: RowColumnOneWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowColumnOne
  """Unpublish one rowColumnOne from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowColumnOne(
    """Document to unpublish"""
    where: RowColumnOneWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowColumnOne
  """Update many RowColumnOne documents"""
  updateManyRowColumnOnesConnection(
    """Documents to apply update on"""
    where: RowColumnOneManyWhereInput
    """Updates to document content"""
    data: RowColumnOneUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnOneConnection!
  """Delete many RowColumnOne documents, return deleted documents"""
  deleteManyRowColumnOnesConnection(
    """Documents to delete"""
    where: RowColumnOneManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnOneConnection!
  """Publish many RowColumnOne documents"""
  publishManyRowColumnOnesConnection(
    """Identifies documents in each stage to be published"""
    where: RowColumnOneManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowColumnOneConnection!
  """Find many RowColumnOne documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowColumnOnesConnection(
    """Identifies documents in draft stage"""
    where: RowColumnOneManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowColumnOneConnection!
  """Update many rowColumnOnes"""
  updateManyRowColumnOnes(
    """Documents to apply update on"""
    where: RowColumnOneManyWhereInput
    """Updates to document content"""
    data: RowColumnOneUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowColumnOnesConnection)")
  """Delete many RowColumnOne documents"""
  deleteManyRowColumnOnes(
    """Documents to delete"""
    where: RowColumnOneManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowColumnOnesConnection)")
  """Publish many RowColumnOne documents"""
  publishManyRowColumnOnes(
    """Identifies documents in each stage to be published"""
    where: RowColumnOneManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowColumnOnesConnection)")
  """Unpublish many RowColumnOne documents"""
  unpublishManyRowColumnOnes(
    """Identifies documents in each stage"""
    where: RowColumnOneManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowColumnOnesConnection)")
  """Create one rowColumnTwo"""
  createRowColumnTwo(data: RowColumnTwoCreateInput!): RowColumnTwo
  """Update one rowColumnTwo"""
  updateRowColumnTwo(where: RowColumnTwoWhereUniqueInput!, data: RowColumnTwoUpdateInput!): RowColumnTwo
  """Delete one rowColumnTwo from _all_ existing stages. Returns deleted document."""
  deleteRowColumnTwo(
    """Document to delete"""
    where: RowColumnTwoWhereUniqueInput!
  ): RowColumnTwo
  """Upsert one rowColumnTwo"""
  upsertRowColumnTwo(where: RowColumnTwoWhereUniqueInput!, upsert: RowColumnTwoUpsertInput!): RowColumnTwo
  """Publish one rowColumnTwo"""
  publishRowColumnTwo(
    """Document to publish"""
    where: RowColumnTwoWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowColumnTwo
  """Unpublish one rowColumnTwo from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowColumnTwo(
    """Document to unpublish"""
    where: RowColumnTwoWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowColumnTwo
  """Update many RowColumnTwo documents"""
  updateManyRowColumnTwosConnection(
    """Documents to apply update on"""
    where: RowColumnTwoManyWhereInput
    """Updates to document content"""
    data: RowColumnTwoUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnTwoConnection!
  """Delete many RowColumnTwo documents, return deleted documents"""
  deleteManyRowColumnTwosConnection(
    """Documents to delete"""
    where: RowColumnTwoManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnTwoConnection!
  """Publish many RowColumnTwo documents"""
  publishManyRowColumnTwosConnection(
    """Identifies documents in each stage to be published"""
    where: RowColumnTwoManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowColumnTwoConnection!
  """Find many RowColumnTwo documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowColumnTwosConnection(
    """Identifies documents in draft stage"""
    where: RowColumnTwoManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowColumnTwoConnection!
  """Update many rowColumnTwos"""
  updateManyRowColumnTwos(
    """Documents to apply update on"""
    where: RowColumnTwoManyWhereInput
    """Updates to document content"""
    data: RowColumnTwoUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowColumnTwosConnection)")
  """Delete many RowColumnTwo documents"""
  deleteManyRowColumnTwos(
    """Documents to delete"""
    where: RowColumnTwoManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowColumnTwosConnection)")
  """Publish many RowColumnTwo documents"""
  publishManyRowColumnTwos(
    """Identifies documents in each stage to be published"""
    where: RowColumnTwoManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowColumnTwosConnection)")
  """Unpublish many RowColumnTwo documents"""
  unpublishManyRowColumnTwos(
    """Identifies documents in each stage"""
    where: RowColumnTwoManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowColumnTwosConnection)")
  """Create one rowColumnThree"""
  createRowColumnThree(data: RowColumnThreeCreateInput!): RowColumnThree
  """Update one rowColumnThree"""
  updateRowColumnThree(where: RowColumnThreeWhereUniqueInput!, data: RowColumnThreeUpdateInput!): RowColumnThree
  """Delete one rowColumnThree from _all_ existing stages. Returns deleted document."""
  deleteRowColumnThree(
    """Document to delete"""
    where: RowColumnThreeWhereUniqueInput!
  ): RowColumnThree
  """Upsert one rowColumnThree"""
  upsertRowColumnThree(where: RowColumnThreeWhereUniqueInput!, upsert: RowColumnThreeUpsertInput!): RowColumnThree
  """Publish one rowColumnThree"""
  publishRowColumnThree(
    """Document to publish"""
    where: RowColumnThreeWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): RowColumnThree
  """Unpublish one rowColumnThree from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishRowColumnThree(
    """Document to unpublish"""
    where: RowColumnThreeWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): RowColumnThree
  """Update many RowColumnThree documents"""
  updateManyRowColumnThreesConnection(
    """Documents to apply update on"""
    where: RowColumnThreeManyWhereInput
    """Updates to document content"""
    data: RowColumnThreeUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnThreeConnection!
  """Delete many RowColumnThree documents, return deleted documents"""
  deleteManyRowColumnThreesConnection(
    """Documents to delete"""
    where: RowColumnThreeManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): RowColumnThreeConnection!
  """Publish many RowColumnThree documents"""
  publishManyRowColumnThreesConnection(
    """Identifies documents in each stage to be published"""
    where: RowColumnThreeManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): RowColumnThreeConnection!
  """Find many RowColumnThree documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyRowColumnThreesConnection(
    """Identifies documents in draft stage"""
    where: RowColumnThreeManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): RowColumnThreeConnection!
  """Update many rowColumnThrees"""
  updateManyRowColumnThrees(
    """Documents to apply update on"""
    where: RowColumnThreeManyWhereInput
    """Updates to document content"""
    data: RowColumnThreeUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyRowColumnThreesConnection)")
  """Delete many RowColumnThree documents"""
  deleteManyRowColumnThrees(
    """Documents to delete"""
    where: RowColumnThreeManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyRowColumnThreesConnection)")
  """Publish many RowColumnThree documents"""
  publishManyRowColumnThrees(
    """Identifies documents in each stage to be published"""
    where: RowColumnThreeManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyRowColumnThreesConnection)")
  """Unpublish many RowColumnThree documents"""
  unpublishManyRowColumnThrees(
    """Identifies documents in each stage"""
    where: RowColumnThreeManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyRowColumnThreesConnection)")
  """Create one page"""
  createPage(data: PageCreateInput!): Page
  """Update one page"""
  updatePage(where: PageWhereUniqueInput!, data: PageUpdateInput!): Page
  """Delete one page from _all_ existing stages. Returns deleted document."""
  deletePage(
    """Document to delete"""
    where: PageWhereUniqueInput!
  ): Page
  """Upsert one page"""
  upsertPage(where: PageWhereUniqueInput!, upsert: PageUpsertInput!): Page
  """Publish one page"""
  publishPage(
    """Document to publish"""
    where: PageWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): Page
  """Unpublish one page from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishPage(
    """Document to unpublish"""
    where: PageWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): Page
  """Update many Page documents"""
  updateManyPagesConnection(
    """Documents to apply update on"""
    where: PageManyWhereInput
    """Updates to document content"""
    data: PageUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): PageConnection!
  """Delete many Page documents, return deleted documents"""
  deleteManyPagesConnection(
    """Documents to delete"""
    where: PageManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): PageConnection!
  """Publish many Page documents"""
  publishManyPagesConnection(
    """Identifies documents in each stage to be published"""
    where: PageManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): PageConnection!
  """Find many Page documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyPagesConnection(
    """Identifies documents in draft stage"""
    where: PageManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): PageConnection!
  """Update many pages"""
  updateManyPages(
    """Documents to apply update on"""
    where: PageManyWhereInput
    """Updates to document content"""
    data: PageUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyPagesConnection)")
  """Delete many Page documents"""
  deleteManyPages(
    """Documents to delete"""
    where: PageManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyPagesConnection)")
  """Publish many Page documents"""
  publishManyPages(
    """Identifies documents in each stage to be published"""
    where: PageManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyPagesConnection)")
  """Unpublish many Page documents"""
  unpublishManyPages(
    """Identifies documents in each stage"""
    where: PageManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyPagesConnection)")
  """Create one asset"""
  createAsset(data: AssetCreateInput!): Asset @deprecated(reason: "Asset mutations will be overhauled soon")
  """Update one asset"""
  updateAsset(where: AssetWhereUniqueInput!, data: AssetUpdateInput!): Asset
  """Delete one asset from _all_ existing stages. Returns deleted document."""
  deleteAsset(
    """Document to delete"""
    where: AssetWhereUniqueInput!
  ): Asset
  """Upsert one asset"""
  upsertAsset(where: AssetWhereUniqueInput!, upsert: AssetUpsertInput!): Asset
  """Publish one asset"""
  publishAsset(
    """Document to publish"""
    where: AssetWhereUniqueInput!
    """Optional localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is set"""
    withDefaultLocale: Boolean = true
    """Publishing target stage"""
    to: [Stage!]! = [PUBLISHED]
  ): Asset
  """Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only."""
  unpublishAsset(
    """Document to unpublish"""
    where: AssetWhereUniqueInput!
    """Stages to unpublish document from"""
    from: [Stage!]! = [PUBLISHED]
    """Optional locales to unpublish. Unpublishing the default locale will completely remove the document from the selected stages"""
    locales: [Locale!]
    """Unpublish complete document including default localization and relations from stages. Can be disabled."""
    unpublishBase: Boolean = true
  ): Asset
  """Update many Asset documents"""
  updateManyAssetsConnection(
    """Documents to apply update on"""
    where: AssetManyWhereInput
    """Updates to document content"""
    data: AssetUpdateManyInput!
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): AssetConnection!
  """Delete many Asset documents, return deleted documents"""
  deleteManyAssetsConnection(
    """Documents to delete"""
    where: AssetManyWhereInput
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
  ): AssetConnection!
  """Publish many Asset documents"""
  publishManyAssetsConnection(
    """Identifies documents in each stage to be published"""
    where: AssetManyWhereInput
    """Stage to find matching documents in"""
    from: Stage = DRAFT
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): AssetConnection!
  """Find many Asset documents that match criteria in specified stage and unpublish from target stages"""
  unpublishManyAssetsConnection(
    """Identifies documents in draft stage"""
    where: AssetManyWhereInput
    """Stage to find matching documents in"""
    stage: Stage = DRAFT
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    skip: Int
    first: Int
    last: Int
    before: ID
    after: ID
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): AssetConnection!
  """Update many assets"""
  updateManyAssets(
    """Documents to apply update on"""
    where: AssetManyWhereInput
    """Updates to document content"""
    data: AssetUpdateManyInput!
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (updateManyAssetsConnection)")
  """Delete many Asset documents"""
  deleteManyAssets(
    """Documents to delete"""
    where: AssetManyWhereInput
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (deleteManyAssetsConnection)")
  """Publish many Asset documents"""
  publishManyAssets(
    """Identifies documents in each stage to be published"""
    where: AssetManyWhereInput
    """Stages to publish documents to"""
    to: [Stage!]! = [PUBLISHED]
    """Document localizations to publish"""
    locales: [Locale!]
    """Whether to publish the base document"""
    publishBase: Boolean = true
    """Whether to include the default locale when publishBase is true"""
    withDefaultLocale: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (publishManyAssetsConnection)")
  """Unpublish many Asset documents"""
  unpublishManyAssets(
    """Identifies documents in each stage"""
    where: AssetManyWhereInput
    """Stages to unpublish documents from"""
    from: [Stage!]! = [PUBLISHED]
    """Locales to unpublish"""
    locales: [Locale!]
    """Whether to unpublish the base document and default localization"""
    unpublishBase: Boolean = true
  ): BatchPayload! @deprecated(reason: "Please use the new paginated many mutation (unpublishManyAssetsConnection)")
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
  """The Stage of an object"""
  stage: Stage!
}

type Page implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [Page!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [Page!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  url: String!
  title: String
  metaTitle: String!
  metaDescription: String!
  date: DateTime
  author: String
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  rowButtonLinkLists(
    where: RowButtonLinkListWhereInput
    orderBy: RowButtonLinkListOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowButtonLinkLists\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowButtonLinkList!]!
  """9:6 for general usage"""
  asset(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`asset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): Asset
  childPages(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`childPages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  relatedPages(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`relatedPages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  metaRobots: MetaRobots!
  content(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`content\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageContent!]!
  """List of Page versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input PageConnectInput {
  """Document to connect"""
  where: PageWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type PageConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [PageEdge!]!
  aggregate: Aggregate!
}

union PageContent = RowBlogContent | RowButtonLinkList | RowColumnOne | RowColumnThree | RowColumnTwo | RowContentLinks | RowHeroBanner | RowProductBackstory | RowProductGrid | RowQuote | RowServiceOptions | RowSpecialBanner | RowSwipeableGrid

input PageContentConnectInput {
  RowSpecialBanner: RowSpecialBannerConnectInput
  RowColumnOne: RowColumnOneConnectInput
  RowColumnTwo: RowColumnTwoConnectInput
  RowColumnThree: RowColumnThreeConnectInput
  RowQuote: RowQuoteConnectInput
  RowHeroBanner: RowHeroBannerConnectInput
  RowProductGrid: RowProductGridConnectInput
  RowSwipeableGrid: RowSwipeableGridConnectInput
  RowProductBackstory: RowProductBackstoryConnectInput
  RowButtonLinkList: RowButtonLinkListConnectInput
  RowServiceOptions: RowServiceOptionsConnectInput
  RowBlogContent: RowBlogContentConnectInput
  RowContentLinks: RowContentLinksConnectInput
}

input PageContentCreateInput {
  RowSpecialBanner: RowSpecialBannerCreateInput
  RowColumnOne: RowColumnOneCreateInput
  RowColumnTwo: RowColumnTwoCreateInput
  RowColumnThree: RowColumnThreeCreateInput
  RowQuote: RowQuoteCreateInput
  RowHeroBanner: RowHeroBannerCreateInput
  RowProductGrid: RowProductGridCreateInput
  RowSwipeableGrid: RowSwipeableGridCreateInput
  RowProductBackstory: RowProductBackstoryCreateInput
  RowButtonLinkList: RowButtonLinkListCreateInput
  RowServiceOptions: RowServiceOptionsCreateInput
  RowBlogContent: RowBlogContentCreateInput
  RowContentLinks: RowContentLinksCreateInput
}

input PageContentCreateManyInlineInput {
  """Create and connect multiple existing PageContent documents"""
  create: [PageContentCreateInput!]
  """Connect multiple existing PageContent documents"""
  connect: [PageContentWhereUniqueInput!]
}

input PageContentCreateOneInlineInput {
  """Create and connect one PageContent document"""
  create: PageContentCreateInput
  """Connect one existing PageContent document"""
  connect: PageContentWhereUniqueInput
}

input PageContentUpdateInput {
  RowSpecialBanner: RowSpecialBannerUpdateInput
  RowColumnOne: RowColumnOneUpdateInput
  RowColumnTwo: RowColumnTwoUpdateInput
  RowColumnThree: RowColumnThreeUpdateInput
  RowQuote: RowQuoteUpdateInput
  RowHeroBanner: RowHeroBannerUpdateInput
  RowProductGrid: RowProductGridUpdateInput
  RowSwipeableGrid: RowSwipeableGridUpdateInput
  RowProductBackstory: RowProductBackstoryUpdateInput
  RowButtonLinkList: RowButtonLinkListUpdateInput
  RowServiceOptions: RowServiceOptionsUpdateInput
  RowBlogContent: RowBlogContentUpdateInput
  RowContentLinks: RowContentLinksUpdateInput
}

input PageContentUpdateManyInlineInput {
  """Create and connect multiple PageContent documents"""
  create: [PageContentCreateInput!]
  """Connect multiple existing PageContent documents"""
  connect: [PageContentConnectInput!]
  """Override currently-connected documents with multiple existing PageContent documents"""
  set: [PageContentWhereUniqueInput!]
  """Update multiple PageContent documents"""
  update: [PageContentUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple PageContent documents"""
  upsert: [PageContentUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple PageContent documents"""
  disconnect: [PageContentWhereUniqueInput!]
  """Delete multiple PageContent documents"""
  delete: [PageContentWhereUniqueInput!]
}

input PageContentUpdateManyWithNestedWhereInput {
  RowSpecialBanner: RowSpecialBannerUpdateManyWithNestedWhereInput
  RowColumnOne: RowColumnOneUpdateManyWithNestedWhereInput
  RowColumnTwo: RowColumnTwoUpdateManyWithNestedWhereInput
  RowColumnThree: RowColumnThreeUpdateManyWithNestedWhereInput
  RowQuote: RowQuoteUpdateManyWithNestedWhereInput
  RowHeroBanner: RowHeroBannerUpdateManyWithNestedWhereInput
  RowProductGrid: RowProductGridUpdateManyWithNestedWhereInput
  RowSwipeableGrid: RowSwipeableGridUpdateManyWithNestedWhereInput
  RowProductBackstory: RowProductBackstoryUpdateManyWithNestedWhereInput
  RowButtonLinkList: RowButtonLinkListUpdateManyWithNestedWhereInput
  RowServiceOptions: RowServiceOptionsUpdateManyWithNestedWhereInput
  RowBlogContent: RowBlogContentUpdateManyWithNestedWhereInput
  RowContentLinks: RowContentLinksUpdateManyWithNestedWhereInput
}

input PageContentUpdateOneInlineInput {
  """Create and connect one PageContent document"""
  create: PageContentCreateInput
  """Update single PageContent document"""
  update: PageContentUpdateWithNestedWhereUniqueInput
  """Upsert single PageContent document"""
  upsert: PageContentUpsertWithNestedWhereUniqueInput
  """Connect existing PageContent document"""
  connect: PageContentWhereUniqueInput
  """Disconnect currently connected PageContent document"""
  disconnect: Boolean
  """Delete currently connected PageContent document"""
  delete: Boolean
}

input PageContentUpdateWithNestedWhereUniqueInput {
  RowSpecialBanner: RowSpecialBannerUpdateWithNestedWhereUniqueInput
  RowColumnOne: RowColumnOneUpdateWithNestedWhereUniqueInput
  RowColumnTwo: RowColumnTwoUpdateWithNestedWhereUniqueInput
  RowColumnThree: RowColumnThreeUpdateWithNestedWhereUniqueInput
  RowQuote: RowQuoteUpdateWithNestedWhereUniqueInput
  RowHeroBanner: RowHeroBannerUpdateWithNestedWhereUniqueInput
  RowProductGrid: RowProductGridUpdateWithNestedWhereUniqueInput
  RowSwipeableGrid: RowSwipeableGridUpdateWithNestedWhereUniqueInput
  RowProductBackstory: RowProductBackstoryUpdateWithNestedWhereUniqueInput
  RowButtonLinkList: RowButtonLinkListUpdateWithNestedWhereUniqueInput
  RowServiceOptions: RowServiceOptionsUpdateWithNestedWhereUniqueInput
  RowBlogContent: RowBlogContentUpdateWithNestedWhereUniqueInput
  RowContentLinks: RowContentLinksUpdateWithNestedWhereUniqueInput
}

input PageContentUpsertWithNestedWhereUniqueInput {
  RowSpecialBanner: RowSpecialBannerUpsertWithNestedWhereUniqueInput
  RowColumnOne: RowColumnOneUpsertWithNestedWhereUniqueInput
  RowColumnTwo: RowColumnTwoUpsertWithNestedWhereUniqueInput
  RowColumnThree: RowColumnThreeUpsertWithNestedWhereUniqueInput
  RowQuote: RowQuoteUpsertWithNestedWhereUniqueInput
  RowHeroBanner: RowHeroBannerUpsertWithNestedWhereUniqueInput
  RowProductGrid: RowProductGridUpsertWithNestedWhereUniqueInput
  RowSwipeableGrid: RowSwipeableGridUpsertWithNestedWhereUniqueInput
  RowProductBackstory: RowProductBackstoryUpsertWithNestedWhereUniqueInput
  RowButtonLinkList: RowButtonLinkListUpsertWithNestedWhereUniqueInput
  RowServiceOptions: RowServiceOptionsUpsertWithNestedWhereUniqueInput
  RowBlogContent: RowBlogContentUpsertWithNestedWhereUniqueInput
  RowContentLinks: RowContentLinksUpsertWithNestedWhereUniqueInput
}

input PageContentWhereInput {
  RowSpecialBanner: RowSpecialBannerWhereInput
  RowColumnOne: RowColumnOneWhereInput
  RowColumnTwo: RowColumnTwoWhereInput
  RowColumnThree: RowColumnThreeWhereInput
  RowQuote: RowQuoteWhereInput
  RowHeroBanner: RowHeroBannerWhereInput
  RowProductGrid: RowProductGridWhereInput
  RowSwipeableGrid: RowSwipeableGridWhereInput
  RowProductBackstory: RowProductBackstoryWhereInput
  RowButtonLinkList: RowButtonLinkListWhereInput
  RowServiceOptions: RowServiceOptionsWhereInput
  RowBlogContent: RowBlogContentWhereInput
  RowContentLinks: RowContentLinksWhereInput
}

input PageContentWhereUniqueInput {
  RowSpecialBanner: RowSpecialBannerWhereUniqueInput
  RowColumnOne: RowColumnOneWhereUniqueInput
  RowColumnTwo: RowColumnTwoWhereUniqueInput
  RowColumnThree: RowColumnThreeWhereUniqueInput
  RowQuote: RowQuoteWhereUniqueInput
  RowHeroBanner: RowHeroBannerWhereUniqueInput
  RowProductGrid: RowProductGridWhereUniqueInput
  RowSwipeableGrid: RowSwipeableGridWhereUniqueInput
  RowProductBackstory: RowProductBackstoryWhereUniqueInput
  RowButtonLinkList: RowButtonLinkListWhereUniqueInput
  RowServiceOptions: RowServiceOptionsWhereUniqueInput
  RowBlogContent: RowBlogContentWhereUniqueInput
  RowContentLinks: RowContentLinksWhereUniqueInput
}

input PageCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  """url input for default locale (en)"""
  url: String!
  """title input for default locale (en)"""
  title: String
  """metaTitle input for default locale (en)"""
  metaTitle: String!
  """metaDescription input for default locale (en)"""
  metaDescription: String!
  date: DateTime
  """author input for default locale (en)"""
  author: String
  rowButtonLinkLists: RowButtonLinkListCreateManyInlineInput
  asset: AssetCreateOneInlineInput
  childPages: PageCreateManyInlineInput
  relatedPages: PageCreateManyInlineInput
  """metaRobots input for default locale (en)"""
  metaRobots: MetaRobots!
  content: PageContentCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: PageCreateLocalizationsInput
}

input PageCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  url: String!
  title: String
  metaTitle: String!
  metaDescription: String!
  author: String
  metaRobots: MetaRobots!
}

input PageCreateLocalizationInput {
  """Localization input"""
  data: PageCreateLocalizationDataInput!
  locale: Locale!
}

input PageCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [PageCreateLocalizationInput!]
}

input PageCreateManyInlineInput {
  """Create and connect multiple existing Page documents"""
  create: [PageCreateInput!]
  """Connect multiple existing Page documents"""
  connect: [PageWhereUniqueInput!]
}

input PageCreateOneInlineInput {
  """Create and connect one Page document"""
  create: PageCreateInput
  """Connect one existing Page document"""
  connect: PageWhereUniqueInput
}

"""An edge in a connection."""
type PageEdge {
  """The item at the end of the edge."""
  node: Page!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!
  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!
  """When paginating backwards, the cursor to continue."""
  startCursor: String
  """When paginating forwards, the cursor to continue."""
  endCursor: String
  """Number of items in the current page."""
  pageSize: Int
}

type PageLink implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [PageLink!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [PageLink!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  title: String!
  description: RichText
  url: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  rowHeroBanners(
    where: RowHeroBannerWhereInput
    orderBy: RowHeroBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowHeroBanners\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowHeroBanner!]!
  rowProductGrids(
    where: RowProductGridWhereInput
    orderBy: RowProductGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowProductGrids\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowProductGrid!]!
  rowSpecialBanners(
    where: RowSpecialBannerWhereInput
    orderBy: RowSpecialBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowSpecialBanners\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowSpecialBanner!]!
  footerSocialLinks(
    where: FooterWhereInput
    orderBy: FooterOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`footerSocialLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Footer!]!
  footerLegalLinks(
    where: FooterWhereInput
    orderBy: FooterOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`footerLegalLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Footer!]!
  rowServiceOptionsMultiple(
    where: RowServiceOptionsWhereInput
    orderBy: RowServiceOptionsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowServiceOptionsMultiple\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [RowServiceOptions!]!
  rowContentLinks(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`rowContentLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): RowContentLinks
  asset(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`asset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): Asset
  uspsMultiple(
    where: UspsWhereInput
    orderBy: UspsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`uspsMultiple\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Usps!]!
  """List of PageLink versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input PageLinkConnectInput {
  """Document to connect"""
  where: PageLinkWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type PageLinkConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [PageLinkEdge!]!
  aggregate: Aggregate!
}

input PageLinkCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  """title input for default locale (en)"""
  title: String!
  """description input for default locale (en)"""
  description: RichTextAST
  """url input for default locale (en)"""
  url: String!
  rowHeroBanners: RowHeroBannerCreateManyInlineInput
  rowProductGrids: RowProductGridCreateManyInlineInput
  rowSpecialBanners: RowSpecialBannerCreateManyInlineInput
  footerSocialLinks: FooterCreateManyInlineInput
  footerLegalLinks: FooterCreateManyInlineInput
  rowServiceOptionsMultiple: RowServiceOptionsCreateManyInlineInput
  rowContentLinks: RowContentLinksCreateOneInlineInput
  asset: AssetCreateOneInlineInput
  uspsMultiple: UspsCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: PageLinkCreateLocalizationsInput
}

input PageLinkCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
  description: RichTextAST
  url: String!
}

input PageLinkCreateLocalizationInput {
  """Localization input"""
  data: PageLinkCreateLocalizationDataInput!
  locale: Locale!
}

input PageLinkCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [PageLinkCreateLocalizationInput!]
}

input PageLinkCreateManyInlineInput {
  """Create and connect multiple existing PageLink documents"""
  create: [PageLinkCreateInput!]
  """Connect multiple existing PageLink documents"""
  connect: [PageLinkWhereUniqueInput!]
}

input PageLinkCreateOneInlineInput {
  """Create and connect one PageLink document"""
  create: PageLinkCreateInput
  """Connect one existing PageLink document"""
  connect: PageLinkWhereUniqueInput
}

"""An edge in a connection."""
type PageLinkEdge {
  """The item at the end of the edge."""
  node: PageLink!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input PageLinkManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [PageLinkWhereInput!]
  """Logical OR on all given filters."""
  OR: [PageLinkWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [PageLinkWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowHeroBanners_every: RowHeroBannerWhereInput
  rowHeroBanners_some: RowHeroBannerWhereInput
  rowHeroBanners_none: RowHeroBannerWhereInput
  rowProductGrids_every: RowProductGridWhereInput
  rowProductGrids_some: RowProductGridWhereInput
  rowProductGrids_none: RowProductGridWhereInput
  rowSpecialBanners_every: RowSpecialBannerWhereInput
  rowSpecialBanners_some: RowSpecialBannerWhereInput
  rowSpecialBanners_none: RowSpecialBannerWhereInput
  footerSocialLinks_every: FooterWhereInput
  footerSocialLinks_some: FooterWhereInput
  footerSocialLinks_none: FooterWhereInput
  footerLegalLinks_every: FooterWhereInput
  footerLegalLinks_some: FooterWhereInput
  footerLegalLinks_none: FooterWhereInput
  rowServiceOptionsMultiple_every: RowServiceOptionsWhereInput
  rowServiceOptionsMultiple_some: RowServiceOptionsWhereInput
  rowServiceOptionsMultiple_none: RowServiceOptionsWhereInput
  rowContentLinks: RowContentLinksWhereInput
  asset: AssetWhereInput
  uspsMultiple_every: UspsWhereInput
  uspsMultiple_some: UspsWhereInput
  uspsMultiple_none: UspsWhereInput
}

enum PageLinkOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  title_ASC
  title_DESC
  url_ASC
  url_DESC
}

input PageLinkUpdateInput {
  """title input for default locale (en)"""
  title: String
  """description input for default locale (en)"""
  description: RichTextAST
  """url input for default locale (en)"""
  url: String
  rowHeroBanners: RowHeroBannerUpdateManyInlineInput
  rowProductGrids: RowProductGridUpdateManyInlineInput
  rowSpecialBanners: RowSpecialBannerUpdateManyInlineInput
  footerSocialLinks: FooterUpdateManyInlineInput
  footerLegalLinks: FooterUpdateManyInlineInput
  rowServiceOptionsMultiple: RowServiceOptionsUpdateManyInlineInput
  rowContentLinks: RowContentLinksUpdateOneInlineInput
  asset: AssetUpdateOneInlineInput
  uspsMultiple: UspsUpdateManyInlineInput
  """Manage document localizations"""
  localizations: PageLinkUpdateLocalizationsInput
}

input PageLinkUpdateLocalizationDataInput {
  title: String
  description: RichTextAST
  url: String
}

input PageLinkUpdateLocalizationInput {
  data: PageLinkUpdateLocalizationDataInput!
  locale: Locale!
}

input PageLinkUpdateLocalizationsInput {
  """Localizations to create"""
  create: [PageLinkCreateLocalizationInput!]
  """Localizations to update"""
  update: [PageLinkUpdateLocalizationInput!]
  upsert: [PageLinkUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input PageLinkUpdateManyInlineInput {
  """Create and connect multiple PageLink documents"""
  create: [PageLinkCreateInput!]
  """Connect multiple existing PageLink documents"""
  connect: [PageLinkConnectInput!]
  """Override currently-connected documents with multiple existing PageLink documents"""
  set: [PageLinkWhereUniqueInput!]
  """Update multiple PageLink documents"""
  update: [PageLinkUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple PageLink documents"""
  upsert: [PageLinkUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple PageLink documents"""
  disconnect: [PageLinkWhereUniqueInput!]
  """Delete multiple PageLink documents"""
  delete: [PageLinkWhereUniqueInput!]
}

input PageLinkUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """description input for default locale (en)"""
  description: RichTextAST
  """url input for default locale (en)"""
  url: String
  """Optional updates to localizations"""
  localizations: PageLinkUpdateManyLocalizationsInput
}

input PageLinkUpdateManyLocalizationDataInput {
  title: String
  description: RichTextAST
  url: String
}

input PageLinkUpdateManyLocalizationInput {
  data: PageLinkUpdateManyLocalizationDataInput!
  locale: Locale!
}

input PageLinkUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [PageLinkUpdateManyLocalizationInput!]
}

input PageLinkUpdateManyWithNestedWhereInput {
  """Document search"""
  where: PageLinkWhereInput!
  """Update many input"""
  data: PageLinkUpdateManyInput!
}

input PageLinkUpdateOneInlineInput {
  """Create and connect one PageLink document"""
  create: PageLinkCreateInput
  """Update single PageLink document"""
  update: PageLinkUpdateWithNestedWhereUniqueInput
  """Upsert single PageLink document"""
  upsert: PageLinkUpsertWithNestedWhereUniqueInput
  """Connect existing PageLink document"""
  connect: PageLinkWhereUniqueInput
  """Disconnect currently connected PageLink document"""
  disconnect: Boolean
  """Delete currently connected PageLink document"""
  delete: Boolean
}

input PageLinkUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: PageLinkWhereUniqueInput!
  """Document to update"""
  data: PageLinkUpdateInput!
}

input PageLinkUpsertInput {
  """Create document if it didn't exist"""
  create: PageLinkCreateInput!
  """Update document if it exists"""
  update: PageLinkUpdateInput!
}

input PageLinkUpsertLocalizationInput {
  update: PageLinkUpdateLocalizationDataInput!
  create: PageLinkCreateLocalizationDataInput!
  locale: Locale!
}

input PageLinkUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: PageLinkWhereUniqueInput!
  """Upsert data"""
  data: PageLinkUpsertInput!
}

"""Identifies documents"""
input PageLinkWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [PageLinkWhereInput!]
  """Logical OR on all given filters."""
  OR: [PageLinkWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [PageLinkWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  url: String
  """All values that are not equal to given value."""
  url_not: String
  """All values that are contained in given list."""
  url_in: [String!]
  """All values that are not contained in given list."""
  url_not_in: [String!]
  """All values containing the given string."""
  url_contains: String
  """All values not containing the given string."""
  url_not_contains: String
  """All values starting with the given string."""
  url_starts_with: String
  """All values not starting with the given string."""
  url_not_starts_with: String
  """All values ending with the given string."""
  url_ends_with: String
  """All values not ending with the given string"""
  url_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowHeroBanners_every: RowHeroBannerWhereInput
  rowHeroBanners_some: RowHeroBannerWhereInput
  rowHeroBanners_none: RowHeroBannerWhereInput
  rowProductGrids_every: RowProductGridWhereInput
  rowProductGrids_some: RowProductGridWhereInput
  rowProductGrids_none: RowProductGridWhereInput
  rowSpecialBanners_every: RowSpecialBannerWhereInput
  rowSpecialBanners_some: RowSpecialBannerWhereInput
  rowSpecialBanners_none: RowSpecialBannerWhereInput
  footerSocialLinks_every: FooterWhereInput
  footerSocialLinks_some: FooterWhereInput
  footerSocialLinks_none: FooterWhereInput
  footerLegalLinks_every: FooterWhereInput
  footerLegalLinks_some: FooterWhereInput
  footerLegalLinks_none: FooterWhereInput
  rowServiceOptionsMultiple_every: RowServiceOptionsWhereInput
  rowServiceOptionsMultiple_some: RowServiceOptionsWhereInput
  rowServiceOptionsMultiple_none: RowServiceOptionsWhereInput
  rowContentLinks: RowContentLinksWhereInput
  asset: AssetWhereInput
  uspsMultiple_every: UspsWhereInput
  uspsMultiple_some: UspsWhereInput
  uspsMultiple_none: UspsWhereInput
}

"""References PageLink record uniquely"""
input PageLinkWhereUniqueInput {
  id: ID
}

"""Identifies documents"""
input PageManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [PageWhereInput!]
  """Logical OR on all given filters."""
  OR: [PageWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [PageWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  date: DateTime
  """All values that are not equal to given value."""
  date_not: DateTime
  """All values that are contained in given list."""
  date_in: [DateTime!]
  """All values that are not contained in given list."""
  date_not_in: [DateTime!]
  """All values less than the given value."""
  date_lt: DateTime
  """All values less than or equal the given value."""
  date_lte: DateTime
  """All values greater than the given value."""
  date_gt: DateTime
  """All values greater than or equal the given value."""
  date_gte: DateTime
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowButtonLinkLists_every: RowButtonLinkListWhereInput
  rowButtonLinkLists_some: RowButtonLinkListWhereInput
  rowButtonLinkLists_none: RowButtonLinkListWhereInput
  asset: AssetWhereInput
  childPages_every: PageWhereInput
  childPages_some: PageWhereInput
  childPages_none: PageWhereInput
  relatedPages_every: PageWhereInput
  relatedPages_some: PageWhereInput
  relatedPages_none: PageWhereInput
}

enum PageOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  url_ASC
  url_DESC
  title_ASC
  title_DESC
  metaTitle_ASC
  metaTitle_DESC
  metaDescription_ASC
  metaDescription_DESC
  date_ASC
  date_DESC
  author_ASC
  author_DESC
  metaRobots_ASC
  metaRobots_DESC
}

input PageUpdateInput {
  """url input for default locale (en)"""
  url: String
  """title input for default locale (en)"""
  title: String
  """metaTitle input for default locale (en)"""
  metaTitle: String
  """metaDescription input for default locale (en)"""
  metaDescription: String
  date: DateTime
  """author input for default locale (en)"""
  author: String
  rowButtonLinkLists: RowButtonLinkListUpdateManyInlineInput
  asset: AssetUpdateOneInlineInput
  childPages: PageUpdateManyInlineInput
  relatedPages: PageUpdateManyInlineInput
  """metaRobots input for default locale (en)"""
  metaRobots: MetaRobots
  content: PageContentUpdateManyInlineInput
  """Manage document localizations"""
  localizations: PageUpdateLocalizationsInput
}

input PageUpdateLocalizationDataInput {
  url: String
  title: String
  metaTitle: String
  metaDescription: String
  author: String
  metaRobots: MetaRobots
}

input PageUpdateLocalizationInput {
  data: PageUpdateLocalizationDataInput!
  locale: Locale!
}

input PageUpdateLocalizationsInput {
  """Localizations to create"""
  create: [PageCreateLocalizationInput!]
  """Localizations to update"""
  update: [PageUpdateLocalizationInput!]
  upsert: [PageUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input PageUpdateManyInlineInput {
  """Create and connect multiple Page documents"""
  create: [PageCreateInput!]
  """Connect multiple existing Page documents"""
  connect: [PageConnectInput!]
  """Override currently-connected documents with multiple existing Page documents"""
  set: [PageWhereUniqueInput!]
  """Update multiple Page documents"""
  update: [PageUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple Page documents"""
  upsert: [PageUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple Page documents"""
  disconnect: [PageWhereUniqueInput!]
  """Delete multiple Page documents"""
  delete: [PageWhereUniqueInput!]
}

input PageUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """metaTitle input for default locale (en)"""
  metaTitle: String
  """metaDescription input for default locale (en)"""
  metaDescription: String
  date: DateTime
  """author input for default locale (en)"""
  author: String
  """metaRobots input for default locale (en)"""
  metaRobots: MetaRobots
  """Optional updates to localizations"""
  localizations: PageUpdateManyLocalizationsInput
}

input PageUpdateManyLocalizationDataInput {
  title: String
  metaTitle: String
  metaDescription: String
  author: String
  metaRobots: MetaRobots
}

input PageUpdateManyLocalizationInput {
  data: PageUpdateManyLocalizationDataInput!
  locale: Locale!
}

input PageUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [PageUpdateManyLocalizationInput!]
}

input PageUpdateManyWithNestedWhereInput {
  """Document search"""
  where: PageWhereInput!
  """Update many input"""
  data: PageUpdateManyInput!
}

input PageUpdateOneInlineInput {
  """Create and connect one Page document"""
  create: PageCreateInput
  """Update single Page document"""
  update: PageUpdateWithNestedWhereUniqueInput
  """Upsert single Page document"""
  upsert: PageUpsertWithNestedWhereUniqueInput
  """Connect existing Page document"""
  connect: PageWhereUniqueInput
  """Disconnect currently connected Page document"""
  disconnect: Boolean
  """Delete currently connected Page document"""
  delete: Boolean
}

input PageUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: PageWhereUniqueInput!
  """Document to update"""
  data: PageUpdateInput!
}

input PageUpsertInput {
  """Create document if it didn't exist"""
  create: PageCreateInput!
  """Update document if it exists"""
  update: PageUpdateInput!
}

input PageUpsertLocalizationInput {
  update: PageUpdateLocalizationDataInput!
  create: PageCreateLocalizationDataInput!
  locale: Locale!
}

input PageUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: PageWhereUniqueInput!
  """Upsert data"""
  data: PageUpsertInput!
}

"""Identifies documents"""
input PageWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [PageWhereInput!]
  """Logical OR on all given filters."""
  OR: [PageWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [PageWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  url: String
  """All values that are not equal to given value."""
  url_not: String
  """All values that are contained in given list."""
  url_in: [String!]
  """All values that are not contained in given list."""
  url_not_in: [String!]
  """All values containing the given string."""
  url_contains: String
  """All values not containing the given string."""
  url_not_contains: String
  """All values starting with the given string."""
  url_starts_with: String
  """All values not starting with the given string."""
  url_not_starts_with: String
  """All values ending with the given string."""
  url_ends_with: String
  """All values not ending with the given string"""
  url_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  metaTitle: String
  """All values that are not equal to given value."""
  metaTitle_not: String
  """All values that are contained in given list."""
  metaTitle_in: [String!]
  """All values that are not contained in given list."""
  metaTitle_not_in: [String!]
  """All values containing the given string."""
  metaTitle_contains: String
  """All values not containing the given string."""
  metaTitle_not_contains: String
  """All values starting with the given string."""
  metaTitle_starts_with: String
  """All values not starting with the given string."""
  metaTitle_not_starts_with: String
  """All values ending with the given string."""
  metaTitle_ends_with: String
  """All values not ending with the given string"""
  metaTitle_not_ends_with: String
  metaDescription: String
  """All values that are not equal to given value."""
  metaDescription_not: String
  """All values that are contained in given list."""
  metaDescription_in: [String!]
  """All values that are not contained in given list."""
  metaDescription_not_in: [String!]
  """All values containing the given string."""
  metaDescription_contains: String
  """All values not containing the given string."""
  metaDescription_not_contains: String
  """All values starting with the given string."""
  metaDescription_starts_with: String
  """All values not starting with the given string."""
  metaDescription_not_starts_with: String
  """All values ending with the given string."""
  metaDescription_ends_with: String
  """All values not ending with the given string"""
  metaDescription_not_ends_with: String
  date: DateTime
  """All values that are not equal to given value."""
  date_not: DateTime
  """All values that are contained in given list."""
  date_in: [DateTime!]
  """All values that are not contained in given list."""
  date_not_in: [DateTime!]
  """All values less than the given value."""
  date_lt: DateTime
  """All values less than or equal the given value."""
  date_lte: DateTime
  """All values greater than the given value."""
  date_gt: DateTime
  """All values greater than or equal the given value."""
  date_gte: DateTime
  author: String
  """All values that are not equal to given value."""
  author_not: String
  """All values that are contained in given list."""
  author_in: [String!]
  """All values that are not contained in given list."""
  author_not_in: [String!]
  """All values containing the given string."""
  author_contains: String
  """All values not containing the given string."""
  author_not_contains: String
  """All values starting with the given string."""
  author_starts_with: String
  """All values not starting with the given string."""
  author_not_starts_with: String
  """All values ending with the given string."""
  author_ends_with: String
  """All values not ending with the given string"""
  author_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  rowButtonLinkLists_every: RowButtonLinkListWhereInput
  rowButtonLinkLists_some: RowButtonLinkListWhereInput
  rowButtonLinkLists_none: RowButtonLinkListWhereInput
  asset: AssetWhereInput
  childPages_every: PageWhereInput
  childPages_some: PageWhereInput
  childPages_none: PageWhereInput
  relatedPages_every: PageWhereInput
  relatedPages_some: PageWhereInput
  relatedPages_none: PageWhereInput
  metaRobots: MetaRobots
  """All values that are not equal to given value."""
  metaRobots_not: MetaRobots
  """All values that are contained in given list."""
  metaRobots_in: [MetaRobots!]
  """All values that are not contained in given list."""
  metaRobots_not_in: [MetaRobots!]
}

"""References Page record uniquely"""
input PageWhereUniqueInput {
  id: ID
}

type Product implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [Product!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [Product!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  url: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  content(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`content\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [ProductContent!]!
  """List of Product versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input ProductConnectInput {
  """Document to connect"""
  where: ProductWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type ProductConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [ProductEdge!]!
  aggregate: Aggregate!
}

union ProductContent = RowColumnOne | RowColumnThree | RowColumnTwo | RowContentLinks | RowProductFeature | RowProductFeatureBoxed | RowProductRelated | RowProductReviews | RowProductSpecs | RowProductUpsells | RowQuote | RowSpecialBanner

input ProductContentConnectInput {
  RowColumnOne: RowColumnOneConnectInput
  RowColumnTwo: RowColumnTwoConnectInput
  RowColumnThree: RowColumnThreeConnectInput
  RowProductFeature: RowProductFeatureConnectInput
  RowSpecialBanner: RowSpecialBannerConnectInput
  RowQuote: RowQuoteConnectInput
  RowProductFeatureBoxed: RowProductFeatureBoxedConnectInput
  RowContentLinks: RowContentLinksConnectInput
  RowProductReviews: RowProductReviewsConnectInput
  RowProductRelated: RowProductRelatedConnectInput
  RowProductUpsells: RowProductUpsellsConnectInput
  RowProductSpecs: RowProductSpecsConnectInput
}

input ProductContentCreateInput {
  RowColumnOne: RowColumnOneCreateInput
  RowColumnTwo: RowColumnTwoCreateInput
  RowColumnThree: RowColumnThreeCreateInput
  RowProductFeature: RowProductFeatureCreateInput
  RowSpecialBanner: RowSpecialBannerCreateInput
  RowQuote: RowQuoteCreateInput
  RowProductFeatureBoxed: RowProductFeatureBoxedCreateInput
  RowContentLinks: RowContentLinksCreateInput
  RowProductReviews: RowProductReviewsCreateInput
  RowProductRelated: RowProductRelatedCreateInput
  RowProductUpsells: RowProductUpsellsCreateInput
  RowProductSpecs: RowProductSpecsCreateInput
}

input ProductContentCreateManyInlineInput {
  """Create and connect multiple existing ProductContent documents"""
  create: [ProductContentCreateInput!]
  """Connect multiple existing ProductContent documents"""
  connect: [ProductContentWhereUniqueInput!]
}

input ProductContentCreateOneInlineInput {
  """Create and connect one ProductContent document"""
  create: ProductContentCreateInput
  """Connect one existing ProductContent document"""
  connect: ProductContentWhereUniqueInput
}

input ProductContentUpdateInput {
  RowColumnOne: RowColumnOneUpdateInput
  RowColumnTwo: RowColumnTwoUpdateInput
  RowColumnThree: RowColumnThreeUpdateInput
  RowProductFeature: RowProductFeatureUpdateInput
  RowSpecialBanner: RowSpecialBannerUpdateInput
  RowQuote: RowQuoteUpdateInput
  RowProductFeatureBoxed: RowProductFeatureBoxedUpdateInput
  RowContentLinks: RowContentLinksUpdateInput
  RowProductReviews: RowProductReviewsUpdateInput
  RowProductRelated: RowProductRelatedUpdateInput
  RowProductUpsells: RowProductUpsellsUpdateInput
  RowProductSpecs: RowProductSpecsUpdateInput
}

input ProductContentUpdateManyInlineInput {
  """Create and connect multiple ProductContent documents"""
  create: [ProductContentCreateInput!]
  """Connect multiple existing ProductContent documents"""
  connect: [ProductContentConnectInput!]
  """Override currently-connected documents with multiple existing ProductContent documents"""
  set: [ProductContentWhereUniqueInput!]
  """Update multiple ProductContent documents"""
  update: [ProductContentUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple ProductContent documents"""
  upsert: [ProductContentUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple ProductContent documents"""
  disconnect: [ProductContentWhereUniqueInput!]
  """Delete multiple ProductContent documents"""
  delete: [ProductContentWhereUniqueInput!]
}

input ProductContentUpdateManyWithNestedWhereInput {
  RowColumnOne: RowColumnOneUpdateManyWithNestedWhereInput
  RowColumnTwo: RowColumnTwoUpdateManyWithNestedWhereInput
  RowColumnThree: RowColumnThreeUpdateManyWithNestedWhereInput
  RowProductFeature: RowProductFeatureUpdateManyWithNestedWhereInput
  RowSpecialBanner: RowSpecialBannerUpdateManyWithNestedWhereInput
  RowQuote: RowQuoteUpdateManyWithNestedWhereInput
  RowProductFeatureBoxed: RowProductFeatureBoxedUpdateManyWithNestedWhereInput
  RowContentLinks: RowContentLinksUpdateManyWithNestedWhereInput
  RowProductReviews: RowProductReviewsUpdateManyWithNestedWhereInput
  RowProductRelated: RowProductRelatedUpdateManyWithNestedWhereInput
  RowProductUpsells: RowProductUpsellsUpdateManyWithNestedWhereInput
  RowProductSpecs: RowProductSpecsUpdateManyWithNestedWhereInput
}

input ProductContentUpdateOneInlineInput {
  """Create and connect one ProductContent document"""
  create: ProductContentCreateInput
  """Update single ProductContent document"""
  update: ProductContentUpdateWithNestedWhereUniqueInput
  """Upsert single ProductContent document"""
  upsert: ProductContentUpsertWithNestedWhereUniqueInput
  """Connect existing ProductContent document"""
  connect: ProductContentWhereUniqueInput
  """Disconnect currently connected ProductContent document"""
  disconnect: Boolean
  """Delete currently connected ProductContent document"""
  delete: Boolean
}

input ProductContentUpdateWithNestedWhereUniqueInput {
  RowColumnOne: RowColumnOneUpdateWithNestedWhereUniqueInput
  RowColumnTwo: RowColumnTwoUpdateWithNestedWhereUniqueInput
  RowColumnThree: RowColumnThreeUpdateWithNestedWhereUniqueInput
  RowProductFeature: RowProductFeatureUpdateWithNestedWhereUniqueInput
  RowSpecialBanner: RowSpecialBannerUpdateWithNestedWhereUniqueInput
  RowQuote: RowQuoteUpdateWithNestedWhereUniqueInput
  RowProductFeatureBoxed: RowProductFeatureBoxedUpdateWithNestedWhereUniqueInput
  RowContentLinks: RowContentLinksUpdateWithNestedWhereUniqueInput
  RowProductReviews: RowProductReviewsUpdateWithNestedWhereUniqueInput
  RowProductRelated: RowProductRelatedUpdateWithNestedWhereUniqueInput
  RowProductUpsells: RowProductUpsellsUpdateWithNestedWhereUniqueInput
  RowProductSpecs: RowProductSpecsUpdateWithNestedWhereUniqueInput
}

input ProductContentUpsertWithNestedWhereUniqueInput {
  RowColumnOne: RowColumnOneUpsertWithNestedWhereUniqueInput
  RowColumnTwo: RowColumnTwoUpsertWithNestedWhereUniqueInput
  RowColumnThree: RowColumnThreeUpsertWithNestedWhereUniqueInput
  RowProductFeature: RowProductFeatureUpsertWithNestedWhereUniqueInput
  RowSpecialBanner: RowSpecialBannerUpsertWithNestedWhereUniqueInput
  RowQuote: RowQuoteUpsertWithNestedWhereUniqueInput
  RowProductFeatureBoxed: RowProductFeatureBoxedUpsertWithNestedWhereUniqueInput
  RowContentLinks: RowContentLinksUpsertWithNestedWhereUniqueInput
  RowProductReviews: RowProductReviewsUpsertWithNestedWhereUniqueInput
  RowProductRelated: RowProductRelatedUpsertWithNestedWhereUniqueInput
  RowProductUpsells: RowProductUpsellsUpsertWithNestedWhereUniqueInput
  RowProductSpecs: RowProductSpecsUpsertWithNestedWhereUniqueInput
}

input ProductContentWhereInput {
  RowColumnOne: RowColumnOneWhereInput
  RowColumnTwo: RowColumnTwoWhereInput
  RowColumnThree: RowColumnThreeWhereInput
  RowProductFeature: RowProductFeatureWhereInput
  RowSpecialBanner: RowSpecialBannerWhereInput
  RowQuote: RowQuoteWhereInput
  RowProductFeatureBoxed: RowProductFeatureBoxedWhereInput
  RowContentLinks: RowContentLinksWhereInput
  RowProductReviews: RowProductReviewsWhereInput
  RowProductRelated: RowProductRelatedWhereInput
  RowProductUpsells: RowProductUpsellsWhereInput
  RowProductSpecs: RowProductSpecsWhereInput
}

input ProductContentWhereUniqueInput {
  RowColumnOne: RowColumnOneWhereUniqueInput
  RowColumnTwo: RowColumnTwoWhereUniqueInput
  RowColumnThree: RowColumnThreeWhereUniqueInput
  RowProductFeature: RowProductFeatureWhereUniqueInput
  RowSpecialBanner: RowSpecialBannerWhereUniqueInput
  RowQuote: RowQuoteWhereUniqueInput
  RowProductFeatureBoxed: RowProductFeatureBoxedWhereUniqueInput
  RowContentLinks: RowContentLinksWhereUniqueInput
  RowProductReviews: RowProductReviewsWhereUniqueInput
  RowProductRelated: RowProductRelatedWhereUniqueInput
  RowProductUpsells: RowProductUpsellsWhereUniqueInput
  RowProductSpecs: RowProductSpecsWhereUniqueInput
}

input ProductCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  """url input for default locale (en)"""
  url: String!
  content: ProductContentCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: ProductCreateLocalizationsInput
}

input ProductCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  url: String!
}

input ProductCreateLocalizationInput {
  """Localization input"""
  data: ProductCreateLocalizationDataInput!
  locale: Locale!
}

input ProductCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [ProductCreateLocalizationInput!]
}

input ProductCreateManyInlineInput {
  """Create and connect multiple existing Product documents"""
  create: [ProductCreateInput!]
  """Connect multiple existing Product documents"""
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateOneInlineInput {
  """Create and connect one Product document"""
  create: ProductCreateInput
  """Connect one existing Product document"""
  connect: ProductWhereUniqueInput
}

"""An edge in a connection."""
type ProductEdge {
  """The item at the end of the edge."""
  node: Product!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input ProductManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [ProductWhereInput!]
  """Logical OR on all given filters."""
  OR: [ProductWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [ProductWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  url_ASC
  url_DESC
}

input ProductUpdateInput {
  """url input for default locale (en)"""
  url: String
  content: ProductContentUpdateManyInlineInput
  """Manage document localizations"""
  localizations: ProductUpdateLocalizationsInput
}

input ProductUpdateLocalizationDataInput {
  url: String
}

input ProductUpdateLocalizationInput {
  data: ProductUpdateLocalizationDataInput!
  locale: Locale!
}

input ProductUpdateLocalizationsInput {
  """Localizations to create"""
  create: [ProductCreateLocalizationInput!]
  """Localizations to update"""
  update: [ProductUpdateLocalizationInput!]
  upsert: [ProductUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input ProductUpdateManyInlineInput {
  """Create and connect multiple Product documents"""
  create: [ProductCreateInput!]
  """Connect multiple existing Product documents"""
  connect: [ProductConnectInput!]
  """Override currently-connected documents with multiple existing Product documents"""
  set: [ProductWhereUniqueInput!]
  """Update multiple Product documents"""
  update: [ProductUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple Product documents"""
  upsert: [ProductUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple Product documents"""
  disconnect: [ProductWhereUniqueInput!]
  """Delete multiple Product documents"""
  delete: [ProductWhereUniqueInput!]
}

input ProductUpdateManyInput {
  """No fields in updateMany data input"""
  _: String
}

input ProductUpdateManyWithNestedWhereInput {
  """Document search"""
  where: ProductWhereInput!
  """Update many input"""
  data: ProductUpdateManyInput!
}

input ProductUpdateOneInlineInput {
  """Create and connect one Product document"""
  create: ProductCreateInput
  """Update single Product document"""
  update: ProductUpdateWithNestedWhereUniqueInput
  """Upsert single Product document"""
  upsert: ProductUpsertWithNestedWhereUniqueInput
  """Connect existing Product document"""
  connect: ProductWhereUniqueInput
  """Disconnect currently connected Product document"""
  disconnect: Boolean
  """Delete currently connected Product document"""
  delete: Boolean
}

input ProductUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: ProductWhereUniqueInput!
  """Document to update"""
  data: ProductUpdateInput!
}

input ProductUpsertInput {
  """Create document if it didn't exist"""
  create: ProductCreateInput!
  """Update document if it exists"""
  update: ProductUpdateInput!
}

input ProductUpsertLocalizationInput {
  update: ProductUpdateLocalizationDataInput!
  create: ProductCreateLocalizationDataInput!
  locale: Locale!
}

input ProductUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: ProductWhereUniqueInput!
  """Upsert data"""
  data: ProductUpsertInput!
}

"""Identifies documents"""
input ProductWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [ProductWhereInput!]
  """Logical OR on all given filters."""
  OR: [ProductWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [ProductWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  url: String
  """All values that are not equal to given value."""
  url_not: String
  """All values that are contained in given list."""
  url_in: [String!]
  """All values that are not contained in given list."""
  url_not_in: [String!]
  """All values containing the given string."""
  url_contains: String
  """All values not containing the given string."""
  url_not_contains: String
  """All values starting with the given string."""
  url_starts_with: String
  """All values not starting with the given string."""
  url_not_starts_with: String
  """All values ending with the given string."""
  url_ends_with: String
  """All values not ending with the given string"""
  url_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
}

"""References Product record uniquely"""
input ProductWhereUniqueInput {
  id: ID
}

input PublishLocaleInput {
  """Locales to publish"""
  locale: Locale!
  """Stages to publish selected locales to"""
  stages: [Stage!]!
}

type Query {
  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Node\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Node
  """Retrieve multiple rowServiceOptionsMultiple"""
  rowServiceOptionsMultiple(
    where: RowServiceOptionsWhereInput
    orderBy: RowServiceOptionsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowServiceOptions\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowServiceOptions!]!
  """Retrieve a single rowServiceOptions"""
  rowServiceOptions(
    where: RowServiceOptionsWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowServiceOptions\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowServiceOptions
  """Retrieve multiple rowServiceOptionsMultiple using the Relay connection interface"""
  rowServiceOptionsMultipleConnection(
    where: RowServiceOptionsWhereInput
    orderBy: RowServiceOptionsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowServiceOptions\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowServiceOptionsConnection!
  """Retrieve document version"""
  rowServiceOptionsVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple productpages"""
  productpages(
    where: ProductWhereInput
    orderBy: ProductOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Product\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [Product!]!
  """Retrieve a single product"""
  product(
    where: ProductWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Product\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Product
  """Retrieve multiple productpages using the Relay connection interface"""
  productpagesConnection(
    where: ProductWhereInput
    orderBy: ProductOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Product\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): ProductConnection!
  """Retrieve document version"""
  productVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowHeroBanners"""
  rowHeroBanners(
    where: RowHeroBannerWhereInput
    orderBy: RowHeroBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowHeroBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowHeroBanner!]!
  """Retrieve a single rowHeroBanner"""
  rowHeroBanner(
    where: RowHeroBannerWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowHeroBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowHeroBanner
  """Retrieve multiple rowHeroBanners using the Relay connection interface"""
  rowHeroBannersConnection(
    where: RowHeroBannerWhereInput
    orderBy: RowHeroBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowHeroBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowHeroBannerConnection!
  """Retrieve document version"""
  rowHeroBannerVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowSwipeableGrids"""
  rowSwipeableGrids(
    where: RowSwipeableGridWhereInput
    orderBy: RowSwipeableGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSwipeableGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowSwipeableGrid!]!
  """Retrieve a single rowSwipeableGrid"""
  rowSwipeableGrid(
    where: RowSwipeableGridWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSwipeableGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowSwipeableGrid
  """Retrieve multiple rowSwipeableGrids using the Relay connection interface"""
  rowSwipeableGridsConnection(
    where: RowSwipeableGridWhereInput
    orderBy: RowSwipeableGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSwipeableGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowSwipeableGridConnection!
  """Retrieve document version"""
  rowSwipeableGridVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple pageLinks"""
  pageLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`PageLink\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [PageLink!]!
  """Retrieve a single pageLink"""
  pageLink(
    where: PageLinkWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`PageLink\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): PageLink
  """Retrieve multiple pageLinks using the Relay connection interface"""
  pageLinksConnection(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`PageLink\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): PageLinkConnection!
  """Retrieve document version"""
  pageLinkVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple magentoCategories"""
  magentoCategories(
    where: MagentoCategoryWhereInput
    orderBy: MagentoCategoryOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`MagentoCategory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [MagentoCategory!]!
  """Retrieve a single magentoCategory"""
  magentoCategory(
    where: MagentoCategoryWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`MagentoCategory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): MagentoCategory
  """Retrieve multiple magentoCategories using the Relay connection interface"""
  magentoCategoriesConnection(
    where: MagentoCategoryWhereInput
    orderBy: MagentoCategoryOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`MagentoCategory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): MagentoCategoryConnection!
  """Retrieve document version"""
  magentoCategoryVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductRelateds"""
  rowProductRelateds(
    where: RowProductRelatedWhereInput
    orderBy: RowProductRelatedOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductRelated\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductRelated!]!
  """Retrieve a single rowProductRelated"""
  rowProductRelated(
    where: RowProductRelatedWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductRelated\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductRelated
  """Retrieve multiple rowProductRelateds using the Relay connection interface"""
  rowProductRelatedsConnection(
    where: RowProductRelatedWhereInput
    orderBy: RowProductRelatedOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductRelated\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductRelatedConnection!
  """Retrieve document version"""
  rowProductRelatedVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductGrids"""
  rowProductGrids(
    where: RowProductGridWhereInput
    orderBy: RowProductGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductGrid!]!
  """Retrieve a single rowProductGrid"""
  rowProductGrid(
    where: RowProductGridWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductGrid
  """Retrieve multiple rowProductGrids using the Relay connection interface"""
  rowProductGridsConnection(
    where: RowProductGridWhereInput
    orderBy: RowProductGridOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductGrid\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductGridConnection!
  """Retrieve document version"""
  rowProductGridVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductReviewsMultiple"""
  rowProductReviewsMultiple(
    where: RowProductReviewsWhereInput
    orderBy: RowProductReviewsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductReviews\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductReviews!]!
  """Retrieve a single rowProductReviews"""
  rowProductReviews(
    where: RowProductReviewsWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductReviews\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductReviews
  """Retrieve multiple rowProductReviewsMultiple using the Relay connection interface"""
  rowProductReviewsMultipleConnection(
    where: RowProductReviewsWhereInput
    orderBy: RowProductReviewsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductReviews\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductReviewsConnection!
  """Retrieve document version"""
  rowProductReviewsVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple footers"""
  footers(
    where: FooterWhereInput
    orderBy: FooterOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Footer\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [Footer!]!
  """Retrieve a single footer"""
  footer(
    where: FooterWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Footer\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Footer
  """Retrieve multiple footers using the Relay connection interface"""
  footersConnection(
    where: FooterWhereInput
    orderBy: FooterOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Footer\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): FooterConnection!
  """Retrieve document version"""
  footerVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductBackstories"""
  rowProductBackstories(
    where: RowProductBackstoryWhereInput
    orderBy: RowProductBackstoryOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductBackstory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductBackstory!]!
  """Retrieve a single rowProductBackstory"""
  rowProductBackstory(
    where: RowProductBackstoryWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductBackstory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductBackstory
  """Retrieve multiple rowProductBackstories using the Relay connection interface"""
  rowProductBackstoriesConnection(
    where: RowProductBackstoryWhereInput
    orderBy: RowProductBackstoryOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductBackstory\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductBackstoryConnection!
  """Retrieve document version"""
  rowProductBackstoryVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowButtonLinkLists"""
  rowButtonLinkLists(
    where: RowButtonLinkListWhereInput
    orderBy: RowButtonLinkListOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowButtonLinkList\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowButtonLinkList!]!
  """Retrieve a single rowButtonLinkList"""
  rowButtonLinkList(
    where: RowButtonLinkListWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowButtonLinkList\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowButtonLinkList
  """Retrieve multiple rowButtonLinkLists using the Relay connection interface"""
  rowButtonLinkListsConnection(
    where: RowButtonLinkListWhereInput
    orderBy: RowButtonLinkListOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowButtonLinkList\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowButtonLinkListConnection!
  """Retrieve document version"""
  rowButtonLinkListVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductFeatureBoxeds"""
  rowProductFeatureBoxeds(
    where: RowProductFeatureBoxedWhereInput
    orderBy: RowProductFeatureBoxedOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeatureBoxed\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductFeatureBoxed!]!
  """Retrieve a single rowProductFeatureBoxed"""
  rowProductFeatureBoxed(
    where: RowProductFeatureBoxedWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeatureBoxed\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductFeatureBoxed
  """Retrieve multiple rowProductFeatureBoxeds using the Relay connection interface"""
  rowProductFeatureBoxedsConnection(
    where: RowProductFeatureBoxedWhereInput
    orderBy: RowProductFeatureBoxedOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeatureBoxed\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductFeatureBoxedConnection!
  """Retrieve document version"""
  rowProductFeatureBoxedVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductUpsellsMultiple"""
  rowProductUpsellsMultiple(
    where: RowProductUpsellsWhereInput
    orderBy: RowProductUpsellsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductUpsells\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductUpsells!]!
  """Retrieve a single rowProductUpsells"""
  rowProductUpsells(
    where: RowProductUpsellsWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductUpsells\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductUpsells
  """Retrieve multiple rowProductUpsellsMultiple using the Relay connection interface"""
  rowProductUpsellsMultipleConnection(
    where: RowProductUpsellsWhereInput
    orderBy: RowProductUpsellsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductUpsells\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductUpsellsConnection!
  """Retrieve document version"""
  rowProductUpsellsVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowQuotes"""
  rowQuotes(
    where: RowQuoteWhereInput
    orderBy: RowQuoteOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowQuote\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowQuote!]!
  """Retrieve a single rowQuote"""
  rowQuote(
    where: RowQuoteWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowQuote\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowQuote
  """Retrieve multiple rowQuotes using the Relay connection interface"""
  rowQuotesConnection(
    where: RowQuoteWhereInput
    orderBy: RowQuoteOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowQuote\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowQuoteConnection!
  """Retrieve document version"""
  rowQuoteVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductSpecsMultiple"""
  rowProductSpecsMultiple(
    where: RowProductSpecsWhereInput
    orderBy: RowProductSpecsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductSpecs\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductSpecs!]!
  """Retrieve a single rowProductSpecs"""
  rowProductSpecs(
    where: RowProductSpecsWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductSpecs\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductSpecs
  """Retrieve multiple rowProductSpecsMultiple using the Relay connection interface"""
  rowProductSpecsMultipleConnection(
    where: RowProductSpecsWhereInput
    orderBy: RowProductSpecsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductSpecs\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductSpecsConnection!
  """Retrieve document version"""
  rowProductSpecsVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowBlogContents"""
  rowBlogContents(
    where: RowBlogContentWhereInput
    orderBy: RowBlogContentOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowBlogContent\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowBlogContent!]!
  """Retrieve a single rowBlogContent"""
  rowBlogContent(
    where: RowBlogContentWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowBlogContent\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowBlogContent
  """Retrieve multiple rowBlogContents using the Relay connection interface"""
  rowBlogContentsConnection(
    where: RowBlogContentWhereInput
    orderBy: RowBlogContentOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowBlogContent\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowBlogContentConnection!
  """Retrieve document version"""
  rowBlogContentVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowSpecialBanners"""
  rowSpecialBanners(
    where: RowSpecialBannerWhereInput
    orderBy: RowSpecialBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSpecialBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowSpecialBanner!]!
  """Retrieve a single rowSpecialBanner"""
  rowSpecialBanner(
    where: RowSpecialBannerWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSpecialBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowSpecialBanner
  """Retrieve multiple rowSpecialBanners using the Relay connection interface"""
  rowSpecialBannersConnection(
    where: RowSpecialBannerWhereInput
    orderBy: RowSpecialBannerOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowSpecialBanner\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowSpecialBannerConnection!
  """Retrieve document version"""
  rowSpecialBannerVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowProductFeatures"""
  rowProductFeatures(
    where: RowProductFeatureWhereInput
    orderBy: RowProductFeatureOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeature\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowProductFeature!]!
  """Retrieve a single rowProductFeature"""
  rowProductFeature(
    where: RowProductFeatureWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeature\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductFeature
  """Retrieve multiple rowProductFeatures using the Relay connection interface"""
  rowProductFeaturesConnection(
    where: RowProductFeatureWhereInput
    orderBy: RowProductFeatureOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowProductFeature\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowProductFeatureConnection!
  """Retrieve document version"""
  rowProductFeatureVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple uspsMultiple"""
  uspsMultiple(
    where: UspsWhereInput
    orderBy: UspsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Usps\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [Usps!]!
  """Retrieve a single usps"""
  usps(
    where: UspsWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Usps\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Usps
  """Retrieve multiple uspsMultiple using the Relay connection interface"""
  uspsMultipleConnection(
    where: UspsWhereInput
    orderBy: UspsOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Usps\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): UspsConnection!
  """Retrieve document version"""
  uspsVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowContentLinksMultiple"""
  rowContentLinksMultiple(
    where: RowContentLinksWhereInput
    orderBy: RowContentLinksOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowContentLinks\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowContentLinks!]!
  """Retrieve a single rowContentLinks"""
  rowContentLinks(
    where: RowContentLinksWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowContentLinks\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowContentLinks
  """Retrieve multiple rowContentLinksMultiple using the Relay connection interface"""
  rowContentLinksMultipleConnection(
    where: RowContentLinksWhereInput
    orderBy: RowContentLinksOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowContentLinks\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowContentLinksConnection!
  """Retrieve document version"""
  rowContentLinksVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowColumnOnes"""
  rowColumnOnes(
    where: RowColumnOneWhereInput
    orderBy: RowColumnOneOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnOne\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowColumnOne!]!
  """Retrieve a single rowColumnOne"""
  rowColumnOne(
    where: RowColumnOneWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnOne\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnOne
  """Retrieve multiple rowColumnOnes using the Relay connection interface"""
  rowColumnOnesConnection(
    where: RowColumnOneWhereInput
    orderBy: RowColumnOneOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnOne\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnOneConnection!
  """Retrieve document version"""
  rowColumnOneVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowColumnTwos"""
  rowColumnTwos(
    where: RowColumnTwoWhereInput
    orderBy: RowColumnTwoOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnTwo\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowColumnTwo!]!
  """Retrieve a single rowColumnTwo"""
  rowColumnTwo(
    where: RowColumnTwoWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnTwo\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnTwo
  """Retrieve multiple rowColumnTwos using the Relay connection interface"""
  rowColumnTwosConnection(
    where: RowColumnTwoWhereInput
    orderBy: RowColumnTwoOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnTwo\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnTwoConnection!
  """Retrieve document version"""
  rowColumnTwoVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple rowColumnThrees"""
  rowColumnThrees(
    where: RowColumnThreeWhereInput
    orderBy: RowColumnThreeOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnThree\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [RowColumnThree!]!
  """Retrieve a single rowColumnThree"""
  rowColumnThree(
    where: RowColumnThreeWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnThree\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnThree
  """Retrieve multiple rowColumnThrees using the Relay connection interface"""
  rowColumnThreesConnection(
    where: RowColumnThreeWhereInput
    orderBy: RowColumnThreeOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`RowColumnThree\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): RowColumnThreeConnection!
  """Retrieve document version"""
  rowColumnThreeVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple pages"""
  pages(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Page\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [Page!]!
  """Retrieve a single page"""
  page(
    where: PageWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Page\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Page
  """Retrieve multiple pages using the Relay connection interface"""
  pagesConnection(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Page\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): PageConnection!
  """Retrieve document version"""
  pageVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple assets"""
  assets(
    where: AssetWhereInput
    orderBy: AssetOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Asset\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [Asset!]!
  """Retrieve a single asset"""
  asset(
    where: AssetWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Asset\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): Asset
  """Retrieve multiple assets using the Relay connection interface"""
  assetsConnection(
    where: AssetWhereInput
    orderBy: AssetOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`Asset\` will be affected directly by this argument, as well as any other related models with localized fields in the query's subtree.
    The first locale matching the provided list will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): AssetConnection!
  """Retrieve document version"""
  assetVersion(where: VersionWhereInput!): DocumentVersion
  """Retrieve multiple users"""
  users(
    where: UserWhereInput
    orderBy: UserOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`User\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): [User!]!
  """Retrieve a single user"""
  user(
    where: UserWhereUniqueInput!
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`User\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): User
  """Retrieve multiple users using the Relay connection interface"""
  usersConnection(
    where: UserWhereInput
    orderBy: UserOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    stage: Stage! = DRAFT
    """
    Defines which locales should be returned.
    
    Note that \`User\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument may be overwritten by another locales definition in a relational child field, this will effectively use the overwritten argument for the affected query's subtree.
    """
    locales: [Locale!]! = [en]
  ): UserConnection!
}

"""Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()"""
type RGBA {
  r: RGBAHue!
  g: RGBAHue!
  b: RGBAHue!
  a: RGBATransparency!
}

scalar RGBAHue

"""Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba()"""
input RGBAInput {
  r: RGBAHue!
  g: RGBAHue!
  b: RGBAHue!
  a: RGBATransparency!
}

scalar RGBATransparency

"""Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values"""
type RichText {
  """Returns AST representation"""
  raw: RichTextAST!
  """Returns HTMl representation"""
  html: String!
  """Returns Markdown representation"""
  markdown: String!
  """Returns plain-text contents of RichText"""
  text: String!
}

"""Slate-compatible RichText AST"""
scalar RichTextAST

type RowBlogContent implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowBlogContent!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowBlogContent!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  content: RichText
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowBlogContent versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowBlogContentConnectInput {
  """Document to connect"""
  where: RowBlogContentWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowBlogContentConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowBlogContentEdge!]!
  aggregate: Aggregate!
}

input RowBlogContentCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """content input for default locale (en)"""
  content: RichTextAST
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowBlogContentCreateLocalizationsInput
}

input RowBlogContentCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  content: RichTextAST
}

input RowBlogContentCreateLocalizationInput {
  """Localization input"""
  data: RowBlogContentCreateLocalizationDataInput!
  locale: Locale!
}

input RowBlogContentCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowBlogContentCreateLocalizationInput!]
}

input RowBlogContentCreateManyInlineInput {
  """Create and connect multiple existing RowBlogContent documents"""
  create: [RowBlogContentCreateInput!]
  """Connect multiple existing RowBlogContent documents"""
  connect: [RowBlogContentWhereUniqueInput!]
}

input RowBlogContentCreateOneInlineInput {
  """Create and connect one RowBlogContent document"""
  create: RowBlogContentCreateInput
  """Connect one existing RowBlogContent document"""
  connect: RowBlogContentWhereUniqueInput
}

"""An edge in a connection."""
type RowBlogContentEdge {
  """The item at the end of the edge."""
  node: RowBlogContent!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowBlogContentManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowBlogContentWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowBlogContentWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowBlogContentWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowBlogContentOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowBlogContentUpdateInput {
  identity: String
  """content input for default locale (en)"""
  content: RichTextAST
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowBlogContentUpdateLocalizationsInput
}

input RowBlogContentUpdateLocalizationDataInput {
  content: RichTextAST
}

input RowBlogContentUpdateLocalizationInput {
  data: RowBlogContentUpdateLocalizationDataInput!
  locale: Locale!
}

input RowBlogContentUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowBlogContentCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowBlogContentUpdateLocalizationInput!]
  upsert: [RowBlogContentUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowBlogContentUpdateManyInlineInput {
  """Create and connect multiple RowBlogContent documents"""
  create: [RowBlogContentCreateInput!]
  """Connect multiple existing RowBlogContent documents"""
  connect: [RowBlogContentConnectInput!]
  """Override currently-connected documents with multiple existing RowBlogContent documents"""
  set: [RowBlogContentWhereUniqueInput!]
  """Update multiple RowBlogContent documents"""
  update: [RowBlogContentUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowBlogContent documents"""
  upsert: [RowBlogContentUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowBlogContent documents"""
  disconnect: [RowBlogContentWhereUniqueInput!]
  """Delete multiple RowBlogContent documents"""
  delete: [RowBlogContentWhereUniqueInput!]
}

input RowBlogContentUpdateManyInput {
  """content input for default locale (en)"""
  content: RichTextAST
  """Optional updates to localizations"""
  localizations: RowBlogContentUpdateManyLocalizationsInput
}

input RowBlogContentUpdateManyLocalizationDataInput {
  content: RichTextAST
}

input RowBlogContentUpdateManyLocalizationInput {
  data: RowBlogContentUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowBlogContentUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowBlogContentUpdateManyLocalizationInput!]
}

input RowBlogContentUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowBlogContentWhereInput!
  """Update many input"""
  data: RowBlogContentUpdateManyInput!
}

input RowBlogContentUpdateOneInlineInput {
  """Create and connect one RowBlogContent document"""
  create: RowBlogContentCreateInput
  """Update single RowBlogContent document"""
  update: RowBlogContentUpdateWithNestedWhereUniqueInput
  """Upsert single RowBlogContent document"""
  upsert: RowBlogContentUpsertWithNestedWhereUniqueInput
  """Connect existing RowBlogContent document"""
  connect: RowBlogContentWhereUniqueInput
  """Disconnect currently connected RowBlogContent document"""
  disconnect: Boolean
  """Delete currently connected RowBlogContent document"""
  delete: Boolean
}

input RowBlogContentUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowBlogContentWhereUniqueInput!
  """Document to update"""
  data: RowBlogContentUpdateInput!
}

input RowBlogContentUpsertInput {
  """Create document if it didn't exist"""
  create: RowBlogContentCreateInput!
  """Update document if it exists"""
  update: RowBlogContentUpdateInput!
}

input RowBlogContentUpsertLocalizationInput {
  update: RowBlogContentUpdateLocalizationDataInput!
  create: RowBlogContentCreateLocalizationDataInput!
  locale: Locale!
}

input RowBlogContentUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowBlogContentWhereUniqueInput!
  """Upsert data"""
  data: RowBlogContentUpsertInput!
}

"""Identifies documents"""
input RowBlogContentWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowBlogContentWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowBlogContentWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowBlogContentWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowBlogContent record uniquely"""
input RowBlogContentWhereUniqueInput {
  id: ID
  identity: String
}

type RowButtonLinkList implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowButtonLinkList!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowButtonLinkList!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  links(
    where: PageWhereInput
    orderBy: PageOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`links\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowButtonLinkList versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowButtonLinkListConnectInput {
  """Document to connect"""
  where: RowButtonLinkListWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowButtonLinkListConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowButtonLinkListEdge!]!
  aggregate: Aggregate!
}

input RowButtonLinkListCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  links: PageCreateManyInlineInput
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowButtonLinkListCreateLocalizationsInput
}

input RowButtonLinkListCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowButtonLinkListCreateLocalizationInput {
  """Localization input"""
  data: RowButtonLinkListCreateLocalizationDataInput!
  locale: Locale!
}

input RowButtonLinkListCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowButtonLinkListCreateLocalizationInput!]
}

input RowButtonLinkListCreateManyInlineInput {
  """Create and connect multiple existing RowButtonLinkList documents"""
  create: [RowButtonLinkListCreateInput!]
  """Connect multiple existing RowButtonLinkList documents"""
  connect: [RowButtonLinkListWhereUniqueInput!]
}

input RowButtonLinkListCreateOneInlineInput {
  """Create and connect one RowButtonLinkList document"""
  create: RowButtonLinkListCreateInput
  """Connect one existing RowButtonLinkList document"""
  connect: RowButtonLinkListWhereUniqueInput
}

"""An edge in a connection."""
type RowButtonLinkListEdge {
  """The item at the end of the edge."""
  node: RowButtonLinkList!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowButtonLinkListManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowButtonLinkListWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowButtonLinkListWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowButtonLinkListWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  links_every: PageWhereInput
  links_some: PageWhereInput
  links_none: PageWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowButtonLinkListOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowButtonLinkListUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  links: PageUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowButtonLinkListUpdateLocalizationsInput
}

input RowButtonLinkListUpdateLocalizationDataInput {
  title: String
}

input RowButtonLinkListUpdateLocalizationInput {
  data: RowButtonLinkListUpdateLocalizationDataInput!
  locale: Locale!
}

input RowButtonLinkListUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowButtonLinkListCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowButtonLinkListUpdateLocalizationInput!]
  upsert: [RowButtonLinkListUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowButtonLinkListUpdateManyInlineInput {
  """Create and connect multiple RowButtonLinkList documents"""
  create: [RowButtonLinkListCreateInput!]
  """Connect multiple existing RowButtonLinkList documents"""
  connect: [RowButtonLinkListConnectInput!]
  """Override currently-connected documents with multiple existing RowButtonLinkList documents"""
  set: [RowButtonLinkListWhereUniqueInput!]
  """Update multiple RowButtonLinkList documents"""
  update: [RowButtonLinkListUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowButtonLinkList documents"""
  upsert: [RowButtonLinkListUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowButtonLinkList documents"""
  disconnect: [RowButtonLinkListWhereUniqueInput!]
  """Delete multiple RowButtonLinkList documents"""
  delete: [RowButtonLinkListWhereUniqueInput!]
}

input RowButtonLinkListUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowButtonLinkListUpdateManyLocalizationsInput
}

input RowButtonLinkListUpdateManyLocalizationDataInput {
  title: String
}

input RowButtonLinkListUpdateManyLocalizationInput {
  data: RowButtonLinkListUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowButtonLinkListUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowButtonLinkListUpdateManyLocalizationInput!]
}

input RowButtonLinkListUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowButtonLinkListWhereInput!
  """Update many input"""
  data: RowButtonLinkListUpdateManyInput!
}

input RowButtonLinkListUpdateOneInlineInput {
  """Create and connect one RowButtonLinkList document"""
  create: RowButtonLinkListCreateInput
  """Update single RowButtonLinkList document"""
  update: RowButtonLinkListUpdateWithNestedWhereUniqueInput
  """Upsert single RowButtonLinkList document"""
  upsert: RowButtonLinkListUpsertWithNestedWhereUniqueInput
  """Connect existing RowButtonLinkList document"""
  connect: RowButtonLinkListWhereUniqueInput
  """Disconnect currently connected RowButtonLinkList document"""
  disconnect: Boolean
  """Delete currently connected RowButtonLinkList document"""
  delete: Boolean
}

input RowButtonLinkListUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowButtonLinkListWhereUniqueInput!
  """Document to update"""
  data: RowButtonLinkListUpdateInput!
}

input RowButtonLinkListUpsertInput {
  """Create document if it didn't exist"""
  create: RowButtonLinkListCreateInput!
  """Update document if it exists"""
  update: RowButtonLinkListUpdateInput!
}

input RowButtonLinkListUpsertLocalizationInput {
  update: RowButtonLinkListUpdateLocalizationDataInput!
  create: RowButtonLinkListCreateLocalizationDataInput!
  locale: Locale!
}

input RowButtonLinkListUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowButtonLinkListWhereUniqueInput!
  """Upsert data"""
  data: RowButtonLinkListUpsertInput!
}

"""Identifies documents"""
input RowButtonLinkListWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowButtonLinkListWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowButtonLinkListWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowButtonLinkListWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  links_every: PageWhereInput
  links_some: PageWhereInput
  links_none: PageWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowButtonLinkList record uniquely"""
input RowButtonLinkListWhereUniqueInput {
  id: ID
  identity: String
}

type RowColumnOne implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowColumnOne!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowColumnOne!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  colOne: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowColumnOne versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowColumnOneConnectInput {
  """Document to connect"""
  where: RowColumnOneWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowColumnOneConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowColumnOneEdge!]!
  aggregate: Aggregate!
}

input RowColumnOneCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """colOne input for default locale (en)"""
  colOne: RichTextAST!
  productpages: ProductCreateManyInlineInput
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowColumnOneCreateLocalizationsInput
}

input RowColumnOneCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  colOne: RichTextAST!
}

input RowColumnOneCreateLocalizationInput {
  """Localization input"""
  data: RowColumnOneCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnOneCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowColumnOneCreateLocalizationInput!]
}

input RowColumnOneCreateManyInlineInput {
  """Create and connect multiple existing RowColumnOne documents"""
  create: [RowColumnOneCreateInput!]
  """Connect multiple existing RowColumnOne documents"""
  connect: [RowColumnOneWhereUniqueInput!]
}

input RowColumnOneCreateOneInlineInput {
  """Create and connect one RowColumnOne document"""
  create: RowColumnOneCreateInput
  """Connect one existing RowColumnOne document"""
  connect: RowColumnOneWhereUniqueInput
}

"""An edge in a connection."""
type RowColumnOneEdge {
  """The item at the end of the edge."""
  node: RowColumnOne!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowColumnOneManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnOneWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnOneWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnOneWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowColumnOneOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowColumnOneUpdateInput {
  identity: String
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  productpages: ProductUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowColumnOneUpdateLocalizationsInput
}

input RowColumnOneUpdateLocalizationDataInput {
  colOne: RichTextAST
}

input RowColumnOneUpdateLocalizationInput {
  data: RowColumnOneUpdateLocalizationDataInput!
  locale: Locale!
}

input RowColumnOneUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowColumnOneCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowColumnOneUpdateLocalizationInput!]
  upsert: [RowColumnOneUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowColumnOneUpdateManyInlineInput {
  """Create and connect multiple RowColumnOne documents"""
  create: [RowColumnOneCreateInput!]
  """Connect multiple existing RowColumnOne documents"""
  connect: [RowColumnOneConnectInput!]
  """Override currently-connected documents with multiple existing RowColumnOne documents"""
  set: [RowColumnOneWhereUniqueInput!]
  """Update multiple RowColumnOne documents"""
  update: [RowColumnOneUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowColumnOne documents"""
  upsert: [RowColumnOneUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowColumnOne documents"""
  disconnect: [RowColumnOneWhereUniqueInput!]
  """Delete multiple RowColumnOne documents"""
  delete: [RowColumnOneWhereUniqueInput!]
}

input RowColumnOneUpdateManyInput {
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  """Optional updates to localizations"""
  localizations: RowColumnOneUpdateManyLocalizationsInput
}

input RowColumnOneUpdateManyLocalizationDataInput {
  colOne: RichTextAST
}

input RowColumnOneUpdateManyLocalizationInput {
  data: RowColumnOneUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowColumnOneUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowColumnOneUpdateManyLocalizationInput!]
}

input RowColumnOneUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowColumnOneWhereInput!
  """Update many input"""
  data: RowColumnOneUpdateManyInput!
}

input RowColumnOneUpdateOneInlineInput {
  """Create and connect one RowColumnOne document"""
  create: RowColumnOneCreateInput
  """Update single RowColumnOne document"""
  update: RowColumnOneUpdateWithNestedWhereUniqueInput
  """Upsert single RowColumnOne document"""
  upsert: RowColumnOneUpsertWithNestedWhereUniqueInput
  """Connect existing RowColumnOne document"""
  connect: RowColumnOneWhereUniqueInput
  """Disconnect currently connected RowColumnOne document"""
  disconnect: Boolean
  """Delete currently connected RowColumnOne document"""
  delete: Boolean
}

input RowColumnOneUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnOneWhereUniqueInput!
  """Document to update"""
  data: RowColumnOneUpdateInput!
}

input RowColumnOneUpsertInput {
  """Create document if it didn't exist"""
  create: RowColumnOneCreateInput!
  """Update document if it exists"""
  update: RowColumnOneUpdateInput!
}

input RowColumnOneUpsertLocalizationInput {
  update: RowColumnOneUpdateLocalizationDataInput!
  create: RowColumnOneCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnOneUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnOneWhereUniqueInput!
  """Upsert data"""
  data: RowColumnOneUpsertInput!
}

"""Identifies documents"""
input RowColumnOneWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnOneWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnOneWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnOneWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowColumnOne record uniquely"""
input RowColumnOneWhereUniqueInput {
  id: ID
  identity: String
}

type RowColumnThree implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowColumnThree!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowColumnThree!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  colOne: RichText!
  colTwo: RichText!
  colThree: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowColumnThree versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowColumnThreeConnectInput {
  """Document to connect"""
  where: RowColumnThreeWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowColumnThreeConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowColumnThreeEdge!]!
  aggregate: Aggregate!
}

input RowColumnThreeCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """colOne input for default locale (en)"""
  colOne: RichTextAST!
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST!
  """colThree input for default locale (en)"""
  colThree: RichTextAST!
  pages: PageCreateManyInlineInput
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowColumnThreeCreateLocalizationsInput
}

input RowColumnThreeCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  colOne: RichTextAST!
  colTwo: RichTextAST!
  colThree: RichTextAST!
}

input RowColumnThreeCreateLocalizationInput {
  """Localization input"""
  data: RowColumnThreeCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnThreeCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowColumnThreeCreateLocalizationInput!]
}

input RowColumnThreeCreateManyInlineInput {
  """Create and connect multiple existing RowColumnThree documents"""
  create: [RowColumnThreeCreateInput!]
  """Connect multiple existing RowColumnThree documents"""
  connect: [RowColumnThreeWhereUniqueInput!]
}

input RowColumnThreeCreateOneInlineInput {
  """Create and connect one RowColumnThree document"""
  create: RowColumnThreeCreateInput
  """Connect one existing RowColumnThree document"""
  connect: RowColumnThreeWhereUniqueInput
}

"""An edge in a connection."""
type RowColumnThreeEdge {
  """The item at the end of the edge."""
  node: RowColumnThree!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowColumnThreeManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnThreeWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnThreeWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnThreeWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowColumnThreeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowColumnThreeUpdateInput {
  identity: String
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST
  """colThree input for default locale (en)"""
  colThree: RichTextAST
  pages: PageUpdateManyInlineInput
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowColumnThreeUpdateLocalizationsInput
}

input RowColumnThreeUpdateLocalizationDataInput {
  colOne: RichTextAST
  colTwo: RichTextAST
  colThree: RichTextAST
}

input RowColumnThreeUpdateLocalizationInput {
  data: RowColumnThreeUpdateLocalizationDataInput!
  locale: Locale!
}

input RowColumnThreeUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowColumnThreeCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowColumnThreeUpdateLocalizationInput!]
  upsert: [RowColumnThreeUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowColumnThreeUpdateManyInlineInput {
  """Create and connect multiple RowColumnThree documents"""
  create: [RowColumnThreeCreateInput!]
  """Connect multiple existing RowColumnThree documents"""
  connect: [RowColumnThreeConnectInput!]
  """Override currently-connected documents with multiple existing RowColumnThree documents"""
  set: [RowColumnThreeWhereUniqueInput!]
  """Update multiple RowColumnThree documents"""
  update: [RowColumnThreeUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowColumnThree documents"""
  upsert: [RowColumnThreeUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowColumnThree documents"""
  disconnect: [RowColumnThreeWhereUniqueInput!]
  """Delete multiple RowColumnThree documents"""
  delete: [RowColumnThreeWhereUniqueInput!]
}

input RowColumnThreeUpdateManyInput {
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST
  """colThree input for default locale (en)"""
  colThree: RichTextAST
  """Optional updates to localizations"""
  localizations: RowColumnThreeUpdateManyLocalizationsInput
}

input RowColumnThreeUpdateManyLocalizationDataInput {
  colOne: RichTextAST
  colTwo: RichTextAST
  colThree: RichTextAST
}

input RowColumnThreeUpdateManyLocalizationInput {
  data: RowColumnThreeUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowColumnThreeUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowColumnThreeUpdateManyLocalizationInput!]
}

input RowColumnThreeUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowColumnThreeWhereInput!
  """Update many input"""
  data: RowColumnThreeUpdateManyInput!
}

input RowColumnThreeUpdateOneInlineInput {
  """Create and connect one RowColumnThree document"""
  create: RowColumnThreeCreateInput
  """Update single RowColumnThree document"""
  update: RowColumnThreeUpdateWithNestedWhereUniqueInput
  """Upsert single RowColumnThree document"""
  upsert: RowColumnThreeUpsertWithNestedWhereUniqueInput
  """Connect existing RowColumnThree document"""
  connect: RowColumnThreeWhereUniqueInput
  """Disconnect currently connected RowColumnThree document"""
  disconnect: Boolean
  """Delete currently connected RowColumnThree document"""
  delete: Boolean
}

input RowColumnThreeUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnThreeWhereUniqueInput!
  """Document to update"""
  data: RowColumnThreeUpdateInput!
}

input RowColumnThreeUpsertInput {
  """Create document if it didn't exist"""
  create: RowColumnThreeCreateInput!
  """Update document if it exists"""
  update: RowColumnThreeUpdateInput!
}

input RowColumnThreeUpsertLocalizationInput {
  update: RowColumnThreeUpdateLocalizationDataInput!
  create: RowColumnThreeCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnThreeUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnThreeWhereUniqueInput!
  """Upsert data"""
  data: RowColumnThreeUpsertInput!
}

"""Identifies documents"""
input RowColumnThreeWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnThreeWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnThreeWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnThreeWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowColumnThree record uniquely"""
input RowColumnThreeWhereUniqueInput {
  id: ID
  identity: String
}

type RowColumnTwo implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowColumnTwo!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowColumnTwo!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  colOne: RichText!
  colTwo: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowColumnTwo versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowColumnTwoConnectInput {
  """Document to connect"""
  where: RowColumnTwoWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowColumnTwoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowColumnTwoEdge!]!
  aggregate: Aggregate!
}

input RowColumnTwoCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """colOne input for default locale (en)"""
  colOne: RichTextAST!
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST!
  pages: PageCreateManyInlineInput
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowColumnTwoCreateLocalizationsInput
}

input RowColumnTwoCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  colOne: RichTextAST!
  colTwo: RichTextAST!
}

input RowColumnTwoCreateLocalizationInput {
  """Localization input"""
  data: RowColumnTwoCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnTwoCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowColumnTwoCreateLocalizationInput!]
}

input RowColumnTwoCreateManyInlineInput {
  """Create and connect multiple existing RowColumnTwo documents"""
  create: [RowColumnTwoCreateInput!]
  """Connect multiple existing RowColumnTwo documents"""
  connect: [RowColumnTwoWhereUniqueInput!]
}

input RowColumnTwoCreateOneInlineInput {
  """Create and connect one RowColumnTwo document"""
  create: RowColumnTwoCreateInput
  """Connect one existing RowColumnTwo document"""
  connect: RowColumnTwoWhereUniqueInput
}

"""An edge in a connection."""
type RowColumnTwoEdge {
  """The item at the end of the edge."""
  node: RowColumnTwo!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowColumnTwoManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnTwoWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnTwoWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnTwoWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowColumnTwoOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowColumnTwoUpdateInput {
  identity: String
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST
  pages: PageUpdateManyInlineInput
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowColumnTwoUpdateLocalizationsInput
}

input RowColumnTwoUpdateLocalizationDataInput {
  colOne: RichTextAST
  colTwo: RichTextAST
}

input RowColumnTwoUpdateLocalizationInput {
  data: RowColumnTwoUpdateLocalizationDataInput!
  locale: Locale!
}

input RowColumnTwoUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowColumnTwoCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowColumnTwoUpdateLocalizationInput!]
  upsert: [RowColumnTwoUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowColumnTwoUpdateManyInlineInput {
  """Create and connect multiple RowColumnTwo documents"""
  create: [RowColumnTwoCreateInput!]
  """Connect multiple existing RowColumnTwo documents"""
  connect: [RowColumnTwoConnectInput!]
  """Override currently-connected documents with multiple existing RowColumnTwo documents"""
  set: [RowColumnTwoWhereUniqueInput!]
  """Update multiple RowColumnTwo documents"""
  update: [RowColumnTwoUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowColumnTwo documents"""
  upsert: [RowColumnTwoUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowColumnTwo documents"""
  disconnect: [RowColumnTwoWhereUniqueInput!]
  """Delete multiple RowColumnTwo documents"""
  delete: [RowColumnTwoWhereUniqueInput!]
}

input RowColumnTwoUpdateManyInput {
  """colOne input for default locale (en)"""
  colOne: RichTextAST
  """colTwo input for default locale (en)"""
  colTwo: RichTextAST
  """Optional updates to localizations"""
  localizations: RowColumnTwoUpdateManyLocalizationsInput
}

input RowColumnTwoUpdateManyLocalizationDataInput {
  colOne: RichTextAST
  colTwo: RichTextAST
}

input RowColumnTwoUpdateManyLocalizationInput {
  data: RowColumnTwoUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowColumnTwoUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowColumnTwoUpdateManyLocalizationInput!]
}

input RowColumnTwoUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowColumnTwoWhereInput!
  """Update many input"""
  data: RowColumnTwoUpdateManyInput!
}

input RowColumnTwoUpdateOneInlineInput {
  """Create and connect one RowColumnTwo document"""
  create: RowColumnTwoCreateInput
  """Update single RowColumnTwo document"""
  update: RowColumnTwoUpdateWithNestedWhereUniqueInput
  """Upsert single RowColumnTwo document"""
  upsert: RowColumnTwoUpsertWithNestedWhereUniqueInput
  """Connect existing RowColumnTwo document"""
  connect: RowColumnTwoWhereUniqueInput
  """Disconnect currently connected RowColumnTwo document"""
  disconnect: Boolean
  """Delete currently connected RowColumnTwo document"""
  delete: Boolean
}

input RowColumnTwoUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnTwoWhereUniqueInput!
  """Document to update"""
  data: RowColumnTwoUpdateInput!
}

input RowColumnTwoUpsertInput {
  """Create document if it didn't exist"""
  create: RowColumnTwoCreateInput!
  """Update document if it exists"""
  update: RowColumnTwoUpdateInput!
}

input RowColumnTwoUpsertLocalizationInput {
  update: RowColumnTwoUpdateLocalizationDataInput!
  create: RowColumnTwoCreateLocalizationDataInput!
  locale: Locale!
}

input RowColumnTwoUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowColumnTwoWhereUniqueInput!
  """Upsert data"""
  data: RowColumnTwoUpsertInput!
}

"""Identifies documents"""
input RowColumnTwoWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowColumnTwoWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowColumnTwoWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowColumnTwoWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowColumnTwo record uniquely"""
input RowColumnTwoWhereUniqueInput {
  id: ID
  identity: String
}

type RowContentLinks implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowContentLinks!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowContentLinks!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  contentLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`contentLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowContentLinks versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowContentLinksConnectInput {
  """Document to connect"""
  where: RowContentLinksWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowContentLinksConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowContentLinksEdge!]!
  aggregate: Aggregate!
}

input RowContentLinksCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  contentLinks: PageLinkCreateManyInlineInput
  pages: PageCreateManyInlineInput
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowContentLinksCreateLocalizationsInput
}

input RowContentLinksCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowContentLinksCreateLocalizationInput {
  """Localization input"""
  data: RowContentLinksCreateLocalizationDataInput!
  locale: Locale!
}

input RowContentLinksCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowContentLinksCreateLocalizationInput!]
}

input RowContentLinksCreateManyInlineInput {
  """Create and connect multiple existing RowContentLinks documents"""
  create: [RowContentLinksCreateInput!]
  """Connect multiple existing RowContentLinks documents"""
  connect: [RowContentLinksWhereUniqueInput!]
}

input RowContentLinksCreateOneInlineInput {
  """Create and connect one RowContentLinks document"""
  create: RowContentLinksCreateInput
  """Connect one existing RowContentLinks document"""
  connect: RowContentLinksWhereUniqueInput
}

"""An edge in a connection."""
type RowContentLinksEdge {
  """The item at the end of the edge."""
  node: RowContentLinks!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowContentLinksManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowContentLinksWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowContentLinksWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowContentLinksWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  contentLinks_every: PageLinkWhereInput
  contentLinks_some: PageLinkWhereInput
  contentLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowContentLinksOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowContentLinksUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  contentLinks: PageLinkUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowContentLinksUpdateLocalizationsInput
}

input RowContentLinksUpdateLocalizationDataInput {
  title: String
}

input RowContentLinksUpdateLocalizationInput {
  data: RowContentLinksUpdateLocalizationDataInput!
  locale: Locale!
}

input RowContentLinksUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowContentLinksCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowContentLinksUpdateLocalizationInput!]
  upsert: [RowContentLinksUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowContentLinksUpdateManyInlineInput {
  """Create and connect multiple RowContentLinks documents"""
  create: [RowContentLinksCreateInput!]
  """Connect multiple existing RowContentLinks documents"""
  connect: [RowContentLinksConnectInput!]
  """Override currently-connected documents with multiple existing RowContentLinks documents"""
  set: [RowContentLinksWhereUniqueInput!]
  """Update multiple RowContentLinks documents"""
  update: [RowContentLinksUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowContentLinks documents"""
  upsert: [RowContentLinksUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowContentLinks documents"""
  disconnect: [RowContentLinksWhereUniqueInput!]
  """Delete multiple RowContentLinks documents"""
  delete: [RowContentLinksWhereUniqueInput!]
}

input RowContentLinksUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowContentLinksUpdateManyLocalizationsInput
}

input RowContentLinksUpdateManyLocalizationDataInput {
  title: String
}

input RowContentLinksUpdateManyLocalizationInput {
  data: RowContentLinksUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowContentLinksUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowContentLinksUpdateManyLocalizationInput!]
}

input RowContentLinksUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowContentLinksWhereInput!
  """Update many input"""
  data: RowContentLinksUpdateManyInput!
}

input RowContentLinksUpdateOneInlineInput {
  """Create and connect one RowContentLinks document"""
  create: RowContentLinksCreateInput
  """Update single RowContentLinks document"""
  update: RowContentLinksUpdateWithNestedWhereUniqueInput
  """Upsert single RowContentLinks document"""
  upsert: RowContentLinksUpsertWithNestedWhereUniqueInput
  """Connect existing RowContentLinks document"""
  connect: RowContentLinksWhereUniqueInput
  """Disconnect currently connected RowContentLinks document"""
  disconnect: Boolean
  """Delete currently connected RowContentLinks document"""
  delete: Boolean
}

input RowContentLinksUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowContentLinksWhereUniqueInput!
  """Document to update"""
  data: RowContentLinksUpdateInput!
}

input RowContentLinksUpsertInput {
  """Create document if it didn't exist"""
  create: RowContentLinksCreateInput!
  """Update document if it exists"""
  update: RowContentLinksUpdateInput!
}

input RowContentLinksUpsertLocalizationInput {
  update: RowContentLinksUpdateLocalizationDataInput!
  create: RowContentLinksCreateLocalizationDataInput!
  locale: Locale!
}

input RowContentLinksUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowContentLinksWhereUniqueInput!
  """Upsert data"""
  data: RowContentLinksUpsertInput!
}

"""Identifies documents"""
input RowContentLinksWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowContentLinksWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowContentLinksWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowContentLinksWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  contentLinks_every: PageLinkWhereInput
  contentLinks_some: PageLinkWhereInput
  contentLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowContentLinks record uniquely"""
input RowContentLinksWhereUniqueInput {
  id: ID
  identity: String
}

type RowHeroBanner implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowHeroBanner!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowHeroBanner!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  copy: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """Video, landscape"""
  asset(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`asset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): Asset!
  pageLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pageLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowHeroBanner versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowHeroBannerConnectInput {
  """Document to connect"""
  where: RowHeroBannerWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowHeroBannerConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowHeroBannerEdge!]!
  aggregate: Aggregate!
}

input RowHeroBannerCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """copy input for default locale (en)"""
  copy: RichTextAST!
  asset: AssetCreateOneInlineInput!
  pageLinks: PageLinkCreateManyInlineInput
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowHeroBannerCreateLocalizationsInput
}

input RowHeroBannerCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  copy: RichTextAST!
}

input RowHeroBannerCreateLocalizationInput {
  """Localization input"""
  data: RowHeroBannerCreateLocalizationDataInput!
  locale: Locale!
}

input RowHeroBannerCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowHeroBannerCreateLocalizationInput!]
}

input RowHeroBannerCreateManyInlineInput {
  """Create and connect multiple existing RowHeroBanner documents"""
  create: [RowHeroBannerCreateInput!]
  """Connect multiple existing RowHeroBanner documents"""
  connect: [RowHeroBannerWhereUniqueInput!]
}

input RowHeroBannerCreateOneInlineInput {
  """Create and connect one RowHeroBanner document"""
  create: RowHeroBannerCreateInput
  """Connect one existing RowHeroBanner document"""
  connect: RowHeroBannerWhereUniqueInput
}

"""An edge in a connection."""
type RowHeroBannerEdge {
  """The item at the end of the edge."""
  node: RowHeroBanner!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowHeroBannerManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowHeroBannerWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowHeroBannerWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowHeroBannerWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowHeroBannerOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowHeroBannerUpdateInput {
  identity: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  asset: AssetUpdateOneInlineInput
  pageLinks: PageLinkUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowHeroBannerUpdateLocalizationsInput
}

input RowHeroBannerUpdateLocalizationDataInput {
  copy: RichTextAST
}

input RowHeroBannerUpdateLocalizationInput {
  data: RowHeroBannerUpdateLocalizationDataInput!
  locale: Locale!
}

input RowHeroBannerUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowHeroBannerCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowHeroBannerUpdateLocalizationInput!]
  upsert: [RowHeroBannerUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowHeroBannerUpdateManyInlineInput {
  """Create and connect multiple RowHeroBanner documents"""
  create: [RowHeroBannerCreateInput!]
  """Connect multiple existing RowHeroBanner documents"""
  connect: [RowHeroBannerConnectInput!]
  """Override currently-connected documents with multiple existing RowHeroBanner documents"""
  set: [RowHeroBannerWhereUniqueInput!]
  """Update multiple RowHeroBanner documents"""
  update: [RowHeroBannerUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowHeroBanner documents"""
  upsert: [RowHeroBannerUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowHeroBanner documents"""
  disconnect: [RowHeroBannerWhereUniqueInput!]
  """Delete multiple RowHeroBanner documents"""
  delete: [RowHeroBannerWhereUniqueInput!]
}

input RowHeroBannerUpdateManyInput {
  """copy input for default locale (en)"""
  copy: RichTextAST
  """Optional updates to localizations"""
  localizations: RowHeroBannerUpdateManyLocalizationsInput
}

input RowHeroBannerUpdateManyLocalizationDataInput {
  copy: RichTextAST
}

input RowHeroBannerUpdateManyLocalizationInput {
  data: RowHeroBannerUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowHeroBannerUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowHeroBannerUpdateManyLocalizationInput!]
}

input RowHeroBannerUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowHeroBannerWhereInput!
  """Update many input"""
  data: RowHeroBannerUpdateManyInput!
}

input RowHeroBannerUpdateOneInlineInput {
  """Create and connect one RowHeroBanner document"""
  create: RowHeroBannerCreateInput
  """Update single RowHeroBanner document"""
  update: RowHeroBannerUpdateWithNestedWhereUniqueInput
  """Upsert single RowHeroBanner document"""
  upsert: RowHeroBannerUpsertWithNestedWhereUniqueInput
  """Connect existing RowHeroBanner document"""
  connect: RowHeroBannerWhereUniqueInput
  """Disconnect currently connected RowHeroBanner document"""
  disconnect: Boolean
  """Delete currently connected RowHeroBanner document"""
  delete: Boolean
}

input RowHeroBannerUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowHeroBannerWhereUniqueInput!
  """Document to update"""
  data: RowHeroBannerUpdateInput!
}

input RowHeroBannerUpsertInput {
  """Create document if it didn't exist"""
  create: RowHeroBannerCreateInput!
  """Update document if it exists"""
  update: RowHeroBannerUpdateInput!
}

input RowHeroBannerUpsertLocalizationInput {
  update: RowHeroBannerUpdateLocalizationDataInput!
  create: RowHeroBannerCreateLocalizationDataInput!
  locale: Locale!
}

input RowHeroBannerUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowHeroBannerWhereUniqueInput!
  """Upsert data"""
  data: RowHeroBannerUpsertInput!
}

"""Identifies documents"""
input RowHeroBannerWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowHeroBannerWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowHeroBannerWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowHeroBannerWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowHeroBanner record uniquely"""
input RowHeroBannerWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductBackstory implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductBackstory!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductBackstory!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  copy: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """Image, portrait (8:6)"""
  asset(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`asset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): Asset!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowProductBackstory versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductBackstoryConnectInput {
  """Document to connect"""
  where: RowProductBackstoryWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductBackstoryConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductBackstoryEdge!]!
  aggregate: Aggregate!
}

input RowProductBackstoryCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """copy input for default locale (en)"""
  copy: RichTextAST!
  asset: AssetCreateOneInlineInput!
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductBackstoryCreateLocalizationsInput
}

input RowProductBackstoryCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  copy: RichTextAST!
}

input RowProductBackstoryCreateLocalizationInput {
  """Localization input"""
  data: RowProductBackstoryCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductBackstoryCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductBackstoryCreateLocalizationInput!]
}

input RowProductBackstoryCreateManyInlineInput {
  """Create and connect multiple existing RowProductBackstory documents"""
  create: [RowProductBackstoryCreateInput!]
  """Connect multiple existing RowProductBackstory documents"""
  connect: [RowProductBackstoryWhereUniqueInput!]
}

input RowProductBackstoryCreateOneInlineInput {
  """Create and connect one RowProductBackstory document"""
  create: RowProductBackstoryCreateInput
  """Connect one existing RowProductBackstory document"""
  connect: RowProductBackstoryWhereUniqueInput
}

"""An edge in a connection."""
type RowProductBackstoryEdge {
  """The item at the end of the edge."""
  node: RowProductBackstory!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductBackstoryManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductBackstoryWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductBackstoryWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductBackstoryWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowProductBackstoryOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowProductBackstoryUpdateInput {
  identity: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  asset: AssetUpdateOneInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductBackstoryUpdateLocalizationsInput
}

input RowProductBackstoryUpdateLocalizationDataInput {
  copy: RichTextAST
}

input RowProductBackstoryUpdateLocalizationInput {
  data: RowProductBackstoryUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductBackstoryUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductBackstoryCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductBackstoryUpdateLocalizationInput!]
  upsert: [RowProductBackstoryUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductBackstoryUpdateManyInlineInput {
  """Create and connect multiple RowProductBackstory documents"""
  create: [RowProductBackstoryCreateInput!]
  """Connect multiple existing RowProductBackstory documents"""
  connect: [RowProductBackstoryConnectInput!]
  """Override currently-connected documents with multiple existing RowProductBackstory documents"""
  set: [RowProductBackstoryWhereUniqueInput!]
  """Update multiple RowProductBackstory documents"""
  update: [RowProductBackstoryUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductBackstory documents"""
  upsert: [RowProductBackstoryUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductBackstory documents"""
  disconnect: [RowProductBackstoryWhereUniqueInput!]
  """Delete multiple RowProductBackstory documents"""
  delete: [RowProductBackstoryWhereUniqueInput!]
}

input RowProductBackstoryUpdateManyInput {
  """copy input for default locale (en)"""
  copy: RichTextAST
  """Optional updates to localizations"""
  localizations: RowProductBackstoryUpdateManyLocalizationsInput
}

input RowProductBackstoryUpdateManyLocalizationDataInput {
  copy: RichTextAST
}

input RowProductBackstoryUpdateManyLocalizationInput {
  data: RowProductBackstoryUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductBackstoryUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductBackstoryUpdateManyLocalizationInput!]
}

input RowProductBackstoryUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductBackstoryWhereInput!
  """Update many input"""
  data: RowProductBackstoryUpdateManyInput!
}

input RowProductBackstoryUpdateOneInlineInput {
  """Create and connect one RowProductBackstory document"""
  create: RowProductBackstoryCreateInput
  """Update single RowProductBackstory document"""
  update: RowProductBackstoryUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductBackstory document"""
  upsert: RowProductBackstoryUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductBackstory document"""
  connect: RowProductBackstoryWhereUniqueInput
  """Disconnect currently connected RowProductBackstory document"""
  disconnect: Boolean
  """Delete currently connected RowProductBackstory document"""
  delete: Boolean
}

input RowProductBackstoryUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductBackstoryWhereUniqueInput!
  """Document to update"""
  data: RowProductBackstoryUpdateInput!
}

input RowProductBackstoryUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductBackstoryCreateInput!
  """Update document if it exists"""
  update: RowProductBackstoryUpdateInput!
}

input RowProductBackstoryUpsertLocalizationInput {
  update: RowProductBackstoryUpdateLocalizationDataInput!
  create: RowProductBackstoryCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductBackstoryUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductBackstoryWhereUniqueInput!
  """Upsert data"""
  data: RowProductBackstoryUpsertInput!
}

"""Identifies documents"""
input RowProductBackstoryWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductBackstoryWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductBackstoryWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductBackstoryWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowProductBackstory record uniquely"""
input RowProductBackstoryWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductFeature implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductFeature!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductFeature!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  topic: String
  copy: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductFeature versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

type RowProductFeatureBoxed implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductFeatureBoxed!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductFeatureBoxed!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  topic: String
  copy: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductFeatureBoxed versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductFeatureBoxedConnectInput {
  """Document to connect"""
  where: RowProductFeatureBoxedWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductFeatureBoxedConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductFeatureBoxedEdge!]!
  aggregate: Aggregate!
}

input RowProductFeatureBoxedCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST!
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductFeatureBoxedCreateLocalizationsInput
}

input RowProductFeatureBoxedCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  topic: String
  copy: RichTextAST!
}

input RowProductFeatureBoxedCreateLocalizationInput {
  """Localization input"""
  data: RowProductFeatureBoxedCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureBoxedCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductFeatureBoxedCreateLocalizationInput!]
}

input RowProductFeatureBoxedCreateManyInlineInput {
  """Create and connect multiple existing RowProductFeatureBoxed documents"""
  create: [RowProductFeatureBoxedCreateInput!]
  """Connect multiple existing RowProductFeatureBoxed documents"""
  connect: [RowProductFeatureBoxedWhereUniqueInput!]
}

input RowProductFeatureBoxedCreateOneInlineInput {
  """Create and connect one RowProductFeatureBoxed document"""
  create: RowProductFeatureBoxedCreateInput
  """Connect one existing RowProductFeatureBoxed document"""
  connect: RowProductFeatureBoxedWhereUniqueInput
}

"""An edge in a connection."""
type RowProductFeatureBoxedEdge {
  """The item at the end of the edge."""
  node: RowProductFeatureBoxed!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductFeatureBoxedManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductFeatureBoxedWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductFeatureBoxedWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductFeatureBoxedWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductFeatureBoxedOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  topic_ASC
  topic_DESC
}

input RowProductFeatureBoxedUpdateInput {
  identity: String
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductFeatureBoxedUpdateLocalizationsInput
}

input RowProductFeatureBoxedUpdateLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowProductFeatureBoxedUpdateLocalizationInput {
  data: RowProductFeatureBoxedUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureBoxedUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductFeatureBoxedCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductFeatureBoxedUpdateLocalizationInput!]
  upsert: [RowProductFeatureBoxedUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductFeatureBoxedUpdateManyInlineInput {
  """Create and connect multiple RowProductFeatureBoxed documents"""
  create: [RowProductFeatureBoxedCreateInput!]
  """Connect multiple existing RowProductFeatureBoxed documents"""
  connect: [RowProductFeatureBoxedConnectInput!]
  """Override currently-connected documents with multiple existing RowProductFeatureBoxed documents"""
  set: [RowProductFeatureBoxedWhereUniqueInput!]
  """Update multiple RowProductFeatureBoxed documents"""
  update: [RowProductFeatureBoxedUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductFeatureBoxed documents"""
  upsert: [RowProductFeatureBoxedUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductFeatureBoxed documents"""
  disconnect: [RowProductFeatureBoxedWhereUniqueInput!]
  """Delete multiple RowProductFeatureBoxed documents"""
  delete: [RowProductFeatureBoxedWhereUniqueInput!]
}

input RowProductFeatureBoxedUpdateManyInput {
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  """Optional updates to localizations"""
  localizations: RowProductFeatureBoxedUpdateManyLocalizationsInput
}

input RowProductFeatureBoxedUpdateManyLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowProductFeatureBoxedUpdateManyLocalizationInput {
  data: RowProductFeatureBoxedUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureBoxedUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductFeatureBoxedUpdateManyLocalizationInput!]
}

input RowProductFeatureBoxedUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductFeatureBoxedWhereInput!
  """Update many input"""
  data: RowProductFeatureBoxedUpdateManyInput!
}

input RowProductFeatureBoxedUpdateOneInlineInput {
  """Create and connect one RowProductFeatureBoxed document"""
  create: RowProductFeatureBoxedCreateInput
  """Update single RowProductFeatureBoxed document"""
  update: RowProductFeatureBoxedUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductFeatureBoxed document"""
  upsert: RowProductFeatureBoxedUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductFeatureBoxed document"""
  connect: RowProductFeatureBoxedWhereUniqueInput
  """Disconnect currently connected RowProductFeatureBoxed document"""
  disconnect: Boolean
  """Delete currently connected RowProductFeatureBoxed document"""
  delete: Boolean
}

input RowProductFeatureBoxedUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductFeatureBoxedWhereUniqueInput!
  """Document to update"""
  data: RowProductFeatureBoxedUpdateInput!
}

input RowProductFeatureBoxedUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductFeatureBoxedCreateInput!
  """Update document if it exists"""
  update: RowProductFeatureBoxedUpdateInput!
}

input RowProductFeatureBoxedUpsertLocalizationInput {
  update: RowProductFeatureBoxedUpdateLocalizationDataInput!
  create: RowProductFeatureBoxedCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureBoxedUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductFeatureBoxedWhereUniqueInput!
  """Upsert data"""
  data: RowProductFeatureBoxedUpsertInput!
}

"""Identifies documents"""
input RowProductFeatureBoxedWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductFeatureBoxedWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductFeatureBoxedWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductFeatureBoxedWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  topic: String
  """All values that are not equal to given value."""
  topic_not: String
  """All values that are contained in given list."""
  topic_in: [String!]
  """All values that are not contained in given list."""
  topic_not_in: [String!]
  """All values containing the given string."""
  topic_contains: String
  """All values not containing the given string."""
  topic_not_contains: String
  """All values starting with the given string."""
  topic_starts_with: String
  """All values not starting with the given string."""
  topic_not_starts_with: String
  """All values ending with the given string."""
  topic_ends_with: String
  """All values not ending with the given string"""
  topic_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductFeatureBoxed record uniquely"""
input RowProductFeatureBoxedWhereUniqueInput {
  id: ID
  identity: String
}

input RowProductFeatureConnectInput {
  """Document to connect"""
  where: RowProductFeatureWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductFeatureConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductFeatureEdge!]!
  aggregate: Aggregate!
}

input RowProductFeatureCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST!
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductFeatureCreateLocalizationsInput
}

input RowProductFeatureCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  topic: String
  copy: RichTextAST!
}

input RowProductFeatureCreateLocalizationInput {
  """Localization input"""
  data: RowProductFeatureCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductFeatureCreateLocalizationInput!]
}

input RowProductFeatureCreateManyInlineInput {
  """Create and connect multiple existing RowProductFeature documents"""
  create: [RowProductFeatureCreateInput!]
  """Connect multiple existing RowProductFeature documents"""
  connect: [RowProductFeatureWhereUniqueInput!]
}

input RowProductFeatureCreateOneInlineInput {
  """Create and connect one RowProductFeature document"""
  create: RowProductFeatureCreateInput
  """Connect one existing RowProductFeature document"""
  connect: RowProductFeatureWhereUniqueInput
}

"""An edge in a connection."""
type RowProductFeatureEdge {
  """The item at the end of the edge."""
  node: RowProductFeature!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductFeatureManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductFeatureWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductFeatureWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductFeatureWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductFeatureOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  topic_ASC
  topic_DESC
}

input RowProductFeatureUpdateInput {
  identity: String
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductFeatureUpdateLocalizationsInput
}

input RowProductFeatureUpdateLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowProductFeatureUpdateLocalizationInput {
  data: RowProductFeatureUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductFeatureCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductFeatureUpdateLocalizationInput!]
  upsert: [RowProductFeatureUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductFeatureUpdateManyInlineInput {
  """Create and connect multiple RowProductFeature documents"""
  create: [RowProductFeatureCreateInput!]
  """Connect multiple existing RowProductFeature documents"""
  connect: [RowProductFeatureConnectInput!]
  """Override currently-connected documents with multiple existing RowProductFeature documents"""
  set: [RowProductFeatureWhereUniqueInput!]
  """Update multiple RowProductFeature documents"""
  update: [RowProductFeatureUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductFeature documents"""
  upsert: [RowProductFeatureUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductFeature documents"""
  disconnect: [RowProductFeatureWhereUniqueInput!]
  """Delete multiple RowProductFeature documents"""
  delete: [RowProductFeatureWhereUniqueInput!]
}

input RowProductFeatureUpdateManyInput {
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  """Optional updates to localizations"""
  localizations: RowProductFeatureUpdateManyLocalizationsInput
}

input RowProductFeatureUpdateManyLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowProductFeatureUpdateManyLocalizationInput {
  data: RowProductFeatureUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductFeatureUpdateManyLocalizationInput!]
}

input RowProductFeatureUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductFeatureWhereInput!
  """Update many input"""
  data: RowProductFeatureUpdateManyInput!
}

input RowProductFeatureUpdateOneInlineInput {
  """Create and connect one RowProductFeature document"""
  create: RowProductFeatureCreateInput
  """Update single RowProductFeature document"""
  update: RowProductFeatureUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductFeature document"""
  upsert: RowProductFeatureUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductFeature document"""
  connect: RowProductFeatureWhereUniqueInput
  """Disconnect currently connected RowProductFeature document"""
  disconnect: Boolean
  """Delete currently connected RowProductFeature document"""
  delete: Boolean
}

input RowProductFeatureUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductFeatureWhereUniqueInput!
  """Document to update"""
  data: RowProductFeatureUpdateInput!
}

input RowProductFeatureUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductFeatureCreateInput!
  """Update document if it exists"""
  update: RowProductFeatureUpdateInput!
}

input RowProductFeatureUpsertLocalizationInput {
  update: RowProductFeatureUpdateLocalizationDataInput!
  create: RowProductFeatureCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductFeatureUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductFeatureWhereUniqueInput!
  """Upsert data"""
  data: RowProductFeatureUpsertInput!
}

"""Identifies documents"""
input RowProductFeatureWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductFeatureWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductFeatureWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductFeatureWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  topic: String
  """All values that are not equal to given value."""
  topic_not: String
  """All values that are contained in given list."""
  topic_in: [String!]
  """All values that are not contained in given list."""
  topic_not_in: [String!]
  """All values containing the given string."""
  topic_contains: String
  """All values not containing the given string."""
  topic_not_contains: String
  """All values starting with the given string."""
  topic_starts_with: String
  """All values not starting with the given string."""
  topic_not_starts_with: String
  """All values ending with the given string."""
  topic_ends_with: String
  """All values not ending with the given string"""
  topic_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductFeature record uniquely"""
input RowProductFeatureWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductGrid implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductGrid!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductGrid!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pageLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pageLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  magentoCategory(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`magentoCategory\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): MagentoCategory
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowProductGrid versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductGridConnectInput {
  """Document to connect"""
  where: RowProductGridWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductGridConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductGridEdge!]!
  aggregate: Aggregate!
}

input RowProductGridCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  pageLinks: PageLinkCreateManyInlineInput
  magentoCategory: MagentoCategoryCreateOneInlineInput
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductGridCreateLocalizationsInput
}

input RowProductGridCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowProductGridCreateLocalizationInput {
  """Localization input"""
  data: RowProductGridCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductGridCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductGridCreateLocalizationInput!]
}

input RowProductGridCreateManyInlineInput {
  """Create and connect multiple existing RowProductGrid documents"""
  create: [RowProductGridCreateInput!]
  """Connect multiple existing RowProductGrid documents"""
  connect: [RowProductGridWhereUniqueInput!]
}

input RowProductGridCreateOneInlineInput {
  """Create and connect one RowProductGrid document"""
  create: RowProductGridCreateInput
  """Connect one existing RowProductGrid document"""
  connect: RowProductGridWhereUniqueInput
}

"""An edge in a connection."""
type RowProductGridEdge {
  """The item at the end of the edge."""
  node: RowProductGrid!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductGridManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductGridWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductGridWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductGridWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  magentoCategory: MagentoCategoryWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowProductGridOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowProductGridUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  pageLinks: PageLinkUpdateManyInlineInput
  magentoCategory: MagentoCategoryUpdateOneInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductGridUpdateLocalizationsInput
}

input RowProductGridUpdateLocalizationDataInput {
  title: String
}

input RowProductGridUpdateLocalizationInput {
  data: RowProductGridUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductGridUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductGridCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductGridUpdateLocalizationInput!]
  upsert: [RowProductGridUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductGridUpdateManyInlineInput {
  """Create and connect multiple RowProductGrid documents"""
  create: [RowProductGridCreateInput!]
  """Connect multiple existing RowProductGrid documents"""
  connect: [RowProductGridConnectInput!]
  """Override currently-connected documents with multiple existing RowProductGrid documents"""
  set: [RowProductGridWhereUniqueInput!]
  """Update multiple RowProductGrid documents"""
  update: [RowProductGridUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductGrid documents"""
  upsert: [RowProductGridUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductGrid documents"""
  disconnect: [RowProductGridWhereUniqueInput!]
  """Delete multiple RowProductGrid documents"""
  delete: [RowProductGridWhereUniqueInput!]
}

input RowProductGridUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowProductGridUpdateManyLocalizationsInput
}

input RowProductGridUpdateManyLocalizationDataInput {
  title: String
}

input RowProductGridUpdateManyLocalizationInput {
  data: RowProductGridUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductGridUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductGridUpdateManyLocalizationInput!]
}

input RowProductGridUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductGridWhereInput!
  """Update many input"""
  data: RowProductGridUpdateManyInput!
}

input RowProductGridUpdateOneInlineInput {
  """Create and connect one RowProductGrid document"""
  create: RowProductGridCreateInput
  """Update single RowProductGrid document"""
  update: RowProductGridUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductGrid document"""
  upsert: RowProductGridUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductGrid document"""
  connect: RowProductGridWhereUniqueInput
  """Disconnect currently connected RowProductGrid document"""
  disconnect: Boolean
  """Delete currently connected RowProductGrid document"""
  delete: Boolean
}

input RowProductGridUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductGridWhereUniqueInput!
  """Document to update"""
  data: RowProductGridUpdateInput!
}

input RowProductGridUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductGridCreateInput!
  """Update document if it exists"""
  update: RowProductGridUpdateInput!
}

input RowProductGridUpsertLocalizationInput {
  update: RowProductGridUpdateLocalizationDataInput!
  create: RowProductGridCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductGridUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductGridWhereUniqueInput!
  """Upsert data"""
  data: RowProductGridUpsertInput!
}

"""Identifies documents"""
input RowProductGridWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductGridWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductGridWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductGridWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  magentoCategory: MagentoCategoryWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowProductGrid record uniquely"""
input RowProductGridWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductRelated implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductRelated!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductRelated!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductRelated versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductRelatedConnectInput {
  """Document to connect"""
  where: RowProductRelatedWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductRelatedConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductRelatedEdge!]!
  aggregate: Aggregate!
}

input RowProductRelatedCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductRelatedCreateLocalizationsInput
}

input RowProductRelatedCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowProductRelatedCreateLocalizationInput {
  """Localization input"""
  data: RowProductRelatedCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductRelatedCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductRelatedCreateLocalizationInput!]
}

input RowProductRelatedCreateManyInlineInput {
  """Create and connect multiple existing RowProductRelated documents"""
  create: [RowProductRelatedCreateInput!]
  """Connect multiple existing RowProductRelated documents"""
  connect: [RowProductRelatedWhereUniqueInput!]
}

input RowProductRelatedCreateOneInlineInput {
  """Create and connect one RowProductRelated document"""
  create: RowProductRelatedCreateInput
  """Connect one existing RowProductRelated document"""
  connect: RowProductRelatedWhereUniqueInput
}

"""An edge in a connection."""
type RowProductRelatedEdge {
  """The item at the end of the edge."""
  node: RowProductRelated!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductRelatedManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductRelatedWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductRelatedWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductRelatedWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductRelatedOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowProductRelatedUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductRelatedUpdateLocalizationsInput
}

input RowProductRelatedUpdateLocalizationDataInput {
  title: String
}

input RowProductRelatedUpdateLocalizationInput {
  data: RowProductRelatedUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductRelatedUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductRelatedCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductRelatedUpdateLocalizationInput!]
  upsert: [RowProductRelatedUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductRelatedUpdateManyInlineInput {
  """Create and connect multiple RowProductRelated documents"""
  create: [RowProductRelatedCreateInput!]
  """Connect multiple existing RowProductRelated documents"""
  connect: [RowProductRelatedConnectInput!]
  """Override currently-connected documents with multiple existing RowProductRelated documents"""
  set: [RowProductRelatedWhereUniqueInput!]
  """Update multiple RowProductRelated documents"""
  update: [RowProductRelatedUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductRelated documents"""
  upsert: [RowProductRelatedUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductRelated documents"""
  disconnect: [RowProductRelatedWhereUniqueInput!]
  """Delete multiple RowProductRelated documents"""
  delete: [RowProductRelatedWhereUniqueInput!]
}

input RowProductRelatedUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowProductRelatedUpdateManyLocalizationsInput
}

input RowProductRelatedUpdateManyLocalizationDataInput {
  title: String
}

input RowProductRelatedUpdateManyLocalizationInput {
  data: RowProductRelatedUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductRelatedUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductRelatedUpdateManyLocalizationInput!]
}

input RowProductRelatedUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductRelatedWhereInput!
  """Update many input"""
  data: RowProductRelatedUpdateManyInput!
}

input RowProductRelatedUpdateOneInlineInput {
  """Create and connect one RowProductRelated document"""
  create: RowProductRelatedCreateInput
  """Update single RowProductRelated document"""
  update: RowProductRelatedUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductRelated document"""
  upsert: RowProductRelatedUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductRelated document"""
  connect: RowProductRelatedWhereUniqueInput
  """Disconnect currently connected RowProductRelated document"""
  disconnect: Boolean
  """Delete currently connected RowProductRelated document"""
  delete: Boolean
}

input RowProductRelatedUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductRelatedWhereUniqueInput!
  """Document to update"""
  data: RowProductRelatedUpdateInput!
}

input RowProductRelatedUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductRelatedCreateInput!
  """Update document if it exists"""
  update: RowProductRelatedUpdateInput!
}

input RowProductRelatedUpsertLocalizationInput {
  update: RowProductRelatedUpdateLocalizationDataInput!
  create: RowProductRelatedCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductRelatedUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductRelatedWhereUniqueInput!
  """Upsert data"""
  data: RowProductRelatedUpsertInput!
}

"""Identifies documents"""
input RowProductRelatedWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductRelatedWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductRelatedWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductRelatedWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductRelated record uniquely"""
input RowProductRelatedWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductReviews implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductReviews!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductReviews!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductReviews versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductReviewsConnectInput {
  """Document to connect"""
  where: RowProductReviewsWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductReviewsConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductReviewsEdge!]!
  aggregate: Aggregate!
}

input RowProductReviewsCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductReviewsCreateLocalizationsInput
}

input RowProductReviewsCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowProductReviewsCreateLocalizationInput {
  """Localization input"""
  data: RowProductReviewsCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductReviewsCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductReviewsCreateLocalizationInput!]
}

input RowProductReviewsCreateManyInlineInput {
  """Create and connect multiple existing RowProductReviews documents"""
  create: [RowProductReviewsCreateInput!]
  """Connect multiple existing RowProductReviews documents"""
  connect: [RowProductReviewsWhereUniqueInput!]
}

input RowProductReviewsCreateOneInlineInput {
  """Create and connect one RowProductReviews document"""
  create: RowProductReviewsCreateInput
  """Connect one existing RowProductReviews document"""
  connect: RowProductReviewsWhereUniqueInput
}

"""An edge in a connection."""
type RowProductReviewsEdge {
  """The item at the end of the edge."""
  node: RowProductReviews!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductReviewsManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductReviewsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductReviewsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductReviewsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductReviewsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowProductReviewsUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductReviewsUpdateLocalizationsInput
}

input RowProductReviewsUpdateLocalizationDataInput {
  title: String
}

input RowProductReviewsUpdateLocalizationInput {
  data: RowProductReviewsUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductReviewsUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductReviewsCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductReviewsUpdateLocalizationInput!]
  upsert: [RowProductReviewsUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductReviewsUpdateManyInlineInput {
  """Create and connect multiple RowProductReviews documents"""
  create: [RowProductReviewsCreateInput!]
  """Connect multiple existing RowProductReviews documents"""
  connect: [RowProductReviewsConnectInput!]
  """Override currently-connected documents with multiple existing RowProductReviews documents"""
  set: [RowProductReviewsWhereUniqueInput!]
  """Update multiple RowProductReviews documents"""
  update: [RowProductReviewsUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductReviews documents"""
  upsert: [RowProductReviewsUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductReviews documents"""
  disconnect: [RowProductReviewsWhereUniqueInput!]
  """Delete multiple RowProductReviews documents"""
  delete: [RowProductReviewsWhereUniqueInput!]
}

input RowProductReviewsUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowProductReviewsUpdateManyLocalizationsInput
}

input RowProductReviewsUpdateManyLocalizationDataInput {
  title: String
}

input RowProductReviewsUpdateManyLocalizationInput {
  data: RowProductReviewsUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductReviewsUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductReviewsUpdateManyLocalizationInput!]
}

input RowProductReviewsUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductReviewsWhereInput!
  """Update many input"""
  data: RowProductReviewsUpdateManyInput!
}

input RowProductReviewsUpdateOneInlineInput {
  """Create and connect one RowProductReviews document"""
  create: RowProductReviewsCreateInput
  """Update single RowProductReviews document"""
  update: RowProductReviewsUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductReviews document"""
  upsert: RowProductReviewsUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductReviews document"""
  connect: RowProductReviewsWhereUniqueInput
  """Disconnect currently connected RowProductReviews document"""
  disconnect: Boolean
  """Delete currently connected RowProductReviews document"""
  delete: Boolean
}

input RowProductReviewsUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductReviewsWhereUniqueInput!
  """Document to update"""
  data: RowProductReviewsUpdateInput!
}

input RowProductReviewsUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductReviewsCreateInput!
  """Update document if it exists"""
  update: RowProductReviewsUpdateInput!
}

input RowProductReviewsUpsertLocalizationInput {
  update: RowProductReviewsUpdateLocalizationDataInput!
  create: RowProductReviewsCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductReviewsUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductReviewsWhereUniqueInput!
  """Upsert data"""
  data: RowProductReviewsUpsertInput!
}

"""Identifies documents"""
input RowProductReviewsWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductReviewsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductReviewsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductReviewsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductReviews record uniquely"""
input RowProductReviewsWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductSpecs implements Node {
  """System stage field"""
  stage: Stage!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductSpecs!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt: DateTime!
  """The time the document was updated"""
  updatedAt: DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt: DateTime
  identity: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductSpecs versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductSpecsConnectInput {
  """Document to connect"""
  where: RowProductSpecsWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductSpecsConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductSpecsEdge!]!
  aggregate: Aggregate!
}

input RowProductSpecsCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  productpages: ProductCreateManyInlineInput
}

input RowProductSpecsCreateManyInlineInput {
  """Create and connect multiple existing RowProductSpecs documents"""
  create: [RowProductSpecsCreateInput!]
  """Connect multiple existing RowProductSpecs documents"""
  connect: [RowProductSpecsWhereUniqueInput!]
}

input RowProductSpecsCreateOneInlineInput {
  """Create and connect one RowProductSpecs document"""
  create: RowProductSpecsCreateInput
  """Connect one existing RowProductSpecs document"""
  connect: RowProductSpecsWhereUniqueInput
}

"""An edge in a connection."""
type RowProductSpecsEdge {
  """The item at the end of the edge."""
  node: RowProductSpecs!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductSpecsManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductSpecsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductSpecsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductSpecsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductSpecsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowProductSpecsUpdateInput {
  identity: String
  productpages: ProductUpdateManyInlineInput
}

input RowProductSpecsUpdateManyInlineInput {
  """Create and connect multiple RowProductSpecs documents"""
  create: [RowProductSpecsCreateInput!]
  """Connect multiple existing RowProductSpecs documents"""
  connect: [RowProductSpecsConnectInput!]
  """Override currently-connected documents with multiple existing RowProductSpecs documents"""
  set: [RowProductSpecsWhereUniqueInput!]
  """Update multiple RowProductSpecs documents"""
  update: [RowProductSpecsUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductSpecs documents"""
  upsert: [RowProductSpecsUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductSpecs documents"""
  disconnect: [RowProductSpecsWhereUniqueInput!]
  """Delete multiple RowProductSpecs documents"""
  delete: [RowProductSpecsWhereUniqueInput!]
}

input RowProductSpecsUpdateManyInput {
  """No fields in updateMany data input"""
  _: String
}

input RowProductSpecsUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductSpecsWhereInput!
  """Update many input"""
  data: RowProductSpecsUpdateManyInput!
}

input RowProductSpecsUpdateOneInlineInput {
  """Create and connect one RowProductSpecs document"""
  create: RowProductSpecsCreateInput
  """Update single RowProductSpecs document"""
  update: RowProductSpecsUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductSpecs document"""
  upsert: RowProductSpecsUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductSpecs document"""
  connect: RowProductSpecsWhereUniqueInput
  """Disconnect currently connected RowProductSpecs document"""
  disconnect: Boolean
  """Delete currently connected RowProductSpecs document"""
  delete: Boolean
}

input RowProductSpecsUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductSpecsWhereUniqueInput!
  """Document to update"""
  data: RowProductSpecsUpdateInput!
}

input RowProductSpecsUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductSpecsCreateInput!
  """Update document if it exists"""
  update: RowProductSpecsUpdateInput!
}

input RowProductSpecsUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductSpecsWhereUniqueInput!
  """Upsert data"""
  data: RowProductSpecsUpsertInput!
}

"""Identifies documents"""
input RowProductSpecsWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductSpecsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductSpecsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductSpecsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductSpecs record uniquely"""
input RowProductSpecsWhereUniqueInput {
  id: ID
  identity: String
}

type RowProductUpsells implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowProductUpsells!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowProductUpsells!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowProductUpsells versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowProductUpsellsConnectInput {
  """Document to connect"""
  where: RowProductUpsellsWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowProductUpsellsConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowProductUpsellsEdge!]!
  aggregate: Aggregate!
}

input RowProductUpsellsCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowProductUpsellsCreateLocalizationsInput
}

input RowProductUpsellsCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowProductUpsellsCreateLocalizationInput {
  """Localization input"""
  data: RowProductUpsellsCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductUpsellsCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowProductUpsellsCreateLocalizationInput!]
}

input RowProductUpsellsCreateManyInlineInput {
  """Create and connect multiple existing RowProductUpsells documents"""
  create: [RowProductUpsellsCreateInput!]
  """Connect multiple existing RowProductUpsells documents"""
  connect: [RowProductUpsellsWhereUniqueInput!]
}

input RowProductUpsellsCreateOneInlineInput {
  """Create and connect one RowProductUpsells document"""
  create: RowProductUpsellsCreateInput
  """Connect one existing RowProductUpsells document"""
  connect: RowProductUpsellsWhereUniqueInput
}

"""An edge in a connection."""
type RowProductUpsellsEdge {
  """The item at the end of the edge."""
  node: RowProductUpsells!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowProductUpsellsManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductUpsellsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductUpsellsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductUpsellsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowProductUpsellsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowProductUpsellsUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowProductUpsellsUpdateLocalizationsInput
}

input RowProductUpsellsUpdateLocalizationDataInput {
  title: String
}

input RowProductUpsellsUpdateLocalizationInput {
  data: RowProductUpsellsUpdateLocalizationDataInput!
  locale: Locale!
}

input RowProductUpsellsUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowProductUpsellsCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowProductUpsellsUpdateLocalizationInput!]
  upsert: [RowProductUpsellsUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowProductUpsellsUpdateManyInlineInput {
  """Create and connect multiple RowProductUpsells documents"""
  create: [RowProductUpsellsCreateInput!]
  """Connect multiple existing RowProductUpsells documents"""
  connect: [RowProductUpsellsConnectInput!]
  """Override currently-connected documents with multiple existing RowProductUpsells documents"""
  set: [RowProductUpsellsWhereUniqueInput!]
  """Update multiple RowProductUpsells documents"""
  update: [RowProductUpsellsUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowProductUpsells documents"""
  upsert: [RowProductUpsellsUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowProductUpsells documents"""
  disconnect: [RowProductUpsellsWhereUniqueInput!]
  """Delete multiple RowProductUpsells documents"""
  delete: [RowProductUpsellsWhereUniqueInput!]
}

input RowProductUpsellsUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowProductUpsellsUpdateManyLocalizationsInput
}

input RowProductUpsellsUpdateManyLocalizationDataInput {
  title: String
}

input RowProductUpsellsUpdateManyLocalizationInput {
  data: RowProductUpsellsUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowProductUpsellsUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowProductUpsellsUpdateManyLocalizationInput!]
}

input RowProductUpsellsUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowProductUpsellsWhereInput!
  """Update many input"""
  data: RowProductUpsellsUpdateManyInput!
}

input RowProductUpsellsUpdateOneInlineInput {
  """Create and connect one RowProductUpsells document"""
  create: RowProductUpsellsCreateInput
  """Update single RowProductUpsells document"""
  update: RowProductUpsellsUpdateWithNestedWhereUniqueInput
  """Upsert single RowProductUpsells document"""
  upsert: RowProductUpsellsUpsertWithNestedWhereUniqueInput
  """Connect existing RowProductUpsells document"""
  connect: RowProductUpsellsWhereUniqueInput
  """Disconnect currently connected RowProductUpsells document"""
  disconnect: Boolean
  """Delete currently connected RowProductUpsells document"""
  delete: Boolean
}

input RowProductUpsellsUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductUpsellsWhereUniqueInput!
  """Document to update"""
  data: RowProductUpsellsUpdateInput!
}

input RowProductUpsellsUpsertInput {
  """Create document if it didn't exist"""
  create: RowProductUpsellsCreateInput!
  """Update document if it exists"""
  update: RowProductUpsellsUpdateInput!
}

input RowProductUpsellsUpsertLocalizationInput {
  update: RowProductUpsellsUpdateLocalizationDataInput!
  create: RowProductUpsellsCreateLocalizationDataInput!
  locale: Locale!
}

input RowProductUpsellsUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowProductUpsellsWhereUniqueInput!
  """Upsert data"""
  data: RowProductUpsellsUpsertInput!
}

"""Identifies documents"""
input RowProductUpsellsWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowProductUpsellsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowProductUpsellsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowProductUpsellsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowProductUpsells record uniquely"""
input RowProductUpsellsWhereUniqueInput {
  id: ID
  identity: String
}

type RowQuote implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowQuote!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowQuote!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  quote: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowQuote versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowQuoteConnectInput {
  """Document to connect"""
  where: RowQuoteWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowQuoteConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowQuoteEdge!]!
  aggregate: Aggregate!
}

input RowQuoteCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """quote input for default locale (en)"""
  quote: RichTextAST!
  pages: PageCreateManyInlineInput
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowQuoteCreateLocalizationsInput
}

input RowQuoteCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  quote: RichTextAST!
}

input RowQuoteCreateLocalizationInput {
  """Localization input"""
  data: RowQuoteCreateLocalizationDataInput!
  locale: Locale!
}

input RowQuoteCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowQuoteCreateLocalizationInput!]
}

input RowQuoteCreateManyInlineInput {
  """Create and connect multiple existing RowQuote documents"""
  create: [RowQuoteCreateInput!]
  """Connect multiple existing RowQuote documents"""
  connect: [RowQuoteWhereUniqueInput!]
}

input RowQuoteCreateOneInlineInput {
  """Create and connect one RowQuote document"""
  create: RowQuoteCreateInput
  """Connect one existing RowQuote document"""
  connect: RowQuoteWhereUniqueInput
}

"""An edge in a connection."""
type RowQuoteEdge {
  """The item at the end of the edge."""
  node: RowQuote!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowQuoteManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowQuoteWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowQuoteWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowQuoteWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowQuoteOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input RowQuoteUpdateInput {
  identity: String
  """quote input for default locale (en)"""
  quote: RichTextAST
  pages: PageUpdateManyInlineInput
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowQuoteUpdateLocalizationsInput
}

input RowQuoteUpdateLocalizationDataInput {
  quote: RichTextAST
}

input RowQuoteUpdateLocalizationInput {
  data: RowQuoteUpdateLocalizationDataInput!
  locale: Locale!
}

input RowQuoteUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowQuoteCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowQuoteUpdateLocalizationInput!]
  upsert: [RowQuoteUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowQuoteUpdateManyInlineInput {
  """Create and connect multiple RowQuote documents"""
  create: [RowQuoteCreateInput!]
  """Connect multiple existing RowQuote documents"""
  connect: [RowQuoteConnectInput!]
  """Override currently-connected documents with multiple existing RowQuote documents"""
  set: [RowQuoteWhereUniqueInput!]
  """Update multiple RowQuote documents"""
  update: [RowQuoteUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowQuote documents"""
  upsert: [RowQuoteUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowQuote documents"""
  disconnect: [RowQuoteWhereUniqueInput!]
  """Delete multiple RowQuote documents"""
  delete: [RowQuoteWhereUniqueInput!]
}

input RowQuoteUpdateManyInput {
  """quote input for default locale (en)"""
  quote: RichTextAST
  """Optional updates to localizations"""
  localizations: RowQuoteUpdateManyLocalizationsInput
}

input RowQuoteUpdateManyLocalizationDataInput {
  quote: RichTextAST
}

input RowQuoteUpdateManyLocalizationInput {
  data: RowQuoteUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowQuoteUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowQuoteUpdateManyLocalizationInput!]
}

input RowQuoteUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowQuoteWhereInput!
  """Update many input"""
  data: RowQuoteUpdateManyInput!
}

input RowQuoteUpdateOneInlineInput {
  """Create and connect one RowQuote document"""
  create: RowQuoteCreateInput
  """Update single RowQuote document"""
  update: RowQuoteUpdateWithNestedWhereUniqueInput
  """Upsert single RowQuote document"""
  upsert: RowQuoteUpsertWithNestedWhereUniqueInput
  """Connect existing RowQuote document"""
  connect: RowQuoteWhereUniqueInput
  """Disconnect currently connected RowQuote document"""
  disconnect: Boolean
  """Delete currently connected RowQuote document"""
  delete: Boolean
}

input RowQuoteUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowQuoteWhereUniqueInput!
  """Document to update"""
  data: RowQuoteUpdateInput!
}

input RowQuoteUpsertInput {
  """Create document if it didn't exist"""
  create: RowQuoteCreateInput!
  """Update document if it exists"""
  update: RowQuoteUpdateInput!
}

input RowQuoteUpsertLocalizationInput {
  update: RowQuoteUpdateLocalizationDataInput!
  create: RowQuoteCreateLocalizationDataInput!
  locale: Locale!
}

input RowQuoteUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowQuoteWhereUniqueInput!
  """Upsert data"""
  data: RowQuoteUpsertInput!
}

"""Identifies documents"""
input RowQuoteWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowQuoteWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowQuoteWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowQuoteWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowQuote record uniquely"""
input RowQuoteWhereUniqueInput {
  id: ID
  identity: String
}

type RowServiceOptions implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowServiceOptions!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowServiceOptions!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  serviceOptions(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`serviceOptions\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowServiceOptions versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowServiceOptionsConnectInput {
  """Document to connect"""
  where: RowServiceOptionsWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowServiceOptionsConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowServiceOptionsEdge!]!
  aggregate: Aggregate!
}

input RowServiceOptionsCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  serviceOptions: PageLinkCreateManyInlineInput
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowServiceOptionsCreateLocalizationsInput
}

input RowServiceOptionsCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowServiceOptionsCreateLocalizationInput {
  """Localization input"""
  data: RowServiceOptionsCreateLocalizationDataInput!
  locale: Locale!
}

input RowServiceOptionsCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowServiceOptionsCreateLocalizationInput!]
}

input RowServiceOptionsCreateManyInlineInput {
  """Create and connect multiple existing RowServiceOptions documents"""
  create: [RowServiceOptionsCreateInput!]
  """Connect multiple existing RowServiceOptions documents"""
  connect: [RowServiceOptionsWhereUniqueInput!]
}

input RowServiceOptionsCreateOneInlineInput {
  """Create and connect one RowServiceOptions document"""
  create: RowServiceOptionsCreateInput
  """Connect one existing RowServiceOptions document"""
  connect: RowServiceOptionsWhereUniqueInput
}

"""An edge in a connection."""
type RowServiceOptionsEdge {
  """The item at the end of the edge."""
  node: RowServiceOptions!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowServiceOptionsManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowServiceOptionsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowServiceOptionsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowServiceOptionsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  serviceOptions_every: PageLinkWhereInput
  serviceOptions_some: PageLinkWhereInput
  serviceOptions_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowServiceOptionsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowServiceOptionsUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  serviceOptions: PageLinkUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowServiceOptionsUpdateLocalizationsInput
}

input RowServiceOptionsUpdateLocalizationDataInput {
  title: String
}

input RowServiceOptionsUpdateLocalizationInput {
  data: RowServiceOptionsUpdateLocalizationDataInput!
  locale: Locale!
}

input RowServiceOptionsUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowServiceOptionsCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowServiceOptionsUpdateLocalizationInput!]
  upsert: [RowServiceOptionsUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowServiceOptionsUpdateManyInlineInput {
  """Create and connect multiple RowServiceOptions documents"""
  create: [RowServiceOptionsCreateInput!]
  """Connect multiple existing RowServiceOptions documents"""
  connect: [RowServiceOptionsConnectInput!]
  """Override currently-connected documents with multiple existing RowServiceOptions documents"""
  set: [RowServiceOptionsWhereUniqueInput!]
  """Update multiple RowServiceOptions documents"""
  update: [RowServiceOptionsUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowServiceOptions documents"""
  upsert: [RowServiceOptionsUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowServiceOptions documents"""
  disconnect: [RowServiceOptionsWhereUniqueInput!]
  """Delete multiple RowServiceOptions documents"""
  delete: [RowServiceOptionsWhereUniqueInput!]
}

input RowServiceOptionsUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowServiceOptionsUpdateManyLocalizationsInput
}

input RowServiceOptionsUpdateManyLocalizationDataInput {
  title: String
}

input RowServiceOptionsUpdateManyLocalizationInput {
  data: RowServiceOptionsUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowServiceOptionsUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowServiceOptionsUpdateManyLocalizationInput!]
}

input RowServiceOptionsUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowServiceOptionsWhereInput!
  """Update many input"""
  data: RowServiceOptionsUpdateManyInput!
}

input RowServiceOptionsUpdateOneInlineInput {
  """Create and connect one RowServiceOptions document"""
  create: RowServiceOptionsCreateInput
  """Update single RowServiceOptions document"""
  update: RowServiceOptionsUpdateWithNestedWhereUniqueInput
  """Upsert single RowServiceOptions document"""
  upsert: RowServiceOptionsUpsertWithNestedWhereUniqueInput
  """Connect existing RowServiceOptions document"""
  connect: RowServiceOptionsWhereUniqueInput
  """Disconnect currently connected RowServiceOptions document"""
  disconnect: Boolean
  """Delete currently connected RowServiceOptions document"""
  delete: Boolean
}

input RowServiceOptionsUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowServiceOptionsWhereUniqueInput!
  """Document to update"""
  data: RowServiceOptionsUpdateInput!
}

input RowServiceOptionsUpsertInput {
  """Create document if it didn't exist"""
  create: RowServiceOptionsCreateInput!
  """Update document if it exists"""
  update: RowServiceOptionsUpdateInput!
}

input RowServiceOptionsUpsertLocalizationInput {
  update: RowServiceOptionsUpdateLocalizationDataInput!
  create: RowServiceOptionsCreateLocalizationDataInput!
  locale: Locale!
}

input RowServiceOptionsUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowServiceOptionsWhereUniqueInput!
  """Upsert data"""
  data: RowServiceOptionsUpsertInput!
}

"""Identifies documents"""
input RowServiceOptionsWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowServiceOptionsWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowServiceOptionsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowServiceOptionsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  serviceOptions_every: PageLinkWhereInput
  serviceOptions_some: PageLinkWhereInput
  serviceOptions_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowServiceOptions record uniquely"""
input RowServiceOptionsWhereUniqueInput {
  id: ID
  identity: String
}

type RowSpecialBanner implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowSpecialBanner!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowSpecialBanner!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  topic: String
  copy: RichText!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  asset(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`asset\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): Asset!
  pageLinks(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pageLinks\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  productpages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`productpages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Product!]!
  """List of RowSpecialBanner versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowSpecialBannerConnectInput {
  """Document to connect"""
  where: RowSpecialBannerWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowSpecialBannerConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowSpecialBannerEdge!]!
  aggregate: Aggregate!
}

input RowSpecialBannerCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST!
  asset: AssetCreateOneInlineInput!
  pageLinks: PageLinkCreateManyInlineInput
  pages: PageCreateManyInlineInput
  productpages: ProductCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowSpecialBannerCreateLocalizationsInput
}

input RowSpecialBannerCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  topic: String
  copy: RichTextAST!
}

input RowSpecialBannerCreateLocalizationInput {
  """Localization input"""
  data: RowSpecialBannerCreateLocalizationDataInput!
  locale: Locale!
}

input RowSpecialBannerCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowSpecialBannerCreateLocalizationInput!]
}

input RowSpecialBannerCreateManyInlineInput {
  """Create and connect multiple existing RowSpecialBanner documents"""
  create: [RowSpecialBannerCreateInput!]
  """Connect multiple existing RowSpecialBanner documents"""
  connect: [RowSpecialBannerWhereUniqueInput!]
}

input RowSpecialBannerCreateOneInlineInput {
  """Create and connect one RowSpecialBanner document"""
  create: RowSpecialBannerCreateInput
  """Connect one existing RowSpecialBanner document"""
  connect: RowSpecialBannerWhereUniqueInput
}

"""An edge in a connection."""
type RowSpecialBannerEdge {
  """The item at the end of the edge."""
  node: RowSpecialBanner!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowSpecialBannerManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowSpecialBannerWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowSpecialBannerWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowSpecialBannerWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

enum RowSpecialBannerOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  topic_ASC
  topic_DESC
}

input RowSpecialBannerUpdateInput {
  identity: String
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  asset: AssetUpdateOneInlineInput
  pageLinks: PageLinkUpdateManyInlineInput
  pages: PageUpdateManyInlineInput
  productpages: ProductUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowSpecialBannerUpdateLocalizationsInput
}

input RowSpecialBannerUpdateLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowSpecialBannerUpdateLocalizationInput {
  data: RowSpecialBannerUpdateLocalizationDataInput!
  locale: Locale!
}

input RowSpecialBannerUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowSpecialBannerCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowSpecialBannerUpdateLocalizationInput!]
  upsert: [RowSpecialBannerUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowSpecialBannerUpdateManyInlineInput {
  """Create and connect multiple RowSpecialBanner documents"""
  create: [RowSpecialBannerCreateInput!]
  """Connect multiple existing RowSpecialBanner documents"""
  connect: [RowSpecialBannerConnectInput!]
  """Override currently-connected documents with multiple existing RowSpecialBanner documents"""
  set: [RowSpecialBannerWhereUniqueInput!]
  """Update multiple RowSpecialBanner documents"""
  update: [RowSpecialBannerUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowSpecialBanner documents"""
  upsert: [RowSpecialBannerUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowSpecialBanner documents"""
  disconnect: [RowSpecialBannerWhereUniqueInput!]
  """Delete multiple RowSpecialBanner documents"""
  delete: [RowSpecialBannerWhereUniqueInput!]
}

input RowSpecialBannerUpdateManyInput {
  """topic input for default locale (en)"""
  topic: String
  """copy input for default locale (en)"""
  copy: RichTextAST
  """Optional updates to localizations"""
  localizations: RowSpecialBannerUpdateManyLocalizationsInput
}

input RowSpecialBannerUpdateManyLocalizationDataInput {
  topic: String
  copy: RichTextAST
}

input RowSpecialBannerUpdateManyLocalizationInput {
  data: RowSpecialBannerUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowSpecialBannerUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowSpecialBannerUpdateManyLocalizationInput!]
}

input RowSpecialBannerUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowSpecialBannerWhereInput!
  """Update many input"""
  data: RowSpecialBannerUpdateManyInput!
}

input RowSpecialBannerUpdateOneInlineInput {
  """Create and connect one RowSpecialBanner document"""
  create: RowSpecialBannerCreateInput
  """Update single RowSpecialBanner document"""
  update: RowSpecialBannerUpdateWithNestedWhereUniqueInput
  """Upsert single RowSpecialBanner document"""
  upsert: RowSpecialBannerUpsertWithNestedWhereUniqueInput
  """Connect existing RowSpecialBanner document"""
  connect: RowSpecialBannerWhereUniqueInput
  """Disconnect currently connected RowSpecialBanner document"""
  disconnect: Boolean
  """Delete currently connected RowSpecialBanner document"""
  delete: Boolean
}

input RowSpecialBannerUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowSpecialBannerWhereUniqueInput!
  """Document to update"""
  data: RowSpecialBannerUpdateInput!
}

input RowSpecialBannerUpsertInput {
  """Create document if it didn't exist"""
  create: RowSpecialBannerCreateInput!
  """Update document if it exists"""
  update: RowSpecialBannerUpdateInput!
}

input RowSpecialBannerUpsertLocalizationInput {
  update: RowSpecialBannerUpdateLocalizationDataInput!
  create: RowSpecialBannerCreateLocalizationDataInput!
  locale: Locale!
}

input RowSpecialBannerUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowSpecialBannerWhereUniqueInput!
  """Upsert data"""
  data: RowSpecialBannerUpsertInput!
}

"""Identifies documents"""
input RowSpecialBannerWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowSpecialBannerWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowSpecialBannerWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowSpecialBannerWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  topic: String
  """All values that are not equal to given value."""
  topic_not: String
  """All values that are contained in given list."""
  topic_in: [String!]
  """All values that are not contained in given list."""
  topic_not_in: [String!]
  """All values containing the given string."""
  topic_contains: String
  """All values not containing the given string."""
  topic_not_contains: String
  """All values starting with the given string."""
  topic_starts_with: String
  """All values not starting with the given string."""
  topic_not_starts_with: String
  """All values ending with the given string."""
  topic_ends_with: String
  """All values not ending with the given string"""
  topic_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  asset: AssetWhereInput
  pageLinks_every: PageLinkWhereInput
  pageLinks_some: PageLinkWhereInput
  pageLinks_none: PageLinkWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
  productpages_every: ProductWhereInput
  productpages_some: ProductWhereInput
  productpages_none: ProductWhereInput
}

"""References RowSpecialBanner record uniquely"""
input RowSpecialBannerWhereUniqueInput {
  id: ID
  identity: String
}

type RowSwipeableGrid implements Node {
  """System stage field"""
  stage: Stage!
  """System Locale field"""
  locale: Locale!
  """Get the other localizations for this document"""
  localizations(
    """Potential locales that should be returned"""
    locales: [Locale!]! = [en]
    """Decides if the current locale should be included or not"""
    includeCurrent: Boolean! = false
  ): [RowSwipeableGrid!]!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [RowSwipeableGrid!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was updated"""
  updatedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt(
    """Variation of DateTime field to return, allows value from base document, current localization, or combined by returning the newer value of both"""
    variation: SystemDateTimeFieldVariation! = COMBINED
  ): DateTime
  identity: String!
  title: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  pages(
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`pages\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [Page!]!
  """List of RowSwipeableGrid versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input RowSwipeableGridConnectInput {
  """Document to connect"""
  where: RowSwipeableGridWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type RowSwipeableGridConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [RowSwipeableGridEdge!]!
  aggregate: Aggregate!
}

input RowSwipeableGridCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  """title input for default locale (en)"""
  title: String!
  pages: PageCreateManyInlineInput
  """Inline mutations for managing document localizations excluding the default locale"""
  localizations: RowSwipeableGridCreateLocalizationsInput
}

input RowSwipeableGridCreateLocalizationDataInput {
  createdAt: DateTime
  updatedAt: DateTime
  title: String!
}

input RowSwipeableGridCreateLocalizationInput {
  """Localization input"""
  data: RowSwipeableGridCreateLocalizationDataInput!
  locale: Locale!
}

input RowSwipeableGridCreateLocalizationsInput {
  """Create localizations for the newly-created document"""
  create: [RowSwipeableGridCreateLocalizationInput!]
}

input RowSwipeableGridCreateManyInlineInput {
  """Create and connect multiple existing RowSwipeableGrid documents"""
  create: [RowSwipeableGridCreateInput!]
  """Connect multiple existing RowSwipeableGrid documents"""
  connect: [RowSwipeableGridWhereUniqueInput!]
}

input RowSwipeableGridCreateOneInlineInput {
  """Create and connect one RowSwipeableGrid document"""
  create: RowSwipeableGridCreateInput
  """Connect one existing RowSwipeableGrid document"""
  connect: RowSwipeableGridWhereUniqueInput
}

"""An edge in a connection."""
type RowSwipeableGridEdge {
  """The item at the end of the edge."""
  node: RowSwipeableGrid!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input RowSwipeableGridManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowSwipeableGridWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowSwipeableGridWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowSwipeableGridWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

enum RowSwipeableGridOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
  title_ASC
  title_DESC
}

input RowSwipeableGridUpdateInput {
  identity: String
  """title input for default locale (en)"""
  title: String
  pages: PageUpdateManyInlineInput
  """Manage document localizations"""
  localizations: RowSwipeableGridUpdateLocalizationsInput
}

input RowSwipeableGridUpdateLocalizationDataInput {
  title: String
}

input RowSwipeableGridUpdateLocalizationInput {
  data: RowSwipeableGridUpdateLocalizationDataInput!
  locale: Locale!
}

input RowSwipeableGridUpdateLocalizationsInput {
  """Localizations to create"""
  create: [RowSwipeableGridCreateLocalizationInput!]
  """Localizations to update"""
  update: [RowSwipeableGridUpdateLocalizationInput!]
  upsert: [RowSwipeableGridUpsertLocalizationInput!]
  """Localizations to delete"""
  delete: [Locale!]
}

input RowSwipeableGridUpdateManyInlineInput {
  """Create and connect multiple RowSwipeableGrid documents"""
  create: [RowSwipeableGridCreateInput!]
  """Connect multiple existing RowSwipeableGrid documents"""
  connect: [RowSwipeableGridConnectInput!]
  """Override currently-connected documents with multiple existing RowSwipeableGrid documents"""
  set: [RowSwipeableGridWhereUniqueInput!]
  """Update multiple RowSwipeableGrid documents"""
  update: [RowSwipeableGridUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple RowSwipeableGrid documents"""
  upsert: [RowSwipeableGridUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple RowSwipeableGrid documents"""
  disconnect: [RowSwipeableGridWhereUniqueInput!]
  """Delete multiple RowSwipeableGrid documents"""
  delete: [RowSwipeableGridWhereUniqueInput!]
}

input RowSwipeableGridUpdateManyInput {
  """title input for default locale (en)"""
  title: String
  """Optional updates to localizations"""
  localizations: RowSwipeableGridUpdateManyLocalizationsInput
}

input RowSwipeableGridUpdateManyLocalizationDataInput {
  title: String
}

input RowSwipeableGridUpdateManyLocalizationInput {
  data: RowSwipeableGridUpdateManyLocalizationDataInput!
  locale: Locale!
}

input RowSwipeableGridUpdateManyLocalizationsInput {
  """Localizations to update"""
  update: [RowSwipeableGridUpdateManyLocalizationInput!]
}

input RowSwipeableGridUpdateManyWithNestedWhereInput {
  """Document search"""
  where: RowSwipeableGridWhereInput!
  """Update many input"""
  data: RowSwipeableGridUpdateManyInput!
}

input RowSwipeableGridUpdateOneInlineInput {
  """Create and connect one RowSwipeableGrid document"""
  create: RowSwipeableGridCreateInput
  """Update single RowSwipeableGrid document"""
  update: RowSwipeableGridUpdateWithNestedWhereUniqueInput
  """Upsert single RowSwipeableGrid document"""
  upsert: RowSwipeableGridUpsertWithNestedWhereUniqueInput
  """Connect existing RowSwipeableGrid document"""
  connect: RowSwipeableGridWhereUniqueInput
  """Disconnect currently connected RowSwipeableGrid document"""
  disconnect: Boolean
  """Delete currently connected RowSwipeableGrid document"""
  delete: Boolean
}

input RowSwipeableGridUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowSwipeableGridWhereUniqueInput!
  """Document to update"""
  data: RowSwipeableGridUpdateInput!
}

input RowSwipeableGridUpsertInput {
  """Create document if it didn't exist"""
  create: RowSwipeableGridCreateInput!
  """Update document if it exists"""
  update: RowSwipeableGridUpdateInput!
}

input RowSwipeableGridUpsertLocalizationInput {
  update: RowSwipeableGridUpdateLocalizationDataInput!
  create: RowSwipeableGridCreateLocalizationDataInput!
  locale: Locale!
}

input RowSwipeableGridUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: RowSwipeableGridWhereUniqueInput!
  """Upsert data"""
  data: RowSwipeableGridUpsertInput!
}

"""Identifies documents"""
input RowSwipeableGridWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [RowSwipeableGridWhereInput!]
  """Logical OR on all given filters."""
  OR: [RowSwipeableGridWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [RowSwipeableGridWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  title: String
  """All values that are not equal to given value."""
  title_not: String
  """All values that are contained in given list."""
  title_in: [String!]
  """All values that are not contained in given list."""
  title_not_in: [String!]
  """All values containing the given string."""
  title_contains: String
  """All values not containing the given string."""
  title_not_contains: String
  """All values starting with the given string."""
  title_starts_with: String
  """All values not starting with the given string."""
  title_not_starts_with: String
  """All values ending with the given string."""
  title_ends_with: String
  """All values not ending with the given string"""
  title_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  pages_every: PageWhereInput
  pages_some: PageWhereInput
  pages_none: PageWhereInput
}

"""References RowSwipeableGrid record uniquely"""
input RowSwipeableGridWhereUniqueInput {
  id: ID
  identity: String
}

"""Stage system enumeration"""
enum Stage {
  """The Draft is the default stage for all your content."""
  DRAFT
  """The Published stage is where you can publish your content to."""
  PUBLISHED
}

enum SystemDateTimeFieldVariation {
  BASE
  LOCALIZATION
  COMBINED
}

input UnpublishLocaleInput {
  """Locales to unpublish"""
  locale: Locale!
  """Stages to unpublish selected locales from"""
  stages: [Stage!]!
}

"""User system model"""
type User implements Node {
  """System stage field"""
  stage: Stage!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [User!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt: DateTime!
  """The time the document was updated"""
  updatedAt: DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt: DateTime
  """The username"""
  name: String!
  """Profile Picture url"""
  picture: String
  """Flag to determine if user is active or not"""
  isActive: Boolean!
  """User Kind. Can be either MEMBER, PAT or PUBLIC"""
  kind: UserKind!
}

input UserConnectInput {
  """Document to connect"""
  where: UserWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [UserEdge!]!
  aggregate: Aggregate!
}

input UserCreateManyInlineInput {
  """Connect multiple existing User documents"""
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneInlineInput {
  """Connect one existing User document"""
  connect: UserWhereUniqueInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!
  """A cursor for use in pagination."""
  cursor: String!
}

"""System User Kind"""
enum UserKind {
  MEMBER
  PAT
  PUBLIC
  WEBHOOK
}

"""Identifies documents"""
input UserManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]
  """Logical OR on all given filters."""
  OR: [UserWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  name: String
  """All values that are not equal to given value."""
  name_not: String
  """All values that are contained in given list."""
  name_in: [String!]
  """All values that are not contained in given list."""
  name_not_in: [String!]
  """All values containing the given string."""
  name_contains: String
  """All values not containing the given string."""
  name_not_contains: String
  """All values starting with the given string."""
  name_starts_with: String
  """All values not starting with the given string."""
  name_not_starts_with: String
  """All values ending with the given string."""
  name_ends_with: String
  """All values not ending with the given string"""
  name_not_ends_with: String
  picture: String
  """All values that are not equal to given value."""
  picture_not: String
  """All values that are contained in given list."""
  picture_in: [String!]
  """All values that are not contained in given list."""
  picture_not_in: [String!]
  """All values containing the given string."""
  picture_contains: String
  """All values not containing the given string."""
  picture_not_contains: String
  """All values starting with the given string."""
  picture_starts_with: String
  """All values not starting with the given string."""
  picture_not_starts_with: String
  """All values ending with the given string."""
  picture_ends_with: String
  """All values not ending with the given string"""
  picture_not_ends_with: String
  isActive: Boolean
  """All values that are not equal to given value."""
  isActive_not: Boolean
  kind: UserKind
  """All values that are not equal to given value."""
  kind_not: UserKind
  """All values that are contained in given list."""
  kind_in: [UserKind!]
  """All values that are not contained in given list."""
  kind_not_in: [UserKind!]
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  name_ASC
  name_DESC
  picture_ASC
  picture_DESC
  isActive_ASC
  isActive_DESC
  kind_ASC
  kind_DESC
}

input UserUpdateManyInlineInput {
  """Connect multiple existing User documents"""
  connect: [UserConnectInput!]
  """Override currently-connected documents with multiple existing User documents"""
  set: [UserWhereUniqueInput!]
  """Disconnect multiple User documents"""
  disconnect: [UserWhereUniqueInput!]
}

input UserUpdateOneInlineInput {
  """Connect existing User document"""
  connect: UserWhereUniqueInput
  """Disconnect currently connected User document"""
  disconnect: Boolean
}

"""Identifies documents"""
input UserWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]
  """Logical OR on all given filters."""
  OR: [UserWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  name: String
  """All values that are not equal to given value."""
  name_not: String
  """All values that are contained in given list."""
  name_in: [String!]
  """All values that are not contained in given list."""
  name_not_in: [String!]
  """All values containing the given string."""
  name_contains: String
  """All values not containing the given string."""
  name_not_contains: String
  """All values starting with the given string."""
  name_starts_with: String
  """All values not starting with the given string."""
  name_not_starts_with: String
  """All values ending with the given string."""
  name_ends_with: String
  """All values not ending with the given string"""
  name_not_ends_with: String
  picture: String
  """All values that are not equal to given value."""
  picture_not: String
  """All values that are contained in given list."""
  picture_in: [String!]
  """All values that are not contained in given list."""
  picture_not_in: [String!]
  """All values containing the given string."""
  picture_contains: String
  """All values not containing the given string."""
  picture_not_contains: String
  """All values starting with the given string."""
  picture_starts_with: String
  """All values not starting with the given string."""
  picture_not_starts_with: String
  """All values ending with the given string."""
  picture_ends_with: String
  """All values not ending with the given string"""
  picture_not_ends_with: String
  isActive: Boolean
  """All values that are not equal to given value."""
  isActive_not: Boolean
  kind: UserKind
  """All values that are not equal to given value."""
  kind_not: UserKind
  """All values that are contained in given list."""
  kind_in: [UserKind!]
  """All values that are not contained in given list."""
  kind_not_in: [UserKind!]
}

"""References User record uniquely"""
input UserWhereUniqueInput {
  id: ID
}

type Usps implements Node {
  """System stage field"""
  stage: Stage!
  """Get the document in other stages"""
  documentInStages(
    """Potential stages that should be returned"""
    stages: [Stage!]! = [DRAFT, PUBLISHED]
    """Decides if the current stage should be included or not"""
    includeCurrent: Boolean! = false
    """Decides if the documents should match the parent documents locale or should use the fallback order defined in the tree"""
    inheritLocale: Boolean! = false
  ): [Usps!]!
  """The unique identifier"""
  id: ID!
  """The time the document was created"""
  createdAt: DateTime!
  """The time the document was updated"""
  updatedAt: DateTime!
  """The time the document was published. Null on documents in draft stage."""
  publishedAt: DateTime
  identity: String!
  """User that created this document"""
  createdBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`createdBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last updated this document"""
  updatedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`updatedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  """User that last published this document"""
  publishedBy(
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`publishedBy\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): User
  uspsMultiple(
    where: PageLinkWhereInput
    orderBy: PageLinkOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
    """
    Allows to optionally override locale filtering behaviour in the query's subtree.
    
    Note that \`uspsMultiple\` is a model without localized fields and will not be affected directly by this argument, however the locales will be passed on to any relational fields in the query's subtree for filtering.
    For related models with localized fields in the query's subtree, the first locale matching the provided list of locales will be returned, entries with non matching locales will be filtered out.
    
    This argument will overwrite any existing locale filtering defined in the query's tree for the subtree.
    """
    locales: [Locale!]
  ): [PageLink!]!
  """List of Usps versions"""
  history(
    limit: Int! = 10
    skip: Int! = 0
    """This is optional and can be used to fetch the document version history for a specific stage instead of the current one"""
    stageOverride: Stage
  ): [Version!]!
}

input UspsConnectInput {
  """Document to connect"""
  where: UspsWhereUniqueInput!
  """Allow to specify document position in list of connected documents, will default to appending at end of list"""
  position: ConnectPositionInput
}

"""A connection to a list of items."""
type UspsConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!
  """A list of edges."""
  edges: [UspsEdge!]!
  aggregate: Aggregate!
}

input UspsCreateInput {
  createdAt: DateTime
  updatedAt: DateTime
  identity: String!
  uspsMultiple: PageLinkCreateManyInlineInput
}

input UspsCreateManyInlineInput {
  """Create and connect multiple existing Usps documents"""
  create: [UspsCreateInput!]
  """Connect multiple existing Usps documents"""
  connect: [UspsWhereUniqueInput!]
}

input UspsCreateOneInlineInput {
  """Create and connect one Usps document"""
  create: UspsCreateInput
  """Connect one existing Usps document"""
  connect: UspsWhereUniqueInput
}

"""An edge in a connection."""
type UspsEdge {
  """The item at the end of the edge."""
  node: Usps!
  """A cursor for use in pagination."""
  cursor: String!
}

"""Identifies documents"""
input UspsManyWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [UspsWhereInput!]
  """Logical OR on all given filters."""
  OR: [UspsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [UspsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  uspsMultiple_every: PageLinkWhereInput
  uspsMultiple_some: PageLinkWhereInput
  uspsMultiple_none: PageLinkWhereInput
}

enum UspsOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  publishedAt_ASC
  publishedAt_DESC
  identity_ASC
  identity_DESC
}

input UspsUpdateInput {
  identity: String
  uspsMultiple: PageLinkUpdateManyInlineInput
}

input UspsUpdateManyInlineInput {
  """Create and connect multiple Usps documents"""
  create: [UspsCreateInput!]
  """Connect multiple existing Usps documents"""
  connect: [UspsConnectInput!]
  """Override currently-connected documents with multiple existing Usps documents"""
  set: [UspsWhereUniqueInput!]
  """Update multiple Usps documents"""
  update: [UspsUpdateWithNestedWhereUniqueInput!]
  """Upsert multiple Usps documents"""
  upsert: [UspsUpsertWithNestedWhereUniqueInput!]
  """Disconnect multiple Usps documents"""
  disconnect: [UspsWhereUniqueInput!]
  """Delete multiple Usps documents"""
  delete: [UspsWhereUniqueInput!]
}

input UspsUpdateManyInput {
  """No fields in updateMany data input"""
  _: String
}

input UspsUpdateManyWithNestedWhereInput {
  """Document search"""
  where: UspsWhereInput!
  """Update many input"""
  data: UspsUpdateManyInput!
}

input UspsUpdateOneInlineInput {
  """Create and connect one Usps document"""
  create: UspsCreateInput
  """Update single Usps document"""
  update: UspsUpdateWithNestedWhereUniqueInput
  """Upsert single Usps document"""
  upsert: UspsUpsertWithNestedWhereUniqueInput
  """Connect existing Usps document"""
  connect: UspsWhereUniqueInput
  """Disconnect currently connected Usps document"""
  disconnect: Boolean
  """Delete currently connected Usps document"""
  delete: Boolean
}

input UspsUpdateWithNestedWhereUniqueInput {
  """Unique document search"""
  where: UspsWhereUniqueInput!
  """Document to update"""
  data: UspsUpdateInput!
}

input UspsUpsertInput {
  """Create document if it didn't exist"""
  create: UspsCreateInput!
  """Update document if it exists"""
  update: UspsUpdateInput!
}

input UspsUpsertWithNestedWhereUniqueInput {
  """Unique document search"""
  where: UspsWhereUniqueInput!
  """Upsert data"""
  data: UspsUpsertInput!
}

"""Identifies documents"""
input UspsWhereInput {
  """Contains search across all appropriate fields."""
  _search: String
  """Logical AND on all given filters."""
  AND: [UspsWhereInput!]
  """Logical OR on all given filters."""
  OR: [UspsWhereInput!]
  """Logical NOT on all given filters combined by AND."""
  NOT: [UspsWhereInput!]
  id: ID
  """All values that are not equal to given value."""
  id_not: ID
  """All values that are contained in given list."""
  id_in: [ID!]
  """All values that are not contained in given list."""
  id_not_in: [ID!]
  """All values containing the given string."""
  id_contains: ID
  """All values not containing the given string."""
  id_not_contains: ID
  """All values starting with the given string."""
  id_starts_with: ID
  """All values not starting with the given string."""
  id_not_starts_with: ID
  """All values ending with the given string."""
  id_ends_with: ID
  """All values not ending with the given string"""
  id_not_ends_with: ID
  createdAt: DateTime
  """All values that are not equal to given value."""
  createdAt_not: DateTime
  """All values that are contained in given list."""
  createdAt_in: [DateTime!]
  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]
  """All values less than the given value."""
  createdAt_lt: DateTime
  """All values less than or equal the given value."""
  createdAt_lte: DateTime
  """All values greater than the given value."""
  createdAt_gt: DateTime
  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime
  """All values that are not equal to given value."""
  updatedAt_not: DateTime
  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]
  """All values less than the given value."""
  updatedAt_lt: DateTime
  """All values less than or equal the given value."""
  updatedAt_lte: DateTime
  """All values greater than the given value."""
  updatedAt_gt: DateTime
  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  publishedAt: DateTime
  """All values that are not equal to given value."""
  publishedAt_not: DateTime
  """All values that are contained in given list."""
  publishedAt_in: [DateTime!]
  """All values that are not contained in given list."""
  publishedAt_not_in: [DateTime!]
  """All values less than the given value."""
  publishedAt_lt: DateTime
  """All values less than or equal the given value."""
  publishedAt_lte: DateTime
  """All values greater than the given value."""
  publishedAt_gt: DateTime
  """All values greater than or equal the given value."""
  publishedAt_gte: DateTime
  identity: String
  """All values that are not equal to given value."""
  identity_not: String
  """All values that are contained in given list."""
  identity_in: [String!]
  """All values that are not contained in given list."""
  identity_not_in: [String!]
  """All values containing the given string."""
  identity_contains: String
  """All values not containing the given string."""
  identity_not_contains: String
  """All values starting with the given string."""
  identity_starts_with: String
  """All values not starting with the given string."""
  identity_not_starts_with: String
  """All values ending with the given string."""
  identity_ends_with: String
  """All values not ending with the given string"""
  identity_not_ends_with: String
  createdBy: UserWhereInput
  updatedBy: UserWhereInput
  publishedBy: UserWhereInput
  uspsMultiple_every: PageLinkWhereInput
  uspsMultiple_some: PageLinkWhereInput
  uspsMultiple_none: PageLinkWhereInput
}

"""References Usps record uniquely"""
input UspsWhereUniqueInput {
  id: ID
  identity: String
}

type Version {
  id: ID!
  stage: Stage!
  revision: Int!
  createdAt: DateTime!
}

input VersionWhereInput {
  id: ID!
  stage: Stage!
  revision: Int!
}

enum _FilterKind {
  search
  AND
  OR
  NOT
  eq
  eq_not
  in
  not_in
  lt
  lte
  gt
  gte
  contains
  not_contains
  starts_with
  not_starts_with
  ends_with
  not_ends_with
  contains_all
  contains_some
  contains_none
  relational_single
  relational_every
  relational_some
  relational_none
}

enum _MutationInputFieldKind {
  scalar
  richText
  richTextWithEmbeds
  enum
  relation
  union
  virtual
}

enum _MutationKind {
  create
  publish
  unpublish
  update
  upsert
  delete
  updateMany
  publishMany
  unpublishMany
  deleteMany
}

enum _OrderDirection {
  asc
  desc
}

enum _RelationInputCardinality {
  one
  many
}

enum _RelationInputKind {
  create
  update
}

enum _RelationKind {
  regular
  union
}

enum _SystemDateTimeFieldVariation {
  base
  localization
  combined
}

`, `.mesh/sources/graphcms/schema.graphql`);

module.exports = buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});