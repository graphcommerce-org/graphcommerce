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
  Json: any
  Long: any
}

export type GQLAggregateAsset = {
  __typename?: 'AggregateAsset'
  count: Scalars['Int']
}

export type GQLAggregateBlock = {
  __typename?: 'AggregateBlock'
  count: Scalars['Int']
}

export type GQLAggregateBlogPost = {
  __typename?: 'AggregateBlogPost'
  count: Scalars['Int']
}

export type GQLAggregateComment = {
  __typename?: 'AggregateComment'
  count: Scalars['Int']
}

export type GQLAggregateContactForm = {
  __typename?: 'AggregateContactForm'
  count: Scalars['Int']
}

export type GQLAggregateDocument = {
  __typename?: 'AggregateDocument'
  count: Scalars['Int']
}

export type GQLAggregateEcosystem = {
  __typename?: 'AggregateEcosystem'
  count: Scalars['Int']
}

export type GQLAggregateEmployee = {
  __typename?: 'AggregateEmployee'
  count: Scalars['Int']
}

export type GQLAggregateJobListing = {
  __typename?: 'AggregateJobListing'
  count: Scalars['Int']
}

export type GQLAggregateMailchimpForm = {
  __typename?: 'AggregateMailchimpForm'
  count: Scalars['Int']
}

export type GQLAggregateModule = {
  __typename?: 'AggregateModule'
  count: Scalars['Int']
}

export type GQLAggregatePage = {
  __typename?: 'AggregatePage'
  count: Scalars['Int']
}

export type GQLAggregateQuote = {
  __typename?: 'AggregateQuote'
  count: Scalars['Int']
}

export type GQLAggregateSingularPage = {
  __typename?: 'AggregateSingularPage'
  count: Scalars['Int']
}

export type GQLAggregateStartProjectForm = {
  __typename?: 'AggregateStartProjectForm'
  count: Scalars['Int']
}

export type GQLAggregateStructuredPage = {
  __typename?: 'AggregateStructuredPage'
  count: Scalars['Int']
}

export type GQLAsset = GQLNode & {
  __typename?: 'Asset'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<Array<GQLContactForm>>
  imageEcosystem?: Maybe<Array<GQLEcosystem>>
  imageStructuredPage?: Maybe<Array<GQLStructuredPage>>
  imageEmployee?: Maybe<Array<GQLEmployee>>
  fileDocument?: Maybe<Array<GQLDocument>>
  downloadJobListing?: Maybe<Array<GQLJobListing>>
  imageSingularPage?: Maybe<Array<GQLSingularPage>>
  imageBlogPost?: Maybe<Array<GQLBlogPost>>
  downloadBlogPost?: Maybe<Array<GQLBlogPost>>
  url: Scalars['String']
}

export type GQLAssetAttachmentContactFormArgs = {
  where?: Maybe<GQLContactFormWhereInput>
  orderBy?: Maybe<GQLContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetImageEcosystemArgs = {
  where?: Maybe<GQLEcosystemWhereInput>
  orderBy?: Maybe<GQLEcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetImageStructuredPageArgs = {
  where?: Maybe<GQLStructuredPageWhereInput>
  orderBy?: Maybe<GQLStructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetImageEmployeeArgs = {
  where?: Maybe<GQLEmployeeWhereInput>
  orderBy?: Maybe<GQLEmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetFileDocumentArgs = {
  where?: Maybe<GQLDocumentWhereInput>
  orderBy?: Maybe<GQLDocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetDownloadJobListingArgs = {
  where?: Maybe<GQLJobListingWhereInput>
  orderBy?: Maybe<GQLJobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetImageSingularPageArgs = {
  where?: Maybe<GQLSingularPageWhereInput>
  orderBy?: Maybe<GQLSingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetImageBlogPostArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
  orderBy?: Maybe<GQLBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetDownloadBlogPostArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
  orderBy?: Maybe<GQLBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLAssetUrlArgs = {
  transformation?: Maybe<GQLAssetTransformationInput>
}

export type GQLAssetConnection = {
  __typename?: 'AssetConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLAssetEdge>>
  aggregate: GQLAggregateAsset
}

export type GQLAssetCreateInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateOneWithoutAttachmentContactFormInput = {
  upload?: Maybe<GQLAssetUploadWithoutAttachmentContactFormInput>
  create?: Maybe<GQLAssetCreateWithoutAttachmentContactFormInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutDownloadBlogPostInput = {
  upload?: Maybe<GQLAssetUploadWithoutDownloadBlogPostInput>
  create?: Maybe<GQLAssetCreateWithoutDownloadBlogPostInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutDownloadJobListingInput = {
  upload?: Maybe<GQLAssetUploadWithoutDownloadJobListingInput>
  create?: Maybe<GQLAssetCreateWithoutDownloadJobListingInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutFileDocumentInput = {
  upload?: Maybe<GQLAssetUploadWithoutFileDocumentInput>
  create?: Maybe<GQLAssetCreateWithoutFileDocumentInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutImageBlogPostInput = {
  upload?: Maybe<GQLAssetUploadWithoutImageBlogPostInput>
  create?: Maybe<GQLAssetCreateWithoutImageBlogPostInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutImageEcosystemInput = {
  upload?: Maybe<GQLAssetUploadWithoutImageEcosystemInput>
  create?: Maybe<GQLAssetCreateWithoutImageEcosystemInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutImageEmployeeInput = {
  upload?: Maybe<GQLAssetUploadWithoutImageEmployeeInput>
  create?: Maybe<GQLAssetCreateWithoutImageEmployeeInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutImageSingularPageInput = {
  upload?: Maybe<GQLAssetUploadWithoutImageSingularPageInput>
  create?: Maybe<GQLAssetCreateWithoutImageSingularPageInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateOneWithoutImageStructuredPageInput = {
  upload?: Maybe<GQLAssetUploadWithoutImageStructuredPageInput>
  create?: Maybe<GQLAssetCreateWithoutImageStructuredPageInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
}

export type GQLAssetCreateWithoutAttachmentContactFormInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutDownloadBlogPostInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
}

export type GQLAssetCreateWithoutDownloadJobListingInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutFileDocumentInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutImageBlogPostInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutImageEcosystemInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutImageEmployeeInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutImageSingularPageInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetCreateWithoutImageStructuredPageInput = {
  status?: Maybe<GQLStatus>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetEdge = {
  __typename?: 'AssetEdge'
  node: GQLAsset
  cursor: Scalars['String']
}

export enum GQLAssetOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
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

export type GQLAssetPreviousValues = {
  __typename?: 'AssetPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type GQLAssetSubscriptionPayload = {
  __typename?: 'AssetSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLAsset>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLAssetPreviousValues>
}

export type GQLAssetSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLAssetSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLAssetSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLAssetSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLAssetWhereInput>
}

export type GQLAssetTransformationInput = {
  image?: Maybe<GQLImageTransformationInput>
  document?: Maybe<GQLDocumentTransformationInput>
  validateOptions?: Maybe<Scalars['Boolean']>
}

export type GQLAssetUpdateInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type GQLAssetUpdateOneWithoutAttachmentContactFormInput = {
  create?: Maybe<GQLAssetCreateWithoutAttachmentContactFormInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutAttachmentContactFormDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutAttachmentContactFormInput>
}

export type GQLAssetUpdateOneWithoutDownloadBlogPostInput = {
  create?: Maybe<GQLAssetCreateWithoutDownloadBlogPostInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutDownloadBlogPostDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutDownloadBlogPostInput>
}

export type GQLAssetUpdateOneWithoutDownloadJobListingInput = {
  create?: Maybe<GQLAssetCreateWithoutDownloadJobListingInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutDownloadJobListingDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutDownloadJobListingInput>
}

export type GQLAssetUpdateOneWithoutFileDocumentInput = {
  create?: Maybe<GQLAssetCreateWithoutFileDocumentInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutFileDocumentDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutFileDocumentInput>
}

export type GQLAssetUpdateOneWithoutImageBlogPostInput = {
  create?: Maybe<GQLAssetCreateWithoutImageBlogPostInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutImageBlogPostDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutImageBlogPostInput>
}

export type GQLAssetUpdateOneWithoutImageEcosystemInput = {
  create?: Maybe<GQLAssetCreateWithoutImageEcosystemInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutImageEcosystemDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutImageEcosystemInput>
}

export type GQLAssetUpdateOneWithoutImageEmployeeInput = {
  create?: Maybe<GQLAssetCreateWithoutImageEmployeeInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutImageEmployeeDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutImageEmployeeInput>
}

export type GQLAssetUpdateOneWithoutImageSingularPageInput = {
  create?: Maybe<GQLAssetCreateWithoutImageSingularPageInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutImageSingularPageDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutImageSingularPageInput>
}

export type GQLAssetUpdateOneWithoutImageStructuredPageInput = {
  create?: Maybe<GQLAssetCreateWithoutImageStructuredPageInput>
  connect?: Maybe<GQLAssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLAssetUpdateWithoutImageStructuredPageDataInput>
  upsert?: Maybe<GQLAssetUpsertWithoutImageStructuredPageInput>
}

export type GQLAssetUpdateWithoutAttachmentContactFormDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutDownloadBlogPostDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
}

export type GQLAssetUpdateWithoutDownloadJobListingDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutFileDocumentDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutImageBlogPostDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutImageEcosystemDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutImageEmployeeDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutImageSingularPageDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUpdateWithoutImageStructuredPageDataInput = {
  status?: Maybe<GQLStatus>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<GQLContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostUpdateManyWithoutDownloadInput>
}

export type GQLAssetUploadInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutAttachmentContactFormInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutDownloadBlogPostInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
}

export type GQLAssetUploadWithoutDownloadJobListingInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutFileDocumentInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutImageBlogPostInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutImageEcosystemInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutImageEmployeeInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutImageSingularPageInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<GQLStructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUploadWithoutImageStructuredPageInput = {
  url: Scalars['String']
  status?: Maybe<GQLStatus>
  attachmentContactForm?: Maybe<GQLContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<GQLEcosystemCreateManyWithoutImageInput>
  imageEmployee?: Maybe<GQLEmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<GQLDocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<GQLJobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<GQLSingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<GQLBlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<GQLBlogPostCreateManyWithoutDownloadInput>
}

export type GQLAssetUpsertWithoutAttachmentContactFormInput = {
  update: GQLAssetUpdateWithoutAttachmentContactFormDataInput
  create: GQLAssetCreateWithoutAttachmentContactFormInput
}

export type GQLAssetUpsertWithoutDownloadBlogPostInput = {
  update: GQLAssetUpdateWithoutDownloadBlogPostDataInput
  create: GQLAssetCreateWithoutDownloadBlogPostInput
}

export type GQLAssetUpsertWithoutDownloadJobListingInput = {
  update: GQLAssetUpdateWithoutDownloadJobListingDataInput
  create: GQLAssetCreateWithoutDownloadJobListingInput
}

export type GQLAssetUpsertWithoutFileDocumentInput = {
  update: GQLAssetUpdateWithoutFileDocumentDataInput
  create: GQLAssetCreateWithoutFileDocumentInput
}

export type GQLAssetUpsertWithoutImageBlogPostInput = {
  update: GQLAssetUpdateWithoutImageBlogPostDataInput
  create: GQLAssetCreateWithoutImageBlogPostInput
}

export type GQLAssetUpsertWithoutImageEcosystemInput = {
  update: GQLAssetUpdateWithoutImageEcosystemDataInput
  create: GQLAssetCreateWithoutImageEcosystemInput
}

export type GQLAssetUpsertWithoutImageEmployeeInput = {
  update: GQLAssetUpdateWithoutImageEmployeeDataInput
  create: GQLAssetCreateWithoutImageEmployeeInput
}

export type GQLAssetUpsertWithoutImageSingularPageInput = {
  update: GQLAssetUpdateWithoutImageSingularPageDataInput
  create: GQLAssetCreateWithoutImageSingularPageInput
}

export type GQLAssetUpsertWithoutImageStructuredPageInput = {
  update: GQLAssetUpdateWithoutImageStructuredPageDataInput
  create: GQLAssetCreateWithoutImageStructuredPageInput
}

export type GQLAssetWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLAssetWhereInput>>
  OR?: Maybe<Array<GQLAssetWhereInput>>
  NOT?: Maybe<Array<GQLAssetWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
  handle_not?: Maybe<Scalars['String']>
  handle_in?: Maybe<Array<Scalars['String']>>
  handle_not_in?: Maybe<Array<Scalars['String']>>
  handle_lt?: Maybe<Scalars['String']>
  handle_lte?: Maybe<Scalars['String']>
  handle_gt?: Maybe<Scalars['String']>
  handle_gte?: Maybe<Scalars['String']>
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
  fileName_lt?: Maybe<Scalars['String']>
  fileName_lte?: Maybe<Scalars['String']>
  fileName_gt?: Maybe<Scalars['String']>
  fileName_gte?: Maybe<Scalars['String']>
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
  mimeType_lt?: Maybe<Scalars['String']>
  mimeType_lte?: Maybe<Scalars['String']>
  mimeType_gt?: Maybe<Scalars['String']>
  mimeType_gte?: Maybe<Scalars['String']>
  mimeType_contains?: Maybe<Scalars['String']>
  mimeType_not_contains?: Maybe<Scalars['String']>
  mimeType_starts_with?: Maybe<Scalars['String']>
  mimeType_not_starts_with?: Maybe<Scalars['String']>
  mimeType_ends_with?: Maybe<Scalars['String']>
  mimeType_not_ends_with?: Maybe<Scalars['String']>
  attachmentContactForm_every?: Maybe<GQLContactFormWhereInput>
  attachmentContactForm_some?: Maybe<GQLContactFormWhereInput>
  attachmentContactForm_none?: Maybe<GQLContactFormWhereInput>
  imageEcosystem_every?: Maybe<GQLEcosystemWhereInput>
  imageEcosystem_some?: Maybe<GQLEcosystemWhereInput>
  imageEcosystem_none?: Maybe<GQLEcosystemWhereInput>
  imageStructuredPage_every?: Maybe<GQLStructuredPageWhereInput>
  imageStructuredPage_some?: Maybe<GQLStructuredPageWhereInput>
  imageStructuredPage_none?: Maybe<GQLStructuredPageWhereInput>
  imageEmployee_every?: Maybe<GQLEmployeeWhereInput>
  imageEmployee_some?: Maybe<GQLEmployeeWhereInput>
  imageEmployee_none?: Maybe<GQLEmployeeWhereInput>
  fileDocument_every?: Maybe<GQLDocumentWhereInput>
  fileDocument_some?: Maybe<GQLDocumentWhereInput>
  fileDocument_none?: Maybe<GQLDocumentWhereInput>
  downloadJobListing_every?: Maybe<GQLJobListingWhereInput>
  downloadJobListing_some?: Maybe<GQLJobListingWhereInput>
  downloadJobListing_none?: Maybe<GQLJobListingWhereInput>
  imageSingularPage_every?: Maybe<GQLSingularPageWhereInput>
  imageSingularPage_some?: Maybe<GQLSingularPageWhereInput>
  imageSingularPage_none?: Maybe<GQLSingularPageWhereInput>
  imageBlogPost_every?: Maybe<GQLBlogPostWhereInput>
  imageBlogPost_some?: Maybe<GQLBlogPostWhereInput>
  imageBlogPost_none?: Maybe<GQLBlogPostWhereInput>
  downloadBlogPost_every?: Maybe<GQLBlogPostWhereInput>
  downloadBlogPost_some?: Maybe<GQLBlogPostWhereInput>
  downloadBlogPost_none?: Maybe<GQLBlogPostWhereInput>
}

export type GQLAssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

export type GQLBatchPayload = {
  __typename?: 'BatchPayload'
  count: Scalars['Long']
}

export type GQLBlock = GQLNode & {
  __typename?: 'Block'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo: Array<GQLBrandLogoProperties>
  childBlocks?: Maybe<Array<GQLBlock>>
  parentBlock?: Maybe<GQLBlock>
  page?: Maybe<GQLStructuredPage>
}

export type GQLBlockChildBlocksArgs = {
  where?: Maybe<GQLBlockWhereInput>
  orderBy?: Maybe<GQLBlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLBlockConnection = {
  __typename?: 'BlockConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLBlockEdge>>
  aggregate: GQLAggregateBlock
}

export type GQLBlockCreatebrandLogoInput = {
  set?: Maybe<Array<GQLBrandLogoProperties>>
}

export type GQLBlockCreateInput = {
  status?: Maybe<GQLStatus>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockCreatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockCreateManyWithoutParentBlockInput>
  parentBlock?: Maybe<GQLBlockCreateOneWithoutChildBlocksInput>
  page?: Maybe<GQLStructuredPageCreateOneWithoutBlocksInput>
}

export type GQLBlockCreateManyWithoutPageInput = {
  create?: Maybe<Array<GQLBlockCreateWithoutPageInput>>
  connect?: Maybe<Array<GQLBlockWhereUniqueInput>>
}

export type GQLBlockCreateManyWithoutParentBlockInput = {
  create?: Maybe<Array<GQLBlockCreateWithoutParentBlockInput>>
  connect?: Maybe<Array<GQLBlockWhereUniqueInput>>
}

export type GQLBlockCreateOneWithoutChildBlocksInput = {
  create?: Maybe<GQLBlockCreateWithoutChildBlocksInput>
  connect?: Maybe<GQLBlockWhereUniqueInput>
}

export type GQLBlockCreateWithoutChildBlocksInput = {
  status?: Maybe<GQLStatus>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockCreatebrandLogoInput>
  parentBlock?: Maybe<GQLBlockCreateOneWithoutChildBlocksInput>
  page?: Maybe<GQLStructuredPageCreateOneWithoutBlocksInput>
}

export type GQLBlockCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockCreatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockCreateManyWithoutParentBlockInput>
  parentBlock?: Maybe<GQLBlockCreateOneWithoutChildBlocksInput>
}

export type GQLBlockCreateWithoutParentBlockInput = {
  status?: Maybe<GQLStatus>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockCreatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockCreateManyWithoutParentBlockInput>
  page?: Maybe<GQLStructuredPageCreateOneWithoutBlocksInput>
}

export type GQLBlockEdge = {
  __typename?: 'BlockEdge'
  node: GQLBlock
  cursor: Scalars['String']
}

export enum GQLBlockOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ExtendedAsc = 'extended_ASC',
  ExtendedDesc = 'extended_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  ShowTitleAsc = 'showTitle_ASC',
  ShowTitleDesc = 'showTitle_DESC',
  ExtendedFullAsc = 'extendedFull_ASC',
  ExtendedFullDesc = 'extendedFull_DESC',
  ExtendedContinuationAsc = 'extendedContinuation_ASC',
  ExtendedContinuationDesc = 'extendedContinuation_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  FeaturedAsc = 'featured_ASC',
  FeaturedDesc = 'featured_DESC',
  RaisedAsc = 'raised_ASC',
  RaisedDesc = 'raised_DESC',
}

export type GQLBlockPreviousValues = {
  __typename?: 'BlockPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo: Array<GQLBrandLogoProperties>
}

export type GQLBlockScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLBlockScalarWhereInput>>
  OR?: Maybe<Array<GQLBlockScalarWhereInput>>
  NOT?: Maybe<Array<GQLBlockScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  extended_not?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  order_not?: Maybe<Scalars['Int']>
  order_in?: Maybe<Array<Scalars['Int']>>
  order_not_in?: Maybe<Array<Scalars['Int']>>
  order_lt?: Maybe<Scalars['Int']>
  order_lte?: Maybe<Scalars['Int']>
  order_gt?: Maybe<Scalars['Int']>
  order_gte?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  showTitle_not?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedFull_not?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  extendedContinuation_not?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  featured_not?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  raised_not?: Maybe<Scalars['Boolean']>
}

export type GQLBlockSubscriptionPayload = {
  __typename?: 'BlockSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLBlock>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLBlockPreviousValues>
}

export type GQLBlockSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLBlockSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLBlockSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLBlockSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLBlockWhereInput>
}

export type GQLBlockUpdatebrandLogoInput = {
  set?: Maybe<Array<GQLBrandLogoProperties>>
}

export type GQLBlockUpdateInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockUpdateManyWithoutParentBlockInput>
  parentBlock?: Maybe<GQLBlockUpdateOneWithoutChildBlocksInput>
  page?: Maybe<GQLStructuredPageUpdateOneWithoutBlocksInput>
}

export type GQLBlockUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
}

export type GQLBlockUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
}

export type GQLBlockUpdateManyWithoutPageInput = {
  create?: Maybe<Array<GQLBlockCreateWithoutPageInput>>
  connect?: Maybe<Array<GQLBlockWhereUniqueInput>>
  set?: Maybe<Array<GQLBlockWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLBlockWhereUniqueInput>>
  delete?: Maybe<Array<GQLBlockWhereUniqueInput>>
  update?: Maybe<Array<GQLBlockUpdateWithWhereUniqueWithoutPageInput>>
  updateMany?: Maybe<Array<GQLBlockUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLBlockScalarWhereInput>>
  upsert?: Maybe<Array<GQLBlockUpsertWithWhereUniqueWithoutPageInput>>
}

export type GQLBlockUpdateManyWithoutParentBlockInput = {
  create?: Maybe<Array<GQLBlockCreateWithoutParentBlockInput>>
  connect?: Maybe<Array<GQLBlockWhereUniqueInput>>
  set?: Maybe<Array<GQLBlockWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLBlockWhereUniqueInput>>
  delete?: Maybe<Array<GQLBlockWhereUniqueInput>>
  update?: Maybe<Array<GQLBlockUpdateWithWhereUniqueWithoutParentBlockInput>>
  updateMany?: Maybe<Array<GQLBlockUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLBlockScalarWhereInput>>
  upsert?: Maybe<Array<GQLBlockUpsertWithWhereUniqueWithoutParentBlockInput>>
}

export type GQLBlockUpdateManyWithWhereNestedInput = {
  where: GQLBlockScalarWhereInput
  data: GQLBlockUpdateManyDataInput
}

export type GQLBlockUpdateOneWithoutChildBlocksInput = {
  create?: Maybe<GQLBlockCreateWithoutChildBlocksInput>
  connect?: Maybe<GQLBlockWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLBlockUpdateWithoutChildBlocksDataInput>
  upsert?: Maybe<GQLBlockUpsertWithoutChildBlocksInput>
}

export type GQLBlockUpdateWithoutChildBlocksDataInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
  parentBlock?: Maybe<GQLBlockUpdateOneWithoutChildBlocksInput>
  page?: Maybe<GQLStructuredPageUpdateOneWithoutBlocksInput>
}

export type GQLBlockUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockUpdateManyWithoutParentBlockInput>
  parentBlock?: Maybe<GQLBlockUpdateOneWithoutChildBlocksInput>
}

export type GQLBlockUpdateWithoutParentBlockDataInput = {
  status?: Maybe<GQLStatus>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<GQLBlockUpdatebrandLogoInput>
  childBlocks?: Maybe<GQLBlockUpdateManyWithoutParentBlockInput>
  page?: Maybe<GQLStructuredPageUpdateOneWithoutBlocksInput>
}

export type GQLBlockUpdateWithWhereUniqueWithoutPageInput = {
  where: GQLBlockWhereUniqueInput
  data: GQLBlockUpdateWithoutPageDataInput
}

export type GQLBlockUpdateWithWhereUniqueWithoutParentBlockInput = {
  where: GQLBlockWhereUniqueInput
  data: GQLBlockUpdateWithoutParentBlockDataInput
}

export type GQLBlockUpsertWithoutChildBlocksInput = {
  update: GQLBlockUpdateWithoutChildBlocksDataInput
  create: GQLBlockCreateWithoutChildBlocksInput
}

export type GQLBlockUpsertWithWhereUniqueWithoutPageInput = {
  where: GQLBlockWhereUniqueInput
  update: GQLBlockUpdateWithoutPageDataInput
  create: GQLBlockCreateWithoutPageInput
}

export type GQLBlockUpsertWithWhereUniqueWithoutParentBlockInput = {
  where: GQLBlockWhereUniqueInput
  update: GQLBlockUpdateWithoutParentBlockDataInput
  create: GQLBlockCreateWithoutParentBlockInput
}

export type GQLBlockWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLBlockWhereInput>>
  OR?: Maybe<Array<GQLBlockWhereInput>>
  NOT?: Maybe<Array<GQLBlockWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  extended_not?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  order_not?: Maybe<Scalars['Int']>
  order_in?: Maybe<Array<Scalars['Int']>>
  order_not_in?: Maybe<Array<Scalars['Int']>>
  order_lt?: Maybe<Scalars['Int']>
  order_lte?: Maybe<Scalars['Int']>
  order_gt?: Maybe<Scalars['Int']>
  order_gte?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  showTitle_not?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedFull_not?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  extendedContinuation_not?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  featured_not?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  raised_not?: Maybe<Scalars['Boolean']>
  childBlocks_every?: Maybe<GQLBlockWhereInput>
  childBlocks_some?: Maybe<GQLBlockWhereInput>
  childBlocks_none?: Maybe<GQLBlockWhereInput>
  parentBlock?: Maybe<GQLBlockWhereInput>
  page?: Maybe<GQLStructuredPageWhereInput>
}

export type GQLBlockWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLBlogPost = GQLNode & {
  __typename?: 'BlogPost'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAsset>
  download?: Maybe<GQLAsset>
  author?: Maybe<GQLEmployee>
  page?: Maybe<GQLPage>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
}

export type GQLBlogPostTitleArgs = {
  locale?: Maybe<GQLLocale>
}

export type GQLBlogPostContentArgs = {
  locale?: Maybe<GQLLocale>
}

export type GQLBlogPostConnection = {
  __typename?: 'BlogPostConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLBlogPostEdge>>
  aggregate: GQLAggregateBlogPost
}

export type GQLBlogPostCreateInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageCreateOneWithoutBlogPostInput>
}

export type GQLBlogPostCreateManyWithoutAuthorInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutAuthorInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
}

