import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    sectionHeader: {
      position: 'relative',
      '&:focus': {
        outline: 'none',
      },
    },
    sectionHeaderSidePadding: {
      paddingLeft: theme.spacings.xxs,
      paddingRight: theme.spacings.xxs,
    },
    sectionHeaderWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacings.xxs,
    },
    labelLeft: {},
    labelRight: {
      color: theme.palette.primary.contrastText,
    },
  }),
  { name: 'SectionHeader' },
)

export type SectionHeaderProps = {
  variantLeft?: TypographyProps['variant']
  variantRight?: TypographyProps['variant']
  usePadding?: boolean
} & UseStyles<typeof useStyles> &
  (
    | { labelLeft: React.ReactNode; labelRight?: React.ReactNode }
    | { labelLeft?: React.ReactNode; labelRight: React.ReactNode }
  )

export default function SectionHeader(props: SectionHeaderProps) {
  const {
    labelLeft,
    labelRight,
    usePadding,
    variantLeft = 'overline',
    variantRight = 'body2',
  } = props
  const classes = useStyles(props)

  return (
    <div
      className={clsx(classes.sectionHeader, { [classes.sectionHeaderSidePadding]: usePadding })}
    >
      <div className={classes.sectionHeaderWrapper}>
        <Typography className={classes.labelLeft} variant={variantLeft} component='div'>
          {labelLeft}
        </Typography>
        {labelRight && (
          <Typography className={classes.labelRight} variant={variantRight} component='div'>
            {labelRight}
          </Typography>
        )}
      </div>
    </div>
  )
}
