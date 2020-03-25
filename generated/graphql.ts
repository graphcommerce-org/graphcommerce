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
  RGBATransparency: any
  Hex: any
  RGBAHue: any
  Json: any
  Date: any
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
  heroBannerVideo: Array<GQLHeroBanner>
  personAvatar: Array<GQLPerson>
  companyLogo: Array<GQLCompany>
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

export type GQLAssetHeroBannerVideoArgs = {
  where?: Maybe<GQLHeroBannerWhereInput>
  orderBy?: Maybe<GQLHeroBannerOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
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
  heroBannerVideo?: Maybe<GQLHeroBannerCreateManyInlineInput>
  personAvatar?: Maybe<GQLPersonCreateManyInlineInput>
  companyLogo?: Maybe<GQLCompanyCreateManyInlineInput>
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
  heroBannerVideo_every?: Maybe<GQLHeroBannerWhereInput>
  heroBannerVideo_some?: Maybe<GQLHeroBannerWhereInput>
  heroBannerVideo_none?: Maybe<GQLHeroBannerWhereInput>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
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
  heroBannerVideo?: Maybe<GQLHeroBannerUpdateManyInlineInput>
  personAvatar?: Maybe<GQLPersonUpdateManyInlineInput>
  companyLogo?: Maybe<GQLCompanyUpdateManyInlineInput>
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
  heroBannerVideo_every?: Maybe<GQLHeroBannerWhereInput>
  heroBannerVideo_some?: Maybe<GQLHeroBannerWhereInput>
  heroBannerVideo_none?: Maybe<GQLHeroBannerWhereInput>
  personAvatar_every?: Maybe<GQLPersonWhereInput>
  personAvatar_some?: Maybe<GQLPersonWhereInput>
  personAvatar_none?: Maybe<GQLPersonWhereInput>
  companyLogo_every?: Maybe<GQLCompanyWhereInput>
  companyLogo_some?: Maybe<GQLCompanyWhereInput>
  companyLogo_none?: Maybe<GQLCompanyWhereInput>
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
  list: Array<GQLList>
  logo: GQLAsset
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
  list?: Maybe<GQLListCreateManyInlineInput>
  logo: GQLAssetCreateOneInlineInput
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
  list?: Maybe<GQLListUpdateManyInlineInput>
  logo?: Maybe<GQLAssetUpdateOneInlineInput>
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

export type GQLHeroBanner = GQLNode & {
  __typename?: 'HeroBanner'
  stage: GQLStage
  documentInStages: Array<GQLHeroBanner>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  list: Array<GQLList>
  title: GQLRichText
  page: Array<GQLPage>
  content: GQLRichText
  video?: Maybe<GQLAsset>
  link: Array<GQLLink>
}

export type GQLHeroBannerDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLHeroBannerListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLHeroBannerPageArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLHeroBannerLinkArgs = {
  where?: Maybe<GQLLinkWhereInput>
  orderBy?: Maybe<GQLLinkOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLHeroBannerConnectInput = {
  where: GQLHeroBannerWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLHeroBannerConnection = {
  __typename?: 'HeroBannerConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLHeroBannerEdge>
  aggregate: GQLAggregate
}

export type GQLHeroBannerCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  list?: Maybe<GQLListCreateManyInlineInput>
  title: Scalars['RichTextAST']
  page?: Maybe<GQLPageCreateManyInlineInput>
  content: Scalars['RichTextAST']
  video?: Maybe<GQLAssetCreateOneInlineInput>
  link?: Maybe<GQLLinkCreateManyInlineInput>
}

export type GQLHeroBannerCreateManyInlineInput = {
  create?: Maybe<Array<GQLHeroBannerCreateInput>>
  connect?: Maybe<Array<GQLHeroBannerWhereUniqueInput>>
}

export type GQLHeroBannerCreateOneInlineInput = {
  create?: Maybe<GQLHeroBannerCreateInput>
  connect?: Maybe<GQLHeroBannerWhereUniqueInput>
}

export type GQLHeroBannerEdge = {
  __typename?: 'HeroBannerEdge'
  node: GQLHeroBanner
  cursor: Scalars['String']
}

export type GQLHeroBannerManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLHeroBannerWhereInput>>
  OR?: Maybe<Array<GQLHeroBannerWhereInput>>
  NOT?: Maybe<Array<GQLHeroBannerWhereInput>>
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
  video?: Maybe<GQLAssetWhereInput>
  link_every?: Maybe<GQLLinkWhereInput>
  link_some?: Maybe<GQLLinkWhereInput>
  link_none?: Maybe<GQLLinkWhereInput>
}

export enum GQLHeroBannerOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLHeroBannerUpdateInput = {
  list?: Maybe<GQLListUpdateManyInlineInput>
  title?: Maybe<Scalars['RichTextAST']>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  content?: Maybe<Scalars['RichTextAST']>
  video?: Maybe<GQLAssetUpdateOneInlineInput>
  link?: Maybe<GQLLinkUpdateManyInlineInput>
}

export type GQLHeroBannerUpdateManyInlineInput = {
  create?: Maybe<Array<GQLHeroBannerCreateInput>>
  connect?: Maybe<Array<GQLHeroBannerConnectInput>>
  set?: Maybe<Array<GQLHeroBannerWhereUniqueInput>>
  update?: Maybe<Array<GQLHeroBannerUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLHeroBannerUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLHeroBannerWhereUniqueInput>>
  delete?: Maybe<Array<GQLHeroBannerWhereUniqueInput>>
}

export type GQLHeroBannerUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title: Scalars['RichTextAST']
  content: Scalars['RichTextAST']
}

