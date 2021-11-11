import { Messages } from '@lingui/core'

export type MessageLoader = (locale: string) => Promise<{ messages: Messages }>
