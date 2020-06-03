import React from 'react'
import clsx from 'clsx'
import { Container, Typography, Link, Button } from '@material-ui/core'
import { UseStyles } from 'components/Theme'
import { useHeaderSpacing } from 'components/Header'
import { ChevronRight } from 'components/Icons'
import useRowVacancyStyles from 'components/RowVacancy/Styles'
import RichText from 'components/RichText'

type RowVacancyProps = GQLRowVacancyFragment & UseStyles<typeof useRowVacancyStyles>

const RowVacancy: React.FC<RowVacancyProps> = (props) => {
  const { text, vacancystatus, pdf, __typename } = props
  const classes = useRowVacancyStyles(props)
  const headerSpacing = useHeaderSpacing()

  return (
    <div className={clsx(headerSpacing.paddingTop, headerSpacing.paddingBottom, classes.root)}>
      <Container maxWidth='lg'>
        <RichText {...text} />
        {__typename === 'RowVacancy' && vacancystatus === 'NOT_AVAILABLE' && (
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
          {pdf?.url && (
            <Button
              href={pdf.url}
              target='_blank'
              variant='contained'
              color='primary'
              endIcon={<ChevronRight />}
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
