import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useRichTextStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      '&:empty': {
        display: 'none',
      },
      '&:last-child': {
        marginBottom: 0,
      },
    },
    paragraph: {
      marginBottom: '1em',
      wordBreak: 'break-word',
    },
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
    h6: {
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    asset: {
      width: '100%',
      height: 'auto',
    },
    blockQuote: {
      paddingLeft: theme.spacings.sm,
      margin: `${theme.spacings.md} 0`,
    },
    ol: {
      marginBottom: '1em',
    },
    ul: {
      marginBottom: '1em',
    },
    strong: {},
    italic: {},
    underlined: {},
    code: {
      width: 'fit-content',
      maxWidth: '100%',
      padding: 5,
      overflow: 'scroll',
    },
    iframe: {},
    aspectContainer: {},
    table: {
      display: 'table',
      width: '100%',
      borderSpacing: '2px',
      borderCollapse: 'collapse',
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.sm,
      '& thead, tbody': {
        '& td': {
          padding: '10px 20px',
        },
      },
      '& thead': {
        '& tr': {
          '& td': {
            '& p': {
              fontWeight: theme.typography.fontWeightBold,
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
            background: theme.palette.background.paper,
          },
        },
        '& td': {
          [theme.breakpoints.up('sm')]: {
            minWidth: '150px',
          },
          '& p': {},
        },
      },
    },
    link: {
      wordBreak: 'break-word',
    },
  }),
  { name: 'RichText' },
)
export type UseRichTextStyles = UseStyles<typeof useRichTextStyles>

export default useRichTextStyles
