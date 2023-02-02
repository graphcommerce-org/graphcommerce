import { z, ZodObject, ZodBoolean, ZodArray, ZodString, ZodNumber, ZodNullable, ZodOptional, ZodEffects } from 'zod';
type ASTNode = ZodNullable<any> | ZodOptional<any> | ZodEffects<any> | ZodObject<any> | ZodArray<any> | ZodString | ZodNumber | ZodBoolean;
export declare function configToEnvSchema(schema: ASTNode): readonly [z.ZodObject<z.ZodRawShape, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>, Record<string, string>];
type ApplyResultItem = {
    envVariable: string;
    envValue: unknown;
    dotVariable?: string | undefined;
    from?: unknown;
    to?: unknown;
    error?: string[];
};
type ApplyResult = ApplyResultItem[];
export declare function mergeEnvIntoConfig(schema: ASTNode, config: Record<string, unknown>, env: Record<string, string | undefined>): readonly [undefined, ApplyResult] | readonly [Record<string, unknown>, ApplyResult];
/**
 * Prints the applied env variables to the console
 *
 * The format is:
 *
 * - If from and to is empty, the value is unchanged: `=` (white)
 * - If the from is empty, a new value is applied: `+` (green)
 * - If the to is empty, a value is removed: `-` (red)
 * - If both from and to is not empty, a value is changed: `~` (yellow)
 */
export declare function formatAppliedEnv(applyResult: ApplyResult): string;
export {};
