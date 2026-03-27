/**
 * @script
 *
 * This is a script that:
 *
 * - Takes the prelease postfix - `PRERELEASE_VALUE`
 * - Updates every package version in the repo to be the version `{MAJOR}.{MINOR}.{PATCH}-pr{PRERELEASE_VALUE}`.
 * - Publishes to npm with the tag `pr{PRERELEASE_VALUE}`
 */
/**
 * Read through the packages and update all the versions of internal
 * dependencies to be the new version
 */
export declare function mutatePackageVersions(prerelease: string): Promise<void>;