export type GQLHeroBannerUpdateManyWithNestedWhereInput = {
  where: GQLHeroBannerWhereInput
  data: GQLHeroBannerUpdateManyInput
}

export type GQLHeroBannerUpdateOneInlineInput = {
  create?: Maybe<GQLHeroBannerCreateInput>
  update?: Maybe<GQLHeroBannerUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLHeroBannerUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLHeroBannerWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLHeroBannerUpdateWithNestedWhereUniqueInput = {
  where: GQLHeroBannerWhereUniqueInput
  data: GQLHeroBannerUpdateInput
}

export type GQLHeroBannerUpsertInput = {
  create: GQLHeroBannerCreateInput
  update: GQLHeroBannerUpdateInput
}

export type GQLHeroBannerUpsertWithNestedWhereUniqueInput = {
  where: GQLHeroBannerWhereUniqueInput
  data: GQLHeroBannerUpsertInput
}

export type GQLHeroBannerWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLHeroBannerWhereInput>>
  OR?: Maybe<Array<GQLHeroBannerWhereInput>>
  NOT?: Maybe<Array<GQLHeroBannerWhereInput>>
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
  video?: Maybe<GQLAssetWhereInput>
  link_every?: Maybe<GQLLinkWhereInput>
  link_some?: Maybe<GQLLinkWhereInput>
  link_none?: Maybe<GQLLinkWhereInput>
}

export type GQLHeroBannerWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
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

export type GQLLink = GQLNode & {
  __typename?: 'Link'
  stage: GQLStage
  documentInStages: Array<GQLLink>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  list: Array<GQLList>
  page: Array<GQLPage>
  title?: Maybe<Scalars['String']>
  description?: Maybe<GQLRichText>
  heroBanner: Array<GQLHeroBanner>
}

export type GQLLinkDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLLinkListArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkPageArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkHeroBannerArgs = {
  where?: Maybe<GQLHeroBannerWhereInput>
  orderBy?: Maybe<GQLHeroBannerOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLLinkConnectInput = {
  where: GQLLinkWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLLinkConnection = {
  __typename?: 'LinkConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLLinkEdge>
  aggregate: GQLAggregate
}

export type GQLLinkCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  list?: Maybe<GQLListCreateManyInlineInput>
  page?: Maybe<GQLPageCreateManyInlineInput>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['RichTextAST']>
  heroBanner?: Maybe<GQLHeroBannerCreateManyInlineInput>
}

export type GQLLinkCreateManyInlineInput = {
  create?: Maybe<Array<GQLLinkCreateInput>>
  connect?: Maybe<Array<GQLLinkWhereUniqueInput>>
}

export type GQLLinkCreateOneInlineInput = {
  create?: Maybe<GQLLinkCreateInput>
  connect?: Maybe<GQLLinkWhereUniqueInput>
}

export type GQLLinkEdge = {
  __typename?: 'LinkEdge'
  node: GQLLink
  cursor: Scalars['String']
}

export type GQLLinkManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkWhereInput>>
  OR?: Maybe<Array<GQLLinkWhereInput>>
  NOT?: Maybe<Array<GQLLinkWhereInput>>
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
  page_every?: Maybe<GQLPageWhereInput>
  page_some?: Maybe<GQLPageWhereInput>
  page_none?: Maybe<GQLPageWhereInput>
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
  heroBanner_every?: Maybe<GQLHeroBannerWhereInput>
  heroBanner_some?: Maybe<GQLHeroBannerWhereInput>
  heroBanner_none?: Maybe<GQLHeroBannerWhereInput>
}

