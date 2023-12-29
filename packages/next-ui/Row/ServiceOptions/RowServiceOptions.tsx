import { RichText } from '../RichText'
import { iconChat, iconEmail, iconPhone } from '../../icons'
import { IconSvg } from '../../IconSvg'
import { IconBlock } from '../IconBlocks/IconBlock'
import { IconBlocks } from '../IconBlocks/IconBlocks'
import { RowServiceOptionsProps } from './type'

export function RowServiceOptions(props: RowServiceOptionsProps) {
  const { title, options } = props

  return (
    <IconBlocks title={title}>
      {options.map((option) => {
        const iconTitle = option.title.toLowerCase()

        return (
          <IconBlock
            key={option.title}
            href={option.url}
            title={option.title}
            icon={
              <>
                {iconTitle === 'e-mail' && <IconSvg src={iconEmail} size='large' />}
                {iconTitle === 'phone' && <IconSvg src={iconPhone} size='large' />}
                {iconTitle === 'chat' && <IconSvg src={iconChat} size='large' />}
              </>
            }
          >
            {option.description ? <RichText {...option.description} /> : undefined}
          </IconBlock>
        )
      })}
    </IconBlocks>
  )
}
