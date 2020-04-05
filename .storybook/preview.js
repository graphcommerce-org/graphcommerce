import { addDecorator } from '@storybook/react'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { theme } from '../components/LayoutFull'

addDecorator(withMuiTheme({ Default: theme }))
