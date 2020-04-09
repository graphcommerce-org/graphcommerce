import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'

export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  RichTextAST: any
  Long: any
  Hex: any
  RGBAHue: any
  RGBATransparency: any
  Date: any
  Json: any
}

export enum GQL_FilterKind {
  Search = 'search',
  And = 'AND',
  Or = 'OR',
  Not = 'NOT',
  Eq = 'eq',
  EqNot = 'eq_not',
  In = 'in',
  NotIn = 'not_in',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
  Contains = 'contains',
  NotContains = 'not_contains',
  StartsWith = 'starts_with',
  NotStartsWith = 'not_starts_with',
  EndsWith = 'ends_with',
  NotEndsWith = 'not_ends_with',
  ContainsAll = 'contains_all',
  ContainsSome = 'contains_some',
  ContainsNone = 'contains_none',
  RelationalSingle = 'relational_single',
  RelationalEvery = 'relational_every',
  RelationalSome = 'relational_some',
  RelationalNone = 'relational_none',
}

export enum GQL_MutationInputFieldKind {
  Scalar = 'scalar',
  RichText = 'richText',
  Enum = 'enum',
  Relation = 'relation',
  Union = 'union',
  Virtual = 'virtual',
}

export enum GQL_MutationKind {
  Create = 'create',
  Publish = 'publish',
  Unpublish = 'unpublish',
  Update = 'update',
  Upsert = 'upsert',
  Delete = 'delete',
  UpdateMany = 'updateMany',
  PublishMany = 'publishMany',
  UnpublishMany = 'unpublishMany',
  DeleteMany = 'deleteMany',
}

export enum GQL_OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum GQL_RelationInputCardinality {
  One = 'one',
  Many = 'many',
}

export enum GQL_RelationInputKind {
  Create = 'create',
  Update = 'update',
}

export enum GQL_RelationKind {
  Regular = 'regular',
  Union = 'union',
}

export type GQLAggregate = {
  __typename?: 'Aggregate'
  count: Scalars['Int']
}

export type GQLAsset = GQLNode & {
  __typename?: 'Asset'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLAsset>
  documentInStages: Array<GQLAsset>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  personAvatar: Array<GQLPerson>
  companyLogo: Array<GQLCompany>
  colOneIconRowColumnTwo: Array<GQLRowColumnTwo>
  colTwoIconRowColumnTwo: Array<GQLRowColumnTwo>
  rowColumnThreeColOneIcon: Array<GQLRowColumnThree>
  rowColumnThreeColTwoIcon: Array<GQLRowColumnThree>
  rowColumnThreeColThreeIcon: Array<GQLRowColumnThree>
  rowColumnOneColOneIcon: Array<GQLRowColumnOne>
  rowHeroAsset: Array<GQLRowHero>
  url: Scalars['String']
}

