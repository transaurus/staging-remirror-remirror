import { ApplySchemaAttributes } from '@remirror/core';
import type { default as CodeMirror_2 } from 'codemirror';
import type CodeMirrorNamespace from 'codemirror';
import { CommandFunction } from '@remirror/core';
import type { EditorView } from '@remirror/pm';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeType } from '@remirror/core';
import type { NodeView } from '@remirror/pm';
import { NodeViewMethod } from '@remirror/core';
import { PrioritizedKeyBindings } from '@remirror/core';
import type { ProsemirrorAttributes } from '@remirror/core';
import type { ProsemirrorNode } from '@remirror/pm';
import { Selection as Selection_2 } from '@remirror/pm/state';
import type { Static } from '@remirror/core';

/**
 * Handling cursor motion from the outer to the inner editor must be done with a
 * keymap on the outer editor. The `arrowHandler` function uses the
 * `endOfTextblock` method to determine, in a bidi-text-aware way, whether the
 * cursor is at the end of a given textblock. If it is, and the next block is a
 * code block, the selection is moved into it.
 *
 * Adapted from https://prosemirror.net/examples/codemirror/
 */
export declare function arrowHandler(dir: 'left' | 'right' | 'up' | 'down'): CommandFunction;

declare class CodeMirrorExtension extends NodeExtension<CodeMirrorExtensionOptions> {
    get name(): "codeMirror";
    readonly tags: ("code" | "block")[];
    init(): void;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createNodeViews(): NodeViewMethod;
    createKeymap(): PrioritizedKeyBindings;
    /**
     * Creates a CodeMirror block at the current position.
     *
     * ```ts
     * commands.createCodeMirror({ language: 'js' });
     * ```
     */
    createCodeMirror(attributes: CodeMirrorExtensionAttributes): CommandFunction;
    /**
     * Update the code block at the current position. Primarily this is used
     * to change the language.
     *
     * ```ts
     * if (commands.updateCodeMirror.enabled()) {
     *   commands.updateCodeMirror({ language: 'markdown' });
     * }
     * ```
     */
    updateCodeMirror(attributes: CodeMirrorExtensionAttributes): CommandFunction;
}
export { CodeMirrorExtension }
export { CodeMirrorExtension as CodeMirrorExtension_alias_1 }

declare interface CodeMirrorExtensionAttributes extends ProsemirrorAttributes {
    /**
     * Configuration for the inner CodeMirror editor.
     *
     * @defaultValue undefined
     */
    codeMirrorConfig?: CodeMirror_2.EditorConfiguration;
    /**
     * A string to represent the language, which will be passed into CodeMirror's
     * `findModeByName` function. Note that you can also specify the
     * language by editing `codeMirrorConfig.mode` directly.
     *
     * @defaultValue undefined
     */
    language?: string;
}
export { CodeMirrorExtensionAttributes }
export { CodeMirrorExtensionAttributes as CodeMirrorExtensionAttributes_alias_1 }

declare interface CodeMirrorExtensionOptions {
    /**
     * Configuration for the inner CodeMirror editor.
     *
     * @defaultValue undefined
     */
    defaultCodeMirrorConfig?: CodeMirror_2.EditorConfiguration | null;
    /**
     * The instance of codemirror to use.
     */
    CodeMirror?: Static<typeof CodeMirror_2>;
}
export { CodeMirrorExtensionOptions }
export { CodeMirrorExtensionOptions as CodeMirrorExtensionOptions_alias_1 }

export declare class CodeMirrorNodeView implements NodeView {
    #private;
    /**
     * The dom element which wraps the CodeMirror editor element. This is directly
     * controlled by ProseMirror.
     */
    dom: HTMLElement;
    constructor(node: ProsemirrorNode, view: EditorView, getPos: () => number, config?: CodeMirror.EditorConfiguration);
    /**
     * Create the event listeners for managing updates from CodeMirror.
     */
    private setupCodeMirrorHandlers;
    /**
     * When the code editor is focused, we can keep the selection of the outer
     * editor synchronized with the inner one, so that any commands executed on
     * the outer editor see an accurate selection.
     */
    forwardSelection(): void;
    /**
     * This helper function translates from a CodeMirror selection to a
     * ProseMirror selection. Because CodeMirror uses a line/column based indexing
     * system, `indexFromPos` is used to convert to an actual character index.
     */
    asProseMirrorSelection(doc: ProsemirrorNode): Selection_2;
    /**
     * Selections are also synchronized the other way, from ProseMirror to
     * CodeMirror, using the view's `setSelection` method.
     */
    setSelection(anchor: number, head: number): void;
    /**
     * When the actual content of the code editor is changed, the event handler
     * registered in the node view's constructor calls this method. It'll compare
     * the code block node's current value to the value in the editor, and
     * dispatch a transaction if there is a difference.
     */
    valueChanged(): void;
    /**
     * A somewhat tricky aspect of nesting editor like this is handling cursor
     * motion across the edges of the inner editor. This node view will have to
     * take care of allowing the user to move the selection out of the code
     * editor. For that purpose, it binds the arrow keys to handlers that check if
     * further motion would ‘escape’ the editor, and if so, return the selection
     * and focus to the outer editor.
     *
     * The keymap also binds keys for undo and redo, which the outer editor will
     * handle, and for ctrl-enter, which, in ProseMirror's base keymap, creates a
     * new paragraph after a code block.
     */
    codeMirrorKeymap(): CodeMirror.KeyMap;
    maybeEscape(unit: 'line' | 'char', dir: 1 | -1): null | typeof default_alias.CodeMirror.Pass;
    /**
     * When an update comes in from the editor, for example because of an undo
     * action, we kind of have to do the inverse of what `valueChanged` did—check
     * for text changes, and if present, propagate them from the outer to the
     * inner editor.
     */
    update(node: ProsemirrorNode): boolean;
    selectNode(): void;
    stopEvent(): boolean;
}

declare type CodeMirrorType = typeof CodeMirrorNamespace;

/**
 * When codemirror is loaded immediately in non-browser environments it throws
 * an error.
 *
 * Non async dynamic imports are impossible without better build tooling. For
 * now, it the best compromise is to export a mutable object which dynamically
 * inject the CodeMirror instance when required.
 */
export declare const default_alias: {
    CodeMirror: CodeMirrorType;
};

/**
 * Load codemirror asynchronously for SSR support.
 *
 * @deprecated Please pass the CodeMirror instance to the CodeMirrorExtension
 * manually. Runtime dynamic imports can be different based on your
 * environment and bundler.
 */
export declare function loadCodeMirror(): Promise<void>;

/**
 * Parse a language string to CodeMirror's mode option.
 */
export declare function parseLanguageToMode(language?: string): string | null;

/**
 * Updates the node attrs.
 *
 * This is used to update the language for the CodeMirror block.
 */
export declare function updateNodeAttributes(type: NodeType): (attributes: CodeMirrorExtensionAttributes) => CommandFunction;

export { }
