import Grid from '../components/Grid'
import StackDebug from '../components/StackedDebugger'

function Index() {
  return (
    <div style={{ paddingLeft: 60, paddingRight: 20 }}>
      <StackDebug />
      <Grid />
    </div>
  )
}

export default Index
