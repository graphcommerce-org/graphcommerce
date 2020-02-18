/* eslint-disable no-param-reassign */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const aliases = require('./next.config-alias')

module.exports = withBundleAnalyzer({
  env: {
    GRAPHQL: 'https://api-euwest.graphcms.com/v1/cjioidxbu01mw01efuxenx5rs/dev',
    GRAPHQL_BEARER:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjoyLCJ0b2tlbklkIjoiMDdkZmFmNzYtN2E1OS00MGIwLWEzMTQtNjQxMzBmYmM5NzNhIiwiaWF0IjoxNTgwODU1MTQ1LCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyJ9.HL9po7-Q68NkaNsXoUWE4perPx8rW1GBMoo3nksi1FxdzXN6Rh9xKDgCkYqsgTQMrvHD_oUjh-O6V8g8sP0n3A9MUbMGT4EkmZKfXOFxleg6SrDj_1vUHo-vUmmRxRglsHX6ywYqX_HSCRTVvGoBu4D-1zt4Lk5KmYpnTGB0MpEevENPb4dcO6OSuG9ToBDgxwF2ja4N5WPU1d_EiObR8yQC7WxaHtvfIHZMr-nICPcbRMVn0O9zxAumJQviU13nWqW4ZeGZcA8H6K6yJsxopDGFjOOxqE0IoMlQKB34vsdVkYN6rpnASW5Y-esVCsGsMrD3WnDuUuYq4rtaZssgyvjYvnHONgaemX8RzKm962ymb28Ko_6hhLAgk_eBs-OY600RYYf75NmZO7PWwhWol7Fseb1XXsJu98L0A1QFfPYSm51FApJfsqKAdgxvmoc6bJ44_HL9yCYMo6wUV1E_Mb130arygYPy6azoP4jjXeQVlCPGrHkstsSrPOcg4_osaBv3di1kVTsLb89MzupFrNwjyHeaJaWS2VnoFG7u8uIRaKZwQZ2fUroohkQbuMKVTKPnVnWHsjVieVbYgJDSu9Rn0m5XEEi2yOciJQ6QWfLn-HoKOkrI8iIfG8cfMG93AkAZtOju2k3mhLXV_aG73Hf_Gkh2blh0JCFX8CoK1Yk',
  },
  experimental: {
    modern: true,
    rewrites() {
      return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
    },
  },
  webpack(config) {
    const { alias } = config.resolve
    config.resolve.alias = {
      ...alias,
      ...aliases,
    }
    return config
  },
})
