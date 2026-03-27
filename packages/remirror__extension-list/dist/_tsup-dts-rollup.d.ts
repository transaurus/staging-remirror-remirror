import { AnyExtension } from '@remirror/core';
import { ApplySchemaAttributes } from '@remirror/core';
import { CommandFunction } from '@remirror/core';
import { CommandFunction as CommandFunction_2 } from '@remirror/pm';
import { CommandFunctionProps } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import { InputRule } from '@remirror/pm/inputrules';
import { KeyBindingProps } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeRange } from '@remirror/pm/model';
import { NodeSpecOverride } from '@remirror/core';
import { NodeType } from '@remirror/pm/model';
import { NodeType as NodeType_2 } from '@remirror/core';
import { NodeType as NodeType_3 } from '@remirror/pm';
import type { NodeView } from '@remirror/pm/view';
import { NodeViewMethod } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { ProsemirrorAttributes } from '@remirror/core';
import { ProsemirrorNode } from '@remirror/pm';
import { ResolvedPos } from '@remirror/pm/model';
import { Selection as Selection_2 } from '@remirror/pm/state';
import { Static } from '@remirror/core';
import { Transaction } from '@remirror/pm/state';

/**
 * Create the node for a bullet list.
 */
declare class BulletListExtension extends NodeExtension<BulletListOptions> {
    get name(): "bulletList";
    createTags(): ("listContainer" | "block")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createNodeViews(): NodeViewMethod | Record<string, never>;
    createExtensions(): ListItemExtension[];
    /**
     * Toggle the bullet list for the current selection.
     */
    toggleBulletList(): CommandFunction;
    listShortcut(props: KeyBindingProps): boolean;
    createInputRules(): InputRule[];
}
export { BulletListExtension }
export { BulletListExtension as BulletListExtension_alias_1 }

export declare interface BulletListOptions {
    /**
     * Set this to true to add a spine.
     */
    enableSpine?: Static<boolean>;
}

/**
 * Returns a range that include all selected list items.
 */
export declare function calculateItemRange(selection: Selection_2): NodeRange | null | undefined;

export declare function createCustomMarkListItemNodeView({ node, mark, updateDOM, updateMark, }: {
    node: ProsemirrorNode;
    mark: HTMLElement;
    updateDOM: UpdateElement;
    updateMark: UpdateElement;
}): NodeView;

/**
 * A helper function to dedent selected list items.
 *
 * @beta
 */
declare function dedentList(tr: Transaction): boolean;
export { dedentList }
export { dedentList as dedentList_alias_1 }

/**
 * @internal
 */
export declare const dedentListCommand: CommandFunction_2;

/**
 * A helper function to indent selected list items.
 *
 * @beta
 */
declare function indentList(tr: Transaction): boolean;
export { indentList }
export { indentList as indentList_alias_1 }

/**
 * @internal
 */
export declare const indentListCommand: CommandFunction_2;

export declare function isList(type: NodeType_3): boolean;

export declare function isListItem(type: NodeType_3): boolean;

export declare function isListItemNode(node: ProsemirrorNode): boolean;

export declare function isListNode(node: ProsemirrorNode): boolean;

/**
 * Build a command to lift the content inside a list item around the selection
 * out of list
 */
export declare function liftListItemOutOfList(itemType: NodeType_2): CommandFunction;

export declare function listBackspace({ view }: CommandFunctionProps): boolean;

export declare type ListItemAttributes = ProsemirrorAttributes<{
    /**
     * @defaultValue false
     */
    closed: boolean;
    /**
     * @defaultValue false
     */
    nested: boolean;
}>;

/**
 * Creates the node for a list item.
 */
