import { PageOptions } from '@graphcommerce/framer-next-pages'
import { Money } from '@graphcommerce/magento-store'
import { LayoutTitle, ActionableCard } from '@graphcommerce/next-ui'
import { Container } from '@mui/material'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'

export default function ActionableCardPage() {
  return (
    <Container>
      <LayoutTitle variant='h1'>Actionable Card</LayoutTitle>
      <ActionableCard price={<Money currency='EUR' value={19.95} />} actions={['Hoi', 'hoi2']} />
    </Container>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  layoutProps: {},
}
ActionableCardPage.pageOptions = pageOptions
