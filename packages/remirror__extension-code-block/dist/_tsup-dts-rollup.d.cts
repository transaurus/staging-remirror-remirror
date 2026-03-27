import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { CommandFunctionProps } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import { Decoration } from '@remirror/pm/view';
import { DecorationSet } from '@remirror/pm/view';
import { DelayedPromiseCreator } from '@remirror/core';
import { DOMOutputSpec } from '@remirror/core';
import { EditorState } from '@remirror/core';
import { ExtensionCodeBlockTheme } from '@remirror/theme';
import type { FindProsemirrorNodeResult } from '@remirror/core';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeType } from '@remirror/core';
import { NodeTypeProps } from '@remirror/core';
import { NodeWithPosition } from '@remirror/core';
import { NonChainableCommandFunction } from '@remirror/core';
import { OnSetOptionsProps } from '@remirror/core';
import { Positioner } from '@remirror/extension-positioner';
import { PosProps } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import type { RefractorSyntax } from 'refractor/core.js';
import type { Static } from '@remirror/core';
import type { StringKey } from '@remirror/core';
import { Transaction } from '@remirror/core';

declare interface CodeBlockAttributes extends ProsemirrorAttributes {
    /**
     * The language attribute
     */
    language: string;
    /**
     * Set to true to active the wrapping of the content within the editor.
     */
    wrap?: boolean;
}
export { CodeBlockAttributes }
export { CodeBlockAttributes as CodeBlockAttributes_alias_1 }

declare class CodeBlockExtension extends NodeExtension<CodeBlockOptions> {
    get name(): "codeBlock";
    createTags(): ("code" | "block")[];
    /**
     * Add the languages to the environment if they have not yet been added.
     */
    protected init(): void;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Add the syntax theme class to the editor.
     */
    createAttributes(): ProsemirrorAttributes;
    /**
     * Create an input rule that listens converts the code fence into a code block
     * when typing triple back tick followed by a space.
     */
    createInputRules(): InputRule[];
    protected onSetOptions(props: OnSetOptionsProps<CodeBlockOptions>): void;
    /**
     * Create the custom code block plugin which handles the delete key amongst other things.
     */
    createPlugin(): CreateExtensionPlugin<CodeBlockState>;
    /**
     * Call this method to toggle the code block.
     *
     * @remarks
     *
     * ```ts
     * actions.toggleCodeBlock({ language: 'ts' });
     * ```
     *
     * The above makes the current node a codeBlock with the language ts or
     * remove the code block altogether.
     */
    toggleCodeBlock(attributes?: Partial<CodeBlockAttributes>): CommandFunction;
    /**
     * Creates a code at the current position.
     *
     * ```ts
     * commands.createCodeBlock({ language: 'js' });
     * ```
     */
    createCodeBlock(attributes: CodeBlockAttributes): CommandFunction;
    /**
     * Update the code block at the current position. Primarily this is used
     * to change the language.
     *
     * ```ts
     * if (commands.updateCodeBlock.enabled()) {
     *   commands.updateCodeBlock({ language: 'markdown' });
     * }
     * ```
     */
    updateCodeBlock(attributes: CodeBlockAttributes): CommandFunction;
    /**
     * Format the code block with the code formatting function passed as an
     * option.
     *
     * Code formatters (like prettier) add a lot to the bundle size and hence
     * it is up to you to provide a formatter which will be run on the entire
     * code block when this method is used.
     *
     * ```ts
     * if (actions.formatCodeBlock.enabled()) {
     *   actions.formatCodeBlock();
     *   // Or to format a separate code block via position
     *   actions.formatCodeBlock({ pos: 100 });
     * }
     * ```
     */
    formatCodeBlock({ pos }?: Partial<PosProps>): NonChainableCommandFunction;
    tabKey({ state, dispatch }: KeyBindingProps): boolean;
    backspaceKey({ dispatch, tr, state }: KeyBindingProps): boolean;
    enterKey({ dispatch, tr }: KeyBindingProps): boolean;
    formatShortcut({ tr }: KeyBindingProps): boolean;
    /**
     * Register passed in languages.
     */
    private registerLanguages;
    /**
     * Create delayed format command.
     */
    private readonly createFormatCodeBlockCommand;
}
export { CodeBlockExtension }
export { CodeBlockExtension as CodeBlockExtension_alias_1 }

/**
 * A function which takes code and formats the code.
 *
 * TODO - possibly allow error management if failure is because of invalid
 * syntax
 */
