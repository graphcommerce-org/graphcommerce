type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * date-timeformat outlined in section 5.6 of the RFC 3339 profile of the ISO 8601
   * standard for representationof dates and times using the Gregorian calendar.
   */
  DateTime: any
  /** Slate-compatible RichText AST */
  RichTextAST: any
  /**
   * The Long scalar type represents non-fractional signed whole numeric values. Long
   * can represent values between -(2^63) and 2^63 - 1.
   */
  Long: any
  RGBATransparency: any
  Hex: any
  RGBAHue: any
  /**
   * A date string, such as 2007-12-03 (YYYY-MM-DD), compliant with ISO 8601 standard
   * for representation of dates using the Gregorian calendar.
   */
  Date: any
  /** Raw JSON value */
  Json: any
}

type GQL_FilterKind =
  | 'search'
  | 'AND'
  | 'OR'
  | 'NOT'
  | 'eq'
  | 'eq_not'
  | 'in'
  | 'not_in'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'contains'
  | 'not_contains'
  | 'starts_with'
  | 'not_starts_with'
  | 'ends_with'
  | 'not_ends_with'
  | 'contains_all'
  | 'contains_some'
  | 'contains_none'
  | 'relational_single'
  | 'relational_every'
  | 'relational_some'
  | 'relational_none'

type GQL_MutationInputFieldKind = 'scalar' | 'richText' | 'enum' | 'relation' | 'union' | 'virtual'

type GQL_MutationKind =
  | 'create'
  | 'publish'
  | 'unpublish'
  | 'update'
  | 'upsert'
  | 'delete'
  | 'updateMany'
  | 'publishMany'
  | 'unpublishMany'
  | 'deleteMany'

type GQL_OrderDirection = 'asc' | 'desc'

type GQL_RelationInputCardinality = 'one' | 'many'

type GQL_RelationInputKind = 'create' | 'update'

type GQL_RelationKind = 'regular' | 'union'

type GQLAggregate = {
  __typename?: 'Aggregate'
  count: Scalars['Int']
}

/** Asset system model */
type GQLAsset = GQLNode & {
  __typename?: 'Asset'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLAsset>
  /** Get the document in other stages */
  documentInStages: Array<GQLAsset>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** The file handle */
  handle: Scalars['String']
  /** The file name */
  fileName: Scalars['String']
  /** The height of the file */
  height?: Maybe<Scalars['Float']>
  /** The file width */
  width?: Maybe<Scalars['Float']>
  /** The file size */
  size?: Maybe<Scalars['Float']>
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>
  personAvatar: Array<GQLPerson>
  companyLogo: Array<GQLCompany>
  rowColumnThreeColOneIcon: Array<GQLRowColumnThree>
  rowColumnThreeColTwoIcon: Array<GQLRowColumnThree>
  rowColumnThreeColThreeIcon: Array<GQLRowColumnThree>
  rowColumnOneColOneIcon: Array<GQLRowColumnOne>
  rowHeroAsset: Array<GQLRowHero>
  alt?: Maybe<Scalars['String']>
  pageAsset: Array<GQLPage>
  rowColumnTwoColOneIcon: Array<GQLRowColumnTwo>
  rowColumnTwoColTwoIcon: Array<GQLRowColumnTwo>
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String']
}

/** Asset system model */
type GQLAssetLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

/** Asset system model */
type GQLAssetDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** Asset system model */
type GQLAssetPersonAvatarArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetCompanyLogoArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnThreeColOneIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnThreeColTwoIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnThreeColThreeIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnOneColOneIconArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowHeroAssetArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetPageAssetArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnTwoColOneIconArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetRowColumnTwoColTwoIconArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetUrlArgs = {
  transformation?: Maybe<GQLAssetTransformationInput>
}

type GQLAssetConnectInput = {
  /** Document to connect */
  where: GQLAssetWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLAssetConnection = {
  __typename?: 'AssetConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLAssetEdge>
  aggregate: GQLAggregate
}

type GQLAssetCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  personAvatar?: Maybe<GQLPersonCreateManyInlineInput>
  companyLogo?: Maybe<GQLCompanyCreateManyInlineInput>
  rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneCreateManyInlineInput>
  rowHeroAsset?: Maybe<GQLRowHeroCreateManyInlineInput>
  /** alt input for default locale (nl) */
  alt?: Maybe<Scalars['String']>
  pageAsset?: Maybe<GQLPageCreateManyInlineInput>
  rowColumnTwoColOneIcon?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  rowColumnTwoColTwoIcon?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLAssetCreateLocalizationsInput>
}

type GQLAssetCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  alt?: Maybe<Scalars['String']>
}

type GQLAssetCreateLocalizationInput = {
  /** Localization input */
  data: GQLAssetCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLAssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLAssetCreateLocalizationInput>>
}

type GQLAssetCreateManyInlineInput = {
  /** Create and connect multiple existing Asset documents */
  create?: Maybe<Array<GQLAssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<GQLAssetWhereUniqueInput>>
}

type GQLAssetCreateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<GQLAssetCreateInput>
  /** Connect one existing Asset document */
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

/** An edge in a connection. */
type GQLAssetEdge = {
  __typename?: 'AssetEdge'
  /** The item at the end of the edge. */
  node: GQLAsset
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLAssetManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLAssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLAssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLAssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
  rowColumnThreeColOneIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColOneIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColOneIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnOneColOneIcon_every?: Maybe<GQLRowColumnOneWhereInput>
  rowColumnOneColOneIcon_some?: Maybe<GQLRowColumnOneWhereInput>
  rowColumnOneColOneIcon_none?: Maybe<GQLRowColumnOneWhereInput>
  rowHeroAsset_every?: Maybe<GQLRowHeroWhereInput>
  rowHeroAsset_some?: Maybe<GQLRowHeroWhereInput>
  rowHeroAsset_none?: Maybe<GQLRowHeroWhereInput>
  pageAsset_every?: Maybe<GQLPageWhereInput>
  pageAsset_some?: Maybe<GQLPageWhereInput>
  pageAsset_none?: Maybe<GQLPageWhereInput>
  rowColumnTwoColOneIcon_every?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColOneIcon_some?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColOneIcon_none?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_every?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_some?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_none?: Maybe<GQLRowColumnTwoWhereInput>
}

type GQLAssetOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'handle_ASC'
  | 'handle_DESC'
  | 'fileName_ASC'
  | 'fileName_DESC'
  | 'height_ASC'
  | 'height_DESC'
  | 'width_ASC'
  | 'width_DESC'
  | 'size_ASC'
  | 'size_DESC'
  | 'mimeType_ASC'
  | 'mimeType_DESC'
  | 'alt_ASC'
  | 'alt_DESC'

/** Transformations for Assets */
type GQLAssetTransformationInput = {
  image?: Maybe<GQLImageTransformationInput>
  document?: Maybe<GQLDocumentTransformationInput>
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: Maybe<Scalars['Boolean']>
}

type GQLAssetUpdateInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  personAvatar?: Maybe<GQLPersonUpdateManyInlineInput>
  companyLogo?: Maybe<GQLCompanyUpdateManyInlineInput>
  rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneUpdateManyInlineInput>
  rowHeroAsset?: Maybe<GQLRowHeroUpdateManyInlineInput>
  /** alt input for default locale (nl) */
  alt?: Maybe<Scalars['String']>
  pageAsset?: Maybe<GQLPageUpdateManyInlineInput>
  rowColumnTwoColOneIcon?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  rowColumnTwoColTwoIcon?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLAssetUpdateLocalizationsInput>
}

type GQLAssetUpdateLocalizationDataInput = {
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  alt?: Maybe<Scalars['String']>
}

type GQLAssetUpdateLocalizationInput = {
  data: GQLAssetUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLAssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLAssetCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLAssetUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLAssetUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLAssetUpdateManyInlineInput = {
  /** Create and connect multiple Asset documents */
  create?: Maybe<Array<GQLAssetCreateInput>>
  /** Connect multiple existing Asset documents */
  connect?: Maybe<Array<GQLAssetConnectInput>>
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: Maybe<Array<GQLAssetWhereUniqueInput>>
  /** Update multiple Asset documents */
  update?: Maybe<Array<GQLAssetUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Asset documents */
  upsert?: Maybe<Array<GQLAssetUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Asset documents */
  disconnect?: Maybe<Array<GQLAssetWhereUniqueInput>>
  /** Delete multiple Asset documents */
  delete?: Maybe<Array<GQLAssetWhereUniqueInput>>
}

type GQLAssetUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLAssetUpdateManyLocalizationInput>>
}

type GQLAssetUpdateManyLocalizationInput = {
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  alt?: Maybe<Scalars['String']>
}

type GQLAssetUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLAssetWhereInput
  /** Update many input */
  data: GQLAssetUpdateManyInput
}

type GQLAssetUpdateOneInlineInput = {
  /** Create and connect one Asset document */
  create?: Maybe<GQLAssetCreateInput>
  /** Update single Asset document */
  update?: Maybe<GQLAssetUpdateWithNestedWhereUniqueInput>
  /** Upsert single Asset document */
  upsert?: Maybe<GQLAssetUpsertWithNestedWhereUniqueInput>
  /** Connect existing Asset document */
  connect?: Maybe<GQLAssetWhereUniqueInput>
  /** Disconnect currently connected Asset document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Asset document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLAssetUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLAssetWhereUniqueInput
  /** Document to update */
  data: GQLAssetUpdateInput
}

type GQLAssetUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLAssetCreateInput
  /** Update document if it exists */
  update: GQLAssetUpdateInput
}

type GQLAssetUpsertLocalizationInput = {
  update: GQLAssetUpdateLocalizationDataInput
  create: GQLAssetCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLAssetUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLAssetWhereUniqueInput
  /** Upsert data */
  data: GQLAssetUpsertInput
}

/** Identifies documents */
type GQLAssetWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLAssetWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLAssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLAssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  handle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  handle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  handle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  handle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  handle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  handle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  handle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  handle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  handle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  handle_not_ends_with?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  fileName_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  fileName_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  fileName_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  fileName_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  fileName_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  fileName_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  fileName_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  fileName_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  fileName_not_ends_with?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  height_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  height_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  height_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  height_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  height_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  height_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  height_gte?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  width_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  width_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  width_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  width_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  width_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  width_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  width_gte?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  size_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  size_in?: Maybe<Array<Scalars['Float']>>
  /** All values that are not contained in given list. */
  size_not_in?: Maybe<Array<Scalars['Float']>>
  /** All values less than the given value. */
  size_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  size_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  size_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  size_gte?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  mimeType_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  mimeType_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  mimeType_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  mimeType_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  mimeType_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  mimeType_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  mimeType_not_ends_with?: Maybe<Scalars['String']>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
  rowColumnThreeColOneIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColOneIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColOneIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColTwoIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnThreeColThreeIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  rowColumnOneColOneIcon_every?: Maybe<GQLRowColumnOneWhereInput>
  rowColumnOneColOneIcon_some?: Maybe<GQLRowColumnOneWhereInput>
  rowColumnOneColOneIcon_none?: Maybe<GQLRowColumnOneWhereInput>
  rowHeroAsset_every?: Maybe<GQLRowHeroWhereInput>
  rowHeroAsset_some?: Maybe<GQLRowHeroWhereInput>
  rowHeroAsset_none?: Maybe<GQLRowHeroWhereInput>
  alt?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  alt_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  alt_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  alt_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  alt_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  alt_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  alt_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  alt_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  alt_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  alt_not_ends_with?: Maybe<Scalars['String']>
  pageAsset_every?: Maybe<GQLPageWhereInput>
  pageAsset_some?: Maybe<GQLPageWhereInput>
  pageAsset_none?: Maybe<GQLPageWhereInput>
  rowColumnTwoColOneIcon_every?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColOneIcon_some?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColOneIcon_none?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_every?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_some?: Maybe<GQLRowColumnTwoWhereInput>
  rowColumnTwoColTwoIcon_none?: Maybe<GQLRowColumnTwoWhereInput>
}

/** References Asset record uniquely */
type GQLAssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

type GQLBatchPayload = {
  __typename?: 'BatchPayload'
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long']
}

/** Representing a color value comprising of HEX, RGBA and css color values */
type GQLColor = {
  __typename?: 'Color'
  hex: Scalars['Hex']
  rgba: GQLRgba
  css: Scalars['String']
}

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
type GQLColorInput = {
  hex?: Maybe<Scalars['Hex']>
  rgba?: Maybe<GQLRgbaInput>
}

type GQLCompany = GQLNode & {
  __typename?: 'Company'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLCompany>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  logo: GQLAsset
  rowCompanySlider: Array<GQLRowCompanySlider>
}

type GQLCompanyDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLCompanyRowCompanySliderArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLCompanyConnectInput = {
  /** Document to connect */
  where: GQLCompanyWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLCompanyConnection = {
  __typename?: 'CompanyConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLCompanyEdge>
  aggregate: GQLAggregate
}

type GQLCompanyCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  logo: GQLAssetCreateOneInlineInput
  rowCompanySlider?: Maybe<GQLRowCompanySliderCreateManyInlineInput>
}

type GQLCompanyCreateManyInlineInput = {
  /** Create and connect multiple existing Company documents */
  create?: Maybe<Array<GQLCompanyCreateInput>>
  /** Connect multiple existing Company documents */
  connect?: Maybe<Array<GQLCompanyWhereUniqueInput>>
}

type GQLCompanyCreateOneInlineInput = {
  /** Create and connect one Company document */
  create?: Maybe<GQLCompanyCreateInput>
  /** Connect one existing Company document */
  connect?: Maybe<GQLCompanyWhereUniqueInput>
}

/** An edge in a connection. */
type GQLCompanyEdge = {
  __typename?: 'CompanyEdge'
  /** The item at the end of the edge. */
  node: GQLCompany
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLCompanyManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLCompanyWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLCompanyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLCompanyWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  logo?: Maybe<GQLAssetWhereInput>
  rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
}

type GQLCompanyOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'name_ASC'
  | 'name_DESC'

type GQLCompanyUpdateInput = {
  name?: Maybe<Scalars['String']>
  logo?: Maybe<GQLAssetUpdateOneInlineInput>
  rowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyInlineInput>
}

type GQLCompanyUpdateManyInlineInput = {
  /** Create and connect multiple Company documents */
  create?: Maybe<Array<GQLCompanyCreateInput>>
  /** Connect multiple existing Company documents */
  connect?: Maybe<Array<GQLCompanyConnectInput>>
  /** Override currently-connected documents with multiple existing Company documents */
  set?: Maybe<Array<GQLCompanyWhereUniqueInput>>
  /** Update multiple Company documents */
  update?: Maybe<Array<GQLCompanyUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Company documents */
  upsert?: Maybe<Array<GQLCompanyUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Company documents */
  disconnect?: Maybe<Array<GQLCompanyWhereUniqueInput>>
  /** Delete multiple Company documents */
  delete?: Maybe<Array<GQLCompanyWhereUniqueInput>>
}

type GQLCompanyUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLCompanyUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLCompanyWhereInput
  /** Update many input */
  data: GQLCompanyUpdateManyInput
}

type GQLCompanyUpdateOneInlineInput = {
  /** Create and connect one Company document */
  create?: Maybe<GQLCompanyCreateInput>
  /** Update single Company document */
  update?: Maybe<GQLCompanyUpdateWithNestedWhereUniqueInput>
  /** Upsert single Company document */
  upsert?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  /** Connect existing Company document */
  connect?: Maybe<GQLCompanyWhereUniqueInput>
  /** Disconnect currently connected Company document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Company document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLCompanyUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLCompanyWhereUniqueInput
  /** Document to update */
  data: GQLCompanyUpdateInput
}

type GQLCompanyUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLCompanyCreateInput
  /** Update document if it exists */
  update: GQLCompanyUpdateInput
}

type GQLCompanyUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLCompanyWhereUniqueInput
  /** Upsert data */
  data: GQLCompanyUpsertInput
}

/** Identifies documents */
type GQLCompanyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLCompanyWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLCompanyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLCompanyWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  logo?: Maybe<GQLAssetWhereInput>
  rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
}

/** References Company record uniquely */
type GQLCompanyWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

type GQLConnectPositionInput = {
  /** Connect document after specified document */
  after?: Maybe<Scalars['ID']>
  /** Connect document before specified document */
  before?: Maybe<Scalars['ID']>
  /** Connect document at first position */
  start?: Maybe<Scalars['Boolean']>
  /** Connect document at last position */
  end?: Maybe<Scalars['Boolean']>
}

type GQLContactForm = GQLNode & {
  __typename?: 'ContactForm'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLContactForm>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  subject: GQLContactSubject
  message: Scalars['String']
}

type GQLContactFormDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** A connection to a list of items. */
type GQLContactFormConnection = {
  __typename?: 'ContactFormConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLContactFormEdge>
  aggregate: GQLAggregate
}

type GQLContactFormCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  subject: GQLContactSubject
  message: Scalars['String']
}

/** An edge in a connection. */
type GQLContactFormEdge = {
  __typename?: 'ContactFormEdge'
  /** The item at the end of the edge. */
  node: GQLContactForm
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLContactFormManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLContactFormWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLContactFormWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLContactFormWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  email_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  email_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  email_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  email_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  email_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  email_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  email_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  email_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  email_not_ends_with?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  phoneNumber_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  phoneNumber_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  phoneNumber_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  phoneNumber_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  phoneNumber_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  phoneNumber_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  phoneNumber_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  phoneNumber_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  phoneNumber_not_ends_with?: Maybe<Scalars['String']>
  subject?: Maybe<GQLContactSubject>
  /** All values that are not equal to given value. */
  subject_not?: Maybe<GQLContactSubject>
  /** All values that are contained in given list. */
  subject_in?: Maybe<Array<GQLContactSubject>>
  /** All values that are not contained in given list. */
  subject_not_in?: Maybe<Array<GQLContactSubject>>
  message?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  message_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  message_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  message_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  message_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  message_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  message_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  message_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  message_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  message_not_ends_with?: Maybe<Scalars['String']>
}

type GQLContactFormOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'phoneNumber_ASC'
  | 'phoneNumber_DESC'
  | 'subject_ASC'
  | 'subject_DESC'
  | 'message_ASC'
  | 'message_DESC'

type GQLContactFormUpdateInput = {
  name?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  subject?: Maybe<GQLContactSubject>
  message?: Maybe<Scalars['String']>
}

type GQLContactFormUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  subject: GQLContactSubject
  message: Scalars['String']
}

type GQLContactFormUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLContactFormWhereInput
  /** Update many input */
  data: GQLContactFormUpdateManyInput
}

type GQLContactFormUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLContactFormWhereUniqueInput
  /** Document to update */
  data: GQLContactFormUpdateInput
}

type GQLContactFormUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLContactFormCreateInput
  /** Update document if it exists */
  update: GQLContactFormUpdateInput
}

type GQLContactFormUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLContactFormWhereUniqueInput
  /** Upsert data */
  data: GQLContactFormUpsertInput
}

/** Identifies documents */
type GQLContactFormWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLContactFormWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLContactFormWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLContactFormWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  email_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  email_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  email_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  email_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  email_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  email_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  email_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  email_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  email_not_ends_with?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  phoneNumber_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  phoneNumber_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  phoneNumber_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  phoneNumber_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  phoneNumber_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  phoneNumber_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  phoneNumber_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  phoneNumber_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  phoneNumber_not_ends_with?: Maybe<Scalars['String']>
  subject?: Maybe<GQLContactSubject>
  /** All values that are not equal to given value. */
  subject_not?: Maybe<GQLContactSubject>
  /** All values that are contained in given list. */
  subject_in?: Maybe<Array<GQLContactSubject>>
  /** All values that are not contained in given list. */
  subject_not_in?: Maybe<Array<GQLContactSubject>>
  message?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  message_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  message_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  message_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  message_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  message_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  message_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  message_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  message_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  message_not_ends_with?: Maybe<Scalars['String']>
}

/** References ContactForm record uniquely */
type GQLContactFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

type GQLContactSubject = 'COLLABORATION' | 'MODULE' | 'NEW_PROJECT' | 'OTHER' | 'VACANCY'

type GQLDocumentFileTypes =
  | 'jpg'
  | 'odp'
  | 'ods'
  | 'odt'
  | 'png'
  | 'svg'
  | 'txt'
  | 'webp'
  | 'docx'
  | 'pdf'
  | 'html'
  | 'doc'
  | 'xlsx'
  | 'xls'
  | 'pptx'
  | 'ppt'

type GQLDocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: Maybe<GQLDocumentFileTypes>
}

/** Transformations for Documents */
type GQLDocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: Maybe<GQLDocumentOutputInput>
}

type GQLImageFit =
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  | 'clip'
  /**
   * Resizes the image to fit the specified parameters exactly by removing any
   * parts of the image that don't fit within the boundaries.
   */
  | 'crop'
  /**
   * Resizes the image to fit the specified parameters exactly by scaling the image
   * to the desired size. The aspect ratio of the image is not respected and the
   * image can be distorted using this method.
   */
  | 'scale'
  /**
   * Resizes the image to fit within the parameters, but as opposed to 'fit:clip'
   * will not scale the image if the image is smaller than the output size.
   */
  | 'max'

type GQLImageResizeInput = {
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: Maybe<Scalars['Int']>
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: Maybe<Scalars['Int']>
  /** The default value for the fit parameter is fit:clip. */
  fit?: Maybe<GQLImageFit>
}

/** Transformations for Images */
type GQLImageTransformationInput = {
  /** Resizes the image */
  resize?: Maybe<GQLImageResizeInput>
}

type GQLLinkExternal = GQLNode & {
  __typename?: 'LinkExternal'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLLinkExternal>
  /** Get the document in other stages */
  documentInStages: Array<GQLLinkExternal>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  url: Scalars['String']
  /** If filled in a LinkBlock will be rendered */
  description?: Maybe<GQLRichText>
  rowHeroVideo: Array<GQLRowHero>
}

type GQLLinkExternalLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLLinkExternalDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLLinkExternalRowHeroVideoArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLLinkExternalConnectInput = {
  /** Document to connect */
  where: GQLLinkExternalWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLLinkExternalConnection = {
  __typename?: 'LinkExternalConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLLinkExternalEdge>
  aggregate: GQLAggregate
}

type GQLLinkExternalCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** title input for default locale (nl) */
  title: Scalars['String']
  /** url input for default locale (nl) */
  url: Scalars['String']
  /** description input for default locale (nl) */
  description?: Maybe<Scalars['RichTextAST']>
  rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLLinkExternalCreateLocalizationsInput>
}

type GQLLinkExternalCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  url: Scalars['String']
  description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalCreateLocalizationInput = {
  /** Localization input */
  data: GQLLinkExternalCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkExternalCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLLinkExternalCreateLocalizationInput>>
}

type GQLLinkExternalCreateManyInlineInput = {
  /** Create and connect multiple existing LinkExternal documents */
  create?: Maybe<Array<GQLLinkExternalCreateInput>>
  /** Connect multiple existing LinkExternal documents */
  connect?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
}

type GQLLinkExternalCreateOneInlineInput = {
  /** Create and connect one LinkExternal document */
  create?: Maybe<GQLLinkExternalCreateInput>
  /** Connect one existing LinkExternal document */
  connect?: Maybe<GQLLinkExternalWhereUniqueInput>
}

/** An edge in a connection. */
type GQLLinkExternalEdge = {
  __typename?: 'LinkExternalEdge'
  /** The item at the end of the edge. */
  node: GQLLinkExternal
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLLinkExternalManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLLinkExternalWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLLinkExternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLLinkExternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
}

type GQLLinkExternalOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'url_ASC'
  | 'url_DESC'

type GQLLinkExternalUpdateInput = {
  /** title input for default locale (nl) */
  title?: Maybe<Scalars['String']>
  /** url input for default locale (nl) */
  url?: Maybe<Scalars['String']>
  /** description input for default locale (nl) */
  description?: Maybe<Scalars['RichTextAST']>
  rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLLinkExternalUpdateLocalizationsInput>
}

type GQLLinkExternalUpdateLocalizationDataInput = {
  title: Scalars['String']
  url: Scalars['String']
  description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalUpdateLocalizationInput = {
  data: GQLLinkExternalUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkExternalUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLLinkExternalCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLLinkExternalUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLLinkExternalUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLLinkExternalUpdateManyInlineInput = {
  /** Create and connect multiple LinkExternal documents */
  create?: Maybe<Array<GQLLinkExternalCreateInput>>
  /** Connect multiple existing LinkExternal documents */
  connect?: Maybe<Array<GQLLinkExternalConnectInput>>
  /** Override currently-connected documents with multiple existing LinkExternal documents */
  set?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
  /** Update multiple LinkExternal documents */
  update?: Maybe<Array<GQLLinkExternalUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple LinkExternal documents */
  upsert?: Maybe<Array<GQLLinkExternalUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple LinkExternal documents */
  disconnect?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
  /** Delete multiple LinkExternal documents */
  delete?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
}

type GQLLinkExternalUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLLinkExternalUpdateManyLocalizationInput>>
}

type GQLLinkExternalUpdateManyLocalizationInput = {
  title: Scalars['String']
  url: Scalars['String']
  description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLLinkExternalWhereInput
  /** Update many input */
  data: GQLLinkExternalUpdateManyInput
}

type GQLLinkExternalUpdateOneInlineInput = {
  /** Create and connect one LinkExternal document */
  create?: Maybe<GQLLinkExternalCreateInput>
  /** Update single LinkExternal document */
  update?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  /** Upsert single LinkExternal document */
  upsert?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  /** Connect existing LinkExternal document */
  connect?: Maybe<GQLLinkExternalWhereUniqueInput>
  /** Disconnect currently connected LinkExternal document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected LinkExternal document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLLinkExternalUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLLinkExternalWhereUniqueInput
  /** Document to update */
  data: GQLLinkExternalUpdateInput
}

type GQLLinkExternalUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLLinkExternalCreateInput
  /** Update document if it exists */
  update: GQLLinkExternalUpdateInput
}

type GQLLinkExternalUpsertLocalizationInput = {
  update: GQLLinkExternalUpdateLocalizationDataInput
  create: GQLLinkExternalCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkExternalUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLLinkExternalWhereUniqueInput
  /** Upsert data */
  data: GQLLinkExternalUpsertInput
}

/** Identifies documents */
type GQLLinkExternalWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLLinkExternalWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLLinkExternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLLinkExternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  url_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  url_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  url_not_ends_with?: Maybe<Scalars['String']>
}

/** References LinkExternal record uniquely */
type GQLLinkExternalWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

type GQLLinkInternal = GQLNode & {
  __typename?: 'LinkInternal'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLLinkInternal>
  /** Get the document in other stages */
  documentInStages: Array<GQLLinkInternal>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  page?: Maybe<GQLPage>
  description?: Maybe<GQLRichText>
  rowPeopleWithText: Array<GQLRowPeopleWithText>
  rowServicesWithText: Array<GQLRowServicesWithText>
  rowHeroVideo: Array<GQLRowHero>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
}

type GQLLinkInternalLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLLinkInternalDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLLinkInternalRowPeopleWithTextArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLLinkInternalRowServicesWithTextArgs = {
  where?: Maybe<GQLRowServicesWithTextWhereInput>
  orderBy?: Maybe<GQLRowServicesWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLLinkInternalRowHeroVideoArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLLinkInternalConnectInput = {
  /** Document to connect */
  where: GQLLinkInternalWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLLinkInternalConnection = {
  __typename?: 'LinkInternalConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLLinkInternalEdge>
  aggregate: GQLAggregate
}

type GQLLinkInternalCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** title input for default locale (nl) */
  title: Scalars['String']
  page?: Maybe<GQLPageCreateOneInlineInput>
  description?: Maybe<Scalars['RichTextAST']>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
  rowServicesWithText?: Maybe<GQLRowServicesWithTextCreateManyInlineInput>
  rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPostCreateOneInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLLinkInternalCreateLocalizationsInput>
}

type GQLLinkInternalCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
}

type GQLLinkInternalCreateLocalizationInput = {
  /** Localization input */
  data: GQLLinkInternalCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkInternalCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLLinkInternalCreateLocalizationInput>>
}

type GQLLinkInternalCreateManyInlineInput = {
  /** Create and connect multiple existing LinkInternal documents */
  create?: Maybe<Array<GQLLinkInternalCreateInput>>
  /** Connect multiple existing LinkInternal documents */
  connect?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
}

type GQLLinkInternalCreateOneInlineInput = {
  /** Create and connect one LinkInternal document */
  create?: Maybe<GQLLinkInternalCreateInput>
  /** Connect one existing LinkInternal document */
  connect?: Maybe<GQLLinkInternalWhereUniqueInput>
}

/** An edge in a connection. */
type GQLLinkInternalEdge = {
  __typename?: 'LinkInternalEdge'
  /** The item at the end of the edge. */
  node: GQLLinkInternal
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLLinkInternalManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLLinkInternalWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLLinkInternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLLinkInternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  page?: Maybe<GQLPageWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereInput>
}

type GQLLinkInternalOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'title_ASC'
  | 'title_DESC'

type GQLLinkInternalUpdateInput = {
  /** title input for default locale (nl) */
  title?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateOneInlineInput>
  description?: Maybe<Scalars['RichTextAST']>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
  rowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyInlineInput>
  rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateOneInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLLinkInternalUpdateLocalizationsInput>
}

type GQLLinkInternalUpdateLocalizationDataInput = {
  title: Scalars['String']
}

type GQLLinkInternalUpdateLocalizationInput = {
  data: GQLLinkInternalUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkInternalUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLLinkInternalCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLLinkInternalUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLLinkInternalUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLLinkInternalUpdateManyInlineInput = {
  /** Create and connect multiple LinkInternal documents */
  create?: Maybe<Array<GQLLinkInternalCreateInput>>
  /** Connect multiple existing LinkInternal documents */
  connect?: Maybe<Array<GQLLinkInternalConnectInput>>
  /** Override currently-connected documents with multiple existing LinkInternal documents */
  set?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
  /** Update multiple LinkInternal documents */
  update?: Maybe<Array<GQLLinkInternalUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple LinkInternal documents */
  upsert?: Maybe<Array<GQLLinkInternalUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple LinkInternal documents */
  disconnect?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
  /** Delete multiple LinkInternal documents */
  delete?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
}

type GQLLinkInternalUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['RichTextAST']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLLinkInternalUpdateManyLocalizationInput>>
}

type GQLLinkInternalUpdateManyLocalizationInput = {
  title: Scalars['String']
}

type GQLLinkInternalUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLLinkInternalWhereInput
  /** Update many input */
  data: GQLLinkInternalUpdateManyInput
}

type GQLLinkInternalUpdateOneInlineInput = {
  /** Create and connect one LinkInternal document */
  create?: Maybe<GQLLinkInternalCreateInput>
  /** Update single LinkInternal document */
  update?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
  /** Upsert single LinkInternal document */
  upsert?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
  /** Connect existing LinkInternal document */
  connect?: Maybe<GQLLinkInternalWhereUniqueInput>
  /** Disconnect currently connected LinkInternal document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected LinkInternal document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLLinkInternalUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLLinkInternalWhereUniqueInput
  /** Document to update */
  data: GQLLinkInternalUpdateInput
}

type GQLLinkInternalUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLLinkInternalCreateInput
  /** Update document if it exists */
  update: GQLLinkInternalUpdateInput
}

type GQLLinkInternalUpsertLocalizationInput = {
  update: GQLLinkInternalUpdateLocalizationDataInput
  create: GQLLinkInternalCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLLinkInternalUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLLinkInternalWhereUniqueInput
  /** Upsert data */
  data: GQLLinkInternalUpsertInput
}

/** Identifies documents */
type GQLLinkInternalWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLLinkInternalWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLLinkInternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLLinkInternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereInput>
}

/** References LinkInternal record uniquely */
type GQLLinkInternalWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

/** Locale system enumeration */
type GQLLocale =
  /** System locale */
  'nl' | 'en'

/** Representing a geolocation point with latitude and longitude */
type GQLLocation = {
  __typename?: 'Location'
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  distance: Scalars['Float']
}

/** Representing a geolocation point with latitude and longitude */
type GQLLocationDistanceArgs = {
  from: GQLLocationInput
}

/** Input for a geolocation point with latitude and longitude */
type GQLLocationInput = {
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

type GQLMenu = GQLNode & {
  __typename?: 'Menu'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLMenu>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  pages: Array<GQLPage>
}

type GQLMenuDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLMenuPagesArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLMenuConnectInput = {
  /** Document to connect */
  where: GQLMenuWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLMenuConnection = {
  __typename?: 'MenuConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLMenuEdge>
  aggregate: GQLAggregate
}

type GQLMenuCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  pages?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLMenuCreateManyInlineInput = {
  /** Create and connect multiple existing Menu documents */
  create?: Maybe<Array<GQLMenuCreateInput>>
  /** Connect multiple existing Menu documents */
  connect?: Maybe<Array<GQLMenuWhereUniqueInput>>
}

type GQLMenuCreateOneInlineInput = {
  /** Create and connect one Menu document */
  create?: Maybe<GQLMenuCreateInput>
  /** Connect one existing Menu document */
  connect?: Maybe<GQLMenuWhereUniqueInput>
}

/** An edge in a connection. */
type GQLMenuEdge = {
  __typename?: 'MenuEdge'
  /** The item at the end of the edge. */
  node: GQLMenu
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLMenuManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLMenuWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLMenuWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLMenuWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  pages_every?: Maybe<GQLPageWhereInput>
  pages_some?: Maybe<GQLPageWhereInput>
  pages_none?: Maybe<GQLPageWhereInput>
}

type GQLMenuOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLMenuUpdateInput = {
  identity?: Maybe<Scalars['String']>
  pages?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLMenuUpdateManyInlineInput = {
  /** Create and connect multiple Menu documents */
  create?: Maybe<Array<GQLMenuCreateInput>>
  /** Connect multiple existing Menu documents */
  connect?: Maybe<Array<GQLMenuConnectInput>>
  /** Override currently-connected documents with multiple existing Menu documents */
  set?: Maybe<Array<GQLMenuWhereUniqueInput>>
  /** Update multiple Menu documents */
  update?: Maybe<Array<GQLMenuUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Menu documents */
  upsert?: Maybe<Array<GQLMenuUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Menu documents */
  disconnect?: Maybe<Array<GQLMenuWhereUniqueInput>>
  /** Delete multiple Menu documents */
  delete?: Maybe<Array<GQLMenuWhereUniqueInput>>
}

type GQLMenuUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLMenuUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLMenuWhereInput
  /** Update many input */
  data: GQLMenuUpdateManyInput
}

type GQLMenuUpdateOneInlineInput = {
  /** Create and connect one Menu document */
  create?: Maybe<GQLMenuCreateInput>
  /** Update single Menu document */
  update?: Maybe<GQLMenuUpdateWithNestedWhereUniqueInput>
  /** Upsert single Menu document */
  upsert?: Maybe<GQLMenuUpsertWithNestedWhereUniqueInput>
  /** Connect existing Menu document */
  connect?: Maybe<GQLMenuWhereUniqueInput>
  /** Disconnect currently connected Menu document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Menu document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLMenuUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLMenuWhereUniqueInput
  /** Document to update */
  data: GQLMenuUpdateInput
}

type GQLMenuUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLMenuCreateInput
  /** Update document if it exists */
  update: GQLMenuUpdateInput
}

type GQLMenuUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLMenuWhereUniqueInput
  /** Upsert data */
  data: GQLMenuUpsertInput
}

/** Identifies documents */
type GQLMenuWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLMenuWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLMenuWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLMenuWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  pages_every?: Maybe<GQLPageWhereInput>
  pages_some?: Maybe<GQLPageWhereInput>
  pages_none?: Maybe<GQLPageWhereInput>
}

/** References Menu record uniquely */
type GQLMenuWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLMetaRobots = 'INDEX_FOLLOW' | 'INDEX_NOFOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW'