export enum GQLLinkOrderByInput {
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

export type GQLLinkUpdateInput = {
  list?: Maybe<GQLListUpdateManyInlineInput>
  page?: Maybe<GQLPageUpdateManyInlineInput>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['RichTextAST']>
  heroBanner?: Maybe<GQLHeroBannerUpdateManyInlineInput>
}

export type GQLLinkUpdateManyInlineInput = {
  create?: Maybe<Array<GQLLinkCreateInput>>
  connect?: Maybe<Array<GQLLinkConnectInput>>
  set?: Maybe<Array<GQLLinkWhereUniqueInput>>
  update?: Maybe<Array<GQLLinkUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLLinkUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLLinkWhereUniqueInput>>
  delete?: Maybe<Array<GQLLinkWhereUniqueInput>>
}

export type GQLLinkUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['RichTextAST']>
}

export type GQLLinkUpdateManyWithNestedWhereInput = {
  where: GQLLinkWhereInput
  data: GQLLinkUpdateManyInput
}

export type GQLLinkUpdateOneInlineInput = {
  create?: Maybe<GQLLinkCreateInput>
  update?: Maybe<GQLLinkUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLLinkUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLLinkWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLLinkUpdateWithNestedWhereUniqueInput = {
  where: GQLLinkWhereUniqueInput
  data: GQLLinkUpdateInput
}

export type GQLLinkUpsertInput = {
  create: GQLLinkCreateInput
  update: GQLLinkUpdateInput
}

export type GQLLinkUpsertWithNestedWhereUniqueInput = {
  where: GQLLinkWhereUniqueInput
  data: GQLLinkUpsertInput
}

export type GQLLinkWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLLinkWhereInput>>
  OR?: Maybe<Array<GQLLinkWhereInput>>
  NOT?: Maybe<Array<GQLLinkWhereInput>>
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
  page_every?: Maybe<GQLPageWhereInput>
  page_some?: Maybe<GQLPageWhereInput>
  page_none?: Maybe<GQLPageWhereInput>
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
  heroBanner_every?: Maybe<GQLHeroBannerWhereInput>
  heroBanner_some?: Maybe<GQLHeroBannerWhereInput>
  heroBanner_none?: Maybe<GQLHeroBannerWhereInput>
}

export type GQLLinkWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLList = GQLNode & {
  __typename?: 'List'
  stage: GQLStage
  documentInStages: Array<GQLList>
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publishedAt?: Maybe<Scalars['DateTime']>
  items: Array<GQLListItems>
}

export type GQLListDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
}

export type GQLListItemsArgs = {
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLListConnectInput = {
  where: GQLListWhereUniqueInput
  position?: Maybe<GQLConnectPositionInput>
}

export type GQLListConnection = {
  __typename?: 'ListConnection'
  pageInfo: GQLPageInfo
  edges: Array<GQLListEdge>
  aggregate: GQLAggregate
}

export type GQLListCreateInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  items?: Maybe<GQLListItemsCreateManyInlineInput>
}

export type GQLListCreateManyInlineInput = {
  create?: Maybe<Array<GQLListCreateInput>>
  connect?: Maybe<Array<GQLListWhereUniqueInput>>
}

export type GQLListCreateOneInlineInput = {
  create?: Maybe<GQLListCreateInput>
  connect?: Maybe<GQLListWhereUniqueInput>
}

