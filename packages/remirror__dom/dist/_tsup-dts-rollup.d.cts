import { AnyExtension } from '@remirror/core';
import type { BuiltinPreset } from '@remirror/core';
import { CorePreset } from '@remirror/preset-core';
import { CreateCoreManagerOptions } from '@remirror/preset-core';
import { EditorState } from '@remirror/core';
import { EditorView } from '@remirror/pm/view';
import { Framework } from '@remirror/core';
import { FrameworkOutput } from '@remirror/core';
import { FrameworkProps } from '@remirror/core';
import { RemirrorManager } from '@remirror/core';
import { UpdateStateProps } from '@remirror/core';

/**
 * Create the `remirror` editor for the DOM environment.
 *
 * ```ts
 * // Get the element to append the editor to.
 * const element = document.querySelector('#editor');
 *
 * // Create the manager.
 * const manager = createDomManager(() => [], {});
 *
 * // Create the dom editor.
 * const editor = createDomEditor({ element, manager });
 *
 * // Focus at the end of the editor.
 * editor.focus('end');
 *
 * // Insert some text.
 * editor.commands.insertText('Hello Friend!');
 * ```
 */
declare function createDomEditor<Extension extends AnyExtension>(props: DomFrameworkProps<Extension>): DomFrameworkOutput<Extension>;
export { createDomEditor }
export { createDomEditor as createDomEditor_alias_1 }

/**
 * Create an editor manager. It comes with the `CorePreset` already available.
 */
declare function createDomManager<Extension extends AnyExtension>(extensions: Extension[] | (() => Extension[]), options?: CreateCoreManagerOptions): RemirrorManager<CorePreset | BuiltinPreset | Extension>;
export { createDomManager }
export { createDomManager as createDomManager_alias_1 }

/**
 * The Framework implementation when interacting with the DOM.
 */
export declare class DomFramework<Extension extends AnyExtension> extends Framework<Extension, DomFrameworkProps<Extension>, DomFrameworkOutput<Extension>> {
    get name(): "dom";
    /**
     * Create the prosemirror `[[EditorView`]].
     */
    protected createView(state: EditorState, element?: Element): EditorView;
    /**
     * This method should be called when the framework is first created.
     */
    onFirstRender(): void;
    /**
     * Responsible for managing state updates.
     */
    protected updateState({ state, ...rest }: UpdateStateProps): void;
    get frameworkOutput(): DomFrameworkOutput<Extension>;
}

declare interface DomFrameworkOutput<Extension extends AnyExtension> extends FrameworkOutput<Extension> {
    /**
     * Call this method when cleaning up the DOM. It is called for you if you call
     * `manager.destroy()`.
     */
    destroy: () => void;
}
export { DomFrameworkOutput }
export { DomFrameworkOutput as DomFrameworkOutput_alias_1 }

declare interface DomFrameworkProps<Extension extends AnyExtension> extends FrameworkProps<Extension> {
    /**
     * Provide a container element. Which the editor will be appended to.
     */
    element: Element;
}
export { DomFrameworkProps }
export { DomFrameworkProps as DomFrameworkProps_alias_1 }

export { }
