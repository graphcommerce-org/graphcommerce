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

export type AggregateAsset = {
  __typename?: 'AggregateAsset'
  count: Scalars['Int']
}

export type AggregateBlock = {
  __typename?: 'AggregateBlock'
  count: Scalars['Int']
}

export type AggregateBlogPost = {
  __typename?: 'AggregateBlogPost'
  count: Scalars['Int']
}

export type AggregateComment = {
  __typename?: 'AggregateComment'
  count: Scalars['Int']
}

export type AggregateContactForm = {
  __typename?: 'AggregateContactForm'
  count: Scalars['Int']
}

export type AggregateDocument = {
  __typename?: 'AggregateDocument'
  count: Scalars['Int']
}

export type AggregateEcosystem = {
  __typename?: 'AggregateEcosystem'
  count: Scalars['Int']
}

export type AggregateEmployee = {
  __typename?: 'AggregateEmployee'
  count: Scalars['Int']
}

export type AggregateJobListing = {
  __typename?: 'AggregateJobListing'
  count: Scalars['Int']
}

export type AggregateMailchimpForm = {
  __typename?: 'AggregateMailchimpForm'
  count: Scalars['Int']
}

export type AggregateModule = {
  __typename?: 'AggregateModule'
  count: Scalars['Int']
}

export type AggregatePage = {
  __typename?: 'AggregatePage'
  count: Scalars['Int']
}

export type AggregatePdpPagina = {
  __typename?: 'AggregatePdpPagina'
  count: Scalars['Int']
}

export type AggregateQuote = {
  __typename?: 'AggregateQuote'
  count: Scalars['Int']
}

export type AggregateSingularPage = {
  __typename?: 'AggregateSingularPage'
  count: Scalars['Int']
}

export type AggregateStartProjectForm = {
  __typename?: 'AggregateStartProjectForm'
  count: Scalars['Int']
}

export type AggregateStructuredPage = {
  __typename?: 'AggregateStructuredPage'
  count: Scalars['Int']
}

export type AggregateTag = {
  __typename?: 'AggregateTag'
  count: Scalars['Int']
}

export type Asset = Node & {
  __typename?: 'Asset'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<Array<ContactForm>>
  imageEcosystem?: Maybe<Array<Ecosystem>>
  imageStructuredPage?: Maybe<Array<StructuredPage>>
  imageEmployee?: Maybe<Array<Employee>>
  fileDocument?: Maybe<Array<Document>>
  downloadJobListing?: Maybe<Array<JobListing>>
  imageSingularPage?: Maybe<Array<SingularPage>>
  imageBlogPost?: Maybe<Array<BlogPost>>
  downloadBlogPost?: Maybe<Array<BlogPost>>
  url: Scalars['String']
}

export type AssetAttachmentContactFormArgs = {
  where?: Maybe<ContactFormWhereInput>
  orderBy?: Maybe<ContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetImageEcosystemArgs = {
  where?: Maybe<EcosystemWhereInput>
  orderBy?: Maybe<EcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetImageStructuredPageArgs = {
  where?: Maybe<StructuredPageWhereInput>
  orderBy?: Maybe<StructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetImageEmployeeArgs = {
  where?: Maybe<EmployeeWhereInput>
  orderBy?: Maybe<EmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetFileDocumentArgs = {
  where?: Maybe<DocumentWhereInput>
  orderBy?: Maybe<DocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetDownloadJobListingArgs = {
  where?: Maybe<JobListingWhereInput>
  orderBy?: Maybe<JobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetImageSingularPageArgs = {
  where?: Maybe<SingularPageWhereInput>
  orderBy?: Maybe<SingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetImageBlogPostArgs = {
  where?: Maybe<BlogPostWhereInput>
  orderBy?: Maybe<BlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetDownloadBlogPostArgs = {
  where?: Maybe<BlogPostWhereInput>
  orderBy?: Maybe<BlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type AssetUrlArgs = {
  transformation?: Maybe<AssetTransformationInput>
}

export type AssetConnection = {
  __typename?: 'AssetConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<AssetEdge>>
  aggregate: AggregateAsset
}

export type AssetCreateInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateOneWithoutAttachmentContactFormInput = {
  upload?: Maybe<AssetUploadWithoutAttachmentContactFormInput>
  create?: Maybe<AssetCreateWithoutAttachmentContactFormInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutDownloadBlogPostInput = {
  upload?: Maybe<AssetUploadWithoutDownloadBlogPostInput>
  create?: Maybe<AssetCreateWithoutDownloadBlogPostInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutDownloadJobListingInput = {
  upload?: Maybe<AssetUploadWithoutDownloadJobListingInput>
  create?: Maybe<AssetCreateWithoutDownloadJobListingInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutFileDocumentInput = {
  upload?: Maybe<AssetUploadWithoutFileDocumentInput>
  create?: Maybe<AssetCreateWithoutFileDocumentInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutImageBlogPostInput = {
  upload?: Maybe<AssetUploadWithoutImageBlogPostInput>
  create?: Maybe<AssetCreateWithoutImageBlogPostInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutImageEcosystemInput = {
  upload?: Maybe<AssetUploadWithoutImageEcosystemInput>
  create?: Maybe<AssetCreateWithoutImageEcosystemInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutImageEmployeeInput = {
  upload?: Maybe<AssetUploadWithoutImageEmployeeInput>
  create?: Maybe<AssetCreateWithoutImageEmployeeInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutImageSingularPageInput = {
  upload?: Maybe<AssetUploadWithoutImageSingularPageInput>
  create?: Maybe<AssetCreateWithoutImageSingularPageInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateOneWithoutImageStructuredPageInput = {
  upload?: Maybe<AssetUploadWithoutImageStructuredPageInput>
  create?: Maybe<AssetCreateWithoutImageStructuredPageInput>
  connect?: Maybe<AssetWhereUniqueInput>
}

export type AssetCreateWithoutAttachmentContactFormInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutDownloadBlogPostInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
}

export type AssetCreateWithoutDownloadJobListingInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutFileDocumentInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutImageBlogPostInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutImageEcosystemInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutImageEmployeeInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutImageSingularPageInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetCreateWithoutImageStructuredPageInput = {
  status?: Maybe<Status>
  handle: Scalars['String']
  fileName: Scalars['String']
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetEdge = {
  __typename?: 'AssetEdge'
  node: Asset
  cursor: Scalars['String']
}

export enum AssetOrderByInput {
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

export type AssetPreviousValues = {
  __typename?: 'AssetPreviousValues'
  status: Status
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

export type AssetSubscriptionPayload = {
  __typename?: 'AssetSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Asset>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<AssetPreviousValues>
}

export type AssetSubscriptionWhereInput = {
  AND?: Maybe<Array<AssetSubscriptionWhereInput>>
  OR?: Maybe<Array<AssetSubscriptionWhereInput>>
  NOT?: Maybe<Array<AssetSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<AssetWhereInput>
}

export type AssetTransformationInput = {
  image?: Maybe<ImageTransformationInput>
  document?: Maybe<DocumentTransformationInput>
  validateOptions?: Maybe<Scalars['Boolean']>
}

export type AssetUpdateInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateManyMutationInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
}

export type AssetUpdateOneWithoutAttachmentContactFormInput = {
  create?: Maybe<AssetCreateWithoutAttachmentContactFormInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutAttachmentContactFormDataInput>
  upsert?: Maybe<AssetUpsertWithoutAttachmentContactFormInput>
}

export type AssetUpdateOneWithoutDownloadBlogPostInput = {
  create?: Maybe<AssetCreateWithoutDownloadBlogPostInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutDownloadBlogPostDataInput>
  upsert?: Maybe<AssetUpsertWithoutDownloadBlogPostInput>
}

export type AssetUpdateOneWithoutDownloadJobListingInput = {
  create?: Maybe<AssetCreateWithoutDownloadJobListingInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutDownloadJobListingDataInput>
  upsert?: Maybe<AssetUpsertWithoutDownloadJobListingInput>
}

export type AssetUpdateOneWithoutFileDocumentInput = {
  create?: Maybe<AssetCreateWithoutFileDocumentInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutFileDocumentDataInput>
  upsert?: Maybe<AssetUpsertWithoutFileDocumentInput>
}

export type AssetUpdateOneWithoutImageBlogPostInput = {
  create?: Maybe<AssetCreateWithoutImageBlogPostInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutImageBlogPostDataInput>
  upsert?: Maybe<AssetUpsertWithoutImageBlogPostInput>
}

export type AssetUpdateOneWithoutImageEcosystemInput = {
  create?: Maybe<AssetCreateWithoutImageEcosystemInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutImageEcosystemDataInput>
  upsert?: Maybe<AssetUpsertWithoutImageEcosystemInput>
}

export type AssetUpdateOneWithoutImageEmployeeInput = {
  create?: Maybe<AssetCreateWithoutImageEmployeeInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutImageEmployeeDataInput>
  upsert?: Maybe<AssetUpsertWithoutImageEmployeeInput>
}

export type AssetUpdateOneWithoutImageSingularPageInput = {
  create?: Maybe<AssetCreateWithoutImageSingularPageInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutImageSingularPageDataInput>
  upsert?: Maybe<AssetUpsertWithoutImageSingularPageInput>
}

export type AssetUpdateOneWithoutImageStructuredPageInput = {
  create?: Maybe<AssetCreateWithoutImageStructuredPageInput>
  connect?: Maybe<AssetWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<AssetUpdateWithoutImageStructuredPageDataInput>
  upsert?: Maybe<AssetUpsertWithoutImageStructuredPageInput>
}

export type AssetUpdateWithoutAttachmentContactFormDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutDownloadBlogPostDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
}

export type AssetUpdateWithoutDownloadJobListingDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutFileDocumentDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutImageBlogPostDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutImageEcosystemDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutImageEmployeeDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutImageSingularPageDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUpdateWithoutImageStructuredPageDataInput = {
  status?: Maybe<Status>
  handle?: Maybe<Scalars['String']>
  fileName?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  size?: Maybe<Scalars['Float']>
  mimeType?: Maybe<Scalars['String']>
  attachmentContactForm?: Maybe<ContactFormUpdateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemUpdateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeUpdateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentUpdateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingUpdateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageUpdateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostUpdateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostUpdateManyWithoutDownloadInput>
}

export type AssetUploadInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutAttachmentContactFormInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutDownloadBlogPostInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
}

export type AssetUploadWithoutDownloadJobListingInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutFileDocumentInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutImageBlogPostInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutImageEcosystemInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutImageEmployeeInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutImageSingularPageInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageStructuredPage?: Maybe<StructuredPageCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUploadWithoutImageStructuredPageInput = {
  url: Scalars['String']
  status?: Maybe<Status>
  attachmentContactForm?: Maybe<ContactFormCreateManyWithoutAttachmentInput>
  imageEcosystem?: Maybe<EcosystemCreateManyWithoutImageInput>
  imageEmployee?: Maybe<EmployeeCreateManyWithoutImageInput>
  fileDocument?: Maybe<DocumentCreateManyWithoutFileInput>
  downloadJobListing?: Maybe<JobListingCreateManyWithoutDownloadInput>
  imageSingularPage?: Maybe<SingularPageCreateManyWithoutImageInput>
  imageBlogPost?: Maybe<BlogPostCreateManyWithoutImageInput>
  downloadBlogPost?: Maybe<BlogPostCreateManyWithoutDownloadInput>
}

export type AssetUpsertWithoutAttachmentContactFormInput = {
  update: AssetUpdateWithoutAttachmentContactFormDataInput
  create: AssetCreateWithoutAttachmentContactFormInput
}

export type AssetUpsertWithoutDownloadBlogPostInput = {
  update: AssetUpdateWithoutDownloadBlogPostDataInput
  create: AssetCreateWithoutDownloadBlogPostInput
}

export type AssetUpsertWithoutDownloadJobListingInput = {
  update: AssetUpdateWithoutDownloadJobListingDataInput
  create: AssetCreateWithoutDownloadJobListingInput
}

export type AssetUpsertWithoutFileDocumentInput = {
  update: AssetUpdateWithoutFileDocumentDataInput
  create: AssetCreateWithoutFileDocumentInput
}

export type AssetUpsertWithoutImageBlogPostInput = {
  update: AssetUpdateWithoutImageBlogPostDataInput
  create: AssetCreateWithoutImageBlogPostInput
}

export type AssetUpsertWithoutImageEcosystemInput = {
  update: AssetUpdateWithoutImageEcosystemDataInput
  create: AssetCreateWithoutImageEcosystemInput
}

export type AssetUpsertWithoutImageEmployeeInput = {
  update: AssetUpdateWithoutImageEmployeeDataInput
  create: AssetCreateWithoutImageEmployeeInput
}

export type AssetUpsertWithoutImageSingularPageInput = {
  update: AssetUpdateWithoutImageSingularPageDataInput
  create: AssetCreateWithoutImageSingularPageInput
}

export type AssetUpsertWithoutImageStructuredPageInput = {
  update: AssetUpdateWithoutImageStructuredPageDataInput
  create: AssetCreateWithoutImageStructuredPageInput
}

export type AssetWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<AssetWhereInput>>
  OR?: Maybe<Array<AssetWhereInput>>
  NOT?: Maybe<Array<AssetWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  attachmentContactForm_every?: Maybe<ContactFormWhereInput>
  attachmentContactForm_some?: Maybe<ContactFormWhereInput>
  attachmentContactForm_none?: Maybe<ContactFormWhereInput>
  imageEcosystem_every?: Maybe<EcosystemWhereInput>
  imageEcosystem_some?: Maybe<EcosystemWhereInput>
  imageEcosystem_none?: Maybe<EcosystemWhereInput>
  imageStructuredPage_every?: Maybe<StructuredPageWhereInput>
  imageStructuredPage_some?: Maybe<StructuredPageWhereInput>
  imageStructuredPage_none?: Maybe<StructuredPageWhereInput>
  imageEmployee_every?: Maybe<EmployeeWhereInput>
  imageEmployee_some?: Maybe<EmployeeWhereInput>
  imageEmployee_none?: Maybe<EmployeeWhereInput>
  fileDocument_every?: Maybe<DocumentWhereInput>
  fileDocument_some?: Maybe<DocumentWhereInput>
  fileDocument_none?: Maybe<DocumentWhereInput>
  downloadJobListing_every?: Maybe<JobListingWhereInput>
  downloadJobListing_some?: Maybe<JobListingWhereInput>
  downloadJobListing_none?: Maybe<JobListingWhereInput>
  imageSingularPage_every?: Maybe<SingularPageWhereInput>
  imageSingularPage_some?: Maybe<SingularPageWhereInput>
  imageSingularPage_none?: Maybe<SingularPageWhereInput>
  imageBlogPost_every?: Maybe<BlogPostWhereInput>
  imageBlogPost_some?: Maybe<BlogPostWhereInput>
  imageBlogPost_none?: Maybe<BlogPostWhereInput>
  downloadBlogPost_every?: Maybe<BlogPostWhereInput>
  downloadBlogPost_some?: Maybe<BlogPostWhereInput>
  downloadBlogPost_none?: Maybe<BlogPostWhereInput>
}

export type AssetWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

export type BatchPayload = {
  __typename?: 'BatchPayload'
  count: Scalars['Long']
}

export type Block = Node & {
  __typename?: 'Block'
  status: Status
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
  brandLogo: Array<BrandLogoProperties>
  childBlocks?: Maybe<Array<Block>>
  parentBlock?: Maybe<Block>
  page?: Maybe<StructuredPage>
}

export type BlockChildBlocksArgs = {
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type BlockConnection = {
  __typename?: 'BlockConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<BlockEdge>>
  aggregate: AggregateBlock
}

export type BlockCreatebrandLogoInput = {
  set?: Maybe<Array<BrandLogoProperties>>
}

export type BlockCreateInput = {
  status?: Maybe<Status>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockCreatebrandLogoInput>
  childBlocks?: Maybe<BlockCreateManyWithoutParentBlockInput>
  parentBlock?: Maybe<BlockCreateOneWithoutChildBlocksInput>
  page?: Maybe<StructuredPageCreateOneWithoutBlocksInput>
}

export type BlockCreateManyWithoutPageInput = {
  create?: Maybe<Array<BlockCreateWithoutPageInput>>
  connect?: Maybe<Array<BlockWhereUniqueInput>>
}

export type BlockCreateManyWithoutParentBlockInput = {
  create?: Maybe<Array<BlockCreateWithoutParentBlockInput>>
  connect?: Maybe<Array<BlockWhereUniqueInput>>
}

export type BlockCreateOneWithoutChildBlocksInput = {
  create?: Maybe<BlockCreateWithoutChildBlocksInput>
  connect?: Maybe<BlockWhereUniqueInput>
}

export type BlockCreateWithoutChildBlocksInput = {
  status?: Maybe<Status>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockCreatebrandLogoInput>
  parentBlock?: Maybe<BlockCreateOneWithoutChildBlocksInput>
  page?: Maybe<StructuredPageCreateOneWithoutBlocksInput>
}

export type BlockCreateWithoutPageInput = {
  status?: Maybe<Status>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockCreatebrandLogoInput>
  childBlocks?: Maybe<BlockCreateManyWithoutParentBlockInput>
  parentBlock?: Maybe<BlockCreateOneWithoutChildBlocksInput>
}

export type BlockCreateWithoutParentBlockInput = {
  status?: Maybe<Status>
  title: Scalars['String']
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content: Scalars['String']
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockCreatebrandLogoInput>
  childBlocks?: Maybe<BlockCreateManyWithoutParentBlockInput>
  page?: Maybe<StructuredPageCreateOneWithoutBlocksInput>
}

export type BlockEdge = {
  __typename?: 'BlockEdge'
  node: Block
  cursor: Scalars['String']
}

export enum BlockOrderByInput {
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

export type BlockPreviousValues = {
  __typename?: 'BlockPreviousValues'
  status: Status
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
  brandLogo: Array<BrandLogoProperties>
}

export type BlockScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<BlockScalarWhereInput>>
  OR?: Maybe<Array<BlockScalarWhereInput>>
  NOT?: Maybe<Array<BlockScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type BlockSubscriptionPayload = {
  __typename?: 'BlockSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Block>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<BlockPreviousValues>
}

export type BlockSubscriptionWhereInput = {
  AND?: Maybe<Array<BlockSubscriptionWhereInput>>
  OR?: Maybe<Array<BlockSubscriptionWhereInput>>
  NOT?: Maybe<Array<BlockSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<BlockWhereInput>
}

export type BlockUpdatebrandLogoInput = {
  set?: Maybe<Array<BrandLogoProperties>>
}

export type BlockUpdateInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
  childBlocks?: Maybe<BlockUpdateManyWithoutParentBlockInput>
  parentBlock?: Maybe<BlockUpdateOneWithoutChildBlocksInput>
  page?: Maybe<StructuredPageUpdateOneWithoutBlocksInput>
}

export type BlockUpdateManyDataInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
}

export type BlockUpdateManyMutationInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
}

export type BlockUpdateManyWithoutPageInput = {
  create?: Maybe<Array<BlockCreateWithoutPageInput>>
  connect?: Maybe<Array<BlockWhereUniqueInput>>
  set?: Maybe<Array<BlockWhereUniqueInput>>
  disconnect?: Maybe<Array<BlockWhereUniqueInput>>
  delete?: Maybe<Array<BlockWhereUniqueInput>>
  update?: Maybe<Array<BlockUpdateWithWhereUniqueWithoutPageInput>>
  updateMany?: Maybe<Array<BlockUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<BlockScalarWhereInput>>
  upsert?: Maybe<Array<BlockUpsertWithWhereUniqueWithoutPageInput>>
}

export type BlockUpdateManyWithoutParentBlockInput = {
  create?: Maybe<Array<BlockCreateWithoutParentBlockInput>>
  connect?: Maybe<Array<BlockWhereUniqueInput>>
  set?: Maybe<Array<BlockWhereUniqueInput>>
  disconnect?: Maybe<Array<BlockWhereUniqueInput>>
  delete?: Maybe<Array<BlockWhereUniqueInput>>
  update?: Maybe<Array<BlockUpdateWithWhereUniqueWithoutParentBlockInput>>
  updateMany?: Maybe<Array<BlockUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<BlockScalarWhereInput>>
  upsert?: Maybe<Array<BlockUpsertWithWhereUniqueWithoutParentBlockInput>>
}

export type BlockUpdateManyWithWhereNestedInput = {
  where: BlockScalarWhereInput
  data: BlockUpdateManyDataInput
}

export type BlockUpdateOneWithoutChildBlocksInput = {
  create?: Maybe<BlockCreateWithoutChildBlocksInput>
  connect?: Maybe<BlockWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<BlockUpdateWithoutChildBlocksDataInput>
  upsert?: Maybe<BlockUpsertWithoutChildBlocksInput>
}

export type BlockUpdateWithoutChildBlocksDataInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
  parentBlock?: Maybe<BlockUpdateOneWithoutChildBlocksInput>
  page?: Maybe<StructuredPageUpdateOneWithoutBlocksInput>
}

export type BlockUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
  childBlocks?: Maybe<BlockUpdateManyWithoutParentBlockInput>
  parentBlock?: Maybe<BlockUpdateOneWithoutChildBlocksInput>
}

export type BlockUpdateWithoutParentBlockDataInput = {
  status?: Maybe<Status>
  title?: Maybe<Scalars['String']>
  extended?: Maybe<Scalars['Boolean']>
  order?: Maybe<Scalars['Int']>
  showTitle?: Maybe<Scalars['Boolean']>
  extendedFull?: Maybe<Scalars['Boolean']>
  extendedContinuation?: Maybe<Scalars['Boolean']>
  content?: Maybe<Scalars['String']>
  featured?: Maybe<Scalars['Boolean']>
  raised?: Maybe<Scalars['Boolean']>
  brandLogo?: Maybe<BlockUpdatebrandLogoInput>
  childBlocks?: Maybe<BlockUpdateManyWithoutParentBlockInput>
  page?: Maybe<StructuredPageUpdateOneWithoutBlocksInput>
}

export type BlockUpdateWithWhereUniqueWithoutPageInput = {
  where: BlockWhereUniqueInput
  data: BlockUpdateWithoutPageDataInput
}

export type BlockUpdateWithWhereUniqueWithoutParentBlockInput = {
  where: BlockWhereUniqueInput
  data: BlockUpdateWithoutParentBlockDataInput
}

export type BlockUpsertWithoutChildBlocksInput = {
  update: BlockUpdateWithoutChildBlocksDataInput
  create: BlockCreateWithoutChildBlocksInput
}

export type BlockUpsertWithWhereUniqueWithoutPageInput = {
  where: BlockWhereUniqueInput
  update: BlockUpdateWithoutPageDataInput
  create: BlockCreateWithoutPageInput
}

export type BlockUpsertWithWhereUniqueWithoutParentBlockInput = {
  where: BlockWhereUniqueInput
  update: BlockUpdateWithoutParentBlockDataInput
  create: BlockCreateWithoutParentBlockInput
}

export type BlockWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<BlockWhereInput>>
  OR?: Maybe<Array<BlockWhereInput>>
  NOT?: Maybe<Array<BlockWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  childBlocks_every?: Maybe<BlockWhereInput>
  childBlocks_some?: Maybe<BlockWhereInput>
  childBlocks_none?: Maybe<BlockWhereInput>
  parentBlock?: Maybe<BlockWhereInput>
  page?: Maybe<StructuredPageWhereInput>
}

export type BlockWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type BlogPost = Node & {
  __typename?: 'BlogPost'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<Asset>
  download?: Maybe<Asset>
  employee?: Maybe<Employee>
  page?: Maybe<Page>
}

export type BlogPostConnection = {
  __typename?: 'BlogPostConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<BlogPostEdge>>
  aggregate: AggregateBlogPost
}

export type BlogPostCreateInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetCreateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<PageCreateOneWithoutBlogPostInput>
}

export type BlogPostCreateManyWithoutDownloadInput = {
  create?: Maybe<Array<BlogPostCreateWithoutDownloadInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
}

export type BlogPostCreateManyWithoutEmployeeInput = {
  create?: Maybe<Array<BlogPostCreateWithoutEmployeeInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
}

export type BlogPostCreateManyWithoutImageInput = {
  create?: Maybe<Array<BlogPostCreateWithoutImageInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
}

export type BlogPostCreateOneWithoutPageInput = {
  create?: Maybe<BlogPostCreateWithoutPageInput>
  connect?: Maybe<BlogPostWhereUniqueInput>
}

export type BlogPostCreateWithoutDownloadInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageBlogPostInput>
  employee?: Maybe<EmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<PageCreateOneWithoutBlogPostInput>
}

export type BlogPostCreateWithoutEmployeeInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetCreateOneWithoutDownloadBlogPostInput>
  page?: Maybe<PageCreateOneWithoutBlogPostInput>
}

export type BlogPostCreateWithoutImageInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  download?: Maybe<AssetCreateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeCreateOneWithoutBlogPostsInput>
  page?: Maybe<PageCreateOneWithoutBlogPostInput>
}

export type BlogPostCreateWithoutPageInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetCreateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeCreateOneWithoutBlogPostsInput>
}

export type BlogPostEdge = {
  __typename?: 'BlogPostEdge'
  node: BlogPost
  cursor: Scalars['String']
}

export enum BlogPostOrderByInput {
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
  PublicCreatedAtAsc = 'publicCreatedAt_ASC',
  PublicCreatedAtDesc = 'publicCreatedAt_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  ExcerptAsc = 'excerpt_ASC',
  ExcerptDesc = 'excerpt_DESC',
}

export type BlogPostPreviousValues = {
  __typename?: 'BlogPostPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content: Scalars['String']
  title: Scalars['String']
  excerpt?: Maybe<Scalars['String']>
}

export type BlogPostScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<BlogPostScalarWhereInput>>
  OR?: Maybe<Array<BlogPostScalarWhereInput>>
  NOT?: Maybe<Array<BlogPostScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_not?: Maybe<Scalars['DateTime']>
  publicCreatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publicCreatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publicCreatedAt_lt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_lte?: Maybe<Scalars['DateTime']>
  publicCreatedAt_gt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_gte?: Maybe<Scalars['DateTime']>
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
  excerpt?: Maybe<Scalars['String']>
  excerpt_not?: Maybe<Scalars['String']>
  excerpt_in?: Maybe<Array<Scalars['String']>>
  excerpt_not_in?: Maybe<Array<Scalars['String']>>
  excerpt_lt?: Maybe<Scalars['String']>
  excerpt_lte?: Maybe<Scalars['String']>
  excerpt_gt?: Maybe<Scalars['String']>
  excerpt_gte?: Maybe<Scalars['String']>
  excerpt_contains?: Maybe<Scalars['String']>
  excerpt_not_contains?: Maybe<Scalars['String']>
  excerpt_starts_with?: Maybe<Scalars['String']>
  excerpt_not_starts_with?: Maybe<Scalars['String']>
  excerpt_ends_with?: Maybe<Scalars['String']>
  excerpt_not_ends_with?: Maybe<Scalars['String']>
}

export type BlogPostSubscriptionPayload = {
  __typename?: 'BlogPostSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<BlogPost>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<BlogPostPreviousValues>
}

export type BlogPostSubscriptionWhereInput = {
  AND?: Maybe<Array<BlogPostSubscriptionWhereInput>>
  OR?: Maybe<Array<BlogPostSubscriptionWhereInput>>
  NOT?: Maybe<Array<BlogPostSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<BlogPostWhereInput>
}

export type BlogPostUpdateInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetUpdateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<PageUpdateOneWithoutBlogPostInput>
}

export type BlogPostUpdateManyDataInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
}

export type BlogPostUpdateManyMutationInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
}

export type BlogPostUpdateManyWithoutDownloadInput = {
  create?: Maybe<Array<BlogPostCreateWithoutDownloadInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
  set?: Maybe<Array<BlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<BlogPostWhereUniqueInput>>
  delete?: Maybe<Array<BlogPostWhereUniqueInput>>
  update?: Maybe<Array<BlogPostUpdateWithWhereUniqueWithoutDownloadInput>>
  updateMany?: Maybe<Array<BlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<BlogPostScalarWhereInput>>
  upsert?: Maybe<Array<BlogPostUpsertWithWhereUniqueWithoutDownloadInput>>
}

export type BlogPostUpdateManyWithoutEmployeeInput = {
  create?: Maybe<Array<BlogPostCreateWithoutEmployeeInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
  set?: Maybe<Array<BlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<BlogPostWhereUniqueInput>>
  delete?: Maybe<Array<BlogPostWhereUniqueInput>>
  update?: Maybe<Array<BlogPostUpdateWithWhereUniqueWithoutEmployeeInput>>
  updateMany?: Maybe<Array<BlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<BlogPostScalarWhereInput>>
  upsert?: Maybe<Array<BlogPostUpsertWithWhereUniqueWithoutEmployeeInput>>
}

export type BlogPostUpdateManyWithoutImageInput = {
  create?: Maybe<Array<BlogPostCreateWithoutImageInput>>
  connect?: Maybe<Array<BlogPostWhereUniqueInput>>
  set?: Maybe<Array<BlogPostWhereUniqueInput>>
  disconnect?: Maybe<Array<BlogPostWhereUniqueInput>>
  delete?: Maybe<Array<BlogPostWhereUniqueInput>>
  update?: Maybe<Array<BlogPostUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<BlogPostUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<BlogPostScalarWhereInput>>
  upsert?: Maybe<Array<BlogPostUpsertWithWhereUniqueWithoutImageInput>>
}

export type BlogPostUpdateManyWithWhereNestedInput = {
  where: BlogPostScalarWhereInput
  data: BlogPostUpdateManyDataInput
}

export type BlogPostUpdateOneWithoutPageInput = {
  create?: Maybe<BlogPostCreateWithoutPageInput>
  connect?: Maybe<BlogPostWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<BlogPostUpdateWithoutPageDataInput>
  upsert?: Maybe<BlogPostUpsertWithoutPageInput>
}

export type BlogPostUpdateWithoutDownloadDataInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageBlogPostInput>
  employee?: Maybe<EmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<PageUpdateOneWithoutBlogPostInput>
}

export type BlogPostUpdateWithoutEmployeeDataInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetUpdateOneWithoutDownloadBlogPostInput>
  page?: Maybe<PageUpdateOneWithoutBlogPostInput>
}

export type BlogPostUpdateWithoutImageDataInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  download?: Maybe<AssetUpdateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeUpdateOneWithoutBlogPostsInput>
  page?: Maybe<PageUpdateOneWithoutBlogPostInput>
}

export type BlogPostUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  publicPublishedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  excerpt?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageBlogPostInput>
  download?: Maybe<AssetUpdateOneWithoutDownloadBlogPostInput>
  employee?: Maybe<EmployeeUpdateOneWithoutBlogPostsInput>
}

export type BlogPostUpdateWithWhereUniqueWithoutDownloadInput = {
  where: BlogPostWhereUniqueInput
  data: BlogPostUpdateWithoutDownloadDataInput
}

export type BlogPostUpdateWithWhereUniqueWithoutEmployeeInput = {
  where: BlogPostWhereUniqueInput
  data: BlogPostUpdateWithoutEmployeeDataInput
}

export type BlogPostUpdateWithWhereUniqueWithoutImageInput = {
  where: BlogPostWhereUniqueInput
  data: BlogPostUpdateWithoutImageDataInput
}

export type BlogPostUpsertWithoutPageInput = {
  update: BlogPostUpdateWithoutPageDataInput
  create: BlogPostCreateWithoutPageInput
}

export type BlogPostUpsertWithWhereUniqueWithoutDownloadInput = {
  where: BlogPostWhereUniqueInput
  update: BlogPostUpdateWithoutDownloadDataInput
  create: BlogPostCreateWithoutDownloadInput
}

export type BlogPostUpsertWithWhereUniqueWithoutEmployeeInput = {
  where: BlogPostWhereUniqueInput
  update: BlogPostUpdateWithoutEmployeeDataInput
  create: BlogPostCreateWithoutEmployeeInput
}

export type BlogPostUpsertWithWhereUniqueWithoutImageInput = {
  where: BlogPostWhereUniqueInput
  update: BlogPostUpdateWithoutImageDataInput
  create: BlogPostCreateWithoutImageInput
}

export type BlogPostWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<BlogPostWhereInput>>
  OR?: Maybe<Array<BlogPostWhereInput>>
  NOT?: Maybe<Array<BlogPostWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  publicCreatedAt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_not?: Maybe<Scalars['DateTime']>
  publicCreatedAt_in?: Maybe<Array<Scalars['DateTime']>>
  publicCreatedAt_not_in?: Maybe<Array<Scalars['DateTime']>>
  publicCreatedAt_lt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_lte?: Maybe<Scalars['DateTime']>
  publicCreatedAt_gt?: Maybe<Scalars['DateTime']>
  publicCreatedAt_gte?: Maybe<Scalars['DateTime']>
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
  excerpt?: Maybe<Scalars['String']>
  excerpt_not?: Maybe<Scalars['String']>
  excerpt_in?: Maybe<Array<Scalars['String']>>
  excerpt_not_in?: Maybe<Array<Scalars['String']>>
  excerpt_lt?: Maybe<Scalars['String']>
  excerpt_lte?: Maybe<Scalars['String']>
  excerpt_gt?: Maybe<Scalars['String']>
  excerpt_gte?: Maybe<Scalars['String']>
  excerpt_contains?: Maybe<Scalars['String']>
  excerpt_not_contains?: Maybe<Scalars['String']>
  excerpt_starts_with?: Maybe<Scalars['String']>
  excerpt_not_starts_with?: Maybe<Scalars['String']>
  excerpt_ends_with?: Maybe<Scalars['String']>
  excerpt_not_ends_with?: Maybe<Scalars['String']>
  image?: Maybe<AssetWhereInput>
  download?: Maybe<AssetWhereInput>
  employee?: Maybe<EmployeeWhereInput>
  page?: Maybe<PageWhereInput>
}

export type BlogPostWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  title?: Maybe<Scalars['String']>
}

export enum BrandLogoProperties {
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
  Solid = 'SOLID',
}

export type Comment = Node & {
  __typename?: 'Comment'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<Page>
  parentComment?: Maybe<Comment>
  childComments?: Maybe<Array<Comment>>
}

export type CommentChildCommentsArgs = {
  where?: Maybe<CommentWhereInput>
  orderBy?: Maybe<CommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type CommentConnection = {
  __typename?: 'CommentConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<CommentEdge>>
  aggregate: AggregateComment
}

export type CommentCreateInput = {
  status?: Maybe<Status>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<PageCreateOneWithoutCommentInput>
  parentComment?: Maybe<CommentCreateOneWithoutChildCommentsInput>
  childComments?: Maybe<CommentCreateManyWithoutParentCommentInput>
}

export type CommentCreateManyWithoutParentCommentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentCommentInput>>
  connect?: Maybe<Array<CommentWhereUniqueInput>>
}

