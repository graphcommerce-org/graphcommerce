import { makeStyles } from '@material-ui/core'
import { vpCalc } from '../Theme'

export type RichTextStylesProps = {
  condensed: boolean
}

const useRichTextStyles = makeStyles(
  {
    body1: ({ condensed }: RichTextStylesProps) => ({
      ...(!condensed && { marginBottom: '1em' }),
    }),
    h1: ({ condensed }) => ({
      fontWeight: 400,
      ...(!condensed && { marginTop: vpCalc(9, 0), marginBottom: vpCalc(21, 50) }),
    }),
    h2: ({ condensed }) => ({
      ...(!condensed && { marginTop: vpCalc(22, 40), marginBottom: vpCalc(20, 40) }),
    }),
    h3: ({ condensed }) => ({
      ...(!condensed && { marginTop: vpCalc(22, 30), marginBottom: vpCalc(22, 30) }),
    }),
    asset: { width: '100%', height: 'auto' },
  },
  { name: 'RichText' },
)

export default useRichTextStyles