declare type CodeBlockFormatter = (params: FormatterProps) => Promise<FormattedContent | void>;
export { CodeBlockFormatter }
export { CodeBlockFormatter as CodeBlockFormatter_alias_1 }

declare interface CodeBlockOptions {
    /**
     * Import languages from refractor.
     *
     * @remarks
     *
     * ```ts
     * import jsx from 'refractor/lang/jsx.js'
     * import typescript from 'refractor/lang/typescript.js'
     * ```
     *
     * And pass them into the config when initializing this extension.
     *
     * ```ts
     * import { CodeBlockExtension } from '@remirror/extension-code-block';
     *
     * new CodeBlockExtension({ supportedLanguages: [typescript, jsx] })
     * ```
     *
     * Or as a component
     *
     * ```tsx
     * <RemirrorManager>
     *   <RemirrorExtension Constructor={CodeBlockExtension} supportedLanguages={[typescript, jsx]} />
     * </RemirrorManager>
     * ```
     *
     * By default refractor bundles the following languages: `markup`, `css`,
     * `clike`, `js`
     *
     * @defaultValue []
     */
    supportedLanguages?: RefractorSyntax[];
    /**
     * The default language to use when none is provided.
     *
     * It is a property so it can change during the editor's life.
     *
     * @defaultValue 'markup'
     */
    defaultLanguage?: string;
    /**
     * Set to true to wrap content by default.
     *
     * @defaultValue false
     */
    defaultWrap?: boolean;
    /**
     * The theme to use for the codeBlocks.
     *
     * @remarks
     *
     * Currently only one theme can be set per editor.
     *
     * Set this to false if you want to manage the syntax styles by yourself. For
     * tips on how this could be accomplished see {@link https://prismjs.com}
     *
     * @defaultValue 'atom-dark'
     */
    syntaxTheme?: SyntaxTheme;
    /**
     * Provide a formatter which can format the provided source code.
     *
     * @returns an object when formatting was successful and false when the code
     * could not be formatted (a noop).
     */
    formatter?: CodeBlockFormatter;
    /**
     * The name of the node that the code block should toggle back and forth from.
     *
     * @defaultValue 'paragraph'
     */
    toggleName?: string;
    /**
     * Class to use in decorations of plain `text` nodes.
     *
     * @remarks
     *
     * refractor highlighting produces `elements` to indicate the type of a part
     * of the code. These elements get translated into decorations by this plugin.
     *
     * For all other parts of the code the decoration will use this class name if
     * it is set to a non-empty value, otherwise no decoration will be produced.
     */
    plainTextClassName?: string;
    /**
     * Extract the language string from a code block.
     */
    getLanguageFromDom?: Static<(codeElement: HTMLElement, preElement: HTMLElement) => string | undefined>;
}
export { CodeBlockOptions }
export { CodeBlockOptions as CodeBlockOptions_alias_1 }

declare const codeBlockPositioner: Positioner<FindProsemirrorNodeResult>;
export { codeBlockPositioner }
export { codeBlockPositioner as codeBlockPositioner_alias_1 }

export declare class CodeBlockState {
    #private;
    /**
     * The set of cached decorations to minimize dom updates
     */
    decorationSet: DecorationSet;
    constructor(type: NodeType, extension: NodeExtension<CodeBlockOptions>);
    /**
     * Creates the initial set of decorations
     */
    init(state: EditorState): this;
    /**
     * Recreate all the decorations again for all the provided blocks.
     */
    private refreshDecorationSet;
    /**
     * Apply the state and update decorations when a change has happened in the
     * editor.
     */
    apply(tr: Transaction, _: EditorState): this;
    /**
     * Removes all decorations which relate to the changed block node before creating new decorations
     * and adding them to the decorationSet.
     */
    private updateDecorationSet;
    /**
     * Flags that a deletion has just occurred.
     */
    setDeleted(deleted: boolean): void;
}

/**
 * Used to provide a `toDom` function for the code block. Currently this only
 * support the browser runtime.
 */
export declare function codeBlockToDOM(node: ProsemirrorNode, extra: ApplySchemaAttributes): DOMOutputSpec;

/**
 * Creates a decoration set for the provided blocks
 */
export declare function createDecorations(props: CreateDecorationsProps): Decoration[];