export type GQLBlogPostCreateManyWithoutDownloadInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutDownloadInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
}

export type GQLBlogPostCreateManyWithoutImageInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
}

export type GQLBlogPostCreateOneWithoutPageInput = {
  create?: Maybe<GQLBlogPostCreateWithoutPageInput>
  connect?: Maybe<GQLBlogPostWhereUniqueInput>
}

export type GQLBlogPostCreateWithoutAuthorInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadBlogPostInput>
  page?: Maybe<GQLPageCreateOneWithoutBlogPostInput>
}

export type GQLBlogPostCreateWithoutDownloadInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageBlogPostInput>
  author?: Maybe<GQLEmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageCreateOneWithoutBlogPostInput>
}

export type GQLBlogPostCreateWithoutImageInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageCreateOneWithoutBlogPostInput>
}

export type GQLBlogPostCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeCreateOneWithoutBlogPostsInput>
}

export type GQLBlogPostEdge = {
  __typename?: 'BlogPostEdge'
  node: GQLBlogPost
  cursor: Scalars['String']
}

export enum GQLBlogPostOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublicPublishedAtAsc = 'publicPublishedAt_ASC',
  PublicPublishedAtDesc = 'publicPublishedAt_DESC',
  ContentEnAsc = 'contentEN_ASC',
  ContentEnDesc = 'contentEN_DESC',
  ContentNlAsc = 'contentNL_ASC',
  ContentNlDesc = 'contentNL_DESC',
  TitleEnAsc = 'titleEN_ASC',
  TitleEnDesc = 'titleEN_DESC',
  TitleNlAsc = 'titleNL_ASC',
  TitleNlDesc = 'titleNL_DESC',
}

export type GQLBlogPostPreviousValues = {
  __typename?: 'BlogPostPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
}

export type GQLBlogPostScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  OR?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  NOT?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_not?: Maybe<Scalars['DateTime']>
  publicPublishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publicPublishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publicPublishedAt_lt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_lte?: Maybe<Scalars['DateTime']>
  publicPublishedAt_gt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_gte?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentEN_not?: Maybe<Scalars['String']>
  contentEN_in?: Maybe<Array<Scalars['String']>>
  contentEN_not_in?: Maybe<Array<Scalars['String']>>
  contentEN_lt?: Maybe<Scalars['String']>
  contentEN_lte?: Maybe<Scalars['String']>
  contentEN_gt?: Maybe<Scalars['String']>
  contentEN_gte?: Maybe<Scalars['String']>
  contentEN_contains?: Maybe<Scalars['String']>
  contentEN_not_contains?: Maybe<Scalars['String']>
  contentEN_starts_with?: Maybe<Scalars['String']>
  contentEN_not_starts_with?: Maybe<Scalars['String']>
  contentEN_ends_with?: Maybe<Scalars['String']>
  contentEN_not_ends_with?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  contentNL_not?: Maybe<Scalars['String']>
  contentNL_in?: Maybe<Array<Scalars['String']>>
  contentNL_not_in?: Maybe<Array<Scalars['String']>>
  contentNL_lt?: Maybe<Scalars['String']>
  contentNL_lte?: Maybe<Scalars['String']>
  contentNL_gt?: Maybe<Scalars['String']>
  contentNL_gte?: Maybe<Scalars['String']>
  contentNL_contains?: Maybe<Scalars['String']>
  contentNL_not_contains?: Maybe<Scalars['String']>
  contentNL_starts_with?: Maybe<Scalars['String']>
  contentNL_not_starts_with?: Maybe<Scalars['String']>
  contentNL_ends_with?: Maybe<Scalars['String']>
  contentNL_not_ends_with?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleEN_not?: Maybe<Scalars['String']>
  titleEN_in?: Maybe<Array<Scalars['String']>>
  titleEN_not_in?: Maybe<Array<Scalars['String']>>
  titleEN_lt?: Maybe<Scalars['String']>
  titleEN_lte?: Maybe<Scalars['String']>
  titleEN_gt?: Maybe<Scalars['String']>
  titleEN_gte?: Maybe<Scalars['String']>
  titleEN_contains?: Maybe<Scalars['String']>
  titleEN_not_contains?: Maybe<Scalars['String']>
  titleEN_starts_with?: Maybe<Scalars['String']>
  titleEN_not_starts_with?: Maybe<Scalars['String']>
  titleEN_ends_with?: Maybe<Scalars['String']>
  titleEN_not_ends_with?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  titleNL_not?: Maybe<Scalars['String']>
  titleNL_in?: Maybe<Array<Scalars['String']>>
  titleNL_not_in?: Maybe<Array<Scalars['String']>>
  titleNL_lt?: Maybe<Scalars['String']>
  titleNL_lte?: Maybe<Scalars['String']>
  titleNL_gt?: Maybe<Scalars['String']>
  titleNL_gte?: Maybe<Scalars['String']>
  titleNL_contains?: Maybe<Scalars['String']>
  titleNL_not_contains?: Maybe<Scalars['String']>
  titleNL_starts_with?: Maybe<Scalars['String']>
  titleNL_not_starts_with?: Maybe<Scalars['String']>
  titleNL_ends_with?: Maybe<Scalars['String']>
  titleNL_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLBlogPostSubscriptionPayload = {
  __typename?: 'BlogPostSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLBlogPost>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLBlogPostPreviousValues>
}

export type GQLBlogPostSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLBlogPostSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLBlogPostSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLBlogPostSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLBlogPostWhereInput>
}

export type GQLBlogPostUpdateInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageUpdateOneWithoutBlogPostInput>
}

export type GQLBlogPostUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
}

export type GQLBlogPostUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
}

export type GQLBlogPostUpdateManyWithoutAuthorInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutAuthorInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  set?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  delete?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  update?: Maybe<Array<GQLBlogPostUpdateWithWhereUniqueWithoutAuthorInput>>
  updateMany?: Maybe<Array<GQLBlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  upsert?: Maybe<Array<GQLBlogPostUpsertWithWhereUniqueWithoutAuthorInput>>
}

export type GQLBlogPostUpdateManyWithoutDownloadInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutDownloadInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  set?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  delete?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  update?: Maybe<Array<GQLBlogPostUpdateWithWhereUniqueWithoutDownloadInput>>
  updateMany?: Maybe<Array<GQLBlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  upsert?: Maybe<Array<GQLBlogPostUpsertWithWhereUniqueWithoutDownloadInput>>
}

export type GQLBlogPostUpdateManyWithoutImageInput = {
  create?: Maybe<Array<GQLBlogPostCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  set?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  delete?: Maybe<Array<GQLBlogPostWhereUniqueInput>>
  update?: Maybe<Array<GQLBlogPostUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<GQLBlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLBlogPostScalarWhereInput>>
  upsert?: Maybe<Array<GQLBlogPostUpsertWithWhereUniqueWithoutImageInput>>
}

export type GQLBlogPostUpdateManyWithWhereNestedInput = {
  where: GQLBlogPostScalarWhereInput
  data: GQLBlogPostUpdateManyDataInput
}

export type GQLBlogPostUpdateOneWithoutPageInput = {
  create?: Maybe<GQLBlogPostCreateWithoutPageInput>
  connect?: Maybe<GQLBlogPostWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLBlogPostUpdateWithoutPageDataInput>
  upsert?: Maybe<GQLBlogPostUpsertWithoutPageInput>
}

export type GQLBlogPostUpdateWithoutAuthorDataInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadBlogPostInput>
  page?: Maybe<GQLPageUpdateOneWithoutBlogPostInput>
}

export type GQLBlogPostUpdateWithoutDownloadDataInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageBlogPostInput>
  author?: Maybe<GQLEmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageUpdateOneWithoutBlogPostInput>
}

export type GQLBlogPostUpdateWithoutImageDataInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<GQLPageUpdateOneWithoutBlogPostInput>
}

export type GQLBlogPostUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadBlogPostInput>
  author?: Maybe<GQLEmployeeUpdateOneWithoutBlogPostsInput>
}

export type GQLBlogPostUpdateWithWhereUniqueWithoutAuthorInput = {
  where: GQLBlogPostWhereUniqueInput
  data: GQLBlogPostUpdateWithoutAuthorDataInput
}

export type GQLBlogPostUpdateWithWhereUniqueWithoutDownloadInput = {
  where: GQLBlogPostWhereUniqueInput
  data: GQLBlogPostUpdateWithoutDownloadDataInput
}

export type GQLBlogPostUpdateWithWhereUniqueWithoutImageInput = {
  where: GQLBlogPostWhereUniqueInput
  data: GQLBlogPostUpdateWithoutImageDataInput
}

export type GQLBlogPostUpsertWithoutPageInput = {
  update: GQLBlogPostUpdateWithoutPageDataInput
  create: GQLBlogPostCreateWithoutPageInput
}

export type GQLBlogPostUpsertWithWhereUniqueWithoutAuthorInput = {
  where: GQLBlogPostWhereUniqueInput
  update: GQLBlogPostUpdateWithoutAuthorDataInput
  create: GQLBlogPostCreateWithoutAuthorInput
}

export type GQLBlogPostUpsertWithWhereUniqueWithoutDownloadInput = {
  where: GQLBlogPostWhereUniqueInput
  update: GQLBlogPostUpdateWithoutDownloadDataInput
  create: GQLBlogPostCreateWithoutDownloadInput
}

export type GQLBlogPostUpsertWithWhereUniqueWithoutImageInput = {
  where: GQLBlogPostWhereUniqueInput
  update: GQLBlogPostUpdateWithoutImageDataInput
  create: GQLBlogPostCreateWithoutImageInput
}

export type GQLBlogPostWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLBlogPostWhereInput>>
  OR?: Maybe<Array<GQLBlogPostWhereInput>>
  NOT?: Maybe<Array<GQLBlogPostWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_not?: Maybe<Scalars['DateTime']>
  publicPublishedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publicPublishedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publicPublishedAt_lt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_lte?: Maybe<Scalars['DateTime']>
  publicPublishedAt_gt?: Maybe<Scalars['DateTime']>
  publicPublishedAt_gte?: Maybe<Scalars['DateTime']>
  contentEN?: Maybe<Scalars['String']>
  contentEN_not?: Maybe<Scalars['String']>
  contentEN_in?: Maybe<Array<Scalars['String']>>
  contentEN_not_in?: Maybe<Array<Scalars['String']>>
  contentEN_lt?: Maybe<Scalars['String']>
  contentEN_lte?: Maybe<Scalars['String']>
  contentEN_gt?: Maybe<Scalars['String']>
  contentEN_gte?: Maybe<Scalars['String']>
  contentEN_contains?: Maybe<Scalars['String']>
  contentEN_not_contains?: Maybe<Scalars['String']>
  contentEN_starts_with?: Maybe<Scalars['String']>
  contentEN_not_starts_with?: Maybe<Scalars['String']>
  contentEN_ends_with?: Maybe<Scalars['String']>
  contentEN_not_ends_with?: Maybe<Scalars['String']>
  contentNL?: Maybe<Scalars['String']>
  contentNL_not?: Maybe<Scalars['String']>
  contentNL_in?: Maybe<Array<Scalars['String']>>
  contentNL_not_in?: Maybe<Array<Scalars['String']>>
  contentNL_lt?: Maybe<Scalars['String']>
  contentNL_lte?: Maybe<Scalars['String']>
  contentNL_gt?: Maybe<Scalars['String']>
  contentNL_gte?: Maybe<Scalars['String']>
  contentNL_contains?: Maybe<Scalars['String']>
  contentNL_not_contains?: Maybe<Scalars['String']>
  contentNL_starts_with?: Maybe<Scalars['String']>
  contentNL_not_starts_with?: Maybe<Scalars['String']>
  contentNL_ends_with?: Maybe<Scalars['String']>
  contentNL_not_ends_with?: Maybe<Scalars['String']>
  titleEN?: Maybe<Scalars['String']>
  titleEN_not?: Maybe<Scalars['String']>
  titleEN_in?: Maybe<Array<Scalars['String']>>
  titleEN_not_in?: Maybe<Array<Scalars['String']>>
  titleEN_lt?: Maybe<Scalars['String']>
  titleEN_lte?: Maybe<Scalars['String']>
  titleEN_gt?: Maybe<Scalars['String']>
  titleEN_gte?: Maybe<Scalars['String']>
  titleEN_contains?: Maybe<Scalars['String']>
  titleEN_not_contains?: Maybe<Scalars['String']>
  titleEN_starts_with?: Maybe<Scalars['String']>
  titleEN_not_starts_with?: Maybe<Scalars['String']>
  titleEN_ends_with?: Maybe<Scalars['String']>
  titleEN_not_ends_with?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
  titleNL_not?: Maybe<Scalars['String']>
  titleNL_in?: Maybe<Array<Scalars['String']>>
  titleNL_not_in?: Maybe<Array<Scalars['String']>>
  titleNL_lt?: Maybe<Scalars['String']>
  titleNL_lte?: Maybe<Scalars['String']>
  titleNL_gt?: Maybe<Scalars['String']>
  titleNL_gte?: Maybe<Scalars['String']>
  titleNL_contains?: Maybe<Scalars['String']>
  titleNL_not_contains?: Maybe<Scalars['String']>
  titleNL_starts_with?: Maybe<Scalars['String']>
  titleNL_not_starts_with?: Maybe<Scalars['String']>
  titleNL_ends_with?: Maybe<Scalars['String']>
  titleNL_not_ends_with?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetWhereInput>
  download?: Maybe<GQLAssetWhereInput>
  author?: Maybe<GQLEmployeeWhereInput>
  page?: Maybe<GQLPageWhereInput>
}

export type GQLBlogPostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  titleEN?: Maybe<Scalars['String']>
  titleNL?: Maybe<Scalars['String']>
}

export enum GQLBrandLogoProperties {
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
  Solid = 'SOLID',
}

export type GQLComment = GQLNode & {
  __typename?: 'Comment'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<GQLPage>
  parentComment?: Maybe<GQLComment>
  childComments?: Maybe<Array<GQLComment>>
}

export type GQLCommentChildCommentsArgs = {
  where?: Maybe<GQLCommentWhereInput>
  orderBy?: Maybe<GQLCommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLCommentConnection = {
  __typename?: 'CommentConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLCommentEdge>>
  aggregate: GQLAggregateComment
}

export type GQLCommentCreateInput = {
  status?: Maybe<GQLStatus>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<GQLPageCreateOneWithoutCommentInput>
  parentComment?: Maybe<GQLCommentCreateOneWithoutChildCommentsInput>
  childComments?: Maybe<GQLCommentCreateManyWithoutParentCommentInput>
}

export type GQLCommentCreateManyWithoutParentCommentInput = {
  create?: Maybe<Array<GQLCommentCreateWithoutParentCommentInput>>
  connect?: Maybe<Array<GQLCommentWhereUniqueInput>>
}

export type GQLCommentCreateOneWithoutChildCommentsInput = {
  create?: Maybe<GQLCommentCreateWithoutChildCommentsInput>
  connect?: Maybe<GQLCommentWhereUniqueInput>
}

export type GQLCommentCreateOneWithoutPageInput = {
  create?: Maybe<GQLCommentCreateWithoutPageInput>
  connect?: Maybe<GQLCommentWhereUniqueInput>
}

export type GQLCommentCreateWithoutChildCommentsInput = {
  status?: Maybe<GQLStatus>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<GQLPageCreateOneWithoutCommentInput>
  parentComment?: Maybe<GQLCommentCreateOneWithoutChildCommentsInput>
}

export type GQLCommentCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  parentComment?: Maybe<GQLCommentCreateOneWithoutChildCommentsInput>
  childComments?: Maybe<GQLCommentCreateManyWithoutParentCommentInput>
}

export type GQLCommentCreateWithoutParentCommentInput = {
  status?: Maybe<GQLStatus>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<GQLPageCreateOneWithoutCommentInput>
  childComments?: Maybe<GQLCommentCreateManyWithoutParentCommentInput>
}

export type GQLCommentEdge = {
  __typename?: 'CommentEdge'
  node: GQLComment
  cursor: Scalars['String']
}

export enum GQLCommentOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  DisplayNameAsc = 'displayName_ASC',
  DisplayNameDesc = 'displayName_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  UpvotesAsc = 'upvotes_ASC',
  UpvotesDesc = 'upvotes_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
}

export type GQLCommentPreviousValues = {
  __typename?: 'CommentPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
}

export type GQLCommentScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLCommentScalarWhereInput>>
  OR?: Maybe<Array<GQLCommentScalarWhereInput>>
  NOT?: Maybe<Array<GQLCommentScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  displayName?: Maybe<Scalars['String']>
  displayName_not?: Maybe<Scalars['String']>
  displayName_in?: Maybe<Array<Scalars['String']>>
  displayName_not_in?: Maybe<Array<Scalars['String']>>
  displayName_lt?: Maybe<Scalars['String']>
  displayName_lte?: Maybe<Scalars['String']>
  displayName_gt?: Maybe<Scalars['String']>
  displayName_gte?: Maybe<Scalars['String']>
  displayName_contains?: Maybe<Scalars['String']>
  displayName_not_contains?: Maybe<Scalars['String']>
  displayName_starts_with?: Maybe<Scalars['String']>
  displayName_not_starts_with?: Maybe<Scalars['String']>
  displayName_ends_with?: Maybe<Scalars['String']>
  displayName_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  upvotes_not?: Maybe<Scalars['Int']>
  upvotes_in?: Maybe<Array<Scalars['Int']>>
  upvotes_not_in?: Maybe<Array<Scalars['Int']>>
  upvotes_lt?: Maybe<Scalars['Int']>
  upvotes_lte?: Maybe<Scalars['Int']>
  upvotes_gt?: Maybe<Scalars['Int']>
  upvotes_gte?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLCommentSubscriptionPayload = {
  __typename?: 'CommentSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLComment>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLCommentPreviousValues>
}

export type GQLCommentSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLCommentSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLCommentSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLCommentSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLCommentWhereInput>
}

export type GQLCommentUpdateInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateOneWithoutCommentInput>
  parentComment?: Maybe<GQLCommentUpdateOneWithoutChildCommentsInput>
  childComments?: Maybe<GQLCommentUpdateManyWithoutParentCommentInput>
}

export type GQLCommentUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
}

export type GQLCommentUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
}

export type GQLCommentUpdateManyWithoutParentCommentInput = {
  create?: Maybe<Array<GQLCommentCreateWithoutParentCommentInput>>
  connect?: Maybe<Array<GQLCommentWhereUniqueInput>>
  set?: Maybe<Array<GQLCommentWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLCommentWhereUniqueInput>>
  delete?: Maybe<Array<GQLCommentWhereUniqueInput>>
  update?: Maybe<Array<GQLCommentUpdateWithWhereUniqueWithoutParentCommentInput>>
  updateMany?: Maybe<Array<GQLCommentUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLCommentScalarWhereInput>>
  upsert?: Maybe<Array<GQLCommentUpsertWithWhereUniqueWithoutParentCommentInput>>
}

export type GQLCommentUpdateManyWithWhereNestedInput = {
  where: GQLCommentScalarWhereInput
  data: GQLCommentUpdateManyDataInput
}