export type CommentCreateOneWithoutChildCommentsInput = {
  create?: Maybe<CommentCreateWithoutChildCommentsInput>
  connect?: Maybe<CommentWhereUniqueInput>
}

export type CommentCreateOneWithoutPageInput = {
  create?: Maybe<CommentCreateWithoutPageInput>
  connect?: Maybe<CommentWhereUniqueInput>
}

export type CommentCreateWithoutChildCommentsInput = {
  status?: Maybe<Status>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<PageCreateOneWithoutCommentInput>
  parentComment?: Maybe<CommentCreateOneWithoutChildCommentsInput>
}

export type CommentCreateWithoutPageInput = {
  status?: Maybe<Status>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  parentComment?: Maybe<CommentCreateOneWithoutChildCommentsInput>
  childComments?: Maybe<CommentCreateManyWithoutParentCommentInput>
}

export type CommentCreateWithoutParentCommentInput = {
  status?: Maybe<Status>
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
  page?: Maybe<PageCreateOneWithoutCommentInput>
  childComments?: Maybe<CommentCreateManyWithoutParentCommentInput>
}

export type CommentEdge = {
  __typename?: 'CommentEdge'
  node: Comment
  cursor: Scalars['String']
}

export enum CommentOrderByInput {
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

export type CommentPreviousValues = {
  __typename?: 'CommentPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  displayName: Scalars['String']
  email: Scalars['String']
  upvotes: Scalars['Int']
  content: Scalars['String']
}

export type CommentScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<CommentScalarWhereInput>>
  OR?: Maybe<Array<CommentScalarWhereInput>>
  NOT?: Maybe<Array<CommentScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type CommentSubscriptionPayload = {
  __typename?: 'CommentSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Comment>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<CommentPreviousValues>
}

export type CommentSubscriptionWhereInput = {
  AND?: Maybe<Array<CommentSubscriptionWhereInput>>
  OR?: Maybe<Array<CommentSubscriptionWhereInput>>
  NOT?: Maybe<Array<CommentSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<CommentWhereInput>
}

export type CommentUpdateInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<PageUpdateOneWithoutCommentInput>
  parentComment?: Maybe<CommentUpdateOneWithoutChildCommentsInput>
  childComments?: Maybe<CommentUpdateManyWithoutParentCommentInput>
}

export type CommentUpdateManyDataInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
}

export type CommentUpdateManyMutationInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
}

export type CommentUpdateManyWithoutParentCommentInput = {
  create?: Maybe<Array<CommentCreateWithoutParentCommentInput>>
  connect?: Maybe<Array<CommentWhereUniqueInput>>
  set?: Maybe<Array<CommentWhereUniqueInput>>
  disconnect?: Maybe<Array<CommentWhereUniqueInput>>
  delete?: Maybe<Array<CommentWhereUniqueInput>>
  update?: Maybe<Array<CommentUpdateWithWhereUniqueWithoutParentCommentInput>>
  updateMany?: Maybe<Array<CommentUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<CommentScalarWhereInput>>
  upsert?: Maybe<Array<CommentUpsertWithWhereUniqueWithoutParentCommentInput>>
}

export type CommentUpdateManyWithWhereNestedInput = {
  where: CommentScalarWhereInput
  data: CommentUpdateManyDataInput
}

export type CommentUpdateOneWithoutChildCommentsInput = {
  create?: Maybe<CommentCreateWithoutChildCommentsInput>
  connect?: Maybe<CommentWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<CommentUpdateWithoutChildCommentsDataInput>
  upsert?: Maybe<CommentUpsertWithoutChildCommentsInput>
}

export type CommentUpdateOneWithoutPageInput = {
  create?: Maybe<CommentCreateWithoutPageInput>
  connect?: Maybe<CommentWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<CommentUpdateWithoutPageDataInput>
  upsert?: Maybe<CommentUpsertWithoutPageInput>
}

export type CommentUpdateWithoutChildCommentsDataInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<PageUpdateOneWithoutCommentInput>
  parentComment?: Maybe<CommentUpdateOneWithoutChildCommentsInput>
}

export type CommentUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  parentComment?: Maybe<CommentUpdateOneWithoutChildCommentsInput>
  childComments?: Maybe<CommentUpdateManyWithoutParentCommentInput>
}

export type CommentUpdateWithoutParentCommentDataInput = {
  status?: Maybe<Status>
  displayName?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  upvotes?: Maybe<Scalars['Int']>
  content?: Maybe<Scalars['String']>
  page?: Maybe<PageUpdateOneWithoutCommentInput>
  childComments?: Maybe<CommentUpdateManyWithoutParentCommentInput>
}

export type CommentUpdateWithWhereUniqueWithoutParentCommentInput = {
  where: CommentWhereUniqueInput
  data: CommentUpdateWithoutParentCommentDataInput
}

export type CommentUpsertWithoutChildCommentsInput = {
  update: CommentUpdateWithoutChildCommentsDataInput
  create: CommentCreateWithoutChildCommentsInput
}

export type CommentUpsertWithoutPageInput = {
  update: CommentUpdateWithoutPageDataInput
  create: CommentCreateWithoutPageInput
}

export type CommentUpsertWithWhereUniqueWithoutParentCommentInput = {
  where: CommentWhereUniqueInput
  update: CommentUpdateWithoutParentCommentDataInput
  create: CommentCreateWithoutParentCommentInput
}

export type CommentWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<CommentWhereInput>>
  OR?: Maybe<Array<CommentWhereInput>>
  NOT?: Maybe<Array<CommentWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  page?: Maybe<PageWhereInput>
  parentComment?: Maybe<CommentWhereInput>
  childComments_every?: Maybe<CommentWhereInput>
  childComments_some?: Maybe<CommentWhereInput>
  childComments_none?: Maybe<CommentWhereInput>
}

export type CommentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type ContactForm = Node & {
  __typename?: 'ContactForm'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
  attachment?: Maybe<Asset>
}

export type ContactFormConnection = {
  __typename?: 'ContactFormConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<ContactFormEdge>>
  aggregate: AggregateContactForm
}

export type ContactFormCreateInput = {
  status?: Maybe<Status>
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
  attachment?: Maybe<AssetCreateOneWithoutAttachmentContactFormInput>
}

export type ContactFormCreateManyWithoutAttachmentInput = {
  create?: Maybe<Array<ContactFormCreateWithoutAttachmentInput>>
  connect?: Maybe<Array<ContactFormWhereUniqueInput>>
}

export type ContactFormCreateWithoutAttachmentInput = {
  status?: Maybe<Status>
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type ContactFormEdge = {
  __typename?: 'ContactFormEdge'
  node: ContactForm
  cursor: Scalars['String']
}

export enum ContactFormOrderByInput {
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

export type ContactFormPreviousValues = {
  __typename?: 'ContactFormPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  subject: Scalars['String']
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name: Scalars['String']
}

export type ContactFormScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<ContactFormScalarWhereInput>>
  OR?: Maybe<Array<ContactFormScalarWhereInput>>
  NOT?: Maybe<Array<ContactFormScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type ContactFormSubscriptionPayload = {
  __typename?: 'ContactFormSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<ContactForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<ContactFormPreviousValues>
}

export type ContactFormSubscriptionWhereInput = {
  AND?: Maybe<Array<ContactFormSubscriptionWhereInput>>
  OR?: Maybe<Array<ContactFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<ContactFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<ContactFormWhereInput>
}

export type ContactFormUpdateInput = {
  status?: Maybe<Status>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  attachment?: Maybe<AssetUpdateOneWithoutAttachmentContactFormInput>
}

export type ContactFormUpdateManyDataInput = {
  status?: Maybe<Status>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ContactFormUpdateManyMutationInput = {
  status?: Maybe<Status>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ContactFormUpdateManyWithoutAttachmentInput = {
  create?: Maybe<Array<ContactFormCreateWithoutAttachmentInput>>
  connect?: Maybe<Array<ContactFormWhereUniqueInput>>
  set?: Maybe<Array<ContactFormWhereUniqueInput>>
  disconnect?: Maybe<Array<ContactFormWhereUniqueInput>>
  delete?: Maybe<Array<ContactFormWhereUniqueInput>>
  update?: Maybe<Array<ContactFormUpdateWithWhereUniqueWithoutAttachmentInput>>
  updateMany?: Maybe<Array<ContactFormUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<ContactFormScalarWhereInput>>
  upsert?: Maybe<Array<ContactFormUpsertWithWhereUniqueWithoutAttachmentInput>>
}

export type ContactFormUpdateManyWithWhereNestedInput = {
  where: ContactFormScalarWhereInput
  data: ContactFormUpdateManyDataInput
}

export type ContactFormUpdateWithoutAttachmentDataInput = {
  status?: Maybe<Status>
  subject?: Maybe<Scalars['String']>
  message?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
}

export type ContactFormUpdateWithWhereUniqueWithoutAttachmentInput = {
  where: ContactFormWhereUniqueInput
  data: ContactFormUpdateWithoutAttachmentDataInput
}

export type ContactFormUpsertWithWhereUniqueWithoutAttachmentInput = {
  where: ContactFormWhereUniqueInput
  update: ContactFormUpdateWithoutAttachmentDataInput
  create: ContactFormCreateWithoutAttachmentInput
}

export type ContactFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<ContactFormWhereInput>>
  OR?: Maybe<Array<ContactFormWhereInput>>
  NOT?: Maybe<Array<ContactFormWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  attachment?: Maybe<AssetWhereInput>
}

export type ContactFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Document = Node & {
  __typename?: 'Document'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  file?: Maybe<Asset>
  name?: Maybe<Scalars['String']>
}

export type DocumentConnection = {
  __typename?: 'DocumentConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<DocumentEdge>>
  aggregate: AggregateDocument
}

export type DocumentCreateInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  file?: Maybe<AssetCreateOneWithoutFileDocumentInput>
}

export type DocumentCreateManyWithoutFileInput = {
  create?: Maybe<Array<DocumentCreateWithoutFileInput>>
  connect?: Maybe<Array<DocumentWhereUniqueInput>>
}

export type DocumentCreateWithoutFileInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type DocumentEdge = {
  __typename?: 'DocumentEdge'
  node: Document
  cursor: Scalars['String']
}

export enum DocumentFileTypes {
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

export enum DocumentOrderByInput {
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

export type DocumentOutputInput = {
  format?: Maybe<DocumentFileTypes>
}

export type DocumentPreviousValues = {
  __typename?: 'DocumentPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type DocumentScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<DocumentScalarWhereInput>>
  OR?: Maybe<Array<DocumentScalarWhereInput>>
  NOT?: Maybe<Array<DocumentScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type DocumentSubscriptionPayload = {
  __typename?: 'DocumentSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Document>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<DocumentPreviousValues>
}

export type DocumentSubscriptionWhereInput = {
  AND?: Maybe<Array<DocumentSubscriptionWhereInput>>
  OR?: Maybe<Array<DocumentSubscriptionWhereInput>>
  NOT?: Maybe<Array<DocumentSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<DocumentWhereInput>
}

export type DocumentTransformationInput = {
  output?: Maybe<DocumentOutputInput>
}

export type DocumentUpdateInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  file?: Maybe<AssetUpdateOneWithoutFileDocumentInput>
}

export type DocumentUpdateManyDataInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type DocumentUpdateManyMutationInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type DocumentUpdateManyWithoutFileInput = {
  create?: Maybe<Array<DocumentCreateWithoutFileInput>>
  connect?: Maybe<Array<DocumentWhereUniqueInput>>
  set?: Maybe<Array<DocumentWhereUniqueInput>>
  disconnect?: Maybe<Array<DocumentWhereUniqueInput>>
  delete?: Maybe<Array<DocumentWhereUniqueInput>>
  update?: Maybe<Array<DocumentUpdateWithWhereUniqueWithoutFileInput>>
  updateMany?: Maybe<Array<DocumentUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<DocumentScalarWhereInput>>
  upsert?: Maybe<Array<DocumentUpsertWithWhereUniqueWithoutFileInput>>
}

export type DocumentUpdateManyWithWhereNestedInput = {
  where: DocumentScalarWhereInput
  data: DocumentUpdateManyDataInput
}

export type DocumentUpdateWithoutFileDataInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type DocumentUpdateWithWhereUniqueWithoutFileInput = {
  where: DocumentWhereUniqueInput
  data: DocumentUpdateWithoutFileDataInput
}

export type DocumentUpsertWithWhereUniqueWithoutFileInput = {
  where: DocumentWhereUniqueInput
  update: DocumentUpdateWithoutFileDataInput
  create: DocumentCreateWithoutFileInput
}

export type DocumentWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<DocumentWhereInput>>
  OR?: Maybe<Array<DocumentWhereInput>>
  NOT?: Maybe<Array<DocumentWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  file?: Maybe<AssetWhereInput>
}

export type DocumentWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Ecosystem = Node & {
  __typename?: 'Ecosystem'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  image?: Maybe<Asset>
}

export type EcosystemConnection = {
  __typename?: 'EcosystemConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<EcosystemEdge>>
  aggregate: AggregateEcosystem
}

export type EcosystemCreateInput = {
  status?: Maybe<Status>
  image?: Maybe<AssetCreateOneWithoutImageEcosystemInput>
}

export type EcosystemCreateManyWithoutImageInput = {
  create?: Maybe<Array<EcosystemCreateWithoutImageInput>>
  connect?: Maybe<Array<EcosystemWhereUniqueInput>>
}

export type EcosystemCreateWithoutImageInput = {
  status?: Maybe<Status>
}

export type EcosystemEdge = {
  __typename?: 'EcosystemEdge'
  node: Ecosystem
  cursor: Scalars['String']
}

export enum EcosystemOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
}

export type EcosystemPreviousValues = {
  __typename?: 'EcosystemPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
}

export type EcosystemScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<EcosystemScalarWhereInput>>
  OR?: Maybe<Array<EcosystemScalarWhereInput>>
  NOT?: Maybe<Array<EcosystemScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type EcosystemSubscriptionPayload = {
  __typename?: 'EcosystemSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Ecosystem>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<EcosystemPreviousValues>
}

export type EcosystemSubscriptionWhereInput = {
  AND?: Maybe<Array<EcosystemSubscriptionWhereInput>>
  OR?: Maybe<Array<EcosystemSubscriptionWhereInput>>
  NOT?: Maybe<Array<EcosystemSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<EcosystemWhereInput>
}

export type EcosystemUpdateInput = {
  status?: Maybe<Status>
  image?: Maybe<AssetUpdateOneWithoutImageEcosystemInput>
}

export type EcosystemUpdateManyDataInput = {
  status?: Maybe<Status>
}

export type EcosystemUpdateManyMutationInput = {
  status?: Maybe<Status>
}

export type EcosystemUpdateManyWithoutImageInput = {
  create?: Maybe<Array<EcosystemCreateWithoutImageInput>>
  connect?: Maybe<Array<EcosystemWhereUniqueInput>>
  set?: Maybe<Array<EcosystemWhereUniqueInput>>
  disconnect?: Maybe<Array<EcosystemWhereUniqueInput>>
  delete?: Maybe<Array<EcosystemWhereUniqueInput>>
  update?: Maybe<Array<EcosystemUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<EcosystemUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<EcosystemScalarWhereInput>>
  upsert?: Maybe<Array<EcosystemUpsertWithWhereUniqueWithoutImageInput>>
}

export type EcosystemUpdateManyWithWhereNestedInput = {
  where: EcosystemScalarWhereInput
  data: EcosystemUpdateManyDataInput
}

export type EcosystemUpdateWithoutImageDataInput = {
  status?: Maybe<Status>
}

export type EcosystemUpdateWithWhereUniqueWithoutImageInput = {
  where: EcosystemWhereUniqueInput
  data: EcosystemUpdateWithoutImageDataInput
}

export type EcosystemUpsertWithWhereUniqueWithoutImageInput = {
  where: EcosystemWhereUniqueInput
  update: EcosystemUpdateWithoutImageDataInput
  create: EcosystemCreateWithoutImageInput
}

export type EcosystemWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<EcosystemWhereInput>>
  OR?: Maybe<Array<EcosystemWhereInput>>
  NOT?: Maybe<Array<EcosystemWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  image?: Maybe<AssetWhereInput>
}

export type EcosystemWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Employee = Node & {
  __typename?: 'Employee'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<Asset>
  blogPosts?: Maybe<Array<BlogPost>>
}

export type EmployeeBlogPostsArgs = {
  where?: Maybe<BlogPostWhereInput>
  orderBy?: Maybe<BlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type EmployeeConnection = {
  __typename?: 'EmployeeConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<EmployeeEdge>>
  aggregate: AggregateEmployee
}

export type EmployeeCreateInput = {
  status?: Maybe<Status>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageEmployeeInput>
  blogPosts?: Maybe<BlogPostCreateManyWithoutEmployeeInput>
}

export type EmployeeCreateManyWithoutImageInput = {
  create?: Maybe<Array<EmployeeCreateWithoutImageInput>>
  connect?: Maybe<Array<EmployeeWhereUniqueInput>>
}

export type EmployeeCreateOneWithoutBlogPostsInput = {
  create?: Maybe<EmployeeCreateWithoutBlogPostsInput>
  connect?: Maybe<EmployeeWhereUniqueInput>
}

export type EmployeeCreateWithoutBlogPostsInput = {
  status?: Maybe<Status>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageEmployeeInput>
}

export type EmployeeCreateWithoutImageInput = {
  status?: Maybe<Status>
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  blogPosts?: Maybe<BlogPostCreateManyWithoutEmployeeInput>
}

export type EmployeeEdge = {
  __typename?: 'EmployeeEdge'
  node: Employee
  cursor: Scalars['String']
}

export enum EmployeeOrderByInput {
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

export type EmployeePreviousValues = {
  __typename?: 'EmployeePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  firstName: Scalars['String']
  lastName: Scalars['String']
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type EmployeeScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<EmployeeScalarWhereInput>>
  OR?: Maybe<Array<EmployeeScalarWhereInput>>
  NOT?: Maybe<Array<EmployeeScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type EmployeeSubscriptionPayload = {
  __typename?: 'EmployeeSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Employee>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<EmployeePreviousValues>
}

export type EmployeeSubscriptionWhereInput = {
  AND?: Maybe<Array<EmployeeSubscriptionWhereInput>>
  OR?: Maybe<Array<EmployeeSubscriptionWhereInput>>
  NOT?: Maybe<Array<EmployeeSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<EmployeeWhereInput>
}

export type EmployeeUpdateInput = {
  status?: Maybe<Status>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageEmployeeInput>
  blogPosts?: Maybe<BlogPostUpdateManyWithoutEmployeeInput>
}

export type EmployeeUpdateManyDataInput = {
  status?: Maybe<Status>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type EmployeeUpdateManyMutationInput = {
  status?: Maybe<Status>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
}

export type EmployeeUpdateManyWithoutImageInput = {
  create?: Maybe<Array<EmployeeCreateWithoutImageInput>>
  connect?: Maybe<Array<EmployeeWhereUniqueInput>>
  set?: Maybe<Array<EmployeeWhereUniqueInput>>
  disconnect?: Maybe<Array<EmployeeWhereUniqueInput>>
  delete?: Maybe<Array<EmployeeWhereUniqueInput>>
  update?: Maybe<Array<EmployeeUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<EmployeeUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<EmployeeScalarWhereInput>>
  upsert?: Maybe<Array<EmployeeUpsertWithWhereUniqueWithoutImageInput>>
}

export type EmployeeUpdateManyWithWhereNestedInput = {
  where: EmployeeScalarWhereInput
  data: EmployeeUpdateManyDataInput
}

export type EmployeeUpdateOneWithoutBlogPostsInput = {
  create?: Maybe<EmployeeCreateWithoutBlogPostsInput>
  connect?: Maybe<EmployeeWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<EmployeeUpdateWithoutBlogPostsDataInput>
  upsert?: Maybe<EmployeeUpsertWithoutBlogPostsInput>
}

export type EmployeeUpdateWithoutBlogPostsDataInput = {
  status?: Maybe<Status>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageEmployeeInput>
}

export type EmployeeUpdateWithoutImageDataInput = {
  status?: Maybe<Status>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  jobTitle?: Maybe<Scalars['String']>
  slackId?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  blogPosts?: Maybe<BlogPostUpdateManyWithoutEmployeeInput>
}

export type EmployeeUpdateWithWhereUniqueWithoutImageInput = {
  where: EmployeeWhereUniqueInput
  data: EmployeeUpdateWithoutImageDataInput
}

export type EmployeeUpsertWithoutBlogPostsInput = {
  update: EmployeeUpdateWithoutBlogPostsDataInput
  create: EmployeeCreateWithoutBlogPostsInput
}

export type EmployeeUpsertWithWhereUniqueWithoutImageInput = {
  where: EmployeeWhereUniqueInput
  update: EmployeeUpdateWithoutImageDataInput
  create: EmployeeCreateWithoutImageInput
}

export type EmployeeWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<EmployeeWhereInput>>
  OR?: Maybe<Array<EmployeeWhereInput>>
  NOT?: Maybe<Array<EmployeeWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  image?: Maybe<AssetWhereInput>
  blogPosts_every?: Maybe<BlogPostWhereInput>
  blogPosts_some?: Maybe<BlogPostWhereInput>
  blogPosts_none?: Maybe<BlogPostWhereInput>
}

export type EmployeeWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum ImageFit {
  Clip = 'clip',
  Crop = 'crop',
  Scale = 'scale',
  Max = 'max',
}

export type ImageResizeInput = {
  width?: Maybe<Scalars['Int']>
  height?: Maybe<Scalars['Int']>
  fit?: Maybe<ImageFit>
}

export type ImageTransformationInput = {
  resize?: Maybe<ImageResizeInput>
}

export type JobListing = Node & {
  __typename?: 'JobListing'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  download?: Maybe<Asset>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  page?: Maybe<Page>
  displayOrder?: Maybe<Scalars['Int']>
}

export type JobListingConnection = {
  __typename?: 'JobListingConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<JobListingEdge>>
  aggregate: AggregateJobListing
}

export type JobListingCreateInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<AssetCreateOneWithoutDownloadJobListingInput>
  page?: Maybe<PageCreateOneWithoutJobListingInput>
}

export type JobListingCreateManyWithoutDownloadInput = {
  create?: Maybe<Array<JobListingCreateWithoutDownloadInput>>
  connect?: Maybe<Array<JobListingWhereUniqueInput>>
}

export type JobListingCreateOneWithoutPageInput = {
  create?: Maybe<JobListingCreateWithoutPageInput>
  connect?: Maybe<JobListingWhereUniqueInput>
}

export type JobListingCreateWithoutDownloadInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  page?: Maybe<PageCreateOneWithoutJobListingInput>
}

export type JobListingCreateWithoutPageInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<AssetCreateOneWithoutDownloadJobListingInput>
}

export type JobListingEdge = {
  __typename?: 'JobListingEdge'
  node: JobListing
  cursor: Scalars['String']
}

export enum JobListingOrderByInput {
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

export type JobListingPreviousValues = {
  __typename?: 'JobListingPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title: Scalars['String']
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type JobListingScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<JobListingScalarWhereInput>>
  OR?: Maybe<Array<JobListingScalarWhereInput>>
  NOT?: Maybe<Array<JobListingScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type JobListingSubscriptionPayload = {
  __typename?: 'JobListingSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<JobListing>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<JobListingPreviousValues>
}

export type JobListingSubscriptionWhereInput = {
  AND?: Maybe<Array<JobListingSubscriptionWhereInput>>
  OR?: Maybe<Array<JobListingSubscriptionWhereInput>>
  NOT?: Maybe<Array<JobListingSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<JobListingWhereInput>
}

export type JobListingUpdateInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<AssetUpdateOneWithoutDownloadJobListingInput>
  page?: Maybe<PageUpdateOneWithoutJobListingInput>
}

export type JobListingUpdateManyDataInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type JobListingUpdateManyMutationInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
}

export type JobListingUpdateManyWithoutDownloadInput = {
  create?: Maybe<Array<JobListingCreateWithoutDownloadInput>>
  connect?: Maybe<Array<JobListingWhereUniqueInput>>
  set?: Maybe<Array<JobListingWhereUniqueInput>>
  disconnect?: Maybe<Array<JobListingWhereUniqueInput>>
  delete?: Maybe<Array<JobListingWhereUniqueInput>>
  update?: Maybe<Array<JobListingUpdateWithWhereUniqueWithoutDownloadInput>>
  updateMany?: Maybe<Array<JobListingUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<JobListingScalarWhereInput>>
  upsert?: Maybe<Array<JobListingUpsertWithWhereUniqueWithoutDownloadInput>>
}

export type JobListingUpdateManyWithWhereNestedInput = {
  where: JobListingScalarWhereInput
  data: JobListingUpdateManyDataInput
}

export type JobListingUpdateOneWithoutPageInput = {
  create?: Maybe<JobListingCreateWithoutPageInput>
  connect?: Maybe<JobListingWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<JobListingUpdateWithoutPageDataInput>
  upsert?: Maybe<JobListingUpsertWithoutPageInput>
}

export type JobListingUpdateWithoutDownloadDataInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  page?: Maybe<PageUpdateOneWithoutJobListingInput>
}

