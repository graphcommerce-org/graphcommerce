import { Theme, Typography, TypographyProps } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import clsx from 'clsx'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles()(
  (theme: Theme) => ({
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
  const { classes } = useStyles(props)

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
