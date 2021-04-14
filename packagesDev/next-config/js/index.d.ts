export declare type WorkspaceInfo = {
    [name: string]: {
        location: string;
        workspaceDependencies: string[];
        mismatchedWorkspaceDependencies: string[];
    };
};
export declare function withYarn1Workspaces(modules?: string[]): (nextConfig: import("next/dist/next-server/server/config-shared").NextConfig) => import("next/dist/next-server/server/config-shared").NextConfig;