export type GQLAssetLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLAssetDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLAssetPersonAvatarArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetCompanyLogoArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetColOneIconRowColumnTwoArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetColTwoIconRowColumnTwoArgs = {
  where?: Maybe<GQLRowColumnTwoWhereInput>
  orderBy?: Maybe<GQLRowColumnTwoOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetRowColumnThreeColOneIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetRowColumnThreeColTwoIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetRowColumnThreeColThreeIconArgs = {
  where?: Maybe<GQLRowColumnThreeWhereInput>
  orderBy?: Maybe<GQLRowColumnThreeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetRowColumnOneColOneIconArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetRowHeroAssetArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetUrlArgs = {
  transformation?: Maybe<GQLAssetTransformationInput>
}

export type GQLAssetConnectInput = {
  where: GQLAssetWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLAssetConnection = {
  __typename?: 'AssetConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLAssetEdge>
  aggregate: GQLAggregate
}

export type GQLAssetCreateInput = {
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
  colOneIconRowColumnTwo?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  colTwoIconRowColumnTwo?: Maybe<GQLRowColumnTwoCreateManyInlineInput>
  rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeCreateManyInlineInput>
  rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneCreateManyInlineInput>
  rowHeroAsset?: Maybe<GQLRowHeroCreateManyInlineInput>
  localizations?: Maybe<GQLAssetCreateLocalizationsInput>
}

export type GQLAssetCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type GQLAssetCreateLocalizationInput = {
  data: GQLAssetCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLAssetCreateLocalizationsInput = {
  create?: Maybe<Array<GQLAssetCreateLocalizationInput>>
}

export type GQLAssetCreateManyInlineInput = {
  create?: Maybe<Array<GQLAssetCreateInput>>
  connect?: Maybe<Array<GQLAssetWhereUniqueInput>>
}

export type GQLAssetCreateOneInlineInput = {
  create?: Maybe<GQLAssetCreateInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetEdge = {
  __typename?: 'AssetEdge'
  node: GQLAsset
  cursor: Scalars['String']
}

export type GQLAssetManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLAssetWhereInput>>
  OR?: Maybe<Array<GQLAssetWhereInput>>
  NOT?: Maybe<Array<GQLAssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
  colOneIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  colOneIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  colOneIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
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
}

export enum GQLAssetOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
}

export type GQLAssetTransformationInput = {
  image?: Maybe<GQLImageTransformationInput>
  document?: Maybe<GQLDocumentTransformationInput>
  validateOptions?: Maybe<Scalars['Boolean']>
}

export type GQLAssetUpdateInput = {
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  personAvatar?: Maybe<GQLPersonUpdateManyInlineInput>
  companyLogo?: Maybe<GQLCompanyUpdateManyInlineInput>
  colOneIconRowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  colTwoIconRowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyInlineInput>
  rowColumnThreeColOneIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnThreeColTwoIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnThreeColThreeIcon?: Maybe<GQLRowColumnThreeUpdateManyInlineInput>
  rowColumnOneColOneIcon?: Maybe<GQLRowColumnOneUpdateManyInlineInput>
  rowHeroAsset?: Maybe<GQLRowHeroUpdateManyInlineInput>
  localizations?: Maybe<GQLAssetUpdateLocalizationsInput>
}

export type GQLAssetUpdateLocalizationDataInput = {
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type GQLAssetUpdateLocalizationInput = {
  data: GQLAssetUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLAssetUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLAssetCreateLocalizationInput>>
  update?: Maybe<Array<GQLAssetUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLAssetUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLAssetUpdateManyInlineInput = {
  create?: Maybe<Array<GQLAssetCreateInput>>
  connect?: Maybe<Array<GQLAssetConnectInput>>
  set?: Maybe<Array<GQLAssetWhereUniqueInput>>
  update?: Maybe<Array<GQLAssetUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLAssetUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLAssetWhereUniqueInput>>
  delete?: Maybe<Array<GQLAssetWhereUniqueInput>>
}

export type GQLAssetUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLAssetUpdateManyLocalizationInput>>
}

export type GQLAssetUpdateManyLocalizationInput = {
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type GQLAssetUpdateManyWithNestedWhereInput = {
  where: GQLAssetWhereInput
  data: GQLAssetUpdateManyInput
}

export type GQLAssetUpdateOneInlineInput = {
  create?: Maybe<GQLAssetCreateInput>
  update?: Maybe<GQLAssetUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLAssetUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLAssetUpdateWithNestedWhereUniqueInput = {
  where: GQLAssetWhereUniqueInput
  data: GQLAssetUpdateInput
}

export type GQLAssetUpsertInput = {
  create: GQLAssetCreateInput
  update: GQLAssetUpdateInput
}

export type GQLAssetUpsertLocalizationInput = {
  update: GQLAssetUpdateLocalizationDataInput
  create: GQLAssetCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLAssetUpsertWithNestedWhereUniqueInput = {
  where: GQLAssetWhereUniqueInput
  data: GQLAssetUpsertInput
}

export type GQLAssetWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLAssetWhereInput>>
  OR?: Maybe<Array<GQLAssetWhereInput>>
  NOT?: Maybe<Array<GQLAssetWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  handle?: Maybe<Scalars['String']>
  handle_not?: Maybe<Scalars['String']>
  handle_in?: Maybe<Array<Scalars['String']>>
  handle_not_in?: Maybe<Array<Scalars['String']>>
  handle_contains?: Maybe<Scalars['String']>
  handle_not_contains?: Maybe<Scalars['String']>
  handle_starts_with?: Maybe<Scalars['String']>
  handle_not_starts_with?: Maybe<Scalars['String']>
  handle_ends_with?: Maybe<Scalars['String']>
  handle_not_ends_with?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  fileName_not?: Maybe<Scalars['String']>
  fileName_in?: Maybe<Array<Scalars['String']>>
  fileName_not_in?: Maybe<Array<Scalars['String']>>
  fileName_contains?: Maybe<Scalars['String']>
  fileName_not_contains?: Maybe<Scalars['String']>
  fileName_starts_with?: Maybe<Scalars['String']>
  fileName_not_starts_with?: Maybe<Scalars['String']>
  fileName_ends_with?: Maybe<Scalars['String']>
  fileName_not_ends_with?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  height_not?: Maybe<Scalars['Float']>
  height_in?: Maybe<Array<Scalars['Float']>>
  height_not_in?: Maybe<Array<Scalars['Float']>>
  height_lt?: Maybe<Scalars['Float']>
  height_lte?: Maybe<Scalars['Float']>
  height_gt?: Maybe<Scalars['Float']>
  height_gte?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  width_not?: Maybe<Scalars['Float']>
  width_in?: Maybe<Array<Scalars['Float']>>
  width_not_in?: Maybe<Array<Scalars['Float']>>
  width_lt?: Maybe<Scalars['Float']>
  width_lte?: Maybe<Scalars['Float']>
  width_gt?: Maybe<Scalars['Float']>
  width_gte?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  size_not?: Maybe<Scalars['Float']>
  size_in?: Maybe<Array<Scalars['Float']>>
  size_not_in?: Maybe<Array<Scalars['Float']>>
  size_lt?: Maybe<Scalars['Float']>
  size_lte?: Maybe<Scalars['Float']>
  size_gt?: Maybe<Scalars['Float']>
  size_gte?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  mimeType_not?: Maybe<Scalars['String']>
  mimeType_in?: Maybe<Array<Scalars['String']>>
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  mimeType_contains?: Maybe<Scalars['String']>
  mimeType_not_contains?: Maybe<Scalars['String']>
  mimeType_starts_with?: Maybe<Scalars['String']>
  mimeType_not_starts_with?: Maybe<Scalars['String']>
  mimeType_ends_with?: Maybe<Scalars['String']>
  mimeType_not_ends_with?: Maybe<Scalars['String']>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
  colOneIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  colOneIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  colOneIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_every?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_some?: Maybe<GQLRowColumnTwoWhereInput>
  colTwoIconRowColumnTwo_none?: Maybe<GQLRowColumnTwoWhereInput>
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
}

export type GQLAssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLBatchPayload = {
  __typename?: 'BatchPayload'
  count: Scalars['Long']
}

export type GQLColor = {
  __typename?: 'Color'
  hex: Scalars['Hex']
  rgba: GQLRgba
  css: Scalars['String']
}

export type GQLColorInput = {
  hex?: Maybe<Scalars['Hex']>
  rgba?: Maybe<GQLRgbaInput>
}

export type GQLCompany = GQLNode & {
  __typename?: 'Company'
  stage: GQLStage
  documentInStages: Array<GQLCompany>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  list: Array<GQLZzDeleteList>
  logo: GQLAsset
  rowCompanySlider: Array<GQLRowCompanySlider>
}

export type GQLCompanyDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLCompanyListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLCompanyRowCompanySliderArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLCompanyConnectInput = {
  where: GQLCompanyWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLCompanyConnection = {
  __typename?: 'CompanyConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLCompanyEdge>
  aggregate: GQLAggregate
}

export type GQLCompanyCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
  list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  logo: GQLAssetCreateOneInlineInput
  rowCompanySlider?: Maybe<GQLRowCompanySliderCreateManyInlineInput>
}

export type GQLCompanyCreateManyInlineInput = {
  create?: Maybe<Array<GQLCompanyCreateInput>>
  connect?: Maybe<Array<GQLCompanyWhereUniqueInput>>
}

export type GQLCompanyCreateOneInlineInput = {
  create?: Maybe<GQLCompanyCreateInput>
  connect?: Maybe<GQLCompanyWhereUniqueInput>
}

export type GQLCompanyEdge = {
  __typename?: 'CompanyEdge'
  node: GQLCompany
  cursor: Scalars['String']
}

export type GQLCompanyManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLCompanyWhereInput>>
  OR?: Maybe<Array<GQLCompanyWhereInput>>
  NOT?: Maybe<Array<GQLCompanyWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  logo?: Maybe<GQLAssetWhereInput>
  rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
}

export enum GQLCompanyOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
}

export type GQLCompanyUpdateInput = {
  name?: Maybe<Scalars['String']>
  list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  logo?: Maybe<GQLAssetUpdateOneInlineInput>
  rowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyInlineInput>
}

export type GQLCompanyUpdateManyInlineInput = {
  create?: Maybe<Array<GQLCompanyCreateInput>>
  connect?: Maybe<Array<GQLCompanyConnectInput>>
  set?: Maybe<Array<GQLCompanyWhereUniqueInput>>
  update?: Maybe<Array<GQLCompanyUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLCompanyUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLCompanyWhereUniqueInput>>
  delete?: Maybe<Array<GQLCompanyWhereUniqueInput>>
}

export type GQLCompanyUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLCompanyUpdateManyWithNestedWhereInput = {
  where: GQLCompanyWhereInput
  data: GQLCompanyUpdateManyInput
}

export type GQLCompanyUpdateOneInlineInput = {
  create?: Maybe<GQLCompanyCreateInput>
  update?: Maybe<GQLCompanyUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLCompanyWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLCompanyUpdateWithNestedWhereUniqueInput = {
  where: GQLCompanyWhereUniqueInput
  data: GQLCompanyUpdateInput
}

export type GQLCompanyUpsertInput = {
  create: GQLCompanyCreateInput
  update: GQLCompanyUpdateInput
}

export type GQLCompanyUpsertWithNestedWhereUniqueInput = {
  where: GQLCompanyWhereUniqueInput
  data: GQLCompanyUpsertInput
}

export type GQLCompanyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLCompanyWhereInput>>
  OR?: Maybe<Array<GQLCompanyWhereInput>>
  NOT?: Maybe<Array<GQLCompanyWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  logo?: Maybe<GQLAssetWhereInput>
  rowCompanySlider_every?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_some?: Maybe<GQLRowCompanySliderWhereInput>
  rowCompanySlider_none?: Maybe<GQLRowCompanySliderWhereInput>
}

export type GQLCompanyWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type GQLConnectPositionInput = {
  after?: Maybe<Scalars['ID']>
  before?: Maybe<Scalars['ID']>
  start?: Maybe<Scalars['Boolean']>
  end?: Maybe<Scalars['Boolean']>
}

export enum GQLDocumentFileTypes {
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Png = 'png',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Docx = 'docx',
  Pdf = 'pdf',
  Html = 'html',
  Doc = 'doc',
  Xlsx = 'xlsx',
  Xls = 'xls',
  Pptx = 'pptx',
  Ppt = 'ppt',
}

export type GQLDocumentOutputInput = {
  format?: Maybe<GQLDocumentFileTypes>
}

export type GQLDocumentTransformationInput = {
  output?: Maybe<GQLDocumentOutputInput>
}

export enum GQLImageFit {
  Clip = 'clip',
  Crop = 'crop',
  Scale = 'scale',
  Max = 'max',
}

export type GQLImageResizeInput = {
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  fit?: Maybe<GQLImageFit>
}

export type GQLImageTransformationInput = {
  resize?: Maybe<GQLImageResizeInput>
}

export type GQLLinkExternal = GQLNode & {
  __typename?: 'LinkExternal'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLLinkExternal>
  documentInStages: Array<GQLLinkExternal>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<GQLRichText>
  rowHeroVideo: Array<GQLRowHero>
  url: Scalars['String']
  title: Scalars['String']
}

export type GQLLinkExternalLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLLinkExternalDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLLinkExternalRowHeroVideoArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkExternalConnectInput = {
  where: GQLLinkExternalWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLLinkExternalConnection = {
  __typename?: 'LinkExternalConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLLinkExternalEdge>
  aggregate: GQLAggregate
}

export type GQLLinkExternalCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['RichTextAST']>
  rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  url: Scalars['String']
  title: Scalars['String']
  localizations?: Maybe<GQLLinkExternalCreateLocalizationsInput>
}

export type GQLLinkExternalCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['RichTextAST']>
  url: Scalars['String']
  title: Scalars['String']
}

export type GQLLinkExternalCreateLocalizationInput = {
  data: GQLLinkExternalCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkExternalCreateLocalizationsInput = {
  create?: Maybe<Array<GQLLinkExternalCreateLocalizationInput>>
}

export type GQLLinkExternalCreateManyInlineInput = {
  create?: Maybe<Array<GQLLinkExternalCreateInput>>
  connect?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
}

export type GQLLinkExternalCreateOneInlineInput = {
  create?: Maybe<GQLLinkExternalCreateInput>
  connect?: Maybe<GQLLinkExternalWhereUniqueInput>
}

export type GQLLinkExternalEdge = {
  __typename?: 'LinkExternalEdge'
  node: GQLLinkExternal
  cursor: Scalars['String']
}

export type GQLLinkExternalManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkExternalWhereInput>>
  OR?: Maybe<Array<GQLLinkExternalWhereInput>>
  NOT?: Maybe<Array<GQLLinkExternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
}

export enum GQLLinkExternalOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export type GQLLinkExternalUpdateInput = {
  description?: Maybe<Scalars['RichTextAST']>
  rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  url?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  localizations?: Maybe<GQLLinkExternalUpdateLocalizationsInput>
}

export type GQLLinkExternalUpdateLocalizationDataInput = {
  description?: Maybe<Scalars['RichTextAST']>
  url: Scalars['String']
  title: Scalars['String']
}

export type GQLLinkExternalUpdateLocalizationInput = {
  data: GQLLinkExternalUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkExternalUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLLinkExternalCreateLocalizationInput>>
  update?: Maybe<Array<GQLLinkExternalUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLLinkExternalUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLLinkExternalUpdateManyInlineInput = {
  create?: Maybe<Array<GQLLinkExternalCreateInput>>
  connect?: Maybe<Array<GQLLinkExternalConnectInput>>
  set?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
  update?: Maybe<Array<GQLLinkExternalUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLLinkExternalUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
  delete?: Maybe<Array<GQLLinkExternalWhereUniqueInput>>
}

export type GQLLinkExternalUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLLinkExternalUpdateManyLocalizationInput>>
}

export type GQLLinkExternalUpdateManyLocalizationInput = {
  description?: Maybe<Scalars['RichTextAST']>
  url: Scalars['String']
  title: Scalars['String']
}

export type GQLLinkExternalUpdateManyWithNestedWhereInput = {
  where: GQLLinkExternalWhereInput
  data: GQLLinkExternalUpdateManyInput
}

export type GQLLinkExternalUpdateOneInlineInput = {
  create?: Maybe<GQLLinkExternalCreateInput>
  update?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLLinkExternalWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLLinkExternalUpdateWithNestedWhereUniqueInput = {
  where: GQLLinkExternalWhereUniqueInput
  data: GQLLinkExternalUpdateInput
}

export type GQLLinkExternalUpsertInput = {
  create: GQLLinkExternalCreateInput
  update: GQLLinkExternalUpdateInput
}

export type GQLLinkExternalUpsertLocalizationInput = {
  update: GQLLinkExternalUpdateLocalizationDataInput
  create: GQLLinkExternalCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkExternalUpsertWithNestedWhereUniqueInput = {
  where: GQLLinkExternalWhereUniqueInput
  data: GQLLinkExternalUpsertInput
}

export type GQLLinkExternalWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkExternalWhereInput>>
  OR?: Maybe<Array<GQLLinkExternalWhereInput>>
  NOT?: Maybe<Array<GQLLinkExternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Scalars['String']>>
  url_not_in?: Maybe<Array<Scalars['String']>>
  url_contains?: Maybe<Scalars['String']>
  url_not_contains?: Maybe<Scalars['String']>
  url_starts_with?: Maybe<Scalars['String']>
  url_not_starts_with?: Maybe<Scalars['String']>
  url_ends_with?: Maybe<Scalars['String']>
  url_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLLinkExternalWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLLinkInternal = GQLNode & {
  __typename?: 'LinkInternal'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLLinkInternal>
  documentInStages: Array<GQLLinkInternal>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  list: Array<GQLZzDeleteList>
  description?: Maybe<GQLRichText>
  page?: Maybe<GQLPage>
  rowPeopleWithText: Array<GQLRowPeopleWithText>
  rowServicesWithText: Array<GQLRowServicesWithText>
  rowHeroVideo: Array<GQLRowHero>
}

export type GQLLinkInternalLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLLinkInternalDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLLinkInternalListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkInternalRowPeopleWithTextArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkInternalRowServicesWithTextArgs = {
  where?: Maybe<GQLRowServicesWithTextWhereInput>
  orderBy?: Maybe<GQLRowServicesWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkInternalRowHeroVideoArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkInternalConnectInput = {
  where: GQLLinkInternalWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLLinkInternalConnection = {
  __typename?: 'LinkInternalConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLLinkInternalEdge>
  aggregate: GQLAggregate
}

export type GQLLinkInternalCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  description?: Maybe<Scalars['RichTextAST']>
  page?: Maybe<GQLPageCreateOneInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
  rowServicesWithText?: Maybe<GQLRowServicesWithTextCreateManyInlineInput>
  rowHeroVideo?: Maybe<GQLRowHeroCreateManyInlineInput>
  localizations?: Maybe<GQLLinkInternalCreateLocalizationsInput>
}

export type GQLLinkInternalCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
}

export type GQLLinkInternalCreateLocalizationInput = {
  data: GQLLinkInternalCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkInternalCreateLocalizationsInput = {
  create?: Maybe<Array<GQLLinkInternalCreateLocalizationInput>>
}

export type GQLLinkInternalCreateManyInlineInput = {
  create?: Maybe<Array<GQLLinkInternalCreateInput>>
  connect?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
}

export type GQLLinkInternalCreateOneInlineInput = {
  create?: Maybe<GQLLinkInternalCreateInput>
  connect?: Maybe<GQLLinkInternalWhereUniqueInput>
}

export type GQLLinkInternalEdge = {
  __typename?: 'LinkInternalEdge'
  node: GQLLinkInternal
  cursor: Scalars['String']
}

export type GQLLinkInternalManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkInternalWhereInput>>
  OR?: Maybe<Array<GQLLinkInternalWhereInput>>
  NOT?: Maybe<Array<GQLLinkInternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  page?: Maybe<GQLPageWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
}

export enum GQLLinkInternalOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export type GQLLinkInternalUpdateInput = {
  title?: Maybe<Scalars['String']>
  list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  description?: Maybe<Scalars['RichTextAST']>
  page?: Maybe<GQLPageUpdateOneInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
  rowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyInlineInput>
  rowHeroVideo?: Maybe<GQLRowHeroUpdateManyInlineInput>
  localizations?: Maybe<GQLLinkInternalUpdateLocalizationsInput>
}

export type GQLLinkInternalUpdateLocalizationDataInput = {
  title?: Maybe<Scalars['String']>
}

export type GQLLinkInternalUpdateLocalizationInput = {
  data: GQLLinkInternalUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkInternalUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLLinkInternalCreateLocalizationInput>>
  update?: Maybe<Array<GQLLinkInternalUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLLinkInternalUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLLinkInternalUpdateManyInlineInput = {
  create?: Maybe<Array<GQLLinkInternalCreateInput>>
  connect?: Maybe<Array<GQLLinkInternalConnectInput>>
  set?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
  update?: Maybe<Array<GQLLinkInternalUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLLinkInternalUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
  delete?: Maybe<Array<GQLLinkInternalWhereUniqueInput>>
}

export type GQLLinkInternalUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['RichTextAST']>
  localizations?: Maybe<Array<GQLLinkInternalUpdateManyLocalizationInput>>
}

export type GQLLinkInternalUpdateManyLocalizationInput = {
  title?: Maybe<Scalars['String']>
}

export type GQLLinkInternalUpdateManyWithNestedWhereInput = {
  where: GQLLinkInternalWhereInput
  data: GQLLinkInternalUpdateManyInput
}

export type GQLLinkInternalUpdateOneInlineInput = {
  create?: Maybe<GQLLinkInternalCreateInput>
  update?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLLinkInternalWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLLinkInternalUpdateWithNestedWhereUniqueInput = {
  where: GQLLinkInternalWhereUniqueInput
  data: GQLLinkInternalUpdateInput
}

export type GQLLinkInternalUpsertInput = {
  create: GQLLinkInternalCreateInput
  update: GQLLinkInternalUpdateInput
}

export type GQLLinkInternalUpsertLocalizationInput = {
  update: GQLLinkInternalUpdateLocalizationDataInput
  create: GQLLinkInternalCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLLinkInternalUpsertWithNestedWhereUniqueInput = {
  where: GQLLinkInternalWhereUniqueInput
  data: GQLLinkInternalUpsertInput
}

export type GQLLinkInternalWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkInternalWhereInput>>
  OR?: Maybe<Array<GQLLinkInternalWhereInput>>
  NOT?: Maybe<Array<GQLLinkInternalWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowServicesWithText_every?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_some?: Maybe<GQLRowServicesWithTextWhereInput>
  rowServicesWithText_none?: Maybe<GQLRowServicesWithTextWhereInput>
}

export type GQLLinkInternalWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLListItems = GQLPage | GQLPerson | GQLCompany | GQLRowHero | GQLLinkInternal

export type GQLListItemsConnectInput = {
  Page?: Maybe<GQLPageConnectInput>
  Person?: Maybe<GQLPersonConnectInput>
  Company?: Maybe<GQLCompanyConnectInput>
  RowHero?: Maybe<GQLRowHeroConnectInput>
  LinkInternal?: Maybe<GQLLinkInternalConnectInput>
}

export type GQLListItemsCreateInput = {
  Page?: Maybe<GQLPageCreateInput>
  Person?: Maybe<GQLPersonCreateInput>
  Company?: Maybe<GQLCompanyCreateInput>
  RowHero?: Maybe<GQLRowHeroCreateInput>
  LinkInternal?: Maybe<GQLLinkInternalCreateInput>
}

export type GQLListItemsCreateManyInlineInput = {
  create?: Maybe<Array<GQLListItemsCreateInput>>
  connect?: Maybe<Array<GQLListItemsWhereUniqueInput>>
}

export type GQLListItemsCreateOneInlineInput = {
  create?: Maybe<GQLListItemsCreateInput>
  connect?: Maybe<GQLListItemsWhereUniqueInput>
}

export type GQLListItemsUpdateInput = {
  Page?: Maybe<GQLPageUpdateInput>
  Person?: Maybe<GQLPersonUpdateInput>
  Company?: Maybe<GQLCompanyUpdateInput>
  RowHero?: Maybe<GQLRowHeroUpdateInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateInput>
}

export type GQLListItemsUpdateManyInlineInput = {
  create?: Maybe<Array<GQLListItemsCreateInput>>
  connect?: Maybe<Array<GQLListItemsConnectInput>>
  set?: Maybe<Array<GQLListItemsWhereUniqueInput>>
  update?: Maybe<Array<GQLListItemsUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLListItemsUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLListItemsWhereUniqueInput>>
  delete?: Maybe<Array<GQLListItemsWhereUniqueInput>>
}

export type GQLListItemsUpdateManyWithNestedWhereInput = {
  Page?: Maybe<GQLPageUpdateManyWithNestedWhereInput>
  Person?: Maybe<GQLPersonUpdateManyWithNestedWhereInput>
  Company?: Maybe<GQLCompanyUpdateManyWithNestedWhereInput>
  RowHero?: Maybe<GQLRowHeroUpdateManyWithNestedWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateManyWithNestedWhereInput>
}

export type GQLListItemsUpdateOneInlineInput = {
  create?: Maybe<GQLListItemsCreateInput>
  update?: Maybe<GQLListItemsUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLListItemsUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLListItemsWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLListItemsUpdateWithNestedWhereUniqueInput = {
  Page?: Maybe<GQLPageUpdateWithNestedWhereUniqueInput>
  Person?: Maybe<GQLPersonUpdateWithNestedWhereUniqueInput>
  Company?: Maybe<GQLCompanyUpdateWithNestedWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
}

export type GQLListItemsUpsertWithNestedWhereUniqueInput = {
  Page?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  Person?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  Company?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
}

export type GQLListItemsWhereInput = {
  Page?: Maybe<GQLPageWhereInput>
  Person?: Maybe<GQLPersonWhereInput>
  Company?: Maybe<GQLCompanyWhereInput>
  RowHero?: Maybe<GQLRowHeroWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereInput>
}

export type GQLListItemsWhereUniqueInput = {
  Page?: Maybe<GQLPageWhereUniqueInput>
  Person?: Maybe<GQLPersonWhereUniqueInput>
  Company?: Maybe<GQLCompanyWhereUniqueInput>
  RowHero?: Maybe<GQLRowHeroWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereUniqueInput>
}

export enum GQLLocale {
  Nl = 'nl',
  En = 'en',
}

export type GQLLocation = {
  __typename?: 'Location'
  latitude: Scalars['Float']
  longitude: Scalars['Float']
  distance: Scalars['Float']
}

export type GQLLocationDistanceArgs = {
  from: GQLLocationInput
}

export type GQLLocationInput = {
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export type GQLMenu = GQLNode & {
  __typename?: 'Menu'
  stage: GQLStage
  documentInStages: Array<GQLMenu>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  pages: Array<GQLPage>
}

export type GQLMenuDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLMenuPagesArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLMenuConnectInput = {
  where: GQLMenuWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLMenuConnection = {
  __typename?: 'MenuConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLMenuEdge>
  aggregate: GQLAggregate
}

export type GQLMenuCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identity: Scalars['String']
  pages?: Maybe<GQLPageCreateManyInlineInput>
}

export type GQLMenuCreateManyInlineInput = {
  create?: Maybe<Array<GQLMenuCreateInput>>
  connect?: Maybe<Array<GQLMenuWhereUniqueInput>>
}

export type GQLMenuCreateOneInlineInput = {
  create?: Maybe<GQLMenuCreateInput>
  connect?: Maybe<GQLMenuWhereUniqueInput>
}

export type GQLMenuEdge = {
  __typename?: 'MenuEdge'
  node: GQLMenu
  cursor: Scalars['String']
}

export type GQLMenuManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLMenuWhereInput>>
  OR?: Maybe<Array<GQLMenuWhereInput>>
  NOT?: Maybe<Array<GQLMenuWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  identity_not?: Maybe<Scalars['String']>
  identity_in?: Maybe<Array<Scalars['String']>>
  identity_not_in?: Maybe<Array<Scalars['String']>>
  identity_contains?: Maybe<Scalars['String']>
  identity_not_contains?: Maybe<Scalars['String']>
  identity_starts_with?: Maybe<Scalars['String']>
  identity_not_starts_with?: Maybe<Scalars['String']>
  identity_ends_with?: Maybe<Scalars['String']>
  identity_not_ends_with?: Maybe<Scalars['String']>
  pages_every?: Maybe<GQLPageWhereInput>
  pages_some?: Maybe<GQLPageWhereInput>
  pages_none?: Maybe<GQLPageWhereInput>
}

export enum GQLMenuOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  IdentityAsc = 'identity_ASC',
  IdentityDesc = 'identity_DESC',
}

export type GQLMenuUpdateInput = {
  identity?: Maybe<Scalars['String']>
  pages?: Maybe<GQLPageUpdateManyInlineInput>
}

export type GQLMenuUpdateManyInlineInput = {
  create?: Maybe<Array<GQLMenuCreateInput>>
  connect?: Maybe<Array<GQLMenuConnectInput>>
  set?: Maybe<Array<GQLMenuWhereUniqueInput>>
  update?: Maybe<Array<GQLMenuUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLMenuUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLMenuWhereUniqueInput>>
  delete?: Maybe<Array<GQLMenuWhereUniqueInput>>
}

export type GQLMenuUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLMenuUpdateManyWithNestedWhereInput = {
  where: GQLMenuWhereInput
  data: GQLMenuUpdateManyInput
}

export type GQLMenuUpdateOneInlineInput = {
  create?: Maybe<GQLMenuCreateInput>
  update?: Maybe<GQLMenuUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLMenuUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLMenuWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLMenuUpdateWithNestedWhereUniqueInput = {
  where: GQLMenuWhereUniqueInput
  data: GQLMenuUpdateInput
}

export type GQLMenuUpsertInput = {
  create: GQLMenuCreateInput
  update: GQLMenuUpdateInput
}

export type GQLMenuUpsertWithNestedWhereUniqueInput = {
  where: GQLMenuWhereUniqueInput
  data: GQLMenuUpsertInput
}

export type GQLMenuWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLMenuWhereInput>>
  OR?: Maybe<Array<GQLMenuWhereInput>>
  NOT?: Maybe<Array<GQLMenuWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identity?: Maybe<Scalars['String']>
  identity_not?: Maybe<Scalars['String']>
  identity_in?: Maybe<Array<Scalars['String']>>
  identity_not_in?: Maybe<Array<Scalars['String']>>
  identity_contains?: Maybe<Scalars['String']>
  identity_not_contains?: Maybe<Scalars['String']>
  identity_starts_with?: Maybe<Scalars['String']>
  identity_not_starts_with?: Maybe<Scalars['String']>
  identity_ends_with?: Maybe<Scalars['String']>
  identity_not_ends_with?: Maybe<Scalars['String']>
  pages_every?: Maybe<GQLPageWhereInput>
  pages_some?: Maybe<GQLPageWhereInput>
  pages_none?: Maybe<GQLPageWhereInput>
}

export type GQLMenuWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identity?: Maybe<Scalars['String']>
}

export enum GQLMetaRobots {
  IndexFollow = 'INDEX_FOLLOW',
  IndexNofollow = 'INDEX_NOFOLLOW',
  NoindexFollow = 'NOINDEX_FOLLOW',
  NoindexNofollow = 'NOINDEX_NOFOLLOW',
}

export type GQLMutation = {
  __typename?: 'Mutation'
  /** @deprecated Asset mutations will be overhauled soon */
  createAsset?: Maybe<GQLAsset>
  updateAsset?: Maybe<GQLAsset>
  deleteAsset?: Maybe<GQLAsset>
  upsertAsset?: Maybe<GQLAsset>
  publishAsset?: Maybe<GQLAsset>
  unpublishAsset?: Maybe<GQLAsset>
  updateManyAssets: GQLBatchPayload
  deleteManyAssets: GQLBatchPayload
  publishManyAssets: GQLBatchPayload
  unpublishManyAssets: GQLBatchPayload
  createCompany?: Maybe<GQLCompany>
  updateCompany?: Maybe<GQLCompany>
  deleteCompany?: Maybe<GQLCompany>
  upsertCompany?: Maybe<GQLCompany>
  publishCompany?: Maybe<GQLCompany>
  unpublishCompany?: Maybe<GQLCompany>
  updateManyCompanies: GQLBatchPayload
  deleteManyCompanies: GQLBatchPayload
  publishManyCompanies: GQLBatchPayload
  unpublishManyCompanies: GQLBatchPayload
  createLinkExternal?: Maybe<GQLLinkExternal>
  updateLinkExternal?: Maybe<GQLLinkExternal>
  deleteLinkExternal?: Maybe<GQLLinkExternal>
  upsertLinkExternal?: Maybe<GQLLinkExternal>
  publishLinkExternal?: Maybe<GQLLinkExternal>
  unpublishLinkExternal?: Maybe<GQLLinkExternal>
  updateManyLinkExternals: GQLBatchPayload
  deleteManyLinkExternals: GQLBatchPayload
  publishManyLinkExternals: GQLBatchPayload
  unpublishManyLinkExternals: GQLBatchPayload
  createLinkInternal?: Maybe<GQLLinkInternal>
  updateLinkInternal?: Maybe<GQLLinkInternal>
  deleteLinkInternal?: Maybe<GQLLinkInternal>
  upsertLinkInternal?: Maybe<GQLLinkInternal>
  publishLinkInternal?: Maybe<GQLLinkInternal>
  unpublishLinkInternal?: Maybe<GQLLinkInternal>
  updateManyLinkInternals: GQLBatchPayload
  deleteManyLinkInternals: GQLBatchPayload
  publishManyLinkInternals: GQLBatchPayload
  unpublishManyLinkInternals: GQLBatchPayload
  createMenu?: Maybe<GQLMenu>
  updateMenu?: Maybe<GQLMenu>
  deleteMenu?: Maybe<GQLMenu>
  upsertMenu?: Maybe<GQLMenu>
  publishMenu?: Maybe<GQLMenu>
  unpublishMenu?: Maybe<GQLMenu>
  updateManyMenus: GQLBatchPayload
  deleteManyMenus: GQLBatchPayload
  publishManyMenus: GQLBatchPayload
  unpublishManyMenus: GQLBatchPayload
  createPage?: Maybe<GQLPage>
  updatePage?: Maybe<GQLPage>
  deletePage?: Maybe<GQLPage>
  upsertPage?: Maybe<GQLPage>
  publishPage?: Maybe<GQLPage>
  unpublishPage?: Maybe<GQLPage>
  updateManyPages: GQLBatchPayload
  deleteManyPages: GQLBatchPayload
  publishManyPages: GQLBatchPayload
  unpublishManyPages: GQLBatchPayload
  createPerson?: Maybe<GQLPerson>
  updatePerson?: Maybe<GQLPerson>
  deletePerson?: Maybe<GQLPerson>
  upsertPerson?: Maybe<GQLPerson>
  publishPerson?: Maybe<GQLPerson>
  unpublishPerson?: Maybe<GQLPerson>
  updateManyPeople: GQLBatchPayload
  deleteManyPeople: GQLBatchPayload
  publishManyPeople: GQLBatchPayload
  unpublishManyPeople: GQLBatchPayload
  createPersonList?: Maybe<GQLPersonList>
  updatePersonList?: Maybe<GQLPersonList>
  deletePersonList?: Maybe<GQLPersonList>
  upsertPersonList?: Maybe<GQLPersonList>
  publishPersonList?: Maybe<GQLPersonList>
  unpublishPersonList?: Maybe<GQLPersonList>
  updateManyPersonLists: GQLBatchPayload
  deleteManyPersonLists: GQLBatchPayload
  publishManyPersonLists: GQLBatchPayload
  unpublishManyPersonLists: GQLBatchPayload
  createRowColumnOne?: Maybe<GQLRowColumnOne>
  updateRowColumnOne?: Maybe<GQLRowColumnOne>
  deleteRowColumnOne?: Maybe<GQLRowColumnOne>
  upsertRowColumnOne?: Maybe<GQLRowColumnOne>
  publishRowColumnOne?: Maybe<GQLRowColumnOne>
  unpublishRowColumnOne?: Maybe<GQLRowColumnOne>
  updateManyRowColumnOnes: GQLBatchPayload
  deleteManyRowColumnOnes: GQLBatchPayload
  publishManyRowColumnOnes: GQLBatchPayload
  unpublishManyRowColumnOnes: GQLBatchPayload
  createRowColumnThree?: Maybe<GQLRowColumnThree>
  updateRowColumnThree?: Maybe<GQLRowColumnThree>
  deleteRowColumnThree?: Maybe<GQLRowColumnThree>
  upsertRowColumnThree?: Maybe<GQLRowColumnThree>
  publishRowColumnThree?: Maybe<GQLRowColumnThree>
  unpublishRowColumnThree?: Maybe<GQLRowColumnThree>
  updateManyRowColumnThrees: GQLBatchPayload
  deleteManyRowColumnThrees: GQLBatchPayload
  publishManyRowColumnThrees: GQLBatchPayload
  unpublishManyRowColumnThrees: GQLBatchPayload
  createRowColumnTwo?: Maybe<GQLRowColumnTwo>
  updateRowColumnTwo?: Maybe<GQLRowColumnTwo>
  deleteRowColumnTwo?: Maybe<GQLRowColumnTwo>
  upsertRowColumnTwo?: Maybe<GQLRowColumnTwo>
  publishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  unpublishRowColumnTwo?: Maybe<GQLRowColumnTwo>
  updateManyRowColumnTwos: GQLBatchPayload
  deleteManyRowColumnTwos: GQLBatchPayload
  publishManyRowColumnTwos: GQLBatchPayload
  unpublishManyRowColumnTwos: GQLBatchPayload
  createRowCompanySlider?: Maybe<GQLRowCompanySlider>
  updateRowCompanySlider?: Maybe<GQLRowCompanySlider>
  deleteRowCompanySlider?: Maybe<GQLRowCompanySlider>
  upsertRowCompanySlider?: Maybe<GQLRowCompanySlider>
  publishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  unpublishRowCompanySlider?: Maybe<GQLRowCompanySlider>
  updateManyRowCompanySliders: GQLBatchPayload
  deleteManyRowCompanySliders: GQLBatchPayload
  publishManyRowCompanySliders: GQLBatchPayload
  unpublishManyRowCompanySliders: GQLBatchPayload
  createRowHero?: Maybe<GQLRowHero>
  updateRowHero?: Maybe<GQLRowHero>
  deleteRowHero?: Maybe<GQLRowHero>
  upsertRowHero?: Maybe<GQLRowHero>
  publishRowHero?: Maybe<GQLRowHero>
  unpublishRowHero?: Maybe<GQLRowHero>
  updateManyRowHeroes: GQLBatchPayload
  deleteManyRowHeroes: GQLBatchPayload
  publishManyRowHeroes: GQLBatchPayload
  unpublishManyRowHeroes: GQLBatchPayload
  createRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  updateRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  deleteRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  upsertRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  publishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  unpublishRowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  updateManyRowPeopleWithTexts: GQLBatchPayload
  deleteManyRowPeopleWithTexts: GQLBatchPayload
  publishManyRowPeopleWithTexts: GQLBatchPayload
  unpublishManyRowPeopleWithTexts: GQLBatchPayload
  createRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  updateRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  deleteRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  upsertRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  publishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  unpublishRowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  updateManyRowRecentBlogPosts: GQLBatchPayload
  deleteManyRowRecentBlogPosts: GQLBatchPayload
  publishManyRowRecentBlogPosts: GQLBatchPayload
  unpublishManyRowRecentBlogPosts: GQLBatchPayload
  createRowServicesWithText?: Maybe<GQLRowServicesWithText>
  updateRowServicesWithText?: Maybe<GQLRowServicesWithText>
  deleteRowServicesWithText?: Maybe<GQLRowServicesWithText>
  upsertRowServicesWithText?: Maybe<GQLRowServicesWithText>
  publishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  unpublishRowServicesWithText?: Maybe<GQLRowServicesWithText>
  updateManyRowServicesWithTexts: GQLBatchPayload
  deleteManyRowServicesWithTexts: GQLBatchPayload
  publishManyRowServicesWithTexts: GQLBatchPayload
  unpublishManyRowServicesWithTexts: GQLBatchPayload
  createZzDeleteList?: Maybe<GQLZzDeleteList>
  updateZzDeleteList?: Maybe<GQLZzDeleteList>
  deleteZzDeleteList?: Maybe<GQLZzDeleteList>
  upsertZzDeleteList?: Maybe<GQLZzDeleteList>
  publishZzDeleteList?: Maybe<GQLZzDeleteList>
  unpublishZzDeleteList?: Maybe<GQLZzDeleteList>
  updateManyZzDeleteLists: GQLBatchPayload
  deleteManyZzDeleteLists: GQLBatchPayload
  publishManyZzDeleteLists: GQLBatchPayload
  unpublishManyZzDeleteLists: GQLBatchPayload
}

export type GQLMutationCreateAssetArgs = {
  data: GQLAssetCreateInput
}

export type GQLMutationUpdateAssetArgs = {
  where: GQLAssetWhereUniqueInput
  data: GQLAssetUpdateInput
}

export type GQLMutationDeleteAssetArgs = {
  where: GQLAssetWhereUniqueInput
}

export type GQLMutationUpsertAssetArgs = {
  where: GQLAssetWhereUniqueInput
  upsert: GQLAssetUpsertInput
}

export type GQLMutationPublishAssetArgs = {
  where: GQLAssetWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishAssetArgs = {
  where: GQLAssetWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  data: GQLAssetUpdateManyInput
}

export type GQLMutationDeleteManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
}

export type GQLMutationPublishManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyAssetsArgs = {
  where?: Maybe<GQLAssetManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateCompanyArgs = {
  data: GQLCompanyCreateInput
}

export type GQLMutationUpdateCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  data: GQLCompanyUpdateInput
}

export type GQLMutationDeleteCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
}

export type GQLMutationUpsertCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  upsert: GQLCompanyUpsertInput
}

export type GQLMutationPublishCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  data: GQLCompanyUpdateManyInput
}

export type GQLMutationDeleteManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
}

export type GQLMutationPublishManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateLinkExternalArgs = {
  data: GQLLinkExternalCreateInput
}

export type GQLMutationUpdateLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  data: GQLLinkExternalUpdateInput
}

