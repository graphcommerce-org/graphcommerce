import type { NextConfig } from 'next';
export declare type GraphCommerceConfig = {
    /** Additional packages that should be transpiled, usually this auto generated. */
    packages?: string[];
};
export declare function withGraphCommerce(conf?: GraphCommerceConfig): (config: NextConfig) => NextConfig;
