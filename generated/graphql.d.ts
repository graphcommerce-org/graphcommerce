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
  RGBAHue: any
  /** Raw JSON value */
  Json: any
  Hex: any
  RGBATransparency: any
  /**
   * A date string, such as 2007-12-03 (YYYY-MM-DD), compliant with ISO 8601 standard
   * for representation of dates using the Gregorian calendar.
   */
  Date: any
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
  readonly __typename?: 'Aggregate'
  readonly count: Scalars['Int']
}

/** Asset system model */
type GQLAsset = GQLNode & {
  readonly __typename?: 'Asset'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLAsset>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLAsset>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** The file handle */
  readonly handle: Scalars['String']
  /** The file name */
  readonly fileName: Scalars['String']
  /** The height of the file */
  readonly height?: Maybe<Scalars['Float']>
  /** The file width */
  readonly width?: Maybe<Scalars['Float']>
  /** The file size */
  readonly size?: Maybe<Scalars['Float']>
  /** The mime type of the file */
  readonly mimeType?: Maybe<Scalars['String']>
  readonly personAvatar: ReadonlyArray<GQLPerson>
  readonly companyLogo: ReadonlyArray<GQLCompany>
  readonly colOneIconRowColumnTwo: ReadonlyArray<GQLRowColumnTwo>
  readonly colTwoIconRowColumnTwo: ReadonlyArray<GQLRowColumnTwo>
  readonly rowColumnThreeColOneIcon: ReadonlyArray<GQLRowColumnThree>
  readonly rowColumnThreeColTwoIcon: ReadonlyArray<GQLRowColumnThree>
  readonly rowColumnThreeColThreeIcon: ReadonlyArray<GQLRowColumnThree>
  readonly rowColumnOneColOneIcon: ReadonlyArray<GQLRowColumnOne>
  readonly rowHeroAsset: ReadonlyArray<GQLRowHero>
  /** Get the url for the asset with provided transformations applied. */
  readonly url: Scalars['String']
}

/** Asset system model */
type GQLAssetLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

/** Asset system model */
type GQLAssetDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
type GQLAssetColOneIconRowColumnTwoArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

/** Asset system model */
type GQLAssetColTwoIconRowColumnTwoArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
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
type GQLAssetUrlArgs = {
  transformation?: Maybe<GQLAssetTransformationInput>
}

type GQLAssetConnectInput = {
  /** Document to connect */
  readonly where: GQLAssetWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLAssetConnection = {
  readonly __typename?: 'AssetConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLAssetEdge>
  readonly aggregate: GQLAggregate
}

type GQLAssetCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly handle: Scalars['String']
  readonly fileName: Scalars['String']
  readonly height?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
  readonly personAvatar?: Maybe<GQLPersonCreateManyInlineInput>
  readonly companyLogo?: Maybe<GQLCompanyCreateManyInlineInput>
  readonly colOneIconRowColumnTwo?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  readonly colTwoIconRowColumnTwo?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  readonly rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  readonly rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  readonly rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  readonly rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneCreateManyInlineInput>
  readonly rowHeroAsset?: Maybe<GQLRowHeroCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLAssetCreateLocalizationsInput>
}

type GQLAssetCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly handle: Scalars['String']
  readonly fileName: Scalars['String']
  readonly height?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
}

type GQLAssetCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLAssetCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLAssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLAssetCreateLocalizationInput>>
}

type GQLAssetCreateManyInlineInput = {
  /** Create and connect multiple existing Asset documents */
  readonly create?: Maybe<ReadonlyArray<GQLAssetCreateInput>>
  /** Connect multiple existing Asset documents */
  readonly connect?: Maybe<ReadonlyArray<GQLAssetWhereUniqueInput>>
}

type GQLAssetCreateOneInlineInput = {
  /** Create and connect one Asset document */
  readonly create?: Maybe<GQLAssetCreateInput>
  /** Connect one existing Asset document */
  readonly connect?: Maybe<GQLAssetWhereUniqueInput>
}

/** An edge in a connection. */
type GQLAssetEdge = {
  readonly __typename?: 'AssetEdge'
  /** The item at the end of the edge. */
  readonly node: GQLAsset
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLAssetManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly personAvatar_every?: Maybe<GQLPersonWhereInput>
  readonly personAvatar_some?: Maybe<GQLPersonWhereInput>
  readonly personAvatar_none?: Maybe<GQLPersonWhereInput>
  readonly companyLogo_every?: Maybe<GQLCompanyWhereInput>
  readonly companyLogo_some?: Maybe<GQLCompanyWhereInput>
  readonly companyLogo_none?: Maybe<GQLCompanyWhereInput>
  readonly colOneIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colOneIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colOneIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  readonly rowColumnThreeColOneIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColOneIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColOneIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnOneColOneIcon_every?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowColumnOneColOneIcon_some?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowColumnOneColOneIcon_none?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowHeroAsset_every?: Maybe<GQLRowHeroWhereInput>
  readonly rowHeroAsset_some?: Maybe<GQLRowHeroWhereInput>
  readonly rowHeroAsset_none?: Maybe<GQLRowHeroWhereInput>
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

/** Transformations for Assets */
type GQLAssetTransformationInput = {
  readonly image?: Maybe<GQLImageTransformationInput>
  readonly document?: Maybe<GQLDocumentTransformationInput>
  /** Pass true if you want to validate the passed transformation parameters */
  readonly validateOptions?: Maybe<Scalars['Boolean']>
}

type GQLAssetUpdateInput = {
  readonly handle?: Maybe<Scalars['String']>
  readonly fileName?: Maybe<Scalars['String']>
  readonly height?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
  readonly personAvatar?: Maybe<GQLPersonUpdateManyInlineInput>
  readonly companyLogo?: Maybe<GQLCompanyUpdateManyInlineInput>
  readonly colOneIconRowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  readonly colTwoIconRowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  readonly rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  readonly rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  readonly rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  readonly rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneUpdateManyInlineInput>
  readonly rowHeroAsset?: Maybe<GQLRowHeroUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLAssetUpdateLocalizationsInput>
}

type GQLAssetUpdateLocalizationDataInput = {
  readonly handle: Scalars['String']
  readonly fileName: Scalars['String']
  readonly height?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
}

type GQLAssetUpdateLocalizationInput = {
  readonly data: GQLAssetUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLAssetUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLAssetCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLAssetUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLAssetUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLAssetUpdateManyInlineInput = {
  /** Create and connect multiple Asset documents */
  readonly create?: Maybe<ReadonlyArray<GQLAssetCreateInput>>
  /** Connect multiple existing Asset documents */
  readonly connect?: Maybe<ReadonlyArray<GQLAssetConnectInput>>
  /** Override currently-connected documents with multiple existing Asset documents */
  readonly set?: Maybe<ReadonlyArray<GQLAssetWhereUniqueInput>>
  /** Update multiple Asset documents */
  readonly update?: Maybe<ReadonlyArray<GQLAssetUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Asset documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLAssetUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Asset documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLAssetWhereUniqueInput>>
  /** Delete multiple Asset documents */
  readonly delete?: Maybe<ReadonlyArray<GQLAssetWhereUniqueInput>>
}

type GQLAssetUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLAssetUpdateManyLocalizationInput>>
}

type GQLAssetUpdateManyLocalizationInput = {
  readonly fileName: Scalars['String']
  readonly height?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
}

type GQLAssetUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLAssetWhereInput
  /** Update many input */
  readonly data: GQLAssetUpdateManyInput
}

type GQLAssetUpdateOneInlineInput = {
  /** Create and connect one Asset document */
  readonly create?: Maybe<GQLAssetCreateInput>
  /** Update single Asset document */
  readonly update?: Maybe<GQLAssetUpdateWithNestedWhereUniqueInput>
  /** Upsert single Asset document */
  readonly upsert?: Maybe<GQLAssetUpsertWithNestedWhereUniqueInput>
  /** Connect existing Asset document */
  readonly connect?: Maybe<GQLAssetWhereUniqueInput>
  /** Disconnect currently connected Asset document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Asset document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLAssetUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLAssetWhereUniqueInput
  /** Document to update */
  readonly data: GQLAssetUpdateInput
}

type GQLAssetUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLAssetCreateInput
  /** Update document if it exists */
  readonly update: GQLAssetUpdateInput
}

type GQLAssetUpsertLocalizationInput = {
  readonly update: GQLAssetUpdateLocalizationDataInput
  readonly create: GQLAssetCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLAssetUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLAssetWhereUniqueInput
  /** Upsert data */
  readonly data: GQLAssetUpsertInput
}

/** Identifies documents */
type GQLAssetWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLAssetWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly handle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly handle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly handle_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly handle_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly handle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly handle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly handle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly handle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly handle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly handle_not_ends_with?: Maybe<Scalars['String']>
  readonly fileName?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly fileName_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly fileName_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly fileName_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly fileName_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly fileName_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly fileName_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly fileName_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly fileName_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly fileName_not_ends_with?: Maybe<Scalars['String']>
  readonly height?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  readonly height_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  readonly height_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values that are not contained in given list. */
  readonly height_not_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values less than the given value. */
  readonly height_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  readonly height_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  readonly height_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  readonly height_gte?: Maybe<Scalars['Float']>
  readonly width?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  readonly width_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  readonly width_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values that are not contained in given list. */
  readonly width_not_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values less than the given value. */
  readonly width_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  readonly width_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  readonly width_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  readonly width_gte?: Maybe<Scalars['Float']>
  readonly size?: Maybe<Scalars['Float']>
  /** All values that are not equal to given value. */
  readonly size_not?: Maybe<Scalars['Float']>
  /** All values that are contained in given list. */
  readonly size_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values that are not contained in given list. */
  readonly size_not_in?: Maybe<ReadonlyArray<Scalars['Float']>>
  /** All values less than the given value. */
  readonly size_lt?: Maybe<Scalars['Float']>
  /** All values less than or equal the given value. */
  readonly size_lte?: Maybe<Scalars['Float']>
  /** All values greater than the given value. */
  readonly size_gt?: Maybe<Scalars['Float']>
  /** All values greater than or equal the given value. */
  readonly size_gte?: Maybe<Scalars['Float']>
  readonly mimeType?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly mimeType_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly mimeType_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly mimeType_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly mimeType_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly mimeType_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly mimeType_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly mimeType_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly mimeType_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly mimeType_not_ends_with?: Maybe<Scalars['String']>
  readonly personAvatar_every?: Maybe<GQLPersonWhereInput>
  readonly personAvatar_some?: Maybe<GQLPersonWhereInput>
  readonly personAvatar_none?: Maybe<GQLPersonWhereInput>
  readonly companyLogo_every?: Maybe<GQLCompanyWhereInput>
  readonly companyLogo_some?: Maybe<GQLCompanyWhereInput>
  readonly companyLogo_none?: Maybe<GQLCompanyWhereInput>
  readonly colOneIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colOneIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colOneIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  readonly colTwoIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  readonly rowColumnThreeColOneIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColOneIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColOneIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColTwoIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_every?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_some?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnThreeColThreeIcon_none?: Maybe<GQLRowColumnThreeWhereInput>
  readonly rowColumnOneColOneIcon_every?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowColumnOneColOneIcon_some?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowColumnOneColOneIcon_none?: Maybe<GQLRowColumnOneWhereInput>
  readonly rowHeroAsset_every?: Maybe<GQLRowHeroWhereInput>
  readonly rowHeroAsset_some?: Maybe<GQLRowHeroWhereInput>
  readonly rowHeroAsset_none?: Maybe<GQLRowHeroWhereInput>
}

/** References Asset record uniquely */
type GQLAssetWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
}

type GQLBatchPayload = {
  readonly __typename?: 'BatchPayload'
  /** The number of nodes that have been affected by the Batch operation. */
  readonly count: Scalars['Long']
}

/** Representing a color value comprising of HEX, RGBA and css color values */
type GQLColor = {
  readonly __typename?: 'Color'
  readonly hex: Scalars['Hex']
  readonly rgba: GQLRgba
  readonly css: Scalars['String']
}

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
type GQLColorInput = {
  readonly hex?: Maybe<Scalars['Hex']>
  readonly rgba?: Maybe<GQLRgbaInput>
}

type GQLCompany = GQLNode & {
  readonly __typename?: 'Company'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLCompany>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly name: Scalars['String']
  readonly list: ReadonlyArray<GQLZzDeleteList>
  readonly logo: GQLAsset
  readonly rowCompanySlider: ReadonlyArray<GQLRowCompanySlider>
}

type GQLCompanyDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLCompanyListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
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
  readonly where: GQLCompanyWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLCompanyConnection = {
  readonly __typename?: 'CompanyConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLCompanyEdge>
  readonly aggregate: GQLAggregate
}

type GQLCompanyCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly name: Scalars['String']
  readonly list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  readonly logo: GQLAssetCreateOneInlineInput
  readonly rowCompanySlider?: Maybe<GQLRowCompanySliderCreateManyInlineInput>
}

type GQLCompanyCreateManyInlineInput = {
  /** Create and connect multiple existing Company documents */
  readonly create?: Maybe<ReadonlyArray<GQLCompanyCreateInput>>
  /** Connect multiple existing Company documents */
  readonly connect?: Maybe<ReadonlyArray<GQLCompanyWhereUniqueInput>>
}

type GQLCompanyCreateOneInlineInput = {
  /** Create and connect one Company document */
  readonly create?: Maybe<GQLCompanyCreateInput>
  /** Connect one existing Company document */
  readonly connect?: Maybe<GQLCompanyWhereUniqueInput>
}

/** An edge in a connection. */
type GQLCompanyEdge = {
  readonly __typename?: 'CompanyEdge'
  /** The item at the end of the edge. */
  readonly node: GQLCompany
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLCompanyManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly name_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly name_not_ends_with?: Maybe<Scalars['String']>
  readonly logo?: Maybe<GQLAssetWhereInput>
  readonly rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  readonly rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  readonly rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
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
  readonly name?: Maybe<Scalars['String']>
  readonly list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  readonly logo?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly rowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyInlineInput>
}

type GQLCompanyUpdateManyInlineInput = {
  /** Create and connect multiple Company documents */
  readonly create?: Maybe<ReadonlyArray<GQLCompanyCreateInput>>
  /** Connect multiple existing Company documents */
  readonly connect?: Maybe<ReadonlyArray<GQLCompanyConnectInput>>
  /** Override currently-connected documents with multiple existing Company documents */
  readonly set?: Maybe<ReadonlyArray<GQLCompanyWhereUniqueInput>>
  /** Update multiple Company documents */
  readonly update?: Maybe<ReadonlyArray<GQLCompanyUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Company documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLCompanyUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Company documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLCompanyWhereUniqueInput>>
  /** Delete multiple Company documents */
  readonly delete?: Maybe<ReadonlyArray<GQLCompanyWhereUniqueInput>>
}

type GQLCompanyUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLCompanyUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLCompanyWhereInput
  /** Update many input */
  readonly data: GQLCompanyUpdateManyInput
}

type GQLCompanyUpdateOneInlineInput = {
  /** Create and connect one Company document */
  readonly create?: Maybe<GQLCompanyCreateInput>
  /** Update single Company document */
  readonly update?: Maybe<GQLCompanyUpdateWithNestedWhereUniqueInput>
  /** Upsert single Company document */
  readonly upsert?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  /** Connect existing Company document */
  readonly connect?: Maybe<GQLCompanyWhereUniqueInput>
  /** Disconnect currently connected Company document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Company document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLCompanyUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLCompanyWhereUniqueInput
  /** Document to update */
  readonly data: GQLCompanyUpdateInput
}

type GQLCompanyUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLCompanyCreateInput
  /** Update document if it exists */
  readonly update: GQLCompanyUpdateInput
}

type GQLCompanyUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLCompanyWhereUniqueInput
  /** Upsert data */
  readonly data: GQLCompanyUpsertInput
}

/** Identifies documents */
type GQLCompanyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLCompanyWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly name_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly name_not_ends_with?: Maybe<Scalars['String']>
  readonly logo?: Maybe<GQLAssetWhereInput>
  readonly rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  readonly rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  readonly rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
}

/** References Company record uniquely */
type GQLCompanyWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly name?: Maybe<Scalars['String']>
}

type GQLConnectPositionInput = {
  /** Connect document after specified document */
  readonly after?: Maybe<Scalars['ID']>
  /** Connect document before specified document */
  readonly before?: Maybe<Scalars['ID']>
  /** Connect document at first position */
  readonly start?: Maybe<Scalars['Boolean']>
  /** Connect document at last position */
  readonly end?: Maybe<Scalars['Boolean']>
}

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
  readonly format?: Maybe<GQLDocumentFileTypes>
}

/** Transformations for Documents */
type GQLDocumentTransformationInput = {
  /** Changes the output for the file. */
  readonly output?: Maybe<GQLDocumentOutputInput>
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
  readonly width?: Maybe<Scalars['Int']>
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  readonly height?: Maybe<Scalars['Int']>
  /** The default value for the fit parameter is fit:clip. */
  readonly fit?: Maybe<GQLImageFit>
}

/** Transformations for Images */
type GQLImageTransformationInput = {
  /** Resizes the image */
  readonly resize?: Maybe<GQLImageResizeInput>
}

type GQLLinkExternal = GQLNode & {
  readonly __typename?: 'LinkExternal'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLLinkExternal>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLLinkExternal>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly title: Scalars['String']
  readonly url: Scalars['String']
  /** If filled in a LinkBlock will be rendered */
  readonly description?: Maybe<GQLRichText>
  readonly rowHeroVideo: ReadonlyArray<GQLRowHero>
}

type GQLLinkExternalLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLLinkExternalDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLLinkExternalWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLLinkExternalConnection = {
  readonly __typename?: 'LinkExternalConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLLinkExternalEdge>
  readonly aggregate: GQLAggregate
}

type GQLLinkExternalCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** title input for default locale (nl) */
  readonly title: Scalars['String']
  /** url input for default locale (nl) */
  readonly url: Scalars['String']
  /** description input for default locale (nl) */
  readonly description?: Maybe<Scalars['RichTextAST']>
  readonly rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLLinkExternalCreateLocalizationsInput>
}

type GQLLinkExternalCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly title: Scalars['String']
  readonly url: Scalars['String']
  readonly description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLLinkExternalCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkExternalCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLLinkExternalCreateLocalizationInput>>
}

type GQLLinkExternalCreateManyInlineInput = {
  /** Create and connect multiple existing LinkExternal documents */
  readonly create?: Maybe<ReadonlyArray<GQLLinkExternalCreateInput>>
  /** Connect multiple existing LinkExternal documents */
  readonly connect?: Maybe<ReadonlyArray<GQLLinkExternalWhereUniqueInput>>
}

type GQLLinkExternalCreateOneInlineInput = {
  /** Create and connect one LinkExternal document */
  readonly create?: Maybe<GQLLinkExternalCreateInput>
  /** Connect one existing LinkExternal document */
  readonly connect?: Maybe<GQLLinkExternalWhereUniqueInput>
}

/** An edge in a connection. */
type GQLLinkExternalEdge = {
  readonly __typename?: 'LinkExternalEdge'
  /** The item at the end of the edge. */
  readonly node: GQLLinkExternal
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLLinkExternalManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
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
  readonly title?: Maybe<Scalars['String']>
  /** url input for default locale (nl) */
  readonly url?: Maybe<Scalars['String']>
  /** description input for default locale (nl) */
  readonly description?: Maybe<Scalars['RichTextAST']>
  readonly rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLLinkExternalUpdateLocalizationsInput>
}

type GQLLinkExternalUpdateLocalizationDataInput = {
  readonly title: Scalars['String']
  readonly url: Scalars['String']
  readonly description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalUpdateLocalizationInput = {
  readonly data: GQLLinkExternalUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkExternalUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLLinkExternalCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLLinkExternalUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLLinkExternalUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLLinkExternalUpdateManyInlineInput = {
  /** Create and connect multiple LinkExternal documents */
  readonly create?: Maybe<ReadonlyArray<GQLLinkExternalCreateInput>>
  /** Connect multiple existing LinkExternal documents */
  readonly connect?: Maybe<ReadonlyArray<GQLLinkExternalConnectInput>>
  /** Override currently-connected documents with multiple existing LinkExternal documents */
  readonly set?: Maybe<ReadonlyArray<GQLLinkExternalWhereUniqueInput>>
  /** Update multiple LinkExternal documents */
  readonly update?: Maybe<ReadonlyArray<GQLLinkExternalUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple LinkExternal documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLLinkExternalUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple LinkExternal documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLLinkExternalWhereUniqueInput>>
  /** Delete multiple LinkExternal documents */
  readonly delete?: Maybe<ReadonlyArray<GQLLinkExternalWhereUniqueInput>>
}

type GQLLinkExternalUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLLinkExternalUpdateManyLocalizationInput>>
}

type GQLLinkExternalUpdateManyLocalizationInput = {
  readonly title: Scalars['String']
  readonly url: Scalars['String']
  readonly description?: Maybe<Scalars['RichTextAST']>
}

type GQLLinkExternalUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLLinkExternalWhereInput
  /** Update many input */
  readonly data: GQLLinkExternalUpdateManyInput
}

type GQLLinkExternalUpdateOneInlineInput = {
  /** Create and connect one LinkExternal document */
  readonly create?: Maybe<GQLLinkExternalCreateInput>
  /** Update single LinkExternal document */
  readonly update?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  /** Upsert single LinkExternal document */
  readonly upsert?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  /** Connect existing LinkExternal document */
  readonly connect?: Maybe<GQLLinkExternalWhereUniqueInput>
  /** Disconnect currently connected LinkExternal document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected LinkExternal document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLLinkExternalUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLLinkExternalWhereUniqueInput
  /** Document to update */
  readonly data: GQLLinkExternalUpdateInput
}

type GQLLinkExternalUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLLinkExternalCreateInput
  /** Update document if it exists */
  readonly update: GQLLinkExternalUpdateInput
}

type GQLLinkExternalUpsertLocalizationInput = {
  readonly update: GQLLinkExternalUpdateLocalizationDataInput
  readonly create: GQLLinkExternalCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkExternalUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLLinkExternalWhereUniqueInput
  /** Upsert data */
  readonly data: GQLLinkExternalUpsertInput
}

/** Identifies documents */
type GQLLinkExternalWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLLinkExternalWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly title_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly title_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly title_not_ends_with?: Maybe<Scalars['String']>
  readonly url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly url_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly url_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly url_not_ends_with?: Maybe<Scalars['String']>
}

/** References LinkExternal record uniquely */
type GQLLinkExternalWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
}

type GQLLinkInternal = GQLNode & {
  readonly __typename?: 'LinkInternal'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLLinkInternal>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLLinkInternal>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly title: Scalars['String']
  readonly page?: Maybe<GQLPage>
  readonly list: ReadonlyArray<GQLZzDeleteList>
  readonly description?: Maybe<GQLRichText>
  readonly rowPeopleWithText: ReadonlyArray<GQLRowPeopleWithText>
  readonly rowServicesWithText: ReadonlyArray<GQLRowServicesWithText>
  readonly rowHeroVideo: ReadonlyArray<GQLRowHero>
}

type GQLLinkInternalLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLLinkInternalDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLLinkInternalListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
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
  readonly where: GQLLinkInternalWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLLinkInternalConnection = {
  readonly __typename?: 'LinkInternalConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLLinkInternalEdge>
  readonly aggregate: GQLAggregate
}

type GQLLinkInternalCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** title input for default locale (nl) */
  readonly title: Scalars['String']
  readonly page?: Maybe<GQLPageCreateOneInlineInput>
  readonly list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  readonly description?: Maybe<Scalars['RichTextAST']>
  readonly rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
  readonly rowServicesWithText?: Maybe<GQLRowServicesWithTextCreateManyInlineInput>
  readonly rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLLinkInternalCreateLocalizationsInput>
}

type GQLLinkInternalCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly title: Scalars['String']
}

type GQLLinkInternalCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLLinkInternalCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkInternalCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLLinkInternalCreateLocalizationInput>>
}

type GQLLinkInternalCreateManyInlineInput = {
  /** Create and connect multiple existing LinkInternal documents */
  readonly create?: Maybe<ReadonlyArray<GQLLinkInternalCreateInput>>
  /** Connect multiple existing LinkInternal documents */
  readonly connect?: Maybe<ReadonlyArray<GQLLinkInternalWhereUniqueInput>>
}

type GQLLinkInternalCreateOneInlineInput = {
  /** Create and connect one LinkInternal document */
  readonly create?: Maybe<GQLLinkInternalCreateInput>
  /** Connect one existing LinkInternal document */
  readonly connect?: Maybe<GQLLinkInternalWhereUniqueInput>
}

/** An edge in a connection. */
type GQLLinkInternalEdge = {
  readonly __typename?: 'LinkInternalEdge'
  /** The item at the end of the edge. */
  readonly node: GQLLinkInternal
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLLinkInternalManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly page?: Maybe<GQLPageWhereInput>
  readonly rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  readonly rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  readonly rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
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
  readonly title?: Maybe<Scalars['String']>
  readonly page?: Maybe<GQLPageUpdateOneInlineInput>
  readonly list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  readonly description?: Maybe<Scalars['RichTextAST']>
  readonly rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
  readonly rowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyInlineInput>
  readonly rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLLinkInternalUpdateLocalizationsInput>
}

type GQLLinkInternalUpdateLocalizationDataInput = {
  readonly title: Scalars['String']
}

type GQLLinkInternalUpdateLocalizationInput = {
  readonly data: GQLLinkInternalUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkInternalUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLLinkInternalCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLLinkInternalUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLLinkInternalUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLLinkInternalUpdateManyInlineInput = {
  /** Create and connect multiple LinkInternal documents */
  readonly create?: Maybe<ReadonlyArray<GQLLinkInternalCreateInput>>
  /** Connect multiple existing LinkInternal documents */
  readonly connect?: Maybe<ReadonlyArray<GQLLinkInternalConnectInput>>
  /** Override currently-connected documents with multiple existing LinkInternal documents */
  readonly set?: Maybe<ReadonlyArray<GQLLinkInternalWhereUniqueInput>>
  /** Update multiple LinkInternal documents */
  readonly update?: Maybe<ReadonlyArray<GQLLinkInternalUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple LinkInternal documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLLinkInternalUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple LinkInternal documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLLinkInternalWhereUniqueInput>>
  /** Delete multiple LinkInternal documents */
  readonly delete?: Maybe<ReadonlyArray<GQLLinkInternalWhereUniqueInput>>
}

type GQLLinkInternalUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly description?: Maybe<Scalars['RichTextAST']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLLinkInternalUpdateManyLocalizationInput>>
}

type GQLLinkInternalUpdateManyLocalizationInput = {
  readonly title: Scalars['String']
}

type GQLLinkInternalUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLLinkInternalWhereInput
  /** Update many input */
  readonly data: GQLLinkInternalUpdateManyInput
}

type GQLLinkInternalUpdateOneInlineInput = {
  /** Create and connect one LinkInternal document */
  readonly create?: Maybe<GQLLinkInternalCreateInput>
  /** Update single LinkInternal document */
  readonly update?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
  /** Upsert single LinkInternal document */
  readonly upsert?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
  /** Connect existing LinkInternal document */
  readonly connect?: Maybe<GQLLinkInternalWhereUniqueInput>
  /** Disconnect currently connected LinkInternal document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected LinkInternal document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLLinkInternalUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLLinkInternalWhereUniqueInput
  /** Document to update */
  readonly data: GQLLinkInternalUpdateInput
}

type GQLLinkInternalUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLLinkInternalCreateInput
  /** Update document if it exists */
  readonly update: GQLLinkInternalUpdateInput
}

type GQLLinkInternalUpsertLocalizationInput = {
  readonly update: GQLLinkInternalUpdateLocalizationDataInput
  readonly create: GQLLinkInternalCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLLinkInternalUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLLinkInternalWhereUniqueInput
  /** Upsert data */
  readonly data: GQLLinkInternalUpsertInput
}

/** Identifies documents */
type GQLLinkInternalWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLLinkInternalWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly title_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly title_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly title_not_ends_with?: Maybe<Scalars['String']>
  readonly page?: Maybe<GQLPageWhereInput>
  readonly rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  readonly rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  readonly rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
}

/** References LinkInternal record uniquely */
type GQLLinkInternalWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
}

type GQLListItems = GQLPage | GQLPerson | GQLCompany | GQLRowHero | GQLLinkInternal

type GQLListItemsConnectInput = {
  readonly Page?: Maybe<GQLPageConnectInput>
  readonly Person?: Maybe<GQLPersonConnectInput>
  readonly Company?: Maybe<GQLCompanyConnectInput>
  readonly RowHero?: Maybe<GQLRowHeroConnectInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalConnectInput>
}

type GQLListItemsCreateInput = {
  readonly Page?: Maybe<GQLPageCreateInput>
  readonly Person?: Maybe<GQLPersonCreateInput>
  readonly Company?: Maybe<GQLCompanyCreateInput>
  readonly RowHero?: Maybe<GQLRowHeroCreateInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalCreateInput>
}

type GQLListItemsCreateManyInlineInput = {
  /** Create and connect multiple existing ListItems documents */
  readonly create?: Maybe<ReadonlyArray<GQLListItemsCreateInput>>
  /** Connect multiple existing ListItems documents */
  readonly connect?: Maybe<ReadonlyArray<GQLListItemsWhereUniqueInput>>
}

type GQLListItemsCreateOneInlineInput = {
  /** Create and connect one ListItems document */
  readonly create?: Maybe<GQLListItemsCreateInput>
  /** Connect one existing ListItems document */
  readonly connect?: Maybe<GQLListItemsWhereUniqueInput>
}

type GQLListItemsUpdateInput = {
  readonly Page?: Maybe<GQLPageUpdateInput>
  readonly Person?: Maybe<GQLPersonUpdateInput>
  readonly Company?: Maybe<GQLCompanyUpdateInput>
  readonly RowHero?: Maybe<GQLRowHeroUpdateInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateInput>
}

type GQLListItemsUpdateManyInlineInput = {
  /** Create and connect multiple ListItems documents */
  readonly create?: Maybe<ReadonlyArray<GQLListItemsCreateInput>>
  /** Connect multiple existing ListItems documents */
  readonly connect?: Maybe<ReadonlyArray<GQLListItemsConnectInput>>
  /** Override currently-connected documents with multiple existing ListItems documents */
  readonly set?: Maybe<ReadonlyArray<GQLListItemsWhereUniqueInput>>
  /** Update multiple ListItems documents */
  readonly update?: Maybe<ReadonlyArray<GQLListItemsUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple ListItems documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLListItemsUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple ListItems documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLListItemsWhereUniqueInput>>
  /** Delete multiple ListItems documents */
  readonly delete?: Maybe<ReadonlyArray<GQLListItemsWhereUniqueInput>>
}

type GQLListItemsUpdateManyWithNestedWhereInput = {
  readonly Page?: Maybe<GQLPageUpdateManyWithNestedWhereInput>
  readonly Person?: Maybe<GQLPersonUpdateManyWithNestedWhereInput>
  readonly Company?: Maybe<GQLCompanyUpdateManyWithNestedWhereInput>
  readonly RowHero?: Maybe<GQLRowHeroUpdateManyWithNestedWhereInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateManyWithNestedWhereInput>
}

type GQLListItemsUpdateOneInlineInput = {
  /** Create and connect one ListItems document */
  readonly create?: Maybe<GQLListItemsCreateInput>
  /** Update single ListItems document */
  readonly update?: Maybe<GQLListItemsUpdateWithNestedWhereUniqueInput>
  /** Upsert single ListItems document */
  readonly upsert?: Maybe<GQLListItemsUpsertWithNestedWhereUniqueInput>
  /** Connect existing ListItems document */
  readonly connect?: Maybe<GQLListItemsWhereUniqueInput>
  /** Disconnect currently connected ListItems document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected ListItems document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLListItemsUpdateWithNestedWhereUniqueInput = {
  readonly Page?: Maybe<GQLPageUpdateWithNestedWhereUniqueInput>
  readonly Person?: Maybe<GQLPersonUpdateWithNestedWhereUniqueInput>
  readonly Company?: Maybe<GQLCompanyUpdateWithNestedWhereUniqueInput>
  readonly RowHero?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
}

type GQLListItemsUpsertWithNestedWhereUniqueInput = {
  readonly Page?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  readonly Person?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  readonly Company?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  readonly RowHero?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
}

type GQLListItemsWhereInput = {
  readonly Page?: Maybe<GQLPageWhereInput>
  readonly Person?: Maybe<GQLPersonWhereInput>
  readonly Company?: Maybe<GQLCompanyWhereInput>
  readonly RowHero?: Maybe<GQLRowHeroWhereInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalWhereInput>
}

type GQLListItemsWhereUniqueInput = {
  readonly Page?: Maybe<GQLPageWhereUniqueInput>
  readonly Person?: Maybe<GQLPersonWhereUniqueInput>
  readonly Company?: Maybe<GQLCompanyWhereUniqueInput>
  readonly RowHero?: Maybe<GQLRowHeroWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalWhereUniqueInput>
}

/** Locale system enumeration */
type GQLLocale =
  /** System locale */
  'nl' | 'en'

/** Representing a geolocation point with latitude and longitude */
type GQLLocation = {
  readonly __typename?: 'Location'
  readonly latitude: Scalars['Float']
  readonly longitude: Scalars['Float']
  readonly distance: Scalars['Float']
}

/** Representing a geolocation point with latitude and longitude */
type GQLLocationDistanceArgs = {
  from: GQLLocationInput
}

/** Input for a geolocation point with latitude and longitude */
type GQLLocationInput = {
  readonly latitude: Scalars['Float']
  readonly longitude: Scalars['Float']
}

type GQLMenu = GQLNode & {
  readonly __typename?: 'Menu'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLMenu>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly pages: ReadonlyArray<GQLPage>
}

type GQLMenuDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLMenuWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLMenuConnection = {
  readonly __typename?: 'MenuConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLMenuEdge>
  readonly aggregate: GQLAggregate
}

type GQLMenuCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly pages?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLMenuCreateManyInlineInput = {
  /** Create and connect multiple existing Menu documents */
  readonly create?: Maybe<ReadonlyArray<GQLMenuCreateInput>>
  /** Connect multiple existing Menu documents */
  readonly connect?: Maybe<ReadonlyArray<GQLMenuWhereUniqueInput>>
}

type GQLMenuCreateOneInlineInput = {
  /** Create and connect one Menu document */
  readonly create?: Maybe<GQLMenuCreateInput>
  /** Connect one existing Menu document */
  readonly connect?: Maybe<GQLMenuWhereUniqueInput>
}

/** An edge in a connection. */
type GQLMenuEdge = {
  readonly __typename?: 'MenuEdge'
  /** The item at the end of the edge. */
  readonly node: GQLMenu
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLMenuManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly pages_every?: Maybe<GQLPageWhereInput>
  readonly pages_some?: Maybe<GQLPageWhereInput>
  readonly pages_none?: Maybe<GQLPageWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  readonly pages?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLMenuUpdateManyInlineInput = {
  /** Create and connect multiple Menu documents */
  readonly create?: Maybe<ReadonlyArray<GQLMenuCreateInput>>
  /** Connect multiple existing Menu documents */
  readonly connect?: Maybe<ReadonlyArray<GQLMenuConnectInput>>
  /** Override currently-connected documents with multiple existing Menu documents */
  readonly set?: Maybe<ReadonlyArray<GQLMenuWhereUniqueInput>>
  /** Update multiple Menu documents */
  readonly update?: Maybe<ReadonlyArray<GQLMenuUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Menu documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLMenuUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Menu documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLMenuWhereUniqueInput>>
  /** Delete multiple Menu documents */
  readonly delete?: Maybe<ReadonlyArray<GQLMenuWhereUniqueInput>>
}

type GQLMenuUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLMenuUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLMenuWhereInput
  /** Update many input */
  readonly data: GQLMenuUpdateManyInput
}

type GQLMenuUpdateOneInlineInput = {
  /** Create and connect one Menu document */
  readonly create?: Maybe<GQLMenuCreateInput>
  /** Update single Menu document */
  readonly update?: Maybe<GQLMenuUpdateWithNestedWhereUniqueInput>
  /** Upsert single Menu document */
  readonly upsert?: Maybe<GQLMenuUpsertWithNestedWhereUniqueInput>
  /** Connect existing Menu document */
  readonly connect?: Maybe<GQLMenuWhereUniqueInput>
  /** Disconnect currently connected Menu document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Menu document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLMenuUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLMenuWhereUniqueInput
  /** Document to update */
  readonly data: GQLMenuUpdateInput
}

type GQLMenuUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLMenuCreateInput
  /** Update document if it exists */
  readonly update: GQLMenuUpdateInput
}

type GQLMenuUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLMenuWhereUniqueInput
  /** Upsert data */
  readonly data: GQLMenuUpsertInput
}

/** Identifies documents */
type GQLMenuWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLMenuWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly pages_every?: Maybe<GQLPageWhereInput>
  readonly pages_some?: Maybe<GQLPageWhereInput>
  readonly pages_none?: Maybe<GQLPageWhereInput>
}

/** References Menu record uniquely */
type GQLMenuWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLMetaRobots = 'INDEX_FOLLOW' | 'INDEX_NOFOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW'

type GQLMutation = {
  readonly __typename?: 'Mutation'
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  readonly createAsset?: Maybe<GQLAsset>
  /** Update one asset */
  readonly updateAsset?: Maybe<GQLAsset>
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  readonly deleteAsset?: Maybe<GQLAsset>
  /** Upsert one asset */
  readonly upsertAsset?: Maybe<GQLAsset>
  /** Publish one asset */
  readonly publishAsset?: Maybe<GQLAsset>
  /**
   * Unpublish one asset from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishAsset?: Maybe<GQLAsset>
  /** Update many assets */
  readonly updateManyAssets: GQLBatchPayload
  /** Delete many Asset documents */
  readonly deleteManyAssets: GQLBatchPayload
  /** Publish many Asset documents */
  readonly publishManyAssets: GQLBatchPayload
  /** Unpublish many Asset documents */
  readonly unpublishManyAssets: GQLBatchPayload
  /** Create one company */
  readonly createCompany?: Maybe<GQLCompany>
  /** Update one company */
  readonly updateCompany?: Maybe<GQLCompany>
  /** Delete one company from _all_ existing stages. Returns deleted document. */
  readonly deleteCompany?: Maybe<GQLCompany>
  /** Upsert one company */
  readonly upsertCompany?: Maybe<GQLCompany>
  /** Publish one company */
  readonly publishCompany?: Maybe<GQLCompany>
  /**
   * Unpublish one company from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishCompany?: Maybe<GQLCompany>
  /** Update many companies */
  readonly updateManyCompanies: GQLBatchPayload
  /** Delete many Company documents */
  readonly deleteManyCompanies: GQLBatchPayload
  /** Publish many Company documents */
  readonly publishManyCompanies: GQLBatchPayload
  /** Unpublish many Company documents */
  readonly unpublishManyCompanies: GQLBatchPayload
  /** Create one linkExternal */
  readonly createLinkExternal?: Maybe<GQLLinkExternal>
  /** Update one linkExternal */
  readonly updateLinkExternal?: Maybe<GQLLinkExternal>
  /** Delete one linkExternal from _all_ existing stages. Returns deleted document. */
  readonly deleteLinkExternal?: Maybe<GQLLinkExternal>
  /** Upsert one linkExternal */
  readonly upsertLinkExternal?: Maybe<GQLLinkExternal>
  /** Publish one linkExternal */
  readonly publishLinkExternal?: Maybe<GQLLinkExternal>
  /**
   * Unpublish one linkExternal from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishLinkExternal?: Maybe<GQLLinkExternal>
  /** Update many linkExternals */
  readonly updateManyLinkExternals: GQLBatchPayload
  /** Delete many LinkExternal documents */
  readonly deleteManyLinkExternals: GQLBatchPayload
  /** Publish many LinkExternal documents */
  readonly publishManyLinkExternals: GQLBatchPayload
  /** Unpublish many LinkExternal documents */
  readonly unpublishManyLinkExternals: GQLBatchPayload
  /** Create one linkInternal */
  readonly createLinkInternal?: Maybe<GQLLinkInternal>
  /** Update one linkInternal */
  readonly updateLinkInternal?: Maybe<GQLLinkInternal>
  /** Delete one linkInternal from _all_ existing stages. Returns deleted document. */
  readonly deleteLinkInternal?: Maybe<GQLLinkInternal>
  /** Upsert one linkInternal */
  readonly upsertLinkInternal?: Maybe<GQLLinkInternal>
  /** Publish one linkInternal */
  readonly publishLinkInternal?: Maybe<GQLLinkInternal>
  /**
   * Unpublish one linkInternal from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishLinkInternal?: Maybe<GQLLinkInternal>
  /** Update many linkInternals */
  readonly updateManyLinkInternals: GQLBatchPayload
  /** Delete many LinkInternal documents */
  readonly deleteManyLinkInternals: GQLBatchPayload
  /** Publish many LinkInternal documents */
  readonly publishManyLinkInternals: GQLBatchPayload
  /** Unpublish many LinkInternal documents */
  readonly unpublishManyLinkInternals: GQLBatchPayload
  /** Create one menu */
  readonly createMenu?: Maybe<GQLMenu>
  /** Update one menu */
  readonly updateMenu?: Maybe<GQLMenu>
  /** Delete one menu from _all_ existing stages. Returns deleted document. */
  readonly deleteMenu?: Maybe<GQLMenu>
  /** Upsert one menu */
  readonly upsertMenu?: Maybe<GQLMenu>
  /** Publish one menu */
  readonly publishMenu?: Maybe<GQLMenu>
  /**
   * Unpublish one menu from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishMenu?: Maybe<GQLMenu>
  /** Update many menus */
  readonly updateManyMenus: GQLBatchPayload
  /** Delete many Menu documents */
  readonly deleteManyMenus: GQLBatchPayload
  /** Publish many Menu documents */
  readonly publishManyMenus: GQLBatchPayload
  /** Unpublish many Menu documents */
  readonly unpublishManyMenus: GQLBatchPayload
  /** Create one page */
  readonly createPage?: Maybe<GQLPage>
  /** Update one page */
  readonly updatePage?: Maybe<GQLPage>
  /** Delete one page from _all_ existing stages. Returns deleted document. */
  readonly deletePage?: Maybe<GQLPage>
  /** Upsert one page */
  readonly upsertPage?: Maybe<GQLPage>
  /** Publish one page */
  readonly publishPage?: Maybe<GQLPage>
  /**
   * Unpublish one page from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishPage?: Maybe<GQLPage>
  /** Update many pages */
  readonly updateManyPages: GQLBatchPayload
  /** Delete many Page documents */
  readonly deleteManyPages: GQLBatchPayload
  /** Publish many Page documents */
  readonly publishManyPages: GQLBatchPayload
  /** Unpublish many Page documents */
  readonly unpublishManyPages: GQLBatchPayload
  /** Create one person */
  readonly createPerson?: Maybe<GQLPerson>
  /** Update one person */
  readonly updatePerson?: Maybe<GQLPerson>
  /** Delete one person from _all_ existing stages. Returns deleted document. */
  readonly deletePerson?: Maybe<GQLPerson>
  /** Upsert one person */
  readonly upsertPerson?: Maybe<GQLPerson>
  /** Publish one person */
  readonly publishPerson?: Maybe<GQLPerson>
  /**
   * Unpublish one person from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishPerson?: Maybe<GQLPerson>
  /** Update many people */
  readonly updateManyPeople: GQLBatchPayload
  /** Delete many Person documents */
  readonly deleteManyPeople: GQLBatchPayload
  /** Publish many Person documents */
  readonly publishManyPeople: GQLBatchPayload
  /** Unpublish many Person documents */
  readonly unpublishManyPeople: GQLBatchPayload
  /** Create one personList */
  readonly createPersonList?: Maybe<GQLPersonList>
  /** Update one personList */
  readonly updatePersonList?: Maybe<GQLPersonList>
  /** Delete one personList from _all_ existing stages. Returns deleted document. */
  readonly deletePersonList?: Maybe<GQLPersonList>
  /** Upsert one personList */
  readonly upsertPersonList?: Maybe<GQLPersonList>
  /** Publish one personList */
  readonly publishPersonList?: Maybe<GQLPersonList>
  /**
   * Unpublish one personList from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishPersonList?: Maybe<GQLPersonList>
  /** Update many personLists */
  readonly updateManyPersonLists: GQLBatchPayload
  /** Delete many PersonList documents */
  readonly deleteManyPersonLists: GQLBatchPayload
  /** Publish many PersonList documents */
  readonly publishManyPersonLists: GQLBatchPayload
  /** Unpublish many PersonList documents */
  readonly unpublishManyPersonLists: GQLBatchPayload
  /** Create one rowColumnOne */
  readonly createRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Update one rowColumnOne */
  readonly updateRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Delete one rowColumnOne from _all_ existing stages. Returns deleted document. */
  readonly deleteRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Upsert one rowColumnOne */
  readonly upsertRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Publish one rowColumnOne */
  readonly publishRowColumnOne?: Maybe<GQLRowColumnOne>
  /**
   * Unpublish one rowColumnOne from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowColumnOne?: Maybe<GQLRowColumnOne>
  /** Update many rowColumnOnes */
  readonly updateManyRowColumnOnes: GQLBatchPayload
  /** Delete many RowColumnOne documents */
  readonly deleteManyRowColumnOnes: GQLBatchPayload
  /** Publish many RowColumnOne documents */
  readonly publishManyRowColumnOnes: GQLBatchPayload
  /** Unpublish many RowColumnOne documents */
  readonly unpublishManyRowColumnOnes: GQLBatchPayload
  /** Create one rowColumnThree */
  readonly createRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Update one rowColumnThree */
  readonly updateRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Delete one rowColumnThree from _all_ existing stages. Returns deleted document. */
  readonly deleteRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Upsert one rowColumnThree */
  readonly upsertRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Publish one rowColumnThree */
  readonly publishRowColumnThree?: Maybe<GQLRowColumnThree>
  /**
   * Unpublish one rowColumnThree from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowColumnThree?: Maybe<GQLRowColumnThree>
  /** Update many rowColumnThrees */
  readonly updateManyRowColumnThrees: GQLBatchPayload
  /** Delete many RowColumnThree documents */
  readonly deleteManyRowColumnThrees: GQLBatchPayload
  /** Publish many RowColumnThree documents */
  readonly publishManyRowColumnThrees: GQLBatchPayload
  /** Unpublish many RowColumnThree documents */
  readonly unpublishManyRowColumnThrees: GQLBatchPayload
  /** Create one rowColumnTwo */
  readonly createRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Update one rowColumnTwo */
  readonly updateRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Delete one rowColumnTwo from _all_ existing stages. Returns deleted document. */
  readonly deleteRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Upsert one rowColumnTwo */
  readonly upsertRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Publish one rowColumnTwo */
  readonly publishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /**
   * Unpublish one rowColumnTwo from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Update many rowColumnTwos */
  readonly updateManyRowColumnTwos: GQLBatchPayload
  /** Delete many RowColumnTwo documents */
  readonly deleteManyRowColumnTwos: GQLBatchPayload
  /** Publish many RowColumnTwo documents */
  readonly publishManyRowColumnTwos: GQLBatchPayload
  /** Unpublish many RowColumnTwo documents */
  readonly unpublishManyRowColumnTwos: GQLBatchPayload
  /** Create one rowCompanySlider */
  readonly createRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Update one rowCompanySlider */
  readonly updateRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Delete one rowCompanySlider from _all_ existing stages. Returns deleted document. */
  readonly deleteRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Upsert one rowCompanySlider */
  readonly upsertRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Publish one rowCompanySlider */
  readonly publishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /**
   * Unpublish one rowCompanySlider from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Update many rowCompanySliders */
  readonly updateManyRowCompanySliders: GQLBatchPayload
  /** Delete many RowCompanySlider documents */
  readonly deleteManyRowCompanySliders: GQLBatchPayload
  /** Publish many RowCompanySlider documents */
  readonly publishManyRowCompanySliders: GQLBatchPayload
  /** Unpublish many RowCompanySlider documents */
  readonly unpublishManyRowCompanySliders: GQLBatchPayload
  /** Create one rowHero */
  readonly createRowHero?: Maybe<GQLRowHero>
  /** Update one rowHero */
  readonly updateRowHero?: Maybe<GQLRowHero>
  /** Delete one rowHero from _all_ existing stages. Returns deleted document. */
  readonly deleteRowHero?: Maybe<GQLRowHero>
  /** Upsert one rowHero */
  readonly upsertRowHero?: Maybe<GQLRowHero>
  /** Publish one rowHero */
  readonly publishRowHero?: Maybe<GQLRowHero>
  /**
   * Unpublish one rowHero from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowHero?: Maybe<GQLRowHero>
  /** Update many rowHeroes */
  readonly updateManyRowHeroes: GQLBatchPayload
  /** Delete many RowHero documents */
  readonly deleteManyRowHeroes: GQLBatchPayload
  /** Publish many RowHero documents */
  readonly publishManyRowHeroes: GQLBatchPayload
  /** Unpublish many RowHero documents */
  readonly unpublishManyRowHeroes: GQLBatchPayload
  /** Create one rowPeopleWithText */
  readonly createRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Update one rowPeopleWithText */
  readonly updateRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Delete one rowPeopleWithText from _all_ existing stages. Returns deleted document. */
  readonly deleteRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Upsert one rowPeopleWithText */
  readonly upsertRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Publish one rowPeopleWithText */
  readonly publishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /**
   * Unpublish one rowPeopleWithText from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Update many rowPeopleWithTexts */
  readonly updateManyRowPeopleWithTexts: GQLBatchPayload
  /** Delete many RowPeopleWithText documents */
  readonly deleteManyRowPeopleWithTexts: GQLBatchPayload
  /** Publish many RowPeopleWithText documents */
  readonly publishManyRowPeopleWithTexts: GQLBatchPayload
  /** Unpublish many RowPeopleWithText documents */
  readonly unpublishManyRowPeopleWithTexts: GQLBatchPayload
  /** Create one rowRecentBlogPost */
  readonly createRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Update one rowRecentBlogPost */
  readonly updateRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Delete one rowRecentBlogPost from _all_ existing stages. Returns deleted document. */
  readonly deleteRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Upsert one rowRecentBlogPost */
  readonly upsertRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Publish one rowRecentBlogPost */
  readonly publishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /**
   * Unpublish one rowRecentBlogPost from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Update many rowRecentBlogPosts */
  readonly updateManyRowRecentBlogPosts: GQLBatchPayload
  /** Delete many RowRecentBlogPost documents */
  readonly deleteManyRowRecentBlogPosts: GQLBatchPayload
  /** Publish many RowRecentBlogPost documents */
  readonly publishManyRowRecentBlogPosts: GQLBatchPayload
  /** Unpublish many RowRecentBlogPost documents */
  readonly unpublishManyRowRecentBlogPosts: GQLBatchPayload
  /** Create one rowServicesWithText */
  readonly createRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Update one rowServicesWithText */
  readonly updateRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Delete one rowServicesWithText from _all_ existing stages. Returns deleted document. */
  readonly deleteRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Upsert one rowServicesWithText */
  readonly upsertRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Publish one rowServicesWithText */
  readonly publishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /**
   * Unpublish one rowServicesWithText from selected stages. Unpublish either the
   * complete document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Update many rowServicesWithTexts */
  readonly updateManyRowServicesWithTexts: GQLBatchPayload
  /** Delete many RowServicesWithText documents */
  readonly deleteManyRowServicesWithTexts: GQLBatchPayload
  /** Publish many RowServicesWithText documents */
  readonly publishManyRowServicesWithTexts: GQLBatchPayload
  /** Unpublish many RowServicesWithText documents */
  readonly unpublishManyRowServicesWithTexts: GQLBatchPayload
  /** Create one zzDeleteList */
  readonly createZzDeleteList?: Maybe<GQLZzDeleteList>
  /** Update one zzDeleteList */
  readonly updateZzDeleteList?: Maybe<GQLZzDeleteList>
  /** Delete one zzDeleteList from _all_ existing stages. Returns deleted document. */
  readonly deleteZzDeleteList?: Maybe<GQLZzDeleteList>
  /** Upsert one zzDeleteList */
  readonly upsertZzDeleteList?: Maybe<GQLZzDeleteList>
  /** Publish one zzDeleteList */
  readonly publishZzDeleteList?: Maybe<GQLZzDeleteList>
  /**
   * Unpublish one zzDeleteList from selected stages. Unpublish either the complete
   * document with its relations, localizations and base data or specific
   * localizations only.
   */
  readonly unpublishZzDeleteList?: Maybe<GQLZzDeleteList>
  /** Update many zzDeleteLists */
  readonly updateManyZzDeleteLists: GQLBatchPayload
  /** Delete many ZzDeleteList documents */
  readonly deleteManyZzDeleteLists: GQLBatchPayload
  /** Publish many ZzDeleteList documents */
  readonly publishManyZzDeleteLists: GQLBatchPayload
  /** Unpublish many ZzDeleteList documents */
  readonly unpublishManyZzDeleteLists: GQLBatchPayload
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishAssetArgs = {
  where: GQLAssetWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishMenuArgs = {
  where: GQLMenuWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishPageArgs = {
  where: GQLPageWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishPersonArgs = {
  where: GQLPersonWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
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
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  from?: ReadonlyArray<GQLStage>
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
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
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
  to?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationUnpublishManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  from?: ReadonlyArray<GQLStage>
  locales?: Maybe<ReadonlyArray<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

type GQLMutationCreateZzDeleteListArgs = {
  data: GQLZzDeleteListCreateInput
}

type GQLMutationUpdateZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  data: GQLZzDeleteListUpdateInput
}

type GQLMutationDeleteZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
}

type GQLMutationUpsertZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  upsert: GQLZzDeleteListUpsertInput
}

type GQLMutationPublishZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  from?: ReadonlyArray<GQLStage>
}

type GQLMutationUpdateManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  data: GQLZzDeleteListUpdateManyInput
}

type GQLMutationDeleteManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
}

type GQLMutationPublishManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  to?: ReadonlyArray<GQLStage>
}

type GQLMutationUnpublishManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  from?: ReadonlyArray<GQLStage>
}

/** An object with an ID */
type GQLNode = {
  /** The id of the object. */
  readonly id: Scalars['ID']
  /** The Stage of an object */
  readonly stage: GQLStage
}

type GQLPage = GQLNode & {
  readonly __typename?: 'Page'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLPage>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLPage>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly url: Scalars['String']
  /** Used in menu's, breadcrumbs, etc. */
  readonly title: Scalars['String']
  readonly metaTitle: Scalars['String']
  readonly metaDescription: Scalars['String']
  readonly content: ReadonlyArray<GQLPageContent>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  readonly list: ReadonlyArray<GQLZzDeleteList>
  readonly content2: ReadonlyArray<GQLPageContent2>
  readonly internalLink: ReadonlyArray<GQLLinkInternal>
  readonly menu: ReadonlyArray<GQLMenu>
}

type GQLPageLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLPageDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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

type GQLPageListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPageContent2Args = {
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
  readonly where: GQLPageWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPageConnection = {
  readonly __typename?: 'PageConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLPageEdge>
  readonly aggregate: GQLAggregate
}

type GQLPageContent = GQLRowHero

type GQLPageContent2 =
  | GQLRowColumnThree
  | GQLRowColumnTwo
  | GQLRowRecentBlogPost
  | GQLRowPeopleWithText
  | GQLRowColumnOne
  | GQLRowCompanySlider
  | GQLRowServicesWithText

type GQLPageContent2ConnectInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeConnectInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoConnectInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostConnectInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextConnectInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneConnectInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderConnectInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextConnectInput>
}

type GQLPageContent2CreateInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeCreateInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoCreateInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostCreateInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneCreateInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderCreateInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextCreateInput>
}

type GQLPageContent2CreateManyInlineInput = {
  /** Create and connect multiple existing PageContent2 documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageContent2CreateInput>>
  /** Connect multiple existing PageContent2 documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageContent2WhereUniqueInput>>
}

type GQLPageContent2CreateOneInlineInput = {
  /** Create and connect one PageContent2 document */
  readonly create?: Maybe<GQLPageContent2CreateInput>
  /** Connect one existing PageContent2 document */
  readonly connect?: Maybe<GQLPageContent2WhereUniqueInput>
}

type GQLPageContent2UpdateInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeUpdateInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneUpdateInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateInput>
}

type GQLPageContent2UpdateManyInlineInput = {
  /** Create and connect multiple PageContent2 documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageContent2CreateInput>>
  /** Connect multiple existing PageContent2 documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageContent2ConnectInput>>
  /** Override currently-connected documents with multiple existing PageContent2 documents */
  readonly set?: Maybe<ReadonlyArray<GQLPageContent2WhereUniqueInput>>
  /** Update multiple PageContent2 documents */
  readonly update?: Maybe<ReadonlyArray<GQLPageContent2UpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple PageContent2 documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLPageContent2UpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple PageContent2 documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLPageContent2WhereUniqueInput>>
  /** Delete multiple PageContent2 documents */
  readonly delete?: Maybe<ReadonlyArray<GQLPageContent2WhereUniqueInput>>
}

type GQLPageContent2UpdateManyWithNestedWhereInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeUpdateManyWithNestedWhereInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyWithNestedWhereInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateManyWithNestedWhereInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyWithNestedWhereInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneUpdateManyWithNestedWhereInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyWithNestedWhereInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyWithNestedWhereInput>
}

type GQLPageContent2UpdateOneInlineInput = {
  /** Create and connect one PageContent2 document */
  readonly create?: Maybe<GQLPageContent2CreateInput>
  /** Update single PageContent2 document */
  readonly update?: Maybe<GQLPageContent2UpdateWithNestedWhereUniqueInput>
  /** Upsert single PageContent2 document */
  readonly upsert?: Maybe<GQLPageContent2UpsertWithNestedWhereUniqueInput>
  /** Connect existing PageContent2 document */
  readonly connect?: Maybe<GQLPageContent2WhereUniqueInput>
  /** Disconnect currently connected PageContent2 document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected PageContent2 document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLPageContent2UpdateWithNestedWhereUniqueInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
}

type GQLPageContent2UpsertWithNestedWhereUniqueInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
}

type GQLPageContent2WhereInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeWhereInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoWhereInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneWhereInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderWhereInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereInput>
}

type GQLPageContent2WhereUniqueInput = {
  readonly RowColumnThree?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  readonly RowColumnTwo?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  readonly RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  readonly RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  readonly RowColumnOne?: Maybe<GQLRowColumnOneWhereUniqueInput>
  readonly RowCompanySlider?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  readonly RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
}

type GQLPageContentConnectInput = {
  readonly RowHero?: Maybe<GQLRowHeroConnectInput>
}

type GQLPageContentCreateInput = {
  readonly RowHero?: Maybe<GQLRowHeroCreateInput>
}

type GQLPageContentCreateManyInlineInput = {
  /** Create and connect multiple existing PageContent documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageContentCreateInput>>
  /** Connect multiple existing PageContent documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageContentWhereUniqueInput>>
}

type GQLPageContentCreateOneInlineInput = {
  /** Create and connect one PageContent document */
  readonly create?: Maybe<GQLPageContentCreateInput>
  /** Connect one existing PageContent document */
  readonly connect?: Maybe<GQLPageContentWhereUniqueInput>
}

type GQLPageContentUpdateInput = {
  readonly RowHero?: Maybe<GQLRowHeroUpdateInput>
}

type GQLPageContentUpdateManyInlineInput = {
  /** Create and connect multiple PageContent documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageContentCreateInput>>
  /** Connect multiple existing PageContent documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageContentConnectInput>>
  /** Override currently-connected documents with multiple existing PageContent documents */
  readonly set?: Maybe<ReadonlyArray<GQLPageContentWhereUniqueInput>>
  /** Update multiple PageContent documents */
  readonly update?: Maybe<ReadonlyArray<GQLPageContentUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple PageContent documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLPageContentUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple PageContent documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLPageContentWhereUniqueInput>>
  /** Delete multiple PageContent documents */
  readonly delete?: Maybe<ReadonlyArray<GQLPageContentWhereUniqueInput>>
}

type GQLPageContentUpdateManyWithNestedWhereInput = {
  readonly RowHero?: Maybe<GQLRowHeroUpdateManyWithNestedWhereInput>
}

type GQLPageContentUpdateOneInlineInput = {
  /** Create and connect one PageContent document */
  readonly create?: Maybe<GQLPageContentCreateInput>
  /** Update single PageContent document */
  readonly update?: Maybe<GQLPageContentUpdateWithNestedWhereUniqueInput>
  /** Upsert single PageContent document */
  readonly upsert?: Maybe<GQLPageContentUpsertWithNestedWhereUniqueInput>
  /** Connect existing PageContent document */
  readonly connect?: Maybe<GQLPageContentWhereUniqueInput>
  /** Disconnect currently connected PageContent document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected PageContent document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLPageContentUpdateWithNestedWhereUniqueInput = {
  readonly RowHero?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
}

type GQLPageContentUpsertWithNestedWhereUniqueInput = {
  readonly RowHero?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
}

type GQLPageContentWhereInput = {
  readonly RowHero?: Maybe<GQLRowHeroWhereInput>
}

type GQLPageContentWhereUniqueInput = {
  readonly RowHero?: Maybe<GQLRowHeroWhereUniqueInput>
}

type GQLPageCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** url input for default locale (nl) */
  readonly url: Scalars['String']
  /** title input for default locale (nl) */
  readonly title: Scalars['String']
  /** metaTitle input for default locale (nl) */
  readonly metaTitle: Scalars['String']
  /** metaDescription input for default locale (nl) */
  readonly metaDescription: Scalars['String']
  readonly content?: Maybe<GQLPageContentCreateManyInlineInput>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  readonly list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  readonly content2?: Maybe<GQLPageContent2CreateManyInlineInput>
  readonly internalLink?: Maybe<GQLLinkInternalCreateManyInlineInput>
  readonly menu?: Maybe<GQLMenuCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLPageCreateLocalizationsInput>
}

type GQLPageCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly url: Scalars['String']
  readonly title: Scalars['String']
  readonly metaTitle: Scalars['String']
  readonly metaDescription: Scalars['String']
}

type GQLPageCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLPageCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLPageCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLPageCreateLocalizationInput>>
}

type GQLPageCreateManyInlineInput = {
  /** Create and connect multiple existing Page documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageCreateInput>>
  /** Connect multiple existing Page documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageWhereUniqueInput>>
}

type GQLPageCreateOneInlineInput = {
  /** Create and connect one Page document */
  readonly create?: Maybe<GQLPageCreateInput>
  /** Connect one existing Page document */
  readonly connect?: Maybe<GQLPageWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPageEdge = {
  readonly __typename?: 'PageEdge'
  /** The item at the end of the edge. */
  readonly node: GQLPage
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Information about pagination in a connection. */
type GQLPageInfo = {
  readonly __typename?: 'PageInfo'
  /** When paginating forwards, are there more items? */
  readonly hasNextPage: Scalars['Boolean']
  /** When paginating backwards, are there more items? */
  readonly hasPreviousPage: Scalars['Boolean']
  /** When paginating backwards, the cursor to continue. */
  readonly startCursor?: Maybe<Scalars['String']>
  /** When paginating forwards, the cursor to continue. */
  readonly endCursor?: Maybe<Scalars['String']>
}

/** Identifies documents */
type GQLPageManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  /** All values that are not equal to given value. */
  readonly metaRobots_not?: Maybe<GQLMetaRobots>
  /** All values that are contained in given list. */
  readonly metaRobots_in?: Maybe<ReadonlyArray<GQLMetaRobots>>
  /** All values that are not contained in given list. */
  readonly metaRobots_not_in?: Maybe<ReadonlyArray<GQLMetaRobots>>
  readonly internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  readonly internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  readonly internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  readonly menu_every?: Maybe<GQLMenuWhereInput>
  readonly menu_some?: Maybe<GQLMenuWhereInput>
  readonly menu_none?: Maybe<GQLMenuWhereInput>
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

type GQLPageUpdateInput = {
  /** url input for default locale (nl) */
  readonly url?: Maybe<Scalars['String']>
  /** title input for default locale (nl) */
  readonly title?: Maybe<Scalars['String']>
  /** metaTitle input for default locale (nl) */
  readonly metaTitle?: Maybe<Scalars['String']>
  /** metaDescription input for default locale (nl) */
  readonly metaDescription?: Maybe<Scalars['String']>
  readonly content?: Maybe<GQLPageContentUpdateManyInlineInput>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  readonly list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  readonly content2?: Maybe<GQLPageContent2UpdateManyInlineInput>
  readonly internalLink?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  readonly menu?: Maybe<GQLMenuUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLPageUpdateLocalizationsInput>
}

type GQLPageUpdateLocalizationDataInput = {
  readonly url: Scalars['String']
  readonly title: Scalars['String']
  readonly metaTitle: Scalars['String']
  readonly metaDescription: Scalars['String']
}

type GQLPageUpdateLocalizationInput = {
  readonly data: GQLPageUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLPageUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLPageCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLPageUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLPageUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLPageUpdateManyInlineInput = {
  /** Create and connect multiple Page documents */
  readonly create?: Maybe<ReadonlyArray<GQLPageCreateInput>>
  /** Connect multiple existing Page documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPageConnectInput>>
  /** Override currently-connected documents with multiple existing Page documents */
  readonly set?: Maybe<ReadonlyArray<GQLPageWhereUniqueInput>>
  /** Update multiple Page documents */
  readonly update?: Maybe<ReadonlyArray<GQLPageUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Page documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLPageUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Page documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLPageWhereUniqueInput>>
  /** Delete multiple Page documents */
  readonly delete?: Maybe<ReadonlyArray<GQLPageWhereUniqueInput>>
}

type GQLPageUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLPageUpdateManyLocalizationInput>>
}

type GQLPageUpdateManyLocalizationInput = {
  readonly title: Scalars['String']
  readonly metaTitle: Scalars['String']
  readonly metaDescription: Scalars['String']
}

type GQLPageUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLPageWhereInput
  /** Update many input */
  readonly data: GQLPageUpdateManyInput
}

type GQLPageUpdateOneInlineInput = {
  /** Create and connect one Page document */
  readonly create?: Maybe<GQLPageCreateInput>
  /** Update single Page document */
  readonly update?: Maybe<GQLPageUpdateWithNestedWhereUniqueInput>
  /** Upsert single Page document */
  readonly upsert?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  /** Connect existing Page document */
  readonly connect?: Maybe<GQLPageWhereUniqueInput>
  /** Disconnect currently connected Page document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Page document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLPageUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPageWhereUniqueInput
  /** Document to update */
  readonly data: GQLPageUpdateInput
}

type GQLPageUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLPageCreateInput
  /** Update document if it exists */
  readonly update: GQLPageUpdateInput
}

type GQLPageUpsertLocalizationInput = {
  readonly update: GQLPageUpdateLocalizationDataInput
  readonly create: GQLPageCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLPageUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPageWhereUniqueInput
  /** Upsert data */
  readonly data: GQLPageUpsertInput
}

/** Identifies documents */
type GQLPageWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPageWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly url?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly url_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly url_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly url_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly url_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly url_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly url_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly url_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly url_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly url_not_ends_with?: Maybe<Scalars['String']>
  readonly title?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly title_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly title_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly title_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly title_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly title_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly title_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly title_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly title_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly title_not_ends_with?: Maybe<Scalars['String']>
  readonly metaTitle?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly metaTitle_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly metaTitle_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly metaTitle_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly metaTitle_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly metaTitle_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly metaTitle_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly metaTitle_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly metaTitle_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly metaTitle_not_ends_with?: Maybe<Scalars['String']>
  readonly metaDescription?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly metaDescription_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly metaDescription_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly metaDescription_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly metaDescription_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly metaDescription_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly metaDescription_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly metaDescription_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly metaDescription_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly metaDescription_not_ends_with?: Maybe<Scalars['String']>
  readonly metaRobots?: Maybe<GQLMetaRobots>
  /** All values that are not equal to given value. */
  readonly metaRobots_not?: Maybe<GQLMetaRobots>
  /** All values that are contained in given list. */
  readonly metaRobots_in?: Maybe<ReadonlyArray<GQLMetaRobots>>
  /** All values that are not contained in given list. */
  readonly metaRobots_not_in?: Maybe<ReadonlyArray<GQLMetaRobots>>
  readonly internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  readonly internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  readonly internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  readonly menu_every?: Maybe<GQLMenuWhereInput>
  readonly menu_some?: Maybe<GQLMenuWhereInput>
  readonly menu_none?: Maybe<GQLMenuWhereInput>
}

/** References Page record uniquely */
type GQLPageWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
}

type GQLPerson = GQLNode & {
  readonly __typename?: 'Person'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLPerson>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly avatar: GQLAsset
  readonly name: Scalars['String']
  readonly personList: ReadonlyArray<GQLPersonList>
  readonly list: ReadonlyArray<GQLZzDeleteList>
}

type GQLPersonDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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

type GQLPersonListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLPersonConnectInput = {
  /** Document to connect */
  readonly where: GQLPersonWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPersonConnection = {
  readonly __typename?: 'PersonConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLPersonEdge>
  readonly aggregate: GQLAggregate
}

type GQLPersonCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly avatar: GQLAssetCreateOneInlineInput
  readonly name: Scalars['String']
  readonly personList?: Maybe<GQLPersonListCreateManyInlineInput>
  readonly list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
}

