import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { Static } from '@remirror/core';

export declare type Casing = 'none' | 'uppercase' | 'lowercase' | 'capitalize' | 'small-caps';

export declare function isValidCasing(value: unknown): value is Exclude<Casing, 'none'>;

export declare const TEXT_CASE_ATTRIBUTE = "data-text-case";

export declare type TextCaseAttributes = ProsemirrorAttributes<{
    /**
     * The active text case for the
     */
    casing: Casing | null | undefined;
}>;

/**
 * Formatting for text casing in your editor.
 */
declare class TextCaseExtension extends MarkExtension<TextCaseOptions> {
    get name(): "textCase";
    createTags(): ("formattingMark" | "fontStyle")[];
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Toggle the default text case for this extension formatting annotation.
     */
    toggleTextCase(): CommandFunction;
    setTextCase(casing: string | TextCaseAttributes, selection?: PrimitiveSelection): CommandFunction;
}
export { TextCaseExtension }
export { TextCaseExtension as TextCaseExtension_alias_1 }

export declare interface TextCaseOptions {
    /**
     * The default casing to toggle between.
     *
     * @defaultValue 'none'
     */
    defaultCasing?: Static<Casing>;
}

export declare const toggleTextCaseOptions: Remirror.CommandDecoratorOptions;

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      textCase: TextCaseExtension;
    }
  }
}
