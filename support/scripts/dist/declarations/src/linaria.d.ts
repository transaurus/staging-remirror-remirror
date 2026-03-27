/**
 * @script
 *
 * This script uses `linaria` to generate css from all the project files and
 * place the css inside `@remirror/styles` package.
 */
/**
 * Clean the css and style files.
 */
export declare function removeGeneratedFiles(): Promise<void>;
/**
 * Copy files from `@remirror/styles` to `remirror/styles`.
 */
export declare function copyFilesToRemirror(): Promise<void>;
interface Output {
    css: Record<string, string>;
    ts: Record<string, string>;
}
/**
 * Get the output files and css.
 */
export declare function getOutput(): Promise<Output>;
/**
 * Write the output to the required locations.
 *
 * @param output - container for all the output gathered so far.
 */
export declare function writeOutput(output: Record<string, string>): Promise<void>;
export {};
