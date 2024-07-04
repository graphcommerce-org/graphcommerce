import dynamic from 'next/dynamic'

export const DraftModeLoader = dynamic(async () => (await import('./DraftMode')).DraftMode, {})
