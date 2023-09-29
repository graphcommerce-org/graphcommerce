import { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  ActionCard,
  ActionCardItemRenderProps,
  ActionCardListForm,
  GetStaticProps,
} from '@graphcommerce/next-ui'
import { Box, Container } from '@mui/material'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../components'
import { graphqlSsrClient, graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'
import { useForm } from '@graphcommerce/ecommerce-ui'

type Person = { name: string; job: string; value: number }

const PersonCard = (props: ActionCardItemRenderProps<Person>) => {
  const { job, name, value, onClick, onReset, selected, ...cardProps } = props
  return (
    <ActionCard
      title={name}
      value={value}
      details={job}
      after={<Box>After</Box>}
      onClick={
        onClick &&
        ((event) => {
          if (selected) {
            console.log('Was selected')
            onReset(event)
          } else {
            console.log('new select')
            onClick?.(event, value)
          }
        })
      }
      selected={selected}
      {...cardProps}
    />
  )
}

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function Playground() {
  const form = useForm()
  const { control, getValues } = form
  console.log(getValues())
  globalThis.aaa = getValues

  const persons = [
    {
      name: 'Frank',
      job: 'FE dev',
      value: 1,
    },
    {
      name: 'Laurens',
      job: 'FE dev',
      value: 2,
    },
    {
      name: 'Tim',
      job: 'Architect',
      value: 3,
    },
  ]

  return (
    <>
      <PageMeta title='Playground' metaRobots={['noindex']} />
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={16} mb={16}>
          <h1>Playground</h1>

          <Box>
            {' '}
            <h2>ActionCard</h2>
            <ActionCard
              value='Frank'
              action={<Box>Action</Box>}
              after={<Box>Dit is de after.</Box>}
              color='primary'
              details={<Box>Dit is details.</Box>}
              // selected
              reset={<Box>Dit is de reset.</Box>}
              secondaryAction={<Box>Dit is de secondaryaction.</Box>}
              title='Title'
              onClick={() => console.log('onclick')}
            />
            <hr />
          </Box>
          <h2>ActionCardListForm</h2>
          <ActionCardListForm
            name='person'
            items={persons}
            control={control}
            render={PersonCard}
            defaultValue={3}
          />
        </Box>
      </Container>
    </>
  )
}

Playground.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default Playground

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