type GQLPersonCreateManyInlineInput = {
  /** Create and connect multiple existing Person documents */
  readonly create?: Maybe<ReadonlyArray<GQLPersonCreateInput>>
  /** Connect multiple existing Person documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPersonWhereUniqueInput>>
}

type GQLPersonCreateOneInlineInput = {
  /** Create and connect one Person document */
  readonly create?: Maybe<GQLPersonCreateInput>
  /** Connect one existing Person document */
  readonly connect?: Maybe<GQLPersonWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPersonEdge = {
  readonly __typename?: 'PersonEdge'
  /** The item at the end of the edge. */
  readonly node: GQLPerson
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

type GQLPersonList = GQLNode & {
  readonly __typename?: 'PersonList'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLPersonList>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly people: ReadonlyArray<GQLPerson>
  readonly rowPeopleWithText: ReadonlyArray<GQLRowPeopleWithText>
}

type GQLPersonListDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLPersonListWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLPersonListConnection = {
  readonly __typename?: 'PersonListConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLPersonListEdge>
  readonly aggregate: GQLAggregate
}

type GQLPersonListCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly people?: Maybe<GQLPersonCreateManyInlineInput>
  readonly rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
}

type GQLPersonListCreateManyInlineInput = {
  /** Create and connect multiple existing PersonList documents */
  readonly create?: Maybe<ReadonlyArray<GQLPersonListCreateInput>>
  /** Connect multiple existing PersonList documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPersonListWhereUniqueInput>>
}

type GQLPersonListCreateOneInlineInput = {
  /** Create and connect one PersonList document */
  readonly create?: Maybe<GQLPersonListCreateInput>
  /** Connect one existing PersonList document */
  readonly connect?: Maybe<GQLPersonListWhereUniqueInput>
}

/** An edge in a connection. */
type GQLPersonListEdge = {
  readonly __typename?: 'PersonListEdge'
  /** The item at the end of the edge. */
  readonly node: GQLPersonList
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLPersonListManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly people_every?: Maybe<GQLPersonWhereInput>
  readonly people_some?: Maybe<GQLPersonWhereInput>
  readonly people_none?: Maybe<GQLPersonWhereInput>
  readonly rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  readonly people?: Maybe<GQLPersonUpdateManyInlineInput>
  readonly rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
}

type GQLPersonListUpdateManyInlineInput = {
  /** Create and connect multiple PersonList documents */
  readonly create?: Maybe<ReadonlyArray<GQLPersonListCreateInput>>
  /** Connect multiple existing PersonList documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPersonListConnectInput>>
  /** Override currently-connected documents with multiple existing PersonList documents */
  readonly set?: Maybe<ReadonlyArray<GQLPersonListWhereUniqueInput>>
  /** Update multiple PersonList documents */
  readonly update?: Maybe<ReadonlyArray<GQLPersonListUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple PersonList documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLPersonListUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple PersonList documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLPersonListWhereUniqueInput>>
  /** Delete multiple PersonList documents */
  readonly delete?: Maybe<ReadonlyArray<GQLPersonListWhereUniqueInput>>
}

type GQLPersonListUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLPersonListUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLPersonListWhereInput
  /** Update many input */
  readonly data: GQLPersonListUpdateManyInput
}

type GQLPersonListUpdateOneInlineInput = {
  /** Create and connect one PersonList document */
  readonly create?: Maybe<GQLPersonListCreateInput>
  /** Update single PersonList document */
  readonly update?: Maybe<GQLPersonListUpdateWithNestedWhereUniqueInput>
  /** Upsert single PersonList document */
  readonly upsert?: Maybe<GQLPersonListUpsertWithNestedWhereUniqueInput>
  /** Connect existing PersonList document */
  readonly connect?: Maybe<GQLPersonListWhereUniqueInput>
  /** Disconnect currently connected PersonList document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected PersonList document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLPersonListUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPersonListWhereUniqueInput
  /** Document to update */
  readonly data: GQLPersonListUpdateInput
}

type GQLPersonListUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLPersonListCreateInput
  /** Update document if it exists */
  readonly update: GQLPersonListUpdateInput
}

type GQLPersonListUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPersonListWhereUniqueInput
  /** Upsert data */
  readonly data: GQLPersonListUpsertInput
}

/** Identifies documents */
type GQLPersonListWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPersonListWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly people_every?: Maybe<GQLPersonWhereInput>
  readonly people_some?: Maybe<GQLPersonWhereInput>
  readonly people_none?: Maybe<GQLPersonWhereInput>
  readonly rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  readonly rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
}

/** References PersonList record uniquely */
type GQLPersonListWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

/** Identifies documents */
type GQLPersonManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly avatar?: Maybe<GQLAssetWhereInput>
  readonly name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly name_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly name_not_ends_with?: Maybe<Scalars['String']>
  readonly personList_every?: Maybe<GQLPersonListWhereInput>
  readonly personList_some?: Maybe<GQLPersonListWhereInput>
  readonly personList_none?: Maybe<GQLPersonListWhereInput>
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
  readonly avatar?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly name?: Maybe<Scalars['String']>
  readonly personList?: Maybe<GQLPersonListUpdateManyInlineInput>
  readonly list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
}

type GQLPersonUpdateManyInlineInput = {
  /** Create and connect multiple Person documents */
  readonly create?: Maybe<ReadonlyArray<GQLPersonCreateInput>>
  /** Connect multiple existing Person documents */
  readonly connect?: Maybe<ReadonlyArray<GQLPersonConnectInput>>
  /** Override currently-connected documents with multiple existing Person documents */
  readonly set?: Maybe<ReadonlyArray<GQLPersonWhereUniqueInput>>
  /** Update multiple Person documents */
  readonly update?: Maybe<ReadonlyArray<GQLPersonUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple Person documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLPersonUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple Person documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLPersonWhereUniqueInput>>
  /** Delete multiple Person documents */
  readonly delete?: Maybe<ReadonlyArray<GQLPersonWhereUniqueInput>>
}

type GQLPersonUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly name: Scalars['String']
}

type GQLPersonUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLPersonWhereInput
  /** Update many input */
  readonly data: GQLPersonUpdateManyInput
}

type GQLPersonUpdateOneInlineInput = {
  /** Create and connect one Person document */
  readonly create?: Maybe<GQLPersonCreateInput>
  /** Update single Person document */
  readonly update?: Maybe<GQLPersonUpdateWithNestedWhereUniqueInput>
  /** Upsert single Person document */
  readonly upsert?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  /** Connect existing Person document */
  readonly connect?: Maybe<GQLPersonWhereUniqueInput>
  /** Disconnect currently connected Person document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected Person document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLPersonUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPersonWhereUniqueInput
  /** Document to update */
  readonly data: GQLPersonUpdateInput
}

type GQLPersonUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLPersonCreateInput
  /** Update document if it exists */
  readonly update: GQLPersonUpdateInput
}

type GQLPersonUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLPersonWhereUniqueInput
  /** Upsert data */
  readonly data: GQLPersonUpsertInput
}

/** Identifies documents */
type GQLPersonWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLPersonWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly avatar?: Maybe<GQLAssetWhereInput>
  readonly name?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly name_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly name_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly name_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly name_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly name_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly name_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly name_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly name_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly name_not_ends_with?: Maybe<Scalars['String']>
  readonly personList_every?: Maybe<GQLPersonListWhereInput>
  readonly personList_some?: Maybe<GQLPersonListWhereInput>
  readonly personList_none?: Maybe<GQLPersonListWhereInput>
}

/** References Person record uniquely */
type GQLPersonWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
}

type GQLPublishLocaleInput = {
  /** Locales to publish */
  readonly locale: GQLLocale
  /** Stages to publish selected locales to */
  readonly stages: ReadonlyArray<GQLStage>
}

type GQLQuery = {
  readonly __typename?: 'Query'
  /** Fetches an object given its ID */
  readonly node?: Maybe<GQLNode>
  /** Retrieve multiple assets */
  readonly assets: ReadonlyArray<GQLAsset>
  /** Retrieve a single asset */
  readonly asset?: Maybe<GQLAsset>
  /** Retrieve multiple assets using the Relay connection interface */
  readonly assetsConnection: GQLAssetConnection
  /** Retrieve multiple companies */
  readonly companies: ReadonlyArray<GQLCompany>
  /** Retrieve a single company */
  readonly company?: Maybe<GQLCompany>
  /** Retrieve multiple companies using the Relay connection interface */
  readonly companiesConnection: GQLCompanyConnection
  /** Retrieve multiple linkExternals */
  readonly linkExternals: ReadonlyArray<GQLLinkExternal>
  /** Retrieve a single linkExternal */
  readonly linkExternal?: Maybe<GQLLinkExternal>
  /** Retrieve multiple linkExternals using the Relay connection interface */
  readonly linkExternalsConnection: GQLLinkExternalConnection
  /** Retrieve multiple linkInternals */
  readonly linkInternals: ReadonlyArray<GQLLinkInternal>
  /** Retrieve a single linkInternal */
  readonly linkInternal?: Maybe<GQLLinkInternal>
  /** Retrieve multiple linkInternals using the Relay connection interface */
  readonly linkInternalsConnection: GQLLinkInternalConnection
  /** Retrieve multiple menus */
  readonly menus: ReadonlyArray<GQLMenu>
  /** Retrieve a single menu */
  readonly menu?: Maybe<GQLMenu>
  /** Retrieve multiple menus using the Relay connection interface */
  readonly menusConnection: GQLMenuConnection
  /** Retrieve multiple pages */
  readonly pages: ReadonlyArray<GQLPage>
  /** Retrieve a single page */
  readonly page?: Maybe<GQLPage>
  /** Retrieve multiple pages using the Relay connection interface */
  readonly pagesConnection: GQLPageConnection
  /** Retrieve multiple people */
  readonly people: ReadonlyArray<GQLPerson>
  /** Retrieve a single person */
  readonly person?: Maybe<GQLPerson>
  /** Retrieve multiple people using the Relay connection interface */
  readonly peopleConnection: GQLPersonConnection
  /** Retrieve multiple personLists */
  readonly personLists: ReadonlyArray<GQLPersonList>
  /** Retrieve a single personList */
  readonly personList?: Maybe<GQLPersonList>
  /** Retrieve multiple personLists using the Relay connection interface */
  readonly personListsConnection: GQLPersonListConnection
  /** Retrieve multiple rowColumnOnes */
  readonly rowColumnOnes: ReadonlyArray<GQLRowColumnOne>
  /** Retrieve a single rowColumnOne */
  readonly rowColumnOne?: Maybe<GQLRowColumnOne>
  /** Retrieve multiple rowColumnOnes using the Relay connection interface */
  readonly rowColumnOnesConnection: GQLRowColumnOneConnection
  /** Retrieve multiple rowColumnThrees */
  readonly rowColumnThrees: ReadonlyArray<GQLRowColumnThree>
  /** Retrieve a single rowColumnThree */
  readonly rowColumnThree?: Maybe<GQLRowColumnThree>
  /** Retrieve multiple rowColumnThrees using the Relay connection interface */
  readonly rowColumnThreesConnection: GQLRowColumnThreeConnection
  /** Retrieve multiple rowColumnTwos */
  readonly rowColumnTwos: ReadonlyArray<GQLRowColumnTwo>
  /** Retrieve a single rowColumnTwo */
  readonly rowColumnTwo?: Maybe<GQLRowColumnTwo>
  /** Retrieve multiple rowColumnTwos using the Relay connection interface */
  readonly rowColumnTwosConnection: GQLRowColumnTwoConnection
  /** Retrieve multiple rowCompanySliders */
  readonly rowCompanySliders: ReadonlyArray<GQLRowCompanySlider>
  /** Retrieve a single rowCompanySlider */
  readonly rowCompanySlider?: Maybe<GQLRowCompanySlider>
  /** Retrieve multiple rowCompanySliders using the Relay connection interface */
  readonly rowCompanySlidersConnection: GQLRowCompanySliderConnection
  /** Retrieve multiple rowHeroes */
  readonly rowHeroes: ReadonlyArray<GQLRowHero>
  /** Retrieve a single rowHero */
  readonly rowHero?: Maybe<GQLRowHero>
  /** Retrieve multiple rowHeroes using the Relay connection interface */
  readonly rowHeroesConnection: GQLRowHeroConnection
  /** Retrieve multiple rowPeopleWithTexts */
  readonly rowPeopleWithTexts: ReadonlyArray<GQLRowPeopleWithText>
  /** Retrieve a single rowPeopleWithText */
  readonly rowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  /** Retrieve multiple rowPeopleWithTexts using the Relay connection interface */
  readonly rowPeopleWithTextsConnection: GQLRowPeopleWithTextConnection
  /** Retrieve multiple rowRecentBlogPosts */
  readonly rowRecentBlogPosts: ReadonlyArray<GQLRowRecentBlogPost>
  /** Retrieve a single rowRecentBlogPost */
  readonly rowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  /** Retrieve multiple rowRecentBlogPosts using the Relay connection interface */
  readonly rowRecentBlogPostsConnection: GQLRowRecentBlogPostConnection
  /** Retrieve multiple rowServicesWithTexts */
  readonly rowServicesWithTexts: ReadonlyArray<GQLRowServicesWithText>
  /** Retrieve a single rowServicesWithText */
  readonly rowServicesWithText?: Maybe<GQLRowServicesWithText>
  /** Retrieve multiple rowServicesWithTexts using the Relay connection interface */
  readonly rowServicesWithTextsConnection: GQLRowServicesWithTextConnection
  /** Retrieve multiple zzDeleteLists */
  readonly zzDeleteLists: ReadonlyArray<GQLZzDeleteList>
  /** Retrieve a single zzDeleteList */
  readonly zzDeleteList?: Maybe<GQLZzDeleteList>
  /** Retrieve multiple zzDeleteLists using the Relay connection interface */
  readonly zzDeleteListsConnection: GQLZzDeleteListConnection
}

