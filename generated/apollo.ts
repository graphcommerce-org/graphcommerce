import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'

export const BlogListItemFragmentDoc = gql`
  fragment BlogListItem on Page {
    id
    documentInStages(includeCurrent: true, stages: [PUBLISHED]) {
      publishedAt
    }
    title
    metaRobots
    url
    locale
  }
`
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
      url
      localizations(locales: [$locale], includeCurrent: true) {
        locale
        id
        title
        metaRobots
        url
      }
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
    alt
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
    id
    locale
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
        ...Asset
      }
    }
  }
  ${AssetFragmentDoc}
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
export const GetBlogListDocument = gql`
  query GetBlogList($url: String!, $locale: Locale!) {
    blogPosts: pages(
      where: { url_starts_with: $url }
      locales: [$locale]
      orderBy: publishedAt_DESC
      first: 100
    ) {
      ...BlogListItem
    }
  }
  ${BlogListItemFragmentDoc}
`

/**
 * __useGetBlogListQuery__
 *
 * To run a query within a React component, call `useGetBlogListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBlogListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBlogListQuery({
 *   variables: {
 *      url: // value for 'url'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useGetBlogListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetBlogListQuery,
    GQLGetBlogListQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>(
    GetBlogListDocument,
    baseOptions,
  )
}
export function useGetBlogListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetBlogListQuery,
    GQLGetBlogListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetBlogListQuery, GQLGetBlogListQueryVariables>(
    GetBlogListDocument,
    baseOptions,
  )
}
export type GetBlogListQueryHookResult = ReturnType<typeof useGetBlogListQuery>
export type GetBlogListLazyQueryHookResult = ReturnType<typeof useGetBlogListLazyQuery>
export type GetBlogListQueryResult = ApolloReactCommon.QueryResult<
  GQLGetBlogListQuery,
  GQLGetBlogListQueryVariables
>
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
export const SubmitContactFormDocument = gql`
  mutation SubmitContactForm(
    $name: String!
    $email: String!
    $phoneNumber: String
    $subject: ContactSubject! = NEW_PROJECT
    $message: String!
  ) {
    createContactForm(
      data: {
        name: $name
        email: $email
        phoneNumber: $phoneNumber
        subject: $subject
        message: $message
      }
    ) {
      id
    }
  }
`
export type GQLSubmitContactFormMutationFn = ApolloReactCommon.MutationFunction<
  GQLSubmitContactFormMutation,
  GQLSubmitContactFormMutationVariables
>

/**
 * __useSubmitContactFormMutation__
 *
 * To run a mutation, you first call `useSubmitContactFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitContactFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitContactFormMutation, { data, loading, error }] = useSubmitContactFormMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phoneNumber: // value for 'phoneNumber'
 *      subject: // value for 'subject'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSubmitContactFormMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLSubmitContactFormMutation,
    GQLSubmitContactFormMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    GQLSubmitContactFormMutation,
    GQLSubmitContactFormMutationVariables
  >(SubmitContactFormDocument, baseOptions)
}
export type SubmitContactFormMutationHookResult = ReturnType<typeof useSubmitContactFormMutation>
export type SubmitContactFormMutationResult = ApolloReactCommon.MutationResult<
  GQLSubmitContactFormMutation
>
export type SubmitContactFormMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLSubmitContactFormMutation,
  GQLSubmitContactFormMutationVariables
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
      id
      locale
      url
      localizations {
        id
        locale
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
export const GetDraftPagesDocument = gql`
  query GetDraftPages($skip: Int! = 0) {
    pages(stage: DRAFT, skip: $skip) {
      url
      id
      stage
    }
  }
`

/**
 * __useGetDraftPagesQuery__
 *
 * To run a query within a React component, call `useGetDraftPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftPagesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetDraftPagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GQLGetDraftPagesQuery,
    GQLGetDraftPagesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GQLGetDraftPagesQuery, GQLGetDraftPagesQueryVariables>(
    GetDraftPagesDocument,
    baseOptions,
  )
}
export function useGetDraftPagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GQLGetDraftPagesQuery,
    GQLGetDraftPagesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GQLGetDraftPagesQuery, GQLGetDraftPagesQueryVariables>(
    GetDraftPagesDocument,
    baseOptions,
  )
}
export type GetDraftPagesQueryHookResult = ReturnType<typeof useGetDraftPagesQuery>
export type GetDraftPagesLazyQueryHookResult = ReturnType<typeof useGetDraftPagesLazyQuery>
export type GetDraftPagesQueryResult = ApolloReactCommon.QueryResult<
  GQLGetDraftPagesQuery,
  GQLGetDraftPagesQueryVariables
>
export const PublishPageDocument = gql`
  mutation PublishPage($id: ID!, $locales: [Locale!]!) {
    publishPage(where: { id: $id }, publishBase: true, locales: $locales, to: PUBLISHED) {
      id
    }
  }
`
export type GQLPublishPageMutationFn = ApolloReactCommon.MutationFunction<
  GQLPublishPageMutation,
  GQLPublishPageMutationVariables
>

/**
 * __usePublishPageMutation__
 *
 * To run a mutation, you first call `usePublishPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishPageMutation, { data, loading, error }] = usePublishPageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      locales: // value for 'locales'
 *   },
 * });
 */
export function usePublishPageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLPublishPageMutation,
    GQLPublishPageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<GQLPublishPageMutation, GQLPublishPageMutationVariables>(
    PublishPageDocument,
    baseOptions,
  )
}
export type PublishPageMutationHookResult = ReturnType<typeof usePublishPageMutation>
export type PublishPageMutationResult = ApolloReactCommon.MutationResult<GQLPublishPageMutation>
export type PublishPageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLPublishPageMutation,
  GQLPublishPageMutationVariables
>
export const UpdatePageDocument = gql`
  mutation UpdatePage($id: ID!, $page: PageUpdateInput!) {
    updatePage(data: $page, where: { id: $id }) {
      id
    }
  }
`
export type GQLUpdatePageMutationFn = ApolloReactCommon.MutationFunction<
  GQLUpdatePageMutation,
  GQLUpdatePageMutationVariables
>

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    GQLUpdatePageMutation,
    GQLUpdatePageMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<GQLUpdatePageMutation, GQLUpdatePageMutationVariables>(
    UpdatePageDocument,
    baseOptions,
  )
}
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>
export type UpdatePageMutationResult = ApolloReactCommon.MutationResult<GQLUpdatePageMutation>
export type UpdatePageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  GQLUpdatePageMutation,
  GQLUpdatePageMutationVariables
>
