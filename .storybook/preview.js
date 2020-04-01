import { addDecorator } from '@storybook/react'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { theme } from '../layout/FullLayout'

addDecorator(withMuiTheme({ Default: theme }))
