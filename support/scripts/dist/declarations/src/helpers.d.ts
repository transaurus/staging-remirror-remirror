/// <reference types="node" />
import type { NewChangeset, PreState } from '@changesets/types';
import { exec as _exec, execFile as _execFile } from 'child_process';
import { Logger } from 'tslog';
import type { PackageJson, TsConfigJson } from '@remirror/types';
/**
 * The `camelCased` argument passed to the cli.
 */
export declare const cliArgs: any;
/**
 * The logger used when running scripts.
 */
export declare const log: Logger;
export declare const exec: typeof _exec.__promisify__;
export declare const execFile: typeof _execFile.__promisify__;
export declare const rm: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
    rimraf: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    rimrafSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    manual: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    manualSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    native: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    nativeSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    posix: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    posixSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    windows: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    windowsSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    moveRemove: ((path: string | string[], opt?: import("rimraf").RimrafAsyncOptions | undefined) => Promise<boolean>) & {
        sync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
    };
    moveRemoveSync: (path: string | string[], opt?: import("rimraf").RimrafSyncOptions | undefined) => boolean;
};
/**
 * Convert a mangled name to its unmangled version.
 *
 * `babel__types` => `@babel/types`.
 */
export declare function unmangleScopedPackage(mangledName: string): string;
/**
 * Mangle a scoped package name. Which removes the `@` symbol and adds a `__`
 * separator.
 *
 * `@babel/types` => `babel__types`
 */
export declare function mangleScopedPackageName(packageName: string): string;
/**
 * Check if a file exists for the provide `filePath` the provided target.
 *
 * @param {string} filePath
 */
export declare function fileExists(filePath: string): Promise<boolean>;
/**
 * Get a path relative to the base directory of this project. If called with no
 * arguments it will return the base directory.
 */
export declare function baseDir(...paths: string[]): string;
/**
 * Get the path relative to the base directory of this project.
 */
export declare function getRelativePathFromJson({ location }: {
    location: string;
}): string;
interface FormatFilesOptions {
    /**
     * Whether to log anything to the console.
     *
     * @defaultValue false
     */
    silent?: boolean;
    /**
     * What formatters to use.
     *
     * @defaultValue 'all'
     */
    formatter?: 'prettier' | 'eslint' | 'all';
}
/**
 * Format the provided file or files with `prettier` and `eslint`.
 */
export declare function formatFiles(path: string | string[], { silent, formatter }?: FormatFilesOptions): Promise<void>;
export interface RemirrorPackageMeta {
    /**
     * The maximum size in KB for the package.
     */
    sizeLimit?: string;
    /**
     * Set the options for the tsconfig.
     *
     * False means no tsconfig files will be added to the package.
     */
    tsconfigs?: false | TsConfigMeta;
    /**
     * Whether to skip the api generation for a package.
     */
    skipApi?: boolean;
}
export type TsConfigWithPaths = TsConfigJson & {
    paths?: false | Array<string | [path: string, typesPackage: string, subFolder?: string]>;
};
export interface TsConfigMeta {
    [key: string]: TsConfigWithPaths | false | undefined;
    __dts__?: TsConfigWithPaths | false;
    __tests__?: TsConfigWithPaths | false;
    __e2e__?: TsConfigWithPaths | false;
    src?: TsConfigWithPaths | false;
}
type PackageJsonType = PackageJson.NodeJsStandard & PackageJson.PackageJsonStandard & PackageJson.NonStandardEntryPoints & PackageJson.TypeScriptConfiguration & PackageJson.YarnConfiguration & PackageJson.JSPMConfiguration;
export interface Package extends Omit<PackageJsonType, 'name'> {
    /**
     * The name of the package.
     */
    name: string;
    /**
     * The absolute path to the package.
     */
    location: string;
    /**
     * Custom meta properties consumed by `remirror`.
     */
    '@remirror'?: RemirrorPackageMeta;
}
interface GetAllDependencies {
    excludeDeprecated?: boolean;
    excludeSupport?: boolean;
    excludePrivate?: boolean;
}
/**
 * Get all dependencies.
 *
 * @param excludeDeprecated - when true exclude the deprecated packages
 */
export declare function getAllDependencies({ excludeDeprecated, excludeSupport, excludePrivate, }?: GetAllDependencies): Promise<Package[]>;
/**
 * Get all the packages that can be used as dependencies within the project.
 * These are identified by having a types field in the package.json.
 *
 * @param relative - when set to true this will return the paths as
 * relative to the root directory. Defaults to `false`.
 */
export declare function getTypedPackagesWithPath(relative?: boolean): Promise<Record<string, string>>;
interface ChangesetState {
    preState: PreState | undefined;
    changesets: NewChangeset[];
}
/**
 * Get the value of the current changesets.
 */
export declare function readChangesetState(cwd?: string): Promise<ChangesetState>;
/**
 * Check that the actual output and the expected output are identical. When
 * content has changed it will throw an error with a descriptive diff.
 *
 * @param actual
 * @param expected
 */
export declare function compareOutput(actual: Record<string, unknown>, expected: Record<string, unknown>): void;
export declare const environment: {
    readonly isUnit: boolean;
    readonly isIntegration: boolean;
    readonly isE2E: boolean;
    readonly isCI: boolean;
    readonly isMacOS: boolean;
};
/**
 * Watch some files and execute a callback function when any file change.
 *
 * @param files an array of file paths
 * @param callback the function that will be called when a file is modified
 */
export declare function watchFiles(files: string[], callback: () => any): void;
export {};