export type GQLCommentUpdateOneWithoutChildCommentsInput = {
  create?: Maybe<GQLCommentCreateWithoutChildCommentsInput>
  connect?: Maybe<GQLCommentWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLCommentUpdateWithoutChildCommentsDataInput>
  upsert?: Maybe<GQLCommentUpsertWithoutChildCommentsInput>
}

export type GQLCommentUpdateOneWithoutPageInput = {
  create?: Maybe<GQLCommentCreateWithoutPageInput>
  connect?: Maybe<GQLCommentWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLCommentUpdateWithoutPageDataInput>
  upsert?: Maybe<GQLCommentUpsertWithoutPageInput>
}

export type GQLCommentUpdateWithoutChildCommentsDataInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateOneWithoutCommentInput>
  parentComment?: Maybe<GQLCommentUpdateOneWithoutChildCommentsInput>
}

export type GQLCommentUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  parentComment?: Maybe<GQLCommentUpdateOneWithoutChildCommentsInput>
  childComments?: Maybe<GQLCommentUpdateManyWithoutParentCommentInput>
}

export type GQLCommentUpdateWithoutParentCommentDataInput = {
  status?: Maybe<GQLStatus>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageUpdateOneWithoutCommentInput>
  childComments?: Maybe<GQLCommentUpdateManyWithoutParentCommentInput>
}

export type GQLCommentUpdateWithWhereUniqueWithoutParentCommentInput = {
  where: GQLCommentWhereUniqueInput
  data: GQLCommentUpdateWithoutParentCommentDataInput
}

export type GQLCommentUpsertWithoutChildCommentsInput = {
  update: GQLCommentUpdateWithoutChildCommentsDataInput
  create: GQLCommentCreateWithoutChildCommentsInput
}

export type GQLCommentUpsertWithoutPageInput = {
  update: GQLCommentUpdateWithoutPageDataInput
  create: GQLCommentCreateWithoutPageInput
}

export type GQLCommentUpsertWithWhereUniqueWithoutParentCommentInput = {
  where: GQLCommentWhereUniqueInput
  update: GQLCommentUpdateWithoutParentCommentDataInput
  create: GQLCommentCreateWithoutParentCommentInput
}

export type GQLCommentWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLCommentWhereInput>>
  OR?: Maybe<Array<GQLCommentWhereInput>>
  NOT?: Maybe<Array<GQLCommentWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  displayName?: Maybe<Scalars['String']>
  displayName_not?: Maybe<Scalars['String']>
  displayName_in?: Maybe<Array<Scalars['String']>>
  displayName_not_in?: Maybe<Array<Scalars['String']>>
  displayName_lt?: Maybe<Scalars['String']>
  displayName_lte?: Maybe<Scalars['String']>
  displayName_gt?: Maybe<Scalars['String']>
  displayName_gte?: Maybe<Scalars['String']>
  displayName_contains?: Maybe<Scalars['String']>
  displayName_not_contains?: Maybe<Scalars['String']>
  displayName_starts_with?: Maybe<Scalars['String']>
  displayName_not_starts_with?: Maybe<Scalars['String']>
  displayName_ends_with?: Maybe<Scalars['String']>
  displayName_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  upvotes_not?: Maybe<Scalars['Int']>
  upvotes_in?: Maybe<Array<Scalars['Int']>>
  upvotes_not_in?: Maybe<Array<Scalars['Int']>>
  upvotes_lt?: Maybe<Scalars['Int']>
  upvotes_lte?: Maybe<Scalars['Int']>
  upvotes_gt?: Maybe<Scalars['Int']>
  upvotes_gte?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  page?: Maybe<GQLPageWhereInput>
  parentComment?: Maybe<GQLCommentWhereInput>
  childComments_every?: Maybe<GQLCommentWhereInput>
  childComments_some?: Maybe<GQLCommentWhereInput>
  childComments_none?: Maybe<GQLCommentWhereInput>
}

export type GQLCommentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLContactForm = GQLNode & {
  __typename?: 'ContactForm'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
  attachment?: Maybe<GQLAsset>
}

export type GQLContactFormConnection = {
  __typename?: 'ContactFormConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLContactFormEdge>>
  aggregate: GQLAggregateContactForm
}

export type GQLContactFormCreateInput = {
  status?: Maybe<GQLStatus>
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
  attachment?: Maybe<GQLAssetCreateOneWithoutAttachmentContactFormInput>
}

export type GQLContactFormCreateManyWithoutAttachmentInput = {
  create?: Maybe<Array<GQLContactFormCreateWithoutAttachmentInput>>
  connect?: Maybe<Array<GQLContactFormWhereUniqueInput>>
}

export type GQLContactFormCreateWithoutAttachmentInput = {
  status?: Maybe<GQLStatus>
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type GQLContactFormEdge = {
  __typename?: 'ContactFormEdge'
  node: GQLContactForm
  cursor: Scalars['String']
}

export enum GQLContactFormOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  SubjectAsc = 'subject_ASC',
  SubjectDesc = 'subject_DESC',
  MessageAsc = 'message_ASC',
  MessageDesc = 'message_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
}

export type GQLContactFormPreviousValues = {
  __typename?: 'ContactFormPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type GQLContactFormScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLContactFormScalarWhereInput>>
  OR?: Maybe<Array<GQLContactFormScalarWhereInput>>
  NOT?: Maybe<Array<GQLContactFormScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  subject?: Maybe<Scalars['String']>
  subject_not?: Maybe<Scalars['String']>
  subject_in?: Maybe<Array<Scalars['String']>>
  subject_not_in?: Maybe<Array<Scalars['String']>>
  subject_lt?: Maybe<Scalars['String']>
  subject_lte?: Maybe<Scalars['String']>
  subject_gt?: Maybe<Scalars['String']>
  subject_gte?: Maybe<Scalars['String']>
  subject_contains?: Maybe<Scalars['String']>
  subject_not_contains?: Maybe<Scalars['String']>
  subject_starts_with?: Maybe<Scalars['String']>
  subject_not_starts_with?: Maybe<Scalars['String']>
  subject_ends_with?: Maybe<Scalars['String']>
  subject_not_ends_with?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  message_not?: Maybe<Scalars['String']>
  message_in?: Maybe<Array<Scalars['String']>>
  message_not_in?: Maybe<Array<Scalars['String']>>
  message_lt?: Maybe<Scalars['String']>
  message_lte?: Maybe<Scalars['String']>
  message_gt?: Maybe<Scalars['String']>
  message_gte?: Maybe<Scalars['String']>
  message_contains?: Maybe<Scalars['String']>
  message_not_contains?: Maybe<Scalars['String']>
  message_starts_with?: Maybe<Scalars['String']>
  message_not_starts_with?: Maybe<Scalars['String']>
  message_ends_with?: Maybe<Scalars['String']>
  message_not_ends_with?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  phone_not?: Maybe<Scalars['String']>
  phone_in?: Maybe<Array<Scalars['String']>>
  phone_not_in?: Maybe<Array<Scalars['String']>>
  phone_lt?: Maybe<Scalars['String']>
  phone_lte?: Maybe<Scalars['String']>
  phone_gt?: Maybe<Scalars['String']>
  phone_gte?: Maybe<Scalars['String']>
  phone_contains?: Maybe<Scalars['String']>
  phone_not_contains?: Maybe<Scalars['String']>
  phone_starts_with?: Maybe<Scalars['String']>
  phone_not_starts_with?: Maybe<Scalars['String']>
  phone_ends_with?: Maybe<Scalars['String']>
  phone_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLContactFormSubscriptionPayload = {
  __typename?: 'ContactFormSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLContactForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLContactFormPreviousValues>
}

export type GQLContactFormSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLContactFormSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLContactFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLContactFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLContactFormWhereInput>
}

export type GQLContactFormUpdateInput = {
  status?: Maybe<GQLStatus>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  attachment?: Maybe<GQLAssetUpdateOneWithoutAttachmentContactFormInput>
}

export type GQLContactFormUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type GQLContactFormUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type GQLContactFormUpdateManyWithoutAttachmentInput = {
  create?: Maybe<Array<GQLContactFormCreateWithoutAttachmentInput>>
  connect?: Maybe<Array<GQLContactFormWhereUniqueInput>>
  set?: Maybe<Array<GQLContactFormWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLContactFormWhereUniqueInput>>
  delete?: Maybe<Array<GQLContactFormWhereUniqueInput>>
  update?: Maybe<Array<GQLContactFormUpdateWithWhereUniqueWithoutAttachmentInput>>
  updateMany?: Maybe<Array<GQLContactFormUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLContactFormScalarWhereInput>>
  upsert?: Maybe<Array<GQLContactFormUpsertWithWhereUniqueWithoutAttachmentInput>>
}

export type GQLContactFormUpdateManyWithWhereNestedInput = {
  where: GQLContactFormScalarWhereInput
  data: GQLContactFormUpdateManyDataInput
}

export type GQLContactFormUpdateWithoutAttachmentDataInput = {
  status?: Maybe<GQLStatus>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type GQLContactFormUpdateWithWhereUniqueWithoutAttachmentInput = {
  where: GQLContactFormWhereUniqueInput
  data: GQLContactFormUpdateWithoutAttachmentDataInput
}

export type GQLContactFormUpsertWithWhereUniqueWithoutAttachmentInput = {
  where: GQLContactFormWhereUniqueInput
  update: GQLContactFormUpdateWithoutAttachmentDataInput
  create: GQLContactFormCreateWithoutAttachmentInput
}

export type GQLContactFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLContactFormWhereInput>>
  OR?: Maybe<Array<GQLContactFormWhereInput>>
  NOT?: Maybe<Array<GQLContactFormWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  subject?: Maybe<Scalars['String']>
  subject_not?: Maybe<Scalars['String']>
  subject_in?: Maybe<Array<Scalars['String']>>
  subject_not_in?: Maybe<Array<Scalars['String']>>
  subject_lt?: Maybe<Scalars['String']>
  subject_lte?: Maybe<Scalars['String']>
  subject_gt?: Maybe<Scalars['String']>
  subject_gte?: Maybe<Scalars['String']>
  subject_contains?: Maybe<Scalars['String']>
  subject_not_contains?: Maybe<Scalars['String']>
  subject_starts_with?: Maybe<Scalars['String']>
  subject_not_starts_with?: Maybe<Scalars['String']>
  subject_ends_with?: Maybe<Scalars['String']>
  subject_not_ends_with?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  message_not?: Maybe<Scalars['String']>
  message_in?: Maybe<Array<Scalars['String']>>
  message_not_in?: Maybe<Array<Scalars['String']>>
  message_lt?: Maybe<Scalars['String']>
  message_lte?: Maybe<Scalars['String']>
  message_gt?: Maybe<Scalars['String']>
  message_gte?: Maybe<Scalars['String']>
  message_contains?: Maybe<Scalars['String']>
  message_not_contains?: Maybe<Scalars['String']>
  message_starts_with?: Maybe<Scalars['String']>
  message_not_starts_with?: Maybe<Scalars['String']>
  message_ends_with?: Maybe<Scalars['String']>
  message_not_ends_with?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  phone_not?: Maybe<Scalars['String']>
  phone_in?: Maybe<Array<Scalars['String']>>
  phone_not_in?: Maybe<Array<Scalars['String']>>
  phone_lt?: Maybe<Scalars['String']>
  phone_lte?: Maybe<Scalars['String']>
  phone_gt?: Maybe<Scalars['String']>
  phone_gte?: Maybe<Scalars['String']>
  phone_contains?: Maybe<Scalars['String']>
  phone_not_contains?: Maybe<Scalars['String']>
  phone_starts_with?: Maybe<Scalars['String']>
  phone_not_starts_with?: Maybe<Scalars['String']>
  phone_ends_with?: Maybe<Scalars['String']>
  phone_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  attachment?: Maybe<GQLAssetWhereInput>
}

export type GQLContactFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLDocument = GQLNode & {
  __typename?: 'Document'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  file?: Maybe<GQLAsset>
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentConnection = {
  __typename?: 'DocumentConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLDocumentEdge>>
  aggregate: GQLAggregateDocument
}

export type GQLDocumentCreateInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
  file?: Maybe<GQLAssetCreateOneWithoutFileDocumentInput>
}

export type GQLDocumentCreateManyWithoutFileInput = {
  create?: Maybe<Array<GQLDocumentCreateWithoutFileInput>>
  connect?: Maybe<Array<GQLDocumentWhereUniqueInput>>
}

export type GQLDocumentCreateWithoutFileInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentEdge = {
  __typename?: 'DocumentEdge'
  node: GQLDocument
  cursor: Scalars['String']
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
  Html = 'html',
  Pdf = 'pdf',
  Doc = 'doc',
  Xlsx = 'xlsx',
  Xls = 'xls',
  Pptx = 'pptx',
  Ppt = 'ppt',
}

export enum GQLDocumentOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
}

export type GQLDocumentOutputInput = {
  format?: Maybe<GQLDocumentFileTypes>
}

export type GQLDocumentPreviousValues = {
  __typename?: 'DocumentPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLDocumentScalarWhereInput>>
  OR?: Maybe<Array<GQLDocumentScalarWhereInput>>
  NOT?: Maybe<Array<GQLDocumentScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLDocumentSubscriptionPayload = {
  __typename?: 'DocumentSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLDocument>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLDocumentPreviousValues>
}

export type GQLDocumentSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLDocumentSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLDocumentSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLDocumentSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLDocumentWhereInput>
}

export type GQLDocumentTransformationInput = {
  output?: Maybe<GQLDocumentOutputInput>
}

export type GQLDocumentUpdateInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
  file?: Maybe<GQLAssetUpdateOneWithoutFileDocumentInput>
}

export type GQLDocumentUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentUpdateManyWithoutFileInput = {
  create?: Maybe<Array<GQLDocumentCreateWithoutFileInput>>
  connect?: Maybe<Array<GQLDocumentWhereUniqueInput>>
  set?: Maybe<Array<GQLDocumentWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLDocumentWhereUniqueInput>>
  delete?: Maybe<Array<GQLDocumentWhereUniqueInput>>
  update?: Maybe<Array<GQLDocumentUpdateWithWhereUniqueWithoutFileInput>>
  updateMany?: Maybe<Array<GQLDocumentUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLDocumentScalarWhereInput>>
  upsert?: Maybe<Array<GQLDocumentUpsertWithWhereUniqueWithoutFileInput>>
}

export type GQLDocumentUpdateManyWithWhereNestedInput = {
  where: GQLDocumentScalarWhereInput
  data: GQLDocumentUpdateManyDataInput
}

export type GQLDocumentUpdateWithoutFileDataInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
}

export type GQLDocumentUpdateWithWhereUniqueWithoutFileInput = {
  where: GQLDocumentWhereUniqueInput
  data: GQLDocumentUpdateWithoutFileDataInput
}

export type GQLDocumentUpsertWithWhereUniqueWithoutFileInput = {
  where: GQLDocumentWhereUniqueInput
  update: GQLDocumentUpdateWithoutFileDataInput
  create: GQLDocumentCreateWithoutFileInput
}

export type GQLDocumentWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLDocumentWhereInput>>
  OR?: Maybe<Array<GQLDocumentWhereInput>>
  NOT?: Maybe<Array<GQLDocumentWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  file?: Maybe<GQLAssetWhereInput>
}

export type GQLDocumentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLEcosystem = GQLNode & {
  __typename?: 'Ecosystem'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  image?: Maybe<GQLAsset>
}

export type GQLEcosystemConnection = {
  __typename?: 'EcosystemConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLEcosystemEdge>>
  aggregate: GQLAggregateEcosystem
}

export type GQLEcosystemCreateInput = {
  status?: Maybe<GQLStatus>
  image?: Maybe<GQLAssetCreateOneWithoutImageEcosystemInput>
}

export type GQLEcosystemCreateManyWithoutImageInput = {
  create?: Maybe<Array<GQLEcosystemCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLEcosystemWhereUniqueInput>>
}

export type GQLEcosystemCreateWithoutImageInput = {
  status?: Maybe<GQLStatus>
}

export type GQLEcosystemEdge = {
  __typename?: 'EcosystemEdge'
  node: GQLEcosystem
  cursor: Scalars['String']
}

export enum GQLEcosystemOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
}

export type GQLEcosystemPreviousValues = {
  __typename?: 'EcosystemPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
}

export type GQLEcosystemScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLEcosystemScalarWhereInput>>
  OR?: Maybe<Array<GQLEcosystemScalarWhereInput>>
  NOT?: Maybe<Array<GQLEcosystemScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
}

export type GQLEcosystemSubscriptionPayload = {
  __typename?: 'EcosystemSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLEcosystem>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLEcosystemPreviousValues>
}

export type GQLEcosystemSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLEcosystemSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLEcosystemSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLEcosystemSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLEcosystemWhereInput>
}

export type GQLEcosystemUpdateInput = {
  status?: Maybe<GQLStatus>
  image?: Maybe<GQLAssetUpdateOneWithoutImageEcosystemInput>
}

export type GQLEcosystemUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
}

export type GQLEcosystemUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
}

export type GQLEcosystemUpdateManyWithoutImageInput = {
  create?: Maybe<Array<GQLEcosystemCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLEcosystemWhereUniqueInput>>
  set?: Maybe<Array<GQLEcosystemWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLEcosystemWhereUniqueInput>>
  delete?: Maybe<Array<GQLEcosystemWhereUniqueInput>>
  update?: Maybe<Array<GQLEcosystemUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<GQLEcosystemUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLEcosystemScalarWhereInput>>
  upsert?: Maybe<Array<GQLEcosystemUpsertWithWhereUniqueWithoutImageInput>>
}

export type GQLEcosystemUpdateManyWithWhereNestedInput = {
  where: GQLEcosystemScalarWhereInput
  data: GQLEcosystemUpdateManyDataInput
}

export type GQLEcosystemUpdateWithoutImageDataInput = {
  status?: Maybe<GQLStatus>
}

export type GQLEcosystemUpdateWithWhereUniqueWithoutImageInput = {
  where: GQLEcosystemWhereUniqueInput
  data: GQLEcosystemUpdateWithoutImageDataInput
}

export type GQLEcosystemUpsertWithWhereUniqueWithoutImageInput = {
  where: GQLEcosystemWhereUniqueInput
  update: GQLEcosystemUpdateWithoutImageDataInput
  create: GQLEcosystemCreateWithoutImageInput
}

export type GQLEcosystemWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLEcosystemWhereInput>>
  OR?: Maybe<Array<GQLEcosystemWhereInput>>
  NOT?: Maybe<Array<GQLEcosystemWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  image?: Maybe<GQLAssetWhereInput>
}

export type GQLEcosystemWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLEmployee = GQLNode & {
  __typename?: 'Employee'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<GQLAsset>
  blogPosts?: Maybe<Array<GQLBlogPost>>
}

export type GQLEmployeeBlogPostsArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
  orderBy?: Maybe<GQLBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLEmployeeConnection = {
  __typename?: 'EmployeeConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLEmployeeEdge>>
  aggregate: GQLAggregateEmployee
}

export type GQLEmployeeCreateInput = {
  status?: Maybe<GQLStatus>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageEmployeeInput>
  blogPosts?: Maybe<GQLBlogPostCreateManyWithoutAuthorInput>
}

export type GQLEmployeeCreateManyWithoutImageInput = {
  create?: Maybe<Array<GQLEmployeeCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLEmployeeWhereUniqueInput>>
}

export type GQLEmployeeCreateOneWithoutBlogPostsInput = {
  create?: Maybe<GQLEmployeeCreateWithoutBlogPostsInput>
  connect?: Maybe<GQLEmployeeWhereUniqueInput>
}

export type GQLEmployeeCreateWithoutBlogPostsInput = {
  status?: Maybe<GQLStatus>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageEmployeeInput>
}

export type GQLEmployeeCreateWithoutImageInput = {
  status?: Maybe<GQLStatus>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  blogPosts?: Maybe<GQLBlogPostCreateManyWithoutAuthorInput>
}

export type GQLEmployeeEdge = {
  __typename?: 'EmployeeEdge'
  node: GQLEmployee
  cursor: Scalars['String']
}

export enum GQLEmployeeOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  FirstNameAsc = 'firstName_ASC',
  FirstNameDesc = 'firstName_DESC',
  LastNameAsc = 'lastName_ASC',
  LastNameDesc = 'lastName_DESC',
  JobTitleAsc = 'jobTitle_ASC',
  JobTitleDesc = 'jobTitle_DESC',
  SlackIdAsc = 'slackId_ASC',
  SlackIdDesc = 'slackId_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
}

export type GQLEmployeePreviousValues = {
  __typename?: 'EmployeePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type GQLEmployeeScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLEmployeeScalarWhereInput>>
  OR?: Maybe<Array<GQLEmployeeScalarWhereInput>>
  NOT?: Maybe<Array<GQLEmployeeScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  firstName?: Maybe<Scalars['String']>
  firstName_not?: Maybe<Scalars['String']>
  firstName_in?: Maybe<Array<Scalars['String']>>
  firstName_not_in?: Maybe<Array<Scalars['String']>>
  firstName_lt?: Maybe<Scalars['String']>
  firstName_lte?: Maybe<Scalars['String']>
  firstName_gt?: Maybe<Scalars['String']>
  firstName_gte?: Maybe<Scalars['String']>
  firstName_contains?: Maybe<Scalars['String']>
  firstName_not_contains?: Maybe<Scalars['String']>
  firstName_starts_with?: Maybe<Scalars['String']>
  firstName_not_starts_with?: Maybe<Scalars['String']>
  firstName_ends_with?: Maybe<Scalars['String']>
  firstName_not_ends_with?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  lastName_not?: Maybe<Scalars['String']>
  lastName_in?: Maybe<Array<Scalars['String']>>
  lastName_not_in?: Maybe<Array<Scalars['String']>>
  lastName_lt?: Maybe<Scalars['String']>
  lastName_lte?: Maybe<Scalars['String']>
  lastName_gt?: Maybe<Scalars['String']>
  lastName_gte?: Maybe<Scalars['String']>
  lastName_contains?: Maybe<Scalars['String']>
  lastName_not_contains?: Maybe<Scalars['String']>
  lastName_starts_with?: Maybe<Scalars['String']>
  lastName_not_starts_with?: Maybe<Scalars['String']>
  lastName_ends_with?: Maybe<Scalars['String']>
  lastName_not_ends_with?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  jobTitle_not?: Maybe<Scalars['String']>
  jobTitle_in?: Maybe<Array<Scalars['String']>>
  jobTitle_not_in?: Maybe<Array<Scalars['String']>>
  jobTitle_lt?: Maybe<Scalars['String']>
  jobTitle_lte?: Maybe<Scalars['String']>
  jobTitle_gt?: Maybe<Scalars['String']>
  jobTitle_gte?: Maybe<Scalars['String']>
  jobTitle_contains?: Maybe<Scalars['String']>
  jobTitle_not_contains?: Maybe<Scalars['String']>
  jobTitle_starts_with?: Maybe<Scalars['String']>
  jobTitle_not_starts_with?: Maybe<Scalars['String']>
  jobTitle_ends_with?: Maybe<Scalars['String']>
  jobTitle_not_ends_with?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  slackId_not?: Maybe<Scalars['String']>
  slackId_in?: Maybe<Array<Scalars['String']>>
  slackId_not_in?: Maybe<Array<Scalars['String']>>
  slackId_lt?: Maybe<Scalars['String']>
  slackId_lte?: Maybe<Scalars['String']>
  slackId_gt?: Maybe<Scalars['String']>
  slackId_gte?: Maybe<Scalars['String']>
  slackId_contains?: Maybe<Scalars['String']>
  slackId_not_contains?: Maybe<Scalars['String']>
  slackId_starts_with?: Maybe<Scalars['String']>
  slackId_not_starts_with?: Maybe<Scalars['String']>
  slackId_ends_with?: Maybe<Scalars['String']>
  slackId_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLEmployeeSubscriptionPayload = {
  __typename?: 'EmployeeSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLEmployee>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLEmployeePreviousValues>
}

export type GQLEmployeeSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLEmployeeSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLEmployeeSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLEmployeeSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLEmployeeWhereInput>
}

