import { Container } from '@material-ui/core'
import { RowProductGridFragment } from './RowProductGrid.gql'

export default function RowProductGrid(props: RowProductGridFragment) {
  const { title, pageLinks } = props

  return (
    <Container maxWidth={false}>
      <h2>{title}</h2>
    </Container>
  )
}
