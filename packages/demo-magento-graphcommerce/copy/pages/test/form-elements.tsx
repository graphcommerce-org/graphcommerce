import {
  ActionCardListForm,
  CheckboxButtonGroup,
  NumberFieldElement,
  RadioButtonGroup,
  SelectElement,
  TextFieldElement,
} from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  ActionCard,
  Button,
  Form,
  FormActions,
  FormRow,
  LayoutHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { FormAutoSubmit, FormPersist, useForm } from '@graphcommerce/react-hook-form'
import { Container, List, ListItem, TextField, Typography } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutMinimal } from '../../components'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type FormValues = {
  checkboxButtonGroup: string[]
  selectElement: string
  textFieldElement: string
  numberFieldElement: number
  actionCardList: string
}

export default function IconsPage() {
  const form = useForm<FormValues>()
  const { control, handleSubmit } = form

  const submit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <>
      <LayoutHeader />

      <LayoutTitle variant='h1'>Form Elements</LayoutTitle>

      <Container maxWidth='md'>
        <Form onSubmit={submit} contained background='default'>
          <FormRow>
            <CheckboxButtonGroup
              control={control}
              label='Checkbox Button Group'
              name='checkboxButtonGroup'
              options={[
                { id: 'one', label: 'One' },
                { id: 'two', label: 'Two' },
              ]}
            />
          </FormRow>

          <FormRow>
            <SelectElement
              control={control}
              name='selectElement'
              label='Select Element'
              options={[
                { id: 'one', label: 'One' },
                { id: 'two', label: 'Two' },
              ]}
            />

            <SelectElement
              control={control}
              name='selectElement'
              SelectProps={{ native: true }}
              label='Select Element Native'
              options={[
                { id: 'one', label: 'One' },
                { id: 'two', label: 'Two' },
              ]}
            />
          </FormRow>

          <FormRow>
            <RadioButtonGroup
              control={control}
              name='selectElement'
              label='Radio Button Group'
              options={[
                { id: 'one', label: 'Radio One' },
                { id: 'two', label: 'Radio Two' },
              ]}
            />
          </FormRow>

          <FormRow>
            <TextFieldElement control={control} name='textFieldElement' label='TextFieldElement' />
            <NumberFieldElement
              defaultValue={0}
              control={control}
              name='numberFieldElement'
              label='Number'
              variant='standard'
              inputProps={{ min: 1 }}
              InputProps={{ disableUnderline: true }}
            />
          </FormRow>

          <Typography variant='h6'>Action Card List</Typography>

          <FormRow>
            <ActionCardListForm
              control={control}
              name='actionCardList'
              layout='grid'
              items={[
                { value: 'one', title: 'One' },
                { value: 'two', title: 'Two' },
              ]}
              render={ActionCard}
            />
          </FormRow>

          <FormActions>
            <Button type='submit' variant='pill' color='primary' size='large'>
              Submit
            </Button>
          </FormActions>

          <List>
            <ListItem>Form is persisted with FormPersist</ListItem>
            <ListItem>
              Form is automatically submitted with FormAutoSubmit when the Number field changes
            </ListItem>
          </List>

          <FormAutoSubmit control={control} submit={submit} name={['numberFieldElement']} />
          <FormPersist<FormValues> form={form} name='form-elements' />
        </Form>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
IconsPage.pageOptions = pageOptions

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
