/// <reference types="jest" />

import type { AnchorHeadProps } from '@remirror/core-types';
import type { CommandFunction } from '@remirror/core-types';
import { DirectEditorProps } from '@remirror/pm/view';
import type { EditorSchema } from '@remirror/core-types';
import type { EditorState } from '@remirror/core-types';
import { EditorState as EditorState_2 } from '@remirror/pm/state';
import type { EditorStateProps } from '@remirror/core-types';
import { EditorView } from '@remirror/pm/view';
import type { InputRule } from '@remirror/core-types';
import { MarkBuilder } from 'prosemirror-test-builder';
import { NodeBuilder } from 'prosemirror-test-builder';
import * as pm from 'prosemirror-test-builder';
import type { PosProps } from '@remirror/core-types';
import type { PrimitiveSelection } from '@remirror/core-types';
import type { ProsemirrorCommandFunction } from '@remirror/core-types';
import { ProsemirrorNode } from '@remirror/core-types';
import type { ProsemirrorPlugin } from '@remirror/core-types';
import type { ResolvedPos } from '@remirror/core-types';
import { Schema } from '@remirror/pm/model';
import { Selection as Selection_2 } from '@remirror/pm/state';
import type { SelectionProps } from '@remirror/core-types';
import type { Shape } from '@remirror/core-types';
import { Slice } from '@remirror/pm/model';
import type { TextProps } from '@remirror/core-types';

declare const a: pm.MarkBuilder;
export { a }
export { a as a_alias_1 }

/**
 * Apply the command to the prosemirror node passed in.
 *
 * Returns a tuple matching the following structure
 * [
 *   bool => was the command successfully applied taggedDoc => the new doc as a
 *   result of the command state => The new editor state after applying the
 *   command
 * ]
 */
declare function apply(taggedDocument: ProsemirrorNode, command: ProsemirrorCommandFunction, result?: ProsemirrorNode): ApplyReturn;
export { apply }
export { apply as apply_alias_1 }

/**
 * The return type for the apply method which
 * @remarks
 *
 * @typeParam Schema - the editor schema used node.
 */
declare interface ApplyReturn extends TaggedDocProps, EditorStateProps {
    /**
     * True when the command was applied successfully.
     */
    pass: boolean;
}
export { ApplyReturn }
export { ApplyReturn as ApplyReturn_alias_1 }

declare const atomBlock: pm.NodeBuilder;
export { atomBlock }
export { atomBlock as atomBlock_alias_1 }

declare const atomContainer: pm.NodeBuilder;
export { atomContainer }
export { atomContainer as atomContainer_alias_1 }

declare const atomInline: pm.NodeBuilder;
export { atomInline }
export { atomInline as atomInline_alias_1 }

/**
 * Simulate a backspace key press.
 */
declare function backspace(props: BackspaceProps): void;
export { backspace }
export { backspace as backspace_alias_1 }

declare interface BackspaceProps extends TestEditorViewProps {
    /**
     * The number of times to activate backspace.
     *
     * @defaultValue 1
     */
    times?: number;
}

declare const blockquote: pm.NodeBuilder;
export { blockquote }
export { blockquote as blockquote_alias_1 }

declare const br: NodeBuilder;
export { br }
export { br as br_alias_1 }

declare type BuilderReturns<T extends BuilderTypes> = {
    [Name in keyof T]: T[Name] extends NodeTypeAttributes ? NodeBuilder : MarkBuilder;
};

declare type BuilderTypes = Record<string, NodeTypeAttributes | MarkTypeAttributes>;

declare const code: pm.MarkBuilder;
export { code }
export { code as code_alias_1 }

declare const code_block: NodeBuilder;
export { code_block }
export { code_block as code_block_alias_1 }

declare const codeBlock: NodeBuilder;
export { codeBlock }
export { codeBlock as codeBlock_alias_1 }

/**
 * Tests that a command run transform the nodes from one state to another.
 * The second state is optional if nothing has changed.
 */
declare interface CommandTransformation {
    /**
     * The initial prosemirror node.
     *
     * ```ts
     * import { doc, p, strong} from 'jest-prosemirror';
     *
     * const from = doc(p('Hello ', strong('Friend')));
     * ```
     */
    from: ProsemirrorNode;
    /**
     * The output of the command transformation.
     *
     * ```ts
     * import { doc, p, strong} from 'jest-prosemirror';
     *
     * const to = doc(p(strong('Friend')));
     * ```
     *
     * This is optional and can be omitted if the transformation doesn't produce
     * any results.
     */
    to?: ProsemirrorNode;
}
export { CommandTransformation }
export { CommandTransformation as CommandTransformation_alias_1 }

