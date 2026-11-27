import type { SxRenderer } from './types'

export const defaultSxRenderer: SxRenderer = {
  all: {
    '&:empty': { display: 'none' },
  },
  first: { marginTop: 0 },
  last: { marginBottom: 0 },
  paragraph: {
    marginBottom: '1em',
    wordBreak: 'break-word',
  },
  h1: { marginTop: '0.5em', marginBottom: '0.5em' },
  h2: { marginTop: '0.5em', marginBottom: '0.5em' },
  h3: { marginTop: '0.5em', marginBottom: '0.5em' },
  h4: { marginTop: '0.5em', marginBottom: '0.5em' },
  h5: { marginTop: '0.5em', marginBottom: '0.5em' },
  h6: { marginTop: '0.5em', marginBottom: '0.5em' },
  blockquote: (theme) => ({
    paddingLeft: theme.spacings.sm,
    margin: `${theme.spacings.md} 0`,
  }),
  bullet_list: { marginBottom: '1em' },
  ordered_list: { marginBottom: '1em' },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    '& img': { display: 'block', width: '100%', height: 'auto' },
  },
  code_block: {
    width: 'fit-content',
    maxWidth: '100%',
    padding: 5,
    overflow: 'auto',
  },
  code: {
    padding: '0.1em 0.3em',
    borderRadius: 3,
    fontSize: '0.9em',
  },
  table: (theme) => ({
    display: 'table',
    width: '100%',
    borderSpacing: '2px',
    borderCollapse: 'collapse',
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.sm,
    '& thead, tbody': {
      '& td': { padding: '10px 20px' },
    },
    '& thead tr td p': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '& tbody': {
      display: 'table-row-group',
      verticalAlign: 'center',
      borderColor: 'inherit',
      '& tr:nth-of-type(odd)': {
        background: theme.vars.palette.background.paper,
      },
      '& td': {
        [theme.breakpoints.up('sm')]: { minWidth: 150 },
      },
    },
  }),
  link: { wordBreak: 'break-word' },
  underline: { textDecoration: 'underline' },
}