type GQLMutation = {
  __typename?: 'Mutation'
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<GQLAsset>
  /** Update one asset */
  updateAsset?: Maybe<GQLAsset>
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<GQLAsset>
  /** Upsert one asset */
  upsertAsset?: Maybe<GQLAsset>
  /** Publish one asset */
  publishAsset?: Maybe<GQLAsset>
  /**
   * Unpublish one asset from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishAsset?: Maybe<GQLAsset>
  /** Update many assets */
  updateManyAssets: GQLBatchPayload
  /** Delete many Asset documents */
  deleteManyAssets: GQLBatchPayload
  /** Publish many Asset documents */
  publishManyAssets: GQLBatchPayload
  /** Unpublish many Asset documents */
  unpublishManyAssets: GQLBatchPayload
  /** Create one company */
  createCompany?: Maybe<GQLCompany>
  /** Update one company */
  updateCompany?: Maybe<GQLCompany>
  /** Delete one company from _all_ existing stages. Returns deleted document. */
  deleteCompany?: Maybe<GQLCompany>
  /** Upsert one company */
  upsertCompany?: Maybe<GQLCompany>
  /** Publish one company */
  publishCompany?: Maybe<GQLCompany>
  /**
   * Unpublish one company from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishCompany?: Maybe<GQLCompany>
  /** Update many companies */
  updateManyCompanies: GQLBatchPayload
  /** Delete many Company documents */
  deleteManyCompanies: GQLBatchPayload
  /** Publish many Company documents */
  publishManyCompanies: GQLBatchPayload
  /** Unpublish many Company documents */
  unpublishManyCompanies: GQLBatchPayload
  /** Create one contactForm */
  createContactForm?: Maybe<GQLContactForm>
  /** Update one contactForm */
  updateContactForm?: Maybe<GQLContactForm>
  /** Delete one contactForm from _all_ existing stages. Returns deleted document. */
  deleteContactForm?: Maybe<GQLContactForm>
  /** Upsert one contactForm */
  upsertContactForm?: Maybe<GQLContactForm>
  /** Publish one contactForm */
  publishContactForm?: Maybe<GQLContactForm>
  /**
   * Unpublish one contactForm from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishContactForm?: Maybe<GQLContactForm>
  /** Update many contactForms */
  updateManyContactForms: GQLBatchPayload
  /** Delete many ContactForm documents */
  deleteManyContactForms: GQLBatchPayload
  /** Publish many ContactForm documents */
  publishManyContactForms: GQLBatchPayload
  /** Unpublish many ContactForm documents */
  unpublishManyContactForms: GQLBatchPayload
  /** Create one linkExternal */
  createLinkExternal?: Maybe<GQLLinkExternal>
  /** Update one linkExternal */
  updateLinkExternal?: Maybe<GQLLinkExternal>
  /** Delete one linkExternal from _all_ existing stages. Returns deleted document. */
  deleteLinkExternal?: Maybe<GQLLinkExternal>
  /** Upsert one linkExternal */
  upsertLinkExternal?: Maybe<GQLLinkExternal>
  /** Publish one linkExternal */
  publishLinkExternal?: Maybe<GQLLinkExternal>
  /**
   * Unpublish one linkExternal from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishLinkExternal?: Maybe<GQLLinkExternal>
  /** Update many linkExternals */
  updateManyLinkExternals: GQLBatchPayload
  /** Delete many LinkExternal documents */
  deleteManyLinkExternals: GQLBatchPayload
  /** Publish many LinkExternal documents */
  publishManyLinkExternals: GQLBatchPayload
  /** Unpublish many LinkExternal documents */
  unpublishManyLinkExternals: GQLBatchPayload
  /** Create one linkInternal */
  createLinkInternal?: Maybe<GQLLinkInternal>
  /** Update one linkInternal */
  updateLinkInternal?: Maybe<GQLLinkInternal>
  /** Delete one linkInternal from _all_ existing stages. Returns deleted document. */
  deleteLinkInternal?: Maybe<GQLLinkInternal>
  /** Upsert one linkInternal */
  upsertLinkInternal?: Maybe<GQLLinkInternal>
  /** Publish one linkInternal */
  publishLinkInternal?: Maybe<GQLLinkInternal>
  /**
   * Unpublish one linkInternal from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishLinkInternal?: Maybe<GQLLinkInternal>
  /** Update many linkInternals */
  updateManyLinkInternals: GQLBatchPayload
  /** Delete many LinkInternal documents */
  deleteManyLinkInternals: GQLBatchPayload
  /** Publish many LinkInternal documents */
  publishManyLinkInternals: GQLBatchPayload
  /** Unpublish many LinkInternal documents */
  unpublishManyLinkInternals: GQLBatchPayload
  /** Create one menu */
  createMenu?: Maybe<GQLMenu>
  /** Update one menu */
  updateMenu?: Maybe<GQLMenu>
  /** Delete one menu from _all_ existing stages. Returns deleted document. */
  deleteMenu?: Maybe<GQLMenu>
  /** Upsert one menu */
  upsertMenu?: Maybe<GQLMenu>
  /** Publish one menu */
  publishMenu?: Maybe<GQLMenu>
  /**
   * Unpublish one menu from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishMenu?: Maybe<GQLMenu>
  /** Update many menus */
  updateManyMenus: GQLBatchPayload
  /** Delete many Menu documents */
  deleteManyMenus: GQLBatchPayload
  /** Publish many Menu documents */
  publishManyMenus: GQLBatchPayload
  /** Unpublish many Menu documents */
  unpublishManyMenus: GQLBatchPayload
  /** Create one page */
  createPage?: Maybe<GQLPage>
  /** Update one page */
  updatePage?: Maybe<GQLPage>
  /** Delete one page from _all_ existing stages. Returns deleted document. */
  deletePage?: Maybe<GQLPage>
  /** Upsert one page */
  upsertPage?: Maybe<GQLPage>
  /** Publish one page */
  publishPage?: Maybe<GQLPage>
  /**
   * Unpublish one page from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishPage?: Maybe<GQLPage>
  /** Update many pages */
  updateManyPages: GQLBatchPayload
  /** Delete many Page documents */
  deleteManyPages: GQLBatchPayload
  /** Publish many Page documents */
  publishManyPages: GQLBatchPayload
  /** Unpublish many Page documents */
  unpublishManyPages: GQLBatchPayload
  /** Create one person */
  createPerson?: Maybe<GQLPerson>
  /** Update one person */
  updatePerson?: Maybe<GQLPerson>
  /** Delete one person from _all_ existing stages. Returns deleted document. */
  deletePerson?: Maybe<GQLPerson>
  /** Upsert one person */
  upsertPerson?: Maybe<GQLPerson>
  /** Publish one person */
  publishPerson?: Maybe<GQLPerson>
  /**
   * Unpublish one person from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishPerson?: Maybe<GQLPerson>
  /** Update many people */
  updateManyPeople: GQLBatchPayload
  /** Delete many Person documents */
  deleteManyPeople: GQLBatchPayload
  /** Publish many Person documents */
  publishManyPeople: GQLBatchPayload
  /** Unpublish many Person documents */
  unpublishManyPeople: GQLBatchPayload
  /** Create one personList */
  createPersonList?: Maybe<GQLPersonList>
  /** Update one personList */
  updatePersonList?: Maybe<GQLPersonList>
  /** Delete one personList from _all_ existing stages. Returns deleted document. */
  deletePersonList?: Maybe<GQLPersonList>
  /** Upsert one personList */
  upsertPersonList?: Maybe<GQLPersonList>
  /** Publish one personList */
  publishPersonList?: Maybe<GQLPersonList>
  /**
   * Unpublish one personList from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishPersonList?: Maybe<GQLPersonList>
  /** Update many personLists */
  updateManyPersonLists: GQLBatchPayload
  /** Delete many PersonList documents */
  deleteManyPersonLists: GQLBatchPayload
  /** Publish many PersonList documents */
  publishManyPersonLists: GQLBatchPayload
  /** Unpublish many PersonList documents */
  unpublishManyPersonLists: GQLBatchPayload
  /** Create one rowColumnOne */
  createRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Update one rowColumnOne */
  updateRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Delete one rowColumnOne from _all_ existing stages. Returns deleted document. */
  deleteRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Upsert one rowColumnOne */
  upsertRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Publish one rowColumnOne */
  publishRowColumnOne?: Maybe<GQLRowColumnOne>
  /**
   * Unpublish one rowColumnOne from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Update many rowColumnOnes */
  updateManyRowColumnOnes: GQLBatchPayload
  /** Delete many RowColumnOne documents */
  deleteManyRowColumnOnes: GQLBatchPayload
  /** Publish many RowColumnOne documents */
  publishManyRowColumnOnes: GQLBatchPayload
  /** Unpublish many RowColumnOne documents */
  unpublishManyRowColumnOnes: GQLBatchPayload
  /** Create one rowColumnThree */
  createRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Update one rowColumnThree */
  updateRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Delete one rowColumnThree from _all_ existing stages. Returns deleted document. */
  deleteRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Upsert one rowColumnThree */
  upsertRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Publish one rowColumnThree */
  publishRowColumnThree?: Maybe<GQLRowColumnThree>
  /**
   * Unpublish one rowColumnThree from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Update many rowColumnThrees */
  updateManyRowColumnThrees: GQLBatchPayload
  /** Delete many RowColumnThree documents */
  deleteManyRowColumnThrees: GQLBatchPayload
  /** Publish many RowColumnThree documents */
  publishManyRowColumnThrees: GQLBatchPayload
  /** Unpublish many RowColumnThree documents */
  unpublishManyRowColumnThrees: GQLBatchPayload
  /** Create one rowColumnTwo */
  createRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Update one rowColumnTwo */
  updateRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Delete one rowColumnTwo from _all_ existing stages. Returns deleted document. */
  deleteRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Upsert one rowColumnTwo */
  upsertRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Publish one rowColumnTwo */
  publishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /**
   * Unpublish one rowColumnTwo from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Update many rowColumnTwos */
  updateManyRowColumnTwos: GQLBatchPayload
  /** Delete many RowColumnTwo documents */
  deleteManyRowColumnTwos: GQLBatchPayload
  /** Publish many RowColumnTwo documents */
  publishManyRowColumnTwos: GQLBatchPayload
  /** Unpublish many RowColumnTwo documents */
  unpublishManyRowColumnTwos: GQLBatchPayload
  /** Create one rowCompanySlider */
  createRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Update one rowCompanySlider */
  updateRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Delete one rowCompanySlider from _all_ existing stages. Returns deleted document. */
  deleteRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Upsert one rowCompanySlider */
  upsertRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Publish one rowCompanySlider */
  publishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /**
   * Unpublish one rowCompanySlider from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Update many rowCompanySliders */
  updateManyRowCompanySliders: GQLBatchPayload
  /** Delete many RowCompanySlider documents */
  deleteManyRowCompanySliders: GQLBatchPayload
  /** Publish many RowCompanySlider documents */
  publishManyRowCompanySliders: GQLBatchPayload
  /** Unpublish many RowCompanySlider documents */
  unpublishManyRowCompanySliders: GQLBatchPayload
  /** Create one rowHero */
  createRowHero?: Maybe<GQLRowHero>
  /** Update one rowHero */
  updateRowHero?: Maybe<GQLRowHero>
  /** Delete one rowHero from _all_ existing stages. Returns deleted document. */
  deleteRowHero?: Maybe<GQLRowHero>
  /** Upsert one rowHero */
  upsertRowHero?: Maybe<GQLRowHero>
  /** Publish one rowHero */
  publishRowHero?: Maybe<GQLRowHero>
  /**
   * Unpublish one rowHero from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowHero?: Maybe<GQLRowHero>
  /** Update many rowHeroes */
  updateManyRowHeroes: GQLBatchPayload
  /** Delete many RowHero documents */
  deleteManyRowHeroes: GQLBatchPayload
  /** Publish many RowHero documents */
  publishManyRowHeroes: GQLBatchPayload
  /** Unpublish many RowHero documents */
  unpublishManyRowHeroes: GQLBatchPayload
  /** Create one rowPeopleWithText */
  createRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Update one rowPeopleWithText */
  updateRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Delete one rowPeopleWithText from _all_ existing stages. Returns deleted document. */
  deleteRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Upsert one rowPeopleWithText */
  upsertRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Publish one rowPeopleWithText */
  publishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /**
   * Unpublish one rowPeopleWithText from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Update many rowPeopleWithTexts */
  updateManyRowPeopleWithTexts: GQLBatchPayload
  /** Delete many RowPeopleWithText documents */
  deleteManyRowPeopleWithTexts: GQLBatchPayload
  /** Publish many RowPeopleWithText documents */
  publishManyRowPeopleWithTexts: GQLBatchPayload
  /** Unpublish many RowPeopleWithText documents */
  unpublishManyRowPeopleWithTexts: GQLBatchPayload
  /** Create one rowRecentBlogPost */
  createRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Update one rowRecentBlogPost */
  updateRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Delete one rowRecentBlogPost from _all_ existing stages. Returns deleted document. */
  deleteRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Upsert one rowRecentBlogPost */
  upsertRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Publish one rowRecentBlogPost */
  publishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /**
   * Unpublish one rowRecentBlogPost from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Update many rowRecentBlogPosts */
  updateManyRowRecentBlogPosts: GQLBatchPayload
  /** Delete many RowRecentBlogPost documents */
  deleteManyRowRecentBlogPosts: GQLBatchPayload
  /** Publish many RowRecentBlogPost documents */
  publishManyRowRecentBlogPosts: GQLBatchPayload
  /** Unpublish many RowRecentBlogPost documents */
  unpublishManyRowRecentBlogPosts: GQLBatchPayload
  /** Create one rowServicesWithText */
  createRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Update one rowServicesWithText */
  updateRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Delete one rowServicesWithText from _all_ existing stages. Returns deleted document. */
  deleteRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Upsert one rowServicesWithText */
  upsertRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Publish one rowServicesWithText */
  publishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /**
   * Unpublish one rowServicesWithText from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Update many rowServicesWithTexts */
  updateManyRowServicesWithTexts: GQLBatchPayload
  /** Delete many RowServicesWithText documents */
  deleteManyRowServicesWithTexts: GQLBatchPayload
  /** Publish many RowServicesWithText documents */
  publishManyRowServicesWithTexts: GQLBatchPayload
  /** Unpublish many RowServicesWithText documents */
  unpublishManyRowServicesWithTexts: GQLBatchPayload
  /** Create one rowYoutubeVideo */
  createRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Update one rowYoutubeVideo */
  updateRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Delete one rowYoutubeVideo from _all_ existing stages. Returns deleted document. */
  deleteRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Upsert one rowYoutubeVideo */
  upsertRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Publish one rowYoutubeVideo */
  publishRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /**
   * Unpublish one rowYoutubeVideo from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  unpublishRowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Update many rowYoutubeVideos */
  updateManyRowYoutubeVideos: GQLBatchPayload
  /** Delete many RowYoutubeVideo documents */
  deleteManyRowYoutubeVideos: GQLBatchPayload
  /** Publish many RowYoutubeVideo documents */
  publishManyRowYoutubeVideos: GQLBatchPayload
  /** Unpublish many RowYoutubeVideo documents */
  unpublishManyRowYoutubeVideos: GQLBatchPayload
}

type GQLMutationCreateAssetArgs = {
  data: GQLAssetCreateInput
}

type GQLMutationUpdateAssetArgs = {
  where: GQLAssetWhereUniqueInput
  data: GQLAssetUpdateInput
}

type GQLMutationDeleteAssetArgs = {
  where: GQLAssetWhereUniqueInput
}

type GQLMutationUpsertAssetArgs = {
  where: GQLAssetWhereUniqueInput
  upsert: GQLAssetUpsertInput
}

type GQLMutationPublishAssetArgs = {
  where: GQLAssetWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishAssetArgs = {
  where: GQLAssetWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  data: GQLAssetUpdateManyInput
}

type GQLMutationDeleteManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
}

type GQLMutationPublishManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateCompanyArgs = {
  data: GQLCompanyCreateInput
}

type GQLMutationUpdateCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  data: GQLCompanyUpdateInput
}

type GQLMutationDeleteCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
}

type GQLMutationUpsertCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  upsert: GQLCompanyUpsertInput
}

type GQLMutationPublishCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  data: GQLCompanyUpdateManyInput
}

type GQLMutationDeleteManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
}

type GQLMutationPublishManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateContactFormArgs = {
  data: GQLContactFormCreateInput
}

type GQLMutationUpdateContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  data: GQLContactFormUpdateInput
}

type GQLMutationDeleteContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
}

type GQLMutationUpsertContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  upsert: GQLContactFormUpsertInput
}

type GQLMutationPublishContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyContactFormsArgs = {
  where?: Maybe<GQLContactFormManyWhereInput>
  data: GQLContactFormUpdateManyInput
}

type GQLMutationDeleteManyContactFormsArgs = {
  where?: Maybe<GQLContactFormManyWhereInput>
}

type GQLMutationPublishManyContactFormsArgs = {
  where?: Maybe<GQLContactFormManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyContactFormsArgs = {
  where?: Maybe<GQLContactFormManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateLinkExternalArgs = {
  data: GQLLinkExternalCreateInput
}

type GQLMutationUpdateLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  data: GQLLinkExternalUpdateInput
}

type GQLMutationDeleteLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
}

type GQLMutationUpsertLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  upsert: GQLLinkExternalUpsertInput
}

type GQLMutationPublishLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  data: GQLLinkExternalUpdateManyInput
}

type GQLMutationDeleteManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
}

type GQLMutationPublishManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateLinkInternalArgs = {
  data: GQLLinkInternalCreateInput
}

type GQLMutationUpdateLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  data: GQLLinkInternalUpdateInput
}

type GQLMutationDeleteLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
}

type GQLMutationUpsertLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  upsert: GQLLinkInternalUpsertInput
}

type GQLMutationPublishLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  data: GQLLinkInternalUpdateManyInput
}

type GQLMutationDeleteManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
}

type GQLMutationPublishManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateMenuArgs = {
  data: GQLMenuCreateInput
}

type GQLMutationUpdateMenuArgs = {
  where: GQLMenuWhereUniqueInput
  data: GQLMenuUpdateInput
}

type GQLMutationDeleteMenuArgs = {
  where: GQLMenuWhereUniqueInput
}

type GQLMutationUpsertMenuArgs = {
  where: GQLMenuWhereUniqueInput
  upsert: GQLMenuUpsertInput
}

type GQLMutationPublishMenuArgs = {
  where: GQLMenuWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishMenuArgs = {
  where: GQLMenuWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  data: GQLMenuUpdateManyInput
}

type GQLMutationDeleteManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
}

type GQLMutationPublishManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreatePageArgs = {
  data: GQLPageCreateInput
}

type GQLMutationUpdatePageArgs = {
  where: GQLPageWhereUniqueInput
  data: GQLPageUpdateInput
}

type GQLMutationDeletePageArgs = {
  where: GQLPageWhereUniqueInput
}

type GQLMutationUpsertPageArgs = {
  where: GQLPageWhereUniqueInput
  upsert: GQLPageUpsertInput
}

type GQLMutationPublishPageArgs = {
  where: GQLPageWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishPageArgs = {
  where: GQLPageWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  data: GQLPageUpdateManyInput
}

type GQLMutationDeleteManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
}

type GQLMutationPublishManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreatePersonArgs = {
  data: GQLPersonCreateInput
}

type GQLMutationUpdatePersonArgs = {
  where: GQLPersonWhereUniqueInput
  data: GQLPersonUpdateInput
}

type GQLMutationDeletePersonArgs = {
  where: GQLPersonWhereUniqueInput
}

type GQLMutationUpsertPersonArgs = {
  where: GQLPersonWhereUniqueInput
  upsert: GQLPersonUpsertInput
}

type GQLMutationPublishPersonArgs = {
  where: GQLPersonWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishPersonArgs = {
  where: GQLPersonWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  data: GQLPersonUpdateManyInput
}

type GQLMutationDeleteManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
}

type GQLMutationPublishManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreatePersonListArgs = {
  data: GQLPersonListCreateInput
}

type GQLMutationUpdatePersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  data: GQLPersonListUpdateInput
}

type GQLMutationDeletePersonListArgs = {
  where: GQLPersonListWhereUniqueInput
}

type GQLMutationUpsertPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  upsert: GQLPersonListUpsertInput
}

type GQLMutationPublishPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  data: GQLPersonListUpdateManyInput
}

type GQLMutationDeleteManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
}

type GQLMutationPublishManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateRowColumnOneArgs = {
  data: GQLRowColumnOneCreateInput
}

type GQLMutationUpdateRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  data: GQLRowColumnOneUpdateInput
}

type GQLMutationDeleteRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
}

type GQLMutationUpsertRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  upsert: GQLRowColumnOneUpsertInput
}

type GQLMutationPublishRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  data: GQLRowColumnOneUpdateManyInput
}

type GQLMutationDeleteManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
}

type GQLMutationPublishManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateRowColumnThreeArgs = {
  data: GQLRowColumnThreeCreateInput
}

type GQLMutationUpdateRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  data: GQLRowColumnThreeUpdateInput
}

type GQLMutationDeleteRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
}

type GQLMutationUpsertRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  upsert: GQLRowColumnThreeUpsertInput
}

type GQLMutationPublishRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  data: GQLRowColumnThreeUpdateManyInput
}

type GQLMutationDeleteManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
}

type GQLMutationPublishManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateRowColumnTwoArgs = {
  data: GQLRowColumnTwoCreateInput
}

type GQLMutationUpdateRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  data: GQLRowColumnTwoUpdateInput
}

type GQLMutationDeleteRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
}

type GQLMutationUpsertRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  upsert: GQLRowColumnTwoUpsertInput
}

type GQLMutationPublishRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  data: GQLRowColumnTwoUpdateManyInput
}

type GQLMutationDeleteManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
}

type GQLMutationPublishManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateRowCompanySliderArgs = {
  data: GQLRowCompanySliderCreateInput
}

type GQLMutationUpdateRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  data: GQLRowCompanySliderUpdateInput
}

type GQLMutationDeleteRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
}

type GQLMutationUpsertRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  upsert: GQLRowCompanySliderUpsertInput
}

type GQLMutationPublishRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  data: GQLRowCompanySliderUpdateManyInput
}

type GQLMutationDeleteManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
}

type GQLMutationPublishManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateRowHeroArgs = {
  data: GQLRowHeroCreateInput
}

type GQLMutationUpdateRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  data: GQLRowHeroUpdateInput
}

type GQLMutationDeleteRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
}

type GQLMutationUpsertRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  upsert: GQLRowHeroUpsertInput
}

type GQLMutationPublishRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  data: GQLRowHeroUpdateManyInput
}

type GQLMutationDeleteManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
}

type GQLMutationPublishManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateRowPeopleWithTextArgs = {
  data: GQLRowPeopleWithTextCreateInput
}

type GQLMutationUpdateRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  data: GQLRowPeopleWithTextUpdateInput
}

type GQLMutationDeleteRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
}

type GQLMutationUpsertRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  upsert: GQLRowPeopleWithTextUpsertInput
}

type GQLMutationPublishRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  data: GQLRowPeopleWithTextUpdateManyInput
}

type GQLMutationDeleteManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
}

type GQLMutationPublishManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateRowRecentBlogPostArgs = {
  data: GQLRowRecentBlogPostCreateInput
}

type GQLMutationUpdateRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  data: GQLRowRecentBlogPostUpdateInput
}

type GQLMutationDeleteRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
}

type GQLMutationUpsertRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  upsert: GQLRowRecentBlogPostUpsertInput
}

type GQLMutationPublishRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  from?: Array<GQLStage>
}

type GQLMutationUpdateManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  data: GQLRowRecentBlogPostUpdateManyInput
}

type GQLMutationDeleteManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
}

type GQLMutationPublishManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  from?: Array<GQLStage>
}

type GQLMutationCreateRowServicesWithTextArgs = {
  data: GQLRowServicesWithTextCreateInput
}

type GQLMutationUpdateRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  data: GQLRowServicesWithTextUpdateInput
}

type GQLMutationDeleteRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
}

type GQLMutationUpsertRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  upsert: GQLRowServicesWithTextUpsertInput
}

type GQLMutationPublishRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  data: GQLRowServicesWithTextUpdateManyInput
}

type GQLMutationDeleteManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
}

type GQLMutationPublishManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateRowYoutubeVideoArgs = {
  data: GQLRowYoutubeVideoCreateInput
}

type GQLMutationUpdateRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
  data: GQLRowYoutubeVideoUpdateInput
}

type GQLMutationDeleteRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
}

type GQLMutationUpsertRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
  upsert: GQLRowYoutubeVideoUpsertInput
}

type GQLMutationPublishRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

type GQLMutationUnpublishRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUpdateManyRowYoutubeVideosArgs = {
  where?: Maybe<GQLRowYoutubeVideoManyWhereInput>
  data: GQLRowYoutubeVideoUpdateManyInput
}

type GQLMutationDeleteManyRowYoutubeVideosArgs = {
  where?: Maybe<GQLRowYoutubeVideoManyWhereInput>
}

type GQLMutationPublishManyRowYoutubeVideosArgs = {
  where?: Maybe<GQLRowYoutubeVideoManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowYoutubeVideosArgs = {
  where?: Maybe<GQLRowYoutubeVideoManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

/** An object with an ID */
type GQLNode = {
  /** The id of the object. */
  id: Scalars['ID']
  /** The Stage of an object */
  stage: GQLStage
}

type GQLPage = GQLNode & {
  __typename?: 'Page'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLPage>
  /** Get the document in other stages */
  documentInStages: Array<GQLPage>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  /** Used in menu's, breadcrumbs, etc. */
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  metaRobots?: Maybe<GQLMetaRobots>
  /** Content */
  content: Array<GQLPageContent>
  releaseDate?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAsset>
  internalLink: Array<GQLLinkInternal>
  menu: Array<GQLMenu>
}

type GQLPageLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLPageDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLPageContentArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPageInternalLinkArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPageMenuArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPageConnectInput = {
  /** Document to connect */
  where: GQLPageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPageConnection = {
  __typename?: 'PageConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLPageEdge>
  aggregate: GQLAggregate
}

type GQLPageContent =
  | GQLRowServicesWithText
  | GQLRowColumnThree
  | GQLRowColumnTwo
  | GQLRowRecentBlogPost
  | GQLRowPeopleWithText
  | GQLRowColumnOne
  | GQLRowCompanySlider
  | GQLRowHero
  | GQLRowYoutubeVideo

type GQLPageContentConnectInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextConnectInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeConnectInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoConnectInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostConnectInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextConnectInput>
  RowColumnOne?: Maybe<GQLRowColumnOneConnectInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderConnectInput>
  RowHero?: Maybe<GQLRowHeroConnectInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoConnectInput>
}

type GQLPageContentCreateInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextCreateInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeCreateInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoCreateInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostCreateInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateInput>
  RowColumnOne?: Maybe<GQLRowColumnOneCreateInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderCreateInput>
  RowHero?: Maybe<GQLRowHeroCreateInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoCreateInput>
}

type GQLPageContentCreateManyInlineInput = {
  /** Create and connect multiple existing PageContent documents */
  create?: Maybe<Array<GQLPageContentCreateInput>>
  /** Connect multiple existing PageContent documents */
  connect?: Maybe<Array<GQLPageContentWhereUniqueInput>>
}

type GQLPageContentCreateOneInlineInput = {
  /** Create and connect one PageContent document */
  create?: Maybe<GQLPageContentCreateInput>
  /** Connect one existing PageContent document */
  connect?: Maybe<GQLPageContentWhereUniqueInput>
}

type GQLPageContentUpdateInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateInput>
  RowHero?: Maybe<GQLRowHeroUpdateInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoUpdateInput>
}

type GQLPageContentUpdateManyInlineInput = {
  /** Create and connect multiple PageContent documents */
  create?: Maybe<Array<GQLPageContentCreateInput>>
  /** Connect multiple existing PageContent documents */
  connect?: Maybe<Array<GQLPageContentConnectInput>>
  /** Override currently-connected documents with multiple existing PageContent documents */
  set?: Maybe<Array<GQLPageContentWhereUniqueInput>>
  /** Update multiple PageContent documents */
  update?: Maybe<Array<GQLPageContentUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple PageContent documents */
  upsert?: Maybe<Array<GQLPageContentUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple PageContent documents */
  disconnect?: Maybe<Array<GQLPageContentWhereUniqueInput>>
  /** Delete multiple PageContent documents */
  delete?: Maybe<Array<GQLPageContentWhereUniqueInput>>
}

type GQLPageContentUpdateManyWithNestedWhereInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyWithNestedWhereInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateManyWithNestedWhereInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyWithNestedWhereInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateManyWithNestedWhereInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyWithNestedWhereInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateManyWithNestedWhereInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyWithNestedWhereInput>
  RowHero?: Maybe<GQLRowHeroUpdateManyWithNestedWhereInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoUpdateManyWithNestedWhereInput>
}

type GQLPageContentUpdateOneInlineInput = {
  /** Create and connect one PageContent document */
  create?: Maybe<GQLPageContentCreateInput>
  /** Update single PageContent document */
  update?: Maybe<GQLPageContentUpdateWithNestedWhereUniqueInput>
  /** Upsert single PageContent document */
  upsert?: Maybe<GQLPageContentUpsertWithNestedWhereUniqueInput>
  /** Connect existing PageContent document */
  connect?: Maybe<GQLPageContentWhereUniqueInput>
  /** Disconnect currently connected PageContent document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected PageContent document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLPageContentUpdateWithNestedWhereUniqueInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoUpdateWithNestedWhereUniqueInput>
}

type GQLPageContentUpsertWithNestedWhereUniqueInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoUpsertWithNestedWhereUniqueInput>
}

type GQLPageContentWhereInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeWhereInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoWhereInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereInput>
  RowColumnOne?: Maybe<GQLRowColumnOneWhereInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderWhereInput>
  RowHero?: Maybe<GQLRowHeroWhereInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoWhereInput>
}

type GQLPageContentWhereUniqueInput = {
  RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
  RowColumnThree?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroWhereUniqueInput>
  RowYoutubeVideo?: Maybe<GQLRowYoutubeVideoWhereUniqueInput>
}

type GQLPageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** url input for default locale (nl) */
  url: Scalars['String']
  /** title input for default locale (nl) */
  title: Scalars['String']
  /** metaTitle input for default locale (nl) */
  metaTitle: Scalars['String']
  /** metaDescription input for default locale (nl) */
  metaDescription: Scalars['String']
  metaRobots?: Maybe<GQLMetaRobots>
  content?: Maybe<GQLPageContentCreateManyInlineInput>
  /** releaseDate input for default locale (nl) */
  releaseDate?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAssetCreateOneInlineInput>
  internalLink?: Maybe<GQLLinkInternalCreateManyInlineInput>
  menu?: Maybe<GQLMenuCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLPageCreateLocalizationsInput>
}

type GQLPageCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
}

type GQLPageCreateLocalizationInput = {
  /** Localization input */
  data: GQLPageCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLPageCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLPageCreateLocalizationInput>>
}

type GQLPageCreateManyInlineInput = {
  /** Create and connect multiple existing Page documents */
  create?: Maybe<Array<GQLPageCreateInput>>
  /** Connect multiple existing Page documents */
  connect?: Maybe<Array<GQLPageWhereUniqueInput>>
}

type GQLPageCreateOneInlineInput = {
  /** Create and connect one Page document */
  create?: Maybe<GQLPageCreateInput>
  /** Connect one existing Page document */
  connect?: Maybe<GQLPageWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPageEdge = {
  __typename?: 'PageEdge'
  /** The item at the end of the edge. */
  node: GQLPage
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Information about pagination in a connection. */
type GQLPageInfo = {
  __typename?: 'PageInfo'
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>
}

/** Identifies documents */
type GQLPageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  metaRobots?: Maybe<GQLMetaRobots>
  /** All values that are not equal to given value. */
  metaRobots_not?: Maybe<GQLMetaRobots>
  /** All values that are contained in given list. */
  metaRobots_in?: Maybe<Array<GQLMetaRobots>>
  /** All values that are not contained in given list. */
  metaRobots_not_in?: Maybe<Array<GQLMetaRobots>>
  asset?: Maybe<GQLAssetWhereInput>
  internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  menu_every?: Maybe<GQLMenuWhereInput>
  menu_some?: Maybe<GQLMenuWhereInput>
  menu_none?: Maybe<GQLMenuWhereInput>
}

type GQLPageOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'url_ASC'
  | 'url_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'metaTitle_ASC'
  | 'metaTitle_DESC'
  | 'metaDescription_ASC'
  | 'metaDescription_DESC'
  | 'metaRobots_ASC'
  | 'metaRobots_DESC'
  | 'releaseDate_ASC'
  | 'releaseDate_DESC'

type GQLPageUpdateInput = {
  /** url input for default locale (nl) */
  url?: Maybe<Scalars['String']>
  /** title input for default locale (nl) */
  title?: Maybe<Scalars['String']>
  /** metaTitle input for default locale (nl) */
  metaTitle?: Maybe<Scalars['String']>
  /** metaDescription input for default locale (nl) */
  metaDescription?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  content?: Maybe<GQLPageContentUpdateManyInlineInput>
  /** releaseDate input for default locale (nl) */
  releaseDate?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAssetUpdateOneInlineInput>
  internalLink?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  menu?: Maybe<GQLMenuUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLPageUpdateLocalizationsInput>
}

type GQLPageUpdateLocalizationDataInput = {
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
}

type GQLPageUpdateLocalizationInput = {
  data: GQLPageUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLPageUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLPageCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLPageUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLPageUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLPageUpdateManyInlineInput = {
  /** Create and connect multiple Page documents */
  create?: Maybe<Array<GQLPageCreateInput>>
  /** Connect multiple existing Page documents */
  connect?: Maybe<Array<GQLPageConnectInput>>
  /** Override currently-connected documents with multiple existing Page documents */
  set?: Maybe<Array<GQLPageWhereUniqueInput>>
  /** Update multiple Page documents */
  update?: Maybe<Array<GQLPageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Page documents */
  upsert?: Maybe<Array<GQLPageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Page documents */
  disconnect?: Maybe<Array<GQLPageWhereUniqueInput>>
  /** Delete multiple Page documents */
  delete?: Maybe<Array<GQLPageWhereUniqueInput>>
}

type GQLPageUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  metaRobots?: Maybe<GQLMetaRobots>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLPageUpdateManyLocalizationInput>>
}

type GQLPageUpdateManyLocalizationInput = {
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
}

type GQLPageUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLPageWhereInput
  /** Update many input */
  data: GQLPageUpdateManyInput
}

type GQLPageUpdateOneInlineInput = {
  /** Create and connect one Page document */
  create?: Maybe<GQLPageCreateInput>
  /** Update single Page document */
  update?: Maybe<GQLPageUpdateWithNestedWhereUniqueInput>
  /** Upsert single Page document */
  upsert?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  /** Connect existing Page document */
  connect?: Maybe<GQLPageWhereUniqueInput>
  /** Disconnect currently connected Page document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Page document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLPageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPageWhereUniqueInput
  /** Document to update */
  data: GQLPageUpdateInput
}

type GQLPageUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLPageCreateInput
  /** Update document if it exists */
  update: GQLPageUpdateInput
}

type GQLPageUpsertLocalizationInput = {
  update: GQLPageUpdateLocalizationDataInput
  create: GQLPageCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLPageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPageWhereUniqueInput
  /** Upsert data */
  data: GQLPageUpsertInput
}

