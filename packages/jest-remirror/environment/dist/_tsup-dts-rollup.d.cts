/// <reference types="jest" />

import { ActiveFromExtensions } from '@remirror/core';
import { AnyExtension } from '@remirror/core';
import { AnyExtensionConstructor } from '@remirror/core';
import type { AttributesProps } from '@remirror/core';
import { BuiltinPreset } from '@remirror/core';
import { ChainedFromExtensions } from '@remirror/core';
import { CommandFunctionProps } from '@remirror/core';
import { CommandsFromExtensions } from '@remirror/core';
import type { CorePreset } from '@remirror/preset-core';
import type { CreateCoreManagerOptions } from '@remirror/preset-core';
import type { DomFrameworkProps } from '@remirror/dom';
import { EditorSchema } from '@remirror/core';
import { EditorState } from '@remirror/core';
import { ExtensionConstructorProps } from '@remirror/core';
import { FireProps } from 'jest-prosemirror';
import { HelpersFromExtensions } from '@remirror/core';
import { Mark } from '@remirror/pm/model';
import { Node as Node_2 } from '@remirror/pm/model';
import { OptionsOfConstructor } from '@remirror/core';
import { PrimitiveSelection } from '@remirror/core';
import type { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import { RemirrorManager } from '@remirror/core';
import { SchemaProps } from '@remirror/core';
import { Selection as Selection_2 } from '@remirror/pm/state';
import { Slice } from '@remirror/pm/model';
import { TestEditorView } from 'jest-prosemirror';
import type { TestEditorViewProps } from 'jest-prosemirror';
import { Transaction } from '@remirror/core';

declare interface BaseFactoryProps extends Partial<AttributesProps> {
    /**
     * The name of the node or mark
     */
    name: string;
    /**
     * The editor schema
     */
    schema: EditorSchema;
}
export { BaseFactoryProps }
export { BaseFactoryProps as BaseFactoryProps_alias_1 }

/**
 * Builds a 'clean' version of the nodes, without Tags or TagTrackers.
 */
export declare function clean(props: CleanProps): Node_2[] | Node_2 | undefined;

declare interface CleanProps extends SchemaProps {
    /**
     * The tagged content which will be replaced with a clean Prosemirror node
     */
    content: TaggedContent;
}

/**
 * Coerce builder content into tagged nodes.
 *
 * Checks if the content item is a string and runs the text transformer
 * otherwise passes a flattened structure through to the `sequence` function
 */
export declare function coerce(props: CoerceProps): SequenceReturn;

declare interface CoerceProps extends SchemaProps {
    /**
     * Content that will be transformed into taggedNodes
     */
    content: TaggedContentWithText[];
}

export declare function createSelectionFromTaggedDocument(doc: ProsemirrorNode, tags: Tags): Selection_2 | null;

/**
 * Test that your extension is valid.
 */
declare function extensionValidityTest<Type extends AnyExtensionConstructor>(Extension: Type, ...[options]: ExtensionConstructorProps<OptionsOfConstructor<Type>>): void;
export { extensionValidityTest }
export { extensionValidityTest as extensionValidityTest_alias_1 }

/**
 * Flattens all content.
 *
 * @param content[] - spread parameter for tagged content with text
 */
export declare function fragment(...content: TaggedContentWithText[]): TaggedContentWithText[];

declare type FunctionLike = (...args: any[]) => any;

/**
 * There are a few warnings about unsupported JSDOM APIS. Calling this function
 * with true turns them all off.
 *
 * @param shouldIgnore - whether to ignore. Defaults to `true`.
 */
declare function ignoreJSDOMWarnings(shouldIgnore?: boolean): void;
export { ignoreJSDOMWarnings }
export { ignoreJSDOMWarnings as ignoreJSDOMWarnings_alias_1 }

/**
 * Insert
 */
declare interface InsertProps extends TestEditorViewProps {
    /**
     * The content to replace the current selection with
     * This can be strings a node or an array of nodes.
     */
    content: string[] | TaggedProsemirrorNode | TaggedProsemirrorNode[];
}

/**
 * Check if a node is tagged.
 */
export declare function isTaggedNode(value: unknown): value is TaggedProsemirrorNode;

/**
 * Polyfill DOMElement.innerText because JSDOM lacks support for it. See
 * {@link https://github.com/tmpvar/jsdom/issues/1245}
 */
declare function jsdomPolyfill(): void;
export { jsdomPolyfill }
export { jsdomPolyfill as jsdomPolyfill_alias_1 }

declare type MarkFactory = (...content: TaggedContentWithText[]) => TaggedProsemirrorNode[];

/**
 * Create a builder for marks.
 */
export declare function markFactory(props: MarkFactoryProps): MarkFactory;

declare interface MarkFactoryProps extends BaseFactoryProps {
    allowDupes?: boolean;
}

declare type MarkWithAttributes<Names extends string> = {
    [P in Names]: (attrs?: ProsemirrorAttributes) => (...content: TaggedContentWithText[]) => TaggedProsemirrorNode[];
};
export { MarkWithAttributes }
export { MarkWithAttributes as MarkWithAttributes_alias_1 }

declare type MarkWithoutAttributes<Names extends string> = {
    [P in Names]: (...content: TaggedContentWithText[]) => TaggedProsemirrorNode[];
};
export { MarkWithoutAttributes }
export { MarkWithoutAttributes as MarkWithoutAttributes_alias_1 }

declare interface Mock<T extends FunctionLike> extends Function, MockInstance {
    (...args: Parameters<T>): ReturnType<T>;
}

declare interface MockInstance {
    getCalledTimes: () => number;
    getCalled: () => boolean;
}

declare type NodeFactory = (...content: TaggedContentWithText[]) => TaggedProsemirrorNode;

/**
 * Create a builder function for nodes.
 */
export declare function nodeFactory(props: NodeFactoryProps): NodeFactory;

declare interface NodeFactoryProps extends BaseFactoryProps {
    /**
     * The marks which wrap this node.
     */
    marks?: Mark[];
}

declare type NodeWithAttributes<Names extends string> = {
    [P in Names]: (attrs?: ProsemirrorAttributes) => (...content: TaggedContentWithText[]) => TaggedProsemirrorNode;
};
export { NodeWithAttributes }
export { NodeWithAttributes as NodeWithAttributes_alias_1 }

declare type NodeWithoutAttributes<Names extends string> = {
    [P in Names]: (...content: TaggedContentWithText[]) => TaggedProsemirrorNode;
};
export { NodeWithoutAttributes }
export { NodeWithoutAttributes as NodeWithoutAttributes_alias_1 }

/**
 * Offset tag position values by some amount.
 */
export declare function offsetTags(tags: Tags, offset: number): Tags;

declare const remirrorMatchers: jest.ExpectExtendMap;
export { remirrorMatchers }
export { remirrorMatchers as remirrorMatchers_alias_1 }

/**
 * This creates a chainable test helper for testing your remirror presets,
 * extensions and commands.
 *
 * @typeParam Extension - All the extensions being used within this editor
 */
declare class RemirrorTestChain<Extension extends AnyExtension> {
    #private;
    /**
     * A static method for creating the test helpers when testing your remirror
     * models.
     */
    static create<Extension extends AnyExtension = Remirror.Extensions>(manager: RemirrorManager<Extension>): RemirrorTestChain<Extension>;
    /**
     * The nodes available for building the prosemirror document.
     */
    readonly nodes: Omit<NodeWithoutAttributes<this['manager']['~N'] | 'p'>, 'text'>;
    /**
     * The marks available for building up the prosemirror document.
     */
    readonly marks: MarkWithoutAttributes<this['manager']['~M']>;
    /**
     * This is similar to the `node` except that each function returned here is
     * able to receive custom attributes.
     *
     * ```ts
     * import { HeadingExtension } from 'remirror/extensions';
     *
     * const editor = renderEditor<HeadingExtension>([new HeadingExtension()])
     * const { heading } = editor.attributeNodes;
     *
     * heading({ level: 4, id: '1223' })('My custom heading');
     * ```
     *
     * This attaches the attributes `level` and `id` to the `heading` node and the
     * content `My custom heading` and would be rendered to HTML as:
     * ```html
     * <h4 id="1224">My custom heading</h4>
     * ```
     *
     * Use this when testing nodes that can take custom attributes.
     */
    readonly attributeNodes: Omit<NodeWithAttributes<this['manager']['~N']>, 'text'>;
    /**
     * This is very similar to the `attributeNodes` except for marks which can
     * need to provide custom attributes.
     *
     * Use this when testing marks that can take custom attributes.
     */
    readonly attributeMarks: MarkWithAttributes<this['manager']['~M']>;
    /**
     * Provide access to the editor manager.
     */
    get manager(): RemirrorManager<Extension>;
    /**
     * The editor view.
     */
    get view(): TestEditorView;
    /**
     * The editor state.
     */
    get state(): EditorState;
    /**
     * The editor state.
     */
    get tr(): Transaction;
    /**
     * The editor schema.
     */
    get schema(): EditorSchema;
    /**
     * The root node for the editor.
     */
    get doc(): ProsemirrorNode;
    /**
     * The commands available in the editor. When updating the content of the
     * TestEditor make sure not to use a stale copy of the actions otherwise it
     * will throw errors due to using an outdated state.
     */
    get commands(): CommandsFromExtensions<Extension>;
    /**
     * The chainable commands available in the editor. When updating the content of the
     * TestEditor make sure not to use a stale copy of the actions otherwise it
     * will throw errors due to using an outdated state.
     */
    get chain(): ChainedFromExtensions<Extension>;
    /**
     * Access to which nodes and marks are active under the current selection.
     */
    get active(): ActiveFromExtensions<Extension>;
    /**
     * The helpers available in the editor. When updating the content of the
     * TestEditor make sure not to use a stale copy of the helpers object
     * otherwise it will throw errors due to using an outdated state.
     */
    get helpers(): HelpersFromExtensions<Extension>;
    /**
     * The start of the current selection
     */
    get from(): number;
    /**
     * The end of the current selection. For a cursor selection this will be the
     * same as the start.
     */
    get to(): number;
    /**
     * The content to write to the clipboard if copy the current selection.
     */
    get copied(): {
        text: string;
        html: string;
    };
    /**
     * All custom tags that have been added  *not including* the following
     * - `<start>`
     * - `<end>`
     * - `<node>`
     * - `<cursor>`
     * - `<all>`
     * - `<anchor>`
     *
     * Which are all part of the formal cursor and selection API.
     */
    get tags(): Tags;
    /**
     * The dom node holding the view.
     */
    get dom(): HTMLElement;
    /**
     * The innerHTML for the editor.
     */
    get innerHTML(): string;
    private constructor();
    /**
     * Replace the manager with the newly cloned manager when cloned.
     */
    private setupCloneListener;
    /**
     * Create the node and mark document builders.
     */
    private createDocBuilders;
    /**
     * Add content to the editor.
     *
     * If content already exists it will be overwritten.
     */
    readonly add: (taggedDocument: TaggedProsemirrorNode) => this;
    /**
     * Alias for add.
     */
    readonly overwrite: (taggedDocument: TaggedProsemirrorNode) => this;
    /**
     * Updates the tags.
     */
    readonly update: (tags?: Tags) => this;
    /**
     * Selects the text between the provided start and end.
     */
    readonly selectText: (selection: PrimitiveSelection) => this;
    /**
     * Allows for the chaining of calls and is useful for running tests after
     * actions.
     *
     * You shouldn't use it to call any mutative functions that would change the
     * editor state.
     *
     * ```ts
     * const create = () => renderEditor({ plainNodes: [], others: [new EmojiExtension()] });
     * const {
     *   nodes: { p, doc },
     *   add,
     * } = create();
     *
     * add(doc(p('<cursor>'))).insertText(':-)')
     *   .callback(content => {
     *     expect(content.state.doc).toEqualRemirrorDocument(doc(p('😃')));
     *   })
     *   .insertText(' awesome')
     *   .callback(content => {
     *      expect(content.state.doc).toEqualRemirrorDocument(doc(p('😃 awesome')));
     *   });
     * ```
     */
    readonly callback: (fn: (content: Pick<this, 'helpers' | 'commands' | 'to' | 'state' | 'tags' | 'from' | 'doc' | 'view'>) => void) => this;
    /**
     * Runs a keyboard shortcut. e.g. `Mod-X`
     *
     * @param text
     */
    readonly shortcut: (text: string) => this;
    /**
     * A simplistic implementation of pasting content into the editor. Underneath
     * it calls the paste handler `transformPaste` and that is all.
     *
     * @param content - The text or node to paste into the document at the current
     * —ion.
     */
    readonly paste: (content: TaggedProsemirrorNode | string) => this;
    /**
     * Presses a key on the keyboard. e.g. `Mod-X`
     *
     * @param key - the key to press (or string representing a key)
     */
    readonly press: (char: string, times?: number) => this;
    /**
     * Simulates a backspace keypress and deletes text backwards.
     */
    readonly backspace: (times?: number) => this;
    /**
     * Simulates a forward deletion.
     */
    readonly forwardDelete: (times?: number) => this;
    /**
     * Takes any command as an input and dispatches it within the document
     * context.
     *
     * @param command - the command function to run with the current state and
     * view
     */
    readonly dispatchCommand: (command: (props: Required<CommandFunctionProps>) => any) => this;
    /**
     * Fires a custom event at the specified dom node. e.g. `click`
     *
     * @param shortcut - the shortcut to type
     */
    readonly fire: (parameters: FireProps) => this;
    /**
     * Set selection in the document to a certain position
     */
    readonly jumpTo: (pos: 'start' | 'end' | number, endPos?: number) => this;
    /**
     * A function which replaces the current selection with the new content.
     *
     * This should be used to add new content to the dom.
     */
    readonly replace: (...replacement: string[] | TaggedProsemirrorNode[]) => this;
    /**
     * Insert text at the current starting point for the cursor. Text will be
     * typed out with keys each firing a keyboard event.
     *
     * ! This doesn't currently support the use of tags and cursors.
     *
     * ! Adding multiple strings which create nodes creates an out of
     * position error
     */
    insertText: (text: string) => this;
    /**
     * Logs the view to the dom for help debugging the html in your tests.
     */
    readonly debug: (element?: HTMLElement) => this;
    /**
     * Cleanup the element from the dom. Use this if you decide against automatic
     * cleanup after tests.
     */
    readonly cleanup: () => void;
}
export { RemirrorTestChain }
export { RemirrorTestChain as RemirrorTestChain_alias_1 }

/**
 * This is the renderEditor test helper.
 *
 * @remarks
 *
 * This can be used to render your editor to the dom with all the desired
 * extensions and it returns chainable methods for inserting text and
 * dispatching commands.
 *
 * By default it already has the core preset applied.
 */
declare function renderEditor<Extension extends AnyExtension>(extensions: Extension[] | (() => Extension[]), { props, autoClean, ...options }?: RenderEditorProps<Extension>): RemirrorTestChain<Extension | CorePreset | BuiltinPreset>;
export { renderEditor }
export { renderEditor as renderEditor_alias_1 }

declare interface RenderEditorProps<Extension extends AnyExtension> extends CreateCoreManagerOptions {
    props?: Partial<Omit<DomFrameworkProps<Extension>, 'manager'>>;
    /**
     * Whether to automatically cleanup the dom once the test finishes.
     *
     * @defaultValue true
     */
    autoClean?: boolean;
}
export { RenderEditorProps }
export { RenderEditorProps as RenderEditorProps_alias_1 }

/**
 * Replace the current selection with the given content, which may be
 * string, a fragment, node, or array of nodes.
 */
export declare function replaceSelection(props: InsertProps): Tags;

/**
 * Given a collection of nodes, sequence them in an array and return the result
 * along with the updated tags.
 *
 * @param content[] - the spread of tagged content
 */
export declare function sequence(...content: TaggedContentItem[]): SequenceReturn;

declare interface SequenceReturn {
    nodes: TaggedProsemirrorNode[];
    tags: Tags;
}

/**
 * Run all the polyfills that have been identified for making `jsdom` work
 * correctly for common tests.
 *
 * If you notice any missing functionality which can be polyfilled please open
 * an issue.
 */
declare function setupRemirrorEnvironment(): void;
export { setupRemirrorEnvironment }
export { setupRemirrorEnvironment as setupRemirrorEnvironment_alias_1 }

/**
 * A super simple mock for functions.
 *
 * Use this instead of `jest.fn` in public API, because some users may not using
 * Jest environment.
 */
export declare function simpleMockFn<T extends FunctionLike>(implementation: T): Mock<T>;

export declare function slice(schema: EditorSchema): (...content: TaggedContentWithText[]) => Slice;

/**
 * The data structures of the tagged content
 */
declare type TaggedContent = TaggedContentItem | Array<ProsemirrorNode | TaggedContentItem>;
export { TaggedContent }
export { TaggedContent as TaggedContent_alias_1 }

/**
 * Content that contains tagged information.
 */
declare type TaggedContentItem = TaggedProsemirrorNode | TagTracker;
export { TaggedContentItem }
export { TaggedContentItem as TaggedContentItem_alias_1 }

/**
 * Tagged content with text as well
 */
declare type TaggedContentWithText = string | TaggedContent;
export { TaggedContentWithText }
export { TaggedContentWithText as TaggedContentWithText_alias_1 }

/**
 * A standard ProseMirror Node that also tracks tags.
 */
declare interface TaggedProsemirrorNode extends ProsemirrorNode {
    tags: Tags;
}
export { TaggedProsemirrorNode }
export { TaggedProsemirrorNode as TaggedProsemirrorNode_alias_1 }

/**
 * A useful feature of the builder is being able to declaratively mark positions
 * in content using the angled braces e.g. `<cursor>`.
 *
 * These positions are called tags, and are tracked on every node in the tree that has a tag on any of its descendants.
 */
declare interface Tags {
    [name: string]: number;
}
export { Tags }
export { Tags as Tags_alias_1 }

/**
 * ProseMirror doesn't support empty text nodes, making it difficult to
 * capture a tagged position without introducing text.
 *
 * E.g.:
 *
 *     p('<cursor>')
 *     p('Hello ', '<cursor>', 'world!')
 *
 * After the tagged syntax is stripped we're left with:
 *
 *     p('')
 *     p('Hello ', '', 'world!')
 *
 * This violates the rule of text nodes being non-empty. This class solves the
 * problem by providing an alternative data structure that *only* stores tags,
 * and can be used in scenarios where an empty text would be forbidden.
 *
 * This is done under the hood when using `text()` factory, and instead of
 * always returning a text node, it'll instead return one of two things:
 *
 * - a text node -- when given a non-empty string
 * - a tag tracker -- when given a string that *only* contains tags.
 */
declare class TagTracker {
    tags: Tags;
}
export { TagTracker }
export { TagTracker as TagTracker_alias_1 }

/**
 * Create a text node.
 *
 * Special markers called `tags` can be put in the text. Tags provide a way to
 * declaratively describe a position within some text, and then access the
 * position in the resulting node.
 */
export declare function text(value: string, schema: EditorSchema): TaggedContentItem;

export { }
