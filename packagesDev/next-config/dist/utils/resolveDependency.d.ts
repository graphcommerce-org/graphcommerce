export type ResolveDependencyReturn = {
    dependency: string;
    denormalized: string;
    root: string;
    fromRoot: string;
    fromModule: string;
};
export type ResolveDependency = (req: string) => ResolveDependencyReturn;
export declare const resolveDependency: (cwd?: string) => (dependency: string) => ResolveDependencyReturn;