/** Identifies documents */
type GQLPageWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPageWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPageWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  url_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  url_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  url_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  metaTitle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  metaTitle_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  metaTitle_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  metaTitle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  metaTitle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  metaTitle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  metaTitle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  metaTitle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  metaTitle_not_ends_with?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  metaDescription_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  metaDescription_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  metaDescription_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  metaDescription_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  metaDescription_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  metaDescription_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  metaDescription_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  metaDescription_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  metaDescription_not_ends_with?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  /** All values that are not equal to given value. */
  metaRobots_not?: Maybe<GQLMetaRobots>
  /** All values that are contained in given list. */
  metaRobots_in?: Maybe<Array<GQLMetaRobots>>
  /** All values that are not contained in given list. */
  metaRobots_not_in?: Maybe<Array<GQLMetaRobots>>
  releaseDate?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  releaseDate_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  releaseDate_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  releaseDate_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  releaseDate_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  releaseDate_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  releaseDate_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  releaseDate_gte?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAssetWhereInput>
  internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  menu_every?: Maybe<GQLMenuWhereInput>
  menu_some?: Maybe<GQLMenuWhereInput>
  menu_none?: Maybe<GQLMenuWhereInput>
}

/** References Page record uniquely */
type GQLPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

type GQLPerson = GQLNode & {
  __typename?: 'Person'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLPerson>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  avatar: GQLAsset
  name: Scalars['String']
  personList: Array<GQLPersonList>
}

type GQLPersonDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLPersonPersonListArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPersonConnectInput = {
  /** Document to connect */
  where: GQLPersonWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPersonConnection = {
  __typename?: 'PersonConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLPersonEdge>
  aggregate: GQLAggregate
}

type GQLPersonCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  avatar: GQLAssetCreateOneInlineInput
  name: Scalars['String']
  personList?: Maybe<GQLPersonListCreateManyInlineInput>
}

type GQLPersonCreateManyInlineInput = {
  /** Create and connect multiple existing Person documents */
  create?: Maybe<Array<GQLPersonCreateInput>>
  /** Connect multiple existing Person documents */
  connect?: Maybe<Array<GQLPersonWhereUniqueInput>>
}

type GQLPersonCreateOneInlineInput = {
  /** Create and connect one Person document */
  create?: Maybe<GQLPersonCreateInput>
  /** Connect one existing Person document */
  connect?: Maybe<GQLPersonWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPersonEdge = {
  __typename?: 'PersonEdge'
  /** The item at the end of the edge. */
  node: GQLPerson
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

type GQLPersonList = GQLNode & {
  __typename?: 'PersonList'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLPersonList>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  people: Array<GQLPerson>
  rowPeopleWithText: Array<GQLRowPeopleWithText>
}

type GQLPersonListDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLPersonListPeopleArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPersonListRowPeopleWithTextArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPersonListConnectInput = {
  /** Document to connect */
  where: GQLPersonListWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPersonListConnection = {
  __typename?: 'PersonListConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLPersonListEdge>
  aggregate: GQLAggregate
}

type GQLPersonListCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  people?: Maybe<GQLPersonCreateManyInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
}

type GQLPersonListCreateManyInlineInput = {
  /** Create and connect multiple existing PersonList documents */
  create?: Maybe<Array<GQLPersonListCreateInput>>
  /** Connect multiple existing PersonList documents */
  connect?: Maybe<Array<GQLPersonListWhereUniqueInput>>
}

type GQLPersonListCreateOneInlineInput = {
  /** Create and connect one PersonList document */
  create?: Maybe<GQLPersonListCreateInput>
  /** Connect one existing PersonList document */
  connect?: Maybe<GQLPersonListWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPersonListEdge = {
  __typename?: 'PersonListEdge'
  /** The item at the end of the edge. */
  node: GQLPersonList
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLPersonListManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPersonListWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPersonListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPersonListWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  people_every?: Maybe<GQLPersonWhereInput>
  people_some?: Maybe<GQLPersonWhereInput>
  people_none?: Maybe<GQLPersonWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
}

type GQLPersonListOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLPersonListUpdateInput = {
  identity?: Maybe<Scalars['String']>
  people?: Maybe<GQLPersonUpdateManyInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
}

type GQLPersonListUpdateManyInlineInput = {
  /** Create and connect multiple PersonList documents */
  create?: Maybe<Array<GQLPersonListCreateInput>>
  /** Connect multiple existing PersonList documents */
  connect?: Maybe<Array<GQLPersonListConnectInput>>
  /** Override currently-connected documents with multiple existing PersonList documents */
  set?: Maybe<Array<GQLPersonListWhereUniqueInput>>
  /** Update multiple PersonList documents */
  update?: Maybe<Array<GQLPersonListUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple PersonList documents */
  upsert?: Maybe<Array<GQLPersonListUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple PersonList documents */
  disconnect?: Maybe<Array<GQLPersonListWhereUniqueInput>>
  /** Delete multiple PersonList documents */
  delete?: Maybe<Array<GQLPersonListWhereUniqueInput>>
}

type GQLPersonListUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLPersonListUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLPersonListWhereInput
  /** Update many input */
  data: GQLPersonListUpdateManyInput
}

type GQLPersonListUpdateOneInlineInput = {
  /** Create and connect one PersonList document */
  create?: Maybe<GQLPersonListCreateInput>
  /** Update single PersonList document */
  update?: Maybe<GQLPersonListUpdateWithNestedWhereUniqueInput>
  /** Upsert single PersonList document */
  upsert?: Maybe<GQLPersonListUpsertWithNestedWhereUniqueInput>
  /** Connect existing PersonList document */
  connect?: Maybe<GQLPersonListWhereUniqueInput>
  /** Disconnect currently connected PersonList document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected PersonList document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLPersonListUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPersonListWhereUniqueInput
  /** Document to update */
  data: GQLPersonListUpdateInput
}

type GQLPersonListUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLPersonListCreateInput
  /** Update document if it exists */
  update: GQLPersonListUpdateInput
}

type GQLPersonListUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPersonListWhereUniqueInput
  /** Upsert data */
  data: GQLPersonListUpsertInput
}

/** Identifies documents */
type GQLPersonListWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPersonListWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPersonListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPersonListWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  people_every?: Maybe<GQLPersonWhereInput>
  people_some?: Maybe<GQLPersonWhereInput>
  people_none?: Maybe<GQLPersonWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
}

/** References PersonList record uniquely */
type GQLPersonListWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

/** Identifies documents */
type GQLPersonManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPersonWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPersonWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPersonWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  avatar?: Maybe<GQLAssetWhereInput>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  personList_every?: Maybe<GQLPersonListWhereInput>
  personList_some?: Maybe<GQLPersonListWhereInput>
  personList_none?: Maybe<GQLPersonListWhereInput>
}

type GQLPersonOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'name_ASC'
  | 'name_DESC'

type GQLPersonUpdateInput = {
  avatar?: Maybe<GQLAssetUpdateOneInlineInput>
  name?: Maybe<Scalars['String']>
  personList?: Maybe<GQLPersonListUpdateManyInlineInput>
}

type GQLPersonUpdateManyInlineInput = {
  /** Create and connect multiple Person documents */
  create?: Maybe<Array<GQLPersonCreateInput>>
  /** Connect multiple existing Person documents */
  connect?: Maybe<Array<GQLPersonConnectInput>>
  /** Override currently-connected documents with multiple existing Person documents */
  set?: Maybe<Array<GQLPersonWhereUniqueInput>>
  /** Update multiple Person documents */
  update?: Maybe<Array<GQLPersonUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Person documents */
  upsert?: Maybe<Array<GQLPersonUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Person documents */
  disconnect?: Maybe<Array<GQLPersonWhereUniqueInput>>
  /** Delete multiple Person documents */
  delete?: Maybe<Array<GQLPersonWhereUniqueInput>>
}

type GQLPersonUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
}

type GQLPersonUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLPersonWhereInput
  /** Update many input */
  data: GQLPersonUpdateManyInput
}

type GQLPersonUpdateOneInlineInput = {
  /** Create and connect one Person document */
  create?: Maybe<GQLPersonCreateInput>
  /** Update single Person document */
  update?: Maybe<GQLPersonUpdateWithNestedWhereUniqueInput>
  /** Upsert single Person document */
  upsert?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  /** Connect existing Person document */
  connect?: Maybe<GQLPersonWhereUniqueInput>
  /** Disconnect currently connected Person document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Person document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLPersonUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPersonWhereUniqueInput
  /** Document to update */
  data: GQLPersonUpdateInput
}

type GQLPersonUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLPersonCreateInput
  /** Update document if it exists */
  update: GQLPersonUpdateInput
}

type GQLPersonUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLPersonWhereUniqueInput
  /** Upsert data */
  data: GQLPersonUpsertInput
}

/** Identifies documents */
type GQLPersonWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLPersonWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLPersonWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLPersonWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  avatar?: Maybe<GQLAssetWhereInput>
  name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  name_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  name_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  name_not_ends_with?: Maybe<Scalars['String']>
  personList_every?: Maybe<GQLPersonListWhereInput>
  personList_some?: Maybe<GQLPersonListWhereInput>
  personList_none?: Maybe<GQLPersonListWhereInput>
}

/** References Person record uniquely */
type GQLPersonWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

type GQLPublishLocaleInput = {
  /** Locales to publish */
  locale: GQLLocale
  /** Stages to publish selected locales to */
  stages: Array<GQLStage>
}

type GQLQuery = {
  __typename?: 'Query'
  /** Fetches an object given its ID */
  node?: Maybe<GQLNode>
  /** Retrieve multiple assets */
  assets: Array<GQLAsset>
  /** Retrieve a single asset */
  asset?: Maybe<GQLAsset>
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: GQLAssetConnection
  /** Retrieve multiple companies */
  companies: Array<GQLCompany>
  /** Retrieve a single company */
  company?: Maybe<GQLCompany>
  /** Retrieve multiple companies using the Relay connection interface */
  companiesConnection: GQLCompanyConnection
  /** Retrieve multiple contactForms */
  contactForms: Array<GQLContactForm>
  /** Retrieve a single contactForm */
  contactForm?: Maybe<GQLContactForm>
  /** Retrieve multiple contactForms using the Relay connection interface */
  contactFormsConnection: GQLContactFormConnection
  /** Retrieve multiple linkExternals */
  linkExternals: Array<GQLLinkExternal>
  /** Retrieve a single linkExternal */
  linkExternal?: Maybe<GQLLinkExternal>
  /** Retrieve multiple linkExternals using the Relay connection interface */
  linkExternalsConnection: GQLLinkExternalConnection
  /** Retrieve multiple linkInternals */
  linkInternals: Array<GQLLinkInternal>
  /** Retrieve a single linkInternal */
  linkInternal?: Maybe<GQLLinkInternal>
  /** Retrieve multiple linkInternals using the Relay connection interface */
  linkInternalsConnection: GQLLinkInternalConnection
  /** Retrieve multiple menus */
  menus: Array<GQLMenu>
  /** Retrieve a single menu */
  menu?: Maybe<GQLMenu>
  /** Retrieve multiple menus using the Relay connection interface */
  menusConnection: GQLMenuConnection
  /** Retrieve multiple pages */
  pages: Array<GQLPage>
  /** Retrieve a single page */
  page?: Maybe<GQLPage>
  /** Retrieve multiple pages using the Relay connection interface */
  pagesConnection: GQLPageConnection
  /** Retrieve multiple people */
  people: Array<GQLPerson>
  /** Retrieve a single person */
  person?: Maybe<GQLPerson>
  /** Retrieve multiple people using the Relay connection interface */
  peopleConnection: GQLPersonConnection
  /** Retrieve multiple personLists */
  personLists: Array<GQLPersonList>
  /** Retrieve a single personList */
  personList?: Maybe<GQLPersonList>
  /** Retrieve multiple personLists using the Relay connection interface */
  personListsConnection: GQLPersonListConnection
  /** Retrieve multiple rowColumnOnes */
  rowColumnOnes: Array<GQLRowColumnOne>
  /** Retrieve a single rowColumnOne */
  rowColumnOne?: Maybe<GQLRowColumnOne>
  /** Retrieve multiple rowColumnOnes using the Relay connection interface */
  rowColumnOnesConnection: GQLRowColumnOneConnection
  /** Retrieve multiple rowColumnThrees */
  rowColumnThrees: Array<GQLRowColumnThree>
  /** Retrieve a single rowColumnThree */
  rowColumnThree?: Maybe<GQLRowColumnThree>
  /** Retrieve multiple rowColumnThrees using the Relay connection interface */
  rowColumnThreesConnection: GQLRowColumnThreeConnection
  /** Retrieve multiple rowColumnTwos */
  rowColumnTwos: Array<GQLRowColumnTwo>
  /** Retrieve a single rowColumnTwo */
  rowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Retrieve multiple rowColumnTwos using the Relay connection interface */
  rowColumnTwosConnection: GQLRowColumnTwoConnection
  /** Retrieve multiple rowCompanySliders */
  rowCompanySliders: Array<GQLRowCompanySlider>
  /** Retrieve a single rowCompanySlider */
  rowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Retrieve multiple rowCompanySliders using the Relay connection interface */
  rowCompanySlidersConnection: GQLRowCompanySliderConnection
  /** Retrieve multiple rowHeroes */
  rowHeroes: Array<GQLRowHero>
  /** Retrieve a single rowHero */
  rowHero?: Maybe<GQLRowHero>
  /** Retrieve multiple rowHeroes using the Relay connection interface */
  rowHeroesConnection: GQLRowHeroConnection
  /** Retrieve multiple rowPeopleWithTexts */
  rowPeopleWithTexts: Array<GQLRowPeopleWithText>
  /** Retrieve a single rowPeopleWithText */
  rowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Retrieve multiple rowPeopleWithTexts using the Relay connection interface */
  rowPeopleWithTextsConnection: GQLRowPeopleWithTextConnection
  /** Retrieve multiple rowRecentBlogPosts */
  rowRecentBlogPosts: Array<GQLRowRecentBlogPost>
  /** Retrieve a single rowRecentBlogPost */
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Retrieve multiple rowRecentBlogPosts using the Relay connection interface */
  rowRecentBlogPostsConnection: GQLRowRecentBlogPostConnection
  /** Retrieve multiple rowServicesWithTexts */
  rowServicesWithTexts: Array<GQLRowServicesWithText>
  /** Retrieve a single rowServicesWithText */
  rowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Retrieve multiple rowServicesWithTexts using the Relay connection interface */
  rowServicesWithTextsConnection: GQLRowServicesWithTextConnection
  /** Retrieve multiple rowYoutubeVideos */
  rowYoutubeVideos: Array<GQLRowYoutubeVideo>
  /** Retrieve a single rowYoutubeVideo */
  rowYoutubeVideo?: Maybe<GQLRowYoutubeVideo>
  /** Retrieve multiple rowYoutubeVideos using the Relay connection interface */
  rowYoutubeVideosConnection: GQLRowYoutubeVideoConnection
}