export type JobListingUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  jobPerks?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  content?: Maybe<Scalars['String']>
  displayOrder?: Maybe<Scalars['Int']>
  download?: Maybe<AssetUpdateOneWithoutDownloadJobListingInput>
}

export type JobListingUpdateWithWhereUniqueWithoutDownloadInput = {
  where: JobListingWhereUniqueInput
  data: JobListingUpdateWithoutDownloadDataInput
}

export type JobListingUpsertWithoutPageInput = {
  update: JobListingUpdateWithoutPageDataInput
  create: JobListingCreateWithoutPageInput
}

export type JobListingUpsertWithWhereUniqueWithoutDownloadInput = {
  where: JobListingWhereUniqueInput
  update: JobListingUpdateWithoutDownloadDataInput
  create: JobListingCreateWithoutDownloadInput
}

export type JobListingWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<JobListingWhereInput>>
  OR?: Maybe<Array<JobListingWhereInput>>
  NOT?: Maybe<Array<JobListingWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  download?: Maybe<AssetWhereInput>
  page?: Maybe<PageWhereInput>
}

export type JobListingWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum Language {
  Nl = 'NL',
  En = 'EN',
  De = 'DE',
  Fr = 'FR',
}

export enum Locale {
  En = 'EN',
}

export type MailchimpForm = Node & {
  __typename?: 'MailchimpForm'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  email: Scalars['String']
}

export type MailchimpFormConnection = {
  __typename?: 'MailchimpFormConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<MailchimpFormEdge>>
  aggregate: AggregateMailchimpForm
}

export type MailchimpFormCreateInput = {
  status?: Maybe<Status>
  email: Scalars['String']
}

export type MailchimpFormEdge = {
  __typename?: 'MailchimpFormEdge'
  node: MailchimpForm
  cursor: Scalars['String']
}

export enum MailchimpFormOrderByInput {
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

export type MailchimpFormPreviousValues = {
  __typename?: 'MailchimpFormPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  email: Scalars['String']
}

export type MailchimpFormSubscriptionPayload = {
  __typename?: 'MailchimpFormSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<MailchimpForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<MailchimpFormPreviousValues>
}

export type MailchimpFormSubscriptionWhereInput = {
  AND?: Maybe<Array<MailchimpFormSubscriptionWhereInput>>
  OR?: Maybe<Array<MailchimpFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<MailchimpFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<MailchimpFormWhereInput>
}

export type MailchimpFormUpdateInput = {
  status?: Maybe<Status>
  email?: Maybe<Scalars['String']>
}

export type MailchimpFormUpdateManyMutationInput = {
  status?: Maybe<Status>
  email?: Maybe<Scalars['String']>
}

export type MailchimpFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<MailchimpFormWhereInput>>
  OR?: Maybe<Array<MailchimpFormWhereInput>>
  NOT?: Maybe<Array<MailchimpFormWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type MailchimpFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum MetaRobots {
  IndexFollow = 'INDEX_FOLLOW',
  IndexNofollow = 'INDEX_NOFOLLOW',
  NoindexFollow = 'NOINDEX_FOLLOW',
  NoindexNofollow = 'NOINDEX_NOFOLLOW',
}

export type Module = Node & {
  __typename?: 'Module'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: ModuleType
}

export type ModuleConnection = {
  __typename?: 'ModuleConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<ModuleEdge>>
  aggregate: AggregateModule
}

export type ModuleCreateInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: ModuleType
}

export type ModuleEdge = {
  __typename?: 'ModuleEdge'
  node: Module
  cursor: Scalars['String']
}

export enum ModuleOrderByInput {
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

export type ModulePreviousValues = {
  __typename?: 'ModulePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type: ModuleType
}

export type ModuleSubscriptionPayload = {
  __typename?: 'ModuleSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Module>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<ModulePreviousValues>
}

export type ModuleSubscriptionWhereInput = {
  AND?: Maybe<Array<ModuleSubscriptionWhereInput>>
  OR?: Maybe<Array<ModuleSubscriptionWhereInput>>
  NOT?: Maybe<Array<ModuleSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<ModuleWhereInput>
}

export enum ModuleType {
  Publiccustomer = 'PUBLICCUSTOMER',
  Publicown = 'PUBLICOWN',
  Private = 'PRIVATE',
}

export type ModuleUpdateInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<ModuleType>
}

export type ModuleUpdateManyMutationInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  order?: Maybe<Scalars['Int']>
  repoUrl?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  type?: Maybe<ModuleType>
}

export type ModuleWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<ModuleWhereInput>>
  OR?: Maybe<Array<ModuleWhereInput>>
  NOT?: Maybe<Array<ModuleWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  type?: Maybe<ModuleType>
  type_not?: Maybe<ModuleType>
  type_in?: Maybe<Array<ModuleType>>
  type_not_in?: Maybe<Array<ModuleType>>
}

export type ModuleWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createAsset: Asset
  uploadAsset: Asset
  createContactForm: ContactForm
  createEcosystem: Ecosystem
  createBlock: Block
  createTag: Tag
  createModule: Module
  createStructuredPage: StructuredPage
  createEmployee: Employee
  createQuote: Quote
  createDocument: Document
  createStartProjectForm: StartProjectForm
  createJobListing: JobListing
  createMailchimpForm: MailchimpForm
  createSingularPage: SingularPage
  createBlogPost: BlogPost
  createComment: Comment
  createPage: Page
  createPdpPagina: PdpPagina
  updateAsset?: Maybe<Asset>
  updateContactForm?: Maybe<ContactForm>
  updateEcosystem?: Maybe<Ecosystem>
  updateBlock?: Maybe<Block>
  updateTag?: Maybe<Tag>
  updateModule?: Maybe<Module>
  updateStructuredPage?: Maybe<StructuredPage>
  updateEmployee?: Maybe<Employee>
  updateQuote?: Maybe<Quote>
  updateDocument?: Maybe<Document>
  updateStartProjectForm?: Maybe<StartProjectForm>
  updateJobListing?: Maybe<JobListing>
  updateMailchimpForm?: Maybe<MailchimpForm>
  updateSingularPage?: Maybe<SingularPage>
  updateBlogPost?: Maybe<BlogPost>
  updateComment?: Maybe<Comment>
  updatePage?: Maybe<Page>
  updatePdpPagina?: Maybe<PdpPagina>
  deleteAsset?: Maybe<Asset>
  deleteContactForm?: Maybe<ContactForm>
  deleteEcosystem?: Maybe<Ecosystem>
  deleteBlock?: Maybe<Block>
  deleteTag?: Maybe<Tag>
  deleteModule?: Maybe<Module>
  deleteStructuredPage?: Maybe<StructuredPage>
  deleteEmployee?: Maybe<Employee>
  deleteQuote?: Maybe<Quote>
  deleteDocument?: Maybe<Document>
  deleteStartProjectForm?: Maybe<StartProjectForm>
  deleteJobListing?: Maybe<JobListing>
  deleteMailchimpForm?: Maybe<MailchimpForm>
  deleteSingularPage?: Maybe<SingularPage>
  deleteBlogPost?: Maybe<BlogPost>
  deleteComment?: Maybe<Comment>
  deletePage?: Maybe<Page>
  deletePdpPagina?: Maybe<PdpPagina>
  upsertAsset: Asset
  upsertContactForm: ContactForm
  upsertEcosystem: Ecosystem
  upsertBlock: Block
  upsertTag: Tag
  upsertModule: Module
  upsertStructuredPage: StructuredPage
  upsertEmployee: Employee
  upsertQuote: Quote
  upsertDocument: Document
  upsertStartProjectForm: StartProjectForm
  upsertJobListing: JobListing
  upsertMailchimpForm: MailchimpForm
  upsertSingularPage: SingularPage
  upsertBlogPost: BlogPost
  upsertComment: Comment
  upsertPage: Page
  upsertPdpPagina: PdpPagina
  updateManyAssets: BatchPayload
  updateManyContactForms: BatchPayload
  updateManyEcosystems: BatchPayload
  updateManyBlocks: BatchPayload
  updateManyTags: BatchPayload
  updateManyModules: BatchPayload
  updateManyStructuredPages: BatchPayload
  updateManyEmployees: BatchPayload
  updateManyQuotes: BatchPayload
  updateManyDocuments: BatchPayload
  updateManyStartProjectForms: BatchPayload
  updateManyJobListings: BatchPayload
  updateManyMailchimpForms: BatchPayload
  updateManySingularPages: BatchPayload
  updateManyBlogPosts: BatchPayload
  updateManyComments: BatchPayload
  updateManyPages: BatchPayload
  updateManyPdpPaginas: BatchPayload
  deleteManyAssets: BatchPayload
  deleteManyContactForms: BatchPayload
  deleteManyEcosystems: BatchPayload
  deleteManyBlocks: BatchPayload
  deleteManyTags: BatchPayload
  deleteManyModules: BatchPayload
  deleteManyStructuredPages: BatchPayload
  deleteManyEmployees: BatchPayload
  deleteManyQuotes: BatchPayload
  deleteManyDocuments: BatchPayload
  deleteManyStartProjectForms: BatchPayload
  deleteManyJobListings: BatchPayload
  deleteManyMailchimpForms: BatchPayload
  deleteManySingularPages: BatchPayload
  deleteManyBlogPosts: BatchPayload
  deleteManyComments: BatchPayload
  deleteManyPages: BatchPayload
  deleteManyPdpPaginas: BatchPayload
}

export type MutationCreateAssetArgs = {
  data: AssetCreateInput
}

export type MutationUploadAssetArgs = {
  data: AssetUploadInput
}

export type MutationCreateContactFormArgs = {
  data: ContactFormCreateInput
}

export type MutationCreateEcosystemArgs = {
  data: EcosystemCreateInput
}

export type MutationCreateBlockArgs = {
  data: BlockCreateInput
}

export type MutationCreateTagArgs = {
  data: TagCreateInput
}

export type MutationCreateModuleArgs = {
  data: ModuleCreateInput
}

