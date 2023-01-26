/// <reference types="./types/global" />
/// <reference types="node" />
import type { Simplify, CamelCase } from 'type-fest';
export type BuildFlags = Simplify<{
    [K in keyof NodeJS.ProcessEnv as K extends `BUILD_FLAG_${string}` ? K extends `BUILD_FLAG_${infer Rest}` ? CamelCase<Rest> : never : never]: boolean;
}>;
export declare function buildFlags(incoming?: BuildFlags): {
    [k: string]: string;
};