export type GQLListEdge = {
  __typename?: 'ListEdge'
  node: GQLList
  cursor: Scalars['String']
}

export type GQLListItems = GQLPage | GQLPerson | GQLCompany | GQLHeroBanner | GQLLink

export type GQLListItemsConnectInput = {
  Page?: Maybe<GQLPageConnectInput>
  Person?: Maybe<GQLPersonConnectInput>
  Company?: Maybe<GQLCompanyConnectInput>
  HeroBanner?: Maybe<GQLHeroBannerConnectInput>
  Link?: Maybe<GQLLinkConnectInput>
}

export type GQLListItemsCreateInput = {
  Page?: Maybe<GQLPageCreateInput>
  Person?: Maybe<GQLPersonCreateInput>
  Company?: Maybe<GQLCompanyCreateInput>
  HeroBanner?: Maybe<GQLHeroBannerCreateInput>
  Link?: Maybe<GQLLinkCreateInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateInput>
  Link?: Maybe<GQLLinkUpdateInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateManyWithNestedWhereInput>
  Link?: Maybe<GQLLinkUpdateManyWithNestedWhereInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateWithNestedWhereUniqueInput>
  Link?: Maybe<GQLLinkUpdateWithNestedWhereUniqueInput>
}

export type GQLListItemsUpsertWithNestedWhereUniqueInput = {
  Page?: Maybe<GQLPageUpsertWithNestedWhereUniqueInput>
  Person?: Maybe<GQLPersonUpsertWithNestedWhereUniqueInput>
  Company?: Maybe<GQLCompanyUpsertWithNestedWhereUniqueInput>
  HeroBanner?: Maybe<GQLHeroBannerUpsertWithNestedWhereUniqueInput>
  Link?: Maybe<GQLLinkUpsertWithNestedWhereUniqueInput>
}

export type GQLListItemsWhereInput = {
  Page?: Maybe<GQLPageWhereInput>
  Person?: Maybe<GQLPersonWhereInput>
  Company?: Maybe<GQLCompanyWhereInput>
  HeroBanner?: Maybe<GQLHeroBannerWhereInput>
  Link?: Maybe<GQLLinkWhereInput>
}

export type GQLListItemsWhereUniqueInput = {
  Page?: Maybe<GQLPageWhereUniqueInput>
  Person?: Maybe<GQLPersonWhereUniqueInput>
  Company?: Maybe<GQLCompanyWhereUniqueInput>
  HeroBanner?: Maybe<GQLHeroBannerWhereUniqueInput>
  Link?: Maybe<GQLLinkWhereUniqueInput>
}

export type GQLListManyWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLListWhereInput>>
  OR?: Maybe<Array<GQLListWhereInput>>
  NOT?: Maybe<Array<GQLListWhereInput>>
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

export enum GQLListOrderByInput {
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
}

export type GQLListUpdateInput = {
  items?: Maybe<GQLListItemsUpdateManyInlineInput>
}

export type GQLListUpdateManyInlineInput = {
  create?: Maybe<Array<GQLListCreateInput>>
  connect?: Maybe<Array<GQLListConnectInput>>
  set?: Maybe<Array<GQLListWhereUniqueInput>>
  update?: Maybe<Array<GQLListUpdateWithNestedWhereUniqueInput>>
  upsert?: Maybe<Array<GQLListUpsertWithNestedWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLListWhereUniqueInput>>
  delete?: Maybe<Array<GQLListWhereUniqueInput>>
}