type GQLQueryNodeArgs = {
  id: Scalars['ID']
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryAssetArgs = {
  where: GQLAssetWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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

type GQLQueryLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalWhereInput>
  orderBy?: Maybe<GQLLinkExternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryPageArgs = {
  where: GQLPageWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: ReadonlyArray<GQLLocale>
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
  locales?: ReadonlyArray<GQLLocale>
}

type GQLQueryZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListWhereInput>
  orderBy?: Maybe<GQLZzDeleteListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

type GQLQueryZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  stage?: GQLStage
}

type GQLQueryZzDeleteListsConnectionArgs = {
  where?: Maybe<GQLZzDeleteListWhereInput>
  orderBy?: Maybe<GQLZzDeleteListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
type GQLRgba = {
  readonly __typename?: 'RGBA'
  readonly r: Scalars['RGBAHue']
  readonly g: Scalars['RGBAHue']
  readonly b: Scalars['RGBAHue']
  readonly a: Scalars['RGBATransparency']
}

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
type GQLRgbaInput = {
  readonly r: Scalars['RGBAHue']
  readonly g: Scalars['RGBAHue']
  readonly b: Scalars['RGBAHue']
  readonly a: Scalars['RGBATransparency']
}

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
type GQLRichText = {
  readonly __typename?: 'RichText'
  /** Returns AST representation */
  readonly raw: Scalars['RichTextAST']
  /** Returns HTMl representation */
  readonly html: Scalars['String']
  /** Returns Markdown representation */
  readonly markdown: Scalars['String']
  /** Returns plain-text contents of RichText */
  readonly text: Scalars['String']
}

/** Single text area, flowing over two columns (CSS Columns) */
type GQLRowColumnOne = GQLNode & {
  readonly __typename?: 'RowColumnOne'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowColumnOne>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly colOne?: Maybe<GQLRichText>
  readonly colOneIcon?: Maybe<GQLAsset>
  readonly page: ReadonlyArray<GQLPage>
}

/** Single text area, flowing over two columns (CSS Columns) */
type GQLRowColumnOneDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowColumnOneWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnOneConnection = {
  readonly __typename?: 'RowColumnOneConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowColumnOneEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowColumnOneCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly colOne?: Maybe<Scalars['RichTextAST']>
  readonly colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowColumnOneCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnOne documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnOneCreateInput>>
  /** Connect multiple existing RowColumnOne documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnOneWhereUniqueInput>>
}

type GQLRowColumnOneCreateOneInlineInput = {
  /** Create and connect one RowColumnOne document */
  readonly create?: Maybe<GQLRowColumnOneCreateInput>
  /** Connect one existing RowColumnOne document */
  readonly connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnOneEdge = {
  readonly __typename?: 'RowColumnOneEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowColumnOne
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnOneManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  readonly colOne?: Maybe<Scalars['RichTextAST']>
  readonly colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowColumnOneUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnOne documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnOneCreateInput>>
  /** Connect multiple existing RowColumnOne documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnOneConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnOne documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowColumnOneWhereUniqueInput>>
  /** Update multiple RowColumnOne documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnOne documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnOne documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowColumnOneWhereUniqueInput>>
  /** Delete multiple RowColumnOne documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowColumnOneWhereUniqueInput>>
}

type GQLRowColumnOneUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly colOne?: Maybe<Scalars['RichTextAST']>
}

type GQLRowColumnOneUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowColumnOneWhereInput
  /** Update many input */
  readonly data: GQLRowColumnOneUpdateManyInput
}

type GQLRowColumnOneUpdateOneInlineInput = {
  /** Create and connect one RowColumnOne document */
  readonly create?: Maybe<GQLRowColumnOneCreateInput>
  /** Update single RowColumnOne document */
  readonly update?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnOne document */
  readonly upsert?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnOne document */
  readonly connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
  /** Disconnect currently connected RowColumnOne document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnOne document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnOneUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnOneWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowColumnOneUpdateInput
}

type GQLRowColumnOneUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowColumnOneCreateInput
  /** Update document if it exists */
  readonly update: GQLRowColumnOneUpdateInput
}

type GQLRowColumnOneUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnOneWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowColumnOneUpsertInput
}

/** Identifies documents */
type GQLRowColumnOneWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnOneWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnOne record uniquely */
type GQLRowColumnOneWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowColumnThree = GQLNode & {
  readonly __typename?: 'RowColumnThree'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLRowColumnThree>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowColumnThree>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly colOne: GQLRichText
  readonly colOneIcon?: Maybe<GQLAsset>
  readonly colTwo: GQLRichText
  readonly colTwoIcon?: Maybe<GQLAsset>
  readonly colThree: GQLRichText
  readonly colThreeIcon?: Maybe<GQLAsset>
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowColumnThreeLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowColumnThreeDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowColumnThreeWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnThreeConnection = {
  readonly __typename?: 'RowColumnThreeConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowColumnThreeEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowColumnThreeCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  /** colOne input for default locale (nl) */
  readonly colOne: Scalars['RichTextAST']
  readonly colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  /** colTwo input for default locale (nl) */
  readonly colTwo: Scalars['RichTextAST']
  readonly colTwoIcon?: Maybe<GQLAssetCreateOneInlineInput>
  /** colThree input for default locale (nl) */
  readonly colThree: Scalars['RichTextAST']
  readonly colThreeIcon?: Maybe<GQLAssetCreateOneInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLRowColumnThreeCreateLocalizationsInput>
}

type GQLRowColumnThreeCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
  readonly colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLRowColumnThreeCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnThreeCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnThreeCreateLocalizationInput>>
}

type GQLRowColumnThreeCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnThree documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnThreeCreateInput>>
  /** Connect multiple existing RowColumnThree documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereUniqueInput>>
}

type GQLRowColumnThreeCreateOneInlineInput = {
  /** Create and connect one RowColumnThree document */
  readonly create?: Maybe<GQLRowColumnThreeCreateInput>
  /** Connect one existing RowColumnThree document */
  readonly connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnThreeEdge = {
  readonly __typename?: 'RowColumnThreeEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowColumnThree
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnThreeManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
  readonly colTwoIcon?: Maybe<GQLAssetWhereInput>
  readonly colThreeIcon?: Maybe<GQLAssetWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  /** colOne input for default locale (nl) */
  readonly colOne?: Maybe<Scalars['RichTextAST']>
  readonly colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colTwo input for default locale (nl) */
  readonly colTwo?: Maybe<Scalars['RichTextAST']>
  readonly colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colThree input for default locale (nl) */
  readonly colThree?: Maybe<Scalars['RichTextAST']>
  readonly colThreeIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLRowColumnThreeUpdateLocalizationsInput>
}

type GQLRowColumnThreeUpdateLocalizationDataInput = {
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
  readonly colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeUpdateLocalizationInput = {
  readonly data: GQLRowColumnThreeUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnThreeUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnThreeCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLRowColumnThreeUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLRowColumnThreeUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLRowColumnThreeUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnThree documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnThreeCreateInput>>
  /** Connect multiple existing RowColumnThree documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnThreeConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnThree documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereUniqueInput>>
  /** Update multiple RowColumnThree documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnThree documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnThree documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereUniqueInput>>
  /** Delete multiple RowColumnThree documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereUniqueInput>>
}

type GQLRowColumnThreeUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLRowColumnThreeUpdateManyLocalizationInput>>
}

type GQLRowColumnThreeUpdateManyLocalizationInput = {
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
  readonly colThree: Scalars['RichTextAST']
}

type GQLRowColumnThreeUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowColumnThreeWhereInput
  /** Update many input */
  readonly data: GQLRowColumnThreeUpdateManyInput
}

type GQLRowColumnThreeUpdateOneInlineInput = {
  /** Create and connect one RowColumnThree document */
  readonly create?: Maybe<GQLRowColumnThreeCreateInput>
  /** Update single RowColumnThree document */
  readonly update?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnThree document */
  readonly upsert?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnThree document */
  readonly connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  /** Disconnect currently connected RowColumnThree document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnThree document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnThreeUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnThreeWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowColumnThreeUpdateInput
}

type GQLRowColumnThreeUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowColumnThreeCreateInput
  /** Update document if it exists */
  readonly update: GQLRowColumnThreeUpdateInput
}

type GQLRowColumnThreeUpsertLocalizationInput = {
  readonly update: GQLRowColumnThreeUpdateLocalizationDataInput
  readonly create: GQLRowColumnThreeCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnThreeUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnThreeWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowColumnThreeUpsertInput
}

/** Identifies documents */
type GQLRowColumnThreeWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnThreeWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
  readonly colTwoIcon?: Maybe<GQLAssetWhereInput>
  readonly colThreeIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnThree record uniquely */
type GQLRowColumnThreeWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowColumnTwo = GQLNode & {
  readonly __typename?: 'RowColumnTwo'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLRowColumnTwo>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowColumnTwo>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly colOne: GQLRichText
  readonly colOneIcon: GQLAsset
  readonly colTwo: GQLRichText
  readonly colTwoIcon: GQLAsset
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowColumnTwoLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowColumnTwoDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowColumnTwoWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowColumnTwoConnection = {
  readonly __typename?: 'RowColumnTwoConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowColumnTwoEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowColumnTwoCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  /** colOne input for default locale (nl) */
  readonly colOne: Scalars['RichTextAST']
  readonly colOneIcon: GQLAssetCreateOneInlineInput
  /** colTwo input for default locale (nl) */
  readonly colTwo: Scalars['RichTextAST']
  readonly colTwoIcon: GQLAssetCreateOneInlineInput
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLRowColumnTwoCreateLocalizationsInput>
}

type GQLRowColumnTwoCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLRowColumnTwoCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnTwoCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnTwoCreateLocalizationInput>>
}

type GQLRowColumnTwoCreateManyInlineInput = {
  /** Create and connect multiple existing RowColumnTwo documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnTwoCreateInput>>
  /** Connect multiple existing RowColumnTwo documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereUniqueInput>>
}

type GQLRowColumnTwoCreateOneInlineInput = {
  /** Create and connect one RowColumnTwo document */
  readonly create?: Maybe<GQLRowColumnTwoCreateInput>
  /** Connect one existing RowColumnTwo document */
  readonly connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowColumnTwoEdge = {
  readonly __typename?: 'RowColumnTwoEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowColumnTwo
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowColumnTwoManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
  readonly colTwoIcon?: Maybe<GQLAssetWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  /** colOne input for default locale (nl) */
  readonly colOne?: Maybe<Scalars['RichTextAST']>
  readonly colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  /** colTwo input for default locale (nl) */
  readonly colTwo?: Maybe<Scalars['RichTextAST']>
  readonly colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLRowColumnTwoUpdateLocalizationsInput>
}

type GQLRowColumnTwoUpdateLocalizationDataInput = {
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoUpdateLocalizationInput = {
  readonly data: GQLRowColumnTwoUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnTwoUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnTwoCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLRowColumnTwoUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLRowColumnTwoUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLRowColumnTwoUpdateManyInlineInput = {
  /** Create and connect multiple RowColumnTwo documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowColumnTwoCreateInput>>
  /** Connect multiple existing RowColumnTwo documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowColumnTwoConnectInput>>
  /** Override currently-connected documents with multiple existing RowColumnTwo documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereUniqueInput>>
  /** Update multiple RowColumnTwo documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowColumnTwo documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowColumnTwo documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereUniqueInput>>
  /** Delete multiple RowColumnTwo documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereUniqueInput>>
}

type GQLRowColumnTwoUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLRowColumnTwoUpdateManyLocalizationInput>>
}

type GQLRowColumnTwoUpdateManyLocalizationInput = {
  readonly colOne: Scalars['RichTextAST']
  readonly colTwo: Scalars['RichTextAST']
}

type GQLRowColumnTwoUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowColumnTwoWhereInput
  /** Update many input */
  readonly data: GQLRowColumnTwoUpdateManyInput
}

type GQLRowColumnTwoUpdateOneInlineInput = {
  /** Create and connect one RowColumnTwo document */
  readonly create?: Maybe<GQLRowColumnTwoCreateInput>
  /** Update single RowColumnTwo document */
  readonly update?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowColumnTwo document */
  readonly upsert?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowColumnTwo document */
  readonly connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  /** Disconnect currently connected RowColumnTwo document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowColumnTwo document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowColumnTwoUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnTwoWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowColumnTwoUpdateInput
}

type GQLRowColumnTwoUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowColumnTwoCreateInput
  /** Update document if it exists */
  readonly update: GQLRowColumnTwoUpdateInput
}

type GQLRowColumnTwoUpsertLocalizationInput = {
  readonly update: GQLRowColumnTwoUpdateLocalizationDataInput
  readonly create: GQLRowColumnTwoCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowColumnTwoUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowColumnTwoWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowColumnTwoUpsertInput
}

/** Identifies documents */
type GQLRowColumnTwoWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowColumnTwoWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly colOneIcon?: Maybe<GQLAssetWhereInput>
  readonly colTwoIcon?: Maybe<GQLAssetWhereInput>
}

/** References RowColumnTwo record uniquely */
type GQLRowColumnTwoWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowCompanySlider = GQLNode & {
  readonly __typename?: 'RowCompanySlider'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowCompanySlider>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly companies: ReadonlyArray<GQLCompany>
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowCompanySliderDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowCompanySliderWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowCompanySliderConnection = {
  readonly __typename?: 'RowCompanySliderConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowCompanySliderEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowCompanySliderCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly companies?: Maybe<GQLCompanyCreateManyInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowCompanySliderCreateManyInlineInput = {
  /** Create and connect multiple existing RowCompanySlider documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowCompanySliderCreateInput>>
  /** Connect multiple existing RowCompanySlider documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereUniqueInput>>
}

type GQLRowCompanySliderCreateOneInlineInput = {
  /** Create and connect one RowCompanySlider document */
  readonly create?: Maybe<GQLRowCompanySliderCreateInput>
  /** Connect one existing RowCompanySlider document */
  readonly connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowCompanySliderEdge = {
  readonly __typename?: 'RowCompanySliderEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowCompanySlider
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowCompanySliderManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly companies_every?: Maybe<GQLCompanyWhereInput>
  readonly companies_some?: Maybe<GQLCompanyWhereInput>
  readonly companies_none?: Maybe<GQLCompanyWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  readonly companies?: Maybe<GQLCompanyUpdateManyInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowCompanySliderUpdateManyInlineInput = {
  /** Create and connect multiple RowCompanySlider documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowCompanySliderCreateInput>>
  /** Connect multiple existing RowCompanySlider documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowCompanySliderConnectInput>>
  /** Override currently-connected documents with multiple existing RowCompanySlider documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereUniqueInput>>
  /** Update multiple RowCompanySlider documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowCompanySlider documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowCompanySlider documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereUniqueInput>>
  /** Delete multiple RowCompanySlider documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereUniqueInput>>
}

type GQLRowCompanySliderUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLRowCompanySliderUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowCompanySliderWhereInput
  /** Update many input */
  readonly data: GQLRowCompanySliderUpdateManyInput
}

type GQLRowCompanySliderUpdateOneInlineInput = {
  /** Create and connect one RowCompanySlider document */
  readonly create?: Maybe<GQLRowCompanySliderCreateInput>
  /** Update single RowCompanySlider document */
  readonly update?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowCompanySlider document */
  readonly upsert?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowCompanySlider document */
  readonly connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  /** Disconnect currently connected RowCompanySlider document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowCompanySlider document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowCompanySliderUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowCompanySliderWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowCompanySliderUpdateInput
}

type GQLRowCompanySliderUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowCompanySliderCreateInput
  /** Update document if it exists */
  readonly update: GQLRowCompanySliderUpdateInput
}

type GQLRowCompanySliderUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowCompanySliderWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowCompanySliderUpsertInput
}

/** Identifies documents */
type GQLRowCompanySliderWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowCompanySliderWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly companies_every?: Maybe<GQLCompanyWhereInput>
  readonly companies_some?: Maybe<GQLCompanyWhereInput>
  readonly companies_none?: Maybe<GQLCompanyWhereInput>
}

/** References RowCompanySlider record uniquely */
type GQLRowCompanySliderWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowHero = GQLNode & {
  readonly __typename?: 'RowHero'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowHero>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly asset: GQLAsset
  readonly text: GQLRichText
  readonly links: ReadonlyArray<GQLRowHeroVideoLinks>
  readonly page: ReadonlyArray<GQLPage>
  readonly list: ReadonlyArray<GQLZzDeleteList>
}

type GQLRowHeroDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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

type GQLRowHeroListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLRowHeroConnectInput = {
  /** Document to connect */
  readonly where: GQLRowHeroWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowHeroConnection = {
  readonly __typename?: 'RowHeroConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowHeroEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowHeroCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly asset: GQLAssetCreateOneInlineInput
  readonly text: Scalars['RichTextAST']
  readonly links?: Maybe<GQLRowHeroVideoLinksCreateManyInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
  readonly list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
}

type GQLRowHeroCreateManyInlineInput = {
  /** Create and connect multiple existing RowHero documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowHeroCreateInput>>
  /** Connect multiple existing RowHero documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowHeroWhereUniqueInput>>
}

type GQLRowHeroCreateOneInlineInput = {
  /** Create and connect one RowHero document */
  readonly create?: Maybe<GQLRowHeroCreateInput>
  /** Connect one existing RowHero document */
  readonly connect?: Maybe<GQLRowHeroWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowHeroEdge = {
  readonly __typename?: 'RowHeroEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowHero
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowHeroManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly asset?: Maybe<GQLAssetWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  readonly asset?: Maybe<GQLAssetUpdateOneInlineInput>
  readonly text?: Maybe<Scalars['RichTextAST']>
  readonly links?: Maybe<GQLRowHeroVideoLinksUpdateManyInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
  readonly list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
}

type GQLRowHeroUpdateManyInlineInput = {
  /** Create and connect multiple RowHero documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowHeroCreateInput>>
  /** Connect multiple existing RowHero documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowHeroConnectInput>>
  /** Override currently-connected documents with multiple existing RowHero documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowHeroWhereUniqueInput>>
  /** Update multiple RowHero documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowHeroUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowHero documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowHeroUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowHero documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowHeroWhereUniqueInput>>
  /** Delete multiple RowHero documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowHeroWhereUniqueInput>>
}

type GQLRowHeroUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly text: Scalars['RichTextAST']
}

type GQLRowHeroUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowHeroWhereInput
  /** Update many input */
  readonly data: GQLRowHeroUpdateManyInput
}

type GQLRowHeroUpdateOneInlineInput = {
  /** Create and connect one RowHero document */
  readonly create?: Maybe<GQLRowHeroCreateInput>
  /** Update single RowHero document */
  readonly update?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowHero document */
  readonly upsert?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowHero document */
  readonly connect?: Maybe<GQLRowHeroWhereUniqueInput>
  /** Disconnect currently connected RowHero document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowHero document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowHeroUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowHeroWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowHeroUpdateInput
}

type GQLRowHeroUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowHeroCreateInput
  /** Update document if it exists */
  readonly update: GQLRowHeroUpdateInput
}

type GQLRowHeroUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowHeroWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowHeroUpsertInput
}

type GQLRowHeroVideoLinks = GQLLinkExternal | GQLLinkInternal

type GQLRowHeroVideoLinksConnectInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalConnectInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalConnectInput>
}

type GQLRowHeroVideoLinksCreateInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalCreateInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalCreateInput>
}

type GQLRowHeroVideoLinksCreateManyInlineInput = {
  /** Create and connect multiple existing RowHeroVideoLinks documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksCreateInput>>
  /** Connect multiple existing RowHeroVideoLinks documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksWhereUniqueInput>>
}

type GQLRowHeroVideoLinksCreateOneInlineInput = {
  /** Create and connect one RowHeroVideoLinks document */
  readonly create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  /** Connect one existing RowHeroVideoLinks document */
  readonly connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
}

type GQLRowHeroVideoLinksUpdateInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalUpdateInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateInput>
}

type GQLRowHeroVideoLinksUpdateManyInlineInput = {
  /** Create and connect multiple RowHeroVideoLinks documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksCreateInput>>
  /** Connect multiple existing RowHeroVideoLinks documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksConnectInput>>
  /** Override currently-connected documents with multiple existing RowHeroVideoLinks documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksWhereUniqueInput>>
  /** Update multiple RowHeroVideoLinks documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowHeroVideoLinks documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowHeroVideoLinks documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksWhereUniqueInput>>
  /** Delete multiple RowHeroVideoLinks documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowHeroVideoLinksWhereUniqueInput>>
}

type GQLRowHeroVideoLinksUpdateManyWithNestedWhereInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalUpdateManyWithNestedWhereInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateManyWithNestedWhereInput>
}

type GQLRowHeroVideoLinksUpdateOneInlineInput = {
  /** Create and connect one RowHeroVideoLinks document */
  readonly create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  /** Update single RowHeroVideoLinks document */
  readonly update?: Maybe<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowHeroVideoLinks document */
  readonly upsert?: Maybe<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowHeroVideoLinks document */
  readonly connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
  /** Disconnect currently connected RowHeroVideoLinks document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowHeroVideoLinks document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
}

type GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
}

type GQLRowHeroVideoLinksWhereInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalWhereInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalWhereInput>
}

type GQLRowHeroVideoLinksWhereUniqueInput = {
  readonly LinkExternal?: Maybe<GQLLinkExternalWhereUniqueInput>
  readonly LinkInternal?: Maybe<GQLLinkInternalWhereUniqueInput>
}

/** Identifies documents */
type GQLRowHeroWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowHeroWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly asset?: Maybe<GQLAssetWhereInput>
}

/** References RowHero record uniquely */
type GQLRowHeroWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowPeopleWithText = GQLNode & {
  readonly __typename?: 'RowPeopleWithText'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLRowPeopleWithText>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowPeopleWithText>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly text: GQLRichText
  readonly links: ReadonlyArray<GQLLinkInternal>
  readonly personList?: Maybe<GQLPersonList>
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowPeopleWithTextLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowPeopleWithTextDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowPeopleWithTextWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowPeopleWithTextConnection = {
  readonly __typename?: 'RowPeopleWithTextConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowPeopleWithTextEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowPeopleWithTextCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  /** text input for default locale (nl) */
  readonly text: Scalars['RichTextAST']
  readonly links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  readonly personList?: Maybe<GQLPersonListCreateOneInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLRowPeopleWithTextCreateLocalizationsInput>
}

type GQLRowPeopleWithTextCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLRowPeopleWithTextCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowPeopleWithTextCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLRowPeopleWithTextCreateLocalizationInput>>
}

type GQLRowPeopleWithTextCreateManyInlineInput = {
  /** Create and connect multiple existing RowPeopleWithText documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowPeopleWithTextCreateInput>>
  /** Connect multiple existing RowPeopleWithText documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereUniqueInput>>
}

type GQLRowPeopleWithTextCreateOneInlineInput = {
  /** Create and connect one RowPeopleWithText document */
  readonly create?: Maybe<GQLRowPeopleWithTextCreateInput>
  /** Connect one existing RowPeopleWithText document */
  readonly connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowPeopleWithTextEdge = {
  readonly __typename?: 'RowPeopleWithTextEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowPeopleWithText
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowPeopleWithTextManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly links_every?: Maybe<GQLLinkInternalWhereInput>
  readonly links_some?: Maybe<GQLLinkInternalWhereInput>
  readonly links_none?: Maybe<GQLLinkInternalWhereInput>
  readonly personList?: Maybe<GQLPersonListWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  /** text input for default locale (nl) */
  readonly text?: Maybe<Scalars['RichTextAST']>
  readonly links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  readonly personList?: Maybe<GQLPersonListUpdateOneInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLRowPeopleWithTextUpdateLocalizationsInput>
}

type GQLRowPeopleWithTextUpdateLocalizationDataInput = {
  readonly text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextUpdateLocalizationInput = {
  readonly data: GQLRowPeopleWithTextUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowPeopleWithTextUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLRowPeopleWithTextCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLRowPeopleWithTextUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLRowPeopleWithTextUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLRowPeopleWithTextUpdateManyInlineInput = {
  /** Create and connect multiple RowPeopleWithText documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowPeopleWithTextCreateInput>>
  /** Connect multiple existing RowPeopleWithText documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowPeopleWithTextConnectInput>>
  /** Override currently-connected documents with multiple existing RowPeopleWithText documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereUniqueInput>>
  /** Update multiple RowPeopleWithText documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowPeopleWithText documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowPeopleWithText documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereUniqueInput>>
  /** Delete multiple RowPeopleWithText documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereUniqueInput>>
}

type GQLRowPeopleWithTextUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLRowPeopleWithTextUpdateManyLocalizationInput>>
}

type GQLRowPeopleWithTextUpdateManyLocalizationInput = {
  readonly text: Scalars['RichTextAST']
}

type GQLRowPeopleWithTextUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowPeopleWithTextWhereInput
  /** Update many input */
  readonly data: GQLRowPeopleWithTextUpdateManyInput
}

type GQLRowPeopleWithTextUpdateOneInlineInput = {
  /** Create and connect one RowPeopleWithText document */
  readonly create?: Maybe<GQLRowPeopleWithTextCreateInput>
  /** Update single RowPeopleWithText document */
  readonly update?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowPeopleWithText document */
  readonly upsert?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowPeopleWithText document */
  readonly connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  /** Disconnect currently connected RowPeopleWithText document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowPeopleWithText document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowPeopleWithTextWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowPeopleWithTextUpdateInput
}

type GQLRowPeopleWithTextUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowPeopleWithTextCreateInput
  /** Update document if it exists */
  readonly update: GQLRowPeopleWithTextUpdateInput
}

type GQLRowPeopleWithTextUpsertLocalizationInput = {
  readonly update: GQLRowPeopleWithTextUpdateLocalizationDataInput
  readonly create: GQLRowPeopleWithTextCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowPeopleWithTextWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowPeopleWithTextUpsertInput
}

/** Identifies documents */
type GQLRowPeopleWithTextWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowPeopleWithTextWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly links_every?: Maybe<GQLLinkInternalWhereInput>
  readonly links_some?: Maybe<GQLLinkInternalWhereInput>
  readonly links_none?: Maybe<GQLLinkInternalWhereInput>
  readonly personList?: Maybe<GQLPersonListWhereInput>
}

/** References RowPeopleWithText record uniquely */
type GQLRowPeopleWithTextWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowRecentBlogPost = GQLNode & {
  readonly __typename?: 'RowRecentBlogPost'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowRecentBlogPost>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly limit?: Maybe<Scalars['Int']>
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowRecentBlogPostDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowRecentBlogPostWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowRecentBlogPostConnection = {
  readonly __typename?: 'RowRecentBlogPostConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowRecentBlogPostEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowRecentBlogPostCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly limit?: Maybe<Scalars['Int']>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
}

type GQLRowRecentBlogPostCreateManyInlineInput = {
  /** Create and connect multiple existing RowRecentBlogPost documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowRecentBlogPostCreateInput>>
  /** Connect multiple existing RowRecentBlogPost documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereUniqueInput>>
}

type GQLRowRecentBlogPostCreateOneInlineInput = {
  /** Create and connect one RowRecentBlogPost document */
  readonly create?: Maybe<GQLRowRecentBlogPostCreateInput>
  /** Connect one existing RowRecentBlogPost document */
  readonly connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowRecentBlogPostEdge = {
  readonly __typename?: 'RowRecentBlogPostEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowRecentBlogPost
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowRecentBlogPostManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly limit?: Maybe<Scalars['Int']>
  /** All values that are not equal to given value. */
  readonly limit_not?: Maybe<Scalars['Int']>
  /** All values that are contained in given list. */
  readonly limit_in?: Maybe<ReadonlyArray<Scalars['Int']>>
  /** All values that are not contained in given list. */
  readonly limit_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>
  /** All values less than the given value. */
  readonly limit_lt?: Maybe<Scalars['Int']>
  /** All values less than or equal the given value. */
  readonly limit_lte?: Maybe<Scalars['Int']>
  /** All values greater than the given value. */
  readonly limit_gt?: Maybe<Scalars['Int']>
  /** All values greater than or equal the given value. */
  readonly limit_gte?: Maybe<Scalars['Int']>
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
  | 'limit_ASC'
  | 'limit_DESC'

type GQLRowRecentBlogPostUpdateInput = {
  readonly identity?: Maybe<Scalars['String']>
  readonly limit?: Maybe<Scalars['Int']>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
}

type GQLRowRecentBlogPostUpdateManyInlineInput = {
  /** Create and connect multiple RowRecentBlogPost documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowRecentBlogPostCreateInput>>
  /** Connect multiple existing RowRecentBlogPost documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowRecentBlogPostConnectInput>>
  /** Override currently-connected documents with multiple existing RowRecentBlogPost documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereUniqueInput>>
  /** Update multiple RowRecentBlogPost documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowRecentBlogPost documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowRecentBlogPost documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereUniqueInput>>
  /** Delete multiple RowRecentBlogPost documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereUniqueInput>>
}

type GQLRowRecentBlogPostUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly limit?: Maybe<Scalars['Int']>
}

type GQLRowRecentBlogPostUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowRecentBlogPostWhereInput
  /** Update many input */
  readonly data: GQLRowRecentBlogPostUpdateManyInput
}

type GQLRowRecentBlogPostUpdateOneInlineInput = {
  /** Create and connect one RowRecentBlogPost document */
  readonly create?: Maybe<GQLRowRecentBlogPostCreateInput>
  /** Update single RowRecentBlogPost document */
  readonly update?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowRecentBlogPost document */
  readonly upsert?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowRecentBlogPost document */
  readonly connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  /** Disconnect currently connected RowRecentBlogPost document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowRecentBlogPost document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowRecentBlogPostWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowRecentBlogPostUpdateInput
}

type GQLRowRecentBlogPostUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowRecentBlogPostCreateInput
  /** Update document if it exists */
  readonly update: GQLRowRecentBlogPostUpdateInput
}

type GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowRecentBlogPostWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowRecentBlogPostUpsertInput
}

/** Identifies documents */
type GQLRowRecentBlogPostWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowRecentBlogPostWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly limit?: Maybe<Scalars['Int']>
  /** All values that are not equal to given value. */
  readonly limit_not?: Maybe<Scalars['Int']>
  /** All values that are contained in given list. */
  readonly limit_in?: Maybe<ReadonlyArray<Scalars['Int']>>
  /** All values that are not contained in given list. */
  readonly limit_not_in?: Maybe<ReadonlyArray<Scalars['Int']>>
  /** All values less than the given value. */
  readonly limit_lt?: Maybe<Scalars['Int']>
  /** All values less than or equal the given value. */
  readonly limit_lte?: Maybe<Scalars['Int']>
  /** All values greater than the given value. */
  readonly limit_gt?: Maybe<Scalars['Int']>
  /** All values greater than or equal the given value. */
  readonly limit_gte?: Maybe<Scalars['Int']>
}

/** References RowRecentBlogPost record uniquely */
type GQLRowRecentBlogPostWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

type GQLRowServicesWithText = GQLNode & {
  readonly __typename?: 'RowServicesWithText'
  /** System stage field */
  readonly stage: GQLStage
  /** System Locale field */
  readonly locale: GQLLocale
  /** Get the other localizations for this document */
  readonly localizations: ReadonlyArray<GQLRowServicesWithText>
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLRowServicesWithText>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  readonly text: Scalars['String']
  readonly links: ReadonlyArray<GQLLinkInternal>
  readonly page: ReadonlyArray<GQLPage>
}

type GQLRowServicesWithTextLocalizationsArgs = {
  locales?: ReadonlyArray<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

type GQLRowServicesWithTextDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
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
  readonly where: GQLRowServicesWithTextWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLRowServicesWithTextConnection = {
  readonly __typename?: 'RowServicesWithTextConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLRowServicesWithTextEdge>
  readonly aggregate: GQLAggregate
}

type GQLRowServicesWithTextCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identity: Scalars['String']
  /** text input for default locale (nl) */
  readonly text: Scalars['String']
  readonly links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  readonly page?: Maybe<GQLPageCreateManyInlineInput>
  /** Inline mutations for managing document localizations excluding the default locale */
  readonly localizations?: Maybe<GQLRowServicesWithTextCreateLocalizationsInput>
}

type GQLRowServicesWithTextCreateLocalizationDataInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly text: Scalars['String']
}

type GQLRowServicesWithTextCreateLocalizationInput = {
  /** Localization input */
  readonly data: GQLRowServicesWithTextCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowServicesWithTextCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  readonly create?: Maybe<ReadonlyArray<GQLRowServicesWithTextCreateLocalizationInput>>
}

type GQLRowServicesWithTextCreateManyInlineInput = {
  /** Create and connect multiple existing RowServicesWithText documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowServicesWithTextCreateInput>>
  /** Connect multiple existing RowServicesWithText documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereUniqueInput>>
}

type GQLRowServicesWithTextCreateOneInlineInput = {
  /** Create and connect one RowServicesWithText document */
  readonly create?: Maybe<GQLRowServicesWithTextCreateInput>
  /** Connect one existing RowServicesWithText document */
  readonly connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
}

/** An edge in a connection. */
type GQLRowServicesWithTextEdge = {
  readonly __typename?: 'RowServicesWithTextEdge'
  /** The item at the end of the edge. */
  readonly node: GQLRowServicesWithText
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLRowServicesWithTextManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly links_every?: Maybe<GQLLinkInternalWhereInput>
  readonly links_some?: Maybe<GQLLinkInternalWhereInput>
  readonly links_none?: Maybe<GQLLinkInternalWhereInput>
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
  readonly identity?: Maybe<Scalars['String']>
  /** text input for default locale (nl) */
  readonly text?: Maybe<Scalars['String']>
  readonly links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  readonly page?: Maybe<GQLPageUpdateManyInlineInput>
  /** Manage document localizations */
  readonly localizations?: Maybe<GQLRowServicesWithTextUpdateLocalizationsInput>
}

type GQLRowServicesWithTextUpdateLocalizationDataInput = {
  readonly text: Scalars['String']
}

type GQLRowServicesWithTextUpdateLocalizationInput = {
  readonly data: GQLRowServicesWithTextUpdateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowServicesWithTextUpdateLocalizationsInput = {
  /** Localizations to create */
  readonly create?: Maybe<ReadonlyArray<GQLRowServicesWithTextCreateLocalizationInput>>
  /** Localizations to update */
  readonly update?: Maybe<ReadonlyArray<GQLRowServicesWithTextUpdateLocalizationInput>>
  readonly upsert?: Maybe<ReadonlyArray<GQLRowServicesWithTextUpsertLocalizationInput>>
  /** Localizations to delete */
  readonly delete?: Maybe<ReadonlyArray<GQLLocale>>
}

type GQLRowServicesWithTextUpdateManyInlineInput = {
  /** Create and connect multiple RowServicesWithText documents */
  readonly create?: Maybe<ReadonlyArray<GQLRowServicesWithTextCreateInput>>
  /** Connect multiple existing RowServicesWithText documents */
  readonly connect?: Maybe<ReadonlyArray<GQLRowServicesWithTextConnectInput>>
  /** Override currently-connected documents with multiple existing RowServicesWithText documents */
  readonly set?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereUniqueInput>>
  /** Update multiple RowServicesWithText documents */
  readonly update?: Maybe<ReadonlyArray<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple RowServicesWithText documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple RowServicesWithText documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereUniqueInput>>
  /** Delete multiple RowServicesWithText documents */
  readonly delete?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereUniqueInput>>
}

type GQLRowServicesWithTextUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** Optional updates to localizations */
  readonly localizations?: Maybe<ReadonlyArray<GQLRowServicesWithTextUpdateManyLocalizationInput>>
}

type GQLRowServicesWithTextUpdateManyLocalizationInput = {
  readonly text: Scalars['String']
}

type GQLRowServicesWithTextUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLRowServicesWithTextWhereInput
  /** Update many input */
  readonly data: GQLRowServicesWithTextUpdateManyInput
}

type GQLRowServicesWithTextUpdateOneInlineInput = {
  /** Create and connect one RowServicesWithText document */
  readonly create?: Maybe<GQLRowServicesWithTextCreateInput>
  /** Update single RowServicesWithText document */
  readonly update?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
  /** Upsert single RowServicesWithText document */
  readonly upsert?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
  /** Connect existing RowServicesWithText document */
  readonly connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
  /** Disconnect currently connected RowServicesWithText document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected RowServicesWithText document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowServicesWithTextWhereUniqueInput
  /** Document to update */
  readonly data: GQLRowServicesWithTextUpdateInput
}

type GQLRowServicesWithTextUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLRowServicesWithTextCreateInput
  /** Update document if it exists */
  readonly update: GQLRowServicesWithTextUpdateInput
}

type GQLRowServicesWithTextUpsertLocalizationInput = {
  readonly update: GQLRowServicesWithTextUpdateLocalizationDataInput
  readonly create: GQLRowServicesWithTextCreateLocalizationDataInput
  readonly locale: GQLLocale
}

type GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLRowServicesWithTextWhereUniqueInput
  /** Upsert data */
  readonly data: GQLRowServicesWithTextUpsertInput
}

/** Identifies documents */
type GQLRowServicesWithTextWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLRowServicesWithTextWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identity?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identity_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identity_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identity_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identity_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identity_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identity_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identity_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identity_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identity_not_ends_with?: Maybe<Scalars['String']>
  readonly text?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly text_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly text_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly text_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly text_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly text_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly text_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly text_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly text_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly text_not_ends_with?: Maybe<Scalars['String']>
  readonly links_every?: Maybe<GQLLinkInternalWhereInput>
  readonly links_some?: Maybe<GQLLinkInternalWhereInput>
  readonly links_none?: Maybe<GQLLinkInternalWhereInput>
}

/** References RowServicesWithText record uniquely */
type GQLRowServicesWithTextWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identity?: Maybe<Scalars['String']>
}

/** Stage system enumeration */
type GQLStage =
  /** System Published Stage */
  | 'PUBLISHED'
  /** System Draft Stage */
  | 'DRAFT'

type GQLUnpublishLocaleInput = {
  /** Locales to unpublish */
  readonly locale: GQLLocale
  /** Stages to unpublish selected locales from */
  readonly stages: ReadonlyArray<GQLStage>
}

type GQLZzDeleteList = GQLNode & {
  readonly __typename?: 'ZzDeleteList'
  /** System stage field */
  readonly stage: GQLStage
  /** Get the document in other stages */
  readonly documentInStages: ReadonlyArray<GQLZzDeleteList>
  /** The unique identifier */
  readonly id: Scalars['ID']
  /** The time the document was created */
  readonly createdAt: Scalars['DateTime']
  /** The time the document was updated */
  readonly updatedAt: Scalars['DateTime']
  /** The time the document was published. Null on documents in draft stage. */
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  readonly identifier: Scalars['String']
  readonly items: ReadonlyArray<GQLListItems>
}

type GQLZzDeleteListDocumentInStagesArgs = {
  stages?: ReadonlyArray<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

type GQLZzDeleteListItemsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

type GQLZzDeleteListConnectInput = {
  /** Document to connect */
  readonly where: GQLZzDeleteListWhereUniqueInput
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  readonly position?: Maybe<GQLConnectPositionInput>
}

/** A connection to a list of items. */
type GQLZzDeleteListConnection = {
  readonly __typename?: 'ZzDeleteListConnection'
  /** Information to aid in pagination. */
  readonly pageInfo: GQLPageInfo
  /** A list of edges. */
  readonly edges: ReadonlyArray<GQLZzDeleteListEdge>
  readonly aggregate: GQLAggregate
}

type GQLZzDeleteListCreateInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  readonly identifier: Scalars['String']
  readonly items?: Maybe<GQLListItemsCreateManyInlineInput>
}

type GQLZzDeleteListCreateManyInlineInput = {
  /** Create and connect multiple existing ZzDeleteList documents */
  readonly create?: Maybe<ReadonlyArray<GQLZzDeleteListCreateInput>>
  /** Connect multiple existing ZzDeleteList documents */
  readonly connect?: Maybe<ReadonlyArray<GQLZzDeleteListWhereUniqueInput>>
}

type GQLZzDeleteListCreateOneInlineInput = {
  /** Create and connect one ZzDeleteList document */
  readonly create?: Maybe<GQLZzDeleteListCreateInput>
  /** Connect one existing ZzDeleteList document */
  readonly connect?: Maybe<GQLZzDeleteListWhereUniqueInput>
}

/** An edge in a connection. */
type GQLZzDeleteListEdge = {
  readonly __typename?: 'ZzDeleteListEdge'
  /** The item at the end of the edge. */
  readonly node: GQLZzDeleteList
  /** A cursor for use in pagination. */
  readonly cursor: Scalars['String']
}

/** Identifies documents */
type GQLZzDeleteListManyWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identifier?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identifier_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identifier_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identifier_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identifier_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identifier_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identifier_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identifier_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identifier_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identifier_not_ends_with?: Maybe<Scalars['String']>
}