type GQLQueryNodeArgs = {
  id: Scalars['ID']
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryAssetsArgs = {
  where?: Maybe<GQLAssetWhereInput>
  orderBy?: Maybe<GQLAssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryAssetArgs = {
  where: GQLAssetWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryAssetsConnectionArgs = {
  where?: Maybe<GQLAssetWhereInput>
  orderBy?: Maybe<GQLAssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryCompaniesArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryCompaniesConnectionArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryContactFormsArgs = {
  where?: Maybe<GQLContactFormWhereInput>
  orderBy?: Maybe<GQLContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryContactFormsConnectionArgs = {
  where?: Maybe<GQLContactFormWhereInput>
  orderBy?: Maybe<GQLContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalWhereInput>
  orderBy?: Maybe<GQLLinkExternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryLinkExternalsConnectionArgs = {
  where?: Maybe<GQLLinkExternalWhereInput>
  orderBy?: Maybe<GQLLinkExternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryLinkInternalsConnectionArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryMenusArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryMenuArgs = {
  where: GQLMenuWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryMenusConnectionArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryPagesArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryPageArgs = {
  where: GQLPageWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryPagesConnectionArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryPeopleArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryPersonArgs = {
  where: GQLPersonWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryPeopleConnectionArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryPersonListsArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryPersonListsConnectionArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryRowColumnOnesConnectionArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowColumnThreesConnectionArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowColumnTwosConnectionArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryRowCompanySlidersConnectionArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowHeroesArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryRowHeroesConnectionArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowPeopleWithTextsConnectionArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostWhereInput>
  orderBy?: Maybe<GQLRowRecentBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryRowRecentBlogPostsConnectionArgs = {
  where?: Maybe<GQLRowRecentBlogPostWhereInput>
  orderBy?: Maybe<GQLRowRecentBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextWhereInput>
  orderBy?: Maybe<GQLRowServicesWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowServicesWithTextsConnectionArgs = {
  where?: Maybe<GQLRowServicesWithTextWhereInput>
  orderBy?: Maybe<GQLRowServicesWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowYoutubeVideosArgs = {
  where?: Maybe<GQLRowYoutubeVideoWhereInput>
  orderBy?: Maybe<GQLRowYoutubeVideoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowYoutubeVideoArgs = {
  where: GQLRowYoutubeVideoWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

type GQLQueryRowYoutubeVideosConnectionArgs = {
  where?: Maybe<GQLRowYoutubeVideoWhereInput>
  orderBy?: Maybe<GQLRowYoutubeVideoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
type GQLRgba = {
  __typename?: 'RGBA'
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
type GQLRgbaInput = {
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
type GQLRichText = {
  __typename?: 'RichText'
  /** Returns AST representation */
  raw: Scalars['RichTextAST']
  /** Returns HTMl representation */
  html: Scalars['String']
  /** Returns Markdown representation */
  markdown: Scalars['String']
  /** Returns plain-text contents of RichText */
  text: Scalars['String']
}

/** Single text area, flowing over two columns (CSS Columns) */
type GQLRowColumnOne = GQLNode & {
  __typename?: 'RowColumnOne'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLRowColumnOne>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  colOne: GQLRichText
  colOneIcon?: Maybe<GQLAsset>
  page: Array<GQLPage>
}

/** Single text area, flowing over two columns (CSS Columns) */
type GQLRowColumnOneDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** Single text area, flowing over two columns (CSS Columns) */
type GQLRowColumnOnePageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowColumnOneConnectInput = {
  /** Document to connect */
  where: GQLRowColumnOneWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnOneConnection = {
  __typename?: 'RowColumnOneConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowColumnOneEdge>
  aggregate: GQLAggregate
}

type GQLRowColumnOneCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  colOne: Scalars['RichTextAST']
  colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowColumnOneCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnOne documents */
  create?: Maybe<Array<GQLRowColumnOneCreateInput>>
  /** Connect multiple existing RowColumnOne documents */
  connect?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
}

type GQLRowColumnOneCreateOneInlineInput = {
  /** Create and connect one RowColumnOne document */
  create?: Maybe<GQLRowColumnOneCreateInput>
  /** Connect one existing RowColumnOne document */
  connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnOneEdge = {
  __typename?: 'RowColumnOneEdge'
  /** The item at the end of the edge. */
  node: GQLRowColumnOne
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnOneManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnOneWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnOneWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnOneWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
}

type GQLRowColumnOneOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowColumnOneUpdateInput = {
  identity?: Maybe<Scalars['String']>
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowColumnOneUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnOne documents */
  create?: Maybe<Array<GQLRowColumnOneCreateInput>>
  /** Connect multiple existing RowColumnOne documents */
  connect?: Maybe<Array<GQLRowColumnOneConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnOne documents */
  set?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
  /** Update multiple RowColumnOne documents */
  update?: Maybe<Array<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnOne documents */
  upsert?: Maybe<Array<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnOne documents */
  disconnect?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
  /** Delete multiple RowColumnOne documents */
  delete?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
}

type GQLRowColumnOneUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
}

type GQLRowColumnOneUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowColumnOneWhereInput
  /** Update many input */
  data: GQLRowColumnOneUpdateManyInput
}

type GQLRowColumnOneUpdateOneInlineInput = {
  /** Create and connect one RowColumnOne document */
  create?: Maybe<GQLRowColumnOneCreateInput>
  /** Update single RowColumnOne document */
  update?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnOne document */
  upsert?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnOne document */
  connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
  /** Disconnect currently connected RowColumnOne document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnOne document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnOneUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnOneWhereUniqueInput
  /** Document to update */
  data: GQLRowColumnOneUpdateInput
}

type GQLRowColumnOneUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowColumnOneCreateInput
  /** Update document if it exists */
  update: GQLRowColumnOneUpdateInput
}

type GQLRowColumnOneUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnOneWhereUniqueInput
  /** Upsert data */
  data: GQLRowColumnOneUpsertInput
}

/** Identifies documents */
type GQLRowColumnOneWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnOneWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnOneWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnOneWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnOne record uniquely */
type GQLRowColumnOneWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowColumnThree = GQLNode & {
  __typename?: 'RowColumnThree'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLRowColumnThree>
  /** Get the document in other stages */
  documentInStages: Array<GQLRowColumnThree>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  colOne: GQLRichText
  colOneIcon?: Maybe<GQLAsset>
  colTwo: GQLRichText
  colTwoIcon?: Maybe<GQLAsset>
  colThree: GQLRichText
  colThreeIcon?: Maybe<GQLAsset>
  page: Array<GQLPage>
}

type GQLRowColumnThreeLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowColumnThreeDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowColumnThreePageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowColumnThreeConnectInput = {
  /** Document to connect */
  where: GQLRowColumnThreeWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnThreeConnection = {
  __typename?: 'RowColumnThreeConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowColumnThreeEdge>
  aggregate: GQLAggregate
}

type GQLRowColumnThreeCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  /** colOne input for default locale (nl) */
  colOne: Scalars['RichTextAST']
  colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  /** colTwo input for default locale (nl) */
  colTwo: Scalars['RichTextAST']
  colTwoIcon?: Maybe<GQLAssetCreateOneInlineInput>
  /** colThree input for default locale (nl) */
  colThree: Scalars['RichTextAST']
  colThreeIcon?: Maybe<GQLAssetCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLRowColumnThreeCreateLocalizationsInput>
}

type GQLRowColumnThreeCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeCreateLocalizationInput = {
  /** Localization input */
  data: GQLRowColumnThreeCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnThreeCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLRowColumnThreeCreateLocalizationInput>>
}

type GQLRowColumnThreeCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnThree documents */
  create?: Maybe<Array<GQLRowColumnThreeCreateInput>>
  /** Connect multiple existing RowColumnThree documents */
  connect?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
}

type GQLRowColumnThreeCreateOneInlineInput = {
  /** Create and connect one RowColumnThree document */
  create?: Maybe<GQLRowColumnThreeCreateInput>
  /** Connect one existing RowColumnThree document */
  connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnThreeEdge = {
  __typename?: 'RowColumnThreeEdge'
  /** The item at the end of the edge. */
  node: GQLRowColumnThree
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnThreeManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
  colThreeIcon?: Maybe<GQLAssetWhereInput>
}

type GQLRowColumnThreeOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowColumnThreeUpdateInput = {
  identity?: Maybe<Scalars['String']>
  /** colOne input for default locale (nl) */
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colTwo input for default locale (nl) */
  colTwo?: Maybe<Scalars['RichTextAST']>
  colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colThree input for default locale (nl) */
  colThree?: Maybe<Scalars['RichTextAST']>
  colThreeIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLRowColumnThreeUpdateLocalizationsInput>
}

type GQLRowColumnThreeUpdateLocalizationDataInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeUpdateLocalizationInput = {
  data: GQLRowColumnThreeUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnThreeUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLRowColumnThreeCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLRowColumnThreeUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowColumnThreeUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLRowColumnThreeUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnThree documents */
  create?: Maybe<Array<GQLRowColumnThreeCreateInput>>
  /** Connect multiple existing RowColumnThree documents */
  connect?: Maybe<Array<GQLRowColumnThreeConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnThree documents */
  set?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
  /** Update multiple RowColumnThree documents */
  update?: Maybe<Array<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnThree documents */
  upsert?: Maybe<Array<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnThree documents */
  disconnect?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
  /** Delete multiple RowColumnThree documents */
  delete?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
}

type GQLRowColumnThreeUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLRowColumnThreeUpdateManyLocalizationInput>>
}

type GQLRowColumnThreeUpdateManyLocalizationInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowColumnThreeWhereInput
  /** Update many input */
  data: GQLRowColumnThreeUpdateManyInput
}

type GQLRowColumnThreeUpdateOneInlineInput = {
  /** Create and connect one RowColumnThree document */
  create?: Maybe<GQLRowColumnThreeCreateInput>
  /** Update single RowColumnThree document */
  update?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnThree document */
  upsert?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnThree document */
  connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  /** Disconnect currently connected RowColumnThree document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnThree document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnThreeUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnThreeWhereUniqueInput
  /** Document to update */
  data: GQLRowColumnThreeUpdateInput
}

type GQLRowColumnThreeUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowColumnThreeCreateInput
  /** Update document if it exists */
  update: GQLRowColumnThreeUpdateInput
}

type GQLRowColumnThreeUpsertLocalizationInput = {
  update: GQLRowColumnThreeUpdateLocalizationDataInput
  create: GQLRowColumnThreeCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnThreeUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnThreeWhereUniqueInput
  /** Upsert data */
  data: GQLRowColumnThreeUpsertInput
}

/** Identifies documents */
type GQLRowColumnThreeWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
  colThreeIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnThree record uniquely */
type GQLRowColumnThreeWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowColumnTwo = GQLNode & {
  __typename?: 'RowColumnTwo'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLRowColumnTwo>
  /** Get the document in other stages */
  documentInStages: Array<GQLRowColumnTwo>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  colOne: GQLRichText
  colOneIcon?: Maybe<GQLAsset>
  colTwo: GQLRichText
  colTwoIcon?: Maybe<GQLAsset>
  page: Array<GQLPage>
}

type GQLRowColumnTwoLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowColumnTwoDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowColumnTwoPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowColumnTwoConnectInput = {
  /** Document to connect */
  where: GQLRowColumnTwoWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnTwoConnection = {
  __typename?: 'RowColumnTwoConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowColumnTwoEdge>
  aggregate: GQLAggregate
}

type GQLRowColumnTwoCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  /** colOne input for default locale (nl) */
  colOne: Scalars['RichTextAST']
  colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  /** colTwo input for default locale (nl) */
  colTwo: Scalars['RichTextAST']
  colTwoIcon?: Maybe<GQLAssetCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLRowColumnTwoCreateLocalizationsInput>
}

type GQLRowColumnTwoCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoCreateLocalizationInput = {
  /** Localization input */
  data: GQLRowColumnTwoCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnTwoCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLRowColumnTwoCreateLocalizationInput>>
}

type GQLRowColumnTwoCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnTwo documents */
  create?: Maybe<Array<GQLRowColumnTwoCreateInput>>
  /** Connect multiple existing RowColumnTwo documents */
  connect?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
}

type GQLRowColumnTwoCreateOneInlineInput = {
  /** Create and connect one RowColumnTwo document */
  create?: Maybe<GQLRowColumnTwoCreateInput>
  /** Connect one existing RowColumnTwo document */
  connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnTwoEdge = {
  __typename?: 'RowColumnTwoEdge'
  /** The item at the end of the edge. */
  node: GQLRowColumnTwo
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnTwoManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
}

type GQLRowColumnTwoOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowColumnTwoUpdateInput = {
  identity?: Maybe<Scalars['String']>
  /** colOne input for default locale (nl) */
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colTwo input for default locale (nl) */
  colTwo?: Maybe<Scalars['RichTextAST']>
  colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLRowColumnTwoUpdateLocalizationsInput>
}

type GQLRowColumnTwoUpdateLocalizationDataInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoUpdateLocalizationInput = {
  data: GQLRowColumnTwoUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnTwoUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLRowColumnTwoCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLRowColumnTwoUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowColumnTwoUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLRowColumnTwoUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnTwo documents */
  create?: Maybe<Array<GQLRowColumnTwoCreateInput>>
  /** Connect multiple existing RowColumnTwo documents */
  connect?: Maybe<Array<GQLRowColumnTwoConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnTwo documents */
  set?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
  /** Update multiple RowColumnTwo documents */
  update?: Maybe<Array<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnTwo documents */
  upsert?: Maybe<Array<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnTwo documents */
  disconnect?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
  /** Delete multiple RowColumnTwo documents */
  delete?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
}

type GQLRowColumnTwoUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLRowColumnTwoUpdateManyLocalizationInput>>
}

type GQLRowColumnTwoUpdateManyLocalizationInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowColumnTwoWhereInput
  /** Update many input */
  data: GQLRowColumnTwoUpdateManyInput
}

type GQLRowColumnTwoUpdateOneInlineInput = {
  /** Create and connect one RowColumnTwo document */
  create?: Maybe<GQLRowColumnTwoCreateInput>
  /** Update single RowColumnTwo document */
  update?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnTwo document */
  upsert?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnTwo document */
  connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  /** Disconnect currently connected RowColumnTwo document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnTwo document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnTwoUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnTwoWhereUniqueInput
  /** Document to update */
  data: GQLRowColumnTwoUpdateInput
}

type GQLRowColumnTwoUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowColumnTwoCreateInput
  /** Update document if it exists */
  update: GQLRowColumnTwoUpdateInput
}

type GQLRowColumnTwoUpsertLocalizationInput = {
  update: GQLRowColumnTwoUpdateLocalizationDataInput
  create: GQLRowColumnTwoCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowColumnTwoUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowColumnTwoWhereUniqueInput
  /** Upsert data */
  data: GQLRowColumnTwoUpsertInput
}

/** Identifies documents */
type GQLRowColumnTwoWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnTwo record uniquely */
type GQLRowColumnTwoWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowCompanySlider = GQLNode & {
  __typename?: 'RowCompanySlider'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLRowCompanySlider>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  companies: Array<GQLCompany>
  page: Array<GQLPage>
}

type GQLRowCompanySliderDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowCompanySliderCompaniesArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowCompanySliderPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowCompanySliderConnectInput = {
  /** Document to connect */
  where: GQLRowCompanySliderWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowCompanySliderConnection = {
  __typename?: 'RowCompanySliderConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowCompanySliderEdge>
  aggregate: GQLAggregate
}

type GQLRowCompanySliderCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  companies?: Maybe<GQLCompanyCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowCompanySliderCreateManyInlineInput = {
  /** Create and connect multiple existing RowCompanySlider documents */
  create?: Maybe<Array<GQLRowCompanySliderCreateInput>>
  /** Connect multiple existing RowCompanySlider documents */
  connect?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
}

type GQLRowCompanySliderCreateOneInlineInput = {
  /** Create and connect one RowCompanySlider document */
  create?: Maybe<GQLRowCompanySliderCreateInput>
  /** Connect one existing RowCompanySlider document */
  connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowCompanySliderEdge = {
  __typename?: 'RowCompanySliderEdge'
  /** The item at the end of the edge. */
  node: GQLRowCompanySlider
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowCompanySliderManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  companies_every?: Maybe<GQLCompanyWhereInput>
  companies_some?: Maybe<GQLCompanyWhereInput>
  companies_none?: Maybe<GQLCompanyWhereInput>
}

type GQLRowCompanySliderOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowCompanySliderUpdateInput = {
  identity?: Maybe<Scalars['String']>
  companies?: Maybe<GQLCompanyUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowCompanySliderUpdateManyInlineInput = {
  /** Create and connect multiple RowCompanySlider documents */
  create?: Maybe<Array<GQLRowCompanySliderCreateInput>>
  /** Connect multiple existing RowCompanySlider documents */
  connect?: Maybe<Array<GQLRowCompanySliderConnectInput>>
  /** Override currently-connected documents with multiple existing RowCompanySlider documents */
  set?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
  /** Update multiple RowCompanySlider documents */
  update?: Maybe<Array<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowCompanySlider documents */
  upsert?: Maybe<Array<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowCompanySlider documents */
  disconnect?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
  /** Delete multiple RowCompanySlider documents */
  delete?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
}

type GQLRowCompanySliderUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLRowCompanySliderUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowCompanySliderWhereInput
  /** Update many input */
  data: GQLRowCompanySliderUpdateManyInput
}

type GQLRowCompanySliderUpdateOneInlineInput = {
  /** Create and connect one RowCompanySlider document */
  create?: Maybe<GQLRowCompanySliderCreateInput>
  /** Update single RowCompanySlider document */
  update?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowCompanySlider document */
  upsert?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowCompanySlider document */
  connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  /** Disconnect currently connected RowCompanySlider document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowCompanySlider document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowCompanySliderUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowCompanySliderWhereUniqueInput
  /** Document to update */
  data: GQLRowCompanySliderUpdateInput
}

type GQLRowCompanySliderUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowCompanySliderCreateInput
  /** Update document if it exists */
  update: GQLRowCompanySliderUpdateInput
}

type GQLRowCompanySliderUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowCompanySliderWhereUniqueInput
  /** Upsert data */
  data: GQLRowCompanySliderUpsertInput
}

/** Identifies documents */
type GQLRowCompanySliderWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  companies_every?: Maybe<GQLCompanyWhereInput>
  companies_some?: Maybe<GQLCompanyWhereInput>
  companies_none?: Maybe<GQLCompanyWhereInput>
}

/** References RowCompanySlider record uniquely */
type GQLRowCompanySliderWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowHero = GQLNode & {
  __typename?: 'RowHero'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLRowHero>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  asset: GQLAsset
  text: GQLRichText
  links: Array<GQLRowHeroVideoLinks>
  page: Array<GQLPage>
}

type GQLRowHeroDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowHeroLinksArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowHeroPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowHeroConnectInput = {
  /** Document to connect */
  where: GQLRowHeroWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowHeroConnection = {
  __typename?: 'RowHeroConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowHeroEdge>
  aggregate: GQLAggregate
}

type GQLRowHeroCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  asset: GQLAssetCreateOneInlineInput
  text: Scalars['RichTextAST']
  links?: Maybe<GQLRowHeroVideoLinksCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowHeroCreateManyInlineInput = {
  /** Create and connect multiple existing RowHero documents */
  create?: Maybe<Array<GQLRowHeroCreateInput>>
  /** Connect multiple existing RowHero documents */
  connect?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
}

type GQLRowHeroCreateOneInlineInput = {
  /** Create and connect one RowHero document */
  create?: Maybe<GQLRowHeroCreateInput>
  /** Connect one existing RowHero document */
  connect?: Maybe<GQLRowHeroWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowHeroEdge = {
  __typename?: 'RowHeroEdge'
  /** The item at the end of the edge. */
  node: GQLRowHero
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowHeroManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowHeroWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowHeroWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowHeroWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  asset?: Maybe<GQLAssetWhereInput>
}

type GQLRowHeroOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowHeroUpdateInput = {
  identity?: Maybe<Scalars['String']>
  asset?: Maybe<GQLAssetUpdateOneInlineInput>
  text?: Maybe<Scalars['RichTextAST']>
  links?: Maybe<GQLRowHeroVideoLinksUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowHeroUpdateManyInlineInput = {
  /** Create and connect multiple RowHero documents */
  create?: Maybe<Array<GQLRowHeroCreateInput>>
  /** Connect multiple existing RowHero documents */
  connect?: Maybe<Array<GQLRowHeroConnectInput>>
  /** Override currently-connected documents with multiple existing RowHero documents */
  set?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
  /** Update multiple RowHero documents */
  update?: Maybe<Array<GQLRowHeroUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowHero documents */
  upsert?: Maybe<Array<GQLRowHeroUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowHero documents */
  disconnect?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
  /** Delete multiple RowHero documents */
  delete?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
}

type GQLRowHeroUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['RichTextAST']
}

type GQLRowHeroUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowHeroWhereInput
  /** Update many input */
  data: GQLRowHeroUpdateManyInput
}

type GQLRowHeroUpdateOneInlineInput = {
  /** Create and connect one RowHero document */
  create?: Maybe<GQLRowHeroCreateInput>
  /** Update single RowHero document */
  update?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowHero document */
  upsert?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowHero document */
  connect?: Maybe<GQLRowHeroWhereUniqueInput>
  /** Disconnect currently connected RowHero document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowHero document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowHeroUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowHeroWhereUniqueInput
  /** Document to update */
  data: GQLRowHeroUpdateInput
}

type GQLRowHeroUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowHeroCreateInput
  /** Update document if it exists */
  update: GQLRowHeroUpdateInput
}

type GQLRowHeroUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowHeroWhereUniqueInput
  /** Upsert data */
  data: GQLRowHeroUpsertInput
}

type GQLRowHeroVideoLinks = GQLLinkExternal | GQLLinkInternal

type GQLRowHeroVideoLinksConnectInput = {
  LinkExternal?: Maybe<GQLLinkExternalConnectInput>
  LinkInternal?: Maybe<GQLLinkInternalConnectInput>
}

type GQLRowHeroVideoLinksCreateInput = {
  LinkExternal?: Maybe<GQLLinkExternalCreateInput>
  LinkInternal?: Maybe<GQLLinkInternalCreateInput>
}

type GQLRowHeroVideoLinksCreateManyInlineInput = {
  /** Create and connect multiple existing RowHeroVideoLinks documents */
  create?: Maybe<Array<GQLRowHeroVideoLinksCreateInput>>
  /** Connect multiple existing RowHeroVideoLinks documents */
  connect?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
}

type GQLRowHeroVideoLinksCreateOneInlineInput = {
  /** Create and connect one RowHeroVideoLinks document */
  create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  /** Connect one existing RowHeroVideoLinks document */
  connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
}

type GQLRowHeroVideoLinksUpdateInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateInput>
}

type GQLRowHeroVideoLinksUpdateManyInlineInput = {
  /** Create and connect multiple RowHeroVideoLinks documents */
  create?: Maybe<Array<GQLRowHeroVideoLinksCreateInput>>
  /** Connect multiple existing RowHeroVideoLinks documents */
  connect?: Maybe<Array<GQLRowHeroVideoLinksConnectInput>>
  /** Override currently-connected documents with multiple existing RowHeroVideoLinks documents */
  set?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
  /** Update multiple RowHeroVideoLinks documents */
  update?: Maybe<Array<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowHeroVideoLinks documents */
  upsert?: Maybe<Array<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowHeroVideoLinks documents */
  disconnect?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
  /** Delete multiple RowHeroVideoLinks documents */
  delete?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
}

type GQLRowHeroVideoLinksUpdateManyWithNestedWhereInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateManyWithNestedWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateManyWithNestedWhereInput>
}

type GQLRowHeroVideoLinksUpdateOneInlineInput = {
  /** Create and connect one RowHeroVideoLinks document */
  create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  /** Update single RowHeroVideoLinks document */
  update?: Maybe<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowHeroVideoLinks document */
  upsert?: Maybe<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowHeroVideoLinks document */
  connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
  /** Disconnect currently connected RowHeroVideoLinks document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowHeroVideoLinks document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
}

type GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
}

type GQLRowHeroVideoLinksWhereInput = {
  LinkExternal?: Maybe<GQLLinkExternalWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereInput>
}

type GQLRowHeroVideoLinksWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereUniqueInput>
}

/** Identifies documents */
type GQLRowHeroWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowHeroWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowHeroWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowHeroWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  asset?: Maybe<GQLAssetWhereInput>
}

/** References RowHero record uniquely */
type GQLRowHeroWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowPeopleWithText = GQLNode & {
  __typename?: 'RowPeopleWithText'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLRowPeopleWithText>
  /** Get the document in other stages */
  documentInStages: Array<GQLRowPeopleWithText>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  text: GQLRichText
  links: Array<GQLLinkInternal>
  personList?: Maybe<GQLPersonList>
  page: Array<GQLPage>
}

type GQLRowPeopleWithTextLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowPeopleWithTextDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowPeopleWithTextLinksArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowPeopleWithTextPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowPeopleWithTextConnectInput = {
  /** Document to connect */
  where: GQLRowPeopleWithTextWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowPeopleWithTextConnection = {
  __typename?: 'RowPeopleWithTextConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowPeopleWithTextEdge>
  aggregate: GQLAggregate
}

type GQLRowPeopleWithTextCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  /** text input for default locale (nl) */
  text: Scalars['RichTextAST']
  links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  personList?: Maybe<GQLPersonListCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLRowPeopleWithTextCreateLocalizationsInput>
}

type GQLRowPeopleWithTextCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextCreateLocalizationInput = {
  /** Localization input */
  data: GQLRowPeopleWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowPeopleWithTextCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLRowPeopleWithTextCreateLocalizationInput>>
}

type GQLRowPeopleWithTextCreateManyInlineInput = {
  /** Create and connect multiple existing RowPeopleWithText documents */
  create?: Maybe<Array<GQLRowPeopleWithTextCreateInput>>
  /** Connect multiple existing RowPeopleWithText documents */
  connect?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
}

type GQLRowPeopleWithTextCreateOneInlineInput = {
  /** Create and connect one RowPeopleWithText document */
  create?: Maybe<GQLRowPeopleWithTextCreateInput>
  /** Connect one existing RowPeopleWithText document */
  connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowPeopleWithTextEdge = {
  __typename?: 'RowPeopleWithTextEdge'
  /** The item at the end of the edge. */
  node: GQLRowPeopleWithText
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowPeopleWithTextManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
  personList?: Maybe<GQLPersonListWhereInput>
}

type GQLRowPeopleWithTextOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowPeopleWithTextUpdateInput = {
  identity?: Maybe<Scalars['String']>
  /** text input for default locale (nl) */
  text?: Maybe<Scalars['RichTextAST']>
  links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  personList?: Maybe<GQLPersonListUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLRowPeopleWithTextUpdateLocalizationsInput>
}

type GQLRowPeopleWithTextUpdateLocalizationDataInput = {
  text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextUpdateLocalizationInput = {
  data: GQLRowPeopleWithTextUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowPeopleWithTextUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLRowPeopleWithTextCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLRowPeopleWithTextUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowPeopleWithTextUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLRowPeopleWithTextUpdateManyInlineInput = {
  /** Create and connect multiple RowPeopleWithText documents */
  create?: Maybe<Array<GQLRowPeopleWithTextCreateInput>>
  /** Connect multiple existing RowPeopleWithText documents */
  connect?: Maybe<Array<GQLRowPeopleWithTextConnectInput>>
  /** Override currently-connected documents with multiple existing RowPeopleWithText documents */
  set?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
  /** Update multiple RowPeopleWithText documents */
  update?: Maybe<Array<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowPeopleWithText documents */
  upsert?: Maybe<Array<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowPeopleWithText documents */
  disconnect?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
  /** Delete multiple RowPeopleWithText documents */
  delete?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
}

type GQLRowPeopleWithTextUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLRowPeopleWithTextUpdateManyLocalizationInput>>
}

type GQLRowPeopleWithTextUpdateManyLocalizationInput = {
  text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowPeopleWithTextWhereInput
  /** Update many input */
  data: GQLRowPeopleWithTextUpdateManyInput
}

type GQLRowPeopleWithTextUpdateOneInlineInput = {
  /** Create and connect one RowPeopleWithText document */
  create?: Maybe<GQLRowPeopleWithTextCreateInput>
  /** Update single RowPeopleWithText document */
  update?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowPeopleWithText document */
  upsert?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowPeopleWithText document */
  connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  /** Disconnect currently connected RowPeopleWithText document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowPeopleWithText document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowPeopleWithTextWhereUniqueInput
  /** Document to update */
  data: GQLRowPeopleWithTextUpdateInput
}

type GQLRowPeopleWithTextUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowPeopleWithTextCreateInput
  /** Update document if it exists */
  update: GQLRowPeopleWithTextUpdateInput
}

type GQLRowPeopleWithTextUpsertLocalizationInput = {
  update: GQLRowPeopleWithTextUpdateLocalizationDataInput
  create: GQLRowPeopleWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowPeopleWithTextWhereUniqueInput
  /** Upsert data */
  data: GQLRowPeopleWithTextUpsertInput
}

/** Identifies documents */
type GQLRowPeopleWithTextWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
  personList?: Maybe<GQLPersonListWhereInput>
}

/** References RowPeopleWithText record uniquely */
type GQLRowPeopleWithTextWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowRecentBlogPost = GQLNode & {
  __typename?: 'RowRecentBlogPost'
  /** System stage field */
  stage: GQLStage
  /** Get the document in other stages */
  documentInStages: Array<GQLRowRecentBlogPost>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  page: Array<GQLPage>
  link?: Maybe<GQLLinkInternal>
}

type GQLRowRecentBlogPostDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowRecentBlogPostPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowRecentBlogPostConnectInput = {
  /** Document to connect */
  where: GQLRowRecentBlogPostWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowRecentBlogPostConnection = {
  __typename?: 'RowRecentBlogPostConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowRecentBlogPostEdge>
  aggregate: GQLAggregate
}

type GQLRowRecentBlogPostCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  page?: Maybe<GQLPageCreateManyInlineInput>
  link?: Maybe<GQLLinkInternalCreateOneInlineInput>
}

type GQLRowRecentBlogPostCreateManyInlineInput = {
  /** Create and connect multiple existing RowRecentBlogPost documents */
  create?: Maybe<Array<GQLRowRecentBlogPostCreateInput>>
  /** Connect multiple existing RowRecentBlogPost documents */
  connect?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
}

type GQLRowRecentBlogPostCreateOneInlineInput = {
  /** Create and connect one RowRecentBlogPost document */
  create?: Maybe<GQLRowRecentBlogPostCreateInput>
  /** Connect one existing RowRecentBlogPost document */
  connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowRecentBlogPostEdge = {
  __typename?: 'RowRecentBlogPostEdge'
  /** The item at the end of the edge. */
  node: GQLRowRecentBlogPost
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowRecentBlogPostManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  link?: Maybe<GQLLinkInternalWhereInput>
}

type GQLRowRecentBlogPostOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'

type GQLRowRecentBlogPostUpdateInput = {
  identity?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  link?: Maybe<GQLLinkInternalUpdateOneInlineInput>
}

type GQLRowRecentBlogPostUpdateManyInlineInput = {
  /** Create and connect multiple RowRecentBlogPost documents */
  create?: Maybe<Array<GQLRowRecentBlogPostCreateInput>>
  /** Connect multiple existing RowRecentBlogPost documents */
  connect?: Maybe<Array<GQLRowRecentBlogPostConnectInput>>
  /** Override currently-connected documents with multiple existing RowRecentBlogPost documents */
  set?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
  /** Update multiple RowRecentBlogPost documents */
  update?: Maybe<Array<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowRecentBlogPost documents */
  upsert?: Maybe<Array<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowRecentBlogPost documents */
  disconnect?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
  /** Delete multiple RowRecentBlogPost documents */
  delete?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
}

type GQLRowRecentBlogPostUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLRowRecentBlogPostUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowRecentBlogPostWhereInput
  /** Update many input */
  data: GQLRowRecentBlogPostUpdateManyInput
}

type GQLRowRecentBlogPostUpdateOneInlineInput = {
  /** Create and connect one RowRecentBlogPost document */
  create?: Maybe<GQLRowRecentBlogPostCreateInput>
  /** Update single RowRecentBlogPost document */
  update?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowRecentBlogPost document */
  upsert?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowRecentBlogPost document */
  connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  /** Disconnect currently connected RowRecentBlogPost document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowRecentBlogPost document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowRecentBlogPostWhereUniqueInput
  /** Document to update */
  data: GQLRowRecentBlogPostUpdateInput
}

type GQLRowRecentBlogPostUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowRecentBlogPostCreateInput
  /** Update document if it exists */
  update: GQLRowRecentBlogPostUpdateInput
}

type GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowRecentBlogPostWhereUniqueInput
  /** Upsert data */
  data: GQLRowRecentBlogPostUpsertInput
}

/** Identifies documents */
type GQLRowRecentBlogPostWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  link?: Maybe<GQLLinkInternalWhereInput>
}

/** References RowRecentBlogPost record uniquely */
type GQLRowRecentBlogPostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

type GQLRowServicesWithText = GQLNode & {
  __typename?: 'RowServicesWithText'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLRowServicesWithText>
  /** Get the document in other stages */
  documentInStages: Array<GQLRowServicesWithText>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  text: Scalars['String']
  links: Array<GQLLinkInternal>
  page: Array<GQLPage>
}

type GQLRowServicesWithTextLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowServicesWithTextDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLRowServicesWithTextLinksArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowServicesWithTextPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowServicesWithTextConnectInput = {
  /** Document to connect */
  where: GQLRowServicesWithTextWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowServicesWithTextConnection = {
  __typename?: 'RowServicesWithTextConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowServicesWithTextEdge>
  aggregate: GQLAggregate
}

type GQLRowServicesWithTextCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  /** text input for default locale (nl) */
  text: Scalars['String']
  links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLRowServicesWithTextCreateLocalizationsInput>
}

type GQLRowServicesWithTextCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['String']
}

