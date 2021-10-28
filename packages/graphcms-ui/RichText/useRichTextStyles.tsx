import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'

const useRichTextStyles = makeStyles(
  ({ spacings, breakpoints, palette, typography }: Theme) => ({
    root: { '&:empty': { display: 'none' }, '&:last-child': { marginBottom: 0 } },
    paragraph: { marginBottom: '1em', wordBreak: 'break-word' },
    h1: {
      marginTop: '0.5em',
      marginBottom: '0.5em',
    },
    h2: {
      marginTop: '0.5em',
      marginBottom: '0.5em',
      '&:first-child': { marginTop: 0 },
    },
    h3: {
      marginTop: '0.5em',
      marginBottom: '0.5em',
      '&:first-child': { marginTop: 0 },
    },
    h4: {
      marginTop: responsiveVal(11, 30),
      marginBottom: responsiveVal(11, 30),
      '&:first-child': { marginTop: 0 },
    },
    h5: {
      marginTop: responsiveVal(7, 20),
      marginBottom: responsiveVal(7, 20),
      '&:first-child': { marginTop: 0 },
    },
    h6: { '&:first-of-type': { marginTop: 0 } },
    asset: { width: '100%', height: 'auto' },
    blockQuote: {
      color: '#777',
      borderLeft: '4px solid #999',
      paddingLeft: spacings.sm,
      margin: `${spacings.md} 0`,
    },
    ol: { marginBottom: '1em' },
    ul: { marginBottom: '1em' },
    strong: {},
    italic: {},
    underlined: {},
    code: {
      width: 'fit-content',
      maxWidth: '100%',
      background: '#d8d8d8',
      padding: 5,
      fontSize: 17,
      overflow: 'scroll',
    },
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
    table: {
      display: 'table',
      width: '100%',
      borderSpacing: '2px',
      borderCollapse: 'collapse',
      marginTop: spacings.md,
      marginBottom: spacings.sm,

      '& thead, tbody': {
        '& td': {
          padding: '10px 20px',
        },
      },

      '& thead': {
        '& tr': {
          '& td': {
            '& p': {
              fontWeight: typography.fontWeightBold,
            },
          },
        },
      },
      '& tbody': {
        display: 'table-row-group',
        verticalAlign: 'center',
        borderColor: 'inherit',

        '& tr': {
          '&:nth-child(odd)': {
            background: palette.background.highlight,
          },
        },

        '& td': {
          [breakpoints.up('sm')]: {
            minWidth: '150px',
          },

          '& p': { fontSize: responsiveVal(12, 15) },
        },
      },
    },
    link: { wordBreak: 'break-word' },
  }),
  { name: 'RichText' },
)
export type UseRichTextStyles = UseStyles<typeof useRichTextStyles>

export default useRichTextStyles
