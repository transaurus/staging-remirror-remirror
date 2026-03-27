import { CommandFunction } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import { DecorationAttrs } from '@remirror/pm/view';
import type { FromToProps } from '@remirror/core';
import { Helper } from '@remirror/core';
import { PlainExtension } from '@remirror/core';

declare interface FindAndReplaceAllProps {
    /**
     * The text to search for.
     */
    query: string;
    /**
     * @defaultValue false (search is case insensitive)
     */
    caseSensitive?: boolean;
    /**
     * The text to replace.
     */
    replacement: string;
}
export { FindAndReplaceAllProps }
export { FindAndReplaceAllProps as FindAndReplaceAllProps_alias_1 }

declare interface FindAndReplaceProps {
    /**
     * The text to search for.
     */
    query: string;
    /**
     * @defaultValue false (search is case insensitive)
     */
    caseSensitive?: boolean;
    /**
     * The text to replace.
     */
    replacement: string;
    /**
     * The index of search result to highlight. If not provided, the active one
     * will be replace.
     */
    index?: number;
}
export { FindAndReplaceProps }
export { FindAndReplaceProps as FindAndReplaceProps_alias_1 }

/**
 * This extension add find and replace functionality to your editor.
 */
declare class FindExtension extends PlainExtension<FindOptions> {
    get name(): "find";
    private _updating;
    private _query;
    private _caseSensitive;
    private _ranges;
    private _activeIndex?;
    /**
     * Find and highlight the search result in the editor.
     */
    find({ query, activeIndex, caseSensitive }: FindProps): CommandFunction;
    /**
     * Stop find and remove all highlight.
     */
    stopFind(): CommandFunction;
    /**
     * Find and replace one search result.
     */
    findAndReplace({ query, caseSensitive, replacement, index, }: FindAndReplaceProps): CommandFunction;
    /**
     * Find and replace all search results.
     */
    findAndReplaceAll({ query, caseSensitive, replacement, }: FindAndReplaceAllProps): CommandFunction;
    /**
     * Find and highlight the search result in the editor. Returns search results.
     */
    findRanges(options: FindProps): Helper<FindResult>;
    /**
     * This plugin is responsible for do the searching and updating the
     * decorations.
     */
    createPlugin(): CreateExtensionPlugin;
    private setProps;
    private gatherFindResults;
    private normalizeActiveIndex;
    private createDecorationSet;
    /**
     * Dispatch an empty transaction to trigger an update of the decoration.
     */
    private updateView;
    private scrollToActiveResult;
}
export { FindExtension }
export { FindExtension as FindExtension_alias_1 }

declare interface FindOptions {
    /**
     * The inline decoraton to apply to all search results.
     *
     * @defaultValue '{style: "background-color: yellow;"}'
     */
    decoration?: DecorationAttrs;
    /**
     * The inline decoraton to apply to the active search result (if any).
     *
     * @defaultValue '{style: "background-color: orange;"}'
     */
    activeDecoration?: DecorationAttrs;
    /**
     * When the search is active, whether to do a search on every document change.
     *
     * @defaultValue false
     */
    alwaysFind?: boolean;
}
export { FindOptions }
export { FindOptions as FindOptions_alias_1 }

declare interface FindProps {
    /**
     * The text to search for.
     */
    query: string;
    /**
     * @defaultValue false (search is case insensitive)
     */
    caseSensitive?: boolean;
    /**
     * The index of search result to highlight. If not provided, none will be
     * highlighted.
     */
    activeIndex?: number;
}
export { FindProps }
export { FindProps as FindProps_alias_1 }

declare interface FindResult {
    /**
     * The index of search result to highlight. Undefined if no search result is
     * active.
     */
    activeIndex: number | undefined;
    /**
     * The absolute position ranges of all search result.
     */
    ranges: FromToProps[];
}
export { FindResult }
export { FindResult as FindResult_alias_1 }

/**
 * Returns a number between 0 and length-1 (inclusive)
 *
 * @internal
 */
export declare function rotateIndex(index: number, length: number): number;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      find: FindExtension;
    }
  }
}
