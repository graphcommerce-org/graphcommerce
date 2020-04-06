import React from 'react'
import Link from '../Link'
import { GQLLocalizationFragment } from '../../generated/graphql'

const Language: React.FC<GQLLocalizationFragment> = ({ localizations }) => (
  <>
    {localizations.map((localization) => (
      <Link metaRobots={localization.metaRobots!} href={localization.url} key={localization.url}>
        Read in {localization.locale}
      </Link>
    ))}
  </>
)

export default Language