declare class ListItemExtension extends NodeExtension<ListItemOptions> {
    get name(): "listItem";
    createTags(): "listItemNode"[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createNodeViews(): NodeViewMethod | Record<string, never>;
    createKeymap(): KeyBindings;
    createExtensions(): ListItemSharedExtension[];
    /**
     * Toggles the current list item.
     *
     * @param closed - the `closed` attribute. If it's a boolean value, then it
     * will be set as an attribute. If it's undefined, then the `closed` attribuate
     * will be toggled.
     */
    toggleListItemClosed(closed?: boolean | undefined): CommandFunction;
    /**
     * Lift the content inside a list item around the selection out of list
     */
    liftListItemOutOfList(listItemType?: NodeType | undefined): CommandFunction;
}
export { ListItemExtension }
export { ListItemExtension as ListItemExtension_alias_1 }

export declare interface ListItemOptions {
    /**
     * Set this to true to support toggling.
     */
    enableCollapsible?: Static<boolean>;
}

/**
 * Provides some shared thing used by both `listItem` and `taskListItem`
 */
declare class ListItemSharedExtension extends PlainExtension {
    get name(): "listItemShared";
    createKeymap(): KeyBindings;
    createPlugin(): CreateExtensionPlugin;
}
export { ListItemSharedExtension }
export { ListItemSharedExtension as ListItemSharedExtension_alias_1 }

export declare function maybeJoinList(tr: Transaction, $pos?: ResolvedPos): boolean;

/**
 * Creates the list for the ordered list.
 */
declare class OrderedListExtension extends NodeExtension {
    get name(): "orderedList";
    createTags(): ("listContainer" | "block")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    /**
     * Automatically add the `ListItemExtension` which is required here.
     */
    createExtensions(): ListItemExtension[];
    /**
     * Toggle the ordered list for the current selection.
     */
    toggleOrderedList(): CommandFunction;
    listShortcut(props: KeyBindingProps): boolean;
    createInputRules(): InputRule[];
}
export { OrderedListExtension }
export { OrderedListExtension as OrderedListExtension_alias_1 }

/**
 * Create a command to lift the list item around the selection up intoa wrapping
 * list. Use this function if you get multiple list item nodes in your schema.
 *
 * @deprecated use `dedentList` instead.
 */
declare function sharedLiftListItem(allExtensions: AnyExtension[]): CommandFunction;
export { sharedLiftListItem }
export { sharedLiftListItem as sharedLiftListItem_alias_1 }

/**
 * Create a command to sink the list item around the selection down into an
 * inner list. Use this function if you get multiple list item nodes in your
 * schema.
 *
 * @deprecated use `indentList` instead.
 */
declare function sharedSinkListItem(allExtensions: AnyExtension[]): CommandFunction;
export { sharedSinkListItem }
export { sharedSinkListItem as sharedSinkListItem_alias_1 }

/**
 * Build a command that splits a non-empty textblock at the top level
 * of a list item by also splitting that list item.
 */
export declare function splitListItem(listItemTypeOrName: string | NodeType_2, ignoreAttrs?: string[]): CommandFunction;

/**
 * Create the node for a task list.
 */
declare class TaskListExtension extends NodeExtension {
    get name(): "taskList";
    createTags(): ("listContainer" | "block")[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createExtensions(): TaskListItemExtension[];
    /**
     * Toggle the task list for the current selection.
     */
    toggleTaskList(): CommandFunction;
    listShortcut(props: KeyBindingProps): boolean;
}
export { TaskListExtension }
export { TaskListExtension as TaskListExtension_alias_1 }

export declare type TaskListItemAttributes = ProsemirrorAttributes<{
    /**
     * @defaultValue false
     */
    checked: boolean;
}>;

/**
 * Creates the node for a task list item.
 */
declare class TaskListItemExtension extends NodeExtension {
    get name(): "taskListItem";
    createTags(): "listItemNode"[];
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): NodeExtensionSpec;
    createNodeViews(): NodeViewMethod | Record<string, never>;
    createKeymap(): KeyBindings;
    createExtensions(): ListItemSharedExtension[];
    /**
     * Toggles the current checkbox state and transform a normal list item into a
     * checkbox list item when necessary.
     *
     * @param checked - the `checked` attribute. If it's a boolean value, then it
     * will be set as an attribute. If it's undefined, then the `checked` attribuate
     * will be toggled.
     *
     * @param selection - a resolved position within the task list item you want to
     * toggle. It it's not passed, the lower bound of the current selection's will
     * be used.
     */
    toggleCheckboxChecked(props?: {
        checked?: boolean;
        $pos?: ResolvedPos;
    } | boolean): CommandFunction;
    createInputRules(): InputRule[];
}
export { TaskListItemExtension }
export { TaskListItemExtension as TaskListItemExtension_alias_1 }

/**
 * Toggles a list.
 *
 * @remarks
 *
 * When the provided list wrapper is inactive (e.g. ul) then wrap the list with
 * this type. When it is active then remove the selected line from the list.
 *
 * @param listType - the list node type
 * @param itemType - the list item node type
 */
declare function toggleList(listType: NodeType_2, itemType: NodeType_2): CommandFunction;
export { toggleList }
export { toggleList as toggleList_alias_1 }

declare type UpdateElement = (node: ProsemirrorNode, dom: HTMLElement) => void;

/**
 * Wraps existed list items to a new type of list, which only containes these list items.
 *
 * @remarks
 *
 * @example
 *
 * Here is some pseudo-code to show the purpose of this function:
 *
 * before:
 *
 * ```html
 *  <ul>
 *    <li>item A</li>
 *    <li>item B<!-- cursor_start --></li>
 *    <li>item C<!-- cursor_end --></li>
 *    <li>item D</li>
 *  </ul>
 * ```
 *
 * after:
 *
 * ```html
 *  <ul>
 *    <li>item A</li>
 *  </ul>
 *  <ol>
 *    <li>item B<!-- cursor_start --></li>
 *    <li>item C<!-- cursor_end --></li>
 *  </ol>
 *  <ul>
 *    <li>item D</li>
 *  </ul>
 * ```
 *
 * @alpha
 */
declare function wrapSelectedItems({ listType, itemType, tr, }: {
    listType: NodeType_2;
    itemType: NodeType_2;
    tr: Transaction;
}): boolean;
export { wrapSelectedItems }
export { wrapSelectedItems as wrapSelectedItems_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      bulletList: BulletListExtension;
    }
  }
}


declare global {
  namespace Remirror {
    interface AllExtensions {
      listItem: ListItemExtension;
    }
  }
}


declare global {
  namespace Remirror {
    interface AllExtensions {
      listItemShared: ListItemSharedExtension;
    }
  }
}


declare global {
  namespace Remirror {
    interface AllExtensions {
      orderedList: OrderedListExtension;
    }
  }
}


declare global {
  namespace Remirror {
    interface AllExtensions {
      taskList: TaskListExtension;
    }
  }
}


declare global {
  namespace Remirror {
    interface AllExtensions {
      taskListItem: TaskListItemExtension;
    }
  }
}