export type MutationCreateStructuredPageArgs = {
  data: StructuredPageCreateInput
}

export type MutationCreateEmployeeArgs = {
  data: EmployeeCreateInput
}

export type MutationCreateQuoteArgs = {
  data: QuoteCreateInput
}

export type MutationCreateDocumentArgs = {
  data: DocumentCreateInput
}

export type MutationCreateStartProjectFormArgs = {
  data: StartProjectFormCreateInput
}

export type MutationCreateJobListingArgs = {
  data: JobListingCreateInput
}

export type MutationCreateMailchimpFormArgs = {
  data: MailchimpFormCreateInput
}

export type MutationCreateSingularPageArgs = {
  data: SingularPageCreateInput
}

export type MutationCreateBlogPostArgs = {
  data: BlogPostCreateInput
}

export type MutationCreateCommentArgs = {
  data: CommentCreateInput
}

export type MutationCreatePageArgs = {
  data: PageCreateInput
}

export type MutationCreatePdpPaginaArgs = {
  data: PdpPaginaCreateInput
}

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput
  where: AssetWhereUniqueInput
}

export type MutationUpdateContactFormArgs = {
  data: ContactFormUpdateInput
  where: ContactFormWhereUniqueInput
}

export type MutationUpdateEcosystemArgs = {
  data: EcosystemUpdateInput
  where: EcosystemWhereUniqueInput
}

export type MutationUpdateBlockArgs = {
  data: BlockUpdateInput
  where: BlockWhereUniqueInput
}

export type MutationUpdateTagArgs = {
  data: TagUpdateInput
  where: TagWhereUniqueInput
}

export type MutationUpdateModuleArgs = {
  data: ModuleUpdateInput
  where: ModuleWhereUniqueInput
}

export type MutationUpdateStructuredPageArgs = {
  data: StructuredPageUpdateInput
  where: StructuredPageWhereUniqueInput
}

export type MutationUpdateEmployeeArgs = {
  data: EmployeeUpdateInput
  where: EmployeeWhereUniqueInput
}

export type MutationUpdateQuoteArgs = {
  data: QuoteUpdateInput
  where: QuoteWhereUniqueInput
}

export type MutationUpdateDocumentArgs = {
  data: DocumentUpdateInput
  where: DocumentWhereUniqueInput
}

export type MutationUpdateStartProjectFormArgs = {
  data: StartProjectFormUpdateInput
  where: StartProjectFormWhereUniqueInput
}

export type MutationUpdateJobListingArgs = {
  data: JobListingUpdateInput
  where: JobListingWhereUniqueInput
}

export type MutationUpdateMailchimpFormArgs = {
  data: MailchimpFormUpdateInput
  where: MailchimpFormWhereUniqueInput
}

export type MutationUpdateSingularPageArgs = {
  data: SingularPageUpdateInput
  where: SingularPageWhereUniqueInput
}

export type MutationUpdateBlogPostArgs = {
  data: BlogPostUpdateInput
  where: BlogPostWhereUniqueInput
}

export type MutationUpdateCommentArgs = {
  data: CommentUpdateInput
  where: CommentWhereUniqueInput
}

export type MutationUpdatePageArgs = {
  data: PageUpdateInput
  where: PageWhereUniqueInput
}

export type MutationUpdatePdpPaginaArgs = {
  data: PdpPaginaUpdateInput
  where: PdpPaginaWhereUniqueInput
}

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput
}

export type MutationDeleteContactFormArgs = {
  where: ContactFormWhereUniqueInput
}

export type MutationDeleteEcosystemArgs = {
  where: EcosystemWhereUniqueInput
}

export type MutationDeleteBlockArgs = {
  where: BlockWhereUniqueInput
}

export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput
}

export type MutationDeleteModuleArgs = {
  where: ModuleWhereUniqueInput
}

export type MutationDeleteStructuredPageArgs = {
  where: StructuredPageWhereUniqueInput
}

export type MutationDeleteEmployeeArgs = {
  where: EmployeeWhereUniqueInput
}

export type MutationDeleteQuoteArgs = {
  where: QuoteWhereUniqueInput
}

export type MutationDeleteDocumentArgs = {
  where: DocumentWhereUniqueInput
}

export type MutationDeleteStartProjectFormArgs = {
  where: StartProjectFormWhereUniqueInput
}

export type MutationDeleteJobListingArgs = {
  where: JobListingWhereUniqueInput
}

export type MutationDeleteMailchimpFormArgs = {
  where: MailchimpFormWhereUniqueInput
}

export type MutationDeleteSingularPageArgs = {
  where: SingularPageWhereUniqueInput
}

export type MutationDeleteBlogPostArgs = {
  where: BlogPostWhereUniqueInput
}

export type MutationDeleteCommentArgs = {
  where: CommentWhereUniqueInput
}

export type MutationDeletePageArgs = {
  where: PageWhereUniqueInput
}

export type MutationDeletePdpPaginaArgs = {
  where: PdpPaginaWhereUniqueInput
}

export type MutationUpsertAssetArgs = {
  where: AssetWhereUniqueInput
  create: AssetCreateInput
  update: AssetUpdateInput
}

export type MutationUpsertContactFormArgs = {
  where: ContactFormWhereUniqueInput
  create: ContactFormCreateInput
  update: ContactFormUpdateInput
}

export type MutationUpsertEcosystemArgs = {
  where: EcosystemWhereUniqueInput
  create: EcosystemCreateInput
  update: EcosystemUpdateInput
}

export type MutationUpsertBlockArgs = {
  where: BlockWhereUniqueInput
  create: BlockCreateInput
  update: BlockUpdateInput
}

export type MutationUpsertTagArgs = {
  where: TagWhereUniqueInput
  create: TagCreateInput
  update: TagUpdateInput
}

export type MutationUpsertModuleArgs = {
  where: ModuleWhereUniqueInput
  create: ModuleCreateInput
  update: ModuleUpdateInput
}

export type MutationUpsertStructuredPageArgs = {
  where: StructuredPageWhereUniqueInput
  create: StructuredPageCreateInput
  update: StructuredPageUpdateInput
}

export type MutationUpsertEmployeeArgs = {
  where: EmployeeWhereUniqueInput
  create: EmployeeCreateInput
  update: EmployeeUpdateInput
}

export type MutationUpsertQuoteArgs = {
  where: QuoteWhereUniqueInput
  create: QuoteCreateInput
  update: QuoteUpdateInput
}

export type MutationUpsertDocumentArgs = {
  where: DocumentWhereUniqueInput
  create: DocumentCreateInput
  update: DocumentUpdateInput
}

export type MutationUpsertStartProjectFormArgs = {
  where: StartProjectFormWhereUniqueInput
  create: StartProjectFormCreateInput
  update: StartProjectFormUpdateInput
}

export type MutationUpsertJobListingArgs = {
  where: JobListingWhereUniqueInput
  create: JobListingCreateInput
  update: JobListingUpdateInput
}

export type MutationUpsertMailchimpFormArgs = {
  where: MailchimpFormWhereUniqueInput
  create: MailchimpFormCreateInput
  update: MailchimpFormUpdateInput
}

export type MutationUpsertSingularPageArgs = {
  where: SingularPageWhereUniqueInput
  create: SingularPageCreateInput
  update: SingularPageUpdateInput
}

export type MutationUpsertBlogPostArgs = {
  where: BlogPostWhereUniqueInput
  create: BlogPostCreateInput
  update: BlogPostUpdateInput
}

export type MutationUpsertCommentArgs = {
  where: CommentWhereUniqueInput
  create: CommentCreateInput
  update: CommentUpdateInput
}

export type MutationUpsertPageArgs = {
  where: PageWhereUniqueInput
  create: PageCreateInput
  update: PageUpdateInput
}

export type MutationUpsertPdpPaginaArgs = {
  where: PdpPaginaWhereUniqueInput
  create: PdpPaginaCreateInput
  update: PdpPaginaUpdateInput
}

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyMutationInput
  where?: Maybe<AssetWhereInput>
}

export type MutationUpdateManyContactFormsArgs = {
  data: ContactFormUpdateManyMutationInput
  where?: Maybe<ContactFormWhereInput>
}

export type MutationUpdateManyEcosystemsArgs = {
  data: EcosystemUpdateManyMutationInput
  where?: Maybe<EcosystemWhereInput>
}

export type MutationUpdateManyBlocksArgs = {
  data: BlockUpdateManyMutationInput
  where?: Maybe<BlockWhereInput>
}

export type MutationUpdateManyTagsArgs = {
  data: TagUpdateManyMutationInput
  where?: Maybe<TagWhereInput>
}

export type MutationUpdateManyModulesArgs = {
  data: ModuleUpdateManyMutationInput
  where?: Maybe<ModuleWhereInput>
}

export type MutationUpdateManyStructuredPagesArgs = {
  data: StructuredPageUpdateManyMutationInput
  where?: Maybe<StructuredPageWhereInput>
}

export type MutationUpdateManyEmployeesArgs = {
  data: EmployeeUpdateManyMutationInput
  where?: Maybe<EmployeeWhereInput>
}

export type MutationUpdateManyQuotesArgs = {
  data: QuoteUpdateManyMutationInput
  where?: Maybe<QuoteWhereInput>
}

export type MutationUpdateManyDocumentsArgs = {
  data: DocumentUpdateManyMutationInput
  where?: Maybe<DocumentWhereInput>
}

export type MutationUpdateManyStartProjectFormsArgs = {
  data: StartProjectFormUpdateManyMutationInput
  where?: Maybe<StartProjectFormWhereInput>
}

export type MutationUpdateManyJobListingsArgs = {
  data: JobListingUpdateManyMutationInput
  where?: Maybe<JobListingWhereInput>
}

export type MutationUpdateManyMailchimpFormsArgs = {
  data: MailchimpFormUpdateManyMutationInput
  where?: Maybe<MailchimpFormWhereInput>
}

export type MutationUpdateManySingularPagesArgs = {
  data: SingularPageUpdateManyMutationInput
  where?: Maybe<SingularPageWhereInput>
}

export type MutationUpdateManyBlogPostsArgs = {
  data: BlogPostUpdateManyMutationInput
  where?: Maybe<BlogPostWhereInput>
}

export type MutationUpdateManyCommentsArgs = {
  data: CommentUpdateManyMutationInput
  where?: Maybe<CommentWhereInput>
}

export type MutationUpdateManyPagesArgs = {
  data: PageUpdateManyMutationInput
  where?: Maybe<PageWhereInput>
}

export type MutationUpdateManyPdpPaginasArgs = {
  data: PdpPaginaUpdateManyMutationInput
  where?: Maybe<PdpPaginaWhereInput>
}

export type MutationDeleteManyAssetsArgs = {
  where?: Maybe<AssetWhereInput>
}

export type MutationDeleteManyContactFormsArgs = {
  where?: Maybe<ContactFormWhereInput>
}

export type MutationDeleteManyEcosystemsArgs = {
  where?: Maybe<EcosystemWhereInput>
}

export type MutationDeleteManyBlocksArgs = {
  where?: Maybe<BlockWhereInput>
}

export type MutationDeleteManyTagsArgs = {
  where?: Maybe<TagWhereInput>
}

export type MutationDeleteManyModulesArgs = {
  where?: Maybe<ModuleWhereInput>
}

export type MutationDeleteManyStructuredPagesArgs = {
  where?: Maybe<StructuredPageWhereInput>
}

export type MutationDeleteManyEmployeesArgs = {
  where?: Maybe<EmployeeWhereInput>
}

export type MutationDeleteManyQuotesArgs = {
  where?: Maybe<QuoteWhereInput>
}

export type MutationDeleteManyDocumentsArgs = {
  where?: Maybe<DocumentWhereInput>
}

export type MutationDeleteManyStartProjectFormsArgs = {
  where?: Maybe<StartProjectFormWhereInput>
}

export type MutationDeleteManyJobListingsArgs = {
  where?: Maybe<JobListingWhereInput>
}

export type MutationDeleteManyMailchimpFormsArgs = {
  where?: Maybe<MailchimpFormWhereInput>
}

export type MutationDeleteManySingularPagesArgs = {
  where?: Maybe<SingularPageWhereInput>
}

export type MutationDeleteManyBlogPostsArgs = {
  where?: Maybe<BlogPostWhereInput>
}

export type MutationDeleteManyCommentsArgs = {
  where?: Maybe<CommentWhereInput>
}

export type MutationDeleteManyPagesArgs = {
  where?: Maybe<PageWhereInput>
}

export type MutationDeleteManyPdpPaginasArgs = {
  where?: Maybe<PdpPaginaWhereInput>
}

export enum MutationType {
  Created = 'CREATED',
  Updated = 'UPDATED',
  Deleted = 'DELETED',
}

export type Node = {
  id: Scalars['ID']
}

export type Page = Node & {
  __typename?: 'Page'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  parent?: Maybe<Page>
  children?: Maybe<Array<Page>>
  tags?: Maybe<Array<Tag>>
  structuredPage?: Maybe<StructuredPage>
  blogPost?: Maybe<BlogPost>
  jobListing?: Maybe<JobListing>
  comment?: Maybe<Comment>
  singularPage?: Maybe<SingularPage>
  translationFrom?: Maybe<Array<Page>>
  translationTo?: Maybe<Array<Page>>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
}