/**
 * A copy implementation for jsdom and prosemirror.
 *
 * @remark
 *
 * This function will return the copied content of selected content as an object
 * with the `html` and `text` properties. The `text` property is the
 * `text/plain` clipboard data. The `html` property is the `text/html` clipboard
 * data.
 *
 * @internal
 */
declare function copyContent(props: {
    view: EditorView;
}): {
    html: string;
    text: string;
};
export { copyContent }
export { copyContent as copyContent_alias_1 }

/**
 * Create a test prosemirror editor an pass back helper properties and methods.
 *
 * @remarks
 *
 * The call to create editor can be chained with various commands to enable
 * testing of the editor at each step along it's state without the need for
 * intermediate holding variables.
 *
 * The created editor is automatically cleaned after each test.
 *
 * ```ts
 * import { createEditor } from 'jest-remirror';
 *
 * test('`keyBindings`', () => {
 * const keyBindings = {
 *  Enter: jest.fn((params: SuggestKeyBindingProps) => {
 *    params.command();
 *  }),
 * };
 *
 * const plugin = suggest({char: '@', name: 'at', keyBindings, matchOffset: 0,
 *   createCommand: ({ view }) => () =>
 *     view.dispatch(view.state.tr.insertText('awesome')),
 * });
 *
 * createEditor(doc(p('<cursor>')), { plugins: [plugin] }) .insertText('@')
 *   .press('Enter')
 *   .callback(content => {
 *     expect(content.state.doc).toEqualProsemirrorNode(doc(p('@awesome')));
 *   });
 * });
 * ```
 *
 * @param taggedDoc - the tagged prosemirror node to inject into the editor.
 * @param options - the {@link CreateEditorOptions} interface which includes all
 * {@link http://prosemirror.net/docs/ref/#view.DirectEditorProps | DirectEditorProps}
 * except for `state`.
 */
declare function createEditor(taggedDocument: ProsemirrorNode, options?: CreateEditorOptions): ProsemirrorTestChain;
export { createEditor }
export { createEditor as createEditor_alias_1 }

declare interface CreateEditorOptions extends Omit<DirectEditorProps, 'state' | 'plugins'> {
    /**
     * Whether to auto remove the editor from the dom after each test. It is
     * advisable to leave this unchanged.
     *
     * @defaultValue true
     */
    autoClean?: boolean;
    /**
     * The plugins that the test editor should use.
     *
     * @defaultValue []
     */
    plugins?: ProsemirrorPlugin[];
    /**
     * The input rules that the test editor should use.
     *
     * @defaultValue []
     */
    rules?: InputRule[];
}
export { CreateEditorOptions }
export { CreateEditorOptions as CreateEditorOptions_alias_1 }

declare function createEvents<CreatedEvent extends Event>(event: EventType, options: Shape): CreatedEvent[];
export { createEvents }
export { createEvents as createEvents_alias_1 }

/**
 * Create the editor state for a tagged prosemirror doc
 *
 * @param taggedDoc
 */
declare function createState(taggedDoc: ProsemirrorNode, plugins?: ProsemirrorPlugin[]): EditorState_2;
export { createState }
export { createState as createState_alias_1 }

declare interface DefaultBuilderTypes {
    doc: NodeTypeAttributes;
    p: NodeTypeAttributes;
    text: NodeTypeAttributes;
}

/**
 * Select everything in the current doc.
 */
declare function dispatchAllSelection(view: TestEditorView): void;
export { dispatchAllSelection }
export { dispatchAllSelection as dispatchAllSelection_alias_1 }

/**
 * Dispatch a text selection from start to [end]
 */
declare function dispatchAnchorTextSelection(props: DispatchAnchorTextSelectionProps): void;
export { dispatchAnchorTextSelection }
export { dispatchAnchorTextSelection as dispatchAnchorTextSelection_alias_1 }

declare interface DispatchAnchorTextSelectionProps extends TestEditorViewProps, AnchorHeadProps {
}

declare function dispatchCellSelection(props: DispatchNodeSelectionProps): void;
export { dispatchCellSelection }
export { dispatchCellSelection as dispatchCellSelection_alias_1 }

/**
 * Dispatch a text selection from the provided pos.
 */
declare function dispatchNodeSelection(props: DispatchNodeSelectionProps): void;
export { dispatchNodeSelection }
export { dispatchNodeSelection as dispatchNodeSelection_alias_1 }

