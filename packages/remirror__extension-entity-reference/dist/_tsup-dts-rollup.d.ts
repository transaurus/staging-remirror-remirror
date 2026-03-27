import type { AcceptUndefined } from '@remirror/core';
import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import type { Coords } from '@remirror/core';
import type { CreateEventHandlers } from '@remirror/extension-events';
import { CreateExtensionPlugin } from '@remirror/core';
import type { Decoration } from '@remirror/core';
import { Decoration as Decoration_2 } from '@remirror/pm/view';
import { EditorState } from '@remirror/core';
import type { FromToProps } from '@remirror/core';
import type { Handler } from '@remirror/core';
import { Helper } from '@remirror/core';
import { MarkExtension } from '@remirror/core';
import { MarkExtensionSpec } from '@remirror/core';
import { MarkSpecOverride } from '@remirror/core';
import type { Node as Node_2 } from '@remirror/pm/model';
import type { Positioner } from '@remirror/extension-positioner';
import { PrimitiveSelection } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/core';

/**
 * Render a positioner which captures the selected entityReference.
 *
 * @remarks
 *
 * This extends the selection positioner. The difference is that the from and to
 * coordinates are picked from the shortest entity reference selected.
 */
declare const centeredEntityReferencePositioner: Positioner<{
    from: Coords;
    to: Coords;
}>;
export { centeredEntityReferencePositioner }
export { centeredEntityReferencePositioner as centeredEntityReferencePositioner_alias_1 }

/**
 * Helper function to add decorations for each entity reference and also handles
 */
export declare const decorateEntityReferences: (entityReferences: EntityReferenceMetaData[][]) => Decoration_2[];

declare interface EntityReferenceAttributes {
    /**
     * Unique identifier of the entity references
     */
    id: string;
}
export { EntityReferenceAttributes }
export { EntityReferenceAttributes as EntityReferenceAttributes_alias_1 }

declare class EntityReferenceExtension extends MarkExtension<EntityReferenceOptions> {
    get name(): string;
    createMarkSpec(extra: ApplySchemaAttributes, override: MarkSpecOverride): MarkExtensionSpec;
    /**
     * Track click events passed through to the editor.
     */
    createEventHandlers(): CreateEventHandlers;
    /**
     * Create the extension plugin for inserting decorations into the editor.
     */
    createPlugin(): CreateExtensionPlugin<EntityReferenceState>;
    addEntityReference(id?: string, attrs?: ProsemirrorAttributes): CommandFunction;
    removeEntityReference(entityReferenceId: string): CommandFunction;
    /**
     * Dispatch a transaction that selects the range of the entity reference then scrolls to it.
     *
     * @param entityReferenceId - The entity's reference Id.
     *
     * @returns True if the scrolling was applied, else it returns false
     *
     */
    scrollToEntityReference(entityReferenceId: string): CommandFunction;
    /**
     * Get all disjoined entityReference attributes from the document.
     */
    getDisjoinedEntityReferences(doc: ProsemirrorNode): Helper<EntityReferenceMetaData[][]>;
    /**
     * Disjoined entityReferences are analog to ProseMirror's marks. When adding a mark
     * that spans two (or more) nodes (like paragraphs), it will be stored as two
     * (or more) marks on each node separately. The same is true for disjoined
     * entityReferences. Therefore, a entityReference that spans multiple paragraphs is
     * internally stored as multiple marks (all having the same entityReference ID as
     * attribute).
     *
     * To get the actual entityReferences (for which each entityReference ID is unique), call
     * `joinDisjoinedEntityReferences`.
     */
    getEntityReferences(state?: EditorState): Helper<EntityReferenceMetaData[]>;
    /**
     * @param entityReferenceId - The entity's reference Id.
     *
     * @returns EntityReference attributes from the editor's content, undefined if it doesn't exist.
     *
     */
    getEntityReferenceById(entityReferenceId: string, state?: EditorState): Helper<EntityReferenceMetaData | undefined>;
    /**
     * @param pos - the position in the root document to find entityReference marks.
     *
     * @returns all entityReferences at a specific position in the editor.
     *
     */
    getEntityReferencesAt(pos?: PrimitiveSelection, state?: EditorState): Helper<EntityReferenceMetaData[]>;
}
export { EntityReferenceExtension }
export { EntityReferenceExtension as EntityReferenceExtension_alias_1 }

declare type EntityReferenceMarkText = Pick<EntityReferenceMetaData, 'text'>;

declare interface EntityReferenceMetaData extends EntityReferenceAttributes, FromToProps {
    /**
     * Text content of the node
     */
    text: string;
    /**
     * Only present if you have configured extra attributes for the entity reference mark
     */
    attrs?: ProsemirrorAttributes;
}
export { EntityReferenceMetaData }
export { EntityReferenceMetaData as EntityReferenceMetaData_alias_1 }

export declare interface EntityReferenceOptions {
    /**
     * Method to calculate styles
     *
     * @remarks
     *
     * This can be used e.g. to assign different shades of a color depending on
     * the amount of entity references in a segment.
     */
    getStyle?: (entityReferences: EntityReferenceMetaData[][]) => Decoration[];
    blockSeparator?: AcceptUndefined<string>;
    onClickMark?: (entityReferences?: EntityReferenceMetaData[]) => void;
    onClick?: Handler<(entityReference: EntityReferenceMetaData) => void>;
}

export declare interface EntityReferencePluginState extends Required<EntityReferenceOptions> {
    entityReferences: EntityReferenceMetaData[][];
}

declare interface EntityReferenceState {
    entityReferences: {
        [key: string]: any;
    };
}

/**
 * Helper function to extract the extreme boundaries of the passed array of highlights.
 * minimum `from` and the maximum `to`
 */
declare const findMinMaxRange: (array: Array<Pick<EntityReferenceMetaData, 'from' | 'to'>>) => [number, number];
export { findMinMaxRange }
export { findMinMaxRange as findMinMaxRange_alias_1 }

/**
 * Get all disjoined entity reference attributes from a single node. When an inline
 * mark is added to a node, Prosemirror creates a sub-node with a new `marks`
 * array. The `pos` given to this function is the start position of that newly
 * created node (`from`) and the end position would be the start position plus
 * the length of the nodes text.
 */
export declare function getDisjoinedEntityReferencesFromNode(node: Node_2, pos: number, markTypeName: string): EntityReferenceMetaData[];

/**
 * This helper can be used when reacting to clicks on overlapping highlights.
 * In that case, the app should show the shortest entity because longer entities
 * typical have other click areas.
 *
 * @param entityReferences
 * @returns entity references with the shortest text
 */
declare const getShortestEntityReference: <T extends EntityReferenceMarkText>(entityReferences: T[]) => T | undefined;
export { getShortestEntityReference }
export { getShortestEntityReference as getShortestEntityReference_alias_1 }

/**
 * @returns entityReferences joined by ID
 */
export declare const joinDisjoinedEntityReferences: (disjoinedEntityReferences: EntityReferenceMetaData[]) => EntityReferenceMetaData[];

export declare type OmitId<Type extends EntityReferenceMetaData> = Omit<Type, 'id'>;

export { }
