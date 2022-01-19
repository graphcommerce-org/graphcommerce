import { Typography, TypographyProps } from '@mui/material'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'

const useStyles = makeStyles({ name: 'SectionHeader' })((theme) => ({
  sectionHeaderSidePadding: {
    paddingLeft: theme.spacings.xxs,
    paddingRight: theme.spacings.xxs,
  },
  sectionHeaderWrapper: {
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacings.sm,
    marginBottom: theme.spacings.xxs,
  },
  labelLeft: {},
  labelRight: {
    color: theme.palette.text.primary,
    lineHeight: 1,
  },
}))

export type SectionHeaderProps = {
  variantLeft?: TypographyProps['variant']
  variantRight?: TypographyProps['variant']
  usePadding?: boolean
} & UseStyles<typeof useStyles> &
  (
    | { labelLeft: React.ReactNode; labelRight?: React.ReactNode }
    | { labelLeft?: React.ReactNode; labelRight: React.ReactNode }
  )

export function SectionHeader(props: SectionHeaderProps) {
  const {
    labelLeft,
    labelRight,
    usePadding,
    variantLeft = 'overline',
    variantRight = 'body2',
  } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

  return (
    <div
      className={clsx({
        [classes.sectionHeaderWrapper]: true,
        [classes.sectionHeaderSidePadding]: usePadding,
      })}
    >
      <Typography
        className={classes.labelLeft}
        variant={variantLeft}
        color='textSecondary'
        component='div'
      >
        {labelLeft}
      </Typography>
      {labelRight && (
        <Typography
          className={classes.labelRight}
          variant={variantRight}
          color='textSecondary'
          component='div'
        >
          {labelRight}
        </Typography>
      )}
    </div>
  )
}
