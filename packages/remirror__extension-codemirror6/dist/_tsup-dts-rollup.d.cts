import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import type { EditorView } from '@remirror/pm';
import { Extension } from '@codemirror/state';
import { InputRule } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import type { LanguageDescription } from '@codemirror/language';
import type { LanguageSupport } from '@codemirror/language';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import type { NodeView } from '@remirror/pm';
import { NodeViewMethod } from '@remirror/core';
import { PrioritizedKeyBindings } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import type { ProsemirrorNode } from '@remirror/pm';

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

export declare class CodeMirror6NodeView implements NodeView {
    dom: HTMLElement;
    private node;
    private readonly view;
    private readonly getPos;
    private readonly schema;
    private readonly cm;
    private updating;
    private readonly loadLanguage;
    private readonly languageConf;
    private languageName;
    private readonly toggleName;
    constructor({ node, view, getPos, extensions, loadLanguage, toggleName, }: {
        node: ProsemirrorNode;
        view: EditorView;
        getPos: () => number;
        extensions: Extension[] | null;
        loadLanguage: LoadLanguage;
        toggleName: string;
    });
    update(node: ProsemirrorNode): boolean;
    private updateLanguage;
    private setLanguage;
    /**
     * Synchronize the selections from ProseMirror to CodeMirrror
     */
    setSelection(anchor: number, head: number): void;
    selectNode(): void;
    focus(): void;
    stopEvent(): boolean;
    destroy(): void;
    /**
     * When the code editor is focused, we can keep the selection of the outer
     * editor synchronized with the inner one, so that any commands executed on
     * the outer editor see an accurate selection.
     */
    private forwardSelection;
    /**
     * This helper function translates from a CodeMirror selection to a
     * ProseMirror selection.
     */
    private asProseMirrorSelection;
    /**
     * A somewhat tricky aspect of nesting editor like this is handling cursor
     * motion across the edges of the inner editor. This node view will have to
     * take care of allowing the user to move the selection out of the code
     * editor. For that purpose, it binds the arrow keys to handlers that check if
     * further motion would ‘escape’ the editor, and if so, return the selection
     * and focus to the outer editor.
     *
     * The keymap also binds ctrl-enter, which, in ProseMirror's base keymap,
     * creates a  new paragraph after a code block.
     */
    private codeMirrorKeymap;
    /**
     * When the actual content of the code editor is changed, the event handler
     * registered in the node view's constructor calls this method. It'll compare
     * the code block node's current value to the value in the editor, and
     * dispatch a transaction if there is a difference.
     */
    private valueChanged;
    private maybeEscape;
}

declare class CodeMirrorExtension extends NodeExtension<CodeMirrorExtensionOptions> {
    get name(): "codeMirror";
    private languageMap;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createNodeViews(): NodeViewMethod;
    createKeymap(): PrioritizedKeyBindings;
    /**
     * Create an input rule that listens converts the code fence into a code block
     * when typing triple back tick followed by a space.
     */
    createInputRules(): InputRule[];
    enterKey({ dispatch, tr }: KeyBindingProps): boolean;
    private getLanguageMap;
    private loadLanguage;
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
     * A string to represent the language matching the language name or alias in
     * [`LanguageDescription`](https://codemirror.net/docs/ref/#language.LanguageDescription)
     *
     * @defaultValue ''
     */
    language?: string;
}
export { CodeMirrorExtensionAttributes }
export { CodeMirrorExtensionAttributes as CodeMirrorExtensionAttributes_alias_1 }

declare interface CodeMirrorExtensionOptions {
    /**
     * The CodeMirror extensions to use.
     *
     * @remarks
     *
     * For package size reasons, no CodeMirror extensions are included by default.
     * You might want to install and add the following two extensions:
     *
     * - [`basicSetup`](https://codemirror.net/6/docs/ref/#basic-setup.basicSetup)
     * - [`oneDark`](https://github.com/codemirror/theme-one-dark)
     *
     * @defaultValue null
     */
    extensions?: Extension[] | null;
    /**
     * The CodeMirror languages to use.
     *
     * @remarks
     *
     * You can install [`@codemirror/language-data`](https://codemirror.net/6/docs/ref/#language-data) and import languages from there.
     *
     * @defaultValue null
     */
    languages?: LanguageDescription[] | null;
    /**
     * The name of the node that the codeMirror block should toggle back and forth from.
     *
     * @defaultValue "paragraph"
     */
    toggleName?: string;
}
export { CodeMirrorExtensionOptions }
export { CodeMirrorExtensionOptions as CodeMirrorExtensionOptions_alias_1 }

declare type LoadLanguage = (lang: string) => Promise<LanguageSupport> | LanguageSupport | void;

export { }