export type GQLListUpdateManyInput = {
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type GQLListUpdateManyWithNestedWhereInput = {
  where: GQLListWhereInput
  data: GQLListUpdateManyInput
}

export type GQLListUpdateOneInlineInput = {
  create?: Maybe<GQLListCreateInput>
  update?: Maybe<GQLListUpdateWithNestedWhereUniqueInput>
  upsert?: Maybe<GQLListUpsertWithNestedWhereUniqueInput>
  connect?: Maybe<GQLListWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
}

export type GQLListUpdateWithNestedWhereUniqueInput = {
  where: GQLListWhereUniqueInput
  data: GQLListUpdateInput
}

export type GQLListUpsertInput = {
  create: GQLListCreateInput
  update: GQLListUpdateInput
}

export type GQLListUpsertWithNestedWhereUniqueInput = {
  where: GQLListWhereUniqueInput
  data: GQLListUpsertInput
}

export type GQLListWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLListWhereInput>>
  OR?: Maybe<Array<GQLListWhereInput>>
  NOT?: Maybe<Array<GQLListWhereInput>>
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

export type GQLListWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
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
  createHeroBanner?: Maybe<GQLHeroBanner>
  updateHeroBanner?: Maybe<GQLHeroBanner>
  deleteHeroBanner?: Maybe<GQLHeroBanner>
  upsertHeroBanner?: Maybe<GQLHeroBanner>
  publishHeroBanner?: Maybe<GQLHeroBanner>
  unpublishHeroBanner?: Maybe<GQLHeroBanner>
  updateManyHeroBanners: GQLBatchPayload
  deleteManyHeroBanners: GQLBatchPayload
  publishManyHeroBanners: GQLBatchPayload
  unpublishManyHeroBanners: GQLBatchPayload
  createLink?: Maybe<GQLLink>
  updateLink?: Maybe<GQLLink>
  deleteLink?: Maybe<GQLLink>
  upsertLink?: Maybe<GQLLink>
  publishLink?: Maybe<GQLLink>
  unpublishLink?: Maybe<GQLLink>
  updateManyLinks: GQLBatchPayload
  deleteManyLinks: GQLBatchPayload
  publishManyLinks: GQLBatchPayload
  unpublishManyLinks: GQLBatchPayload
  createList?: Maybe<GQLList>
  updateList?: Maybe<GQLList>
  deleteList?: Maybe<GQLList>
  upsertList?: Maybe<GQLList>
  publishList?: Maybe<GQLList>
  unpublishList?: Maybe<GQLList>
  updateManyLists: GQLBatchPayload
  deleteManyLists: GQLBatchPayload
  publishManyLists: GQLBatchPayload
  unpublishManyLists: GQLBatchPayload
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
  from: Array<GQLStage>
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
  where: GQLAssetManyWhereInput
  to: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyAssetsArgs = {
  where: GQLAssetManyWhereInput
  from: Array<GQLStage>
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
  from: Array<GQLStage>
}

export type GQLMutationUpdateManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
  data: GQLCompanyUpdateManyInput
}

export type GQLMutationDeleteManyCompaniesArgs = {
  where?: Maybe<GQLCompanyManyWhereInput>
}

export type GQLMutationPublishManyCompaniesArgs = {
  where: GQLCompanyManyWhereInput
  to: Array<GQLStage>
}

export type GQLMutationUnpublishManyCompaniesArgs = {
  where: GQLCompanyManyWhereInput
  from: Array<GQLStage>
}

export type GQLMutationCreateHeroBannerArgs = {
  data: GQLHeroBannerCreateInput
}

export type GQLMutationUpdateHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
  data: GQLHeroBannerUpdateInput
}

export type GQLMutationDeleteHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
}

export type GQLMutationUpsertHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
  upsert: GQLHeroBannerUpsertInput
}

export type GQLMutationPublishHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
  from: Array<GQLStage>
}

export type GQLMutationUpdateManyHeroBannersArgs = {
  where?: Maybe<GQLHeroBannerManyWhereInput>
  data: GQLHeroBannerUpdateManyInput
}

export type GQLMutationDeleteManyHeroBannersArgs = {
  where?: Maybe<GQLHeroBannerManyWhereInput>
}

export type GQLMutationPublishManyHeroBannersArgs = {
  where: GQLHeroBannerManyWhereInput
  to: Array<GQLStage>
}

export type GQLMutationUnpublishManyHeroBannersArgs = {
  where: GQLHeroBannerManyWhereInput
  from: Array<GQLStage>
}

export type GQLMutationCreateLinkArgs = {
  data: GQLLinkCreateInput
}

export type GQLMutationUpdateLinkArgs = {
  where: GQLLinkWhereUniqueInput
  data: GQLLinkUpdateInput
}

export type GQLMutationDeleteLinkArgs = {
  where: GQLLinkWhereUniqueInput
}

