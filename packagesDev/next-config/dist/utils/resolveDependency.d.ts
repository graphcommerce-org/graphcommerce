export declare type ResolveDependencyReturn = {
    dependency: string;
    root: string;
    fromRoot: string;
    fromModule: string;
};
export declare type ResolveDependency = (req: string) => ResolveDependencyReturn;
export declare const resolveDependency: (cwd?: string) => (dependency: string) => ResolveDependencyReturn;