declare interface DispatchNodeSelectionProps extends TestEditorViewProps, PosProps {
}

/**
 * Dispatch a text selection from start to [end]
 */
declare function dispatchTextSelection(props: DispatchTextSelectionProps): void;
export { dispatchTextSelection }
export { dispatchTextSelection as dispatchTextSelection_alias_1 }

declare interface DispatchTextSelectionProps extends TestEditorViewProps {
    /**
     * This defaults to the anchor.
     */
    start: number;
    end?: number;
}

declare const doc: pm.NodeBuilder;
export { doc }
export { doc as doc_alias_1 }

declare const em: pm.MarkBuilder;
export { em }
export { em as em_alias_1 }

declare type EventType = keyof typeof rawEventMap | 'doubleClick' | 'tripleClick';
export { EventType }
export { EventType as EventType_alias_1 }

/**
 * Find the first text node with the provided string.
 */
declare function findTextNode(node: Node, text: string): Node | undefined;
export { findTextNode }
export { findTextNode as findTextNode_alias_1 }

/**
 * Fires an event at the provided position or the current selected position in
 * the dom.
 */
declare function fireEventAtPosition(props: FireEventAtPositionProps): void;
export { fireEventAtPosition }
export { fireEventAtPosition as fireEventAtPosition_alias_1 }

declare interface FireEventAtPositionProps extends TestEditorViewProps, FireProps {
}

declare interface FireProps {
    /**
     * The event to fire on the view
     */
    event: EventType;
    /**
     * Options passed into the event
     */
    options?: Shape;
    /**
     * Override the default position to use
     */
    position?: number;
}
export { FireProps }
export { FireProps as FireProps_alias_1 }

/**
 * Flushes the dom
 */
declare function flush(view: TestEditorView): void;
export { flush }
export { flush as flush_alias_1 }

/**
 * Simulate a backspace key press.
 */
declare function forwardDelete(props: BackspaceProps): void;
export { forwardDelete }
export { forwardDelete as forwardDelete_alias_1 }

declare const h1: pm.NodeBuilder;
export { h1 }
export { h1 as h1_alias_1 }

declare const h2: pm.NodeBuilder;
export { h2 }
export { h2 as h2_alias_1 }

declare const h3: pm.NodeBuilder;
export { h3 }
export { h3 as h3_alias_1 }

declare const h4: pm.NodeBuilder;
export { h4 }
export { h4 as h4_alias_1 }

declare const h5: pm.NodeBuilder;
export { h5 }
export { h5 as h5_alias_1 }

declare const h6: pm.NodeBuilder;
export { h6 }
export { h6 as h6_alias_1 }

declare const hardBreak: NodeBuilder;
export { hardBreak }
export { hardBreak as hardBreak_alias_1 }

declare const heading: NodeBuilder;
export { heading }
export { heading as heading_alias_1 }

declare const horizontalRule: NodeBuilder;
export { horizontalRule }
export { horizontalRule as horizontalRule_alias_1 }

declare const hr: NodeBuilder;
export { hr }
export { hr as hr_alias_1 }

declare const image: NodeBuilder;
export { image }
export { image as image_alias_1 }

declare const img: NodeBuilder;
export { img }
export { img as img_alias_1 }

/**
 * Initialize the selection based on the passed in tagged node via it's cursor.
 *
 * The supported tags are `['cursor', 'node', 'start', 'end', 'anchor', 'all']`
 *
 * @param taggedDoc
 */
declare function initSelection(taggedDoc: ProsemirrorNode): Selection_2 | undefined;
export { initSelection }
export { initSelection as initSelection_alias_1 }

/**
 * Insert text from the provided index. Each key is entered individually to
 * better simulate calls to handleTextInput.
 */
declare function insertText(props: InsertTextProps): void;
export { insertText }
export { insertText as insertText_alias_1 }

declare interface InsertTextProps extends TestEditorViewProps, TextProps {
    /**
     * The start point of text insertion
     */
    start: number;
}
export { InsertTextProps }
export { InsertTextProps as InsertTextProps_alias_1 }

declare interface KeyboardShortcutProps extends TestEditorViewProps {
    /**
     * The keyboard shortcut to run
     */
    shortcut: string;
}

declare const li: pm.NodeBuilder;
export { li }
export { li as li_alias_1 }

declare const link: pm.MarkBuilder;
export { link }
export { link as link_alias_1 }

