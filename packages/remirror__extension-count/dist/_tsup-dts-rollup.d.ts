import { DecorationSet } from '@remirror/pm/view';
import type { EditorState } from '@remirror/core';
import type { Helper } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { Plugin as Plugin_2 } from '@remirror/pm/state';
import type { ProsemirrorNode } from '@remirror/core';
import type { Static } from '@remirror/core';

/**
 * Count words or characters in your editor, and set a soft max length
 */
declare class CountExtension extends PlainExtension<CountOptions> {
    get name(): "count";
    /**
     * Get the configured maximum characters/words.
     */
    getCountMaximum(): Helper<number>;
    /**
     * Get the count of characters in the document.
     *
     * @param state
     */
    getCharacterCount(state?: EditorState): Helper<number>;
    /**
     * Get the count of words in the document.
     *
     * @param state
     */
    getWordCount(state?: EditorState): Helper<number>;
    /**
     * Is the current number of characters/words valid in the current strategy.
     *
     * @param state
     */
    isCountValid(state?: EditorState): Helper<boolean>;
    protected createDecorationSet(state: EditorState): DecorationSet;
    createExternalPlugins(): Plugin_2[];
}
export { CountExtension }
export { CountExtension as CountExtension_alias_1 }

declare interface CountOptions {
    /**
     * An optional soft limit. Text that exceeds this limit will be highlighted.
     *
     * @defaultValue -1
     */
    maximum?: Static<number>;
    /**
     * The classname to use when highlighting text that exceed the given maximum.
     *
     * @defaultValue 'remirror-max-count-exceeded'
     */
    maximumExceededClassName?: Static<string>;
    /**
     * The counting strategy to use. Either CountStrategy.CHARACTERS or CountStrategy.WORDS
     *
     * @defaultValue CountStrategy.CHARACTERS
     */
    maximumStrategy?: Static<CountStrategy>;
}
export { CountOptions }
export { CountOptions as CountOptions_alias_1 }

declare enum CountStrategy {
    CHARACTERS = "CHARACTERS",
    WORDS = "WORDS"
}
export { CountStrategy }
export { CountStrategy as CountStrategy_alias_1 }

export declare function getCharacterExceededPosition({ doc }: EditorState, maxCharacters: number): number;

export declare function getTextLength(node: ProsemirrorNode): number;

export declare function getWordExceededPosition({ doc }: EditorState, maxWords: number): number;

export declare const WORDS_REGEX: RegExp;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      count: CountExtension;
    }
  }
}