export type GQLMutationDeleteLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
}

export type GQLMutationUpsertLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  upsert: GQLLinkExternalUpsertInput
}

export type GQLMutationPublishLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  data: GQLLinkExternalUpdateManyInput
}

export type GQLMutationDeleteManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
}

export type GQLMutationPublishManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyLinkExternalsArgs = {
  where?: Maybe<GQLLinkExternalManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateLinkInternalArgs = {
  data: GQLLinkInternalCreateInput
}

export type GQLMutationUpdateLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  data: GQLLinkInternalUpdateInput
}

export type GQLMutationDeleteLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
}

export type GQLMutationUpsertLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  upsert: GQLLinkInternalUpsertInput
}

export type GQLMutationPublishLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  data: GQLLinkInternalUpdateManyInput
}

export type GQLMutationDeleteManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
}

export type GQLMutationPublishManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyLinkInternalsArgs = {
  where?: Maybe<GQLLinkInternalManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateMenuArgs = {
  data: GQLMenuCreateInput
}

export type GQLMutationUpdateMenuArgs = {
  where: GQLMenuWhereUniqueInput
  data: GQLMenuUpdateInput
}

export type GQLMutationDeleteMenuArgs = {
  where: GQLMenuWhereUniqueInput
}

export type GQLMutationUpsertMenuArgs = {
  where: GQLMenuWhereUniqueInput
  upsert: GQLMenuUpsertInput
}

export type GQLMutationPublishMenuArgs = {
  where: GQLMenuWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishMenuArgs = {
  where: GQLMenuWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  data: GQLMenuUpdateManyInput
}

export type GQLMutationDeleteManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
}

export type GQLMutationPublishManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyMenusArgs = {
  where?: Maybe<GQLMenuManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreatePageArgs = {
  data: GQLPageCreateInput
}

export type GQLMutationUpdatePageArgs = {
  where: GQLPageWhereUniqueInput
  data: GQLPageUpdateInput
}

export type GQLMutationDeletePageArgs = {
  where: GQLPageWhereUniqueInput
}

export type GQLMutationUpsertPageArgs = {
  where: GQLPageWhereUniqueInput
  upsert: GQLPageUpsertInput
}

export type GQLMutationPublishPageArgs = {
  where: GQLPageWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishPageArgs = {
  where: GQLPageWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  data: GQLPageUpdateManyInput
}

export type GQLMutationDeleteManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
}

export type GQLMutationPublishManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyPagesArgs = {
  where?: Maybe<GQLPageManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreatePersonArgs = {
  data: GQLPersonCreateInput
}

export type GQLMutationUpdatePersonArgs = {
  where: GQLPersonWhereUniqueInput
  data: GQLPersonUpdateInput
}

export type GQLMutationDeletePersonArgs = {
  where: GQLPersonWhereUniqueInput
}

export type GQLMutationUpsertPersonArgs = {
  where: GQLPersonWhereUniqueInput
  upsert: GQLPersonUpsertInput
}

export type GQLMutationPublishPersonArgs = {
  where: GQLPersonWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishPersonArgs = {
  where: GQLPersonWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  data: GQLPersonUpdateManyInput
}

export type GQLMutationDeleteManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
}

export type GQLMutationPublishManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreatePersonListArgs = {
  data: GQLPersonListCreateInput
}

export type GQLMutationUpdatePersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  data: GQLPersonListUpdateInput
}

export type GQLMutationDeletePersonListArgs = {
  where: GQLPersonListWhereUniqueInput
}

export type GQLMutationUpsertPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  upsert: GQLPersonListUpsertInput
}

export type GQLMutationPublishPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  data: GQLPersonListUpdateManyInput
}

export type GQLMutationDeleteManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
}

export type GQLMutationPublishManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyPersonListsArgs = {
  where?: Maybe<GQLPersonListManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateRowColumnOneArgs = {
  data: GQLRowColumnOneCreateInput
}

export type GQLMutationUpdateRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  data: GQLRowColumnOneUpdateInput
}

export type GQLMutationDeleteRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
}

export type GQLMutationUpsertRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  upsert: GQLRowColumnOneUpsertInput
}

export type GQLMutationPublishRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  data: GQLRowColumnOneUpdateManyInput
}

export type GQLMutationDeleteManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
}

export type GQLMutationPublishManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateRowColumnThreeArgs = {
  data: GQLRowColumnThreeCreateInput
}

export type GQLMutationUpdateRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  data: GQLRowColumnThreeUpdateInput
}

export type GQLMutationDeleteRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
}

export type GQLMutationUpsertRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  upsert: GQLRowColumnThreeUpsertInput
}

export type GQLMutationPublishRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  data: GQLRowColumnThreeUpdateManyInput
}

export type GQLMutationDeleteManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
}

export type GQLMutationPublishManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyRowColumnThreesArgs = {
  where?: Maybe<GQLRowColumnThreeManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateRowColumnTwoArgs = {
  data: GQLRowColumnTwoCreateInput
}

export type GQLMutationUpdateRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  data: GQLRowColumnTwoUpdateInput
}

export type GQLMutationDeleteRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
}

export type GQLMutationUpsertRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  upsert: GQLRowColumnTwoUpsertInput
}

export type GQLMutationPublishRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  data: GQLRowColumnTwoUpdateManyInput
}

export type GQLMutationDeleteManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
}

export type GQLMutationPublishManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyRowColumnTwosArgs = {
  where?: Maybe<GQLRowColumnTwoManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateRowCompanySliderArgs = {
  data: GQLRowCompanySliderCreateInput
}

export type GQLMutationUpdateRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  data: GQLRowCompanySliderUpdateInput
}

export type GQLMutationDeleteRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
}

export type GQLMutationUpsertRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  upsert: GQLRowCompanySliderUpsertInput
}

export type GQLMutationPublishRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  data: GQLRowCompanySliderUpdateManyInput
}

export type GQLMutationDeleteManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
}

export type GQLMutationPublishManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateRowHeroArgs = {
  data: GQLRowHeroCreateInput
}

export type GQLMutationUpdateRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  data: GQLRowHeroUpdateInput
}

export type GQLMutationDeleteRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
}

export type GQLMutationUpsertRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  upsert: GQLRowHeroUpsertInput
}

export type GQLMutationPublishRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  data: GQLRowHeroUpdateManyInput
}

export type GQLMutationDeleteManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
}

export type GQLMutationPublishManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyRowHeroesArgs = {
  where?: Maybe<GQLRowHeroManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateRowPeopleWithTextArgs = {
  data: GQLRowPeopleWithTextCreateInput
}

export type GQLMutationUpdateRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  data: GQLRowPeopleWithTextUpdateInput
}

export type GQLMutationDeleteRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
}

export type GQLMutationUpsertRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  upsert: GQLRowPeopleWithTextUpsertInput
}

export type GQLMutationPublishRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  data: GQLRowPeopleWithTextUpdateManyInput
}

export type GQLMutationDeleteManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
}

export type GQLMutationPublishManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyRowPeopleWithTextsArgs = {
  where?: Maybe<GQLRowPeopleWithTextManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateRowRecentBlogPostArgs = {
  data: GQLRowRecentBlogPostCreateInput
}

export type GQLMutationUpdateRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  data: GQLRowRecentBlogPostUpdateInput
}