declare interface MarkTypeAttributes extends Record<string, any> {
    markType: string;
}

declare interface NodeTypeAttributes extends Record<string, any> {
    nodeType: string;
}

declare const ol: pm.NodeBuilder;
export { ol }
export { ol as ol_alias_1 }

declare const p: pm.NodeBuilder;
export { p }
export { p as p_alias_1 }

declare const paragraph: pm.NodeBuilder;
export { paragraph }
export { paragraph as paragraph_alias_1 }

declare const parseFromClipboard: (view: EditorView, text: string, html: string | null, plainText: boolean, $context: ResolvedPos) => Slice | null;
export { parseFromClipboard }
export { parseFromClipboard as parseFromClipboard_alias_1 }

/**
 * A paste implementation for jsdom and prosemirror.
 *
 * @remark
 *
 * It accepts an object with the `html` and `text` properties. The `text`
 * property is used to set the `text/plain` clipboard data. The `html` property
 * is used to set the `text/html` clipboard data. It also accepts an option
 * `plainText` property which is used to simulate a plain text paste (e.g. press
 * `Ctrl-Shift-V` or `Command-Shift-V`).
 *
 * @internal
 */
declare function pasteContent(props: {
    view: EditorView;
    content: ProsemirrorNode | string | {
        text: string;
        html: string;
        plainText?: boolean;
    };
}): void;
export { pasteContent }
export { pasteContent as pasteContent_alias_1 }

export { pm }
export { pm as pm_alias_1 }

/**
 * A short hand way for building prosemirror test builders with the core nodes already provided
 * - `doc`
 * - `paragraph` | 'p'
 * - `text`
 *
 * @param testSchema - The schema to use which provided a doc, paragraph and text schema
 * @param names - the extra marks and nodes to provide with their attributes
 */
declare function pmBuild<Types extends BuilderTypes = BuilderTypes>(testSchema: EditorSchema, names: Types): BuilderReturns<Types & DefaultBuilderTypes>;
export { pmBuild }
export { pmBuild as pmBuild_alias_1 }

declare const pre: NodeBuilder;
export { pre }
export { pre as pre_alias_1 }

/**
 * Press a key.
 */
declare function press(props: PressProps): void;
export { press }
export { press as press_alias_1 }

declare interface PressProps extends TestEditorViewProps {
    /**
     * The keyboard shortcut to run
     */
    char: string;
}

declare const prosemirrorMatchers: jest.ExpectExtendMap;
export { prosemirrorMatchers }
export { prosemirrorMatchers as prosemirrorMatchers_alias_1 }

/**
 * Jest serializer for prosemirror nodes and the editor state.
 */
declare const prosemirrorSerializer: jest.SnapshotSerializerPlugin;
export { prosemirrorSerializer }
export { prosemirrorSerializer as prosemirrorSerializer_alias_1 }

/**
 * An instance of this class is returned when using `createEditor`. It allows
 * for chaining of test operations and adds some useful helpers to your testing
 * toolkit.
 */
