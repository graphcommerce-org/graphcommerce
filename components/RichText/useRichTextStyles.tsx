import { makeStyles } from '@material-ui/core'
import { vpCalc, UseStyles } from 'components/Theme'

const useRichTextStyles = makeStyles(
  ({ spacings, typography }) => ({
    root: { '&:empty': { display: 'none' }, '&:last-child': { marginBottom: 0 } },
    paragraph: { marginBottom: '1em' },
    h1: { marginTop: vpCalc(9, 0), marginBottom: vpCalc(21, 50) },
    h2: {
      marginTop: vpCalc(22, 40),
      marginBottom: vpCalc(20, 40),
      ...typography.h4,
      '&:first-child': { marginTop: 0 },
    },
    h3: {
      marginTop: vpCalc(22, 30),
      marginBottom: vpCalc(22, 30),
      '&:first-child': { marginTop: 0 },
    },
    h4: {
      marginTop: vpCalc(11, 30),
      marginBottom: vpCalc(11, 30),
      '&:first-child': { marginTop: 0 },
    },
    h5: {
      marginTop: vpCalc(7, 20),
      marginBottom: vpCalc(7, 20),
      '&:first-child': { marginTop: 0 },
    },
    h6: { '&:first-of-type': { marginTop: 0 } },
    asset: { width: '100%', height: 'auto' },
    blockQuote: {},
    ol: { marginBottom: '1em' },
    ul: { marginBottom: '1em' },
    strong: {},
    italic: {},
    underlined: {},
    code: {},
    aspectContainer: {
      position: 'relative',
      paddingTop: 'calc(100% / 16 * 9)',
      marginBottom: spacings.md,
      '& > *': {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
    },
    iframe: {},
    table: {},
    link: { wordBreak: 'break-word' },
  }),
  { name: 'RichText' },
)
export type UseRichTextStyles = UseStyles<typeof useRichTextStyles>

export default useRichTextStyles
