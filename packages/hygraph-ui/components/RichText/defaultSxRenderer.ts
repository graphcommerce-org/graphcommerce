import type { SxRenderer } from './types'

export const defaultSxRenderer: SxRenderer = {
  all: {
    '&:empty:not(iframe)': {
      display: 'none',
    },
  },
  first: {
    marginTop: 0,
  },
  last: {
    marginBottom: 0,
  },
  paragraph: {
    marginBottom: '1em',
    wordBreak: 'break-word',
  },
  'heading-one': {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  'heading-two': {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  'heading-three': {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  'heading-four': {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  'heading-five': {
    marginTop: '0.5em',
    marginBottom: '0.5em',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  video: {
    width: '100%',
    height: 'auto',
  },
  'block-quote': (theme) => ({
    paddingLeft: theme.spacings.sm,
    margin: `${theme.spacings.md} 0`,
  }),
  'bulleted-list': {
    marginBottom: '1em',
  },
  'numbered-list': {
    marginBottom: '1em',
  },
  code: {
    width: 'fit-content',
    maxWidth: '100%',
    padding: 5,
    overflow: 'scroll',
  },
  table: (theme) => ({
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
        '&:nth-of-type(odd)': {
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
  }),
  link: {
    wordBreak: 'break-word',
  },
  underlined: {
    textDecoration: 'underline',
  },
  iframe: {},
}