export type GQLMutationDeleteRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
}

export type GQLMutationUpsertRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  upsert: GQLRowRecentBlogPostUpsertInput
}

export type GQLMutationPublishRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  data: GQLRowRecentBlogPostUpdateManyInput
}

export type GQLMutationDeleteManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
}

export type GQLMutationPublishManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLMutationCreateRowServicesWithTextArgs = {
  data: GQLRowServicesWithTextCreateInput
}

export type GQLMutationUpdateRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  data: GQLRowServicesWithTextUpdateInput
}

export type GQLMutationDeleteRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
}

export type GQLMutationUpsertRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  upsert: GQLRowServicesWithTextUpsertInput
}

export type GQLMutationPublishRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUpdateManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  data: GQLRowServicesWithTextUpdateManyInput
}

export type GQLMutationDeleteManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
}

export type GQLMutationPublishManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  to?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyRowServicesWithTextsArgs = {
  where?: Maybe<GQLRowServicesWithTextManyWhereInput>
  from?: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  unpublishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationCreateZzDeleteListArgs = {
  data: GQLZzDeleteListCreateInput
}

export type GQLMutationUpdateZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  data: GQLZzDeleteListUpdateInput
}

export type GQLMutationDeleteZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
}

export type GQLMutationUpsertZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  upsert: GQLZzDeleteListUpsertInput
}

export type GQLMutationPublishZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  from?: Array<GQLStage>
}

export type GQLMutationUpdateManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  data: GQLZzDeleteListUpdateManyInput
}

export type GQLMutationDeleteManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
}

export type GQLMutationPublishManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishManyZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListManyWhereInput>
  from?: Array<GQLStage>
}

export type GQLNode = {
  id: Scalars['ID']
  stage: GQLStage
}

export type GQLPage = GQLNode & {
  __typename?: 'Page'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLPage>
  documentInStages: Array<GQLPage>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  content: Array<GQLPageContent>
  metaRobots?: Maybe<GQLMetaRobots>
  list: Array<GQLZzDeleteList>
  content2: Array<GQLPageContent2>
  internalLink: Array<GQLLinkInternal>
  menu: Array<GQLMenu>
}

export type GQLPageLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLPageDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLPageContentArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPageListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPageContent2Args = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPageInternalLinkArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPageMenuArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPageConnectInput = {
  where: GQLPageWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLPageConnection = {
  __typename?: 'PageConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLPageEdge>
  aggregate: GQLAggregate
}

export type GQLPageContent = GQLRowHero

export type GQLPageContent2 =
  | GQLRowColumnThree
  | GQLRowColumnTwo
  | GQLRowRecentBlogPost
  | GQLRowPeopleWithText
  | GQLRowColumnOne
  | GQLRowCompanySlider
  | GQLRowServicesWithText

export type GQLPageContent2ConnectInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeConnectInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoConnectInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostConnectInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextConnectInput>
  RowColumnOne?: Maybe<GQLRowColumnOneConnectInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderConnectInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextConnectInput>
}

export type GQLPageContent2CreateInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeCreateInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoCreateInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostCreateInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateInput>
  RowColumnOne?: Maybe<GQLRowColumnOneCreateInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderCreateInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextCreateInput>
}

export type GQLPageContent2CreateManyInlineInput = {
  create?: Maybe<Array<GQLPageContent2CreateInput>>
  connect?: Maybe<Array<GQLPageContent2WhereUniqueInput>>
}

export type GQLPageContent2CreateOneInlineInput = {
  create?: Maybe<GQLPageContent2CreateInput>
  connect?: Maybe<GQLPageContent2WhereUniqueInput>
}

export type GQLPageContent2UpdateInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateInput>
}

export type GQLPageContent2UpdateManyInlineInput = {
  create?: Maybe<Array<GQLPageContent2CreateInput>>
  connect?: Maybe<Array<GQLPageContent2ConnectInput>>
  set?: Maybe<Array<GQLPageContent2WhereUniqueInput>>
  update?: Maybe<Array<GQLPageContent2UpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLPageContent2UpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLPageContent2WhereUniqueInput>>
  delete?: Maybe<Array<GQLPageContent2WhereUniqueInput>>
}

export type GQLPageContent2UpdateManyWithNestedWhereInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateManyWithNestedWhereInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateManyWithNestedWhereInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateManyWithNestedWhereInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyWithNestedWhereInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateManyWithNestedWhereInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateManyWithNestedWhereInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateManyWithNestedWhereInput>
}

export type GQLPageContent2UpdateOneInlineInput = {
  create?: Maybe<GQLPageContent2CreateInput>
  update?: Maybe<GQLPageContent2UpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLPageContent2UpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLPageContent2WhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLPageContent2UpdateWithNestedWhereUniqueInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
}

export type GQLPageContent2UpsertWithNestedWhereUniqueInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
}

export type GQLPageContent2WhereInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeWhereInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoWhereInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereInput>
  RowColumnOne?: Maybe<GQLRowColumnOneWhereInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderWhereInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereInput>
}

export type GQLPageContent2WhereUniqueInput = {
  RowColumnThree?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  RowColumnTwo?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  RowRecentBlogPost?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  RowPeopleWithText?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  RowColumnOne?: Maybe<GQLRowColumnOneWhereUniqueInput>
  RowCompanySlider?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  RowServicesWithText?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
}

export type GQLPageContentConnectInput = {
  RowHero?: Maybe<GQLRowHeroConnectInput>
}

export type GQLPageContentCreateInput = {
  RowHero?: Maybe<GQLRowHeroCreateInput>
}

export type GQLPageContentCreateManyInlineInput = {
  create?: Maybe<Array<GQLPageContentCreateInput>>
  connect?: Maybe<Array<GQLPageContentWhereUniqueInput>>
}

export type GQLPageContentCreateOneInlineInput = {
  create?: Maybe<GQLPageContentCreateInput>
  connect?: Maybe<GQLPageContentWhereUniqueInput>
}

export type GQLPageContentUpdateInput = {
  RowHero?: Maybe<GQLRowHeroUpdateInput>
}

export type GQLPageContentUpdateManyInlineInput = {
  create?: Maybe<Array<GQLPageContentCreateInput>>
  connect?: Maybe<Array<GQLPageContentConnectInput>>
  set?: Maybe<Array<GQLPageContentWhereUniqueInput>>
  update?: Maybe<Array<GQLPageContentUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLPageContentUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLPageContentWhereUniqueInput>>
  delete?: Maybe<Array<GQLPageContentWhereUniqueInput>>
}

export type GQLPageContentUpdateManyWithNestedWhereInput = {
  RowHero?: Maybe<GQLRowHeroUpdateManyWithNestedWhereInput>
}

export type GQLPageContentUpdateOneInlineInput = {
  create?: Maybe<GQLPageContentCreateInput>
  update?: Maybe<GQLPageContentUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLPageContentUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLPageContentWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLPageContentUpdateWithNestedWhereUniqueInput = {
  RowHero?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
}

export type GQLPageContentUpsertWithNestedWhereUniqueInput = {
  RowHero?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
}

export type GQLPageContentWhereInput = {
  RowHero?: Maybe<GQLRowHeroWhereInput>
}

export type GQLPageContentWhereUniqueInput = {
  RowHero?: Maybe<GQLRowHeroWhereUniqueInput>
}

export type GQLPageCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
  content?: Maybe<GQLPageContentCreateManyInlineInput>
  metaRobots?: Maybe<GQLMetaRobots>
  list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
  content2?: Maybe<GQLPageContent2CreateManyInlineInput>
  internalLink?: Maybe<GQLLinkInternalCreateManyInlineInput>
  menu?: Maybe<GQLMenuCreateManyInlineInput>
  localizations?: Maybe<GQLPageCreateLocalizationsInput>
}

export type GQLPageCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
}

export type GQLPageCreateLocalizationInput = {
  data: GQLPageCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLPageCreateLocalizationsInput = {
  create?: Maybe<Array<GQLPageCreateLocalizationInput>>
}

export type GQLPageCreateManyInlineInput = {
  create?: Maybe<Array<GQLPageCreateInput>>
  connect?: Maybe<Array<GQLPageWhereUniqueInput>>
}

export type GQLPageCreateOneInlineInput = {
  create?: Maybe<GQLPageCreateInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageEdge = {
  __typename?: 'PageEdge'
  node: GQLPage
  cursor: Scalars['String']
}

export type GQLPageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export type GQLPageManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPageWhereInput>>
  OR?: Maybe<Array<GQLPageWhereInput>>
  NOT?: Maybe<Array<GQLPageWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  metaRobots?: Maybe<GQLMetaRobots>
  metaRobots_not?: Maybe<GQLMetaRobots>
  metaRobots_in?: Maybe<Array<GQLMetaRobots>>
  metaRobots_not_in?: Maybe<Array<GQLMetaRobots>>
  internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  menu_every?: Maybe<GQLMenuWhereInput>
  menu_some?: Maybe<GQLMenuWhereInput>
  menu_none?: Maybe<GQLMenuWhereInput>
}

export enum GQLPageOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  MetaTitleAsc = 'metaTitle_ASC',
  MetaTitleDesc = 'metaTitle_DESC',
  MetaDescriptionAsc = 'metaDescription_ASC',
  MetaDescriptionDesc = 'metaDescription_DESC',
  MetaRobotsAsc = 'metaRobots_ASC',
  MetaRobotsDesc = 'metaRobots_DESC',
}

export type GQLPageUpdateInput = {
  url?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  content?: Maybe<GQLPageContentUpdateManyInlineInput>
  metaRobots?: Maybe<GQLMetaRobots>
  list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
  content2?: Maybe<GQLPageContent2UpdateManyInlineInput>
  internalLink?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  menu?: Maybe<GQLMenuUpdateManyInlineInput>
  localizations?: Maybe<GQLPageUpdateLocalizationsInput>
}

export type GQLPageUpdateLocalizationDataInput = {
  url: Scalars['String']
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
}

export type GQLPageUpdateLocalizationInput = {
  data: GQLPageUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLPageUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLPageCreateLocalizationInput>>
  update?: Maybe<Array<GQLPageUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLPageUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLPageUpdateManyInlineInput = {
  create?: Maybe<Array<GQLPageCreateInput>>
  connect?: Maybe<Array<GQLPageConnectInput>>
  set?: Maybe<Array<GQLPageWhereUniqueInput>>
  update?: Maybe<Array<GQLPageUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLPageUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLPageWhereUniqueInput>>
  delete?: Maybe<Array<GQLPageWhereUniqueInput>>
}

export type GQLPageUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  metaRobots?: Maybe<GQLMetaRobots>
  localizations?: Maybe<Array<GQLPageUpdateManyLocalizationInput>>
}

export type GQLPageUpdateManyLocalizationInput = {
  title: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription: Scalars['String']
}

export type GQLPageUpdateManyWithNestedWhereInput = {
  where: GQLPageWhereInput
  data: GQLPageUpdateManyInput
}

export type GQLPageUpdateOneInlineInput = {
  create?: Maybe<GQLPageCreateInput>
  update?: Maybe<GQLPageUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLPageUpdateWithNestedWhereUniqueInput = {
  where: GQLPageWhereUniqueInput
  data: GQLPageUpdateInput
}

export type GQLPageUpsertInput = {
  create: GQLPageCreateInput
  update: GQLPageUpdateInput
}

export type GQLPageUpsertLocalizationInput = {
  update: GQLPageUpdateLocalizationDataInput
  create: GQLPageCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLPageUpsertWithNestedWhereUniqueInput = {
  where: GQLPageWhereUniqueInput
  data: GQLPageUpsertInput
}

export type GQLPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPageWhereInput>>
  OR?: Maybe<Array<GQLPageWhereInput>>
  NOT?: Maybe<Array<GQLPageWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Scalars['String']>>
  url_not_in?: Maybe<Array<Scalars['String']>>
  url_contains?: Maybe<Scalars['String']>
  url_not_contains?: Maybe<Scalars['String']>
  url_starts_with?: Maybe<Scalars['String']>
  url_not_starts_with?: Maybe<Scalars['String']>
  url_ends_with?: Maybe<Scalars['String']>
  url_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaTitle_not?: Maybe<Scalars['String']>
  metaTitle_in?: Maybe<Array<Scalars['String']>>
  metaTitle_not_in?: Maybe<Array<Scalars['String']>>
  metaTitle_contains?: Maybe<Scalars['String']>
  metaTitle_not_contains?: Maybe<Scalars['String']>
  metaTitle_starts_with?: Maybe<Scalars['String']>
  metaTitle_not_starts_with?: Maybe<Scalars['String']>
  metaTitle_ends_with?: Maybe<Scalars['String']>
  metaTitle_not_ends_with?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  metaDescription_not?: Maybe<Scalars['String']>
  metaDescription_in?: Maybe<Array<Scalars['String']>>
  metaDescription_not_in?: Maybe<Array<Scalars['String']>>
  metaDescription_contains?: Maybe<Scalars['String']>
  metaDescription_not_contains?: Maybe<Scalars['String']>
  metaDescription_starts_with?: Maybe<Scalars['String']>
  metaDescription_not_starts_with?: Maybe<Scalars['String']>
  metaDescription_ends_with?: Maybe<Scalars['String']>
  metaDescription_not_ends_with?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  metaRobots_not?: Maybe<GQLMetaRobots>
  metaRobots_in?: Maybe<Array<GQLMetaRobots>>
  metaRobots_not_in?: Maybe<Array<GQLMetaRobots>>
  internalLink_every?: Maybe<GQLLinkInternalWhereInput>
  internalLink_some?: Maybe<GQLLinkInternalWhereInput>
  internalLink_none?: Maybe<GQLLinkInternalWhereInput>
  menu_every?: Maybe<GQLMenuWhereInput>
  menu_some?: Maybe<GQLMenuWhereInput>
  menu_none?: Maybe<GQLMenuWhereInput>
}

export type GQLPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLPerson = GQLNode & {
  __typename?: 'Person'
  stage: GQLStage
  documentInStages: Array<GQLPerson>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  avatar: GQLAsset
  name: Scalars['String']
  personList: Array<GQLPersonList>
  list: Array<GQLZzDeleteList>
}

export type GQLPersonDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLPersonPersonListArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPersonListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPersonConnectInput = {
  where: GQLPersonWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLPersonConnection = {
  __typename?: 'PersonConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLPersonEdge>
  aggregate: GQLAggregate
}

export type GQLPersonCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  avatar: GQLAssetCreateOneInlineInput
  name: Scalars['String']
  personList?: Maybe<GQLPersonListCreateManyInlineInput>
  list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
}

export type GQLPersonCreateManyInlineInput = {
  create?: Maybe<Array<GQLPersonCreateInput>>
  connect?: Maybe<Array<GQLPersonWhereUniqueInput>>
}

export type GQLPersonCreateOneInlineInput = {
  create?: Maybe<GQLPersonCreateInput>
  connect?: Maybe<GQLPersonWhereUniqueInput>
}

export type GQLPersonEdge = {
  __typename?: 'PersonEdge'
  node: GQLPerson
  cursor: Scalars['String']
}

export type GQLPersonList = GQLNode & {
  __typename?: 'PersonList'
  stage: GQLStage
  documentInStages: Array<GQLPersonList>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  people: Array<GQLPerson>
  rowPeopleWithText: Array<GQLRowPeopleWithText>
}

export type GQLPersonListDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLPersonListPeopleArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPersonListRowPeopleWithTextArgs = {
  where?: Maybe<GQLRowPeopleWithTextWhereInput>
  orderBy?: Maybe<GQLRowPeopleWithTextOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLPersonListConnectInput = {
  where: GQLPersonListWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLPersonListConnection = {
  __typename?: 'PersonListConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLPersonListEdge>
  aggregate: GQLAggregate
}

export type GQLPersonListCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  people?: Maybe<GQLPersonCreateManyInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextCreateManyInlineInput>
}

export type GQLPersonListCreateManyInlineInput = {
  create?: Maybe<Array<GQLPersonListCreateInput>>
  connect?: Maybe<Array<GQLPersonListWhereUniqueInput>>
}

export type GQLPersonListCreateOneInlineInput = {
  create?: Maybe<GQLPersonListCreateInput>
  connect?: Maybe<GQLPersonListWhereUniqueInput>
}

export type GQLPersonListEdge = {
  __typename?: 'PersonListEdge'
  node: GQLPersonList
  cursor: Scalars['String']
}

export type GQLPersonListManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPersonListWhereInput>>
  OR?: Maybe<Array<GQLPersonListWhereInput>>
  NOT?: Maybe<Array<GQLPersonListWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  people_every?: Maybe<GQLPersonWhereInput>
  people_some?: Maybe<GQLPersonWhereInput>
  people_none?: Maybe<GQLPersonWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
}

export enum GQLPersonListOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLPersonListUpdateInput = {
  people?: Maybe<GQLPersonUpdateManyInlineInput>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithTextUpdateManyInlineInput>
}

export type GQLPersonListUpdateManyInlineInput = {
  create?: Maybe<Array<GQLPersonListCreateInput>>
  connect?: Maybe<Array<GQLPersonListConnectInput>>
  set?: Maybe<Array<GQLPersonListWhereUniqueInput>>
  update?: Maybe<Array<GQLPersonListUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLPersonListUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLPersonListWhereUniqueInput>>
  delete?: Maybe<Array<GQLPersonListWhereUniqueInput>>
}

export type GQLPersonListUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLPersonListUpdateManyWithNestedWhereInput = {
  where: GQLPersonListWhereInput
  data: GQLPersonListUpdateManyInput
}

export type GQLPersonListUpdateOneInlineInput = {
  create?: Maybe<GQLPersonListCreateInput>
  update?: Maybe<GQLPersonListUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLPersonListUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLPersonListWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLPersonListUpdateWithNestedWhereUniqueInput = {
  where: GQLPersonListWhereUniqueInput
  data: GQLPersonListUpdateInput
}

export type GQLPersonListUpsertInput = {
  create: GQLPersonListCreateInput
  update: GQLPersonListUpdateInput
}

export type GQLPersonListUpsertWithNestedWhereUniqueInput = {
  where: GQLPersonListWhereUniqueInput
  data: GQLPersonListUpsertInput
}

export type GQLPersonListWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPersonListWhereInput>>
  OR?: Maybe<Array<GQLPersonListWhereInput>>
  NOT?: Maybe<Array<GQLPersonListWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  people_every?: Maybe<GQLPersonWhereInput>
  people_some?: Maybe<GQLPersonWhereInput>
  people_none?: Maybe<GQLPersonWhereInput>
  rowPeopleWithText_every?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_some?: Maybe<GQLRowPeopleWithTextWhereInput>
  rowPeopleWithText_none?: Maybe<GQLRowPeopleWithTextWhereInput>
}

export type GQLPersonListWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLPersonManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPersonWhereInput>>
  OR?: Maybe<Array<GQLPersonWhereInput>>
  NOT?: Maybe<Array<GQLPersonWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  avatar?: Maybe<GQLAssetWhereInput>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  personList_every?: Maybe<GQLPersonListWhereInput>
  personList_some?: Maybe<GQLPersonListWhereInput>
  personList_none?: Maybe<GQLPersonListWhereInput>
}

