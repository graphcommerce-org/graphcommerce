import { RichText } from '@graphcommerce/hygraph-ui'
import {
  IconBlock,
  IconBlocks,
  iconChat,
  iconEmail,
  iconPhone,
  IconSvg,
} from '@graphcommerce/next-ui'
import { RowServiceOptionsFragment } from './RowServiceOptions.gql'

type RowServiceOptionsProps = RowServiceOptionsFragment

export function RowServiceOptions(props: RowServiceOptionsProps) {
  const { title, serviceOptions } = props

  return (
    <IconBlocks title={title}>
      {serviceOptions.map((serviceOption) => {
        const iconTitle = serviceOption.title.toLowerCase()

        return (
          <IconBlock
            key={serviceOption.title}
            href={serviceOption.url}
            title={serviceOption.title}
            icon={
              <>
                {iconTitle === 'e-mail' && <IconSvg src={iconEmail} size='large' />}
                {iconTitle === 'phone' && <IconSvg src={iconPhone} size='large' />}
                {iconTitle === 'chat' && <IconSvg src={iconChat} size='large' />}
              </>
            }
          >
            {serviceOption.description ? <RichText {...serviceOption.description} /> : undefined}
          </IconBlock>
        )
      })}
    </IconBlocks>
  )
}