export type GQLEmployeeUpdateInput = {
  status?: Maybe<GQLStatus>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageEmployeeInput>
  blogPosts?: Maybe<GQLBlogPostUpdateManyWithoutAuthorInput>
}

export type GQLEmployeeUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type GQLEmployeeUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type GQLEmployeeUpdateManyWithoutImageInput = {
  create?: Maybe<Array<GQLEmployeeCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLEmployeeWhereUniqueInput>>
  set?: Maybe<Array<GQLEmployeeWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLEmployeeWhereUniqueInput>>
  delete?: Maybe<Array<GQLEmployeeWhereUniqueInput>>
  update?: Maybe<Array<GQLEmployeeUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<GQLEmployeeUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLEmployeeScalarWhereInput>>
  upsert?: Maybe<Array<GQLEmployeeUpsertWithWhereUniqueWithoutImageInput>>
}

export type GQLEmployeeUpdateManyWithWhereNestedInput = {
  where: GQLEmployeeScalarWhereInput
  data: GQLEmployeeUpdateManyDataInput
}

export type GQLEmployeeUpdateOneWithoutBlogPostsInput = {
  create?: Maybe<GQLEmployeeCreateWithoutBlogPostsInput>
  connect?: Maybe<GQLEmployeeWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLEmployeeUpdateWithoutBlogPostsDataInput>
  upsert?: Maybe<GQLEmployeeUpsertWithoutBlogPostsInput>
}

export type GQLEmployeeUpdateWithoutBlogPostsDataInput = {
  status?: Maybe<GQLStatus>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageEmployeeInput>
}

export type GQLEmployeeUpdateWithoutImageDataInput = {
  status?: Maybe<GQLStatus>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  blogPosts?: Maybe<GQLBlogPostUpdateManyWithoutAuthorInput>
}

export type GQLEmployeeUpdateWithWhereUniqueWithoutImageInput = {
  where: GQLEmployeeWhereUniqueInput
  data: GQLEmployeeUpdateWithoutImageDataInput
}

export type GQLEmployeeUpsertWithoutBlogPostsInput = {
  update: GQLEmployeeUpdateWithoutBlogPostsDataInput
  create: GQLEmployeeCreateWithoutBlogPostsInput
}

export type GQLEmployeeUpsertWithWhereUniqueWithoutImageInput = {
  where: GQLEmployeeWhereUniqueInput
  update: GQLEmployeeUpdateWithoutImageDataInput
  create: GQLEmployeeCreateWithoutImageInput
}

export type GQLEmployeeWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLEmployeeWhereInput>>
  OR?: Maybe<Array<GQLEmployeeWhereInput>>
  NOT?: Maybe<Array<GQLEmployeeWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  firstName?: Maybe<Scalars['String']>
  firstName_not?: Maybe<Scalars['String']>
  firstName_in?: Maybe<Array<Scalars['String']>>
  firstName_not_in?: Maybe<Array<Scalars['String']>>
  firstName_lt?: Maybe<Scalars['String']>
  firstName_lte?: Maybe<Scalars['String']>
  firstName_gt?: Maybe<Scalars['String']>
  firstName_gte?: Maybe<Scalars['String']>
  firstName_contains?: Maybe<Scalars['String']>
  firstName_not_contains?: Maybe<Scalars['String']>
  firstName_starts_with?: Maybe<Scalars['String']>
  firstName_not_starts_with?: Maybe<Scalars['String']>
  firstName_ends_with?: Maybe<Scalars['String']>
  firstName_not_ends_with?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  lastName_not?: Maybe<Scalars['String']>
  lastName_in?: Maybe<Array<Scalars['String']>>
  lastName_not_in?: Maybe<Array<Scalars['String']>>
  lastName_lt?: Maybe<Scalars['String']>
  lastName_lte?: Maybe<Scalars['String']>
  lastName_gt?: Maybe<Scalars['String']>
  lastName_gte?: Maybe<Scalars['String']>
  lastName_contains?: Maybe<Scalars['String']>
  lastName_not_contains?: Maybe<Scalars['String']>
  lastName_starts_with?: Maybe<Scalars['String']>
  lastName_not_starts_with?: Maybe<Scalars['String']>
  lastName_ends_with?: Maybe<Scalars['String']>
  lastName_not_ends_with?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  jobTitle_not?: Maybe<Scalars['String']>
  jobTitle_in?: Maybe<Array<Scalars['String']>>
  jobTitle_not_in?: Maybe<Array<Scalars['String']>>
  jobTitle_lt?: Maybe<Scalars['String']>
  jobTitle_lte?: Maybe<Scalars['String']>
  jobTitle_gt?: Maybe<Scalars['String']>
  jobTitle_gte?: Maybe<Scalars['String']>
  jobTitle_contains?: Maybe<Scalars['String']>
  jobTitle_not_contains?: Maybe<Scalars['String']>
  jobTitle_starts_with?: Maybe<Scalars['String']>
  jobTitle_not_starts_with?: Maybe<Scalars['String']>
  jobTitle_ends_with?: Maybe<Scalars['String']>
  jobTitle_not_ends_with?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  slackId_not?: Maybe<Scalars['String']>
  slackId_in?: Maybe<Array<Scalars['String']>>
  slackId_not_in?: Maybe<Array<Scalars['String']>>
  slackId_lt?: Maybe<Scalars['String']>
  slackId_lte?: Maybe<Scalars['String']>
  slackId_gt?: Maybe<Scalars['String']>
  slackId_gte?: Maybe<Scalars['String']>
  slackId_contains?: Maybe<Scalars['String']>
  slackId_not_contains?: Maybe<Scalars['String']>
  slackId_starts_with?: Maybe<Scalars['String']>
  slackId_not_starts_with?: Maybe<Scalars['String']>
  slackId_ends_with?: Maybe<Scalars['String']>
  slackId_not_ends_with?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetWhereInput>
  blogPosts_every?: Maybe<GQLBlogPostWhereInput>
  blogPosts_some?: Maybe<GQLBlogPostWhereInput>
  blogPosts_none?: Maybe<GQLBlogPostWhereInput>
}

export type GQLEmployeeWhereUniqueInput = {
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

export type GQLJobListing = GQLNode & {
  __typename?: 'JobListing'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  download?: Maybe<GQLAsset>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  page?: Maybe<GQLPage>
  displayOrder?: Maybe<Scalars['Int']>
}

export type GQLJobListingConnection = {
  __typename?: 'JobListingConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLJobListingEdge>>
  aggregate: GQLAggregateJobListing
}

export type GQLJobListingCreateInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadJobListingInput>
  page?: Maybe<GQLPageCreateOneWithoutJobListingInput>
}

export type GQLJobListingCreateManyWithoutDownloadInput = {
  create?: Maybe<Array<GQLJobListingCreateWithoutDownloadInput>>
  connect?: Maybe<Array<GQLJobListingWhereUniqueInput>>
}

export type GQLJobListingCreateOneWithoutPageInput = {
  create?: Maybe<GQLJobListingCreateWithoutPageInput>
  connect?: Maybe<GQLJobListingWhereUniqueInput>
}

export type GQLJobListingCreateWithoutDownloadInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  page?: Maybe<GQLPageCreateOneWithoutJobListingInput>
}

export type GQLJobListingCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<GQLAssetCreateOneWithoutDownloadJobListingInput>
}

export type GQLJobListingEdge = {
  __typename?: 'JobListingEdge'
  node: GQLJobListing
  cursor: Scalars['String']
}

export enum GQLJobListingOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  JobPerksAsc = 'jobPerks_ASC',
  JobPerksDesc = 'jobPerks_DESC',
  LabelAsc = 'label_ASC',
  LabelDesc = 'label_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  DisplayOrderAsc = 'displayOrder_ASC',
  DisplayOrderDesc = 'displayOrder_DESC',
}

export type GQLJobListingPreviousValues = {
  __typename?: 'JobListingPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type GQLJobListingScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLJobListingScalarWhereInput>>
  OR?: Maybe<Array<GQLJobListingScalarWhereInput>>
  NOT?: Maybe<Array<GQLJobListingScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  jobPerks?: Maybe<Scalars['String']>
  jobPerks_not?: Maybe<Scalars['String']>
  jobPerks_in?: Maybe<Array<Scalars['String']>>
  jobPerks_not_in?: Maybe<Array<Scalars['String']>>
  jobPerks_lt?: Maybe<Scalars['String']>
  jobPerks_lte?: Maybe<Scalars['String']>
  jobPerks_gt?: Maybe<Scalars['String']>
  jobPerks_gte?: Maybe<Scalars['String']>
  jobPerks_contains?: Maybe<Scalars['String']>
  jobPerks_not_contains?: Maybe<Scalars['String']>
  jobPerks_starts_with?: Maybe<Scalars['String']>
  jobPerks_not_starts_with?: Maybe<Scalars['String']>
  jobPerks_ends_with?: Maybe<Scalars['String']>
  jobPerks_not_ends_with?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Scalars['String']>>
  label_not_in?: Maybe<Array<Scalars['String']>>
  label_lt?: Maybe<Scalars['String']>
  label_lte?: Maybe<Scalars['String']>
  label_gt?: Maybe<Scalars['String']>
  label_gte?: Maybe<Scalars['String']>
  label_contains?: Maybe<Scalars['String']>
  label_not_contains?: Maybe<Scalars['String']>
  label_starts_with?: Maybe<Scalars['String']>
  label_not_starts_with?: Maybe<Scalars['String']>
  label_ends_with?: Maybe<Scalars['String']>
  label_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  displayOrder_not?: Maybe<Scalars['Int']>
  displayOrder_in?: Maybe<Array<Scalars['Int']>>
  displayOrder_not_in?: Maybe<Array<Scalars['Int']>>
  displayOrder_lt?: Maybe<Scalars['Int']>
  displayOrder_lte?: Maybe<Scalars['Int']>
  displayOrder_gt?: Maybe<Scalars['Int']>
  displayOrder_gte?: Maybe<Scalars['Int']>
}

export type GQLJobListingSubscriptionPayload = {
  __typename?: 'JobListingSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLJobListing>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLJobListingPreviousValues>
}

export type GQLJobListingSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLJobListingSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLJobListingSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLJobListingSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLJobListingWhereInput>
}

export type GQLJobListingUpdateInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadJobListingInput>
  page?: Maybe<GQLPageUpdateOneWithoutJobListingInput>
}

export type GQLJobListingUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type GQLJobListingUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type GQLJobListingUpdateManyWithoutDownloadInput = {
  create?: Maybe<Array<GQLJobListingCreateWithoutDownloadInput>>
  connect?: Maybe<Array<GQLJobListingWhereUniqueInput>>
  set?: Maybe<Array<GQLJobListingWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLJobListingWhereUniqueInput>>
  delete?: Maybe<Array<GQLJobListingWhereUniqueInput>>
  update?: Maybe<Array<GQLJobListingUpdateWithWhereUniqueWithoutDownloadInput>>
  updateMany?: Maybe<Array<GQLJobListingUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLJobListingScalarWhereInput>>
  upsert?: Maybe<Array<GQLJobListingUpsertWithWhereUniqueWithoutDownloadInput>>
}

export type GQLJobListingUpdateManyWithWhereNestedInput = {
  where: GQLJobListingScalarWhereInput
  data: GQLJobListingUpdateManyDataInput
}

export type GQLJobListingUpdateOneWithoutPageInput = {
  create?: Maybe<GQLJobListingCreateWithoutPageInput>
  connect?: Maybe<GQLJobListingWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLJobListingUpdateWithoutPageDataInput>
  upsert?: Maybe<GQLJobListingUpsertWithoutPageInput>
}

export type GQLJobListingUpdateWithoutDownloadDataInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  page?: Maybe<GQLPageUpdateOneWithoutJobListingInput>
}

export type GQLJobListingUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<GQLAssetUpdateOneWithoutDownloadJobListingInput>
}

export type GQLJobListingUpdateWithWhereUniqueWithoutDownloadInput = {
  where: GQLJobListingWhereUniqueInput
  data: GQLJobListingUpdateWithoutDownloadDataInput
}

export type GQLJobListingUpsertWithoutPageInput = {
  update: GQLJobListingUpdateWithoutPageDataInput
  create: GQLJobListingCreateWithoutPageInput
}

export type GQLJobListingUpsertWithWhereUniqueWithoutDownloadInput = {
  where: GQLJobListingWhereUniqueInput
  update: GQLJobListingUpdateWithoutDownloadDataInput
  create: GQLJobListingCreateWithoutDownloadInput
}

export type GQLJobListingWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLJobListingWhereInput>>
  OR?: Maybe<Array<GQLJobListingWhereInput>>
  NOT?: Maybe<Array<GQLJobListingWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  jobPerks?: Maybe<Scalars['String']>
  jobPerks_not?: Maybe<Scalars['String']>
  jobPerks_in?: Maybe<Array<Scalars['String']>>
  jobPerks_not_in?: Maybe<Array<Scalars['String']>>
  jobPerks_lt?: Maybe<Scalars['String']>
  jobPerks_lte?: Maybe<Scalars['String']>
  jobPerks_gt?: Maybe<Scalars['String']>
  jobPerks_gte?: Maybe<Scalars['String']>
  jobPerks_contains?: Maybe<Scalars['String']>
  jobPerks_not_contains?: Maybe<Scalars['String']>
  jobPerks_starts_with?: Maybe<Scalars['String']>
  jobPerks_not_starts_with?: Maybe<Scalars['String']>
  jobPerks_ends_with?: Maybe<Scalars['String']>
  jobPerks_not_ends_with?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Scalars['String']>>
  label_not_in?: Maybe<Array<Scalars['String']>>
  label_lt?: Maybe<Scalars['String']>
  label_lte?: Maybe<Scalars['String']>
  label_gt?: Maybe<Scalars['String']>
  label_gte?: Maybe<Scalars['String']>
  label_contains?: Maybe<Scalars['String']>
  label_not_contains?: Maybe<Scalars['String']>
  label_starts_with?: Maybe<Scalars['String']>
  label_not_starts_with?: Maybe<Scalars['String']>
  label_ends_with?: Maybe<Scalars['String']>
  label_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  displayOrder_not?: Maybe<Scalars['Int']>
  displayOrder_in?: Maybe<Array<Scalars['Int']>>
  displayOrder_not_in?: Maybe<Array<Scalars['Int']>>
  displayOrder_lt?: Maybe<Scalars['Int']>
  displayOrder_lte?: Maybe<Scalars['Int']>
  displayOrder_gt?: Maybe<Scalars['Int']>
  displayOrder_gte?: Maybe<Scalars['Int']>
  download?: Maybe<GQLAssetWhereInput>
  page?: Maybe<GQLPageWhereInput>
}

export type GQLJobListingWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum GQLLocale {
  En = 'EN',
  Nl = 'NL',
}

export type GQLMailchimpForm = GQLNode & {
  __typename?: 'MailchimpForm'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  email: Scalars['String']
}

export type GQLMailchimpFormConnection = {
  __typename?: 'MailchimpFormConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLMailchimpFormEdge>>
  aggregate: GQLAggregateMailchimpForm
}

export type GQLMailchimpFormCreateInput = {
  status?: Maybe<GQLStatus>
  email: Scalars['String']
}

export type GQLMailchimpFormEdge = {
  __typename?: 'MailchimpFormEdge'
  node: GQLMailchimpForm
  cursor: Scalars['String']
}

export enum GQLMailchimpFormOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
}

export type GQLMailchimpFormPreviousValues = {
  __typename?: 'MailchimpFormPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  email: Scalars['String']
}

export type GQLMailchimpFormSubscriptionPayload = {
  __typename?: 'MailchimpFormSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLMailchimpForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLMailchimpFormPreviousValues>
}

export type GQLMailchimpFormSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLMailchimpFormSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLMailchimpFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLMailchimpFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLMailchimpFormWhereInput>
}

export type GQLMailchimpFormUpdateInput = {
  status?: Maybe<GQLStatus>
  email?: Maybe<Scalars['String']>
}

export type GQLMailchimpFormUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  email?: Maybe<Scalars['String']>
}

export type GQLMailchimpFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLMailchimpFormWhereInput>>
  OR?: Maybe<Array<GQLMailchimpFormWhereInput>>
  NOT?: Maybe<Array<GQLMailchimpFormWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
  email_not?: Maybe<Scalars['String']>
  email_in?: Maybe<Array<Scalars['String']>>
  email_not_in?: Maybe<Array<Scalars['String']>>
  email_lt?: Maybe<Scalars['String']>
  email_lte?: Maybe<Scalars['String']>
  email_gt?: Maybe<Scalars['String']>
  email_gte?: Maybe<Scalars['String']>
  email_contains?: Maybe<Scalars['String']>
  email_not_contains?: Maybe<Scalars['String']>
  email_starts_with?: Maybe<Scalars['String']>
  email_not_starts_with?: Maybe<Scalars['String']>
  email_ends_with?: Maybe<Scalars['String']>
  email_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLMailchimpFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum GQLMetaRobots {
  IndexFollow = 'INDEX_FOLLOW',
  IndexNofollow = 'INDEX_NOFOLLOW',
  NoindexFollow = 'NOINDEX_FOLLOW',
  NoindexNofollow = 'NOINDEX_NOFOLLOW',
}

export type GQLModule = GQLNode & {
  __typename?: 'Module'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: GQLModuleType
}

export type GQLModuleConnection = {
  __typename?: 'ModuleConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLModuleEdge>>
  aggregate: GQLAggregateModule
}

export type GQLModuleCreateInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: GQLModuleType
}

export type GQLModuleEdge = {
  __typename?: 'ModuleEdge'
  node: GQLModule
  cursor: Scalars['String']
}

export enum GQLModuleOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  RepoUrlAsc = 'repoUrl_ASC',
  RepoUrlDesc = 'repoUrl_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
}

export type GQLModulePreviousValues = {
  __typename?: 'ModulePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: GQLModuleType
}

export type GQLModuleSubscriptionPayload = {
  __typename?: 'ModuleSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLModule>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLModulePreviousValues>
}

export type GQLModuleSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLModuleSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLModuleSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLModuleSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLModuleWhereInput>
}

export enum GQLModuleType {
  Publiccustomer = 'PUBLICCUSTOMER',
  Publicown = 'PUBLICOWN',
  Private = 'PRIVATE',
}

export type GQLModuleUpdateInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<GQLModuleType>
}

export type GQLModuleUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<GQLModuleType>
}

export type GQLModuleWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLModuleWhereInput>>
  OR?: Maybe<Array<GQLModuleWhereInput>>
  NOT?: Maybe<Array<GQLModuleWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
  name_not?: Maybe<Scalars['String']>
  name_in?: Maybe<Array<Scalars['String']>>
  name_not_in?: Maybe<Array<Scalars['String']>>
  name_lt?: Maybe<Scalars['String']>
  name_lte?: Maybe<Scalars['String']>
  name_gt?: Maybe<Scalars['String']>
  name_gte?: Maybe<Scalars['String']>
  name_contains?: Maybe<Scalars['String']>
  name_not_contains?: Maybe<Scalars['String']>
  name_starts_with?: Maybe<Scalars['String']>
  name_not_starts_with?: Maybe<Scalars['String']>
  name_ends_with?: Maybe<Scalars['String']>
  name_not_ends_with?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  order_not?: Maybe<Scalars['Int']>
  order_in?: Maybe<Array<Scalars['Int']>>
  order_not_in?: Maybe<Array<Scalars['Int']>>
  order_lt?: Maybe<Scalars['Int']>
  order_lte?: Maybe<Scalars['Int']>
  order_gt?: Maybe<Scalars['Int']>
  order_gte?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  repoUrl_not?: Maybe<Scalars['String']>
  repoUrl_in?: Maybe<Array<Scalars['String']>>
  repoUrl_not_in?: Maybe<Array<Scalars['String']>>
  repoUrl_lt?: Maybe<Scalars['String']>
  repoUrl_lte?: Maybe<Scalars['String']>
  repoUrl_gt?: Maybe<Scalars['String']>
  repoUrl_gte?: Maybe<Scalars['String']>
  repoUrl_contains?: Maybe<Scalars['String']>
  repoUrl_not_contains?: Maybe<Scalars['String']>
  repoUrl_starts_with?: Maybe<Scalars['String']>
  repoUrl_not_starts_with?: Maybe<Scalars['String']>
  repoUrl_ends_with?: Maybe<Scalars['String']>
  repoUrl_not_ends_with?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_not_in?: Maybe<Array<Scalars['String']>>
  description_lt?: Maybe<Scalars['String']>
  description_lte?: Maybe<Scalars['String']>
  description_gt?: Maybe<Scalars['String']>
  description_gte?: Maybe<Scalars['String']>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  description_starts_with?: Maybe<Scalars['String']>
  description_not_starts_with?: Maybe<Scalars['String']>
  description_ends_with?: Maybe<Scalars['String']>
  description_not_ends_with?: Maybe<Scalars['String']>
  type?: Maybe<GQLModuleType>
  type_not?: Maybe<GQLModuleType>
  type_in?: Maybe<Array<GQLModuleType>>
  type_not_in?: Maybe<Array<GQLModuleType>>
}

