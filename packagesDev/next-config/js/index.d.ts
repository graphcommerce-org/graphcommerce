import { NextConfig } from 'next/dist/server/config-shared';
export declare type WorkspaceInfo = {
    [name: string]: {
        location: string;
        workspaceDependencies: string[];
        mismatchedWorkspaceDependencies: string[];
    };
};
export declare function withYarn1Workspaces(modules?: string[]): (config: NextConfig) => NextConfig;