export type GQLMutationUpsertLinkArgs = {
  where: GQLLinkWhereUniqueInput
  upsert: GQLLinkUpsertInput
}

export type GQLMutationPublishLinkArgs = {
  where: GQLLinkWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishLinkArgs = {
  where: GQLLinkWhereUniqueInput
  from: Array<GQLStage>
}

export type GQLMutationUpdateManyLinksArgs = {
  where?: Maybe<GQLLinkManyWhereInput>
  data: GQLLinkUpdateManyInput
}

export type GQLMutationDeleteManyLinksArgs = {
  where?: Maybe<GQLLinkManyWhereInput>
}

export type GQLMutationPublishManyLinksArgs = {
  where: GQLLinkManyWhereInput
  to: Array<GQLStage>
}

export type GQLMutationUnpublishManyLinksArgs = {
  where: GQLLinkManyWhereInput
  from: Array<GQLStage>
}

export type GQLMutationCreateListArgs = {
  data: GQLListCreateInput
}

export type GQLMutationUpdateListArgs = {
  where: GQLListWhereUniqueInput
  data: GQLListUpdateInput
}

export type GQLMutationDeleteListArgs = {
  where: GQLListWhereUniqueInput
}

export type GQLMutationUpsertListArgs = {
  where: GQLListWhereUniqueInput
  upsert: GQLListUpsertInput
}

export type GQLMutationPublishListArgs = {
  where: GQLListWhereUniqueInput
  to?: Array<GQLStage>
}

export type GQLMutationUnpublishListArgs = {
  where: GQLListWhereUniqueInput
  from: Array<GQLStage>
}

export type GQLMutationUpdateManyListsArgs = {
  where?: Maybe<GQLListManyWhereInput>
  data: GQLListUpdateManyInput
}

export type GQLMutationDeleteManyListsArgs = {
  where?: Maybe<GQLListManyWhereInput>
}

export type GQLMutationPublishManyListsArgs = {
  where: GQLListManyWhereInput
  to: Array<GQLStage>
}

export type GQLMutationUnpublishManyListsArgs = {
  where: GQLListManyWhereInput
  from: Array<GQLStage>
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
  from: Array<GQLStage>
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
  where: GQLPageManyWhereInput
  to: Array<GQLStage>
  locales?: Maybe<Array<GQLLocale>>
  publishBase?: Maybe<Scalars['Boolean']>
}

export type GQLMutationUnpublishManyPagesArgs = {
  where: GQLPageManyWhereInput
  from: Array<GQLStage>
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
  from: Array<GQLStage>
}

export type GQLMutationUpdateManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
  data: GQLPersonUpdateManyInput
}

export type GQLMutationDeleteManyPeopleArgs = {
  where?: Maybe<GQLPersonManyWhereInput>
}

export type GQLMutationPublishManyPeopleArgs = {
  where: GQLPersonManyWhereInput
  to: Array<GQLStage>
}