declare class ProsemirrorTestChain {
    /**
     * A static helper utility for creating new TestReturn values.
     */
    static of(view: TestEditorView): ProsemirrorTestChain;
    /**
     * The prosemirror view.
     */
    view: TestEditorView;
    /**
     * The current prosemirror node document
     */
    get doc(): ProsemirrorNode;
    /**
     * The prosemirror schema.
     */
    get schema(): Schema;
    /**
     * The prosemirror state.
     */
    get state(): EditorState;
    /**
     * The prosemirror selection.
     */
    get selection(): Selection_2;
    /**
     * The start of the current selection.
     */
    get start(): number;
    /**
     * The end of the current selection.
     */
    get end(): number;
    /**
     * The content to write to the clipboard if copy the current selection.
     */
    get copied(): {
        text: string;
        html: string;
    };
    constructor(view: TestEditorView);
    /**
     * Overwrite all the current content within the editor.
     *
     * @param newDoc - the new content to use
     */
    overwrite(newDocument: ProsemirrorNode): this;
    /**
     * Run the command within the prosemirror editor.
     *
     * @remarks
     *
     * ```ts
     * test('commands are run', () => {
     *   createEditor(doc(p('<cursor>')))
     *     .command((state, dispatch) => {
     *        if (dispatch) {
     *          dispatch(state.tr.insertText('hello'));
     *        }
     *     })
     *     .callback(content => {
     *       expect(content.state.doc).toEqualProsemirrorDocument(doc(p('hello')));
     *     })
     * })
     * ```
     *
     * @param command - the command function to run
     */
    command(command: ProsemirrorCommandFunction): this;
    /**
     * Takes any remirror command as an input and dispatches it within the
     * document context.
     *
     * @param command - the command function to run with the current state and
     * view
     */
    readonly remirrorCommand: (command: CommandFunction) => this;
    /**
     * Insert text into the editor at the current position.
     *
     * @param text - the text to insert
     */
    insertText(text: string): this;
    /**
     * Selects the text between the provided selection primitive.
     */
    readonly selectText: (selection: PrimitiveSelection) => this;
    /**
     * Type a keyboard shortcut - e.g. `Mod-Enter`.
     *
     * **NOTE** This only simulates the events. For example an `Mod-Enter` would
     * run all enter key handlers but not actually create a new line.
     *
     * @param mod - the keyboard shortcut to type
     */
    shortcut(mod: string): this;
    /**
     * Simulate a keypress which is run through the editor's key handlers.
     *
     * **NOTE** This only simulates the events. For example an `Enter` would run
     * all enter key handlers but not actually create a new line.
     *
     * @param char - the character to type
     */
    press(char: string): this;
    /**
     * Simulates a backspace keypress and deletes text backwards.
     */
    backspace(times?: number): this;
    /**
     * Logs to the dom for help debugging your tests.
     */
    debug: () => this;
    /**
     * Fire an event in the editor (very hit and miss).
     *
     * @param props - the props when firing an event
     */
    fire(props: Omit<FireEventAtPositionProps, 'view'>): this;
    /**
     * Callback function which receives the `start`, `end`, `state`, `view`,
     * `schema` and `selection` properties and allows for easier testing of the
     * current state of the editor.
     */
    callback(fn: (content: ReturnValueCallbackProps) => void): this;
    /**
     * Paste text into the editor.
     */
    paste(content: ProsemirrorNode | string | {
        text: string;
        html: string;
        plainText?: boolean;
    }): this;
}
export { ProsemirrorTestChain }
export { ProsemirrorTestChain as ProsemirrorTestChain_alias_1 }

declare const rawEventMap: {
    copy: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    cut: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    paste: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    compositionEnd: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    compositionStart: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    compositionUpdate: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    keyDown: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
            charCode: number;
        };
    };
    keyPress: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
            charCode: number;
        };
    };
    keyUp: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
            charCode: number;
        };
    };
    focus: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    blur: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    focusIn: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    focusOut: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    change: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    input: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    invalid: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    submit: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    reset: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    click: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
            button: number;
        };
    };
    contextMenu: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dblClick: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    drag: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragEnd: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragEnter: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragExit: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragLeave: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragOver: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    dragStart: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    drop: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseDown: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseEnter: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseLeave: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseMove: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseOut: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseOver: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    mouseUp: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    select: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    touchCancel: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    touchEnd: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    touchMove: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    touchStart: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    scroll: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    wheel: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    abort: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    canPlay: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    canPlayThrough: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    durationChange: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    emptied: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    encrypted: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    ended: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    loadedData: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    loadedMetadata: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    loadStart: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pause: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    play: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    playing: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    progress: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    rateChange: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    seeked: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    seeking: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    stalled: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    suspend: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    timeUpdate: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    volumeChange: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    waiting: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    load: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    error: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    animationStart: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    animationEnd: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    animationIteration: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    transitionEnd: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerOver: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerEnter: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerDown: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerMove: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerUp: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerCancel: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerOut: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    pointerLeave: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    gotPointerCapture: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
    lostPointerCapture: {
        Constructor: string;
        defaultProperties: {
            bubbles: boolean;
            cancelable: boolean;
        };
    };
};

declare interface ReturnValueCallbackProps extends TestEditorViewProps, EditorStateProps, SelectionProps {
    start: number;
    end: number;
    schema: Schema;
    doc: ProsemirrorNode;
    /**
     * Pretty log the current view to the dom.
     */
    debug: () => void;
}
export { ReturnValueCallbackProps }
export { ReturnValueCallbackProps as ReturnValueCallbackProps_alias_1 }

declare const schema: Schema<"doc" | "paragraph" | "text" | "blockquote" | "heading" | "code_block" | "hard_break" | "image" | "table" | "table_row" | "table_cell" | "table_header" | "atomInline" | "atomBlock" | "containerWithRestrictedContent" | "orderedList" | "bulletList" | "listItem" | "horizontalRule" | "atomContainer", "link" | "em" | "strong" | "code" | "strike">;
export { schema }
export { schema as schema_alias_1 }

