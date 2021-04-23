import RichText from '@reachdigital/graphcms-ui/RichText'
import ServiceOption from '@reachdigital/next-ui/Row/ServiceOption'
import ServiceOptions from '@reachdigital/next-ui/Row/ServiceOptions'
import PageLink from 'next/link'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

type RowServiceOptionsProps = RowServiceOptionsFragment

export default function RowServiceOptions(props: RowServiceOptionsProps) {
  const { serviceOptionsTitle, serviceOptions } = props

  return (
    <ServiceOptions
      title={serviceOptionsTitle}
      options={serviceOptions.map((serviceOption) => (
        <PageLink key={serviceOption.title} href={serviceOption.url} passHref>
          <ServiceOption
            title={serviceOption.title}
            RichContent={
              serviceOption.description
                ? (richTextOneClasses) => (
                    <RichText {...richTextOneClasses} {...serviceOption.description} />
                  )
                : undefined
            }
          />
        </PageLink>
      ))}
    />
  )
}