export enum GQLPersonOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
}

export type GQLPersonUpdateInput = {
  avatar?: Maybe<GQLAssetUpdateOneInlineInput>
  name?: Maybe<Scalars['String']>
  personList?: Maybe<GQLPersonListUpdateManyInlineInput>
  list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
}

export type GQLPersonUpdateManyInlineInput = {
  create?: Maybe<Array<GQLPersonCreateInput>>
  connect?: Maybe<Array<GQLPersonConnectInput>>
  set?: Maybe<Array<GQLPersonWhereUniqueInput>>
  update?: Maybe<Array<GQLPersonUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLPersonUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLPersonWhereUniqueInput>>
  delete?: Maybe<Array<GQLPersonWhereUniqueInput>>
}

export type GQLPersonUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  name: Scalars['String']
}

export type GQLPersonUpdateManyWithNestedWhereInput = {
  where: GQLPersonWhereInput
  data: GQLPersonUpdateManyInput
}

export type GQLPersonUpdateOneInlineInput = {
  create?: Maybe<GQLPersonCreateInput>
  update?: Maybe<GQLPersonUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLPersonWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLPersonUpdateWithNestedWhereUniqueInput = {
  where: GQLPersonWhereUniqueInput
  data: GQLPersonUpdateInput
}

export type GQLPersonUpsertInput = {
  create: GQLPersonCreateInput
  update: GQLPersonUpdateInput
}

export type GQLPersonUpsertWithNestedWhereUniqueInput = {
  where: GQLPersonWhereUniqueInput
  data: GQLPersonUpsertInput
}

export type GQLPersonWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPersonWhereInput>>
  OR?: Maybe<Array<GQLPersonWhereInput>>
  NOT?: Maybe<Array<GQLPersonWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  avatar?: Maybe<GQLAssetWhereInput>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  personList_every?: Maybe<GQLPersonListWhereInput>
  personList_some?: Maybe<GQLPersonListWhereInput>
  personList_none?: Maybe<GQLPersonListWhereInput>
}

export type GQLPersonWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLPublishLocaleInput = {
  locale: GQLLocale
  stages: Array<GQLStage>
}

export type GQLQuery = {
  __typename?: 'Query'
  node?: Maybe<GQLNode>
  assets: Array<GQLAsset>
  asset?: Maybe<GQLAsset>
  assetsConnection: GQLAssetConnection
  companies: Array<GQLCompany>
  company?: Maybe<GQLCompany>
  companiesConnection: GQLCompanyConnection
  linkExternals: Array<GQLLinkExternal>
  linkExternal?: Maybe<GQLLinkExternal>
  linkExternalsConnection: GQLLinkExternalConnection
  linkInternals: Array<GQLLinkInternal>
  linkInternal?: Maybe<GQLLinkInternal>
  linkInternalsConnection: GQLLinkInternalConnection
  menus: Array<GQLMenu>
  menu?: Maybe<GQLMenu>
  menusConnection: GQLMenuConnection
  pages: Array<GQLPage>
  page?: Maybe<GQLPage>
  pagesConnection: GQLPageConnection
  people: Array<GQLPerson>
  person?: Maybe<GQLPerson>
  peopleConnection: GQLPersonConnection
  personLists: Array<GQLPersonList>
  personList?: Maybe<GQLPersonList>
  personListsConnection: GQLPersonListConnection
  rowColumnOnes: Array<GQLRowColumnOne>
  rowColumnOne?: Maybe<GQLRowColumnOne>
  rowColumnOnesConnection: GQLRowColumnOneConnection
  rowColumnThrees: Array<GQLRowColumnThree>
  rowColumnThree?: Maybe<GQLRowColumnThree>
  rowColumnThreesConnection: GQLRowColumnThreeConnection
  rowColumnTwos: Array<GQLRowColumnTwo>
  rowColumnTwo?: Maybe<GQLRowColumnTwo>
  rowColumnTwosConnection: GQLRowColumnTwoConnection
  rowCompanySliders: Array<GQLRowCompanySlider>
  rowCompanySlider?: Maybe<GQLRowCompanySlider>
  rowCompanySlidersConnection: GQLRowCompanySliderConnection
  rowHeroes: Array<GQLRowHero>
  rowHero?: Maybe<GQLRowHero>
  rowHeroesConnection: GQLRowHeroConnection
  rowPeopleWithTexts: Array<GQLRowPeopleWithText>
  rowPeopleWithText?: Maybe<GQLRowPeopleWithText>
  rowPeopleWithTextsConnection: GQLRowPeopleWithTextConnection
  rowRecentBlogPosts: Array<GQLRowRecentBlogPost>
  rowRecentBlogPost?: Maybe<GQLRowRecentBlogPost>
  rowRecentBlogPostsConnection: GQLRowRecentBlogPostConnection
  rowServicesWithTexts: Array<GQLRowServicesWithText>
  rowServicesWithText?: Maybe<GQLRowServicesWithText>
  rowServicesWithTextsConnection: GQLRowServicesWithTextConnection
  zzDeleteLists: Array<GQLZzDeleteList>
  zzDeleteList?: Maybe<GQLZzDeleteList>
  zzDeleteListsConnection: GQLZzDeleteListConnection
}

