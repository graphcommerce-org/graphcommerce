import { Button, makeStyles } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { LayoutProps } from '../Layout/PageLayout'
import { SanitizedDirectoryTree } from '../SidebarMenu/sanitizeDirectoryTree'

type NextPrevButtonProps = Pick<LayoutProps, 'menuData'>

export default function NextPrevButtons({ menuData }: NextPrevButtonProps) {
  const router = useRouter()

  const flatMenuData = (menuData as unknown as SanitizedDirectoryTree)
    .map((data) => data[1])
    .flat(1)
  const currentMenuData = flatMenuData.find((data) => data.urlKey === router.asPath)
  const currentPageIndex = flatMenuData.indexOf(currentMenuData ?? { urlKey: '', name: '' })
  const prevPage = flatMenuData?.[currentPageIndex - 1]
  const nextPage = flatMenuData?.[currentPageIndex + 1]

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
      className={classes.root}
    >
      <div>
        {prevPage && (
          <Button href={prevPage?.urlKey} color='secondary' variant='text'>
            &larr; {prevPage?.name}
          </Button>
        )}
      </div>
      <div>
        {nextPage && (
          <Button href={nextPage?.urlKey} color='secondary' variant='text'>
            {nextPage?.name} &rarr;
          </Button>
        )}
      </div>
    </Box>
  )
}