export type GQLModuleWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLMutation = {
  __typename?: 'Mutation'
  createAsset: GQLAsset
  uploadAsset: GQLAsset
  createContactForm: GQLContactForm
  createEcosystem: GQLEcosystem
  createBlock: GQLBlock
  createModule: GQLModule
  createStructuredPage: GQLStructuredPage
  createEmployee: GQLEmployee
  createQuote: GQLQuote
  createDocument: GQLDocument
  createStartProjectForm: GQLStartProjectForm
  createJobListing: GQLJobListing
  createMailchimpForm: GQLMailchimpForm
  createSingularPage: GQLSingularPage
  createBlogPost: GQLBlogPost
  createComment: GQLComment
  createPage: GQLPage
  updateAsset?: Maybe<GQLAsset>
  updateContactForm?: Maybe<GQLContactForm>
  updateEcosystem?: Maybe<GQLEcosystem>
  updateBlock?: Maybe<GQLBlock>
  updateModule?: Maybe<GQLModule>
  updateStructuredPage?: Maybe<GQLStructuredPage>
  updateEmployee?: Maybe<GQLEmployee>
  updateQuote?: Maybe<GQLQuote>
  updateDocument?: Maybe<GQLDocument>
  updateStartProjectForm?: Maybe<GQLStartProjectForm>
  updateJobListing?: Maybe<GQLJobListing>
  updateMailchimpForm?: Maybe<GQLMailchimpForm>
  updateSingularPage?: Maybe<GQLSingularPage>
  updateBlogPost?: Maybe<GQLBlogPost>
  updateComment?: Maybe<GQLComment>
  updatePage?: Maybe<GQLPage>
  deleteAsset?: Maybe<GQLAsset>
  deleteContactForm?: Maybe<GQLContactForm>
  deleteEcosystem?: Maybe<GQLEcosystem>
  deleteBlock?: Maybe<GQLBlock>
  deleteModule?: Maybe<GQLModule>
  deleteStructuredPage?: Maybe<GQLStructuredPage>
  deleteEmployee?: Maybe<GQLEmployee>
  deleteQuote?: Maybe<GQLQuote>
  deleteDocument?: Maybe<GQLDocument>
  deleteStartProjectForm?: Maybe<GQLStartProjectForm>
  deleteJobListing?: Maybe<GQLJobListing>
  deleteMailchimpForm?: Maybe<GQLMailchimpForm>
  deleteSingularPage?: Maybe<GQLSingularPage>
  deleteBlogPost?: Maybe<GQLBlogPost>
  deleteComment?: Maybe<GQLComment>
  deletePage?: Maybe<GQLPage>
  upsertAsset: GQLAsset
  upsertContactForm: GQLContactForm
  upsertEcosystem: GQLEcosystem
  upsertBlock: GQLBlock
  upsertModule: GQLModule
  upsertStructuredPage: GQLStructuredPage
  upsertEmployee: GQLEmployee
  upsertQuote: GQLQuote
  upsertDocument: GQLDocument
  upsertStartProjectForm: GQLStartProjectForm
  upsertJobListing: GQLJobListing
  upsertMailchimpForm: GQLMailchimpForm
  upsertSingularPage: GQLSingularPage
  upsertBlogPost: GQLBlogPost
  upsertComment: GQLComment
  upsertPage: GQLPage
  updateManyAssets: GQLBatchPayload
  updateManyContactForms: GQLBatchPayload
  updateManyEcosystems: GQLBatchPayload
  updateManyBlocks: GQLBatchPayload
  updateManyModules: GQLBatchPayload
  updateManyStructuredPages: GQLBatchPayload
  updateManyEmployees: GQLBatchPayload
  updateManyQuotes: GQLBatchPayload
  updateManyDocuments: GQLBatchPayload
  updateManyStartProjectForms: GQLBatchPayload
  updateManyJobListings: GQLBatchPayload
  updateManyMailchimpForms: GQLBatchPayload
  updateManySingularPages: GQLBatchPayload
  updateManyBlogPosts: GQLBatchPayload
  updateManyComments: GQLBatchPayload
  updateManyPages: GQLBatchPayload
  deleteManyAssets: GQLBatchPayload
  deleteManyContactForms: GQLBatchPayload
  deleteManyEcosystems: GQLBatchPayload
  deleteManyBlocks: GQLBatchPayload
  deleteManyModules: GQLBatchPayload
  deleteManyStructuredPages: GQLBatchPayload
  deleteManyEmployees: GQLBatchPayload
  deleteManyQuotes: GQLBatchPayload
  deleteManyDocuments: GQLBatchPayload
  deleteManyStartProjectForms: GQLBatchPayload
  deleteManyJobListings: GQLBatchPayload
  deleteManyMailchimpForms: GQLBatchPayload
  deleteManySingularPages: GQLBatchPayload
  deleteManyBlogPosts: GQLBatchPayload
  deleteManyComments: GQLBatchPayload
  deleteManyPages: GQLBatchPayload
}

export type GQLMutationCreateAssetArgs = {
  data: GQLAssetCreateInput
}

export type GQLMutationUploadAssetArgs = {
  data: GQLAssetUploadInput
}

export type GQLMutationCreateContactFormArgs = {
  data: GQLContactFormCreateInput
}

export type GQLMutationCreateEcosystemArgs = {
  data: GQLEcosystemCreateInput
}

export type GQLMutationCreateBlockArgs = {
  data: GQLBlockCreateInput
}

export type GQLMutationCreateModuleArgs = {
  data: GQLModuleCreateInput
}

export type GQLMutationCreateStructuredPageArgs = {
  data: GQLStructuredPageCreateInput
}

export type GQLMutationCreateEmployeeArgs = {
  data: GQLEmployeeCreateInput
}

export type GQLMutationCreateQuoteArgs = {
  data: GQLQuoteCreateInput
}

export type GQLMutationCreateDocumentArgs = {
  data: GQLDocumentCreateInput
}

export type GQLMutationCreateStartProjectFormArgs = {
  data: GQLStartProjectFormCreateInput
}

export type GQLMutationCreateJobListingArgs = {
  data: GQLJobListingCreateInput
}

export type GQLMutationCreateMailchimpFormArgs = {
  data: GQLMailchimpFormCreateInput
}

export type GQLMutationCreateSingularPageArgs = {
  data: GQLSingularPageCreateInput
}

export type GQLMutationCreateBlogPostArgs = {
  data: GQLBlogPostCreateInput
}

export type GQLMutationCreateCommentArgs = {
  data: GQLCommentCreateInput
}

export type GQLMutationCreatePageArgs = {
  data: GQLPageCreateInput
}

export type GQLMutationUpdateAssetArgs = {
  data: GQLAssetUpdateInput
  where: GQLAssetWhereUniqueInput
}

export type GQLMutationUpdateContactFormArgs = {
  data: GQLContactFormUpdateInput
  where: GQLContactFormWhereUniqueInput
}

export type GQLMutationUpdateEcosystemArgs = {
  data: GQLEcosystemUpdateInput
  where: GQLEcosystemWhereUniqueInput
}

export type GQLMutationUpdateBlockArgs = {
  data: GQLBlockUpdateInput
  where: GQLBlockWhereUniqueInput
}

export type GQLMutationUpdateModuleArgs = {
  data: GQLModuleUpdateInput
  where: GQLModuleWhereUniqueInput
}

export type GQLMutationUpdateStructuredPageArgs = {
  data: GQLStructuredPageUpdateInput
  where: GQLStructuredPageWhereUniqueInput
}

export type GQLMutationUpdateEmployeeArgs = {
  data: GQLEmployeeUpdateInput
  where: GQLEmployeeWhereUniqueInput
}

export type GQLMutationUpdateQuoteArgs = {
  data: GQLQuoteUpdateInput
  where: GQLQuoteWhereUniqueInput
}

export type GQLMutationUpdateDocumentArgs = {
  data: GQLDocumentUpdateInput
  where: GQLDocumentWhereUniqueInput
}

export type GQLMutationUpdateStartProjectFormArgs = {
  data: GQLStartProjectFormUpdateInput
  where: GQLStartProjectFormWhereUniqueInput
}

export type GQLMutationUpdateJobListingArgs = {
  data: GQLJobListingUpdateInput
  where: GQLJobListingWhereUniqueInput
}

export type GQLMutationUpdateMailchimpFormArgs = {
  data: GQLMailchimpFormUpdateInput
  where: GQLMailchimpFormWhereUniqueInput
}

export type GQLMutationUpdateSingularPageArgs = {
  data: GQLSingularPageUpdateInput
  where: GQLSingularPageWhereUniqueInput
}

export type GQLMutationUpdateBlogPostArgs = {
  data: GQLBlogPostUpdateInput
  where: GQLBlogPostWhereUniqueInput
}

export type GQLMutationUpdateCommentArgs = {
  data: GQLCommentUpdateInput
  where: GQLCommentWhereUniqueInput
}

export type GQLMutationUpdatePageArgs = {
  data: GQLPageUpdateInput
  where: GQLPageWhereUniqueInput
}

export type GQLMutationDeleteAssetArgs = {
  where: GQLAssetWhereUniqueInput
}

export type GQLMutationDeleteContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
}

export type GQLMutationDeleteEcosystemArgs = {
  where: GQLEcosystemWhereUniqueInput
}

export type GQLMutationDeleteBlockArgs = {
  where: GQLBlockWhereUniqueInput
}

export type GQLMutationDeleteModuleArgs = {
  where: GQLModuleWhereUniqueInput
}

export type GQLMutationDeleteStructuredPageArgs = {
  where: GQLStructuredPageWhereUniqueInput
}

export type GQLMutationDeleteEmployeeArgs = {
  where: GQLEmployeeWhereUniqueInput
}

export type GQLMutationDeleteQuoteArgs = {
  where: GQLQuoteWhereUniqueInput
}

export type GQLMutationDeleteDocumentArgs = {
  where: GQLDocumentWhereUniqueInput
}

export type GQLMutationDeleteStartProjectFormArgs = {
  where: GQLStartProjectFormWhereUniqueInput
}

export type GQLMutationDeleteJobListingArgs = {
  where: GQLJobListingWhereUniqueInput
}

export type GQLMutationDeleteMailchimpFormArgs = {
  where: GQLMailchimpFormWhereUniqueInput
}

export type GQLMutationDeleteSingularPageArgs = {
  where: GQLSingularPageWhereUniqueInput
}

export type GQLMutationDeleteBlogPostArgs = {
  where: GQLBlogPostWhereUniqueInput
}

export type GQLMutationDeleteCommentArgs = {
  where: GQLCommentWhereUniqueInput
}

export type GQLMutationDeletePageArgs = {
  where: GQLPageWhereUniqueInput
}

export type GQLMutationUpsertAssetArgs = {
  where: GQLAssetWhereUniqueInput
  create: GQLAssetCreateInput
  update: GQLAssetUpdateInput
}

export type GQLMutationUpsertContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
  create: GQLContactFormCreateInput
  update: GQLContactFormUpdateInput
}

export type GQLMutationUpsertEcosystemArgs = {
  where: GQLEcosystemWhereUniqueInput
  create: GQLEcosystemCreateInput
  update: GQLEcosystemUpdateInput
}

export type GQLMutationUpsertBlockArgs = {
  where: GQLBlockWhereUniqueInput
  create: GQLBlockCreateInput
  update: GQLBlockUpdateInput
}

export type GQLMutationUpsertModuleArgs = {
  where: GQLModuleWhereUniqueInput
  create: GQLModuleCreateInput
  update: GQLModuleUpdateInput
}

export type GQLMutationUpsertStructuredPageArgs = {
  where: GQLStructuredPageWhereUniqueInput
  create: GQLStructuredPageCreateInput
  update: GQLStructuredPageUpdateInput
}

export type GQLMutationUpsertEmployeeArgs = {
  where: GQLEmployeeWhereUniqueInput
  create: GQLEmployeeCreateInput
  update: GQLEmployeeUpdateInput
}

export type GQLMutationUpsertQuoteArgs = {
  where: GQLQuoteWhereUniqueInput
  create: GQLQuoteCreateInput
  update: GQLQuoteUpdateInput
}

export type GQLMutationUpsertDocumentArgs = {
  where: GQLDocumentWhereUniqueInput
  create: GQLDocumentCreateInput
  update: GQLDocumentUpdateInput
}

export type GQLMutationUpsertStartProjectFormArgs = {
  where: GQLStartProjectFormWhereUniqueInput
  create: GQLStartProjectFormCreateInput
  update: GQLStartProjectFormUpdateInput
}

export type GQLMutationUpsertJobListingArgs = {
  where: GQLJobListingWhereUniqueInput
  create: GQLJobListingCreateInput
  update: GQLJobListingUpdateInput
}

export type GQLMutationUpsertMailchimpFormArgs = {
  where: GQLMailchimpFormWhereUniqueInput
  create: GQLMailchimpFormCreateInput
  update: GQLMailchimpFormUpdateInput
}

export type GQLMutationUpsertSingularPageArgs = {
  where: GQLSingularPageWhereUniqueInput
  create: GQLSingularPageCreateInput
  update: GQLSingularPageUpdateInput
}

export type GQLMutationUpsertBlogPostArgs = {
  where: GQLBlogPostWhereUniqueInput
  create: GQLBlogPostCreateInput
  update: GQLBlogPostUpdateInput
}

export type GQLMutationUpsertCommentArgs = {
  where: GQLCommentWhereUniqueInput
  create: GQLCommentCreateInput
  update: GQLCommentUpdateInput
}

export type GQLMutationUpsertPageArgs = {
  where: GQLPageWhereUniqueInput
  create: GQLPageCreateInput
  update: GQLPageUpdateInput
}

export type GQLMutationUpdateManyAssetsArgs = {
  data: GQLAssetUpdateManyMutationInput
  where?: Maybe<GQLAssetWhereInput>
}

export type GQLMutationUpdateManyContactFormsArgs = {
  data: GQLContactFormUpdateManyMutationInput
  where?: Maybe<GQLContactFormWhereInput>
}

export type GQLMutationUpdateManyEcosystemsArgs = {
  data: GQLEcosystemUpdateManyMutationInput
  where?: Maybe<GQLEcosystemWhereInput>
}

export type GQLMutationUpdateManyBlocksArgs = {
  data: GQLBlockUpdateManyMutationInput
  where?: Maybe<GQLBlockWhereInput>
}

export type GQLMutationUpdateManyModulesArgs = {
  data: GQLModuleUpdateManyMutationInput
  where?: Maybe<GQLModuleWhereInput>
}

export type GQLMutationUpdateManyStructuredPagesArgs = {
  data: GQLStructuredPageUpdateManyMutationInput
  where?: Maybe<GQLStructuredPageWhereInput>
}

export type GQLMutationUpdateManyEmployeesArgs = {
  data: GQLEmployeeUpdateManyMutationInput
  where?: Maybe<GQLEmployeeWhereInput>
}

export type GQLMutationUpdateManyQuotesArgs = {
  data: GQLQuoteUpdateManyMutationInput
  where?: Maybe<GQLQuoteWhereInput>
}

export type GQLMutationUpdateManyDocumentsArgs = {
  data: GQLDocumentUpdateManyMutationInput
  where?: Maybe<GQLDocumentWhereInput>
}

export type GQLMutationUpdateManyStartProjectFormsArgs = {
  data: GQLStartProjectFormUpdateManyMutationInput
  where?: Maybe<GQLStartProjectFormWhereInput>
}

export type GQLMutationUpdateManyJobListingsArgs = {
  data: GQLJobListingUpdateManyMutationInput
  where?: Maybe<GQLJobListingWhereInput>
}

export type GQLMutationUpdateManyMailchimpFormsArgs = {
  data: GQLMailchimpFormUpdateManyMutationInput
  where?: Maybe<GQLMailchimpFormWhereInput>
}

export type GQLMutationUpdateManySingularPagesArgs = {
  data: GQLSingularPageUpdateManyMutationInput
  where?: Maybe<GQLSingularPageWhereInput>
}

export type GQLMutationUpdateManyBlogPostsArgs = {
  data: GQLBlogPostUpdateManyMutationInput
  where?: Maybe<GQLBlogPostWhereInput>
}

export type GQLMutationUpdateManyCommentsArgs = {
  data: GQLCommentUpdateManyMutationInput
  where?: Maybe<GQLCommentWhereInput>
}

export type GQLMutationUpdateManyPagesArgs = {
  data: GQLPageUpdateManyMutationInput
  where?: Maybe<GQLPageWhereInput>
}

export type GQLMutationDeleteManyAssetsArgs = {
  where?: Maybe<GQLAssetWhereInput>
}

export type GQLMutationDeleteManyContactFormsArgs = {
  where?: Maybe<GQLContactFormWhereInput>
}

export type GQLMutationDeleteManyEcosystemsArgs = {
  where?: Maybe<GQLEcosystemWhereInput>
}

export type GQLMutationDeleteManyBlocksArgs = {
  where?: Maybe<GQLBlockWhereInput>
}

export type GQLMutationDeleteManyModulesArgs = {
  where?: Maybe<GQLModuleWhereInput>
}

export type GQLMutationDeleteManyStructuredPagesArgs = {
  where?: Maybe<GQLStructuredPageWhereInput>
}

export type GQLMutationDeleteManyEmployeesArgs = {
  where?: Maybe<GQLEmployeeWhereInput>
}

export type GQLMutationDeleteManyQuotesArgs = {
  where?: Maybe<GQLQuoteWhereInput>
}

export type GQLMutationDeleteManyDocumentsArgs = {
  where?: Maybe<GQLDocumentWhereInput>
}

export type GQLMutationDeleteManyStartProjectFormsArgs = {
  where?: Maybe<GQLStartProjectFormWhereInput>
}

export type GQLMutationDeleteManyJobListingsArgs = {
  where?: Maybe<GQLJobListingWhereInput>
}

export type GQLMutationDeleteManyMailchimpFormsArgs = {
  where?: Maybe<GQLMailchimpFormWhereInput>
}

export type GQLMutationDeleteManySingularPagesArgs = {
  where?: Maybe<GQLSingularPageWhereInput>
}

export type GQLMutationDeleteManyBlogPostsArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
}

export type GQLMutationDeleteManyCommentsArgs = {
  where?: Maybe<GQLCommentWhereInput>
}

export type GQLMutationDeleteManyPagesArgs = {
  where?: Maybe<GQLPageWhereInput>
}

export enum GQLMutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED',
}

export type GQLNode = {
  id: Scalars['ID']
}

export type GQLPage = GQLNode & {
  __typename?: 'Page'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPage>
  blogPost?: Maybe<GQLBlogPost>
  jobListing?: Maybe<GQLJobListing>
  comment?: Maybe<GQLComment>
  singularPage?: Maybe<GQLSingularPage>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export type GQLPageMetaTitleArgs = {
  locale?: Maybe<GQLLocale>
}

export type GQLPageMetaDescriptionArgs = {
  locale?: Maybe<GQLLocale>
}

export type GQLPageUrlArgs = {
  locale?: Maybe<GQLLocale>
}

export type GQLPageConnection = {
  __typename?: 'PageConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLPageEdge>>
  aggregate: GQLAggregatePage
}

export type GQLPageCreateInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingCreateOneWithoutPageInput>
  comment?: Maybe<GQLCommentCreateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageCreateOneWithoutPageInput>
}

export type GQLPageCreateOneWithoutBlogPostInput = {
  create?: Maybe<GQLPageCreateWithoutBlogPostInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageCreateOneWithoutCommentInput = {
  create?: Maybe<GQLPageCreateWithoutCommentInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageCreateOneWithoutJobListingInput = {
  create?: Maybe<GQLPageCreateWithoutJobListingInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageCreateOneWithoutSingularPageInput = {
  create?: Maybe<GQLPageCreateWithoutSingularPageInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageCreateOneWithoutStructuredPageInput = {
  create?: Maybe<GQLPageCreateWithoutStructuredPageInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
}

export type GQLPageCreateWithoutBlogPostInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPageCreateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingCreateOneWithoutPageInput>
  comment?: Maybe<GQLCommentCreateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageCreateOneWithoutPageInput>
}

export type GQLPageCreateWithoutCommentInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingCreateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageCreateOneWithoutPageInput>
}

export type GQLPageCreateWithoutJobListingInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostCreateOneWithoutPageInput>
  comment?: Maybe<GQLCommentCreateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageCreateOneWithoutPageInput>
}

export type GQLPageCreateWithoutSingularPageInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  structuredPage?: Maybe<GQLStructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingCreateOneWithoutPageInput>
  comment?: Maybe<GQLCommentCreateOneWithoutPageInput>
}

export type GQLPageCreateWithoutStructuredPageInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
  blogPost?: Maybe<GQLBlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingCreateOneWithoutPageInput>
  comment?: Maybe<GQLCommentCreateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageCreateOneWithoutPageInput>
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

export enum GQLPageOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UrlEnAsc = 'urlEN_ASC',
  UrlEnDesc = 'urlEN_DESC',
  UrlNlAsc = 'urlNL_ASC',
  UrlNlDesc = 'urlNL_DESC',
  MetaTitleEnAsc = 'metaTitleEN_ASC',
  MetaTitleEnDesc = 'metaTitleEN_DESC',
  MetaTitleNlAsc = 'metaTitleNL_ASC',
  MetaTitleNlDesc = 'metaTitleNL_DESC',
  MetaDescriptionEnAsc = 'metaDescriptionEN_ASC',
  MetaDescriptionEnDesc = 'metaDescriptionEN_DESC',
  MetaDescriptionNlAsc = 'metaDescriptionNL_ASC',
  MetaDescriptionNlDesc = 'metaDescriptionNL_DESC',
  MetaRobotsAsc = 'metaRobots_ASC',
  MetaRobotsDesc = 'metaRobots_DESC',
}

export type GQLPagePreviousValues = {
  __typename?: 'PagePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots: GQLMetaRobots
}

export type GQLPageSubscriptionPayload = {
  __typename?: 'PageSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLPage>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLPagePreviousValues>
}

export type GQLPageSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLPageSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLPageSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLPageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLPageWhereInput>
}

export type GQLPageUpdateInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  structuredPage?: Maybe<GQLStructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingUpdateOneWithoutPageInput>
  comment?: Maybe<GQLCommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageUpdateOneWithoutPageInput>
}

export type GQLPageUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
}

export type GQLPageUpdateOneWithoutBlogPostInput = {
  create?: Maybe<GQLPageCreateWithoutBlogPostInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLPageUpdateWithoutBlogPostDataInput>
  upsert?: Maybe<GQLPageUpsertWithoutBlogPostInput>
}

export type GQLPageUpdateOneWithoutCommentInput = {
  create?: Maybe<GQLPageCreateWithoutCommentInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLPageUpdateWithoutCommentDataInput>
  upsert?: Maybe<GQLPageUpsertWithoutCommentInput>
}