export type PageChildrenArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PageTagsArgs = {
  where?: Maybe<TagWhereInput>
  orderBy?: Maybe<TagOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PageTranslationFromArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PageTranslationToArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type PageConnection = {
  __typename?: 'PageConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<PageEdge>>
  aggregate: AggregatePage
}

export type PageCreateInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateManyWithoutParentInput = {
  create?: Maybe<Array<PageCreateWithoutParentInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageCreateManyWithoutTagsInput = {
  create?: Maybe<Array<PageCreateWithoutTagsInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageCreateManyWithoutTranslationFromInput = {
  create?: Maybe<Array<PageCreateWithoutTranslationFromInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageCreateManyWithoutTranslationToInput = {
  create?: Maybe<Array<PageCreateWithoutTranslationToInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
}

export type PageCreateOneWithoutBlogPostInput = {
  create?: Maybe<PageCreateWithoutBlogPostInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateOneWithoutChildrenInput = {
  create?: Maybe<PageCreateWithoutChildrenInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateOneWithoutCommentInput = {
  create?: Maybe<PageCreateWithoutCommentInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateOneWithoutJobListingInput = {
  create?: Maybe<PageCreateWithoutJobListingInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateOneWithoutSingularPageInput = {
  create?: Maybe<PageCreateWithoutSingularPageInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateOneWithoutStructuredPageInput = {
  create?: Maybe<PageCreateWithoutStructuredPageInput>
  connect?: Maybe<PageWhereUniqueInput>
}

export type PageCreateWithoutBlogPostInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutChildrenInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutCommentInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutJobListingInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutParentInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutSingularPageInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutStructuredPageInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutTagsInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutTranslationFromInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationTo?: Maybe<PageCreateManyWithoutTranslationFromInput>
}

export type PageCreateWithoutTranslationToInput = {
  status?: Maybe<Status>
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageCreateOneWithoutChildrenInput>
  children?: Maybe<PageCreateManyWithoutParentInput>
  tags?: Maybe<TagCreateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageCreateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostCreateOneWithoutPageInput>
  jobListing?: Maybe<JobListingCreateOneWithoutPageInput>
  comment?: Maybe<CommentCreateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageCreateOneWithoutPageInput>
  translationFrom?: Maybe<PageCreateManyWithoutTranslationToInput>
}

export type PageEdge = {
  __typename?: 'PageEdge'
  node: Page
  cursor: Scalars['String']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
  endCursor?: Maybe<Scalars['String']>
}

export enum PageOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  UrlKeyAsc = 'urlKey_ASC',
  UrlKeyDesc = 'urlKey_DESC',
  MetaTitleAsc = 'metaTitle_ASC',
  MetaTitleDesc = 'metaTitle_DESC',
  MetaDescriptionAsc = 'metaDescription_ASC',
  MetaDescriptionDesc = 'metaDescription_DESC',
  StatusCodeAsc = 'statusCode_ASC',
  StatusCodeDesc = 'statusCode_DESC',
  MetaRobotsAsc = 'metaRobots_ASC',
  MetaRobotsDesc = 'metaRobots_DESC',
  FooterkeywordAsc = 'footerkeyword_ASC',
  FooterkeywordDesc = 'footerkeyword_DESC',
  FootertitleAsc = 'footertitle_ASC',
  FootertitleDesc = 'footertitle_DESC',
  LanguageAsc = 'language_ASC',
  LanguageDesc = 'language_DESC',
  UrlkeynewAsc = 'urlkeynew_ASC',
  UrlkeynewDesc = 'urlkeynew_DESC',
}

export type PagePreviousValues = {
  __typename?: 'PagePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  urlKey: Scalars['String']
  metaTitle: Scalars['String']
  metaDescription?: Maybe<Scalars['String']>
  statusCode: StatusCode
  metaRobots: MetaRobots
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
}

export type PageScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<PageScalarWhereInput>>
  OR?: Maybe<Array<PageScalarWhereInput>>
  NOT?: Maybe<Array<PageScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  urlKey?: Maybe<Scalars['String']>
  urlKey_not?: Maybe<Scalars['String']>
  urlKey_in?: Maybe<Array<Scalars['String']>>
  urlKey_not_in?: Maybe<Array<Scalars['String']>>
  urlKey_lt?: Maybe<Scalars['String']>
  urlKey_lte?: Maybe<Scalars['String']>
  urlKey_gt?: Maybe<Scalars['String']>
  urlKey_gte?: Maybe<Scalars['String']>
  urlKey_contains?: Maybe<Scalars['String']>
  urlKey_not_contains?: Maybe<Scalars['String']>
  urlKey_starts_with?: Maybe<Scalars['String']>
  urlKey_not_starts_with?: Maybe<Scalars['String']>
  urlKey_ends_with?: Maybe<Scalars['String']>
  urlKey_not_ends_with?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaTitle_not?: Maybe<Scalars['String']>
  metaTitle_in?: Maybe<Array<Scalars['String']>>
  metaTitle_not_in?: Maybe<Array<Scalars['String']>>
  metaTitle_lt?: Maybe<Scalars['String']>
  metaTitle_lte?: Maybe<Scalars['String']>
  metaTitle_gt?: Maybe<Scalars['String']>
  metaTitle_gte?: Maybe<Scalars['String']>
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
  metaDescription_lt?: Maybe<Scalars['String']>
  metaDescription_lte?: Maybe<Scalars['String']>
  metaDescription_gt?: Maybe<Scalars['String']>
  metaDescription_gte?: Maybe<Scalars['String']>
  metaDescription_contains?: Maybe<Scalars['String']>
  metaDescription_not_contains?: Maybe<Scalars['String']>
  metaDescription_starts_with?: Maybe<Scalars['String']>
  metaDescription_not_starts_with?: Maybe<Scalars['String']>
  metaDescription_ends_with?: Maybe<Scalars['String']>
  metaDescription_not_ends_with?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  statusCode_not?: Maybe<StatusCode>
  statusCode_in?: Maybe<Array<StatusCode>>
  statusCode_not_in?: Maybe<Array<StatusCode>>
  metaRobots?: Maybe<MetaRobots>
  metaRobots_not?: Maybe<MetaRobots>
  metaRobots_in?: Maybe<Array<MetaRobots>>
  metaRobots_not_in?: Maybe<Array<MetaRobots>>
  footerkeyword?: Maybe<Scalars['String']>
  footerkeyword_not?: Maybe<Scalars['String']>
  footerkeyword_in?: Maybe<Array<Scalars['String']>>
  footerkeyword_not_in?: Maybe<Array<Scalars['String']>>
  footerkeyword_lt?: Maybe<Scalars['String']>
  footerkeyword_lte?: Maybe<Scalars['String']>
  footerkeyword_gt?: Maybe<Scalars['String']>
  footerkeyword_gte?: Maybe<Scalars['String']>
  footerkeyword_contains?: Maybe<Scalars['String']>
  footerkeyword_not_contains?: Maybe<Scalars['String']>
  footerkeyword_starts_with?: Maybe<Scalars['String']>
  footerkeyword_not_starts_with?: Maybe<Scalars['String']>
  footerkeyword_ends_with?: Maybe<Scalars['String']>
  footerkeyword_not_ends_with?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  footertitle_not?: Maybe<Scalars['String']>
  footertitle_in?: Maybe<Array<Scalars['String']>>
  footertitle_not_in?: Maybe<Array<Scalars['String']>>
  footertitle_lt?: Maybe<Scalars['String']>
  footertitle_lte?: Maybe<Scalars['String']>
  footertitle_gt?: Maybe<Scalars['String']>
  footertitle_gte?: Maybe<Scalars['String']>
  footertitle_contains?: Maybe<Scalars['String']>
  footertitle_not_contains?: Maybe<Scalars['String']>
  footertitle_starts_with?: Maybe<Scalars['String']>
  footertitle_not_starts_with?: Maybe<Scalars['String']>
  footertitle_ends_with?: Maybe<Scalars['String']>
  footertitle_not_ends_with?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  language_not?: Maybe<Language>
  language_in?: Maybe<Array<Language>>
  language_not_in?: Maybe<Array<Language>>
  urlkeynew?: Maybe<Scalars['String']>
  urlkeynew_not?: Maybe<Scalars['String']>
  urlkeynew_in?: Maybe<Array<Scalars['String']>>
  urlkeynew_not_in?: Maybe<Array<Scalars['String']>>
  urlkeynew_lt?: Maybe<Scalars['String']>
  urlkeynew_lte?: Maybe<Scalars['String']>
  urlkeynew_gt?: Maybe<Scalars['String']>
  urlkeynew_gte?: Maybe<Scalars['String']>
  urlkeynew_contains?: Maybe<Scalars['String']>
  urlkeynew_not_contains?: Maybe<Scalars['String']>
  urlkeynew_starts_with?: Maybe<Scalars['String']>
  urlkeynew_not_starts_with?: Maybe<Scalars['String']>
  urlkeynew_ends_with?: Maybe<Scalars['String']>
  urlkeynew_not_ends_with?: Maybe<Scalars['String']>
}

export type PageSubscriptionPayload = {
  __typename?: 'PageSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Page>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<PagePreviousValues>
}

export type PageSubscriptionWhereInput = {
  AND?: Maybe<Array<PageSubscriptionWhereInput>>
  OR?: Maybe<Array<PageSubscriptionWhereInput>>
  NOT?: Maybe<Array<PageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<PageWhereInput>
}

export type PageUpdateInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateManyDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
}

export type PageUpdateManyMutationInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
}

export type PageUpdateManyWithoutParentInput = {
  create?: Maybe<Array<PageCreateWithoutParentInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
  set?: Maybe<Array<PageWhereUniqueInput>>
  disconnect?: Maybe<Array<PageWhereUniqueInput>>
  delete?: Maybe<Array<PageWhereUniqueInput>>
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutParentInput>>
  updateMany?: Maybe<Array<PageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<PageScalarWhereInput>>
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutParentInput>>
}

export type PageUpdateManyWithoutTagsInput = {
  create?: Maybe<Array<PageCreateWithoutTagsInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
  set?: Maybe<Array<PageWhereUniqueInput>>
  disconnect?: Maybe<Array<PageWhereUniqueInput>>
  delete?: Maybe<Array<PageWhereUniqueInput>>
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutTagsInput>>
  updateMany?: Maybe<Array<PageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<PageScalarWhereInput>>
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutTagsInput>>
}

export type PageUpdateManyWithoutTranslationFromInput = {
  create?: Maybe<Array<PageCreateWithoutTranslationFromInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
  set?: Maybe<Array<PageWhereUniqueInput>>
  disconnect?: Maybe<Array<PageWhereUniqueInput>>
  delete?: Maybe<Array<PageWhereUniqueInput>>
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutTranslationFromInput>>
  updateMany?: Maybe<Array<PageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<PageScalarWhereInput>>
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutTranslationFromInput>>
}

export type PageUpdateManyWithoutTranslationToInput = {
  create?: Maybe<Array<PageCreateWithoutTranslationToInput>>
  connect?: Maybe<Array<PageWhereUniqueInput>>
  set?: Maybe<Array<PageWhereUniqueInput>>
  disconnect?: Maybe<Array<PageWhereUniqueInput>>
  delete?: Maybe<Array<PageWhereUniqueInput>>
  update?: Maybe<Array<PageUpdateWithWhereUniqueWithoutTranslationToInput>>
  updateMany?: Maybe<Array<PageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<PageScalarWhereInput>>
  upsert?: Maybe<Array<PageUpsertWithWhereUniqueWithoutTranslationToInput>>
}

export type PageUpdateManyWithWhereNestedInput = {
  where: PageScalarWhereInput
  data: PageUpdateManyDataInput
}

export type PageUpdateOneWithoutBlogPostInput = {
  create?: Maybe<PageCreateWithoutBlogPostInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutBlogPostDataInput>
  upsert?: Maybe<PageUpsertWithoutBlogPostInput>
}

export type PageUpdateOneWithoutChildrenInput = {
  create?: Maybe<PageCreateWithoutChildrenInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutChildrenDataInput>
  upsert?: Maybe<PageUpsertWithoutChildrenInput>
}

export type PageUpdateOneWithoutCommentInput = {
  create?: Maybe<PageCreateWithoutCommentInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutCommentDataInput>
  upsert?: Maybe<PageUpsertWithoutCommentInput>
}

export type PageUpdateOneWithoutJobListingInput = {
  create?: Maybe<PageCreateWithoutJobListingInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutJobListingDataInput>
  upsert?: Maybe<PageUpsertWithoutJobListingInput>
}

export type PageUpdateOneWithoutSingularPageInput = {
  create?: Maybe<PageCreateWithoutSingularPageInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutSingularPageDataInput>
  upsert?: Maybe<PageUpsertWithoutSingularPageInput>
}

export type PageUpdateOneWithoutStructuredPageInput = {
  create?: Maybe<PageCreateWithoutStructuredPageInput>
  connect?: Maybe<PageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<PageUpdateWithoutStructuredPageDataInput>
  upsert?: Maybe<PageUpsertWithoutStructuredPageInput>
}

export type PageUpdateWithoutBlogPostDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutChildrenDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutCommentDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutJobListingDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutParentDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutSingularPageDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutStructuredPageDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutTagsDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutTranslationFromDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationTo?: Maybe<PageUpdateManyWithoutTranslationFromInput>
}

export type PageUpdateWithoutTranslationToDataInput = {
  status?: Maybe<Status>
  urlKey?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaDescription?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  metaRobots?: Maybe<MetaRobots>
  footerkeyword?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  urlkeynew?: Maybe<Scalars['String']>
  parent?: Maybe<PageUpdateOneWithoutChildrenInput>
  children?: Maybe<PageUpdateManyWithoutParentInput>
  tags?: Maybe<TagUpdateManyWithoutPagesInput>
  structuredPage?: Maybe<StructuredPageUpdateOneWithoutPageInput>
  blogPost?: Maybe<BlogPostUpdateOneWithoutPageInput>
  jobListing?: Maybe<JobListingUpdateOneWithoutPageInput>
  comment?: Maybe<CommentUpdateOneWithoutPageInput>
  singularPage?: Maybe<SingularPageUpdateOneWithoutPageInput>
  translationFrom?: Maybe<PageUpdateManyWithoutTranslationToInput>
}

export type PageUpdateWithWhereUniqueWithoutParentInput = {
  where: PageWhereUniqueInput
  data: PageUpdateWithoutParentDataInput
}

export type PageUpdateWithWhereUniqueWithoutTagsInput = {
  where: PageWhereUniqueInput
  data: PageUpdateWithoutTagsDataInput
}

export type PageUpdateWithWhereUniqueWithoutTranslationFromInput = {
  where: PageWhereUniqueInput
  data: PageUpdateWithoutTranslationFromDataInput
}

export type PageUpdateWithWhereUniqueWithoutTranslationToInput = {
  where: PageWhereUniqueInput
  data: PageUpdateWithoutTranslationToDataInput
}

export type PageUpsertWithoutBlogPostInput = {
  update: PageUpdateWithoutBlogPostDataInput
  create: PageCreateWithoutBlogPostInput
}

export type PageUpsertWithoutChildrenInput = {
  update: PageUpdateWithoutChildrenDataInput
  create: PageCreateWithoutChildrenInput
}

export type PageUpsertWithoutCommentInput = {
  update: PageUpdateWithoutCommentDataInput
  create: PageCreateWithoutCommentInput
}

export type PageUpsertWithoutJobListingInput = {
  update: PageUpdateWithoutJobListingDataInput
  create: PageCreateWithoutJobListingInput
}

export type PageUpsertWithoutSingularPageInput = {
  update: PageUpdateWithoutSingularPageDataInput
  create: PageCreateWithoutSingularPageInput
}

export type PageUpsertWithoutStructuredPageInput = {
  update: PageUpdateWithoutStructuredPageDataInput
  create: PageCreateWithoutStructuredPageInput
}

export type PageUpsertWithWhereUniqueWithoutParentInput = {
  where: PageWhereUniqueInput
  update: PageUpdateWithoutParentDataInput
  create: PageCreateWithoutParentInput
}

export type PageUpsertWithWhereUniqueWithoutTagsInput = {
  where: PageWhereUniqueInput
  update: PageUpdateWithoutTagsDataInput
  create: PageCreateWithoutTagsInput
}

export type PageUpsertWithWhereUniqueWithoutTranslationFromInput = {
  where: PageWhereUniqueInput
  update: PageUpdateWithoutTranslationFromDataInput
  create: PageCreateWithoutTranslationFromInput
}

export type PageUpsertWithWhereUniqueWithoutTranslationToInput = {
  where: PageWhereUniqueInput
  update: PageUpdateWithoutTranslationToDataInput
  create: PageCreateWithoutTranslationToInput
}

export type PageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<PageWhereInput>>
  OR?: Maybe<Array<PageWhereInput>>
  NOT?: Maybe<Array<PageWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  urlKey?: Maybe<Scalars['String']>
  urlKey_not?: Maybe<Scalars['String']>
  urlKey_in?: Maybe<Array<Scalars['String']>>
  urlKey_not_in?: Maybe<Array<Scalars['String']>>
  urlKey_lt?: Maybe<Scalars['String']>
  urlKey_lte?: Maybe<Scalars['String']>
  urlKey_gt?: Maybe<Scalars['String']>
  urlKey_gte?: Maybe<Scalars['String']>
  urlKey_contains?: Maybe<Scalars['String']>
  urlKey_not_contains?: Maybe<Scalars['String']>
  urlKey_starts_with?: Maybe<Scalars['String']>
  urlKey_not_starts_with?: Maybe<Scalars['String']>
  urlKey_ends_with?: Maybe<Scalars['String']>
  urlKey_not_ends_with?: Maybe<Scalars['String']>
  metaTitle?: Maybe<Scalars['String']>
  metaTitle_not?: Maybe<Scalars['String']>
  metaTitle_in?: Maybe<Array<Scalars['String']>>
  metaTitle_not_in?: Maybe<Array<Scalars['String']>>
  metaTitle_lt?: Maybe<Scalars['String']>
  metaTitle_lte?: Maybe<Scalars['String']>
  metaTitle_gt?: Maybe<Scalars['String']>
  metaTitle_gte?: Maybe<Scalars['String']>
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
  metaDescription_lt?: Maybe<Scalars['String']>
  metaDescription_lte?: Maybe<Scalars['String']>
  metaDescription_gt?: Maybe<Scalars['String']>
  metaDescription_gte?: Maybe<Scalars['String']>
  metaDescription_contains?: Maybe<Scalars['String']>
  metaDescription_not_contains?: Maybe<Scalars['String']>
  metaDescription_starts_with?: Maybe<Scalars['String']>
  metaDescription_not_starts_with?: Maybe<Scalars['String']>
  metaDescription_ends_with?: Maybe<Scalars['String']>
  metaDescription_not_ends_with?: Maybe<Scalars['String']>
  statusCode?: Maybe<StatusCode>
  statusCode_not?: Maybe<StatusCode>
  statusCode_in?: Maybe<Array<StatusCode>>
  statusCode_not_in?: Maybe<Array<StatusCode>>
  metaRobots?: Maybe<MetaRobots>
  metaRobots_not?: Maybe<MetaRobots>
  metaRobots_in?: Maybe<Array<MetaRobots>>
  metaRobots_not_in?: Maybe<Array<MetaRobots>>
  footerkeyword?: Maybe<Scalars['String']>
  footerkeyword_not?: Maybe<Scalars['String']>
  footerkeyword_in?: Maybe<Array<Scalars['String']>>
  footerkeyword_not_in?: Maybe<Array<Scalars['String']>>
  footerkeyword_lt?: Maybe<Scalars['String']>
  footerkeyword_lte?: Maybe<Scalars['String']>
  footerkeyword_gt?: Maybe<Scalars['String']>
  footerkeyword_gte?: Maybe<Scalars['String']>
  footerkeyword_contains?: Maybe<Scalars['String']>
  footerkeyword_not_contains?: Maybe<Scalars['String']>
  footerkeyword_starts_with?: Maybe<Scalars['String']>
  footerkeyword_not_starts_with?: Maybe<Scalars['String']>
  footerkeyword_ends_with?: Maybe<Scalars['String']>
  footerkeyword_not_ends_with?: Maybe<Scalars['String']>
  footertitle?: Maybe<Scalars['String']>
  footertitle_not?: Maybe<Scalars['String']>
  footertitle_in?: Maybe<Array<Scalars['String']>>
  footertitle_not_in?: Maybe<Array<Scalars['String']>>
  footertitle_lt?: Maybe<Scalars['String']>
  footertitle_lte?: Maybe<Scalars['String']>
  footertitle_gt?: Maybe<Scalars['String']>
  footertitle_gte?: Maybe<Scalars['String']>
  footertitle_contains?: Maybe<Scalars['String']>
  footertitle_not_contains?: Maybe<Scalars['String']>
  footertitle_starts_with?: Maybe<Scalars['String']>
  footertitle_not_starts_with?: Maybe<Scalars['String']>
  footertitle_ends_with?: Maybe<Scalars['String']>
  footertitle_not_ends_with?: Maybe<Scalars['String']>
  language?: Maybe<Language>
  language_not?: Maybe<Language>
  language_in?: Maybe<Array<Language>>
  language_not_in?: Maybe<Array<Language>>
  urlkeynew?: Maybe<Scalars['String']>
  urlkeynew_not?: Maybe<Scalars['String']>
  urlkeynew_in?: Maybe<Array<Scalars['String']>>
  urlkeynew_not_in?: Maybe<Array<Scalars['String']>>
  urlkeynew_lt?: Maybe<Scalars['String']>
  urlkeynew_lte?: Maybe<Scalars['String']>
  urlkeynew_gt?: Maybe<Scalars['String']>
  urlkeynew_gte?: Maybe<Scalars['String']>
  urlkeynew_contains?: Maybe<Scalars['String']>
  urlkeynew_not_contains?: Maybe<Scalars['String']>
  urlkeynew_starts_with?: Maybe<Scalars['String']>
  urlkeynew_not_starts_with?: Maybe<Scalars['String']>
  urlkeynew_ends_with?: Maybe<Scalars['String']>
  urlkeynew_not_ends_with?: Maybe<Scalars['String']>
  parent?: Maybe<PageWhereInput>
  children_every?: Maybe<PageWhereInput>
  children_some?: Maybe<PageWhereInput>
  children_none?: Maybe<PageWhereInput>
  tags_every?: Maybe<TagWhereInput>
  tags_some?: Maybe<TagWhereInput>
  tags_none?: Maybe<TagWhereInput>
  structuredPage?: Maybe<StructuredPageWhereInput>
  blogPost?: Maybe<BlogPostWhereInput>
  jobListing?: Maybe<JobListingWhereInput>
  comment?: Maybe<CommentWhereInput>
  singularPage?: Maybe<SingularPageWhereInput>
  translationFrom_every?: Maybe<PageWhereInput>
  translationFrom_some?: Maybe<PageWhereInput>
  translationFrom_none?: Maybe<PageWhereInput>
  translationTo_every?: Maybe<PageWhereInput>
  translationTo_some?: Maybe<PageWhereInput>
  translationTo_none?: Maybe<PageWhereInput>
}

export type PageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  urlKey?: Maybe<Scalars['String']>
}

export type PdpPagina = Node & {
  __typename?: 'PdpPagina'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  bikeName?: Maybe<Scalars['String']>
}

export type PdpPaginaBikeNameArgs = {
  locale?: Maybe<Locale>
}

export type PdpPaginaConnection = {
  __typename?: 'PdpPaginaConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<PdpPaginaEdge>>
  aggregate: AggregatePdpPagina
}

export type PdpPaginaCreateInput = {
  status?: Maybe<Status>
  bikeNameEN?: Maybe<Scalars['String']>
}

export type PdpPaginaEdge = {
  __typename?: 'PdpPaginaEdge'
  node: PdpPagina
  cursor: Scalars['String']
}

export enum PdpPaginaOrderByInput {
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  BikeNameEnAsc = 'bikeNameEN_ASC',
  BikeNameEnDesc = 'bikeNameEN_DESC',
}

export type PdpPaginaPreviousValues = {
  __typename?: 'PdpPaginaPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  bikeNameEN?: Maybe<Scalars['String']>
}

export type PdpPaginaSubscriptionPayload = {
  __typename?: 'PdpPaginaSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<PdpPagina>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<PdpPaginaPreviousValues>
}

export type PdpPaginaSubscriptionWhereInput = {
  AND?: Maybe<Array<PdpPaginaSubscriptionWhereInput>>
  OR?: Maybe<Array<PdpPaginaSubscriptionWhereInput>>
  NOT?: Maybe<Array<PdpPaginaSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<PdpPaginaWhereInput>
}

export type PdpPaginaUpdateInput = {
  status?: Maybe<Status>
  bikeNameEN?: Maybe<Scalars['String']>
}

export type PdpPaginaUpdateManyMutationInput = {
  status?: Maybe<Status>
  bikeNameEN?: Maybe<Scalars['String']>
}

export type PdpPaginaWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<PdpPaginaWhereInput>>
  OR?: Maybe<Array<PdpPaginaWhereInput>>
  NOT?: Maybe<Array<PdpPaginaWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  bikeNameEN?: Maybe<Scalars['String']>
  bikeNameEN_not?: Maybe<Scalars['String']>
  bikeNameEN_in?: Maybe<Array<Scalars['String']>>
  bikeNameEN_not_in?: Maybe<Array<Scalars['String']>>
  bikeNameEN_lt?: Maybe<Scalars['String']>
  bikeNameEN_lte?: Maybe<Scalars['String']>
  bikeNameEN_gt?: Maybe<Scalars['String']>
  bikeNameEN_gte?: Maybe<Scalars['String']>
  bikeNameEN_contains?: Maybe<Scalars['String']>
  bikeNameEN_not_contains?: Maybe<Scalars['String']>
  bikeNameEN_starts_with?: Maybe<Scalars['String']>
  bikeNameEN_not_starts_with?: Maybe<Scalars['String']>
  bikeNameEN_ends_with?: Maybe<Scalars['String']>
  bikeNameEN_not_ends_with?: Maybe<Scalars['String']>
}