/**
 * Returns a selection regardless of whether anything is tagged in the provided doc
 *
 * @param taggedDoc
 */
declare function selectionFor(taggedDoc: ProsemirrorNode): Selection_2;
export { selectionFor }
export { selectionFor as selectionFor_alias_1 }

/**
 * @deprecated You can now use `view.serializeForClipboard()` directly.
 */
declare function serializeForClipboard(view: EditorView, slice: Slice): {
    dom: HTMLElement;
    text: string;
    slice: Slice;
};
export { serializeForClipboard }
export { serializeForClipboard as serializeForClipboard_alias_1 }

/**
 * Setup the environment automatically for jest-prosemirror
 */
declare const setupProsemirrorEnvironment: () => void;
export { setupProsemirrorEnvironment }
export { setupProsemirrorEnvironment as setupProsemirrorEnvironment_alias_1 }

/**
 * Runs a keyboard shortcut.
 */
declare function shortcut(props: KeyboardShortcutProps): void;
export { shortcut }
export { shortcut as shortcut_alias_1 }

declare const strong: pm.MarkBuilder;
export { strong }
export { strong as strong_alias_1 }

declare const table: pm.NodeBuilder;
export { table }
export { table as table_alias_1 }

declare const tableCell: pm.NodeBuilder;
export { tableCell }
export { tableCell as tableCell_alias_1 }

declare const tableHeaderCell: pm.NodeBuilder;
export { tableHeaderCell }
export { tableHeaderCell as tableHeaderCell_alias_1 }

declare const tableRow: pm.NodeBuilder;
export { tableRow }
export { tableRow as tableRow_alias_1 }

/**
 * Checks that the tagged doc has a selection
 *
 * @param taggedDoc
 */
declare function taggedDocHasSelection(taggedDoc: ProsemirrorNode): boolean;
export { taggedDocHasSelection }
export { taggedDocHasSelection as taggedDocHasSelection_alias_1 }

declare interface TaggedDocProps {
    /**
     * A tagged ProsemirrorNode which can hold cursor information from the passed in text.
     */
    taggedDoc: ProsemirrorNode;
}
export { TaggedDocProps }
export { TaggedDocProps as TaggedDocProps_alias_1 }

declare interface TaggedFlatObject {
    tag: Record<string, number>;
    flat: Array<TaggedProsemirrorNode | TaggedFlatObject>;
}

declare interface TaggedProsemirrorNode extends TaggedFlatObject, ProsemirrorNode {
}
export { TaggedProsemirrorNode }
export { TaggedProsemirrorNode as TaggedProsemirrorNode_alias_1 }

declare const td: pm.NodeBuilder;
export { td }
export { td as td_alias_1 }

declare const tdCursor: ProsemirrorNode;
export { tdCursor }
export { tdCursor as tdCursor_alias_1 }

declare const tdEmpty: ProsemirrorNode;
export { tdEmpty }
export { tdEmpty as tdEmpty_alias_1 }

declare interface TestEditorView extends EditorView {
    dispatchEvent: (event: string | CustomEvent | {
        type: string;
    }) => void;
    domObserver: {
        flush: () => void;
    };
}
export { TestEditorView }
export { TestEditorView as TestEditorView_alias_1 }

declare interface TestEditorViewProps {
    /**
     * An instance of the test editor view which allows for dispatching events
     * and also containers TaggedProsemirrorNodes
     */
    view: TestEditorView;
}
export { TestEditorViewProps }
export { TestEditorViewProps as TestEditorViewProps_alias_1 }

declare const text: pm.NodeBuilder;
export { text }
export { text as text_alias_1 }

declare const th: pm.NodeBuilder;
export { th }
export { th as th_alias_1 }

declare const thCursor: ProsemirrorNode;
export { thCursor }
export { thCursor as thCursor_alias_1 }

declare const thEmpty: ProsemirrorNode;
export { thEmpty }
export { thEmpty as thEmpty_alias_1 }

declare const tr: pm.NodeBuilder;
export { tr }
export { tr as tr_alias_1 }

export declare const transformsNodeFailMessage: (actual: ProsemirrorNode, expected: ProsemirrorNode, shouldChange: boolean) => () => string;

export declare const transformsNodePassMessage: (actual: ProsemirrorNode, expected: ProsemirrorNode, shouldChange: boolean) => () => string;

declare const ul: pm.NodeBuilder;
export { ul }
export { ul as ul_alias_1 }

export { }