type GQLRowServicesWithTextCreateLocalizationInput = {
  /** Localization input */
  data: GQLRowServicesWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowServicesWithTextCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLRowServicesWithTextCreateLocalizationInput>>
}

type GQLRowServicesWithTextCreateManyInlineInput = {
  /** Create and connect multiple existing RowServicesWithText documents */
  create?: Maybe<Array<GQLRowServicesWithTextCreateInput>>
  /** Connect multiple existing RowServicesWithText documents */
  connect?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
}

type GQLRowServicesWithTextCreateOneInlineInput = {
  /** Create and connect one RowServicesWithText document */
  create?: Maybe<GQLRowServicesWithTextCreateInput>
  /** Connect one existing RowServicesWithText document */
  connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowServicesWithTextEdge = {
  __typename?: 'RowServicesWithTextEdge'
  /** The item at the end of the edge. */
  node: GQLRowServicesWithText
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowServicesWithTextManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
}

type GQLRowServicesWithTextOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identity_ASC'
  | 'identity_DESC'
  | 'text_ASC'
  | 'text_DESC'

type GQLRowServicesWithTextUpdateInput = {
  identity?: Maybe<Scalars['String']>
  /** text input for default locale (nl) */
  text?: Maybe<Scalars['String']>
  links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  localizations?: Maybe<GQLRowServicesWithTextUpdateLocalizationsInput>
}

type GQLRowServicesWithTextUpdateLocalizationDataInput = {
  text: Scalars['String']
}

type GQLRowServicesWithTextUpdateLocalizationInput = {
  data: GQLRowServicesWithTextUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowServicesWithTextUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLRowServicesWithTextCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLRowServicesWithTextUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowServicesWithTextUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLRowServicesWithTextUpdateManyInlineInput = {
  /** Create and connect multiple RowServicesWithText documents */
  create?: Maybe<Array<GQLRowServicesWithTextCreateInput>>
  /** Connect multiple existing RowServicesWithText documents */
  connect?: Maybe<Array<GQLRowServicesWithTextConnectInput>>
  /** Override currently-connected documents with multiple existing RowServicesWithText documents */
  set?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
  /** Update multiple RowServicesWithText documents */
  update?: Maybe<Array<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowServicesWithText documents */
  upsert?: Maybe<Array<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowServicesWithText documents */
  disconnect?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
  /** Delete multiple RowServicesWithText documents */
  delete?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
}

type GQLRowServicesWithTextUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLRowServicesWithTextUpdateManyLocalizationInput>>
}

type GQLRowServicesWithTextUpdateManyLocalizationInput = {
  text: Scalars['String']
}

type GQLRowServicesWithTextUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowServicesWithTextWhereInput
  /** Update many input */
  data: GQLRowServicesWithTextUpdateManyInput
}

type GQLRowServicesWithTextUpdateOneInlineInput = {
  /** Create and connect one RowServicesWithText document */
  create?: Maybe<GQLRowServicesWithTextCreateInput>
  /** Update single RowServicesWithText document */
  update?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowServicesWithText document */
  upsert?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowServicesWithText document */
  connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
  /** Disconnect currently connected RowServicesWithText document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowServicesWithText document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowServicesWithTextWhereUniqueInput
  /** Document to update */
  data: GQLRowServicesWithTextUpdateInput
}

type GQLRowServicesWithTextUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowServicesWithTextCreateInput
  /** Update document if it exists */
  update: GQLRowServicesWithTextUpdateInput
}

type GQLRowServicesWithTextUpsertLocalizationInput = {
  update: GQLRowServicesWithTextUpdateLocalizationDataInput
  create: GQLRowServicesWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowServicesWithTextWhereUniqueInput
  /** Upsert data */
  data: GQLRowServicesWithTextUpsertInput
}

/** Identifies documents */
type GQLRowServicesWithTextWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  identity_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  identity_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  identity_not_ends_with?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  text_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  text_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  text_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  text_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  text_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  text_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  text_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  text_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  text_not_ends_with?: Maybe<Scalars['String']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
}

/** References RowServicesWithText record uniquely */
type GQLRowServicesWithTextWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

/** A full-width Youtube video */
type GQLRowYoutubeVideo = GQLNode & {
  __typename?: 'RowYoutubeVideo'
  /** System stage field */
  stage: GQLStage
  /** System Locale field */
  locale: GQLLocale
  /** Get the other localizations for this document */
  localizations: Array<GQLRowYoutubeVideo>
  /** Get the document in other stages */
  documentInStages: Array<GQLRowYoutubeVideo>
  /** The unique identifier */
  id: Scalars['ID']
  /** The time the document was created */
  createdAt: Scalars['DateTime']
  /** The time the document was updated */
  updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>
  /** The unique identifier */
  videoId: Scalars['String']
  page: Array<GQLPage>
  title: Scalars['String']
}

/** A full-width Youtube video */
type GQLRowYoutubeVideoLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

/** A full-width Youtube video */
type GQLRowYoutubeVideoDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

