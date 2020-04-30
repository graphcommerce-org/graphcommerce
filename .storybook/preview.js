import { addDecorator } from '@storybook/react'
import { withMuiTheme } from '@harelpls/storybook-addon-materialui'
import { defaultTheme } from '../components/Theme'

addDecorator(withMuiTheme({ Default: defaultTheme }))