export type GQLMutationUnpublishManyPeopleArgs = {
  where: GQLPersonManyWhereInput
  from: Array<GQLStage>
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
  list: Array<GQLList>
  link: Array<GQLLink>
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

export type GQLPageLinkArgs = {
  where?: Maybe<GQLLinkWhereInput>
  orderBy?: Maybe<GQLLinkOrderByInput>
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

export type GQLPageContent = GQLHeroBanner

export type GQLPageContentConnectInput = {
  HeroBanner?: Maybe<GQLHeroBannerConnectInput>
}

export type GQLPageContentCreateInput = {
  HeroBanner?: Maybe<GQLHeroBannerCreateInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateManyWithNestedWhereInput>
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
  HeroBanner?: Maybe<GQLHeroBannerUpdateWithNestedWhereUniqueInput>
}

export type GQLPageContentUpsertWithNestedWhereUniqueInput = {
  HeroBanner?: Maybe<GQLHeroBannerUpsertWithNestedWhereUniqueInput>
}

export type GQLPageContentWhereInput = {
  HeroBanner?: Maybe<GQLHeroBannerWhereInput>
}

export type GQLPageContentWhereUniqueInput = {
  HeroBanner?: Maybe<GQLHeroBannerWhereUniqueInput>
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
  list?: Maybe<GQLListCreateManyInlineInput>
  link?: Maybe<GQLLinkCreateManyInlineInput>
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
  link_every?: Maybe<GQLLinkWhereInput>
  link_some?: Maybe<GQLLinkWhereInput>
  link_none?: Maybe<GQLLinkWhereInput>
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
  list?: Maybe<GQLListUpdateManyInlineInput>
  link?: Maybe<GQLLinkUpdateManyInlineInput>
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
  link_every?: Maybe<GQLLinkWhereInput>
  link_some?: Maybe<GQLLinkWhereInput>
  link_none?: Maybe<GQLLinkWhereInput>
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
  name?: Maybe<Scalars['String']>
  list: Array<GQLList>
  avatar: GQLAsset
}

export type GQLPersonDocumentInStagesArgs = {
  stages?: Array<GQLStage>
  includeCurrent?: Scalars['Boolean']
  inheritLocale?: Scalars['Boolean']
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
  name?: Maybe<Scalars['String']>
  list?: Maybe<GQLListCreateManyInlineInput>
  avatar: GQLAssetCreateOneInlineInput
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
  avatar?: Maybe<GQLAssetWhereInput>
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
  name?: Maybe<Scalars['String']>
  list?: Maybe<GQLListUpdateManyInlineInput>
  avatar?: Maybe<GQLAssetUpdateOneInlineInput>
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
  name?: Maybe<Scalars['String']>
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
  avatar?: Maybe<GQLAssetWhereInput>
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
  heroBanners: Array<GQLHeroBanner>
  heroBanner?: Maybe<GQLHeroBanner>
  heroBannersConnection: GQLHeroBannerConnection
  links: Array<GQLLink>
  link?: Maybe<GQLLink>
  linksConnection: GQLLinkConnection
  lists: Array<GQLList>
  list?: Maybe<GQLList>
  listsConnection: GQLListConnection
  pages: Array<GQLPage>
  page?: Maybe<GQLPage>
  pagesConnection: GQLPageConnection
  people: Array<GQLPerson>
  person?: Maybe<GQLPerson>
  peopleConnection: GQLPersonConnection
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

export type GQLQueryHeroBannersArgs = {
  where?: Maybe<GQLHeroBannerWhereInput>
  orderBy?: Maybe<GQLHeroBannerOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryHeroBannerArgs = {
  where: GQLHeroBannerWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryHeroBannersConnectionArgs = {
  where?: Maybe<GQLHeroBannerWhereInput>
  orderBy?: Maybe<GQLHeroBannerOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryLinksArgs = {
  where?: Maybe<GQLLinkWhereInput>
  orderBy?: Maybe<GQLLinkOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryLinkArgs = {
  where: GQLLinkWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryLinksConnectionArgs = {
  where?: Maybe<GQLLinkWhereInput>
  orderBy?: Maybe<GQLLinkOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryListsArgs = {
  where?: Maybe<GQLListWhereInput>
  orderBy?: Maybe<GQLListOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
  stage?: GQLStage
}

export type GQLQueryListArgs = {
  where: GQLListWhereUniqueInput
  stage?: GQLStage
}

export type GQLQueryListsConnectionArgs = {
  where?: Maybe<GQLListWhereInput>
  orderBy?: Maybe<GQLListOrderByInput>
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

export enum GQLStage {
  Published = 'PUBLISHED',
  Draft = 'DRAFT',
}

export type GQLUnpublishLocaleInput = {
  locale: GQLLocale
  stages: Array<GQLStage>
}

export type GQLContentRendererFragment = { __typename?: 'Page' } & {
  content: Array<{ __typename: 'HeroBanner' } & GQLHeroBannerFragment>
}

export type GQLHeroBannerFragment = { __typename: 'HeroBanner' } & Pick<GQLHeroBanner, 'id'> & {
    video?: Maybe<{ __typename?: 'Asset' } & Pick<GQLAsset, 'url' | 'mimeType'>>
    content: { __typename?: 'RichText' } & Pick<GQLRichText, 'html'>
    title: { __typename?: 'RichText' } & Pick<GQLRichText, 'html'>
  }

export type GQLGetBreadcrumbQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

export type GQLGetBreadcrumbQuery = { __typename?: 'Query' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<GQLPage, 'title' | 'metaRobots' | 'metaTitle' | 'url'>
  >
}

export type GQLGetChildrenQueryVariables = {
  startsWith: Scalars['String']
  notStartsWith: Scalars['String']
  locale: GQLLocale
}

export type GQLGetChildrenQuery = { __typename?: 'Query' } & {
  pages: Array<{ __typename?: 'Page' } & Pick<GQLPage, 'metaRobots' | 'url' | 'title'>>
}

export type GQLGetPageQueryVariables = {
  url: Scalars['String']
  locale: GQLLocale
}

export type GQLGetPageQuery = { __typename?: 'Query' } & {
  pages: Array<
    { __typename?: 'Page' } & Pick<
      GQLPage,
      'locale' | 'metaTitle' | 'metaDescription' | 'metaRobots' | 'url' | 'title'
    > & {
        localizations: Array<
          { __typename?: 'Page' } & Pick<GQLPage, 'url' | 'locale' | 'metaRobots'>
        >
      } & GQLContentRendererFragment
  >
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

export const HeroBannerFragmentDoc = gql`
  fragment HeroBanner on HeroBanner {
    __typename
    id
    video {
      url
      mimeType
    }
    content {
      html
    }
    title {
      html
    }
  }
`
export const ContentRendererFragmentDoc = gql`
  fragment ContentRenderer on Page {
    content {
      __typename
      ...HeroBanner
    }
  }
  ${HeroBannerFragmentDoc}
`
export const GetBreadcrumbDocument = gql`
  query GetBreadcrumb($url: String!, $locale: Locale!) {
    pages(where: { url: $url }, locales: [$locale]) {
      title
      metaRobots
      metaTitle
      url
    }
  }
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
 *      url: // value for 'url'
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
export const GetChildrenDocument = gql`
  query GetChildren($startsWith: String!, $notStartsWith: String!, $locale: Locale!) {
    pages(
      where: { url_starts_with: $startsWith, url_not_starts_with: $notStartsWith }
      orderBy: url_ASC
      locales: [$locale]
    ) {
      metaRobots
      url
      title
    }
  }
`

/**
 * __useGetChildrenQuery__
 *
 * To run a query within a React component, call `useGetChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChildrenQuery({
 *   variables: {
 *      startsWith: // value for 'startsWith'
 *      notStartsWith: // value for 'notStartsWith'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetChildrenQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetChildrenQuery,
    GQLGetChildrenQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetChildrenQuery, GQLGetChildrenQueryVariables>(
    GetChildrenDocument,
    baseOptions,
  )
}
export function useGetChildrenLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetChildrenQuery,
    GQLGetChildrenQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetChildrenQuery, GQLGetChildrenQueryVariables>(
    GetChildrenDocument,
    baseOptions,
  )
}
export type GetChildrenQueryHookResult = ReturnType<typeof useGetChildrenQuery>
export type GetChildrenLazyQueryHookResult = ReturnType<typeof useGetChildrenLazyQuery>
export type GetChildrenQueryResult = ApolloReactCommon.QueryResult<
  GQLGetChildrenQuery,
  GQLGetChildrenQueryVariables
>
export const GetPageDocument = gql`
  query GetPage($url: String!, $locale: Locale!) {
    pages(where: { url: $url }, locales: [$locale]) {
      locale
      metaTitle
      metaDescription
      metaRobots
      url
      title
      localizations {
        url
        locale
        metaRobots
      }
      ...ContentRenderer
    }
  }
  ${ContentRendererFragmentDoc}
`

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      url: // value for 'url'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GQLGetPageQuery, GQLGetPageQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GQLGetPageQuery, GQLGetPageQueryVariables>(
    GetPageDocument,
    baseOptions,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GQLGetPageQuery, GQLGetPageQueryVariables>,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetPageQuery, GQLGetPageQueryVariables>(
    GetPageDocument,
    baseOptions,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = ApolloReactCommon.QueryResult<
  GQLGetPageQuery,
  GQLGetPageQueryVariables
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
