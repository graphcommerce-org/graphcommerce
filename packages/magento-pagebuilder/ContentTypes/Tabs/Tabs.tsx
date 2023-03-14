import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import React from 'react'
import { extractAdvancedProps } from '../../utils'
import { TabsContentType } from './types'

/**
 * Page Builder Tabs component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Tabs: TabsContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { tabNavigationAlignment, minHeight, defaultIndex = 0, headers = [], children } = additional

  const [value, setValue] = React.useState(defaultIndex)

  return (
    <Box sx={{ minHeight }}>
      <MuiTabs
        onChange={(_, newValue: number) => setValue(newValue)}
        value={value}
        centered={tabNavigationAlignment === 'center'}
      >
        {headers.map((title, index) => (
          <Tab
            id={`simple-tab-${index}`}
            aria-controls={`simple-tabpanel-${index}`}
            label={title}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </MuiTabs>

      {React.Children.map(children, (child, index) => (
        <div
          role='tabpanel'
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && child}
        </div>
      ))}
    </Box>
  )
}
