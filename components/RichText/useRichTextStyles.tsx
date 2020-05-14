import { makeStyles } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'

const useRichTextStyles = makeStyles(
  {
    root: { '&:empty': { display: 'none' } },
    paragraph: { marginBottom: '1em' },
    h1: { marginTop: vpCalc(9, 0), marginBottom: vpCalc(21, 50) },
    h2: { marginTop: vpCalc(22, 40), marginBottom: vpCalc(20, 40) },
    h3: { marginTop: vpCalc(22, 30), marginBottom: vpCalc(22, 30) },
    h4: { marginTop: vpCalc(11, 30), marginBottom: vpCalc(11, 30) },
    h5: { marginTop: vpCalc(7, 20), marginBottom: vpCalc(7, 20) },
    h6: {},
    asset: { width: '100%', height: 'auto' },
    blockQuote: {},
    ol: {},
    ul: {},
    strong: {},
    italic: {},
    underlined: {},
    code: {},
    iframe: {},
    table: {},
    link: {},
  },
  { name: 'RichText' },
)
export type UseRichTextStyles = UseStyles<typeof useRichTextStyles>

export default useRichTextStyles