export type PdpPaginaWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  bikeNameEN?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  assets: Array<Maybe<Asset>>
  contactForms: Array<Maybe<ContactForm>>
  ecosystems: Array<Maybe<Ecosystem>>
  blocks: Array<Maybe<Block>>
  tags: Array<Maybe<Tag>>
  modules: Array<Maybe<Module>>
  structuredPages: Array<Maybe<StructuredPage>>
  employees: Array<Maybe<Employee>>
  quotes: Array<Maybe<Quote>>
  documents: Array<Maybe<Document>>
  startProjectForms: Array<Maybe<StartProjectForm>>
  jobListings: Array<Maybe<JobListing>>
  mailchimpForms: Array<Maybe<MailchimpForm>>
  singularPages: Array<Maybe<SingularPage>>
  blogPosts: Array<Maybe<BlogPost>>
  comments: Array<Maybe<Comment>>
  pages: Array<Maybe<Page>>
  pdpPaginas: Array<Maybe<PdpPagina>>
  asset?: Maybe<Asset>
  contactForm?: Maybe<ContactForm>
  ecosystem?: Maybe<Ecosystem>
  block?: Maybe<Block>
  tag?: Maybe<Tag>
  module?: Maybe<Module>
  structuredPage?: Maybe<StructuredPage>
  employee?: Maybe<Employee>
  quote?: Maybe<Quote>
  document?: Maybe<Document>
  startProjectForm?: Maybe<StartProjectForm>
  jobListing?: Maybe<JobListing>
  mailchimpForm?: Maybe<MailchimpForm>
  singularPage?: Maybe<SingularPage>
  blogPost?: Maybe<BlogPost>
  comment?: Maybe<Comment>
  page?: Maybe<Page>
  pdpPagina?: Maybe<PdpPagina>
  assetsConnection: AssetConnection
  contactFormsConnection: ContactFormConnection
  ecosystemsConnection: EcosystemConnection
  blocksConnection: BlockConnection
  tagsConnection: TagConnection
  modulesConnection: ModuleConnection
  structuredPagesConnection: StructuredPageConnection
  employeesConnection: EmployeeConnection
  quotesConnection: QuoteConnection
  documentsConnection: DocumentConnection
  startProjectFormsConnection: StartProjectFormConnection
  jobListingsConnection: JobListingConnection
  mailchimpFormsConnection: MailchimpFormConnection
  singularPagesConnection: SingularPageConnection
  blogPostsConnection: BlogPostConnection
  commentsConnection: CommentConnection
  pagesConnection: PageConnection
  pdpPaginasConnection: PdpPaginaConnection
  node?: Maybe<Node>
}

