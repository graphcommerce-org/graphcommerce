import { makeStyles } from '@material-ui/core'
import { vpCalc } from '../Theme'

const useRichTextStyles = makeStyles({
  body1: { marginBottom: '1em' },
  h1: { marginTop: vpCalc(9, 0), marginBottom: vpCalc(21, 50), fontWeight: 400 },
  h2: { marginTop: vpCalc(22, 40), marginBottom: vpCalc(20, 40) },
  h3: { marginTop: vpCalc(22, 30), marginBottom: vpCalc(22, 30) },

  asset: { width: '100%', height: 'auto' },
})

export default useRichTextStyles
