import { addDecorator } from '@storybook/react'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { theme } from '../components/Theme'

addDecorator(withMuiTheme({ Default: theme }))
