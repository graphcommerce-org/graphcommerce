import { Box } from '@material-ui/core'
import React from 'react'
import Title, { TitleProps } from '../../Title'
import useAppShellHeaderContext from '../AppShellHeader/useAppShellHeaderContext'

type AppShellTitleProps = {
  children: React.ReactNode
} & Pick<TitleProps, 'icon'>

export default function AppShellTitle(props: AppShellTitleProps) {
  const { children, icon } = props
  const { titleRef } = useAppShellHeaderContext()

  return (
    <div ref={titleRef}>
      <Box textAlign='center' mb={3}>
        <Title component='h2' size='medium' icon={icon ?? undefined}>
          {children}
        </Title>
      </Box>
    </div>
  )
}