type GQLZzDeleteListOrderByInput =
  | 'id_ASC'
  | 'id_DESC'
  | 'createdAt_ASC'
  | 'createdAt_DESC'
  | 'updatedAt_ASC'
  | 'updatedAt_DESC'
  | 'publishedAt_ASC'
  | 'publishedAt_DESC'
  | 'identifier_ASC'
  | 'identifier_DESC'

type GQLZzDeleteListUpdateInput = {
  readonly identifier?: Maybe<Scalars['String']>
  readonly items?: Maybe<GQLListItemsUpdateManyInlineInput>
}

type GQLZzDeleteListUpdateManyInlineInput = {
  /** Create and connect multiple ZzDeleteList documents */
  readonly create?: Maybe<ReadonlyArray<GQLZzDeleteListCreateInput>>
  /** Connect multiple existing ZzDeleteList documents */
  readonly connect?: Maybe<ReadonlyArray<GQLZzDeleteListConnectInput>>
  /** Override currently-connected documents with multiple existing ZzDeleteList documents */
  readonly set?: Maybe<ReadonlyArray<GQLZzDeleteListWhereUniqueInput>>
  /** Update multiple ZzDeleteList documents */
  readonly update?: Maybe<ReadonlyArray<GQLZzDeleteListUpdateWithNestedWhereUniqueInput>>
  /** Upsert multiple ZzDeleteList documents */
  readonly upsert?: Maybe<ReadonlyArray<GQLZzDeleteListUpsertWithNestedWhereUniqueInput>>
  /** Disconnect multiple ZzDeleteList documents */
  readonly disconnect?: Maybe<ReadonlyArray<GQLZzDeleteListWhereUniqueInput>>
  /** Delete multiple ZzDeleteList documents */
  readonly delete?: Maybe<ReadonlyArray<GQLZzDeleteListWhereUniqueInput>>
}