export type GQLQueryNodeArgs = {
  id: Scalars['ID']
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryAssetsArgs = {
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

export type GQLQueryAssetArgs = {
  where: GQLAssetWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryAssetsConnectionArgs = {
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

export type GQLQueryCompaniesArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryCompanyArgs = {
  where: GQLCompanyWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryCompaniesConnectionArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryLinkExternalsArgs = {
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

export type GQLQueryLinkExternalArgs = {
  where: GQLLinkExternalWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryLinkExternalsConnectionArgs = {
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

export type GQLQueryLinkInternalsArgs = {
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

export type GQLQueryLinkInternalArgs = {
  where: GQLLinkInternalWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryLinkInternalsConnectionArgs = {
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

export type GQLQueryMenusArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryMenuArgs = {
  where: GQLMenuWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryMenusConnectionArgs = {
  where?: Maybe<GQLMenuWhereInput>
  orderBy?: Maybe<GQLMenuOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryPagesArgs = {
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

export type GQLQueryPageArgs = {
  where: GQLPageWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryPagesConnectionArgs = {
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

export type GQLQueryPeopleArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryPersonArgs = {
  where: GQLPersonWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryPeopleConnectionArgs = {
  where?: Maybe<GQLPersonWhereInput>
  orderBy?: Maybe<GQLPersonOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryPersonListsArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryPersonListArgs = {
  where: GQLPersonListWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryPersonListsConnectionArgs = {
  where?: Maybe<GQLPersonListWhereInput>
  orderBy?: Maybe<GQLPersonListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowColumnOnesArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowColumnOneArgs = {
  where: GQLRowColumnOneWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryRowColumnOnesConnectionArgs = {
  where?: Maybe<GQLRowColumnOneWhereInput>
  orderBy?: Maybe<GQLRowColumnOneOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowColumnThreesArgs = {
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

export type GQLQueryRowColumnThreeArgs = {
  where: GQLRowColumnThreeWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryRowColumnThreesConnectionArgs = {
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

export type GQLQueryRowColumnTwosArgs = {
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

export type GQLQueryRowColumnTwoArgs = {
  where: GQLRowColumnTwoWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryRowColumnTwosConnectionArgs = {
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

export type GQLQueryRowCompanySlidersArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowCompanySliderArgs = {
  where: GQLRowCompanySliderWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryRowCompanySlidersConnectionArgs = {
  where?: Maybe<GQLRowCompanySliderWhereInput>
  orderBy?: Maybe<GQLRowCompanySliderOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowHeroesArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowHeroArgs = {
  where: GQLRowHeroWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryRowHeroesConnectionArgs = {
  where?: Maybe<GQLRowHeroWhereInput>
  orderBy?: Maybe<GQLRowHeroOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowPeopleWithTextsArgs = {
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

export type GQLQueryRowPeopleWithTextArgs = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryRowPeopleWithTextsConnectionArgs = {
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

export type GQLQueryRowRecentBlogPostsArgs = {
  where?: Maybe<GQLRowRecentBlogPostWhereInput>
  orderBy?: Maybe<GQLRowRecentBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowRecentBlogPostArgs = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryRowRecentBlogPostsConnectionArgs = {
  where?: Maybe<GQLRowRecentBlogPostWhereInput>
  orderBy?: Maybe<GQLRowRecentBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryRowServicesWithTextsArgs = {
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

export type GQLQueryRowServicesWithTextArgs = {
  where: GQLRowServicesWithTextWhereUniqueInput
  stage?: GQLStage
  locales?: Array<GQLLocale>
}

export type GQLQueryRowServicesWithTextsConnectionArgs = {
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

export type GQLQueryZzDeleteListsArgs = {
  where?: Maybe<GQLZzDeleteListWhereInput>
  orderBy?: Maybe<GQLZzDeleteListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryZzDeleteListArgs = {
  where: GQLZzDeleteListWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryZzDeleteListsConnectionArgs = {
  where?: Maybe<GQLZzDeleteListWhereInput>
  orderBy?: Maybe<GQLZzDeleteListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLRgba = {
  __typename?: 'RGBA'
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

export type GQLRgbaInput = {
  r: Scalars['RGBAHue']
  g: Scalars['RGBAHue']
  b: Scalars['RGBAHue']
  a: Scalars['RGBATransparency']
}

export type GQLRichText = {
  __typename?: 'RichText'
  raw: Scalars['RichTextAST']
  html: Scalars['String']
  markdown: Scalars['String']
  text: Scalars['String']
}

export type GQLRowColumnOne = GQLNode & {
  __typename?: 'RowColumnOne'
  stage: GQLStage
  documentInStages: Array<GQLRowColumnOne>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  colOne?: Maybe<GQLRichText>
  colOneIcon?: Maybe<GQLAsset>
  page: Array<GQLPage>
}

export type GQLRowColumnOneDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowColumnOnePageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowColumnOneConnectInput = {
  where: GQLRowColumnOneWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowColumnOneConnection = {
  __typename?: 'RowColumnOneConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowColumnOneEdge>
  aggregate: GQLAggregate
}

export type GQLRowColumnOneCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

export type GQLRowColumnOneCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnOneCreateInput>>
  connect?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
}

export type GQLRowColumnOneCreateOneInlineInput = {
  create?: Maybe<GQLRowColumnOneCreateInput>
  connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
}

export type GQLRowColumnOneEdge = {
  __typename?: 'RowColumnOneEdge'
  node: GQLRowColumnOne
  cursor: Scalars['String']
}

export type GQLRowColumnOneManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnOneWhereInput>>
  OR?: Maybe<Array<GQLRowColumnOneWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnOneWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
}

export enum GQLRowColumnOneOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowColumnOneUpdateInput = {
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

export type GQLRowColumnOneUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnOneCreateInput>>
  connect?: Maybe<Array<GQLRowColumnOneConnectInput>>
  set?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
  update?: Maybe<Array<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowColumnOneWhereUniqueInput>>
}

export type GQLRowColumnOneUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne?: Maybe<Scalars['RichTextAST']>
}

export type GQLRowColumnOneUpdateManyWithNestedWhereInput = {
  where: GQLRowColumnOneWhereInput
  data: GQLRowColumnOneUpdateManyInput
}

export type GQLRowColumnOneUpdateOneInlineInput = {
  create?: Maybe<GQLRowColumnOneCreateInput>
  update?: Maybe<GQLRowColumnOneUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowColumnOneUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowColumnOneWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowColumnOneUpdateWithNestedWhereUniqueInput = {
  where: GQLRowColumnOneWhereUniqueInput
  data: GQLRowColumnOneUpdateInput
}

export type GQLRowColumnOneUpsertInput = {
  create: GQLRowColumnOneCreateInput
  update: GQLRowColumnOneUpdateInput
}

export type GQLRowColumnOneUpsertWithNestedWhereUniqueInput = {
  where: GQLRowColumnOneWhereUniqueInput
  data: GQLRowColumnOneUpsertInput
}

export type GQLRowColumnOneWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnOneWhereInput>>
  OR?: Maybe<Array<GQLRowColumnOneWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnOneWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
}

export type GQLRowColumnOneWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowColumnThree = GQLNode & {
  __typename?: 'RowColumnThree'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLRowColumnThree>
  documentInStages: Array<GQLRowColumnThree>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  colOne: GQLRichText
  colOneIcon?: Maybe<GQLAsset>
  colTwo: GQLRichText
  colTwoIcon?: Maybe<GQLAsset>
  colThree: GQLRichText
  colThreeIcon?: Maybe<GQLAsset>
  page: Array<GQLPage>
}

export type GQLRowColumnThreeLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLRowColumnThreeDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowColumnThreePageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowColumnThreeConnectInput = {
  where: GQLRowColumnThreeWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowColumnThreeConnection = {
  __typename?: 'RowColumnThreeConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowColumnThreeEdge>
  aggregate: GQLAggregate
}

export type GQLRowColumnThreeCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colOneIcon?: Maybe<GQLAssetCreateOneInlineInput>
  colTwo: Scalars['RichTextAST']
  colTwoIcon?: Maybe<GQLAssetCreateOneInlineInput>
  colThree: Scalars['RichTextAST']
  colThreeIcon?: Maybe<GQLAssetCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  localizations?: Maybe<GQLRowColumnThreeCreateLocalizationsInput>
}

export type GQLRowColumnThreeCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

export type GQLRowColumnThreeCreateLocalizationInput = {
  data: GQLRowColumnThreeCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnThreeCreateLocalizationsInput = {
  create?: Maybe<Array<GQLRowColumnThreeCreateLocalizationInput>>
}

export type GQLRowColumnThreeCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnThreeCreateInput>>
  connect?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
}

export type GQLRowColumnThreeCreateOneInlineInput = {
  create?: Maybe<GQLRowColumnThreeCreateInput>
  connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
}

export type GQLRowColumnThreeEdge = {
  __typename?: 'RowColumnThreeEdge'
  node: GQLRowColumnThree
  cursor: Scalars['String']
}

export type GQLRowColumnThreeManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  OR?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
  colThreeIcon?: Maybe<GQLAssetWhereInput>
}

export enum GQLRowColumnThreeOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowColumnThreeUpdateInput = {
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  colTwo?: Maybe<Scalars['RichTextAST']>
  colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  colThree?: Maybe<Scalars['RichTextAST']>
  colThreeIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  localizations?: Maybe<GQLRowColumnThreeUpdateLocalizationsInput>
}

export type GQLRowColumnThreeUpdateLocalizationDataInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

export type GQLRowColumnThreeUpdateLocalizationInput = {
  data: GQLRowColumnThreeUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnThreeUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLRowColumnThreeCreateLocalizationInput>>
  update?: Maybe<Array<GQLRowColumnThreeUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowColumnThreeUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLRowColumnThreeUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnThreeCreateInput>>
  connect?: Maybe<Array<GQLRowColumnThreeConnectInput>>
  set?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
  update?: Maybe<Array<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowColumnThreeWhereUniqueInput>>
}

export type GQLRowColumnThreeUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLRowColumnThreeUpdateManyLocalizationInput>>
}

export type GQLRowColumnThreeUpdateManyLocalizationInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
  colThree: Scalars['RichTextAST']
}

export type GQLRowColumnThreeUpdateManyWithNestedWhereInput = {
  where: GQLRowColumnThreeWhereInput
  data: GQLRowColumnThreeUpdateManyInput
}

export type GQLRowColumnThreeUpdateOneInlineInput = {
  create?: Maybe<GQLRowColumnThreeCreateInput>
  update?: Maybe<GQLRowColumnThreeUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowColumnThreeUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowColumnThreeWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowColumnThreeUpdateWithNestedWhereUniqueInput = {
  where: GQLRowColumnThreeWhereUniqueInput
  data: GQLRowColumnThreeUpdateInput
}

export type GQLRowColumnThreeUpsertInput = {
  create: GQLRowColumnThreeCreateInput
  update: GQLRowColumnThreeUpdateInput
}

export type GQLRowColumnThreeUpsertLocalizationInput = {
  update: GQLRowColumnThreeUpdateLocalizationDataInput
  create: GQLRowColumnThreeCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnThreeUpsertWithNestedWhereUniqueInput = {
  where: GQLRowColumnThreeWhereUniqueInput
  data: GQLRowColumnThreeUpsertInput
}

export type GQLRowColumnThreeWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  OR?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnThreeWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
  colThreeIcon?: Maybe<GQLAssetWhereInput>
}

export type GQLRowColumnThreeWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowColumnTwo = GQLNode & {
  __typename?: 'RowColumnTwo'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLRowColumnTwo>
  documentInStages: Array<GQLRowColumnTwo>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  colOne: GQLRichText
  colOneIcon: GQLAsset
  colTwo: GQLRichText
  colTwoIcon: GQLAsset
  page: Array<GQLPage>
}

export type GQLRowColumnTwoLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLRowColumnTwoDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowColumnTwoPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowColumnTwoConnectInput = {
  where: GQLRowColumnTwoWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowColumnTwoConnection = {
  __typename?: 'RowColumnTwoConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowColumnTwoEdge>
  aggregate: GQLAggregate
}

export type GQLRowColumnTwoCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colOneIcon: GQLAssetCreateOneInlineInput
  colTwo: Scalars['RichTextAST']
  colTwoIcon: GQLAssetCreateOneInlineInput
  page?: Maybe<GQLPageCreateManyInlineInput>
  localizations?: Maybe<GQLRowColumnTwoCreateLocalizationsInput>
}

export type GQLRowColumnTwoCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

export type GQLRowColumnTwoCreateLocalizationInput = {
  data: GQLRowColumnTwoCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnTwoCreateLocalizationsInput = {
  create?: Maybe<Array<GQLRowColumnTwoCreateLocalizationInput>>
}

export type GQLRowColumnTwoCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnTwoCreateInput>>
  connect?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
}

export type GQLRowColumnTwoCreateOneInlineInput = {
  create?: Maybe<GQLRowColumnTwoCreateInput>
  connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
}

export type GQLRowColumnTwoEdge = {
  __typename?: 'RowColumnTwoEdge'
  node: GQLRowColumnTwo
  cursor: Scalars['String']
}

export type GQLRowColumnTwoManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  OR?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
}

export enum GQLRowColumnTwoOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowColumnTwoUpdateInput = {
  colOne?: Maybe<Scalars['RichTextAST']>
  colOneIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  colTwo?: Maybe<Scalars['RichTextAST']>
  colTwoIcon?: Maybe<GQLAssetUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  localizations?: Maybe<GQLRowColumnTwoUpdateLocalizationsInput>
}

export type GQLRowColumnTwoUpdateLocalizationDataInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

export type GQLRowColumnTwoUpdateLocalizationInput = {
  data: GQLRowColumnTwoUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnTwoUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLRowColumnTwoCreateLocalizationInput>>
  update?: Maybe<Array<GQLRowColumnTwoUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowColumnTwoUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLRowColumnTwoUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowColumnTwoCreateInput>>
  connect?: Maybe<Array<GQLRowColumnTwoConnectInput>>
  set?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
  update?: Maybe<Array<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowColumnTwoWhereUniqueInput>>
}

export type GQLRowColumnTwoUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLRowColumnTwoUpdateManyLocalizationInput>>
}

export type GQLRowColumnTwoUpdateManyLocalizationInput = {
  colOne: Scalars['RichTextAST']
  colTwo: Scalars['RichTextAST']
}

export type GQLRowColumnTwoUpdateManyWithNestedWhereInput = {
  where: GQLRowColumnTwoWhereInput
  data: GQLRowColumnTwoUpdateManyInput
}

export type GQLRowColumnTwoUpdateOneInlineInput = {
  create?: Maybe<GQLRowColumnTwoCreateInput>
  update?: Maybe<GQLRowColumnTwoUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowColumnTwoUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowColumnTwoWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowColumnTwoUpdateWithNestedWhereUniqueInput = {
  where: GQLRowColumnTwoWhereUniqueInput
  data: GQLRowColumnTwoUpdateInput
}

export type GQLRowColumnTwoUpsertInput = {
  create: GQLRowColumnTwoCreateInput
  update: GQLRowColumnTwoUpdateInput
}

export type GQLRowColumnTwoUpsertLocalizationInput = {
  update: GQLRowColumnTwoUpdateLocalizationDataInput
  create: GQLRowColumnTwoCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowColumnTwoUpsertWithNestedWhereUniqueInput = {
  where: GQLRowColumnTwoWhereUniqueInput
  data: GQLRowColumnTwoUpsertInput
}

export type GQLRowColumnTwoWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  OR?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  NOT?: Maybe<Array<GQLRowColumnTwoWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  colOneIcon?: Maybe<GQLAssetWhereInput>
  colTwoIcon?: Maybe<GQLAssetWhereInput>
}

export type GQLRowColumnTwoWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowCompanySlider = GQLNode & {
  __typename?: 'RowCompanySlider'
  stage: GQLStage
  documentInStages: Array<GQLRowCompanySlider>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  companies: Array<GQLCompany>
  page: Array<GQLPage>
}

export type GQLRowCompanySliderDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowCompanySliderCompaniesArgs = {
  where?: Maybe<GQLCompanyWhereInput>
  orderBy?: Maybe<GQLCompanyOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowCompanySliderPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowCompanySliderConnectInput = {
  where: GQLRowCompanySliderWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowCompanySliderConnection = {
  __typename?: 'RowCompanySliderConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowCompanySliderEdge>
  aggregate: GQLAggregate
}

export type GQLRowCompanySliderCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  companies?: Maybe<GQLCompanyCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

export type GQLRowCompanySliderCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowCompanySliderCreateInput>>
  connect?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
}

export type GQLRowCompanySliderCreateOneInlineInput = {
  create?: Maybe<GQLRowCompanySliderCreateInput>
  connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
}

export type GQLRowCompanySliderEdge = {
  __typename?: 'RowCompanySliderEdge'
  node: GQLRowCompanySlider
  cursor: Scalars['String']
}

export type GQLRowCompanySliderManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  OR?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  NOT?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  companies_every?: Maybe<GQLCompanyWhereInput>
  companies_some?: Maybe<GQLCompanyWhereInput>
  companies_none?: Maybe<GQLCompanyWhereInput>
}

export enum GQLRowCompanySliderOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowCompanySliderUpdateInput = {
  companies?: Maybe<GQLCompanyUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

export type GQLRowCompanySliderUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowCompanySliderCreateInput>>
  connect?: Maybe<Array<GQLRowCompanySliderConnectInput>>
  set?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
  update?: Maybe<Array<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowCompanySliderWhereUniqueInput>>
}

export type GQLRowCompanySliderUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLRowCompanySliderUpdateManyWithNestedWhereInput = {
  where: GQLRowCompanySliderWhereInput
  data: GQLRowCompanySliderUpdateManyInput
}

export type GQLRowCompanySliderUpdateOneInlineInput = {
  create?: Maybe<GQLRowCompanySliderCreateInput>
  update?: Maybe<GQLRowCompanySliderUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowCompanySliderUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowCompanySliderWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowCompanySliderUpdateWithNestedWhereUniqueInput = {
  where: GQLRowCompanySliderWhereUniqueInput
  data: GQLRowCompanySliderUpdateInput
}

export type GQLRowCompanySliderUpsertInput = {
  create: GQLRowCompanySliderCreateInput
  update: GQLRowCompanySliderUpdateInput
}

export type GQLRowCompanySliderUpsertWithNestedWhereUniqueInput = {
  where: GQLRowCompanySliderWhereUniqueInput
  data: GQLRowCompanySliderUpsertInput
}

export type GQLRowCompanySliderWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  OR?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  NOT?: Maybe<Array<GQLRowCompanySliderWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  companies_every?: Maybe<GQLCompanyWhereInput>
  companies_some?: Maybe<GQLCompanyWhereInput>
  companies_none?: Maybe<GQLCompanyWhereInput>
}

export type GQLRowCompanySliderWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowHero = GQLNode & {
  __typename?: 'RowHero'
  stage: GQLStage
  documentInStages: Array<GQLRowHero>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  asset: GQLAsset
  text: GQLRichText
  links: Array<GQLRowHeroVideoLinks>
  page: Array<GQLPage>
  list: Array<GQLZzDeleteList>
}

export type GQLRowHeroDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowHeroLinksArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowHeroPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowHeroListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowHeroConnectInput = {
  where: GQLRowHeroWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowHeroConnection = {
  __typename?: 'RowHeroConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowHeroEdge>
  aggregate: GQLAggregate
}

export type GQLRowHeroCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  asset: GQLAssetCreateOneInlineInput
  text: Scalars['RichTextAST']
  links?: Maybe<GQLRowHeroVideoLinksCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  list?: Maybe<GQLZzDeleteListCreateManyInlineInput>
}

export type GQLRowHeroCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowHeroCreateInput>>
  connect?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
}

export type GQLRowHeroCreateOneInlineInput = {
  create?: Maybe<GQLRowHeroCreateInput>
  connect?: Maybe<GQLRowHeroWhereUniqueInput>
}

export type GQLRowHeroEdge = {
  __typename?: 'RowHeroEdge'
  node: GQLRowHero
  cursor: Scalars['String']
}

export type GQLRowHeroManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowHeroWhereInput>>
  OR?: Maybe<Array<GQLRowHeroWhereInput>>
  NOT?: Maybe<Array<GQLRowHeroWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAssetWhereInput>
}

export enum GQLRowHeroOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowHeroUpdateInput = {
  asset?: Maybe<GQLAssetUpdateOneInlineInput>
  text?: Maybe<Scalars['RichTextAST']>
  links?: Maybe<GQLRowHeroVideoLinksUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  list?: Maybe<GQLZzDeleteListUpdateManyInlineInput>
}

export type GQLRowHeroUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowHeroCreateInput>>
  connect?: Maybe<Array<GQLRowHeroConnectInput>>
  set?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
  update?: Maybe<Array<GQLRowHeroUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowHeroUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowHeroWhereUniqueInput>>
}

export type GQLRowHeroUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['RichTextAST']
}

export type GQLRowHeroUpdateManyWithNestedWhereInput = {
  where: GQLRowHeroWhereInput
  data: GQLRowHeroUpdateManyInput
}

export type GQLRowHeroUpdateOneInlineInput = {
  create?: Maybe<GQLRowHeroCreateInput>
  update?: Maybe<GQLRowHeroUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowHeroUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowHeroWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowHeroUpdateWithNestedWhereUniqueInput = {
  where: GQLRowHeroWhereUniqueInput
  data: GQLRowHeroUpdateInput
}

export type GQLRowHeroUpsertInput = {
  create: GQLRowHeroCreateInput
  update: GQLRowHeroUpdateInput
}

export type GQLRowHeroUpsertWithNestedWhereUniqueInput = {
  where: GQLRowHeroWhereUniqueInput
  data: GQLRowHeroUpsertInput
}

export type GQLRowHeroVideoLinks = GQLLinkExternal | GQLLinkInternal

export type GQLRowHeroVideoLinksConnectInput = {
  LinkExternal?: Maybe<GQLLinkExternalConnectInput>
  LinkInternal?: Maybe<GQLLinkInternalConnectInput>
}

export type GQLRowHeroVideoLinksCreateInput = {
  LinkExternal?: Maybe<GQLLinkExternalCreateInput>
  LinkInternal?: Maybe<GQLLinkInternalCreateInput>
}

export type GQLRowHeroVideoLinksCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowHeroVideoLinksCreateInput>>
  connect?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
}

export type GQLRowHeroVideoLinksCreateOneInlineInput = {
  create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
}

export type GQLRowHeroVideoLinksUpdateInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateInput>
}

export type GQLRowHeroVideoLinksUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowHeroVideoLinksCreateInput>>
  connect?: Maybe<Array<GQLRowHeroVideoLinksConnectInput>>
  set?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
  update?: Maybe<Array<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowHeroVideoLinksWhereUniqueInput>>
}

export type GQLRowHeroVideoLinksUpdateManyWithNestedWhereInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateManyWithNestedWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateManyWithNestedWhereInput>
}

export type GQLRowHeroVideoLinksUpdateOneInlineInput = {
  create?: Maybe<GQLRowHeroVideoLinksCreateInput>
  update?: Maybe<GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowHeroVideoLinksWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowHeroVideoLinksUpdateWithNestedWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpdateWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpdateWithNestedWhereUniqueInput>
}

export type GQLRowHeroVideoLinksUpsertWithNestedWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalUpsertWithNestedWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalUpsertWithNestedWhereUniqueInput>
}

export type GQLRowHeroVideoLinksWhereInput = {
  LinkExternal?: Maybe<GQLLinkExternalWhereInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereInput>
}

export type GQLRowHeroVideoLinksWhereUniqueInput = {
  LinkExternal?: Maybe<GQLLinkExternalWhereUniqueInput>
  LinkInternal?: Maybe<GQLLinkInternalWhereUniqueInput>
}

export type GQLRowHeroWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowHeroWhereInput>>
  OR?: Maybe<Array<GQLRowHeroWhereInput>>
  NOT?: Maybe<Array<GQLRowHeroWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  asset?: Maybe<GQLAssetWhereInput>
}

export type GQLRowHeroWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowPeopleWithText = GQLNode & {
  __typename?: 'RowPeopleWithText'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLRowPeopleWithText>
  documentInStages: Array<GQLRowPeopleWithText>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  text: GQLRichText
  links: Array<GQLLinkInternal>
  personList?: Maybe<GQLPersonList>
  page: Array<GQLPage>
}

export type GQLRowPeopleWithTextLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLRowPeopleWithTextDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowPeopleWithTextLinksArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowPeopleWithTextPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowPeopleWithTextConnectInput = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowPeopleWithTextConnection = {
  __typename?: 'RowPeopleWithTextConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowPeopleWithTextEdge>
  aggregate: GQLAggregate
}

export type GQLRowPeopleWithTextCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['RichTextAST']
  links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  personList?: Maybe<GQLPersonListCreateOneInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  localizations?: Maybe<GQLRowPeopleWithTextCreateLocalizationsInput>
}

export type GQLRowPeopleWithTextCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['RichTextAST']
}

export type GQLRowPeopleWithTextCreateLocalizationInput = {
  data: GQLRowPeopleWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowPeopleWithTextCreateLocalizationsInput = {
  create?: Maybe<Array<GQLRowPeopleWithTextCreateLocalizationInput>>
}

export type GQLRowPeopleWithTextCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowPeopleWithTextCreateInput>>
  connect?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
}

export type GQLRowPeopleWithTextCreateOneInlineInput = {
  create?: Maybe<GQLRowPeopleWithTextCreateInput>
  connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
}

export type GQLRowPeopleWithTextEdge = {
  __typename?: 'RowPeopleWithTextEdge'
  node: GQLRowPeopleWithText
  cursor: Scalars['String']
}

export type GQLRowPeopleWithTextManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  OR?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  NOT?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
  personList?: Maybe<GQLPersonListWhereInput>
}

export enum GQLRowPeopleWithTextOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLRowPeopleWithTextUpdateInput = {
  text?: Maybe<Scalars['RichTextAST']>
  links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  personList?: Maybe<GQLPersonListUpdateOneInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  localizations?: Maybe<GQLRowPeopleWithTextUpdateLocalizationsInput>
}

export type GQLRowPeopleWithTextUpdateLocalizationDataInput = {
  text: Scalars['RichTextAST']
}

export type GQLRowPeopleWithTextUpdateLocalizationInput = {
  data: GQLRowPeopleWithTextUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowPeopleWithTextUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLRowPeopleWithTextCreateLocalizationInput>>
  update?: Maybe<Array<GQLRowPeopleWithTextUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowPeopleWithTextUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLRowPeopleWithTextUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowPeopleWithTextCreateInput>>
  connect?: Maybe<Array<GQLRowPeopleWithTextConnectInput>>
  set?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
  update?: Maybe<Array<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowPeopleWithTextWhereUniqueInput>>
}

export type GQLRowPeopleWithTextUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLRowPeopleWithTextUpdateManyLocalizationInput>>
}

export type GQLRowPeopleWithTextUpdateManyLocalizationInput = {
  text: Scalars['RichTextAST']
}

export type GQLRowPeopleWithTextUpdateManyWithNestedWhereInput = {
  where: GQLRowPeopleWithTextWhereInput
  data: GQLRowPeopleWithTextUpdateManyInput
}

export type GQLRowPeopleWithTextUpdateOneInlineInput = {
  create?: Maybe<GQLRowPeopleWithTextCreateInput>
  update?: Maybe<GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowPeopleWithTextWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowPeopleWithTextUpdateWithNestedWhereUniqueInput = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  data: GQLRowPeopleWithTextUpdateInput
}

export type GQLRowPeopleWithTextUpsertInput = {
  create: GQLRowPeopleWithTextCreateInput
  update: GQLRowPeopleWithTextUpdateInput
}

export type GQLRowPeopleWithTextUpsertLocalizationInput = {
  update: GQLRowPeopleWithTextUpdateLocalizationDataInput
  create: GQLRowPeopleWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowPeopleWithTextUpsertWithNestedWhereUniqueInput = {
  where: GQLRowPeopleWithTextWhereUniqueInput
  data: GQLRowPeopleWithTextUpsertInput
}

export type GQLRowPeopleWithTextWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  OR?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  NOT?: Maybe<Array<GQLRowPeopleWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
  personList?: Maybe<GQLPersonListWhereInput>
}

export type GQLRowPeopleWithTextWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowRecentBlogPost = GQLNode & {
  __typename?: 'RowRecentBlogPost'
  stage: GQLStage
  documentInStages: Array<GQLRowRecentBlogPost>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  limit?: Maybe<Scalars['Int']>
  page: Array<GQLPage>
}

export type GQLRowRecentBlogPostDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowRecentBlogPostPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowRecentBlogPostConnectInput = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowRecentBlogPostConnection = {
  __typename?: 'RowRecentBlogPostConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowRecentBlogPostEdge>
  aggregate: GQLAggregate
}

export type GQLRowRecentBlogPostCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  limit?: Maybe<Scalars['Int']>
  page?: Maybe<GQLPageCreateManyInlineInput>
}

export type GQLRowRecentBlogPostCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowRecentBlogPostCreateInput>>
  connect?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
}

export type GQLRowRecentBlogPostCreateOneInlineInput = {
  create?: Maybe<GQLRowRecentBlogPostCreateInput>
  connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
}

export type GQLRowRecentBlogPostEdge = {
  __typename?: 'RowRecentBlogPostEdge'
  node: GQLRowRecentBlogPost
  cursor: Scalars['String']
}

export type GQLRowRecentBlogPostManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  OR?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  NOT?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  limit?: Maybe<Scalars['Int']>
  limit_not?: Maybe<Scalars['Int']>
  limit_in?: Maybe<Array<Scalars['Int']>>
  limit_not_in?: Maybe<Array<Scalars['Int']>>
  limit_lt?: Maybe<Scalars['Int']>
  limit_lte?: Maybe<Scalars['Int']>
  limit_gt?: Maybe<Scalars['Int']>
  limit_gte?: Maybe<Scalars['Int']>
}

export enum GQLRowRecentBlogPostOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  LimitAsc = 'limit_ASC',
  LimitDesc = 'limit_DESC',
}

export type GQLRowRecentBlogPostUpdateInput = {
  limit?: Maybe<Scalars['Int']>
  page?: Maybe<GQLPageUpdateManyInlineInput>
}

export type GQLRowRecentBlogPostUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowRecentBlogPostCreateInput>>
  connect?: Maybe<Array<GQLRowRecentBlogPostConnectInput>>
  set?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
  update?: Maybe<Array<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowRecentBlogPostWhereUniqueInput>>
}

export type GQLRowRecentBlogPostUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  limit?: Maybe<Scalars['Int']>
}

export type GQLRowRecentBlogPostUpdateManyWithNestedWhereInput = {
  where: GQLRowRecentBlogPostWhereInput
  data: GQLRowRecentBlogPostUpdateManyInput
}

export type GQLRowRecentBlogPostUpdateOneInlineInput = {
  create?: Maybe<GQLRowRecentBlogPostCreateInput>
  update?: Maybe<GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowRecentBlogPostWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowRecentBlogPostUpdateWithNestedWhereUniqueInput = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  data: GQLRowRecentBlogPostUpdateInput
}

export type GQLRowRecentBlogPostUpsertInput = {
  create: GQLRowRecentBlogPostCreateInput
  update: GQLRowRecentBlogPostUpdateInput
}

export type GQLRowRecentBlogPostUpsertWithNestedWhereUniqueInput = {
  where: GQLRowRecentBlogPostWhereUniqueInput
  data: GQLRowRecentBlogPostUpsertInput
}

export type GQLRowRecentBlogPostWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  OR?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  NOT?: Maybe<Array<GQLRowRecentBlogPostWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  limit?: Maybe<Scalars['Int']>
  limit_not?: Maybe<Scalars['Int']>
  limit_in?: Maybe<Array<Scalars['Int']>>
  limit_not_in?: Maybe<Array<Scalars['Int']>>
  limit_lt?: Maybe<Scalars['Int']>
  limit_lte?: Maybe<Scalars['Int']>
  limit_gt?: Maybe<Scalars['Int']>
  limit_gte?: Maybe<Scalars['Int']>
}

export type GQLRowRecentBlogPostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLRowServicesWithText = GQLNode & {
  __typename?: 'RowServicesWithText'
  stage: GQLStage
  locale: GQLLocale
  localizations: Array<GQLRowServicesWithText>
  documentInStages: Array<GQLRowServicesWithText>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['String']
  links: Array<GQLLinkInternal>
  page: Array<GQLPage>
}

export type GQLRowServicesWithTextLocalizationsArgs = {
  locales?: Array<GQLLocale>
  includeCurrent?: Scalars['Boolean']
}

export type GQLRowServicesWithTextDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLRowServicesWithTextLinksArgs = {
  where?: Maybe<GQLLinkInternalWhereInput>
  orderBy?: Maybe<GQLLinkInternalOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowServicesWithTextPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLRowServicesWithTextConnectInput = {
  where: GQLRowServicesWithTextWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLRowServicesWithTextConnection = {
  __typename?: 'RowServicesWithTextConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLRowServicesWithTextEdge>
  aggregate: GQLAggregate
}

export type GQLRowServicesWithTextCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['String']
  links?: Maybe<GQLLinkInternalCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  localizations?: Maybe<GQLRowServicesWithTextCreateLocalizationsInput>
}

export type GQLRowServicesWithTextCreateLocalizationDataInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  text: Scalars['String']
}

export type GQLRowServicesWithTextCreateLocalizationInput = {
  data: GQLRowServicesWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowServicesWithTextCreateLocalizationsInput = {
  create?: Maybe<Array<GQLRowServicesWithTextCreateLocalizationInput>>
}

export type GQLRowServicesWithTextCreateManyInlineInput = {
  create?: Maybe<Array<GQLRowServicesWithTextCreateInput>>
  connect?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
}

export type GQLRowServicesWithTextCreateOneInlineInput = {
  create?: Maybe<GQLRowServicesWithTextCreateInput>
  connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
}

export type GQLRowServicesWithTextEdge = {
  __typename?: 'RowServicesWithTextEdge'
  node: GQLRowServicesWithText
  cursor: Scalars['String']
}

export type GQLRowServicesWithTextManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  OR?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  NOT?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
}

export enum GQLRowServicesWithTextOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
}

export type GQLRowServicesWithTextUpdateInput = {
  text?: Maybe<Scalars['String']>
  links?: Maybe<GQLLinkInternalUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  localizations?: Maybe<GQLRowServicesWithTextUpdateLocalizationsInput>
}

export type GQLRowServicesWithTextUpdateLocalizationDataInput = {
  text: Scalars['String']
}

export type GQLRowServicesWithTextUpdateLocalizationInput = {
  data: GQLRowServicesWithTextUpdateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowServicesWithTextUpdateLocalizationsInput = {
  create?: Maybe<Array<GQLRowServicesWithTextCreateLocalizationInput>>
  update?: Maybe<Array<GQLRowServicesWithTextUpdateLocalizationInput>>
  upsert?: Maybe<Array<GQLRowServicesWithTextUpsertLocalizationInput>>
  delete?: Maybe<Array<GQLLocale>>
}

export type GQLRowServicesWithTextUpdateManyInlineInput = {
  create?: Maybe<Array<GQLRowServicesWithTextCreateInput>>
  connect?: Maybe<Array<GQLRowServicesWithTextConnectInput>>
  set?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
  update?: Maybe<Array<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
  delete?: Maybe<Array<GQLRowServicesWithTextWhereUniqueInput>>
}

export type GQLRowServicesWithTextUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  localizations?: Maybe<Array<GQLRowServicesWithTextUpdateManyLocalizationInput>>
}

export type GQLRowServicesWithTextUpdateManyLocalizationInput = {
  text: Scalars['String']
}

export type GQLRowServicesWithTextUpdateManyWithNestedWhereInput = {
  where: GQLRowServicesWithTextWhereInput
  data: GQLRowServicesWithTextUpdateManyInput
}

export type GQLRowServicesWithTextUpdateOneInlineInput = {
  create?: Maybe<GQLRowServicesWithTextCreateInput>
  update?: Maybe<GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLRowServicesWithTextWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLRowServicesWithTextUpdateWithNestedWhereUniqueInput = {
  where: GQLRowServicesWithTextWhereUniqueInput
  data: GQLRowServicesWithTextUpdateInput
}

export type GQLRowServicesWithTextUpsertInput = {
  create: GQLRowServicesWithTextCreateInput
  update: GQLRowServicesWithTextUpdateInput
}

export type GQLRowServicesWithTextUpsertLocalizationInput = {
  update: GQLRowServicesWithTextUpdateLocalizationDataInput
  create: GQLRowServicesWithTextCreateLocalizationDataInput
  locale: GQLLocale
}

export type GQLRowServicesWithTextUpsertWithNestedWhereUniqueInput = {
  where: GQLRowServicesWithTextWhereUniqueInput
  data: GQLRowServicesWithTextUpsertInput
}

export type GQLRowServicesWithTextWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  OR?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  NOT?: Maybe<Array<GQLRowServicesWithTextWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  text?: Maybe<Scalars['String']>
  text_not?: Maybe<Scalars['String']>
  text_in?: Maybe<Array<Scalars['String']>>
  text_not_in?: Maybe<Array<Scalars['String']>>
  text_contains?: Maybe<Scalars['String']>
  text_not_contains?: Maybe<Scalars['String']>
  text_starts_with?: Maybe<Scalars['String']>
  text_not_starts_with?: Maybe<Scalars['String']>
  text_ends_with?: Maybe<Scalars['String']>
  text_not_ends_with?: Maybe<Scalars['String']>
  links_every?: Maybe<GQLLinkInternalWhereInput>
  links_some?: Maybe<GQLLinkInternalWhereInput>
  links_none?: Maybe<GQLLinkInternalWhereInput>
}

export type GQLRowServicesWithTextWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum GQLStage {
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
}

export type GQLUnpublishLocaleInput = {
  locale: GQLLocale
  stages: Array<GQLStage>
}

export type GQLZzDeleteList = GQLNode & {
  __typename?: 'ZzDeleteList'
  stage: GQLStage
  documentInStages: Array<GQLZzDeleteList>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  identifier: Scalars['String']
  items: Array<GQLListItems>
}

export type GQLZzDeleteListDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLZzDeleteListItemsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLZzDeleteListConnectInput = {
  where: GQLZzDeleteListWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLZzDeleteListConnection = {
  __typename?: 'ZzDeleteListConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLZzDeleteListEdge>
  aggregate: GQLAggregate
}

export type GQLZzDeleteListCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  identifier: Scalars['String']
  items?: Maybe<GQLListItemsCreateManyInlineInput>
}

export type GQLZzDeleteListCreateManyInlineInput = {
  create?: Maybe<Array<GQLZzDeleteListCreateInput>>
  connect?: Maybe<Array<GQLZzDeleteListWhereUniqueInput>>
}

export type GQLZzDeleteListCreateOneInlineInput = {
  create?: Maybe<GQLZzDeleteListCreateInput>
  connect?: Maybe<GQLZzDeleteListWhereUniqueInput>
}

export type GQLZzDeleteListEdge = {
  __typename?: 'ZzDeleteListEdge'
  node: GQLZzDeleteList
  cursor: Scalars['String']
}

export type GQLZzDeleteListManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLZzDeleteListWhereInput>>
  OR?: Maybe<Array<GQLZzDeleteListWhereInput>>
  NOT?: Maybe<Array<GQLZzDeleteListWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identifier?: Maybe<Scalars['String']>
  identifier_not?: Maybe<Scalars['String']>
  identifier_in?: Maybe<Array<Scalars['String']>>
  identifier_not_in?: Maybe<Array<Scalars['String']>>
  identifier_contains?: Maybe<Scalars['String']>
  identifier_not_contains?: Maybe<Scalars['String']>
  identifier_starts_with?: Maybe<Scalars['String']>
  identifier_not_starts_with?: Maybe<Scalars['String']>
  identifier_ends_with?: Maybe<Scalars['String']>
  identifier_not_ends_with?: Maybe<Scalars['String']>
}

export enum GQLZzDeleteListOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  IdentifierAsc = 'identifier_ASC',
  IdentifierDesc = 'identifier_DESC',
}

export type GQLZzDeleteListUpdateInput = {
  identifier?: Maybe<Scalars['String']>
  items?: Maybe<GQLListItemsUpdateManyInlineInput>
}

export type GQLZzDeleteListUpdateManyInlineInput = {
  create?: Maybe<Array<GQLZzDeleteListCreateInput>>
  connect?: Maybe<Array<GQLZzDeleteListConnectInput>>
  set?: Maybe<Array<GQLZzDeleteListWhereUniqueInput>>
  update?: Maybe<Array<GQLZzDeleteListUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLZzDeleteListUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLZzDeleteListWhereUniqueInput>>
  delete?: Maybe<Array<GQLZzDeleteListWhereUniqueInput>>
}

export type GQLZzDeleteListUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLZzDeleteListUpdateManyWithNestedWhereInput = {
  where: GQLZzDeleteListWhereInput
  data: GQLZzDeleteListUpdateManyInput
}

export type GQLZzDeleteListUpdateOneInlineInput = {
  create?: Maybe<GQLZzDeleteListCreateInput>
  update?: Maybe<GQLZzDeleteListUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLZzDeleteListUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLZzDeleteListWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLZzDeleteListUpdateWithNestedWhereUniqueInput = {
  where: GQLZzDeleteListWhereUniqueInput
  data: GQLZzDeleteListUpdateInput
}

export type GQLZzDeleteListUpsertInput = {
  create: GQLZzDeleteListCreateInput
  update: GQLZzDeleteListUpdateInput
}

export type GQLZzDeleteListUpsertWithNestedWhereUniqueInput = {
  where: GQLZzDeleteListWhereUniqueInput
  data: GQLZzDeleteListUpsertInput
}

export type GQLZzDeleteListWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLZzDeleteListWhereInput>>
  OR?: Maybe<Array<GQLZzDeleteListWhereInput>>
  NOT?: Maybe<Array<GQLZzDeleteListWhereInput>>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  publishedAt?: Maybe<Scalars['DateTime']>
  publishedAt_not?: Maybe<Scalars['DateTime']>
  publishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publishedAt_lt?: Maybe<Scalars['DateTime']>
  publishedAt_lte?: Maybe<Scalars['DateTime']>
  publishedAt_gt?: Maybe<Scalars['DateTime']>
  publishedAt_gte?: Maybe<Scalars['DateTime']>
  identifier?: Maybe<Scalars['String']>
  identifier_not?: Maybe<Scalars['String']>
  identifier_in?: Maybe<Array<Scalars['String']>>
  identifier_not_in?: Maybe<Array<Scalars['String']>>
  identifier_contains?: Maybe<Scalars['String']>
  identifier_not_contains?: Maybe<Scalars['String']>
  identifier_starts_with?: Maybe<Scalars['String']>
  identifier_not_starts_with?: Maybe<Scalars['String']>
  identifier_ends_with?: Maybe<Scalars['String']>
  identifier_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLZzDeleteListWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  identifier?: Maybe<Scalars['String']>
}

export type GQLAssetFragment = { __typename?: 'Asset' } & Pick<
  GQLAsset,
  'id' | 'url' | 'width' | 'height' | 'mimeType'
>

export type GQLBreadcrumbFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'id' | 'title' | 'metaRobots' | 'metaTitle' | 'url'
>

export type GQLGetBreadcrumbQueryVariables = {
  urls: Array<Scalars['String']>
  locale: GQLLocale
}

export type GQLGetBreadcrumbQuery = { __typename?: 'Query' } & {
  breadcrumbs: Array<{ __typename?: 'Page' } & GQLBreadcrumbFragment>
}

export type GQLContentRendererFragment = { __typename?: 'Page' } & {
  content: Array<{ __typename: 'RowHero' } & GQLRowHeroFragment>
}

export type GQLLinkExternalFragment = { __typename?: 'LinkExternal' } & Pick<
  GQLLinkExternal,
  'id' | 'url'
> & { exTitle: GQLLinkExternal['title'] } & {
    description?: Maybe<{ __typename?: 'RichText' } & GQLRichTextFragment>
  }

export type GQLLinkInternalFragment = { __typename?: 'LinkInternal' } & Pick<
  GQLLinkInternal,
  'id' | 'title'
> & {
    description?: Maybe<{ __typename?: 'RichText' } & GQLRichTextFragment>
    page?: Maybe<
      { __typename?: 'Page' } & Pick<GQLPage, 'title' | 'metaRobots' | 'metaTitle' | 'url'>
    >
  }

export type GQLMenuFragment = { __typename?: 'Menu' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<GQLPage, 'locale' | 'id' | 'title' | 'metaRobots' | 'url'>
  >
}

export type GQLPageLayoutFragment = { __typename?: 'Page' } & GQLPageMetaFragment &
  GQLContentRendererFragment

export type GQLGetPageLayoutQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

export type GQLGetPageLayoutQuery = { __typename?: 'Query' } & {
  pages: Array<{ __typename?: 'Page' } & GQLPageLayoutFragment>
  mainMenu?: Maybe<{ __typename?: 'Menu' } & GQLMenuFragment>
  team: Array<{ __typename?: 'Person' } & GQLPersonFragment>
}

export type GQLGetStaticPathsQueryVariables = {
  startsWith: Scalars['String']
  locale: GQLLocale
}

export type GQLGetStaticPathsQuery = { __typename?: 'Query' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<GQLPage, 'url'> & {
        localizations: Array<{ __typename?: 'Page' } & Pick<GQLPage, 'url' | 'locale'>>
      }
  >
}

export type GQLPageMetaFragment = { __typename?: 'Page' } & Pick<
  GQLPage,
  'title' | 'metaTitle' | 'metaDescription' | 'metaRobots' | 'url' | 'locale'
> & {
    localizations: Array<
      { __typename?: 'Page' } & Pick<GQLPage, 'id' | 'url' | 'title' | 'locale' | 'metaRobots'>
    >
  }

export type GQLPersonFragment = { __typename?: 'Person' } & Pick<GQLPerson, 'id' | 'name'> & {
    avatar: { __typename?: 'Asset' } & GQLAssetFragment
  }

export type GQLRichTextFragment = { __typename?: 'RichText' } & Pick<GQLRichText, 'raw'>

export type GQLGetAllRowColumThreeQueryVariables = {
  skip: Scalars['Int']
}

export type GQLGetAllRowColumThreeQuery = { __typename?: 'Query' } & {
  rowColumnThrees: Array<{ __typename?: 'RowColumnThree' } & GQLRowColumnThreeFragment>
}

export type GQLRowColumnThreeFragment = { __typename?: 'RowColumnThree' } & Pick<
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

export type GQLGetAllRowCompanySlidersQueryVariables = {
  skip: Scalars['Int']
}

export type GQLGetAllRowCompanySlidersQuery = { __typename?: 'Query' } & {
  rowCompanySliders: Array<{ __typename?: 'RowCompanySlider' } & GQLRowCompanySliderFragment>
}

export type GQLRowCompanySliderFragment = { __typename?: 'RowCompanySlider' } & Pick<
  GQLRowCompanySlider,
  'id'
> & {
    companies: Array<
      { __typename?: 'Company' } & Pick<GQLCompany, 'id'> & {
          logo: { __typename?: 'Asset' } & Pick<GQLAsset, 'mimeType' | 'url' | 'width' | 'height'>
        }
    >
  }

export type GQLGetAllRowHeroQueryVariables = {
  skip: Scalars['Int']
}

export type GQLGetAllRowHeroQuery = { __typename?: 'Query' } & {
  rowHeroes: Array<{ __typename?: 'RowHero' } & GQLRowHeroFragment>
}

export type GQLRowHeroFragment = { __typename?: 'RowHero' } & Pick<GQLRowHero, 'id'> & {
    asset: { __typename?: 'Asset' } & GQLAssetFragment
    text: { __typename?: 'RichText' } & GQLRichTextFragment
    links: Array<
      | ({ __typename?: 'LinkExternal' } & GQLLinkExternalFragment)
      | ({ __typename?: 'LinkInternal' } & GQLLinkInternalFragment)
    >
  }

export type GQLGetRowPeopleWithTextsQueryVariables = {
  skip: Scalars['Int']
}

export type GQLGetRowPeopleWithTextsQuery = { __typename?: 'Query' } & {
  rowPeopleWithTexts: Array<{ __typename?: 'RowPeopleWithText' } & GQLRowPeopleWithTextFragment>
}

export type GQLRowPeopleWithTextFragment = { __typename?: 'RowPeopleWithText' } & Pick<
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

export type GQLCreatePageMutationVariables = {
  page: GQLPageCreateInput
}

export type GQLCreatePageMutation = { __typename?: 'Mutation' } & {
  createPage?: Maybe<{ __typename?: 'Page' } & Pick<GQLPage, 'id'>>
}

export const BreadcrumbFragmentDoc = gql`
  fragment Breadcrumb on Page {
    id
    title
    metaRobots
    metaTitle
    url
  }
`
export const MenuFragmentDoc = gql`
  fragment Menu on Menu {
    pages {
      locale
      id
      title
      metaRobots
      url
    }
  }
`
export const PageMetaFragmentDoc = gql`
  fragment PageMeta on Page {
    title
    metaTitle
    metaDescription
    metaRobots
    url
    locale
    localizations {
      id
      url
      title
      locale
      metaRobots
    }
  }
`
export const AssetFragmentDoc = gql`
  fragment Asset on Asset {
    id
    url
    width
    height
    mimeType
  }
`
export const RichTextFragmentDoc = gql`
  fragment RichText on RichText {
    raw
  }
`
export const LinkInternalFragmentDoc = gql`
  fragment LinkInternal on LinkInternal {
    id
    title
    description {
      ...RichText
    }
    page {
      title
      metaRobots
      metaTitle
      url
    }
  }
  ${RichTextFragmentDoc}
`
export const LinkExternalFragmentDoc = gql`
  fragment LinkExternal on LinkExternal {
    id
    exTitle: title
    description {
      ...RichText
    }
    url
  }
  ${RichTextFragmentDoc}
`
export const RowHeroFragmentDoc = gql`
  fragment RowHero on RowHero {
    id
    asset {
      ...Asset
    }
    text {
      ...RichText
    }
    links {
      ...LinkInternal
      ...LinkExternal
    }
  }
  ${AssetFragmentDoc}
  ${RichTextFragmentDoc}
  ${LinkInternalFragmentDoc}
  ${LinkExternalFragmentDoc}
`
export const ContentRendererFragmentDoc = gql`
  fragment ContentRenderer on Page {
    content {
      __typename
      ...RowHero
    }
  }
  ${RowHeroFragmentDoc}
`
export const PageLayoutFragmentDoc = gql`
  fragment PageLayout on Page {
    ...PageMeta
    ...ContentRenderer
  }
  ${PageMetaFragmentDoc}
  ${ContentRendererFragmentDoc}
`
export const RowColumnThreeFragmentDoc = gql`
  fragment RowColumnThree on RowColumnThree {
    id
    colOne {
      ...RichText
    }
    colOneIcon {
      ...Asset
    }
    colTwo {
      ...RichText
    }
    colTwoIcon {
      ...Asset
    }
    colThree {
      ...RichText
    }
    colThreeIcon {
      ...Asset
    }
  }
  ${RichTextFragmentDoc}
  ${AssetFragmentDoc}
`
export const RowCompanySliderFragmentDoc = gql`
  fragment RowCompanySlider on RowCompanySlider {
    id
    companies {
      id
      logo {
        mimeType
        url
        width
        height
      }
    }
  }
`
export const PersonFragmentDoc = gql`
  fragment Person on Person {
    id
    name
    avatar {
      ...Asset
    }
  }
  ${AssetFragmentDoc}
`
export const RowPeopleWithTextFragmentDoc = gql`
  fragment RowPeopleWithText on RowPeopleWithText {
    id
    text {
      ...RichText
    }
    links {
      ...LinkInternal
    }
    personList {
      people {
        ...Person
      }
    }
  }
  ${RichTextFragmentDoc}
  ${LinkInternalFragmentDoc}
  ${PersonFragmentDoc}
`
export const GetBreadcrumbDocument = gql`
  query GetBreadcrumb($urls: [String!]!, $locale: Locale!) {
    breadcrumbs: pages(where: { url_in: $urls }, locales: [$locale]) {
      ...Breadcrumb
    }
  }
  ${BreadcrumbFragmentDoc}
`

/**
 * __useGetBreadcrumbQuery__
 *
 * To run a query within a React component, call `useGetBreadcrumbQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBreadcrumbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBreadcrumbQuery({
 *   variables: {
 *      urls: // value for 'urls'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetBreadcrumbQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetBreadcrumbQuery,
    GQLGetBreadcrumbQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>(
    GetBreadcrumbDocument,
    baseOptions,
  )
}
export function useGetBreadcrumbLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetBreadcrumbQuery,
    GQLGetBreadcrumbQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetBreadcrumbQuery, GQLGetBreadcrumbQueryVariables>(
    GetBreadcrumbDocument,
    baseOptions,
  )
}
export type GetBreadcrumbQueryHookResult = ReturnType<typeof useGetBreadcrumbQuery>
export type GetBreadcrumbLazyQueryHookResult = ReturnType<typeof useGetBreadcrumbLazyQuery>
export type GetBreadcrumbQueryResult = ApolloReactCommon.QueryResult<
  GQLGetBreadcrumbQuery,
  GQLGetBreadcrumbQueryVariables
>
export const GetPageLayoutDocument = gql`
  query GetPageLayout($url: String!, $locale: Locale!) {
    pages(where: { url: $url }, locales: [$locale]) {
      ...PageLayout
    }
    mainMenu: menu(where: { identity: "main" }) {
      ...Menu
    }
    team: people(first: 1) {
      ...Person
    }
  }
  ${PageLayoutFragmentDoc}
  ${MenuFragmentDoc}
  ${PersonFragmentDoc}
`

/**
 * __useGetPageLayoutQuery__
 *
 * To run a query within a React component, call `useGetPageLayoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageLayoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageLayoutQuery({
 *   variables: {
 *      url: // value for 'url'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetPageLayoutQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetPageLayoutQuery,
    GQLGetPageLayoutQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetPageLayoutQuery, GQLGetPageLayoutQueryVariables>(
    GetPageLayoutDocument,
    baseOptions,
  )
}
export function useGetPageLayoutLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetPageLayoutQuery,
    GQLGetPageLayoutQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetPageLayoutQuery, GQLGetPageLayoutQueryVariables>(
    GetPageLayoutDocument,
    baseOptions,
  )
}
export type GetPageLayoutQueryHookResult = ReturnType<typeof useGetPageLayoutQuery>
export type GetPageLayoutLazyQueryHookResult = ReturnType<typeof useGetPageLayoutLazyQuery>
export type GetPageLayoutQueryResult = ApolloReactCommon.QueryResult<
  GQLGetPageLayoutQuery,
  GQLGetPageLayoutQueryVariables
>
export const GetStaticPathsDocument = gql`
  query GetStaticPaths($startsWith: String!, $locale: Locale!) {
    pages(where: { url_starts_with: $startsWith }, orderBy: url_ASC, locales: [$locale]) {
      url
      localizations {
        url
        locale
      }
    }
  }
`

/**
 * __useGetStaticPathsQuery__
 *
 * To run a query within a React component, call `useGetStaticPathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaticPathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaticPathsQuery({
 *   variables: {
 *      startsWith: // value for 'startsWith'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetStaticPathsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetStaticPathsQuery,
    GQLGetStaticPathsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetStaticPathsQuery, GQLGetStaticPathsQueryVariables>(
    GetStaticPathsDocument,
    baseOptions,
  )
}
export function useGetStaticPathsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetStaticPathsQuery,
    GQLGetStaticPathsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetStaticPathsQuery, GQLGetStaticPathsQueryVariables>(
    GetStaticPathsDocument,
    baseOptions,
  )
}
export type GetStaticPathsQueryHookResult = ReturnType<typeof useGetStaticPathsQuery>
export type GetStaticPathsLazyQueryHookResult = ReturnType<typeof useGetStaticPathsLazyQuery>
export type GetStaticPathsQueryResult = ApolloReactCommon.QueryResult<
  GQLGetStaticPathsQuery,
  GQLGetStaticPathsQueryVariables
>
export const GetAllRowColumThreeDocument = gql`
  query GetAllRowColumThree($skip: Int!) {
    rowColumnThrees(first: 1, skip: $skip) {
      ...RowColumnThree
    }
  }
  ${RowColumnThreeFragmentDoc}
`

/**
 * __useGetAllRowColumThreeQuery__
 *
 * To run a query within a React component, call `useGetAllRowColumThreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRowColumThreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRowColumThreeQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetAllRowColumThreeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetAllRowColumThreeQuery,
    GQLGetAllRowColumThreeQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GQLGetAllRowColumThreeQuery,
    GQLGetAllRowColumThreeQueryVariables
  >(GetAllRowColumThreeDocument, baseOptions)
}
export function useGetAllRowColumThreeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetAllRowColumThreeQuery,
    GQLGetAllRowColumThreeQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GQLGetAllRowColumThreeQuery,
    GQLGetAllRowColumThreeQueryVariables
  >(GetAllRowColumThreeDocument, baseOptions)
}
export type GetAllRowColumThreeQueryHookResult = ReturnType<typeof useGetAllRowColumThreeQuery>
export type GetAllRowColumThreeLazyQueryHookResult = ReturnType<
  typeof useGetAllRowColumThreeLazyQuery
>
export type GetAllRowColumThreeQueryResult = ApolloReactCommon.QueryResult<
  GQLGetAllRowColumThreeQuery,
  GQLGetAllRowColumThreeQueryVariables
>
export const GetAllRowCompanySlidersDocument = gql`
  query GetAllRowCompanySliders($skip: Int!) {
    rowCompanySliders(first: 1, skip: $skip) {
      ...RowCompanySlider
    }
  }
  ${RowCompanySliderFragmentDoc}
`

/**
 * __useGetAllRowCompanySlidersQuery__
 *
 * To run a query within a React component, call `useGetAllRowCompanySlidersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRowCompanySlidersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRowCompanySlidersQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetAllRowCompanySlidersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetAllRowCompanySlidersQuery,
    GQLGetAllRowCompanySlidersQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GQLGetAllRowCompanySlidersQuery,
    GQLGetAllRowCompanySlidersQueryVariables
  >(GetAllRowCompanySlidersDocument, baseOptions)
}
export function useGetAllRowCompanySlidersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetAllRowCompanySlidersQuery,
    GQLGetAllRowCompanySlidersQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GQLGetAllRowCompanySlidersQuery,
    GQLGetAllRowCompanySlidersQueryVariables
  >(GetAllRowCompanySlidersDocument, baseOptions)
}
export type GetAllRowCompanySlidersQueryHookResult = ReturnType<
  typeof useGetAllRowCompanySlidersQuery
>
export type GetAllRowCompanySlidersLazyQueryHookResult = ReturnType<
  typeof useGetAllRowCompanySlidersLazyQuery
>
export type GetAllRowCompanySlidersQueryResult = ApolloReactCommon.QueryResult<
  GQLGetAllRowCompanySlidersQuery,
  GQLGetAllRowCompanySlidersQueryVariables
>
export const GetAllRowHeroDocument = gql`
  query GetAllRowHero($skip: Int!) {
    rowHeroes(first: 1, skip: $skip) {
      ...RowHero
    }
  }
  ${RowHeroFragmentDoc}
`

/**
 * __useGetAllRowHeroQuery__
 *
 * To run a query within a React component, call `useGetAllRowHeroQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRowHeroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRowHeroQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetAllRowHeroQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetAllRowHeroQuery,
    GQLGetAllRowHeroQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetAllRowHeroQuery, GQLGetAllRowHeroQueryVariables>(
    GetAllRowHeroDocument,
    baseOptions,
  )
}
export function useGetAllRowHeroLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetAllRowHeroQuery,
    GQLGetAllRowHeroQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetAllRowHeroQuery, GQLGetAllRowHeroQueryVariables>(
    GetAllRowHeroDocument,
    baseOptions,
  )
}
export type GetAllRowHeroQueryHookResult = ReturnType<typeof useGetAllRowHeroQuery>
export type GetAllRowHeroLazyQueryHookResult = ReturnType<typeof useGetAllRowHeroLazyQuery>
export type GetAllRowHeroQueryResult = ApolloReactCommon.QueryResult<
  GQLGetAllRowHeroQuery,
  GQLGetAllRowHeroQueryVariables
>
export const GetRowPeopleWithTextsDocument = gql`
  query GetRowPeopleWithTexts($skip: Int!) {
    rowPeopleWithTexts(first: 1, skip: $skip) {
      ...RowPeopleWithText
    }
  }
  ${RowPeopleWithTextFragmentDoc}
`

/**
 * __useGetRowPeopleWithTextsQuery__
 *
 * To run a query within a React component, call `useGetRowPeopleWithTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRowPeopleWithTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRowPeopleWithTextsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetRowPeopleWithTextsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetRowPeopleWithTextsQuery,
    GQLGetRowPeopleWithTextsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GQLGetRowPeopleWithTextsQuery,
    GQLGetRowPeopleWithTextsQueryVariables
  >(GetRowPeopleWithTextsDocument, baseOptions)
}
export function useGetRowPeopleWithTextsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetRowPeopleWithTextsQuery,
    GQLGetRowPeopleWithTextsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GQLGetRowPeopleWithTextsQuery,
    GQLGetRowPeopleWithTextsQueryVariables
  >(GetRowPeopleWithTextsDocument, baseOptions)
}
export type GetRowPeopleWithTextsQueryHookResult = ReturnType<typeof useGetRowPeopleWithTextsQuery>
export type GetRowPeopleWithTextsLazyQueryHookResult = ReturnType<
  typeof useGetRowPeopleWithTextsLazyQuery
>
export type GetRowPeopleWithTextsQueryResult = ApolloReactCommon.QueryResult<
  GQLGetRowPeopleWithTextsQuery,
  GQLGetRowPeopleWithTextsQueryVariables
>
export const CreatePageDocument = gql`
  mutation CreatePage($page: PageCreateInput!) {
    createPage(data: $page) {
      id
    }
  }
`
export type GQLCreatePageMutationFn = ApolloReactCommon.MutationFunction<
  GQLCreatePageMutation,
  GQLCreatePageMutationVariables
>

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useCreatePageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLCreatePageMutation,
    GQLCreatePageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<GQLCreatePageMutation, GQLCreatePageMutationVariables>(
    CreatePageDocument,
    baseOptions,
  )
}
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>
export type CreatePageMutationResult = ApolloReactCommon.MutationResult<GQLCreatePageMutation>
export type CreatePageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLCreatePageMutation,
  GQLCreatePageMutationVariables
>
