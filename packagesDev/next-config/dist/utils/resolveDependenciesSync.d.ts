type PackageNames = Map<string, string>;
type DependencyStructure = Record<string, {
    dirName: string;
    dependencies: string[];
}>;
/**
 * We're sorting all dependencies topologically
 *
 * This can detect dependency cycles and throw an error
 */
export declare function sortDependencies(dependencyStructure: DependencyStructure): PackageNames;
/**
 * This will return a list of all dependencies that have `graphcommerce` in the name, matching:
 *
 * - `@graphcommerce/package-name`
 * - `@mycompany/graphcommerce-my-feature`
 *
 * It will traverse children until it finds a package that doesn't contain graphcommerce in the name
 * and stop there, not checking children.
 */
export declare function resolveDependenciesSync(root?: string): PackageNames;
export {};