type GQLZzDeleteListUpdateManyInput = {
  readonly createdAt?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
}

type GQLZzDeleteListUpdateManyWithNestedWhereInput = {
  /** Document search */
  readonly where: GQLZzDeleteListWhereInput
  /** Update many input */
  readonly data: GQLZzDeleteListUpdateManyInput
}

type GQLZzDeleteListUpdateOneInlineInput = {
  /** Create and connect one ZzDeleteList document */
  readonly create?: Maybe<GQLZzDeleteListCreateInput>
  /** Update single ZzDeleteList document */
  readonly update?: Maybe<GQLZzDeleteListUpdateWithNestedWhereUniqueInput>
  /** Upsert single ZzDeleteList document */
  readonly upsert?: Maybe<GQLZzDeleteListUpsertWithNestedWhereUniqueInput>
  /** Connect existing ZzDeleteList document */
  readonly connect?: Maybe<GQLZzDeleteListWhereUniqueInput>
  /** Disconnect currently connected ZzDeleteList document */
  readonly disconnect?: Maybe<Scalars['Boolean']>
  /** Delete currently connected ZzDeleteList document */
  readonly delete?: Maybe<Scalars['Boolean']>
}

type GQLZzDeleteListUpdateWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLZzDeleteListWhereUniqueInput
  /** Document to update */
  readonly data: GQLZzDeleteListUpdateInput
}

type GQLZzDeleteListUpsertInput = {
  /** Create document if it didn't exist */
  readonly create: GQLZzDeleteListCreateInput
  /** Update document if it exists */
  readonly update: GQLZzDeleteListUpdateInput
}

type GQLZzDeleteListUpsertWithNestedWhereUniqueInput = {
  /** Unique document search */
  readonly where: GQLZzDeleteListWhereUniqueInput
  /** Upsert data */
  readonly data: GQLZzDeleteListUpsertInput
}

/** Identifies documents */
type GQLZzDeleteListWhereInput = {
  /** Contains search across all appropriate fields. */
  readonly _search?: Maybe<Scalars['String']>
  /** Logical AND on all given filters. */
  readonly AND?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  /** Logical OR on all given filters. */
  readonly OR?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  /** Logical NOT on all given filters combined by AND. */
  readonly NOT?: Maybe<ReadonlyArray<GQLZzDeleteListWhereInput>>
  readonly id?: Maybe<Scalars['ID']>
  /** All values that are not equal to given value. */
  readonly id_not?: Maybe<Scalars['ID']>
  /** All values that are contained in given list. */
  readonly id_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values that are not contained in given list. */
  readonly id_not_in?: Maybe<ReadonlyArray<Scalars['ID']>>
  /** All values containing the given string. */
  readonly id_contains?: Maybe<Scalars['ID']>
  /** All values not containing the given string. */
  readonly id_not_contains?: Maybe<Scalars['ID']>
  /** All values starting with the given string. */
  readonly id_starts_with?: Maybe<Scalars['ID']>
  /** All values not starting with the given string. */
  readonly id_not_starts_with?: Maybe<Scalars['ID']>
  /** All values ending with the given string. */
  readonly id_ends_with?: Maybe<Scalars['ID']>
  /** All values not ending with the given string */
  readonly id_not_ends_with?: Maybe<Scalars['ID']>
  readonly createdAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly createdAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly createdAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly createdAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly createdAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly createdAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly createdAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly createdAt_gte?: Maybe<Scalars['DateTime']>
  readonly updatedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly updatedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly updatedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly updatedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly updatedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly updatedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly updatedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly updatedAt_gte?: Maybe<Scalars['DateTime']>
  readonly publishedAt?: Maybe<Scalars['DateTime']>
  /** All values that are not equal to given value. */
  readonly publishedAt_not?: Maybe<Scalars['DateTime']>
  /** All values that are contained in given list. */
  readonly publishedAt_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values that are not contained in given list. */
  readonly publishedAt_not_in?: Maybe<ReadonlyArray<Scalars['DateTime']>>
  /** All values less than the given value. */
  readonly publishedAt_lt?: Maybe<Scalars['DateTime']>
  /** All values less than or equal the given value. */
  readonly publishedAt_lte?: Maybe<Scalars['DateTime']>
  /** All values greater than the given value. */
  readonly publishedAt_gt?: Maybe<Scalars['DateTime']>
  /** All values greater than or equal the given value. */
  readonly publishedAt_gte?: Maybe<Scalars['DateTime']>
  readonly identifier?: Maybe<Scalars['String']>
  /** All values that are not equal to given value. */
  readonly identifier_not?: Maybe<Scalars['String']>
  /** All values that are contained in given list. */
  readonly identifier_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values that are not contained in given list. */
  readonly identifier_not_in?: Maybe<ReadonlyArray<Scalars['String']>>
  /** All values containing the given string. */
  readonly identifier_contains?: Maybe<Scalars['String']>
  /** All values not containing the given string. */
  readonly identifier_not_contains?: Maybe<Scalars['String']>
  /** All values starting with the given string. */
  readonly identifier_starts_with?: Maybe<Scalars['String']>
  /** All values not starting with the given string. */
  readonly identifier_not_starts_with?: Maybe<Scalars['String']>
  /** All values ending with the given string. */
  readonly identifier_ends_with?: Maybe<Scalars['String']>
  /** All values not ending with the given string */
  readonly identifier_not_ends_with?: Maybe<Scalars['String']>
}

/** References ZzDeleteList record uniquely */
type GQLZzDeleteListWhereUniqueInput = {
  readonly id?: Maybe<Scalars['ID']>
  readonly identifier?: Maybe<Scalars['String']>
}

type GQLAssetFragment = { readonly __typename?: 'Asset' } & Pick<
  GQLAsset,
  'id' | 'url' | 'width' | 'height' | 'mimeType'
>

type GQLBreadcrumbFragment = { readonly __typename?: 'Page' } & Pick<
  GQLPage,
  'id' | 'title' | 'metaRobots' | 'metaTitle' | 'url'
>

type GQLGetBreadcrumbQueryVariables = {
  urls: ReadonlyArray<Scalars['String']>
  locale: GQLLocale
}

type GQLGetBreadcrumbQuery = { readonly __typename?: 'Query' } & {
  readonly breadcrumbs: ReadonlyArray<{ readonly __typename?: 'Page' } & GQLBreadcrumbFragment>
}

type GQLContentRendererFragment = { readonly __typename?: 'Page' } & {
  readonly content: ReadonlyArray<{ readonly __typename: 'RowHero' } & GQLRowHeroFragment>
}

type GQLLinkExternalFragment = { readonly __typename?: 'LinkExternal' } & Pick<
  GQLLinkExternal,
  'id' | 'url'
> & { exTitle: GQLLinkExternal['title'] } & {
    readonly description?: Maybe<{ readonly __typename?: 'RichText' } & GQLRichTextFragment>
  }

type GQLLinkInternalFragment = { readonly __typename?: 'LinkInternal' } & Pick<
  GQLLinkInternal,
  'id' | 'title'
> & {
    readonly description?: Maybe<{ readonly __typename?: 'RichText' } & GQLRichTextFragment>
    readonly page?: Maybe<
      { readonly __typename?: 'Page' } & Pick<GQLPage, 'title' | 'metaRobots' | 'metaTitle' | 'url'>
    >
  }

type GQLMenuFragment = { readonly __typename?: 'Menu' } & {
  readonly pages: ReadonlyArray<
    { readonly __typename?: 'Page' } & {
      readonly localizations: ReadonlyArray<
        { readonly __typename?: 'Page' } & Pick<
          GQLPage,
          'locale' | 'id' | 'title' | 'metaRobots' | 'url'
        >
      >
    }
  >
}

type GQLPageLayoutFragment = { readonly __typename?: 'Page' } & Pick<GQLPage, 'id' | 'locale'> &
  GQLPageMetaFragment &
  GQLContentRendererFragment

type GQLGetPageLayoutQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

type GQLGetPageLayoutQuery = { readonly __typename?: 'Query' } & {
  readonly pages: ReadonlyArray<{ readonly __typename?: 'Page' } & GQLPageLayoutFragment>
  readonly mainMenu?: Maybe<{ readonly __typename?: 'Menu' } & GQLMenuFragment>
  readonly team: ReadonlyArray<{ readonly __typename?: 'Person' } & GQLPersonFragment>
}

type GQLGetStaticPathsQueryVariables = {
  startsWith: Scalars['String']
  locale: GQLLocale
}

type GQLGetStaticPathsQuery = { readonly __typename?: 'Query' } & {
  readonly pages: ReadonlyArray<
    { readonly __typename?: 'Page' } & Pick<GQLPage, 'url'> & {
        readonly localizations: ReadonlyArray<
          { readonly __typename?: 'Page' } & Pick<GQLPage, 'url' | 'locale'>
        >
      }
  >
}

type GQLPageMetaFragment = { readonly __typename?: 'Page' } & Pick<
  GQLPage,
  'title' | 'metaTitle' | 'metaDescription' | 'metaRobots' | 'url' | 'locale'
> & {
    readonly localizations: ReadonlyArray<
      { readonly __typename?: 'Page' } & Pick<
        GQLPage,
        'id' | 'url' | 'title' | 'locale' | 'metaRobots'
      >
    >
  }

type GQLPersonFragment = { readonly __typename?: 'Person' } & Pick<GQLPerson, 'id' | 'name'> & {
    readonly avatar: { readonly __typename?: 'Asset' } & GQLAssetFragment
  }

type GQLRichTextFragment = { readonly __typename?: 'RichText' } & Pick<GQLRichText, 'raw'>

type GQLGetAllRowColumThreeQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowColumThreeQuery = { readonly __typename?: 'Query' } & {
  readonly rowColumnThrees: ReadonlyArray<
    { readonly __typename?: 'RowColumnThree' } & GQLRowColumnThreeFragment
  >
}

type GQLRowColumnThreeFragment = { readonly __typename?: 'RowColumnThree' } & Pick<
  GQLRowColumnThree,
  'id'
> & {
    readonly colOne: { readonly __typename?: 'RichText' } & GQLRichTextFragment
    readonly colOneIcon?: Maybe<{ readonly __typename?: 'Asset' } & GQLAssetFragment>
    readonly colTwo: { readonly __typename?: 'RichText' } & GQLRichTextFragment
    readonly colTwoIcon?: Maybe<{ readonly __typename?: 'Asset' } & GQLAssetFragment>
    readonly colThree: { readonly __typename?: 'RichText' } & GQLRichTextFragment
    readonly colThreeIcon?: Maybe<{ readonly __typename?: 'Asset' } & GQLAssetFragment>
  }

type GQLGetAllRowCompanySlidersQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowCompanySlidersQuery = { readonly __typename?: 'Query' } & {
  readonly rowCompanySliders: ReadonlyArray<
    { readonly __typename?: 'RowCompanySlider' } & GQLRowCompanySliderFragment
  >
}

type GQLRowCompanySliderFragment = { readonly __typename?: 'RowCompanySlider' } & Pick<
  GQLRowCompanySlider,
  'id'
> & {
    readonly companies: ReadonlyArray<
      { readonly __typename?: 'Company' } & Pick<GQLCompany, 'id'> & {
          readonly logo: { readonly __typename?: 'Asset' } & Pick<
            GQLAsset,
            'mimeType' | 'url' | 'width' | 'height'
          >
        }
    >
  }

type GQLGetAllRowHeroQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetAllRowHeroQuery = { readonly __typename?: 'Query' } & {
  readonly rowHeroes: ReadonlyArray<{ readonly __typename?: 'RowHero' } & GQLRowHeroFragment>
}

type GQLRowHeroFragment = { readonly __typename?: 'RowHero' } & Pick<GQLRowHero, 'id'> & {
    readonly asset: { readonly __typename?: 'Asset' } & GQLAssetFragment
    readonly text: { readonly __typename?: 'RichText' } & GQLRichTextFragment
    readonly links: ReadonlyArray<
      | ({ readonly __typename?: 'LinkExternal' } & GQLLinkExternalFragment)
      | ({ readonly __typename?: 'LinkInternal' } & GQLLinkInternalFragment)
    >
  }

type GQLGetRowPeopleWithTextsQueryVariables = {
  skip: Scalars['Int']
}

type GQLGetRowPeopleWithTextsQuery = { readonly __typename?: 'Query' } & {
  readonly rowPeopleWithTexts: ReadonlyArray<
    { readonly __typename?: 'RowPeopleWithText' } & GQLRowPeopleWithTextFragment
  >
}

type GQLRowPeopleWithTextFragment = { readonly __typename?: 'RowPeopleWithText' } & Pick<
  GQLRowPeopleWithText,
  'id'
> & {
    readonly text: { readonly __typename?: 'RichText' } & GQLRichTextFragment
    readonly links: ReadonlyArray<
      { readonly __typename?: 'LinkInternal' } & GQLLinkInternalFragment
    >
    readonly personList?: Maybe<
      { readonly __typename?: 'PersonList' } & {
        readonly people: ReadonlyArray<{ readonly __typename?: 'Person' } & GQLPersonFragment>
      }
    >
  }