export type GQLPageUpdateOneWithoutJobListingInput = {
  create?: Maybe<GQLPageCreateWithoutJobListingInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLPageUpdateWithoutJobListingDataInput>
  upsert?: Maybe<GQLPageUpsertWithoutJobListingInput>
}

export type GQLPageUpdateOneWithoutSingularPageInput = {
  create?: Maybe<GQLPageCreateWithoutSingularPageInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLPageUpdateWithoutSingularPageDataInput>
  upsert?: Maybe<GQLPageUpsertWithoutSingularPageInput>
}

export type GQLPageUpdateOneWithoutStructuredPageInput = {
  create?: Maybe<GQLPageCreateWithoutStructuredPageInput>
  connect?: Maybe<GQLPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLPageUpdateWithoutStructuredPageDataInput>
  upsert?: Maybe<GQLPageUpsertWithoutStructuredPageInput>
}

export type GQLPageUpdateWithoutBlogPostDataInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  structuredPage?: Maybe<GQLStructuredPageUpdateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingUpdateOneWithoutPageInput>
  comment?: Maybe<GQLCommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageUpdateOneWithoutPageInput>
}

export type GQLPageUpdateWithoutCommentDataInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  structuredPage?: Maybe<GQLStructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingUpdateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageUpdateOneWithoutPageInput>
}

export type GQLPageUpdateWithoutJobListingDataInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  structuredPage?: Maybe<GQLStructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostUpdateOneWithoutPageInput>
  comment?: Maybe<GQLCommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageUpdateOneWithoutPageInput>
}

export type GQLPageUpdateWithoutSingularPageDataInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  structuredPage?: Maybe<GQLStructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<GQLBlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingUpdateOneWithoutPageInput>
  comment?: Maybe<GQLCommentUpdateOneWithoutPageInput>
}

export type GQLPageUpdateWithoutStructuredPageDataInput = {
  status?: Maybe<GQLStatus>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  blogPost?: Maybe<GQLBlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<GQLJobListingUpdateOneWithoutPageInput>
  comment?: Maybe<GQLCommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<GQLSingularPageUpdateOneWithoutPageInput>
}

export type GQLPageUpsertWithoutBlogPostInput = {
  update: GQLPageUpdateWithoutBlogPostDataInput
  create: GQLPageCreateWithoutBlogPostInput
}

export type GQLPageUpsertWithoutCommentInput = {
  update: GQLPageUpdateWithoutCommentDataInput
  create: GQLPageCreateWithoutCommentInput
}

export type GQLPageUpsertWithoutJobListingInput = {
  update: GQLPageUpdateWithoutJobListingDataInput
  create: GQLPageCreateWithoutJobListingInput
}

export type GQLPageUpsertWithoutSingularPageInput = {
  update: GQLPageUpdateWithoutSingularPageDataInput
  create: GQLPageCreateWithoutSingularPageInput
}

export type GQLPageUpsertWithoutStructuredPageInput = {
  update: GQLPageUpdateWithoutStructuredPageDataInput
  create: GQLPageCreateWithoutStructuredPageInput
}

export type GQLPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLPageWhereInput>>
  OR?: Maybe<Array<GQLPageWhereInput>>
  NOT?: Maybe<Array<GQLPageWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  urlEN?: Maybe<Scalars['String']>
  urlEN_not?: Maybe<Scalars['String']>
  urlEN_in?: Maybe<Array<Scalars['String']>>
  urlEN_not_in?: Maybe<Array<Scalars['String']>>
  urlEN_lt?: Maybe<Scalars['String']>
  urlEN_lte?: Maybe<Scalars['String']>
  urlEN_gt?: Maybe<Scalars['String']>
  urlEN_gte?: Maybe<Scalars['String']>
  urlEN_contains?: Maybe<Scalars['String']>
  urlEN_not_contains?: Maybe<Scalars['String']>
  urlEN_starts_with?: Maybe<Scalars['String']>
  urlEN_not_starts_with?: Maybe<Scalars['String']>
  urlEN_ends_with?: Maybe<Scalars['String']>
  urlEN_not_ends_with?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
  urlNL_not?: Maybe<Scalars['String']>
  urlNL_in?: Maybe<Array<Scalars['String']>>
  urlNL_not_in?: Maybe<Array<Scalars['String']>>
  urlNL_lt?: Maybe<Scalars['String']>
  urlNL_lte?: Maybe<Scalars['String']>
  urlNL_gt?: Maybe<Scalars['String']>
  urlNL_gte?: Maybe<Scalars['String']>
  urlNL_contains?: Maybe<Scalars['String']>
  urlNL_not_contains?: Maybe<Scalars['String']>
  urlNL_starts_with?: Maybe<Scalars['String']>
  urlNL_not_starts_with?: Maybe<Scalars['String']>
  urlNL_ends_with?: Maybe<Scalars['String']>
  urlNL_not_ends_with?: Maybe<Scalars['String']>
  metaTitleEN?: Maybe<Scalars['String']>
  metaTitleEN_not?: Maybe<Scalars['String']>
  metaTitleEN_in?: Maybe<Array<Scalars['String']>>
  metaTitleEN_not_in?: Maybe<Array<Scalars['String']>>
  metaTitleEN_lt?: Maybe<Scalars['String']>
  metaTitleEN_lte?: Maybe<Scalars['String']>
  metaTitleEN_gt?: Maybe<Scalars['String']>
  metaTitleEN_gte?: Maybe<Scalars['String']>
  metaTitleEN_contains?: Maybe<Scalars['String']>
  metaTitleEN_not_contains?: Maybe<Scalars['String']>
  metaTitleEN_starts_with?: Maybe<Scalars['String']>
  metaTitleEN_not_starts_with?: Maybe<Scalars['String']>
  metaTitleEN_ends_with?: Maybe<Scalars['String']>
  metaTitleEN_not_ends_with?: Maybe<Scalars['String']>
  metaTitleNL?: Maybe<Scalars['String']>
  metaTitleNL_not?: Maybe<Scalars['String']>
  metaTitleNL_in?: Maybe<Array<Scalars['String']>>
  metaTitleNL_not_in?: Maybe<Array<Scalars['String']>>
  metaTitleNL_lt?: Maybe<Scalars['String']>
  metaTitleNL_lte?: Maybe<Scalars['String']>
  metaTitleNL_gt?: Maybe<Scalars['String']>
  metaTitleNL_gte?: Maybe<Scalars['String']>
  metaTitleNL_contains?: Maybe<Scalars['String']>
  metaTitleNL_not_contains?: Maybe<Scalars['String']>
  metaTitleNL_starts_with?: Maybe<Scalars['String']>
  metaTitleNL_not_starts_with?: Maybe<Scalars['String']>
  metaTitleNL_ends_with?: Maybe<Scalars['String']>
  metaTitleNL_not_ends_with?: Maybe<Scalars['String']>
  metaDescriptionEN?: Maybe<Scalars['String']>
  metaDescriptionEN_not?: Maybe<Scalars['String']>
  metaDescriptionEN_in?: Maybe<Array<Scalars['String']>>
  metaDescriptionEN_not_in?: Maybe<Array<Scalars['String']>>
  metaDescriptionEN_lt?: Maybe<Scalars['String']>
  metaDescriptionEN_lte?: Maybe<Scalars['String']>
  metaDescriptionEN_gt?: Maybe<Scalars['String']>
  metaDescriptionEN_gte?: Maybe<Scalars['String']>
  metaDescriptionEN_contains?: Maybe<Scalars['String']>
  metaDescriptionEN_not_contains?: Maybe<Scalars['String']>
  metaDescriptionEN_starts_with?: Maybe<Scalars['String']>
  metaDescriptionEN_not_starts_with?: Maybe<Scalars['String']>
  metaDescriptionEN_ends_with?: Maybe<Scalars['String']>
  metaDescriptionEN_not_ends_with?: Maybe<Scalars['String']>
  metaDescriptionNL?: Maybe<Scalars['String']>
  metaDescriptionNL_not?: Maybe<Scalars['String']>
  metaDescriptionNL_in?: Maybe<Array<Scalars['String']>>
  metaDescriptionNL_not_in?: Maybe<Array<Scalars['String']>>
  metaDescriptionNL_lt?: Maybe<Scalars['String']>
  metaDescriptionNL_lte?: Maybe<Scalars['String']>
  metaDescriptionNL_gt?: Maybe<Scalars['String']>
  metaDescriptionNL_gte?: Maybe<Scalars['String']>
  metaDescriptionNL_contains?: Maybe<Scalars['String']>
  metaDescriptionNL_not_contains?: Maybe<Scalars['String']>
  metaDescriptionNL_starts_with?: Maybe<Scalars['String']>
  metaDescriptionNL_not_starts_with?: Maybe<Scalars['String']>
  metaDescriptionNL_ends_with?: Maybe<Scalars['String']>
  metaDescriptionNL_not_ends_with?: Maybe<Scalars['String']>
  metaRobots?: Maybe<GQLMetaRobots>
  metaRobots_not?: Maybe<GQLMetaRobots>
  metaRobots_in?: Maybe<Array<GQLMetaRobots>>
  metaRobots_not_in?: Maybe<Array<GQLMetaRobots>>
  structuredPage?: Maybe<GQLStructuredPageWhereInput>
  blogPost?: Maybe<GQLBlogPostWhereInput>
  jobListing?: Maybe<GQLJobListingWhereInput>
  comment?: Maybe<GQLCommentWhereInput>
  singularPage?: Maybe<GQLSingularPageWhereInput>
}

export type GQLPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  urlEN?: Maybe<Scalars['String']>
  urlNL?: Maybe<Scalars['String']>
}

export type GQLQuery = {
  __typename?: 'Query'
  assets: Array<Maybe<GQLAsset>>
  contactForms: Array<Maybe<GQLContactForm>>
  ecosystems: Array<Maybe<GQLEcosystem>>
  blocks: Array<Maybe<GQLBlock>>
  modules: Array<Maybe<GQLModule>>
  structuredPages: Array<Maybe<GQLStructuredPage>>
  employees: Array<Maybe<GQLEmployee>>
  quotes: Array<Maybe<GQLQuote>>
  documents: Array<Maybe<GQLDocument>>
  startProjectForms: Array<Maybe<GQLStartProjectForm>>
  jobListings: Array<Maybe<GQLJobListing>>
  mailchimpForms: Array<Maybe<GQLMailchimpForm>>
  singularPages: Array<Maybe<GQLSingularPage>>
  blogPosts: Array<Maybe<GQLBlogPost>>
  comments: Array<Maybe<GQLComment>>
  pages: Array<Maybe<GQLPage>>
  asset?: Maybe<GQLAsset>
  contactForm?: Maybe<GQLContactForm>
  ecosystem?: Maybe<GQLEcosystem>
  block?: Maybe<GQLBlock>
  module?: Maybe<GQLModule>
  structuredPage?: Maybe<GQLStructuredPage>
  employee?: Maybe<GQLEmployee>
  quote?: Maybe<GQLQuote>
  document?: Maybe<GQLDocument>
  startProjectForm?: Maybe<GQLStartProjectForm>
  jobListing?: Maybe<GQLJobListing>
  mailchimpForm?: Maybe<GQLMailchimpForm>
  singularPage?: Maybe<GQLSingularPage>
  blogPost?: Maybe<GQLBlogPost>
  comment?: Maybe<GQLComment>
  page?: Maybe<GQLPage>
  assetsConnection: GQLAssetConnection
  contactFormsConnection: GQLContactFormConnection
  ecosystemsConnection: GQLEcosystemConnection
  blocksConnection: GQLBlockConnection
  modulesConnection: GQLModuleConnection
  structuredPagesConnection: GQLStructuredPageConnection
  employeesConnection: GQLEmployeeConnection
  quotesConnection: GQLQuoteConnection
  documentsConnection: GQLDocumentConnection
  startProjectFormsConnection: GQLStartProjectFormConnection
  jobListingsConnection: GQLJobListingConnection
  mailchimpFormsConnection: GQLMailchimpFormConnection
  singularPagesConnection: GQLSingularPageConnection
  blogPostsConnection: GQLBlogPostConnection
  commentsConnection: GQLCommentConnection
  pagesConnection: GQLPageConnection
  node?: Maybe<GQLNode>
}

