import path from 'path'
import NextI18Next from 'next-i18next'
import nextConfig from 'next/config'

const i18n = new NextI18Next({
  otherLanguages: ['de'],
  defaultLanguage: 'en',
  localeSubpaths: nextConfig()?.publicRuntimeConfig.localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
})

export const { useTranslation, appWithTranslation } = i18n
