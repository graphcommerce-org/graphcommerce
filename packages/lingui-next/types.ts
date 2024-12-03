import type { Messages } from '@lingui/core'

export type MessageLoader = (locale: string) => Promise<{ messages: Messages }>
export type SyncMessageLoader = (locale: string) => { messages: Messages }
