import { AnyExtension } from '@remirror/core';
import { DirectEditorProps } from '@remirror/pm/view';
import { DOMOutputSpec } from '@remirror/core';
import { EditorState } from '@remirror/core';
import type { EditorStateProps } from '@remirror/core';
import { EditorView } from '@remirror/pm/view';
import { Fragment } from '@remirror/core';
import { Mark } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';
import { ReactNode } from 'react';
import { RemirrorManager } from '@remirror/core';
import { Shape } from '@remirror/core';
import { Transaction } from '@remirror/core';

/**
 * Creates a new editor view
 *
 * @param place
 * @param props
 */
declare function createEditorView(place: Node | ((p: HTMLElement) => void) | null, props: DirectEditorProps): EditorView;
export { createEditorView }
export { createEditorView as createEditorView_alias_1 }

/**
 * A mock editor view used only when prosemirror is running on the server
 */
declare class EditorViewSSR {
    state: EditorState;
    dom: Element;
    dragging: null;
    root: Document | DocumentFragment;
    constructor(_place: Node | ((p: Node) => void) | {
        mount: Node;
    } | undefined, props: DirectEditorProps);
    update(_props: DirectEditorProps): void;
    setProps(_props: DirectEditorProps): void;
    updateState(_state: EditorState): void;
    someProps(_propName: string, f?: (prop: any) => any): any;
    hasFocus(): boolean;
    focus(): void;
    posAtCoords(_coords: {
        left: number;
        top: number;
    }): {
        pos: number;
        inside: number;
    } | null | undefined;
    coordsAtPos(_pos: number): {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    domAtPos(_pos: number): {
        node: Node;
        offset: number;
    };
    nodeDOM(_pos: number): Node | null | undefined;
    posAtDOM(_node: Node, _offset: number, _bias?: number | null): number;
    endOfTextblock(_dir: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward', _state?: EditorState): boolean;
    /**
     * Removes the editor from the DOM and destroys all [node
     * views](#view.NodeView).
     */
    destroy(): void;
    dispatch(_tr: Transaction): void;
}
export { EditorViewSSR }
export { EditorViewSSR as EditorViewSSR_alias_1 }

/**
 * Gather up all the toDOM methods from the provided spec object
 *
 * @param specs - the prosemirror schema specs for each node / mark
 */
export declare function gatherDomMethods<Spec extends SharedSpec>(specs: Record<string, Spec>): GatheredDomMethods<Spec>;

declare type GatheredDomMethods<Spec extends SharedSpec> = Record<string, Spec['toDOM']>;

/**
 * Map standard html attribute names to their react equivalents.
 *
 * TODO is there a better way of doing this.
 */
export declare function mapProps(props: Shape): Shape;

declare type MarkToDOM = MarkExtensionSpec['toDOM'];

declare type NodeToDOM = NodeExtensionSpec['toDOM'];

/**
 * Used to map html attributes to their supported react names
 * Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/possibleStandardNames.js#L42
 */
export declare const possibleStandardNames: Record<string, string>;

/**
 * Serialize the extension provided schema into a JSX element that can be displayed node and non-dom environments.
 */
declare class ReactSerializer<Extension extends AnyExtension> {
    #private;
    /**
     * Receives the return value from toDOM defined in the node schema and transforms it
     * into JSX
     *
     * @param structure - The DOMOutput spec for the current node
     * @param wraps - passed through any elements that this component should be parent of
     */
    static renderSpec(structure: DOMOutputSpec, wraps?: ReactNode): ReactNode;
    /**
     * Create a serializer from the extension manager
     *
     * @param manager
     */
    static fromManager<Extension extends AnyExtension>(manager: RemirrorManager<Extension>): ReactSerializer<Extension>;
    /**
     * Pluck nodes from the extension manager
     *
     * @param manager
     */
    private static nodesFromManager;
    /**
     * Pluck marks from the extension manager
     *
     * @param manager
     */
    private static marksFromManager;
    nodes: Record<string, NodeToDOM>;
    marks: Record<string, MarkToDOM>;
    constructor(nodes: Record<string, NodeToDOM>, marks: Record<string, MarkToDOM>, manager: RemirrorManager<Extension>);
    /**
     * The main entry method on this class for traversing through a schema tree and creating JSx.
     *
     * ```ts
     * reactSerializer.serializeFragment(fragment)
     * ```
     *
     * @param fragment
     */
    serializeFragment(fragment: Fragment): JSX.Element;
    /**
     * Transform the passed in node into a JSX Element
     *
     * @param node
     */
    serializeNode(node: ProsemirrorNode): ReactNode;
    /**
     * Transform the provided mark into a JSX Element that wraps the current node
     *
     * @param mark
     * @param inline
     * @param wrappedElement
     */
    serializeMark(mark: Mark, inline: boolean, wrappedElement: ReactNode): ReactNode;
}
export { ReactSerializer }
export { ReactSerializer as ReactSerializer_alias_1 }

/**
 * Remirror SSR component used for rendering in non dom environments.
 */
declare const RemirrorSSR: <Extension extends AnyExtension>(props: RemirrorSSRProps<Extension>) => JSX.Element;
export { RemirrorSSR }
export { RemirrorSSR as RemirrorSSR_alias_1 }

declare interface RemirrorSSRProps<Extension extends AnyExtension> extends EditorStateProps {
    /**
     * The attributes to pass into the root div element.
     */
    attributes: Shape;
    /**
     * Whether or not the editor is in an editable state
     */
    editable: boolean;
    /**
     * The manager.
     */
    manager: RemirrorManager<Extension>;
}
export { RemirrorSSRProps }
export { RemirrorSSRProps as RemirrorSSRProps_alias_1 }

declare type SharedSpec = MarkExtensionSpec | NodeExtensionSpec;

export { }
