declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_MAGENTO_CONFIG: {
      [storeCode: string]: NonNullable<NonNullable<EnvConfigQuery['envConfig']>[0]>
    }
  }
}
