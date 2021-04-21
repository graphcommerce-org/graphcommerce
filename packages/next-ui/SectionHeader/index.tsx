import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    labelContainer: {
      position: 'relative',
      '&:focus': {
        outline: 'none',
      },
    },
    labelContainerSidePadding: {
      paddingLeft: theme.spacings.xxs,
      paddingRight: theme.spacings.xxs,
    },
    labelInnerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: responsiveVal(6, 12),
    },
    labelLeft: {
      ...theme.typography.body2,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontWeight: 500,
      color: theme.palette.secondary.mutedText,
    },
    labelRight: {
      ...theme.typography.body2,
      color: theme.palette.primary.contrastText,
    },
  }),
  { name: 'SectionHeader' },
)

export type SectionHeaderProps = {
  labelLeft: React.ReactNode
  labelRight?: React.ReactNode
  usePadding?: boolean
} & UseStyles<typeof useStyles>

export default function SectionHeader(props: SectionHeaderProps) {
  const { labelLeft, labelRight, usePadding } = props
  const classes = useStyles(props)

  return (
    <div
      className={clsx(classes.labelContainer, {
        [classes.labelContainerSidePadding]: usePadding,
      })}
    >
      <div className={classes.labelInnerContainer}>
        <div className={classes.labelLeft}>{labelLeft}</div>
        {labelRight && <div className={classes.labelRight}>{labelRight}</div>}
      </div>
    </div>
  )
}
