import { AcceptUndefined } from '@remirror/core';
import { DecorationAttrs } from '@remirror/pm/view';
import type { Doc } from 'yjs';
import { EditorState } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import { NonChainableCommandFunction } from '@remirror/core';
import { OnSetOptionsProps } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { ProsemirrorPlugin } from '@remirror/core';
import { Selection as Selection_2 } from '@remirror/core';
import { Shape } from '@remirror/core';
import { Static } from '@remirror/core';

export declare interface ColorDef {
    light: string;
    dark: string;
}

/**
 * The default destroy provider method.
 */
declare function defaultDestroyProvider(provider: YjsRealtimeProvider): void;
export { defaultDestroyProvider }
export { defaultDestroyProvider as defaultDestroyProvider_alias_1 }

/**
 * The YJS extension is the recommended extension for creating a collaborative
 * editor.
 */
declare class YjsExtension extends PlainExtension<YjsOptions> {
    get name(): "yjs";
    private _provider?;
    /**
     * The provider that is being used for the editor.
     */
    get provider(): YjsRealtimeProvider;
    getBinding(): {
        mapping: Map<any, any>;
    } | undefined;
    /**
     * Create the yjs plugins.
     */
    createExternalPlugins(): ProsemirrorPlugin[];
    /**
     * This managers the updates of the collaboration provider.
     */
    onSetOptions(props: OnSetOptionsProps<YjsOptions>): void;
    /**
     * Remove the provider from the manager.
     */
    onDestroy(): void;
    /**
     * Undo that last Yjs transaction(s)
     *
     * This command does **not** support chaining.
     * This command is a no-op and always returns `false` when the `disableUndo` option is set.
     */
    yUndo(): NonChainableCommandFunction;
    /**
     * Redo the last transaction undone with a previous `yUndo` command.
     *
     * This command does **not** support chaining.
     * This command is a no-op and always returns `false` when the `disableUndo` option is set.
     */
    yRedo(): NonChainableCommandFunction;
    /**
     * Handle the undo keybinding.
     */
    undoShortcut(props: KeyBindingProps): boolean;
    /**
     * Handle the redo keybinding for the editor.
     */
    redoShortcut(props: KeyBindingProps): boolean;
}
export { YjsExtension }
export { YjsExtension as YjsExtension_alias_1 }

declare interface YjsOptions<Provider extends YjsRealtimeProvider = YjsRealtimeProvider> {
    /**
     * Get the provider for this extension.
     */
    getProvider: Provider | (() => Provider);
    /**
     * Remove the active provider. This should only be set at initial construction
     * of the editor.
     */
    destroyProvider?: (provider: Provider) => void;
    /**
     * The options which are passed through to the Yjs sync plugin.
     */
    syncPluginOptions?: AcceptUndefined<YSyncOpts>;
    /**
     * Take the user data and transform it into a html element which is used for
     * the cursor. This is passed into the cursor builder.
     *
     * See https://github.com/yjs/y-prosemirror#remote-cursors
     */
    cursorBuilder?: (user: Shape) => HTMLElement;
    /**
     * Generator for the selection attributes
     */
    selectionBuilder?: (user: Shape) => DecorationAttrs;
    /**
     * By default all editor bindings use the awareness 'cursor' field to
     * propagate cursor information.
     *
     * @defaultValue 'cursor'
     */
    cursorStateField?: string;
    /**
     * Get the current editor selection.
     *
     * @defaultValue `(state) => state.selection`
     */
    getSelection?: (state: EditorState) => Selection_2;
    disableUndo?: Static<boolean>;
    /**
     * Names of nodes in the editor which should be protected.
     *
     * @defaultValue `new Set('paragraph')`
     */
    protectedNodes?: Static<Set<string>>;
    trackedOrigins?: Static<any[]>;
}
export { YjsOptions }
export { YjsOptions as YjsOptions_alias_1 }

/**
 * yjs typings are very rough; so we define here the interface that we require
 * (y-webrtc and y-websocket providers are both compatible with this interface;
 * no other providers have been checked).
 */
declare interface YjsRealtimeProvider {
    doc: Doc;
    awareness: any;
    destroy: () => void;
    disconnect: () => void;
}

export declare interface YSyncOpts {
    colors?: ColorDef[];
    colorMapping?: Map<string, ColorDef>;
    permanentUserData?: any | null;
}

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      yjs: YjsExtension;
    }
  }
}