export type QueryAssetsArgs = {
  where?: Maybe<AssetWhereInput>
  orderBy?: Maybe<AssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryContactFormsArgs = {
  where?: Maybe<ContactFormWhereInput>
  orderBy?: Maybe<ContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryEcosystemsArgs = {
  where?: Maybe<EcosystemWhereInput>
  orderBy?: Maybe<EcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryBlocksArgs = {
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryTagsArgs = {
  where?: Maybe<TagWhereInput>
  orderBy?: Maybe<TagOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryModulesArgs = {
  where?: Maybe<ModuleWhereInput>
  orderBy?: Maybe<ModuleOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryStructuredPagesArgs = {
  where?: Maybe<StructuredPageWhereInput>
  orderBy?: Maybe<StructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryEmployeesArgs = {
  where?: Maybe<EmployeeWhereInput>
  orderBy?: Maybe<EmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryQuotesArgs = {
  where?: Maybe<QuoteWhereInput>
  orderBy?: Maybe<QuoteOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryDocumentsArgs = {
  where?: Maybe<DocumentWhereInput>
  orderBy?: Maybe<DocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryStartProjectFormsArgs = {
  where?: Maybe<StartProjectFormWhereInput>
  orderBy?: Maybe<StartProjectFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryJobListingsArgs = {
  where?: Maybe<JobListingWhereInput>
  orderBy?: Maybe<JobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryMailchimpFormsArgs = {
  where?: Maybe<MailchimpFormWhereInput>
  orderBy?: Maybe<MailchimpFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QuerySingularPagesArgs = {
  where?: Maybe<SingularPageWhereInput>
  orderBy?: Maybe<SingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryBlogPostsArgs = {
  where?: Maybe<BlogPostWhereInput>
  orderBy?: Maybe<BlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryCommentsArgs = {
  where?: Maybe<CommentWhereInput>
  orderBy?: Maybe<CommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryPagesArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryPdpPaginasArgs = {
  where?: Maybe<PdpPaginaWhereInput>
  orderBy?: Maybe<PdpPaginaOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryAssetArgs = {
  where: AssetWhereUniqueInput
}

export type QueryContactFormArgs = {
  where: ContactFormWhereUniqueInput
}

export type QueryEcosystemArgs = {
  where: EcosystemWhereUniqueInput
}

export type QueryBlockArgs = {
  where: BlockWhereUniqueInput
}

export type QueryTagArgs = {
  where: TagWhereUniqueInput
}

export type QueryModuleArgs = {
  where: ModuleWhereUniqueInput
}

export type QueryStructuredPageArgs = {
  where: StructuredPageWhereUniqueInput
}

export type QueryEmployeeArgs = {
  where: EmployeeWhereUniqueInput
}

export type QueryQuoteArgs = {
  where: QuoteWhereUniqueInput
}

export type QueryDocumentArgs = {
  where: DocumentWhereUniqueInput
}

export type QueryStartProjectFormArgs = {
  where: StartProjectFormWhereUniqueInput
}

export type QueryJobListingArgs = {
  where: JobListingWhereUniqueInput
}

export type QueryMailchimpFormArgs = {
  where: MailchimpFormWhereUniqueInput
}

export type QuerySingularPageArgs = {
  where: SingularPageWhereUniqueInput
}

export type QueryBlogPostArgs = {
  where: BlogPostWhereUniqueInput
}

export type QueryCommentArgs = {
  where: CommentWhereUniqueInput
}

export type QueryPageArgs = {
  where: PageWhereUniqueInput
}

export type QueryPdpPaginaArgs = {
  where: PdpPaginaWhereUniqueInput
}

export type QueryAssetsConnectionArgs = {
  where?: Maybe<AssetWhereInput>
  orderBy?: Maybe<AssetOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryContactFormsConnectionArgs = {
  where?: Maybe<ContactFormWhereInput>
  orderBy?: Maybe<ContactFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryEcosystemsConnectionArgs = {
  where?: Maybe<EcosystemWhereInput>
  orderBy?: Maybe<EcosystemOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryBlocksConnectionArgs = {
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryTagsConnectionArgs = {
  where?: Maybe<TagWhereInput>
  orderBy?: Maybe<TagOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryModulesConnectionArgs = {
  where?: Maybe<ModuleWhereInput>
  orderBy?: Maybe<ModuleOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryStructuredPagesConnectionArgs = {
  where?: Maybe<StructuredPageWhereInput>
  orderBy?: Maybe<StructuredPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryEmployeesConnectionArgs = {
  where?: Maybe<EmployeeWhereInput>
  orderBy?: Maybe<EmployeeOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryQuotesConnectionArgs = {
  where?: Maybe<QuoteWhereInput>
  orderBy?: Maybe<QuoteOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryDocumentsConnectionArgs = {
  where?: Maybe<DocumentWhereInput>
  orderBy?: Maybe<DocumentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryStartProjectFormsConnectionArgs = {
  where?: Maybe<StartProjectFormWhereInput>
  orderBy?: Maybe<StartProjectFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryJobListingsConnectionArgs = {
  where?: Maybe<JobListingWhereInput>
  orderBy?: Maybe<JobListingOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryMailchimpFormsConnectionArgs = {
  where?: Maybe<MailchimpFormWhereInput>
  orderBy?: Maybe<MailchimpFormOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QuerySingularPagesConnectionArgs = {
  where?: Maybe<SingularPageWhereInput>
  orderBy?: Maybe<SingularPageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryBlogPostsConnectionArgs = {
  where?: Maybe<BlogPostWhereInput>
  orderBy?: Maybe<BlogPostOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryCommentsConnectionArgs = {
  where?: Maybe<CommentWhereInput>
  orderBy?: Maybe<CommentOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryPagesConnectionArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryPdpPaginasConnectionArgs = {
  where?: Maybe<PdpPaginaWhereInput>
  orderBy?: Maybe<PdpPaginaOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type QueryNodeArgs = {
  id: Scalars['ID']
}

export type Quote = Node & {
  __typename?: 'Quote'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteConnection = {
  __typename?: 'QuoteConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<QuoteEdge>>
  aggregate: AggregateQuote
}

export type QuoteCreateInput = {
  status?: Maybe<Status>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteEdge = {
  __typename?: 'QuoteEdge'
  node: Quote
  cursor: Scalars['String']
}

export enum QuoteOrderByInput {
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

export type QuotePreviousValues = {
  __typename?: 'QuotePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteSubscriptionPayload = {
  __typename?: 'QuoteSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Quote>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<QuotePreviousValues>
}

export type QuoteSubscriptionWhereInput = {
  AND?: Maybe<Array<QuoteSubscriptionWhereInput>>
  OR?: Maybe<Array<QuoteSubscriptionWhereInput>>
  NOT?: Maybe<Array<QuoteSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<QuoteWhereInput>
}

export type QuoteUpdateInput = {
  status?: Maybe<Status>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteUpdateManyMutationInput = {
  status?: Maybe<Status>
  authorName?: Maybe<Scalars['String']>
  authorTitle?: Maybe<Scalars['String']>
  asideTitle?: Maybe<Scalars['String']>
  asideText?: Maybe<Scalars['String']>
  text?: Maybe<Scalars['String']>
}

export type QuoteWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<QuoteWhereInput>>
  OR?: Maybe<Array<QuoteWhereInput>>
  NOT?: Maybe<Array<QuoteWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type QuoteWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type SingularPage = Node & {
  __typename?: 'SingularPage'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  content: Scalars['String']
  title: Scalars['String']
  image?: Maybe<Asset>
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<Page>
}

export type SingularPageConnection = {
  __typename?: 'SingularPageConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<SingularPageEdge>>
  aggregate: AggregateSingularPage
}

export type SingularPageCreateInput = {
  status?: Maybe<Status>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetCreateOneWithoutImageSingularPageInput>
  page?: Maybe<PageCreateOneWithoutSingularPageInput>
}

export type SingularPageCreateManyWithoutImageInput = {
  create?: Maybe<Array<SingularPageCreateWithoutImageInput>>
  connect?: Maybe<Array<SingularPageWhereUniqueInput>>
}

export type SingularPageCreateOneWithoutPageInput = {
  create?: Maybe<SingularPageCreateWithoutPageInput>
  connect?: Maybe<SingularPageWhereUniqueInput>
}

export type SingularPageCreateWithoutImageInput = {
  status?: Maybe<Status>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<PageCreateOneWithoutSingularPageInput>
}

export type SingularPageCreateWithoutPageInput = {
  status?: Maybe<Status>
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetCreateOneWithoutImageSingularPageInput>
}

export type SingularPageEdge = {
  __typename?: 'SingularPageEdge'
  node: SingularPage
  cursor: Scalars['String']
}

export enum SingularPageOrderByInput {
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

export type SingularPagePreviousValues = {
  __typename?: 'SingularPagePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  content: Scalars['String']
  title: Scalars['String']
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type SingularPageScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<SingularPageScalarWhereInput>>
  OR?: Maybe<Array<SingularPageScalarWhereInput>>
  NOT?: Maybe<Array<SingularPageScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type SingularPageSubscriptionPayload = {
  __typename?: 'SingularPageSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<SingularPage>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<SingularPagePreviousValues>
}

export type SingularPageSubscriptionWhereInput = {
  AND?: Maybe<Array<SingularPageSubscriptionWhereInput>>
  OR?: Maybe<Array<SingularPageSubscriptionWhereInput>>
  NOT?: Maybe<Array<SingularPageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<SingularPageWhereInput>
}

export type SingularPageUpdateInput = {
  status?: Maybe<Status>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetUpdateOneWithoutImageSingularPageInput>
  page?: Maybe<PageUpdateOneWithoutSingularPageInput>
}

export type SingularPageUpdateManyDataInput = {
  status?: Maybe<Status>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type SingularPageUpdateManyMutationInput = {
  status?: Maybe<Status>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
}

export type SingularPageUpdateManyWithoutImageInput = {
  create?: Maybe<Array<SingularPageCreateWithoutImageInput>>
  connect?: Maybe<Array<SingularPageWhereUniqueInput>>
  set?: Maybe<Array<SingularPageWhereUniqueInput>>
  disconnect?: Maybe<Array<SingularPageWhereUniqueInput>>
  delete?: Maybe<Array<SingularPageWhereUniqueInput>>
  update?: Maybe<Array<SingularPageUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<SingularPageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<SingularPageScalarWhereInput>>
  upsert?: Maybe<Array<SingularPageUpsertWithWhereUniqueWithoutImageInput>>
}

export type SingularPageUpdateManyWithWhereNestedInput = {
  where: SingularPageScalarWhereInput
  data: SingularPageUpdateManyDataInput
}

export type SingularPageUpdateOneWithoutPageInput = {
  create?: Maybe<SingularPageCreateWithoutPageInput>
  connect?: Maybe<SingularPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<SingularPageUpdateWithoutPageDataInput>
  upsert?: Maybe<SingularPageUpsertWithoutPageInput>
}

export type SingularPageUpdateWithoutImageDataInput = {
  status?: Maybe<Status>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  page?: Maybe<PageUpdateOneWithoutSingularPageInput>
}

export type SingularPageUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  content?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  releaseDate?: Maybe<Scalars['DateTime']>
  image?: Maybe<AssetUpdateOneWithoutImageSingularPageInput>
}

export type SingularPageUpdateWithWhereUniqueWithoutImageInput = {
  where: SingularPageWhereUniqueInput
  data: SingularPageUpdateWithoutImageDataInput
}

export type SingularPageUpsertWithoutPageInput = {
  update: SingularPageUpdateWithoutPageDataInput
  create: SingularPageCreateWithoutPageInput
}

export type SingularPageUpsertWithWhereUniqueWithoutImageInput = {
  where: SingularPageWhereUniqueInput
  update: SingularPageUpdateWithoutImageDataInput
  create: SingularPageCreateWithoutImageInput
}

export type SingularPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<SingularPageWhereInput>>
  OR?: Maybe<Array<SingularPageWhereInput>>
  NOT?: Maybe<Array<SingularPageWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  image?: Maybe<AssetWhereInput>
  page?: Maybe<PageWhereInput>
}

export type SingularPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type StartProjectForm = Node & {
  __typename?: 'StartProjectForm'
  status: Status
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

export type StartProjectFormConnection = {
  __typename?: 'StartProjectFormConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<StartProjectFormEdge>>
  aggregate: AggregateStartProjectForm
}

export type StartProjectFormCreateInput = {
  status?: Maybe<Status>
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

export type StartProjectFormEdge = {
  __typename?: 'StartProjectFormEdge'
  node: StartProjectForm
  cursor: Scalars['String']
}

export enum StartProjectFormOrderByInput {
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

export type StartProjectFormPreviousValues = {
  __typename?: 'StartProjectFormPreviousValues'
  status: Status
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

export type StartProjectFormSubscriptionPayload = {
  __typename?: 'StartProjectFormSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<StartProjectForm>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<StartProjectFormPreviousValues>
}

export type StartProjectFormSubscriptionWhereInput = {
  AND?: Maybe<Array<StartProjectFormSubscriptionWhereInput>>
  OR?: Maybe<Array<StartProjectFormSubscriptionWhereInput>>
  NOT?: Maybe<Array<StartProjectFormSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<StartProjectFormWhereInput>
}

export type StartProjectFormUpdateInput = {
  status?: Maybe<Status>
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

export type StartProjectFormUpdateManyMutationInput = {
  status?: Maybe<Status>
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

export type StartProjectFormWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<StartProjectFormWhereInput>>
  OR?: Maybe<Array<StartProjectFormWhereInput>>
  NOT?: Maybe<Array<StartProjectFormWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type StartProjectFormWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export enum Status {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Archived = 'ARCHIVED',
}

export enum StatusCode {
  Code_404 = 'CODE_404',
  Code_200 = 'CODE_200',
}

export type StructuredPage = Node & {
  __typename?: 'StructuredPage'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<Asset>
  blocks?: Maybe<Array<Block>>
  page?: Maybe<Page>
}

export type StructuredPageBlocksArgs = {
  where?: Maybe<BlockWhereInput>
  orderBy?: Maybe<BlockOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type StructuredPageConnection = {
  __typename?: 'StructuredPageConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<StructuredPageEdge>>
  aggregate: AggregateStructuredPage
}

export type StructuredPageCreateInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<BlockCreateManyWithoutPageInput>
  page?: Maybe<PageCreateOneWithoutStructuredPageInput>
}

export type StructuredPageCreateManyWithoutImageInput = {
  create?: Maybe<Array<StructuredPageCreateWithoutImageInput>>
  connect?: Maybe<Array<StructuredPageWhereUniqueInput>>
}

export type StructuredPageCreateOneWithoutBlocksInput = {
  create?: Maybe<StructuredPageCreateWithoutBlocksInput>
  connect?: Maybe<StructuredPageWhereUniqueInput>
}

export type StructuredPageCreateOneWithoutPageInput = {
  create?: Maybe<StructuredPageCreateWithoutPageInput>
  connect?: Maybe<StructuredPageWhereUniqueInput>
}

export type StructuredPageCreateWithoutBlocksInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageStructuredPageInput>
  page?: Maybe<PageCreateOneWithoutStructuredPageInput>
}

export type StructuredPageCreateWithoutImageInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  blocks?: Maybe<BlockCreateManyWithoutPageInput>
  page?: Maybe<PageCreateOneWithoutStructuredPageInput>
}

export type StructuredPageCreateWithoutPageInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetCreateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<BlockCreateManyWithoutPageInput>
}

export type StructuredPageEdge = {
  __typename?: 'StructuredPageEdge'
  node: StructuredPage
  cursor: Scalars['String']
}

export enum StructuredPageOrderByInput {
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

export type StructuredPagePreviousValues = {
  __typename?: 'StructuredPagePreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  order?: Maybe<Scalars['Int']>
  description: Scalars['String']
  title?: Maybe<Scalars['String']>
}

export type StructuredPageScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<StructuredPageScalarWhereInput>>
  OR?: Maybe<Array<StructuredPageScalarWhereInput>>
  NOT?: Maybe<Array<StructuredPageScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type StructuredPageSubscriptionPayload = {
  __typename?: 'StructuredPageSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<StructuredPage>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<StructuredPagePreviousValues>
}

export type StructuredPageSubscriptionWhereInput = {
  AND?: Maybe<Array<StructuredPageSubscriptionWhereInput>>
  OR?: Maybe<Array<StructuredPageSubscriptionWhereInput>>
  NOT?: Maybe<Array<StructuredPageSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<StructuredPageWhereInput>
}

export type StructuredPageUpdateInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<BlockUpdateManyWithoutPageInput>
  page?: Maybe<PageUpdateOneWithoutStructuredPageInput>
}

export type StructuredPageUpdateManyDataInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type StructuredPageUpdateManyMutationInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
}

export type StructuredPageUpdateManyWithoutImageInput = {
  create?: Maybe<Array<StructuredPageCreateWithoutImageInput>>
  connect?: Maybe<Array<StructuredPageWhereUniqueInput>>
  set?: Maybe<Array<StructuredPageWhereUniqueInput>>
  disconnect?: Maybe<Array<StructuredPageWhereUniqueInput>>
  delete?: Maybe<Array<StructuredPageWhereUniqueInput>>
  update?: Maybe<Array<StructuredPageUpdateWithWhereUniqueWithoutImageInput>>
  updateMany?: Maybe<Array<StructuredPageUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<StructuredPageScalarWhereInput>>
  upsert?: Maybe<Array<StructuredPageUpsertWithWhereUniqueWithoutImageInput>>
}

export type StructuredPageUpdateManyWithWhereNestedInput = {
  where: StructuredPageScalarWhereInput
  data: StructuredPageUpdateManyDataInput
}

export type StructuredPageUpdateOneWithoutBlocksInput = {
  create?: Maybe<StructuredPageCreateWithoutBlocksInput>
  connect?: Maybe<StructuredPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<StructuredPageUpdateWithoutBlocksDataInput>
  upsert?: Maybe<StructuredPageUpsertWithoutBlocksInput>
}

export type StructuredPageUpdateOneWithoutPageInput = {
  create?: Maybe<StructuredPageCreateWithoutPageInput>
  connect?: Maybe<StructuredPageWhereUniqueInput>
  disconnect?: Maybe<Scalars['Boolean']>
  delete?: Maybe<Scalars['Boolean']>
  update?: Maybe<StructuredPageUpdateWithoutPageDataInput>
  upsert?: Maybe<StructuredPageUpsertWithoutPageInput>
}

export type StructuredPageUpdateWithoutBlocksDataInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageStructuredPageInput>
  page?: Maybe<PageUpdateOneWithoutStructuredPageInput>
}

export type StructuredPageUpdateWithoutImageDataInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  blocks?: Maybe<BlockUpdateManyWithoutPageInput>
  page?: Maybe<PageUpdateOneWithoutStructuredPageInput>
}

export type StructuredPageUpdateWithoutPageDataInput = {
  status?: Maybe<Status>
  order?: Maybe<Scalars['Int']>
  description?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<AssetUpdateOneWithoutImageStructuredPageInput>
  blocks?: Maybe<BlockUpdateManyWithoutPageInput>
}

export type StructuredPageUpdateWithWhereUniqueWithoutImageInput = {
  where: StructuredPageWhereUniqueInput
  data: StructuredPageUpdateWithoutImageDataInput
}

export type StructuredPageUpsertWithoutBlocksInput = {
  update: StructuredPageUpdateWithoutBlocksDataInput
  create: StructuredPageCreateWithoutBlocksInput
}

export type StructuredPageUpsertWithoutPageInput = {
  update: StructuredPageUpdateWithoutPageDataInput
  create: StructuredPageCreateWithoutPageInput
}

export type StructuredPageUpsertWithWhereUniqueWithoutImageInput = {
  where: StructuredPageWhereUniqueInput
  update: StructuredPageUpdateWithoutImageDataInput
  create: StructuredPageCreateWithoutImageInput
}

export type StructuredPageWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<StructuredPageWhereInput>>
  OR?: Maybe<Array<StructuredPageWhereInput>>
  NOT?: Maybe<Array<StructuredPageWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  image?: Maybe<AssetWhereInput>
  blocks_every?: Maybe<BlockWhereInput>
  blocks_some?: Maybe<BlockWhereInput>
  blocks_none?: Maybe<BlockWhereInput>
  page?: Maybe<PageWhereInput>
}

export type StructuredPageWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
}

export type Tag = Node & {
  __typename?: 'Tag'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name: Scalars['String']
  pages?: Maybe<Array<Page>>
}

export type TagPagesArgs = {
  where?: Maybe<PageWhereInput>
  orderBy?: Maybe<PageOrderByInput>
  skip?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  before?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  last?: Maybe<Scalars['Int']>
}

export type TagConnection = {
  __typename?: 'TagConnection'
  pageInfo: PageInfo
  edges: Array<Maybe<TagEdge>>
  aggregate: AggregateTag
}

export type TagCreateInput = {
  status?: Maybe<Status>
  name: Scalars['String']
  pages?: Maybe<PageCreateManyWithoutTagsInput>
}

export type TagCreateManyWithoutPagesInput = {
  create?: Maybe<Array<TagCreateWithoutPagesInput>>
  connect?: Maybe<Array<TagWhereUniqueInput>>
}

export type TagCreateWithoutPagesInput = {
  status?: Maybe<Status>
  name: Scalars['String']
}

export type TagEdge = {
  __typename?: 'TagEdge'
  node: Tag
  cursor: Scalars['String']
}

export enum TagOrderByInput {
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

export type TagPreviousValues = {
  __typename?: 'TagPreviousValues'
  status: Status
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  name: Scalars['String']
}

export type TagScalarWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<TagScalarWhereInput>>
  OR?: Maybe<Array<TagScalarWhereInput>>
  NOT?: Maybe<Array<TagScalarWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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

export type TagSubscriptionPayload = {
  __typename?: 'TagSubscriptionPayload'
  mutation: MutationType
  node?: Maybe<Tag>
  updatedFields?: Maybe<Array<Scalars['String']>>
  previousValues?: Maybe<TagPreviousValues>
}

export type TagSubscriptionWhereInput = {
  AND?: Maybe<Array<TagSubscriptionWhereInput>>
  OR?: Maybe<Array<TagSubscriptionWhereInput>>
  NOT?: Maybe<Array<TagSubscriptionWhereInput>>
  mutation_in?: Maybe<Array<MutationType>>
  updatedFields_contains?: Maybe<Scalars['String']>
  updatedFields_contains_every?: Maybe<Array<Scalars['String']>>
  updatedFields_contains_some?: Maybe<Array<Scalars['String']>>
  node?: Maybe<TagWhereInput>
}

export type TagUpdateInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
  pages?: Maybe<PageUpdateManyWithoutTagsInput>
}

export type TagUpdateManyDataInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type TagUpdateManyMutationInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type TagUpdateManyWithoutPagesInput = {
  create?: Maybe<Array<TagCreateWithoutPagesInput>>
  connect?: Maybe<Array<TagWhereUniqueInput>>
  set?: Maybe<Array<TagWhereUniqueInput>>
  disconnect?: Maybe<Array<TagWhereUniqueInput>>
  delete?: Maybe<Array<TagWhereUniqueInput>>
  update?: Maybe<Array<TagUpdateWithWhereUniqueWithoutPagesInput>>
  updateMany?: Maybe<Array<TagUpdateManyWithWhereNestedInput>>
  deleteMany?: Maybe<Array<TagScalarWhereInput>>
  upsert?: Maybe<Array<TagUpsertWithWhereUniqueWithoutPagesInput>>
}

export type TagUpdateManyWithWhereNestedInput = {
  where: TagScalarWhereInput
  data: TagUpdateManyDataInput
}

export type TagUpdateWithoutPagesDataInput = {
  status?: Maybe<Status>
  name?: Maybe<Scalars['String']>
}

export type TagUpdateWithWhereUniqueWithoutPagesInput = {
  where: TagWhereUniqueInput
  data: TagUpdateWithoutPagesDataInput
}

export type TagUpsertWithWhereUniqueWithoutPagesInput = {
  where: TagWhereUniqueInput
  update: TagUpdateWithoutPagesDataInput
  create: TagCreateWithoutPagesInput
}

export type TagWhereInput = {
  _search?: Maybe<Scalars['String']>
  AND?: Maybe<Array<TagWhereInput>>
  OR?: Maybe<Array<TagWhereInput>>
  NOT?: Maybe<Array<TagWhereInput>>
  status?: Maybe<Status>
  status_not?: Maybe<Status>
  status_in?: Maybe<Array<Status>>
  status_not_in?: Maybe<Array<Status>>
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
  pages_every?: Maybe<PageWhereInput>
  pages_some?: Maybe<PageWhereInput>
  pages_none?: Maybe<PageWhereInput>
}

export type TagWhereUniqueInput = {
  id?: Maybe<Scalars['ID']>
  name?: Maybe<Scalars['String']>
}

export type GetBlogPostsQueryVariables = {
  limit: Scalars['Int']
  exclude?: Maybe<Scalars['ID']>
  after: Scalars['DateTime']
  parentId: Scalars['ID']
}

export type GetBlogPostsQuery = { __typename?: 'Query' } & {
  blogPosts: Array<
    Maybe<
      { __typename?: 'BlogPost' } & Pick<BlogPost, 'id' | 'title' | 'publicPublishedAt'> & {
          image: Maybe<{ __typename?: 'Asset' } & Pick<Asset, 'id' | 'handle' | 'url' | 'mimeType'>>
          page: Maybe<
            { __typename?: 'Page' } & Pick<Page, 'id' | 'metaTitle' | 'urlkeynew'> & {
                parent: Maybe<
                  { __typename?: 'Page' } & Pick<Page, 'id' | 'metaTitle' | 'urlkeynew'> & {
                      parent: Maybe<
                        { __typename?: 'Page' } & Pick<Page, 'id' | 'metaTitle' | 'urlkeynew'> & {
                            parent: Maybe<
                              { __typename?: 'Page' } & Pick<
                                Page,
                                'id' | 'metaTitle' | 'urlkeynew'
                              > & {
                                  parent: Maybe<
                                    { __typename?: 'Page' } & Pick<
                                      Page,
                                      'id' | 'metaTitle' | 'urlkeynew'
                                    >
                                  >
                                }
                            >
                          }
                      >
                    }
                >
              }
          >
        }
    >
  >
}

export const GetBlogPostsDocument = gql`
  query GetBlogPosts($limit: Int!, $exclude: ID, $after: DateTime!, $parentId: ID!) {
    blogPosts: blogPosts(
      where: {
        id_not: $exclude
        publicPublishedAt_gte: $after
        status: PUBLISHED
        page: { parent: { id: $parentId } }
      }
      first: $limit
      orderBy: publicPublishedAt_DESC
    ) {
      id
      title
      publicPublishedAt
      image {
        id
        handle
        url
        mimeType
      }
      page {
        id
        metaTitle
        urlkeynew
        parent {
          id
          metaTitle
          urlkeynew
          parent {
            id
            metaTitle
            urlkeynew
            parent {
              id
              metaTitle
              urlkeynew
              parent {
                id
                metaTitle
                urlkeynew
              }
            }
          }
        }
      }
    }
  }
`

/**
 * __useGetBlogPostsQuery__
 *
 * To run a query within a React component, call `useGetBlogPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      exclude: // value for 'exclude'
 *      after: // value for 'after'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useGetBlogPostsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetBlogPostsQuery, GetBlogPostsQueryVariables>,
) {
  return ApolloReactHooks.useQuery<GetBlogPostsQuery, GetBlogPostsQueryVariables>(
    GetBlogPostsDocument,
    baseOptions,
  )
}
export function useGetBlogPostsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBlogPostsQuery,
    GetBlogPostsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetBlogPostsQuery, GetBlogPostsQueryVariables>(
    GetBlogPostsDocument,
    baseOptions,
  )
}
export type GetBlogPostsQueryHookResult = ReturnType<typeof useGetBlogPostsQuery>
export type GetBlogPostsLazyQueryHookResult = ReturnType<typeof useGetBlogPostsLazyQuery>
export type GetBlogPostsQueryResult = ApolloReactCommon.QueryResult<
  GetBlogPostsQuery,
  GetBlogPostsQueryVariables
>