declare interface CreateDecorationsProps {
    defaultLanguage: string;
    /**
     * The list of codeBlocks and their positions which we would like to update.
     */
    blocks: NodeWithPosition[];
    /**
     * When a delete happens within the last valid decoration in a block it causes
     * the editor to jump. This skipLast should be set to true immediately after a
     * delete which then allows for createDecorations to skip updating the
     * decoration for the last refactor node, and hence preventing the jumpy bug.
     */
    skipLast: boolean;
    plainTextClassName: string | undefined;
}

export declare interface DelayedFormatCodeBlockProps<Value> {
    /**
     * Optionally specify a position to identify a code block.
     */
    pos?: PosProps['pos'];
    /**
     * A function that returns a promise.
     */
    promise: DelayedPromiseCreator<Value>;
    /**
     * Called when the promise succeeds and the formatted code is available. If
     * formatting fails, the failure handler is called instead.
     */
    onSuccess: (value: Value, commandProps: CommandFunctionProps) => boolean;
    /**
     * Called when a failure is encountered.
     */
    onFailure?: CommandFunction<{
        error: unknown;
    }>;
}

/**
 * Format the contents of a selected codeBlock or one located at the provided
 * position.
 */
export declare function formatCode(props: FormatCodeProps): Promise<FormatCodeResult | undefined>;

declare type FormatCodeProps = NodeTypeProps & Required<Pick<CodeBlockOptions, 'formatter' | 'defaultLanguage'>> & Partial<PosProps> & CommandFunctionProps;

export declare interface FormatCodeResult {
    /**
     * Formatted code
     */
    formatted: string;
    /**
     * The original range that should be replaced in the code block
     */
    range: {
        from: number;
        to: number;
    };
    /**
     * Updated selection coordinates for the formatted code
     */
    selection: {
        anchor: number;
        head?: number;
    };
}

/**
 * Data returned from a code formatter.
 */
declare interface FormattedContent {
    /**
     * The transformed source.
     */
    formatted: string;
    /**
     * The new cursor position after formatting
     */
    cursorOffset: number;
}
export { FormattedContent }
export { FormattedContent as FormattedContent_alias_1 }

/**
 * A prettier based code formatter which can be dropped in for use within the
 * `CodeBlockExtension`.
 */
export declare function formatter(props: FormatterProps): Promise<FormattedContent | undefined>;

declare interface FormatterProps {
    /**
     * The code to be formatted
     */
    source: string;
    /**
     * Specify where the cursor is. This option cannot be used with rangeStart and
     * rangeEnd. This allows the command to both formats the code, and translates
     * a cursor position from unformatted code to formatted code.
     */
    cursorOffset: number;
    /**
     * The language of the code block. Should be used to determine whether the
     * formatter can support the transformation.
     *
     * Possible languages are available here
     * https://github.com/wooorm/refractor/tree/716fe904c37cd7ebfde53ac5157e7d6c323a3986/lang
     */
    language: string;
}
export { FormatterProps }
export { FormatterProps as FormatterProps_alias_1 }

/**
 * Get the language from user input.
 */
declare function getLanguage(props: GetLanguageProps): string;
export { getLanguage }
export { getLanguage as getLanguage_alias_1 }
export { getLanguage as getLanguage_alias_2 }

/**
 * Get the language from the provided `code` element. This is used as the
 * default implementation in the `CodeExtension` but it can be overridden.
 */
export declare function getLanguageFromDom(codeElement: HTMLElement): string | undefined;

declare interface GetLanguageProps {
    /**
     * The language input from the user;
     */
    language: string | undefined;
    /**
     * The default language to use if none found.
     */
    fallback: string;
}

/**
 * Check that the attributes exist and are valid for the codeBlock
 * updateAttributes.
 */
export declare function isValidCodeBlockAttributes(attributes: ProsemirrorAttributes): attributes is CodeBlockAttributes;

export declare const LANGUAGE_ATTRIBUTE = "data-code-block-language";

/**
 * The default supported syntax themes.
 */
declare type SyntaxTheme = Lowercase<StringKey<typeof ExtensionCodeBlockTheme>>;
export { SyntaxTheme }
export { SyntaxTheme as SyntaxTheme_alias_1 }

export declare const toggleCodeBlockOptions: Remirror.CommandDecoratorOptions;

/**
 * Updates the node attrs.
 *
 * This is used to update the language for the codeBlock.
 */
export declare function updateNodeAttributes(type: NodeType): (attributes: CodeBlockAttributes) => CommandFunction;

export declare const WRAP_ATTRIBUTE = "data-code-block-wrap";

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      codeBlock: CodeBlockExtension;
    }
  }
}