export type GQLQueryAssetsArgs = {
  where?: Maybe<GQLAssetWhereInput>
  orderBy?: Maybe<GQLAssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryContactFormsArgs = {
  where?: Maybe<GQLContactFormWhereInput>
  orderBy?: Maybe<GQLContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryEcosystemsArgs = {
  where?: Maybe<GQLEcosystemWhereInput>
  orderBy?: Maybe<GQLEcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryBlocksArgs = {
  where?: Maybe<GQLBlockWhereInput>
  orderBy?: Maybe<GQLBlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryModulesArgs = {
  where?: Maybe<GQLModuleWhereInput>
  orderBy?: Maybe<GQLModuleOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryStructuredPagesArgs = {
  where?: Maybe<GQLStructuredPageWhereInput>
  orderBy?: Maybe<GQLStructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryEmployeesArgs = {
  where?: Maybe<GQLEmployeeWhereInput>
  orderBy?: Maybe<GQLEmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryQuotesArgs = {
  where?: Maybe<GQLQuoteWhereInput>
  orderBy?: Maybe<GQLQuoteOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryDocumentsArgs = {
  where?: Maybe<GQLDocumentWhereInput>
  orderBy?: Maybe<GQLDocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryStartProjectFormsArgs = {
  where?: Maybe<GQLStartProjectFormWhereInput>
  orderBy?: Maybe<GQLStartProjectFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryJobListingsArgs = {
  where?: Maybe<GQLJobListingWhereInput>
  orderBy?: Maybe<GQLJobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryMailchimpFormsArgs = {
  where?: Maybe<GQLMailchimpFormWhereInput>
  orderBy?: Maybe<GQLMailchimpFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQuerySingularPagesArgs = {
  where?: Maybe<GQLSingularPageWhereInput>
  orderBy?: Maybe<GQLSingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryBlogPostsArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
  orderBy?: Maybe<GQLBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryCommentsArgs = {
  where?: Maybe<GQLCommentWhereInput>
  orderBy?: Maybe<GQLCommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryPagesArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryAssetArgs = {
  where: GQLAssetWhereUniqueInput
}

export type GQLQueryContactFormArgs = {
  where: GQLContactFormWhereUniqueInput
}

export type GQLQueryEcosystemArgs = {
  where: GQLEcosystemWhereUniqueInput
}

export type GQLQueryBlockArgs = {
  where: GQLBlockWhereUniqueInput
}

export type GQLQueryModuleArgs = {
  where: GQLModuleWhereUniqueInput
}

export type GQLQueryStructuredPageArgs = {
  where: GQLStructuredPageWhereUniqueInput
}

export type GQLQueryEmployeeArgs = {
  where: GQLEmployeeWhereUniqueInput
}

export type GQLQueryQuoteArgs = {
  where: GQLQuoteWhereUniqueInput
}

export type GQLQueryDocumentArgs = {
  where: GQLDocumentWhereUniqueInput
}

export type GQLQueryStartProjectFormArgs = {
  where: GQLStartProjectFormWhereUniqueInput
}

export type GQLQueryJobListingArgs = {
  where: GQLJobListingWhereUniqueInput
}

export type GQLQueryMailchimpFormArgs = {
  where: GQLMailchimpFormWhereUniqueInput
}

export type GQLQuerySingularPageArgs = {
  where: GQLSingularPageWhereUniqueInput
}

export type GQLQueryBlogPostArgs = {
  where: GQLBlogPostWhereUniqueInput
}

export type GQLQueryCommentArgs = {
  where: GQLCommentWhereUniqueInput
}

export type GQLQueryPageArgs = {
  where: GQLPageWhereUniqueInput
}

export type GQLQueryAssetsConnectionArgs = {
  where?: Maybe<GQLAssetWhereInput>
  orderBy?: Maybe<GQLAssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryContactFormsConnectionArgs = {
  where?: Maybe<GQLContactFormWhereInput>
  orderBy?: Maybe<GQLContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryEcosystemsConnectionArgs = {
  where?: Maybe<GQLEcosystemWhereInput>
  orderBy?: Maybe<GQLEcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryBlocksConnectionArgs = {
  where?: Maybe<GQLBlockWhereInput>
  orderBy?: Maybe<GQLBlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryModulesConnectionArgs = {
  where?: Maybe<GQLModuleWhereInput>
  orderBy?: Maybe<GQLModuleOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryStructuredPagesConnectionArgs = {
  where?: Maybe<GQLStructuredPageWhereInput>
  orderBy?: Maybe<GQLStructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryEmployeesConnectionArgs = {
  where?: Maybe<GQLEmployeeWhereInput>
  orderBy?: Maybe<GQLEmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryQuotesConnectionArgs = {
  where?: Maybe<GQLQuoteWhereInput>
  orderBy?: Maybe<GQLQuoteOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryDocumentsConnectionArgs = {
  where?: Maybe<GQLDocumentWhereInput>
  orderBy?: Maybe<GQLDocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryStartProjectFormsConnectionArgs = {
  where?: Maybe<GQLStartProjectFormWhereInput>
  orderBy?: Maybe<GQLStartProjectFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryJobListingsConnectionArgs = {
  where?: Maybe<GQLJobListingWhereInput>
  orderBy?: Maybe<GQLJobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryMailchimpFormsConnectionArgs = {
  where?: Maybe<GQLMailchimpFormWhereInput>
  orderBy?: Maybe<GQLMailchimpFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQuerySingularPagesConnectionArgs = {
  where?: Maybe<GQLSingularPageWhereInput>
  orderBy?: Maybe<GQLSingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryBlogPostsConnectionArgs = {
  where?: Maybe<GQLBlogPostWhereInput>
  orderBy?: Maybe<GQLBlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryCommentsConnectionArgs = {
  where?: Maybe<GQLCommentWhereInput>
  orderBy?: Maybe<GQLCommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryPagesConnectionArgs = {
  where?: Maybe<GQLPageWhereInput>
  orderBy?: Maybe<GQLPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLQueryNodeArgs = {
  id: Scalars['ID']
}

export type GQLQuote = GQLNode & {
  __typename?: 'Quote'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type GQLQuoteConnection = {
  __typename?: 'QuoteConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLQuoteEdge>>
  aggregate: GQLAggregateQuote
}

export type GQLQuoteCreateInput = {
  status?: Maybe<GQLStatus>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type GQLQuoteEdge = {
  __typename?: 'QuoteEdge'
  node: GQLQuote
  cursor: Scalars['String']
}

export enum GQLQuoteOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  AuthorNameAsc = 'authorName_ASC',
  AuthorNameDesc = 'authorName_DESC',
  AuthorTitleAsc = 'authorTitle_ASC',
  AuthorTitleDesc = 'authorTitle_DESC',
  AsideTitleAsc = 'asideTitle_ASC',
  AsideTitleDesc = 'asideTitle_DESC',
  AsideTextAsc = 'asideText_ASC',
  AsideTextDesc = 'asideText_DESC',
  TextAsc = 'text_ASC',
  TextDesc = 'text_DESC',
}

export type GQLQuotePreviousValues = {
  __typename?: 'QuotePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type GQLQuoteSubscriptionPayload = {
  __typename?: 'QuoteSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLQuote>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLQuotePreviousValues>
}

export type GQLQuoteSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLQuoteSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLQuoteSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLQuoteSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLQuoteWhereInput>
}

export type GQLQuoteUpdateInput = {
  status?: Maybe<GQLStatus>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type GQLQuoteUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type GQLQuoteWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLQuoteWhereInput>>
  OR?: Maybe<Array<GQLQuoteWhereInput>>
  NOT?: Maybe<Array<GQLQuoteWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  authorName?: Maybe<Scalars['String']>
  authorName_not?: Maybe<Scalars['String']>
  authorName_in?: Maybe<Array<Scalars['String']>>
  authorName_not_in?: Maybe<Array<Scalars['String']>>
  authorName_lt?: Maybe<Scalars['String']>
  authorName_lte?: Maybe<Scalars['String']>
  authorName_gt?: Maybe<Scalars['String']>
  authorName_gte?: Maybe<Scalars['String']>
  authorName_contains?: Maybe<Scalars['String']>
  authorName_not_contains?: Maybe<Scalars['String']>
  authorName_starts_with?: Maybe<Scalars['String']>
  authorName_not_starts_with?: Maybe<Scalars['String']>
  authorName_ends_with?: Maybe<Scalars['String']>
  authorName_not_ends_with?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  authorTitle_not?: Maybe<Scalars['String']>
  authorTitle_in?: Maybe<Array<Scalars['String']>>
  authorTitle_not_in?: Maybe<Array<Scalars['String']>>
  authorTitle_lt?: Maybe<Scalars['String']>
  authorTitle_lte?: Maybe<Scalars['String']>
  authorTitle_gt?: Maybe<Scalars['String']>
  authorTitle_gte?: Maybe<Scalars['String']>
  authorTitle_contains?: Maybe<Scalars['String']>
  authorTitle_not_contains?: Maybe<Scalars['String']>
  authorTitle_starts_with?: Maybe<Scalars['String']>
  authorTitle_not_starts_with?: Maybe<Scalars['String']>
  authorTitle_ends_with?: Maybe<Scalars['String']>
  authorTitle_not_ends_with?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideTitle_not?: Maybe<Scalars['String']>
  asideTitle_in?: Maybe<Array<Scalars['String']>>
  asideTitle_not_in?: Maybe<Array<Scalars['String']>>
  asideTitle_lt?: Maybe<Scalars['String']>
  asideTitle_lte?: Maybe<Scalars['String']>
  asideTitle_gt?: Maybe<Scalars['String']>
  asideTitle_gte?: Maybe<Scalars['String']>
  asideTitle_contains?: Maybe<Scalars['String']>
  asideTitle_not_contains?: Maybe<Scalars['String']>
  asideTitle_starts_with?: Maybe<Scalars['String']>
  asideTitle_not_starts_with?: Maybe<Scalars['String']>
  asideTitle_ends_with?: Maybe<Scalars['String']>
  asideTitle_not_ends_with?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  asideText_not?: Maybe<Scalars['String']>
  asideText_in?: Maybe<Array<Scalars['String']>>
  asideText_not_in?: Maybe<Array<Scalars['String']>>
  asideText_lt?: Maybe<Scalars['String']>
  asideText_lte?: Maybe<Scalars['String']>
  asideText_gt?: Maybe<Scalars['String']>
  asideText_gte?: Maybe<Scalars['String']>
  asideText_contains?: Maybe<Scalars['String']>
  asideText_not_contains?: Maybe<Scalars['String']>
  asideText_starts_with?: Maybe<Scalars['String']>
  asideText_not_starts_with?: Maybe<Scalars['String']>
  asideText_ends_with?: Maybe<Scalars['String']>
  asideText_not_ends_with?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
  text_not?: Maybe<Scalars['String']>
  text_in?: Maybe<Array<Scalars['String']>>
  text_not_in?: Maybe<Array<Scalars['String']>>
  text_lt?: Maybe<Scalars['String']>
  text_lte?: Maybe<Scalars['String']>
  text_gt?: Maybe<Scalars['String']>
  text_gte?: Maybe<Scalars['String']>
  text_contains?: Maybe<Scalars['String']>
  text_not_contains?: Maybe<Scalars['String']>
  text_starts_with?: Maybe<Scalars['String']>
  text_not_starts_with?: Maybe<Scalars['String']>
  text_ends_with?: Maybe<Scalars['String']>
  text_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLQuoteWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLSingularPage = GQLNode & {
  __typename?: 'SingularPage'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  content: Scalars['String']
  title: Scalars['String']
  image?: Maybe<GQLAsset>
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<GQLPage>
}

export type GQLSingularPageConnection = {
  __typename?: 'SingularPageConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLSingularPageEdge>>
  aggregate: GQLAggregateSingularPage
}

export type GQLSingularPageCreateInput = {
  status?: Maybe<GQLStatus>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAssetCreateOneWithoutImageSingularPageInput>
  page?: Maybe<GQLPageCreateOneWithoutSingularPageInput>
}

export type GQLSingularPageCreateManyWithoutImageInput = {
  create?: Maybe<Array<GQLSingularPageCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLSingularPageWhereUniqueInput>>
}

export type GQLSingularPageCreateOneWithoutPageInput = {
  create?: Maybe<GQLSingularPageCreateWithoutPageInput>
  connect?: Maybe<GQLSingularPageWhereUniqueInput>
}

export type GQLSingularPageCreateWithoutImageInput = {
  status?: Maybe<GQLStatus>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<GQLPageCreateOneWithoutSingularPageInput>
}

export type GQLSingularPageCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAssetCreateOneWithoutImageSingularPageInput>
}

export type GQLSingularPageEdge = {
  __typename?: 'SingularPageEdge'
  node: GQLSingularPage
  cursor: Scalars['String']
}

export enum GQLSingularPageOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ReleaseDateAsc = 'releaseDate_ASC',
  ReleaseDateDesc = 'releaseDate_DESC',
}

export type GQLSingularPagePreviousValues = {
  __typename?: 'SingularPagePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type GQLSingularPageScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLSingularPageScalarWhereInput>>
  OR?: Maybe<Array<GQLSingularPageScalarWhereInput>>
  NOT?: Maybe<Array<GQLSingularPageScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  releaseDate_not?: Maybe<Scalars['DateTime']>
  releaseDate_in?: Maybe<Array<Scalars['DateTime']>>
  releaseDate_not_in?: Maybe<Array<Scalars['DateTime']>>
  releaseDate_lt?: Maybe<Scalars['DateTime']>
  releaseDate_lte?: Maybe<Scalars['DateTime']>
  releaseDate_gt?: Maybe<Scalars['DateTime']>
  releaseDate_gte?: Maybe<Scalars['DateTime']>
}

export type GQLSingularPageSubscriptionPayload = {
  __typename?: 'SingularPageSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLSingularPage>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLSingularPagePreviousValues>
}

export type GQLSingularPageSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLSingularPageSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLSingularPageSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLSingularPageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLSingularPageWhereInput>
}

export type GQLSingularPageUpdateInput = {
  status?: Maybe<GQLStatus>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageSingularPageInput>
  page?: Maybe<GQLPageUpdateOneWithoutSingularPageInput>
}

export type GQLSingularPageUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type GQLSingularPageUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type GQLSingularPageUpdateManyWithoutImageInput = {
  create?: Maybe<Array<GQLSingularPageCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLSingularPageWhereUniqueInput>>
  set?: Maybe<Array<GQLSingularPageWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLSingularPageWhereUniqueInput>>
  delete?: Maybe<Array<GQLSingularPageWhereUniqueInput>>
  update?: Maybe<Array<GQLSingularPageUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<GQLSingularPageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLSingularPageScalarWhereInput>>
  upsert?: Maybe<Array<GQLSingularPageUpsertWithWhereUniqueWithoutImageInput>>
}

export type GQLSingularPageUpdateManyWithWhereNestedInput = {
  where: GQLSingularPageScalarWhereInput
  data: GQLSingularPageUpdateManyDataInput
}

export type GQLSingularPageUpdateOneWithoutPageInput = {
  create?: Maybe<GQLSingularPageCreateWithoutPageInput>
  connect?: Maybe<GQLSingularPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLSingularPageUpdateWithoutPageDataInput>
  upsert?: Maybe<GQLSingularPageUpsertWithoutPageInput>
}

export type GQLSingularPageUpdateWithoutImageDataInput = {
  status?: Maybe<GQLStatus>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<GQLPageUpdateOneWithoutSingularPageInput>
}

export type GQLSingularPageUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageSingularPageInput>
}

export type GQLSingularPageUpdateWithWhereUniqueWithoutImageInput = {
  where: GQLSingularPageWhereUniqueInput
  data: GQLSingularPageUpdateWithoutImageDataInput
}

export type GQLSingularPageUpsertWithoutPageInput = {
  update: GQLSingularPageUpdateWithoutPageDataInput
  create: GQLSingularPageCreateWithoutPageInput
}

export type GQLSingularPageUpsertWithWhereUniqueWithoutImageInput = {
  where: GQLSingularPageWhereUniqueInput
  update: GQLSingularPageUpdateWithoutImageDataInput
  create: GQLSingularPageCreateWithoutImageInput
}

export type GQLSingularPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLSingularPageWhereInput>>
  OR?: Maybe<Array<GQLSingularPageWhereInput>>
  NOT?: Maybe<Array<GQLSingularPageWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  content?: Maybe<Scalars['String']>
  content_not?: Maybe<Scalars['String']>
  content_in?: Maybe<Array<Scalars['String']>>
  content_not_in?: Maybe<Array<Scalars['String']>>
  content_lt?: Maybe<Scalars['String']>
  content_lte?: Maybe<Scalars['String']>
  content_gt?: Maybe<Scalars['String']>
  content_gte?: Maybe<Scalars['String']>
  content_contains?: Maybe<Scalars['String']>
  content_not_contains?: Maybe<Scalars['String']>
  content_starts_with?: Maybe<Scalars['String']>
  content_not_starts_with?: Maybe<Scalars['String']>
  content_ends_with?: Maybe<Scalars['String']>
  content_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  releaseDate_not?: Maybe<Scalars['DateTime']>
  releaseDate_in?: Maybe<Array<Scalars['DateTime']>>
  releaseDate_not_in?: Maybe<Array<Scalars['DateTime']>>
  releaseDate_lt?: Maybe<Scalars['DateTime']>
  releaseDate_lte?: Maybe<Scalars['DateTime']>
  releaseDate_gt?: Maybe<Scalars['DateTime']>
  releaseDate_gte?: Maybe<Scalars['DateTime']>
  image?: Maybe<GQLAssetWhereInput>
  page?: Maybe<GQLPageWhereInput>
}

export type GQLSingularPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLStartProjectForm = GQLNode & {
  __typename?: 'StartProjectForm'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  currentUrl: Scalars['String']
  currentSoftware: Scalars['String']
  monthlyVisitors: Scalars['String']
  monthlyOrderCount: Scalars['String']
  averageOrderValue?: Maybe<Scalars['String']>
  targetAudienceType: Scalars['String']
  projectInvolvedPeople: Scalars['Json']
  company: Scalars['String']
  companyContactName: Scalars['String']
  companyContactEmail: Scalars['String']
  companyStoresCount?: Maybe<Scalars['String']>
  phoneNumber: Scalars['String']
  message?: Maybe<Scalars['String']>
  services?: Maybe<Scalars['Json']>
  challenges?: Maybe<Scalars['Json']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormConnection = {
  __typename?: 'StartProjectFormConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLStartProjectFormEdge>>
  aggregate: GQLAggregateStartProjectForm
}

export type GQLStartProjectFormCreateInput = {
  status?: Maybe<GQLStatus>
  currentUrl: Scalars['String']
  currentSoftware: Scalars['String']
  monthlyVisitors: Scalars['String']
  monthlyOrderCount: Scalars['String']
  averageOrderValue?: Maybe<Scalars['String']>
  targetAudienceType: Scalars['String']
  projectInvolvedPeople: Scalars['Json']
  company: Scalars['String']
  companyContactName: Scalars['String']
  companyContactEmail: Scalars['String']
  companyStoresCount?: Maybe<Scalars['String']>
  phoneNumber: Scalars['String']
  message?: Maybe<Scalars['String']>
  services?: Maybe<Scalars['Json']>
  challenges?: Maybe<Scalars['Json']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormEdge = {
  __typename?: 'StartProjectFormEdge'
  node: GQLStartProjectForm
  cursor: Scalars['String']
}

export enum GQLStartProjectFormOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  CurrentUrlAsc = 'currentUrl_ASC',
  CurrentUrlDesc = 'currentUrl_DESC',
  CurrentSoftwareAsc = 'currentSoftware_ASC',
  CurrentSoftwareDesc = 'currentSoftware_DESC',
  MonthlyVisitorsAsc = 'monthlyVisitors_ASC',
  MonthlyVisitorsDesc = 'monthlyVisitors_DESC',
  MonthlyOrderCountAsc = 'monthlyOrderCount_ASC',
  MonthlyOrderCountDesc = 'monthlyOrderCount_DESC',
  AverageOrderValueAsc = 'averageOrderValue_ASC',
  AverageOrderValueDesc = 'averageOrderValue_DESC',
  TargetAudienceTypeAsc = 'targetAudienceType_ASC',
  TargetAudienceTypeDesc = 'targetAudienceType_DESC',
  ProjectInvolvedPeopleAsc = 'projectInvolvedPeople_ASC',
  ProjectInvolvedPeopleDesc = 'projectInvolvedPeople_DESC',
  CompanyAsc = 'company_ASC',
  CompanyDesc = 'company_DESC',
  CompanyContactNameAsc = 'companyContactName_ASC',
  CompanyContactNameDesc = 'companyContactName_DESC',
  CompanyContactEmailAsc = 'companyContactEmail_ASC',
  CompanyContactEmailDesc = 'companyContactEmail_DESC',
  CompanyStoresCountAsc = 'companyStoresCount_ASC',
  CompanyStoresCountDesc = 'companyStoresCount_DESC',
  PhoneNumberAsc = 'phoneNumber_ASC',
  PhoneNumberDesc = 'phoneNumber_DESC',
  MessageAsc = 'message_ASC',
  MessageDesc = 'message_DESC',
  ServicesAsc = 'services_ASC',
  ServicesDesc = 'services_DESC',
  ChallengesAsc = 'challenges_ASC',
  ChallengesDesc = 'challenges_DESC',
  MarketingStrategyAsc = 'marketingStrategy_ASC',
  MarketingStrategyDesc = 'marketingStrategy_DESC',
  MarketingBudgetAsc = 'marketingBudget_ASC',
  MarketingBudgetDesc = 'marketingBudget_DESC',
}

export type GQLStartProjectFormPreviousValues = {
  __typename?: 'StartProjectFormPreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  currentUrl: Scalars['String']
  currentSoftware: Scalars['String']
  monthlyVisitors: Scalars['String']
  monthlyOrderCount: Scalars['String']
  averageOrderValue?: Maybe<Scalars['String']>
  targetAudienceType: Scalars['String']
  projectInvolvedPeople: Scalars['Json']
  company: Scalars['String']
  companyContactName: Scalars['String']
  companyContactEmail: Scalars['String']
  companyStoresCount?: Maybe<Scalars['String']>
  phoneNumber: Scalars['String']
  message?: Maybe<Scalars['String']>
  services?: Maybe<Scalars['Json']>
  challenges?: Maybe<Scalars['Json']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormSubscriptionPayload = {
  __typename?: 'StartProjectFormSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLStartProjectForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLStartProjectFormPreviousValues>
}

export type GQLStartProjectFormSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLStartProjectFormSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLStartProjectFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLStartProjectFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLStartProjectFormWhereInput>
}

export type GQLStartProjectFormUpdateInput = {
  status?: Maybe<GQLStatus>
  currentUrl?: Maybe<Scalars['String']>
  currentSoftware?: Maybe<Scalars['String']>
  monthlyVisitors?: Maybe<Scalars['String']>
  monthlyOrderCount?: Maybe<Scalars['String']>
  averageOrderValue?: Maybe<Scalars['String']>
  targetAudienceType?: Maybe<Scalars['String']>
  projectInvolvedPeople?: Maybe<Scalars['Json']>
  company?: Maybe<Scalars['String']>
  companyContactName?: Maybe<Scalars['String']>
  companyContactEmail?: Maybe<Scalars['String']>
  companyStoresCount?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  services?: Maybe<Scalars['Json']>
  challenges?: Maybe<Scalars['Json']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  currentUrl?: Maybe<Scalars['String']>
  currentSoftware?: Maybe<Scalars['String']>
  monthlyVisitors?: Maybe<Scalars['String']>
  monthlyOrderCount?: Maybe<Scalars['String']>
  averageOrderValue?: Maybe<Scalars['String']>
  targetAudienceType?: Maybe<Scalars['String']>
  projectInvolvedPeople?: Maybe<Scalars['Json']>
  company?: Maybe<Scalars['String']>
  companyContactName?: Maybe<Scalars['String']>
  companyContactEmail?: Maybe<Scalars['String']>
  companyStoresCount?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  services?: Maybe<Scalars['Json']>
  challenges?: Maybe<Scalars['Json']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLStartProjectFormWhereInput>>
  OR?: Maybe<Array<GQLStartProjectFormWhereInput>>
  NOT?: Maybe<Array<GQLStartProjectFormWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  currentUrl?: Maybe<Scalars['String']>
  currentUrl_not?: Maybe<Scalars['String']>
  currentUrl_in?: Maybe<Array<Scalars['String']>>
  currentUrl_not_in?: Maybe<Array<Scalars['String']>>
  currentUrl_lt?: Maybe<Scalars['String']>
  currentUrl_lte?: Maybe<Scalars['String']>
  currentUrl_gt?: Maybe<Scalars['String']>
  currentUrl_gte?: Maybe<Scalars['String']>
  currentUrl_contains?: Maybe<Scalars['String']>
  currentUrl_not_contains?: Maybe<Scalars['String']>
  currentUrl_starts_with?: Maybe<Scalars['String']>
  currentUrl_not_starts_with?: Maybe<Scalars['String']>
  currentUrl_ends_with?: Maybe<Scalars['String']>
  currentUrl_not_ends_with?: Maybe<Scalars['String']>
  currentSoftware?: Maybe<Scalars['String']>
  currentSoftware_not?: Maybe<Scalars['String']>
  currentSoftware_in?: Maybe<Array<Scalars['String']>>
  currentSoftware_not_in?: Maybe<Array<Scalars['String']>>
  currentSoftware_lt?: Maybe<Scalars['String']>
  currentSoftware_lte?: Maybe<Scalars['String']>
  currentSoftware_gt?: Maybe<Scalars['String']>
  currentSoftware_gte?: Maybe<Scalars['String']>
  currentSoftware_contains?: Maybe<Scalars['String']>
  currentSoftware_not_contains?: Maybe<Scalars['String']>
  currentSoftware_starts_with?: Maybe<Scalars['String']>
  currentSoftware_not_starts_with?: Maybe<Scalars['String']>
  currentSoftware_ends_with?: Maybe<Scalars['String']>
  currentSoftware_not_ends_with?: Maybe<Scalars['String']>
  monthlyVisitors?: Maybe<Scalars['String']>
  monthlyVisitors_not?: Maybe<Scalars['String']>
  monthlyVisitors_in?: Maybe<Array<Scalars['String']>>
  monthlyVisitors_not_in?: Maybe<Array<Scalars['String']>>
  monthlyVisitors_lt?: Maybe<Scalars['String']>
  monthlyVisitors_lte?: Maybe<Scalars['String']>
  monthlyVisitors_gt?: Maybe<Scalars['String']>
  monthlyVisitors_gte?: Maybe<Scalars['String']>
  monthlyVisitors_contains?: Maybe<Scalars['String']>
  monthlyVisitors_not_contains?: Maybe<Scalars['String']>
  monthlyVisitors_starts_with?: Maybe<Scalars['String']>
  monthlyVisitors_not_starts_with?: Maybe<Scalars['String']>
  monthlyVisitors_ends_with?: Maybe<Scalars['String']>
  monthlyVisitors_not_ends_with?: Maybe<Scalars['String']>
  monthlyOrderCount?: Maybe<Scalars['String']>
  monthlyOrderCount_not?: Maybe<Scalars['String']>
  monthlyOrderCount_in?: Maybe<Array<Scalars['String']>>
  monthlyOrderCount_not_in?: Maybe<Array<Scalars['String']>>
  monthlyOrderCount_lt?: Maybe<Scalars['String']>
  monthlyOrderCount_lte?: Maybe<Scalars['String']>
  monthlyOrderCount_gt?: Maybe<Scalars['String']>
  monthlyOrderCount_gte?: Maybe<Scalars['String']>
  monthlyOrderCount_contains?: Maybe<Scalars['String']>
  monthlyOrderCount_not_contains?: Maybe<Scalars['String']>
  monthlyOrderCount_starts_with?: Maybe<Scalars['String']>
  monthlyOrderCount_not_starts_with?: Maybe<Scalars['String']>
  monthlyOrderCount_ends_with?: Maybe<Scalars['String']>
  monthlyOrderCount_not_ends_with?: Maybe<Scalars['String']>
  averageOrderValue?: Maybe<Scalars['String']>
  averageOrderValue_not?: Maybe<Scalars['String']>
  averageOrderValue_in?: Maybe<Array<Scalars['String']>>
  averageOrderValue_not_in?: Maybe<Array<Scalars['String']>>
  averageOrderValue_lt?: Maybe<Scalars['String']>
  averageOrderValue_lte?: Maybe<Scalars['String']>
  averageOrderValue_gt?: Maybe<Scalars['String']>
  averageOrderValue_gte?: Maybe<Scalars['String']>
  averageOrderValue_contains?: Maybe<Scalars['String']>
  averageOrderValue_not_contains?: Maybe<Scalars['String']>
  averageOrderValue_starts_with?: Maybe<Scalars['String']>
  averageOrderValue_not_starts_with?: Maybe<Scalars['String']>
  averageOrderValue_ends_with?: Maybe<Scalars['String']>
  averageOrderValue_not_ends_with?: Maybe<Scalars['String']>
  targetAudienceType?: Maybe<Scalars['String']>
  targetAudienceType_not?: Maybe<Scalars['String']>
  targetAudienceType_in?: Maybe<Array<Scalars['String']>>
  targetAudienceType_not_in?: Maybe<Array<Scalars['String']>>
  targetAudienceType_lt?: Maybe<Scalars['String']>
  targetAudienceType_lte?: Maybe<Scalars['String']>
  targetAudienceType_gt?: Maybe<Scalars['String']>
  targetAudienceType_gte?: Maybe<Scalars['String']>
  targetAudienceType_contains?: Maybe<Scalars['String']>
  targetAudienceType_not_contains?: Maybe<Scalars['String']>
  targetAudienceType_starts_with?: Maybe<Scalars['String']>
  targetAudienceType_not_starts_with?: Maybe<Scalars['String']>
  targetAudienceType_ends_with?: Maybe<Scalars['String']>
  targetAudienceType_not_ends_with?: Maybe<Scalars['String']>
  company?: Maybe<Scalars['String']>
  company_not?: Maybe<Scalars['String']>
  company_in?: Maybe<Array<Scalars['String']>>
  company_not_in?: Maybe<Array<Scalars['String']>>
  company_lt?: Maybe<Scalars['String']>
  company_lte?: Maybe<Scalars['String']>
  company_gt?: Maybe<Scalars['String']>
  company_gte?: Maybe<Scalars['String']>
  company_contains?: Maybe<Scalars['String']>
  company_not_contains?: Maybe<Scalars['String']>
  company_starts_with?: Maybe<Scalars['String']>
  company_not_starts_with?: Maybe<Scalars['String']>
  company_ends_with?: Maybe<Scalars['String']>
  company_not_ends_with?: Maybe<Scalars['String']>
  companyContactName?: Maybe<Scalars['String']>
  companyContactName_not?: Maybe<Scalars['String']>
  companyContactName_in?: Maybe<Array<Scalars['String']>>
  companyContactName_not_in?: Maybe<Array<Scalars['String']>>
  companyContactName_lt?: Maybe<Scalars['String']>
  companyContactName_lte?: Maybe<Scalars['String']>
  companyContactName_gt?: Maybe<Scalars['String']>
  companyContactName_gte?: Maybe<Scalars['String']>
  companyContactName_contains?: Maybe<Scalars['String']>
  companyContactName_not_contains?: Maybe<Scalars['String']>
  companyContactName_starts_with?: Maybe<Scalars['String']>
  companyContactName_not_starts_with?: Maybe<Scalars['String']>
  companyContactName_ends_with?: Maybe<Scalars['String']>
  companyContactName_not_ends_with?: Maybe<Scalars['String']>
  companyContactEmail?: Maybe<Scalars['String']>
  companyContactEmail_not?: Maybe<Scalars['String']>
  companyContactEmail_in?: Maybe<Array<Scalars['String']>>
  companyContactEmail_not_in?: Maybe<Array<Scalars['String']>>
  companyContactEmail_lt?: Maybe<Scalars['String']>
  companyContactEmail_lte?: Maybe<Scalars['String']>
  companyContactEmail_gt?: Maybe<Scalars['String']>
  companyContactEmail_gte?: Maybe<Scalars['String']>
  companyContactEmail_contains?: Maybe<Scalars['String']>
  companyContactEmail_not_contains?: Maybe<Scalars['String']>
  companyContactEmail_starts_with?: Maybe<Scalars['String']>
  companyContactEmail_not_starts_with?: Maybe<Scalars['String']>
  companyContactEmail_ends_with?: Maybe<Scalars['String']>
  companyContactEmail_not_ends_with?: Maybe<Scalars['String']>
  companyStoresCount?: Maybe<Scalars['String']>
  companyStoresCount_not?: Maybe<Scalars['String']>
  companyStoresCount_in?: Maybe<Array<Scalars['String']>>
  companyStoresCount_not_in?: Maybe<Array<Scalars['String']>>
  companyStoresCount_lt?: Maybe<Scalars['String']>
  companyStoresCount_lte?: Maybe<Scalars['String']>
  companyStoresCount_gt?: Maybe<Scalars['String']>
  companyStoresCount_gte?: Maybe<Scalars['String']>
  companyStoresCount_contains?: Maybe<Scalars['String']>
  companyStoresCount_not_contains?: Maybe<Scalars['String']>
  companyStoresCount_starts_with?: Maybe<Scalars['String']>
  companyStoresCount_not_starts_with?: Maybe<Scalars['String']>
  companyStoresCount_ends_with?: Maybe<Scalars['String']>
  companyStoresCount_not_ends_with?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['String']>
  phoneNumber_not?: Maybe<Scalars['String']>
  phoneNumber_in?: Maybe<Array<Scalars['String']>>
  phoneNumber_not_in?: Maybe<Array<Scalars['String']>>
  phoneNumber_lt?: Maybe<Scalars['String']>
  phoneNumber_lte?: Maybe<Scalars['String']>
  phoneNumber_gt?: Maybe<Scalars['String']>
  phoneNumber_gte?: Maybe<Scalars['String']>
  phoneNumber_contains?: Maybe<Scalars['String']>
  phoneNumber_not_contains?: Maybe<Scalars['String']>
  phoneNumber_starts_with?: Maybe<Scalars['String']>
  phoneNumber_not_starts_with?: Maybe<Scalars['String']>
  phoneNumber_ends_with?: Maybe<Scalars['String']>
  phoneNumber_not_ends_with?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  message_not?: Maybe<Scalars['String']>
  message_in?: Maybe<Array<Scalars['String']>>
  message_not_in?: Maybe<Array<Scalars['String']>>
  message_lt?: Maybe<Scalars['String']>
  message_lte?: Maybe<Scalars['String']>
  message_gt?: Maybe<Scalars['String']>
  message_gte?: Maybe<Scalars['String']>
  message_contains?: Maybe<Scalars['String']>
  message_not_contains?: Maybe<Scalars['String']>
  message_starts_with?: Maybe<Scalars['String']>
  message_not_starts_with?: Maybe<Scalars['String']>
  message_ends_with?: Maybe<Scalars['String']>
  message_not_ends_with?: Maybe<Scalars['String']>
  marketingStrategy?: Maybe<Scalars['String']>
  marketingStrategy_not?: Maybe<Scalars['String']>
  marketingStrategy_in?: Maybe<Array<Scalars['String']>>
  marketingStrategy_not_in?: Maybe<Array<Scalars['String']>>
  marketingStrategy_lt?: Maybe<Scalars['String']>
  marketingStrategy_lte?: Maybe<Scalars['String']>
  marketingStrategy_gt?: Maybe<Scalars['String']>
  marketingStrategy_gte?: Maybe<Scalars['String']>
  marketingStrategy_contains?: Maybe<Scalars['String']>
  marketingStrategy_not_contains?: Maybe<Scalars['String']>
  marketingStrategy_starts_with?: Maybe<Scalars['String']>
  marketingStrategy_not_starts_with?: Maybe<Scalars['String']>
  marketingStrategy_ends_with?: Maybe<Scalars['String']>
  marketingStrategy_not_ends_with?: Maybe<Scalars['String']>
  marketingBudget?: Maybe<Scalars['String']>
  marketingBudget_not?: Maybe<Scalars['String']>
  marketingBudget_in?: Maybe<Array<Scalars['String']>>
  marketingBudget_not_in?: Maybe<Array<Scalars['String']>>
  marketingBudget_lt?: Maybe<Scalars['String']>
  marketingBudget_lte?: Maybe<Scalars['String']>
  marketingBudget_gt?: Maybe<Scalars['String']>
  marketingBudget_gte?: Maybe<Scalars['String']>
  marketingBudget_contains?: Maybe<Scalars['String']>
  marketingBudget_not_contains?: Maybe<Scalars['String']>
  marketingBudget_starts_with?: Maybe<Scalars['String']>
  marketingBudget_not_starts_with?: Maybe<Scalars['String']>
  marketingBudget_ends_with?: Maybe<Scalars['String']>
  marketingBudget_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLStartProjectFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum GQLStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Archived = 'ARCHIVED',
}

export type GQLStructuredPage = GQLNode & {
  __typename?: 'StructuredPage'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAsset>
  blocks?: Maybe<Array<GQLBlock>>
  page?: Maybe<GQLPage>
}

export type GQLStructuredPageBlocksArgs = {
  where?: Maybe<GQLBlockWhereInput>
  orderBy?: Maybe<GQLBlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type GQLStructuredPageConnection = {
  __typename?: 'StructuredPageConnection'
  pageInfo: GQLPageInfo
  edges: Array<Maybe<GQLStructuredPageEdge>>
  aggregate: GQLAggregateStructuredPage
}

export type GQLStructuredPageCreateInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<GQLBlockCreateManyWithoutPageInput>
  page?: Maybe<GQLPageCreateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageCreateManyWithoutImageInput = {
  create?: Maybe<Array<GQLStructuredPageCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLStructuredPageWhereUniqueInput>>
}

export type GQLStructuredPageCreateOneWithoutBlocksInput = {
  create?: Maybe<GQLStructuredPageCreateWithoutBlocksInput>
  connect?: Maybe<GQLStructuredPageWhereUniqueInput>
}

export type GQLStructuredPageCreateOneWithoutPageInput = {
  create?: Maybe<GQLStructuredPageCreateWithoutPageInput>
  connect?: Maybe<GQLStructuredPageWhereUniqueInput>
}

export type GQLStructuredPageCreateWithoutBlocksInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageStructuredPageInput>
  page?: Maybe<GQLPageCreateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageCreateWithoutImageInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  blocks?: Maybe<GQLBlockCreateManyWithoutPageInput>
  page?: Maybe<GQLPageCreateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageCreateWithoutPageInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetCreateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<GQLBlockCreateManyWithoutPageInput>
}

export type GQLStructuredPageEdge = {
  __typename?: 'StructuredPageEdge'
  node: GQLStructuredPage
  cursor: Scalars['String']
}

export enum GQLStructuredPageOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
}

export type GQLStructuredPagePreviousValues = {
  __typename?: 'StructuredPagePreviousValues'
  status: GQLStatus
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
}

export type GQLStructuredPageScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLStructuredPageScalarWhereInput>>
  OR?: Maybe<Array<GQLStructuredPageScalarWhereInput>>
  NOT?: Maybe<Array<GQLStructuredPageScalarWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  order?: Maybe<Scalars['Int']>
  order_not?: Maybe<Scalars['Int']>
  order_in?: Maybe<Array<Scalars['Int']>>
  order_not_in?: Maybe<Array<Scalars['Int']>>
  order_lt?: Maybe<Scalars['Int']>
  order_lte?: Maybe<Scalars['Int']>
  order_gt?: Maybe<Scalars['Int']>
  order_gte?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_not_in?: Maybe<Array<Scalars['String']>>
  description_lt?: Maybe<Scalars['String']>
  description_lte?: Maybe<Scalars['String']>
  description_gt?: Maybe<Scalars['String']>
  description_gte?: Maybe<Scalars['String']>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  description_starts_with?: Maybe<Scalars['String']>
  description_not_starts_with?: Maybe<Scalars['String']>
  description_ends_with?: Maybe<Scalars['String']>
  description_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
}

export type GQLStructuredPageSubscriptionPayload = {
  __typename?: 'StructuredPageSubscriptionPayload'
  mutation: GQLMutationType
  node?: Maybe<GQLStructuredPage>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<GQLStructuredPagePreviousValues>
}

export type GQLStructuredPageSubscriptionWhereInput = {
  AND?: Maybe<Array<GQLStructuredPageSubscriptionWhereInput>>
  OR?: Maybe<Array<GQLStructuredPageSubscriptionWhereInput>>
  NOT?: Maybe<Array<GQLStructuredPageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<GQLMutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<GQLStructuredPageWhereInput>
}

export type GQLStructuredPageUpdateInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<GQLBlockUpdateManyWithoutPageInput>
  page?: Maybe<GQLPageUpdateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageUpdateManyDataInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type GQLStructuredPageUpdateManyMutationInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type GQLStructuredPageUpdateManyWithoutImageInput = {
  create?: Maybe<Array<GQLStructuredPageCreateWithoutImageInput>>
  connect?: Maybe<Array<GQLStructuredPageWhereUniqueInput>>
  set?: Maybe<Array<GQLStructuredPageWhereUniqueInput>>
  disconnect?: Maybe<Array<GQLStructuredPageWhereUniqueInput>>
  delete?: Maybe<Array<GQLStructuredPageWhereUniqueInput>>
  update?: Maybe<Array<GQLStructuredPageUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<GQLStructuredPageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<GQLStructuredPageScalarWhereInput>>
  upsert?: Maybe<Array<GQLStructuredPageUpsertWithWhereUniqueWithoutImageInput>>
}

export type GQLStructuredPageUpdateManyWithWhereNestedInput = {
  where: GQLStructuredPageScalarWhereInput
  data: GQLStructuredPageUpdateManyDataInput
}

export type GQLStructuredPageUpdateOneWithoutBlocksInput = {
  create?: Maybe<GQLStructuredPageCreateWithoutBlocksInput>
  connect?: Maybe<GQLStructuredPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLStructuredPageUpdateWithoutBlocksDataInput>
  upsert?: Maybe<GQLStructuredPageUpsertWithoutBlocksInput>
}

export type GQLStructuredPageUpdateOneWithoutPageInput = {
  create?: Maybe<GQLStructuredPageCreateWithoutPageInput>
  connect?: Maybe<GQLStructuredPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<GQLStructuredPageUpdateWithoutPageDataInput>
  upsert?: Maybe<GQLStructuredPageUpsertWithoutPageInput>
}

export type GQLStructuredPageUpdateWithoutBlocksDataInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageStructuredPageInput>
  page?: Maybe<GQLPageUpdateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageUpdateWithoutImageDataInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  blocks?: Maybe<GQLBlockUpdateManyWithoutPageInput>
  page?: Maybe<GQLPageUpdateOneWithoutStructuredPageInput>
}

export type GQLStructuredPageUpdateWithoutPageDataInput = {
  status?: Maybe<GQLStatus>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetUpdateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<GQLBlockUpdateManyWithoutPageInput>
}

export type GQLStructuredPageUpdateWithWhereUniqueWithoutImageInput = {
  where: GQLStructuredPageWhereUniqueInput
  data: GQLStructuredPageUpdateWithoutImageDataInput
}

export type GQLStructuredPageUpsertWithoutBlocksInput = {
  update: GQLStructuredPageUpdateWithoutBlocksDataInput
  create: GQLStructuredPageCreateWithoutBlocksInput
}

export type GQLStructuredPageUpsertWithoutPageInput = {
  update: GQLStructuredPageUpdateWithoutPageDataInput
  create: GQLStructuredPageCreateWithoutPageInput
}

export type GQLStructuredPageUpsertWithWhereUniqueWithoutImageInput = {
  where: GQLStructuredPageWhereUniqueInput
  update: GQLStructuredPageUpdateWithoutImageDataInput
  create: GQLStructuredPageCreateWithoutImageInput
}

export type GQLStructuredPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<GQLStructuredPageWhereInput>>
  OR?: Maybe<Array<GQLStructuredPageWhereInput>>
  NOT?: Maybe<Array<GQLStructuredPageWhereInput>>
  status?: Maybe<GQLStatus>
  status_not?: Maybe<GQLStatus>
  status_in?: Maybe<Array<GQLStatus>>
  status_not_in?: Maybe<Array<GQLStatus>>
  updatedAt?: Maybe<Scalars['DateTime']>
  updatedAt_not?: Maybe<Scalars['DateTime']>
  updatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  updatedAt_lt?: Maybe<Scalars['DateTime']>
  updatedAt_lte?: Maybe<Scalars['DateTime']>
  updatedAt_gt?: Maybe<Scalars['DateTime']>
  updatedAt_gte?: Maybe<Scalars['DateTime']>
  createdAt?: Maybe<Scalars['DateTime']>
  createdAt_not?: Maybe<Scalars['DateTime']>
  createdAt_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  createdAt_lt?: Maybe<Scalars['DateTime']>
  createdAt_lte?: Maybe<Scalars['DateTime']>
  createdAt_gt?: Maybe<Scalars['DateTime']>
  createdAt_gte?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['ID']>
  id_not?: Maybe<Scalars['ID']>
  id_in?: Maybe<Array<Scalars['ID']>>
  id_not_in?: Maybe<Array<Scalars['ID']>>
  id_lt?: Maybe<Scalars['ID']>
  id_lte?: Maybe<Scalars['ID']>
  id_gt?: Maybe<Scalars['ID']>
  id_gte?: Maybe<Scalars['ID']>
  id_contains?: Maybe<Scalars['ID']>
  id_not_contains?: Maybe<Scalars['ID']>
  id_starts_with?: Maybe<Scalars['ID']>
  id_not_starts_with?: Maybe<Scalars['ID']>
  id_ends_with?: Maybe<Scalars['ID']>
  id_not_ends_with?: Maybe<Scalars['ID']>
  order?: Maybe<Scalars['Int']>
  order_not?: Maybe<Scalars['Int']>
  order_in?: Maybe<Array<Scalars['Int']>>
  order_not_in?: Maybe<Array<Scalars['Int']>>
  order_lt?: Maybe<Scalars['Int']>
  order_lte?: Maybe<Scalars['Int']>
  order_gt?: Maybe<Scalars['Int']>
  order_gte?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_not_in?: Maybe<Array<Scalars['String']>>
  description_lt?: Maybe<Scalars['String']>
  description_lte?: Maybe<Scalars['String']>
  description_gt?: Maybe<Scalars['String']>
  description_gte?: Maybe<Scalars['String']>
  description_contains?: Maybe<Scalars['String']>
  description_not_contains?: Maybe<Scalars['String']>
  description_starts_with?: Maybe<Scalars['String']>
  description_not_starts_with?: Maybe<Scalars['String']>
  description_ends_with?: Maybe<Scalars['String']>
  description_not_ends_with?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  title_lt?: Maybe<Scalars['String']>
  title_lte?: Maybe<Scalars['String']>
  title_gt?: Maybe<Scalars['String']>
  title_gte?: Maybe<Scalars['String']>
  title_contains?: Maybe<Scalars['String']>
  title_not_contains?: Maybe<Scalars['String']>
  title_starts_with?: Maybe<Scalars['String']>
  title_not_starts_with?: Maybe<Scalars['String']>
  title_ends_with?: Maybe<Scalars['String']>
  title_not_ends_with?: Maybe<Scalars['String']>
  image?: Maybe<GQLAssetWhereInput>
  blocks_every?: Maybe<GQLBlockWhereInput>
  blocks_some?: Maybe<GQLBlockWhereInput>
  blocks_none?: Maybe<GQLBlockWhereInput>
  page?: Maybe<GQLPageWhereInput>
}

export type GQLStructuredPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type GQLGetPageNlQueryVariables = {
  url: Scalars['String']
}

export type GQLGetPageNlQuery = { __typename?: 'Query' } & {
  page: Maybe<
    { __typename?: 'Page' } & Pick<
      GQLPage,
      'metaTitle' | 'metaDescription' | 'metaRobots' | 'url'
    > & { urlEN: GQLPage['url'] } & {
        blogPost: Maybe<
          { __typename?: 'BlogPost' } & Pick<
            GQLBlogPost,
            'publicPublishedAt' | 'title' | 'content'
          > & {
              image: Maybe<
                { __typename?: 'Asset' } & Pick<GQLAsset, 'height' | 'width' | 'url' | 'handle'>
              >
              author: Maybe<
                { __typename?: 'Employee' } & Pick<GQLEmployee, 'firstName' | 'lastName' | 'email'>
              >
            }
        >
      }
  >
}

export type GQLGetPageEnQueryVariables = {
  url: Scalars['String']
}

export type GQLGetPageEnQuery = { __typename?: 'Query' } & {
  page: Maybe<
    { __typename?: 'Page' } & Pick<
      GQLPage,
      'metaTitle' | 'metaDescription' | 'metaRobots' | 'url'
    > & { urlNL: GQLPage['url'] } & {
        blogPost: Maybe<
          { __typename?: 'BlogPost' } & Pick<
            GQLBlogPost,
            'publicPublishedAt' | 'title' | 'content'
          > & {
              image: Maybe<
                { __typename?: 'Asset' } & Pick<GQLAsset, 'height' | 'width' | 'url' | 'handle'>
              >
              author: Maybe<
                { __typename?: 'Employee' } & Pick<GQLEmployee, 'firstName' | 'lastName' | 'email'>
              >
            }
        >
      }
  >
}

export type GQLGetStaticPathsNlQueryVariables = {
  startsWith: Scalars['String']
}

export type GQLGetStaticPathsNlQuery = { __typename?: 'Query' } & {
  pages: Array<Maybe<{ __typename?: 'Page' } & Pick<GQLPage, 'url'>>>
}

export type GQLGetStaticPathsEnQueryVariables = {
  startsWith: Scalars['String']
}

export type GQLGetStaticPathsEnQuery = { __typename?: 'Query' } & {
  pages: Array<Maybe<{ __typename?: 'Page' } & Pick<GQLPage, 'url'>>>
}

export const GetPageNlDocument = gql`
  query GetPageNL($url: String!) {
    page(where: { urlNL: $url }) {
      metaTitle(locale: NL)
      metaDescription(locale: NL)
      metaRobots
      url(locale: NL)
      urlEN: url(locale: EN)
      blogPost {
        publicPublishedAt
        image {
          height
          width
          url
          handle
        }
        title(locale: NL)
        content(locale: NL)
        author {
          firstName
          lastName
          email
        }
      }
    }
  }
`

/**
 * __useGetPageNlQuery__
 *
 * To run a query within a React component, call `useGetPageNlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageNlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageNlQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetPageNlQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>(
    GetPageNlDocument,
    baseOptions,
  )
}
export function useGetPageNlLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetPageNlQuery,
    GQLGetPageNlQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetPageNlQuery, GQLGetPageNlQueryVariables>(
    GetPageNlDocument,
    baseOptions,
  )
}
export type GetPageNlQueryHookResult = ReturnType<typeof useGetPageNlQuery>
export type GetPageNlLazyQueryHookResult = ReturnType<typeof useGetPageNlLazyQuery>
export type GetPageNlQueryResult = ApolloReactCommon.QueryResult<
  GQLGetPageNlQuery,
  GQLGetPageNlQueryVariables
>
export const GetPageEnDocument = gql`
  query GetPageEN($url: String!) {
    page(where: { urlEN: $url }) {
      metaTitle(locale: EN)
      metaDescription(locale: EN)
      metaRobots
      url(locale: EN)
      urlNL: url(locale: NL)
      blogPost {
        publicPublishedAt
        image {
          height
          width
          url
          handle
        }
        title(locale: EN)
        content(locale: EN)
        author {
          firstName
          lastName
          email
        }
      }
    }
  }
`

/**
 * __useGetPageEnQuery__
 *
 * To run a query within a React component, call `useGetPageEnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageEnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageEnQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useGetPageEnQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>(
    GetPageEnDocument,
    baseOptions,
  )
}
export function useGetPageEnLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetPageEnQuery,
    GQLGetPageEnQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetPageEnQuery, GQLGetPageEnQueryVariables>(
    GetPageEnDocument,
    baseOptions,
  )
}
export type GetPageEnQueryHookResult = ReturnType<typeof useGetPageEnQuery>
export type GetPageEnLazyQueryHookResult = ReturnType<typeof useGetPageEnLazyQuery>
export type GetPageEnQueryResult = ApolloReactCommon.QueryResult<
  GQLGetPageEnQuery,
  GQLGetPageEnQueryVariables
>
export const GetStaticPathsNlDocument = gql`
  query GetStaticPathsNL($startsWith: String!) {
    pages(where: { urlNL_starts_with: $startsWith }) {
      url(locale: NL)
    }
  }
`

/**
 * __useGetStaticPathsNlQuery__
 *
 * To run a query within a React component, call `useGetStaticPathsNlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaticPathsNlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaticPathsNlQuery({
 *   variables: {
 *      startsWith: // value for 'startsWith'
 *   },
 * });
 */
export function useGetStaticPathsNlQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetStaticPathsNlQuery,
    GQLGetStaticPathsNlQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetStaticPathsNlQuery, GQLGetStaticPathsNlQueryVariables>(
    GetStaticPathsNlDocument,
    baseOptions,
  )
}
export function useGetStaticPathsNlLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetStaticPathsNlQuery,
    GQLGetStaticPathsNlQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetStaticPathsNlQuery, GQLGetStaticPathsNlQueryVariables>(
    GetStaticPathsNlDocument,
    baseOptions,
  )
}
export type GetStaticPathsNlQueryHookResult = ReturnType<typeof useGetStaticPathsNlQuery>
export type GetStaticPathsNlLazyQueryHookResult = ReturnType<typeof useGetStaticPathsNlLazyQuery>
export type GetStaticPathsNlQueryResult = ApolloReactCommon.QueryResult<
  GQLGetStaticPathsNlQuery,
  GQLGetStaticPathsNlQueryVariables
>
export const GetStaticPathsEnDocument = gql`
  query GetStaticPathsEN($startsWith: String!) {
    pages(where: { urlEN_starts_with: $startsWith }) {
      url(locale: EN)
    }
  }
`

/**
 * __useGetStaticPathsEnQuery__
 *
 * To run a query within a React component, call `useGetStaticPathsEnQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStaticPathsEnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStaticPathsEnQuery({
 *   variables: {
 *      startsWith: // value for 'startsWith'
 *   },
 * });
 */
export function useGetStaticPathsEnQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetStaticPathsEnQuery,
    GQLGetStaticPathsEnQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetStaticPathsEnQuery, GQLGetStaticPathsEnQueryVariables>(
    GetStaticPathsEnDocument,
    baseOptions,
  )
}
export function useGetStaticPathsEnLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetStaticPathsEnQuery,
    GQLGetStaticPathsEnQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetStaticPathsEnQuery, GQLGetStaticPathsEnQueryVariables>(
    GetStaticPathsEnDocument,
    baseOptions,
  )
}
export type GetStaticPathsEnQueryHookResult = ReturnType<typeof useGetStaticPathsEnQuery>
export type GetStaticPathsEnLazyQueryHookResult = ReturnType<typeof useGetStaticPathsEnLazyQuery>
export type GetStaticPathsEnQueryResult = ApolloReactCommon.QueryResult<
  GQLGetStaticPathsEnQuery,
  GQLGetStaticPathsEnQueryVariables
>
