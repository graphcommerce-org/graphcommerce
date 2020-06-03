import React from 'react'
import clsx from 'clsx'
import { Container, Typography, Link, makeStyles, Theme, Button } from '@material-ui/core'
import { useHeaderSpacing } from 'components/Header'
import { ChevronRight } from 'components/Icons'
import { vpCalc } from 'components/Theme'
import useRowVacancyStyles from 'components/RowVacancy/Styles'

type RowVacancyProps = GQLVacancyListItemFragment &
  UseStyles<typeof useRowVacancyStyles> &
  LinkProps

const RowVacancy: React.FC<RowVacancyProps> = (props) => {
  const { title, content } = props
  const classes = useRowVacancyStyles(props)
  const headerSpacing = useHeaderSpacing()
  const rowType = content[0].__typename
  const status = content[0].vacancystatus

  return (
    <div className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}>
      <Container maxWidth='lg'>
        <Typography variant='h1'>{title}</Typography>
        {rowType === 'RowVacancy' && status === 'NOT_AVAILABLE' && (
          <span className={classes.status}>
            Deze vacature is niet meer beschikbaar,
            <Link href='/vacatures' color='inherit' underline='always' className={classes.link}>
              bekijk alle vacatures
            </Link>
          </span>
        )}
        <div className={classes.ctaBlock}>
          <span className={classes.ctaText}>
            Meer over onze kijk op e-Commerce en alle details van deze vacature hebben we
            beschikbaar in een handige PDF.
          </span>
          {content[0].pdf.url && (
            <Button
              href={content[0].pdf.url}
              target='_blank'
              variant='contained'
              color='primary'
              endIcon={<ChevronRight color='inherit' />}
              size='large'
              disableElevation
              className={classes.button}
            >
              Download PDF
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default RowVacancy