/** A full-width Youtube video */
type GQLRowYoutubeVideoPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowYoutubeVideoConnectInput = {
  /** Document to connect */
  where: GQLRowYoutubeVideoWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowYoutubeVideoConnection = {
  __typename?: 'RowYoutubeVideoConnection'
  /** Information to aid in pagination. */
  pageInfo: GQLPageInfo
  /** A list of edges. */
  edges: Array<GQLRowYoutubeVideoEdge>
  aggregate: GQLAggregate
}

type GQLRowYoutubeVideoCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** videoId input for default locale (nl) */
  videoId: Scalars['String']
  page?: Maybe<GQLPageCreateManyInlineInput>
  title: Scalars['String']
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: Maybe<GQLRowYoutubeVideoCreateLocalizationsInput>
}

type GQLRowYoutubeVideoCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  videoId: Scalars['String']
}

type GQLRowYoutubeVideoCreateLocalizationInput = {
  /** Localization input */
  data: GQLRowYoutubeVideoCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowYoutubeVideoCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: Maybe<Array<GQLRowYoutubeVideoCreateLocalizationInput>>
}

type GQLRowYoutubeVideoCreateManyInlineInput = {
  /** Create and connect multiple existing RowYoutubeVideo documents */
  create?: Maybe<Array<GQLRowYoutubeVideoCreateInput>>
  /** Connect multiple existing RowYoutubeVideo documents */
  connect?: Maybe<Array<GQLRowYoutubeVideoWhereUniqueInput>>
}

type GQLRowYoutubeVideoCreateOneInlineInput = {
  /** Create and connect one RowYoutubeVideo document */
  create?: Maybe<GQLRowYoutubeVideoCreateInput>
  /** Connect one existing RowYoutubeVideo document */
  connect?: Maybe<GQLRowYoutubeVideoWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowYoutubeVideoEdge = {
  __typename?: 'RowYoutubeVideoEdge'
  /** The item at the end of the edge. */
  node: GQLRowYoutubeVideo
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowYoutubeVideoManyWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
}

type GQLRowYoutubeVideoOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'videoId_ASC'
  | 'videoId_DESC'
  | 'title_ASC'
  | 'title_DESC'

type GQLRowYoutubeVideoUpdateInput = {
  /** videoId input for default locale (nl) */
  videoId?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  title?: Maybe<Scalars['String']>
  /** Manage document localizations */
  localizations?: Maybe<GQLRowYoutubeVideoUpdateLocalizationsInput>
}

type GQLRowYoutubeVideoUpdateLocalizationDataInput = {
  videoId: Scalars['String']
}

type GQLRowYoutubeVideoUpdateLocalizationInput = {
  data: GQLRowYoutubeVideoUpdateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowYoutubeVideoUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: Maybe<Array<GQLRowYoutubeVideoCreateLocalizationInput>>
  /** Localizations to update */
  update?: Maybe<Array<GQLRowYoutubeVideoUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowYoutubeVideoUpsertLocalizationInput>>
  /** Localizations to delete */
  delete?: Maybe<Array<GQLLocale>>
}

type GQLRowYoutubeVideoUpdateManyInlineInput = {
  /** Create and connect multiple RowYoutubeVideo documents */
  create?: Maybe<Array<GQLRowYoutubeVideoCreateInput>>
  /** Connect multiple existing RowYoutubeVideo documents */
  connect?: Maybe<Array<GQLRowYoutubeVideoConnectInput>>
  /** Override currently-connected documents with multiple existing RowYoutubeVideo documents */
  set?: Maybe<Array<GQLRowYoutubeVideoWhereUniqueInput>>
  /** Update multiple RowYoutubeVideo documents */
  update?: Maybe<Array<GQLRowYoutubeVideoUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowYoutubeVideo documents */
  upsert?: Maybe<Array<GQLRowYoutubeVideoUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowYoutubeVideo documents */
  disconnect?: Maybe<Array<GQLRowYoutubeVideoWhereUniqueInput>>
  /** Delete multiple RowYoutubeVideo documents */
  delete?: Maybe<Array<GQLRowYoutubeVideoWhereUniqueInput>>
}

type GQLRowYoutubeVideoUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['String']
  /** Optional updates to localizations */
  localizations?: Maybe<Array<GQLRowYoutubeVideoUpdateManyLocalizationInput>>
}

type GQLRowYoutubeVideoUpdateManyLocalizationInput = {
  videoId: Scalars['String']
}

type GQLRowYoutubeVideoUpdateManyWithNestedWhereInput = {
  /** Document search */
  where: GQLRowYoutubeVideoWhereInput
  /** Update many input */
  data: GQLRowYoutubeVideoUpdateManyInput
}

type GQLRowYoutubeVideoUpdateOneInlineInput = {
  /** Create and connect one RowYoutubeVideo document */
  create?: Maybe<GQLRowYoutubeVideoCreateInput>
  /** Update single RowYoutubeVideo document */
  update?: Maybe<GQLRowYoutubeVideoUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowYoutubeVideo document */
  upsert?: Maybe<GQLRowYoutubeVideoUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowYoutubeVideo document */
  connect?: Maybe<GQLRowYoutubeVideoWhereUniqueInput>
  /** Disconnect currently connected RowYoutubeVideo document */
  disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowYoutubeVideo document */
  delete?: Maybe<Scalars['Boolean']>
}

type GQLRowYoutubeVideoUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowYoutubeVideoWhereUniqueInput
  /** Document to update */
  data: GQLRowYoutubeVideoUpdateInput
}

type GQLRowYoutubeVideoUpsertInput = {
  /** Create document if it didn't exist */
  create: GQLRowYoutubeVideoCreateInput
  /** Update document if it exists */
  update: GQLRowYoutubeVideoUpdateInput
}

type GQLRowYoutubeVideoUpsertLocalizationInput = {
  update: GQLRowYoutubeVideoUpdateLocalizationDataInput
  create: GQLRowYoutubeVideoCreateLocalizationDataInput
  locale: GQLLocale
}

type GQLRowYoutubeVideoUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  where: GQLRowYoutubeVideoWhereUniqueInput
  /** Upsert data */
  data: GQLRowYoutubeVideoUpsertInput
}

/** Identifies documents */
type GQLRowYoutubeVideoWhereInput = {
  /** Contains search across all appropriate fields. */
  _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  AND?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  /** Logical OR on all given filters. */
  OR?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  NOT?: Maybe<Array<GQLRowYoutubeVideoWhereInput>>
  id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  id_in?: Maybe<Array<Scalars['ID']>>
  /** All values that are not contained in given list. */
  id_not_in?: Maybe<Array<Scalars['ID']>>
  /** All values containing the given string. */
  id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  /** All values less than the given value. */
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  videoId?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  videoId_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  videoId_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  videoId_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  videoId_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  videoId_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  videoId_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  videoId_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  videoId_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  videoId_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  title_in?: Maybe<Array<Scalars['String']>>
  /** All values that are not contained in given list. */
  title_not_in?: Maybe<Array<Scalars['String']>>
  /** All values containing the given string. */
  title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  title_not_ends_with?: Maybe<Scalars['String']>
}

/** References RowYoutubeVideo record uniquely */
type GQLRowYoutubeVideoWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

/** Stage system enumeration */
type GQLStage =
  /** System Published Stage */
  | 'PUBLISHED'
  /** System Draft Stage */
  | 'DRAFT'

type GQLUnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: GQLLocale
  /** Stages to unpublish selected locales from */
  stages: Array<GQLStage>
}

type GQLAssetFragment = { __typename?: 'Asset' } & Pick<
  GQLAsset,
  'id' | 'alt' | 'url' | 'width' | 'height' | 'mimeType'
>

type GQLBlogListItemFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'id' | 'title' | 'metaRobots' | 'url' | 'locale'
> & {
    documentInStages: Array<{ __typename?: 'Page' } & Pick<GQLPage, 'publishedAt'>>
    asset?: Maybe<{ __typename?: 'Asset' } & GQLAssetFragment>
  }

type GQLGetBlogListQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
  first?: Scalars['Int']
}

type GQLGetBlogListQuery = { __typename?: 'Query' } & {
  blogPosts: Array<{ __typename?: 'Page' } & GQLBlogListItemFragment>
}

type GQLBreadcrumbFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'id' | 'title' | 'metaRobots' | 'metaTitle' | 'url'
>

type GQLGetBreadcrumbQueryVariables = {
  urls: Array<Scalars['String']>
  locale: GQLLocale
}

type GQLGetBreadcrumbQuery = { __typename?: 'Query' } & {
  breadcrumbs: Array<{ __typename?: 'Page' } & GQLBreadcrumbFragment>
}

type GQLSubmitContactFormMutationVariables = {
  name: Scalars['String']
  email: Scalars['String']
  phoneNumber?: Maybe<Scalars['String']>
  subject?: GQLContactSubject
  message: Scalars['String']
}

type GQLSubmitContactFormMutation = { __typename?: 'Mutation' } & {
  createContactForm?: Maybe<{ __typename?: 'ContactForm' } & Pick<GQLContactForm, 'id'>>
}

type GQLContentRendererFragment = { __typename?: 'Page' } & {
  content: Array<
    | ({ __typename: 'RowServicesWithText' } & Pick<GQLRowServicesWithText, 'id'>)
    | ({ __typename: 'RowColumnThree' } & Pick<GQLRowColumnThree, 'id'> & GQLRowColumnThreeFragment)
    | ({ __typename: 'RowColumnTwo' } & Pick<GQLRowColumnTwo, 'id'>)
    | ({ __typename: 'RowRecentBlogPost' } & Pick<GQLRowRecentBlogPost, 'id'> &
        GQLRowRecentBlogPostFragment)
    | ({ __typename: 'RowPeopleWithText' } & Pick<GQLRowPeopleWithText, 'id'> &
        GQLRowPeopleWithTextFragment)
    | ({ __typename: 'RowColumnOne' } & Pick<GQLRowColumnOne, 'id'>)
    | ({ __typename: 'RowCompanySlider' } & Pick<GQLRowCompanySlider, 'id'> &
        GQLRowCompanySliderFragment)
    | ({ __typename: 'RowHero' } & Pick<GQLRowHero, 'id'> & GQLRowHeroFragment)
    | ({ __typename: 'RowYoutubeVideo' } & Pick<GQLRowYoutubeVideo, 'id'>)
  >
}

type GQLLinkExternalFragment = { __typename?: 'LinkExternal' } & Pick<
  GQLLinkExternal,
  'id' | 'url'
> & { exTitle: GQLLinkExternal['title'] } & {
    description?: Maybe<{ __typename?: 'RichText' } & GQLRichTextFragment>
  }

type GQLLinkInternalFragment = { __typename?: 'LinkInternal' } & Pick<
  GQLLinkInternal,
  'id' | 'title'
> & {
    description?: Maybe<{ __typename?: 'RichText' } & GQLRichTextFragment>
    page?: Maybe<
      { __typename?: 'Page' } & Pick<GQLPage, 'title' | 'metaRobots' | 'metaTitle' | 'url'>
    >
  }

type GQLMenuFragment = { __typename?: 'Menu' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<GQLPage, 'url'> & {
        localizations: Array<
          { __typename?: 'Page' } & Pick<GQLPage, 'locale' | 'id' | 'title' | 'metaRobots' | 'url'>
        >
      }
  >
}

type GQLPageLayoutFragment = { __typename?: 'Page' } & Pick<GQLPage, 'id' | 'locale'> &
  GQLPageMetaFragment &
  GQLContentRendererFragment

type GQLGetPageLayoutQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

type GQLGetPageLayoutQuery = { __typename?: 'Query' } & {
  pages: Array<{ __typename?: 'Page' } & GQLPageLayoutFragment>
  mainMenu?: Maybe<{ __typename?: 'Menu' } & GQLMenuFragment>
  team: Array<{ __typename?: 'Person' } & GQLPersonFragment>
}

type GQLGetStaticPathsQueryVariables = {
  startsWith: Scalars['String']
  locale: GQLLocale
}

type GQLGetStaticPathsQuery = { __typename?: 'Query' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<GQLPage, 'id' | 'locale' | 'url'> & {
        localizations: Array<{ __typename?: 'Page' } & Pick<GQLPage, 'id' | 'locale' | 'url'>>
      }
  >
}

type GQLPageMetaFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'title' | 'metaTitle' | 'metaDescription' | 'metaRobots' | 'url' | 'locale'
> & {
    localizations: Array<
      { __typename?: 'Page' } & Pick<GQLPage, 'id' | 'url' | 'title' | 'locale' | 'metaRobots'>
    >
  }

type GQLPersonFragment = { __typename?: 'Person' } & Pick<GQLPerson, 'id' | 'name'> & {
    avatar: { __typename?: 'Asset' } & GQLAssetFragment
  }

type GQLPortfolioListitemFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'id' | 'title' | 'metaRobots' | 'url'
> & { asset?: Maybe<{ __typename?: 'Asset' } & GQLAssetFragment> }

type GQLGetPortfolioListQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

type GQLGetPortfolioListQuery = { __typename?: 'Query' } & {
  portfolioList: Array<{ __typename?: 'Page' } & GQLPortfolioListitemFragment>
}

type GQLRichTextFragment = { __typename?: 'RichText' } & Pick<GQLRichText, 'raw'>

type GQLGetAllRowColumThreeQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowColumThreeQuery = { __typename?: 'Query' } & {
  rowColumnThrees: Array<{ __typename?: 'RowColumnThree' } & GQLRowColumnThreeFragment>
}

type GQLRowColumnThreeFragment = { __typename?: 'RowColumnThree' } & Pick<
  GQLRowColumnThree,
  'id'
> & {
    colOne: { __typename?: 'RichText' } & GQLRichTextFragment
    colOneIcon?: Maybe<{ __typename?: 'Asset' } & GQLAssetFragment>
    colTwo: { __typename?: 'RichText' } & GQLRichTextFragment
    colTwoIcon?: Maybe<{ __typename?: 'Asset' } & GQLAssetFragment>
    colThree: { __typename?: 'RichText' } & GQLRichTextFragment
    colThreeIcon?: Maybe<{ __typename?: 'Asset' } & GQLAssetFragment>
  }

type GQLGetAllRowCompanySlidersQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowCompanySlidersQuery = { __typename?: 'Query' } & {
  rowCompanySliders: Array<{ __typename?: 'RowCompanySlider' } & GQLRowCompanySliderFragment>
}

type GQLRowCompanySliderFragment = { __typename?: 'RowCompanySlider' } & Pick<
  GQLRowCompanySlider,
  'id'
> & {
    companies: Array<
      { __typename?: 'Company' } & Pick<GQLCompany, 'id'> & {
          logo: { __typename?: 'Asset' } & GQLAssetFragment
        }
    >
  }

type GQLGetAllRowHeroQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowHeroQuery = { __typename?: 'Query' } & {
  rowHeroes: Array<{ __typename?: 'RowHero' } & GQLRowHeroFragment>
}

type GQLRowHeroFragment = { __typename?: 'RowHero' } & Pick<GQLRowHero, 'id'> & {
    asset: { __typename?: 'Asset' } & GQLAssetFragment
    text: { __typename?: 'RichText' } & GQLRichTextFragment
    links: Array<
      | ({ __typename?: 'LinkExternal' } & GQLLinkExternalFragment)
      | ({ __typename?: 'LinkInternal' } & GQLLinkInternalFragment)
    >
  }

type GQLGetRowPeopleWithTextsQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetRowPeopleWithTextsQuery = { __typename?: 'Query' } & {
  rowPeopleWithTexts: Array<{ __typename?: 'RowPeopleWithText' } & GQLRowPeopleWithTextFragment>
}

type GQLRowPeopleWithTextFragment = { __typename?: 'RowPeopleWithText' } & Pick<
  GQLRowPeopleWithText,
  'id'
> & {
    text: { __typename?: 'RichText' } & GQLRichTextFragment
    links: Array<{ __typename?: 'LinkInternal' } & GQLLinkInternalFragment>
    personList?: Maybe<
      { __typename?: 'PersonList' } & {
        people: Array<{ __typename?: 'Person' } & GQLPersonFragment>
      }
    >
  }

type GQLRowRecentBlogPostFragment = { __typename?: 'RowRecentBlogPost' } & {
  link?: Maybe<
    { __typename?: 'LinkInternal' } & Pick<GQLLinkInternal, 'locale'> & GQLLinkInternalFragment
  >
}

type GQLCreatePageMutationVariables = {
  page: GQLPageCreateInput
}

type GQLCreatePageMutation = { __typename?: 'Mutation' } & {
  createPage?: Maybe<{ __typename?: 'Page' } & Pick<GQLPage, 'id'>>
}

type GQLGetAllAssetsQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllAssetsQuery = { __typename?: 'Query' } & {
  assets: Array<{ __typename?: 'Asset' } & Pick<GQLAsset, 'fileName' | 'id'>>
}

type GQLGetDraftPagesQueryVariables = {
  skip?: Scalars['Int']
}

type GQLGetDraftPagesQuery = { __typename?: 'Query' } & {
  pages: Array<{ __typename?: 'Page' } & Pick<GQLPage, 'url' | 'id' | 'stage'>>
}

type GQLPublishAssetMutationVariables = {
  id: Scalars['ID']
  locales: Array<GQLLocale>
}

type GQLPublishAssetMutation = { __typename?: 'Mutation' } & {
  publishAsset?: Maybe<{ __typename?: 'Asset' } & Pick<GQLAsset, 'id'>>
}

type GQLPublishPageMutationVariables = {
  id: Scalars['ID']
  locales: Array<GQLLocale>
}

type GQLPublishPageMutation = { __typename?: 'Mutation' } & {
  publishPage?: Maybe<
    { __typename?: 'Page' } & Pick<GQLPage, 'id'> & {
        asset?: Maybe<{ __typename?: 'Asset' } & Pick<GQLAsset, 'id'>>
      }
  >
}

type GQLUpdatePageMutationVariables = {
  id: Scalars['ID']
  page: GQLPageUpdateInput
}

type GQLUpdatePageMutation = { __typename?: 'Mutation' } & {
  updatePage?: Maybe<{ __typename?: 'Page' } & Pick<GQLPage, 'id'>>
}
