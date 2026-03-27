import { ApplySchemaAttributes } from '@remirror/core';
import { CellSelection } from '@remirror/pm/tables';
import { CommandFunction } from '@remirror/core';
import { CreateExtensionPlugin } from '@remirror/core';
import type { CreateTableCommand } from '@remirror/extension-tables';
import { Decoration } from '@remirror/pm/view';
import { DispatchFunction } from '@remirror/core';
import { EditorSchema } from '@remirror/core';
import { EditorState } from '@remirror/core';
import { EditorView } from '@remirror/core';
import { EditorView as EditorView_2 } from '@remirror/pm';
import { FindProsemirrorNodeResult } from '@remirror/core';
import { MouseEventHandler } from 'react';
import { Node as Node_2 } from '@remirror/pm/model';
import { NodeSpecOverride } from '@remirror/core';
import { NodeView } from '@remirror/core';
import { NodeViewMethod } from '@remirror/core';
import { Plugin as Plugin_2 } from '@remirror/pm/state';
import { PluginKey } from '@remirror/pm/state';
import { Positioner } from '@remirror/extension-positioner';
import { ProsemirrorNode } from '@remirror/core';
import { ProsemirrorNode as ProsemirrorNode_2 } from '@remirror/pm';
import { ProsemirrorPlugin } from '@remirror/core';
import { default as React_2 } from 'react';
import { ResolvedPos } from '@remirror/pm';
import { ResolvedPos as ResolvedPos_2 } from '@remirror/core';
import { Selection as Selection_2 } from '@remirror/pm/state';
import { TableCellExtension as TableCellExtension_2 } from '@remirror/extension-tables';
import { TableControllerCellExtension as TableControllerCellExtension_2 } from '@remirror/extension-tables';
import { TableExtension as TableExtension_2 } from '@remirror/extension-tables';
import { TableHeaderCellExtension as TableHeaderCellExtension_2 } from '@remirror/extension-tables';
import { TableMap } from '@remirror/pm/tables';
import { TableRect } from '@remirror/pm/tables';
import { TableRowExtension as TableRowExtension_2 } from '@remirror/extension-tables';
import type { TableSchemaSpec } from '@remirror/extension-tables';
import { Transaction } from '@remirror/pm/state';
import { Transaction as Transaction_2 } from '@remirror/core';
import { Transform } from '@remirror/pm/transform';
import type { UsePositionerReturn } from '@remirror/react-hooks';

/**
 * Add a column at the given position in a table.
 *
 * Taken from https://github.com/ProseMirror/prosemirror-tables/blob/v1.1.1/src/commands.js#L39
 * Use the next column instead of the previous column as the reference, so that the controller
 * cell will not be duplicated.
 */
export declare function addColumn(tr: Transaction, { map, tableStart, table }: {
    map: TableMap;
    tableStart: number;
    table: ProsemirrorNode;
}, col: number): Transaction;

/**
 * Command to add a column after the column with the selection.
 */
export declare function addColumnAfter(state: EditorState, dispatch: DispatchFunction | undefined): boolean;

/**
 * Command to add a column before the column with the selection.
 */
export declare function addColumnBefore(state: EditorState, dispatch: DispatchFunction | undefined): boolean;

/**
 * Add a row at the given position in a table.
 *
 * Taken from https://github.com/ProseMirror/prosemirror-tables/blob/v1.1.1/src/commands.js#L127
 * Use the next row instead of the previous row as the reference, so that the controller
 * cell will not be duplicated.
 */
export declare function addRow(tr: Transaction, { map, tableStart, table }: {
    map: TableMap;
    tableStart: number;
    table: ProsemirrorNode;
}, row: number): Transaction;

/**
 * Add a table row after the selection.
 */
export declare function addRowAfter(state: EditorState, dispatch: DispatchFunction | undefined): boolean;

/**
 * Add a table row before the selection.
 */
export declare function addRowBefore(state: EditorState, dispatch: DispatchFunction | undefined): boolean;

declare type AnimationEventHandler<T = Element> = EventHandler<AnimationEvent, T>;

declare type Attrs = Record<string, any>;

export declare const borderWidth = 1;

export declare interface CellAxis {
    row: number;
    col: number;
}

export declare function cellSelectionToSelection(selection: CellSelection): Selection_2;

export declare enum CellSelectionType {
    row = 1,
    col = 2,
    table = 3,
    other = 4
}

declare type ClipboardEventHandler<T = Element> = EventHandler<ClipboardEvent, T>;

export declare function columnResizing({ handleWidth, cellMinWidth, View, lastColumnResizable, firstResizableColumn, }?: {
    handleWidth?: number | undefined;
    cellMinWidth?: number | undefined;
    View?: typeof TableView | undefined;
    lastColumnResizable?: boolean | undefined;
    firstResizableColumn?: number | undefined;
}): Plugin_2<any>;

declare type CompositionEventHandler<T = Element> = EventHandler<CompositionEvent, T>;

declare class ControllerState {
    action: ControllerStateProps;
    values: ControllerStateValues;
    constructor(action: ControllerStateProps);
    apply(tr: Transaction): ControllerState;
}

declare type ControllerStateProps = Omit<Partial<ControllerStateValues>, 'tableNodeResult'>;

declare interface ControllerStateValues {
    tableNodeResult: FindProsemirrorNodeResult | null | undefined;
    preselectTable: boolean;
    preselectColumn: number;
    preselectRow: number;
    predelete: boolean;
    insertButtonAttrs: InsertButtonAttrs | null;
}

export declare enum ControllerType {
    ROW_CONTROLLER = 1,
    COLUMN_CONTROLLER = 2,
    CORNER_CONTROLLER = 3
}

declare interface Coord {
    x: number;
    y: number;
}

export declare function createControllerEvents({ view, findTable, }: {
    view: EditorView;
    findTable: FindTable;
}): DOMEvents<HTMLElement>;

export declare function createTableControllerPlugin(): ProsemirrorPlugin<ControllerState>;

export declare const default_alias: ({ view, getPos, contentDOM, }: TableControllerCellProps) => HTMLElement;

export declare const default_alias_1: ({ view, findTable, }: {
    view: EditorView_2;
    findTable: FindTable;
}) => HTMLElement[];

export declare function default_alias_2({ view, tableRect, attrs, removeInsertButton, }: TableInsertButtonProps): HTMLElement;

export declare const default_alias_3: () => HTMLElement[];

export declare function domCellAround(target: EventTarget | null): HTMLElement | null;

export declare interface DOMEvents<T> {
    onCopy?: ClipboardEventHandler<T> | undefined;
    onCopyCapture?: ClipboardEventHandler<T> | undefined;
    onCut?: ClipboardEventHandler<T> | undefined;
    onCutCapture?: ClipboardEventHandler<T> | undefined;
    onPaste?: ClipboardEventHandler<T> | undefined;
    onPasteCapture?: ClipboardEventHandler<T> | undefined;
    onCompositionEnd?: CompositionEventHandler<T> | undefined;
    onCompositionEndCapture?: CompositionEventHandler<T> | undefined;
    onCompositionStart?: CompositionEventHandler<T> | undefined;
    onCompositionStartCapture?: CompositionEventHandler<T> | undefined;
    onCompositionUpdate?: CompositionEventHandler<T> | undefined;
    onCompositionUpdateCapture?: CompositionEventHandler<T> | undefined;
    onFocus?: FocusEventHandler<T> | undefined;
    onFocusCapture?: FocusEventHandler<T> | undefined;
    onBlur?: FocusEventHandler<T> | undefined;
    onBlurCapture?: FocusEventHandler<T> | undefined;
    onChange?: FormEventHandler<T> | undefined;
    onChangeCapture?: FormEventHandler<T> | undefined;
    onBeforeInput?: FormEventHandler<T> | undefined;
    onBeforeInputCapture?: FormEventHandler<T> | undefined;
    onInput?: FormEventHandler<T> | undefined;
    onInputCapture?: FormEventHandler<T> | undefined;
    onReset?: FormEventHandler<T> | undefined;
    onResetCapture?: FormEventHandler<T> | undefined;
    onSubmit?: FormEventHandler<T> | undefined;
    onSubmitCapture?: FormEventHandler<T> | undefined;
    onInvalid?: FormEventHandler<T> | undefined;
    onInvalidCapture?: FormEventHandler<T> | undefined;
    onKeyDown?: KeyboardEventHandler<T> | undefined;
    onKeyDownCapture?: KeyboardEventHandler<T> | undefined;
    onKeyPress?: KeyboardEventHandler<T> | undefined;
    onKeyPressCapture?: KeyboardEventHandler<T> | undefined;
    onKeyUp?: KeyboardEventHandler<T> | undefined;
    onKeyUpCapture?: KeyboardEventHandler<T> | undefined;
    onAuxClick?: MouseEventHandler_2<T> | undefined;
    onAuxClickCapture?: MouseEventHandler_2<T> | undefined;
    onClick?: MouseEventHandler_2<T> | undefined;
    onClickCapture?: MouseEventHandler_2<T> | undefined;
    onContextMenu?: MouseEventHandler_2<T> | undefined;
    onContextMenuCapture?: MouseEventHandler_2<T> | undefined;
    onDblClick?: MouseEventHandler_2<T> | undefined;
    onDblClickCapture?: MouseEventHandler_2<T> | undefined;
    onDoubleClick?: MouseEventHandler_2<T> | undefined;
    onDoubleClickCapture?: MouseEventHandler_2<T> | undefined;
    onDrag?: DragEventHandler<T> | undefined;
    onDragCapture?: DragEventHandler<T> | undefined;
    onDragEnd?: DragEventHandler<T> | undefined;
    onDragEndCapture?: DragEventHandler<T> | undefined;
    onDragEnter?: DragEventHandler<T> | undefined;
    onDragEnterCapture?: DragEventHandler<T> | undefined;
    onDragExit?: DragEventHandler<T> | undefined;
    onDragExitCapture?: DragEventHandler<T> | undefined;
    onDragLeave?: DragEventHandler<T> | undefined;
    onDragLeaveCapture?: DragEventHandler<T> | undefined;
    onDragOver?: DragEventHandler<T> | undefined;
    onDragOverCapture?: DragEventHandler<T> | undefined;
    onDragStart?: DragEventHandler<T> | undefined;
    onDragStartCapture?: DragEventHandler<T> | undefined;
    onDrop?: DragEventHandler<T> | undefined;
    onDropCapture?: DragEventHandler<T> | undefined;
    onMouseDown?: MouseEventHandler_2<T> | undefined;
    onMouseDownCapture?: MouseEventHandler_2<T> | undefined;
    onMouseEnter?: MouseEventHandler_2<T> | undefined;
    onMouseLeave?: MouseEventHandler_2<T> | undefined;
    onMouseMove?: MouseEventHandler_2<T> | undefined;
    onMouseMoveCapture?: MouseEventHandler_2<T> | undefined;
    onMouseOut?: MouseEventHandler_2<T> | undefined;
    onMouseOutCapture?: MouseEventHandler_2<T> | undefined;
    onMouseOver?: MouseEventHandler_2<T> | undefined;
    onMouseOverCapture?: MouseEventHandler_2<T> | undefined;
    onMouseUp?: MouseEventHandler_2<T> | undefined;
    onMouseUpCapture?: MouseEventHandler_2<T> | undefined;
    onTouchCancel?: TouchEventHandler<T> | undefined;
    onTouchCancelCapture?: TouchEventHandler<T> | undefined;
    onTouchEnd?: TouchEventHandler<T> | undefined;
    onTouchEndCapture?: TouchEventHandler<T> | undefined;
    onTouchMove?: TouchEventHandler<T> | undefined;
    onTouchMoveCapture?: TouchEventHandler<T> | undefined;
    onTouchStart?: TouchEventHandler<T> | undefined;
    onTouchStartCapture?: TouchEventHandler<T> | undefined;
    onPointerDown?: PointerEventHandler<T> | undefined;
    onPointerDownCapture?: PointerEventHandler<T> | undefined;
    onPointerMove?: PointerEventHandler<T> | undefined;
    onPointerMoveCapture?: PointerEventHandler<T> | undefined;
    onPointerUp?: PointerEventHandler<T> | undefined;
    onPointerUpCapture?: PointerEventHandler<T> | undefined;
    onPointerCancel?: PointerEventHandler<T> | undefined;
    onPointerCancelCapture?: PointerEventHandler<T> | undefined;
    onPointerEnter?: PointerEventHandler<T> | undefined;
    onPointerEnterCapture?: PointerEventHandler<T> | undefined;
    onPointerLeave?: PointerEventHandler<T> | undefined;
    onPointerLeaveCapture?: PointerEventHandler<T> | undefined;
    onPointerOver?: PointerEventHandler<T> | undefined;
    onPointerOverCapture?: PointerEventHandler<T> | undefined;
    onPointerOut?: PointerEventHandler<T> | undefined;
    onPointerOutCapture?: PointerEventHandler<T> | undefined;
    onGotPointerCapture?: PointerEventHandler<T> | undefined;
    onGotPointerCaptureCapture?: PointerEventHandler<T> | undefined;
    onLostPointerCapture?: PointerEventHandler<T> | undefined;
    onLostPointerCaptureCapture?: PointerEventHandler<T> | undefined;
    onScroll?: UIEventHandler<T> | undefined;
    onScrollCapture?: UIEventHandler<T> | undefined;
    onWheel?: WheelEventHandler<T> | undefined;
    onWheelCapture?: WheelEventHandler<T> | undefined;
    onAnimationStart?: AnimationEventHandler<T> | undefined;
    onAnimationStartCapture?: AnimationEventHandler<T> | undefined;
    onAnimationEnd?: AnimationEventHandler<T> | undefined;
    onAnimationEndCapture?: AnimationEventHandler<T> | undefined;
    onAnimationIteration?: AnimationEventHandler<T> | undefined;
    onAnimationIterationCapture?: AnimationEventHandler<T> | undefined;
    onTransitionEnd?: TransitionEventHandler<T> | undefined;
    onTransitionEndCapture?: TransitionEventHandler<T> | undefined;
}

declare type DragEventHandler<T = Element> = EventHandler<DragEvent, T>;

declare type EventHandler<E extends Event = Event, T = Element> = (this: T, event: E) => void;

export declare type FindTable = () => FindProsemirrorNodeResult | undefined;

declare type FocusEventHandler<T = Element> = EventHandler<FocusEvent, T>;

declare type FormEventHandler<T = Element> = EventHandler<Event, T>;

export declare function getAbsoluteCoord(relativeCoord: Coord, parent: Element): Coord;

export declare function getCellAxisByCoords(view: EditorView, coords: {
    left: number;
    top: number;
}): CellAxis | null;

export declare function getCellAxisByMouseEvent(view: EditorView, event: MouseEvent): CellAxis | null;

/**
 * @deprecated
 */
export declare function getCellAxisV1($cellPos: ResolvedPos_2): CellAxis;

export declare function getCellSelectionType(selection: CellSelection): CellSelectionType;

export declare function getRelativeCoord(absoluteCoord: Coord, parent: Element): Coord;

export declare function getTableStyle(attrs: ControllerStateValues): string;

export declare function h<T extends keyof HTMLElementTagNameMap>(tagName: T, attrs?: HTMLAttributes<T> | null, ...children: Array<string | Node>): HTMLElementTagNameMap[T];

declare type HTMLAttributes<T extends keyof HTMLElementTagNameMap> = Partial<Omit<HTMLElementTagNameMap[T], 'style'> & {
    style: Partial<HTMLElement['style']>;
}> & DOMEvents<HTMLElementTagNameMap[T]>;

export declare function injectControllers({ schema, getMap, table: oldTable, }: InjectControllersProps): Node_2;

export declare interface InjectControllersProps {
    schema: EditorSchema;
    getMap: () => TableMap;
    table: Node_2;
}

export declare interface InsertButtonAttrs {
    x: number;
    y: number;
    triggerRect: DOMRect;
    row: number;
    col: number;
}

export declare const key: PluginKey<any>;

declare const key_2: PluginKey<ControllerState>;
export { key_2 as tableControllerPluginKey }
export { key_2 as tableControllerPluginKey_alias_1 }

declare type KeyboardEventHandler<T = Element> = EventHandler<KeyboardEvent, T>;

/**
 * Creates a positioner for the current table cell node which will show the
 * cell menu.
 *
 * It spans the full width and height of the table cell node.
 */
export declare const menuCellPositioner: Positioner<FindProsemirrorNodeResult>;

declare type MouseEventHandler_2<T = Element> = EventHandler<MouseEvent, T>;

declare type PointerEventHandler<T = Element> = EventHandler<PointerEvent, T>;

export declare function pointsAtCell($pos: ResolvedPos): false | null | ProsemirrorNode_2;

export declare interface ReactTableControllerCellAttrs {
    colspan: number;
    rowspan: number;
    colwidth: null | number;
    background: null | string;
}

export declare type ReactTableNodeAttrs<T extends Record<string, any> = Record<never, never>> = T & {
    isControllersInjected: boolean;
    insertButtonAttrs: InsertButtonAttrs | null;
};

export declare function repeat<T>(val: T, times: number): T[];

export declare function replaceChildren(parent: HTMLElement, children: HTMLElement[]): void;

export declare function resetControllerPluginMeta(tr: Transaction): Transaction;

export declare function selectionToCellSelection(selection: Selection_2): CellSelection;

export declare function setAttr<T extends any>(attrs: Record<string, T>, name: string, value: T): Record<string, T>;

export declare function setControllerPluginMeta(tr: Transaction, props: ControllerStateProps): Transaction;

export declare function setNodeAttrs<T extends Transform>(tr: T, pos: number, attrs: Attrs, node?: ProsemirrorNode_2 | null | undefined): T;

export declare function setPredelete(view: EditorView, value: boolean): void;

export declare function shouldHideInsertButton(attrs: InsertButtonAttrs, e: MouseEvent): boolean;

export declare function stopEvent(e: Pick<MouseEvent, 'preventDefault' | 'stopPropagation'>): void;

declare class TableCellExtension extends TableCellExtension_2 {
    get name(): "tableCell";
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
}
export { TableCellExtension }
export { TableCellExtension as TableCellExtension_alias_1 }

declare const TableCellMenu: React_2.FC<TableCellMenuProps>;
export { TableCellMenu }
export { TableCellMenu as TableCellMenu_alias_1 }

declare type TableCellMenuComponent = React_2.ComponentType<TableCellMenuComponentProps>;

declare interface TableCellMenuComponentProps {
    popupOpen: boolean;
    setPopupOpen: React_2.Dispatch<React_2.SetStateAction<boolean>>;
}
export { TableCellMenuComponentProps }
export { TableCellMenuComponentProps as TableCellMenuComponentProps_alias_1 }

declare interface TableCellMenuProps {
    Component?: TableCellMenuComponent;
}
export { TableCellMenuProps }
export { TableCellMenuProps as TableCellMenuProps_alias_1 }

declare const TableComponents: React_2.FC<TableComponentsProps>;
export { TableComponents }
export { TableComponents as TableComponents_alias_1 }

export declare interface TableComponentsProps {
    /**
     * Whether to use `TableCellMenu`.
     *
     * @defaultValue true
     */
    enableTableCellMenu?: boolean;
    /**
     * The props that will passed to `TableCellMenu`
     */
    tableCellMenuProps?: TableCellMenuProps;
    /**
     * Whether to use `TableDeleteRowColumnButton`.
     *
     * @defaultValue true
     */
    enableTableDeleteRowColumnButton?: boolean;
    /**
     * The props that will passed to `TableDeleteRowColumnButton`
     */
    tableDeleteRowColumnButtonProps?: TableDeleteRowColumnButtonProps;
    /**
     * Whether to use `TableDeleteButton`.
     *
     * @defaultValue true
     */
    enableTableDeleteButton?: boolean;
    /**
     * The props that will passed to `TableDeleteButton`
     */
    tableDeleteButtonProps?: TableDeleteButtonProps;
}

declare class TableControllerCellExtension extends TableControllerCellExtension_2 {
    createNodeSpec(extra: ApplySchemaAttributes): TableSchemaSpec;
    createNodeViews(): NodeViewMethod;
    createExtensions(): never[];
    createPlugin(): CreateExtensionPlugin;
}
export { TableControllerCellExtension }
export { TableControllerCellExtension as TableControllerCellExtension_alias_1 }

export declare interface TableControllerCellProps {
    view: EditorView;
    getPos: () => number;
    contentDOM: HTMLElement;
}

export declare class TableControllerCellView implements NodeView {
    node: Node_2;
    view: EditorView;
    getPos: () => number;
    dom: HTMLElement;
    contentDOM: HTMLElement;
    constructor(node: Node_2, view: EditorView, getPos: () => number);
    ignoreMutation(): boolean;
    stopEvent(): boolean;
}

declare const TableDeleteButton: React_2.FC<TableDeleteButtonProps>;
export { TableDeleteButton }
export { TableDeleteButton as TableDeleteButton_alias_1 }

declare interface TableDeleteButtonProps {
    Component?: React_2.ComponentType<TableDeleteInnerButtonProps>;
}
export { TableDeleteButtonProps }
export { TableDeleteButtonProps as TableDeleteButtonProps_alias_1 }

declare const TableDeleteInnerButton: React_2.FC<TableDeleteInnerButtonProps>;
export { TableDeleteInnerButton }
export { TableDeleteInnerButton as TableDeleteInnerButton_alias_1 }

declare interface TableDeleteInnerButtonProps {
    /**
     * The position of the button
     */
    position: UsePositionerReturn;
    /**
     * The action when the button is pressed.
     */
    onClick: MouseEventHandler;
    /**
     * The action when the mouse is pressed on the button.
     */
    onMouseDown: MouseEventHandler;
    /**
     * The action when the mouse is over the button.
     */
    onMouseEnter: MouseEventHandler;
    /**
     * The action when the mouse level the button.
     */
    onMouseLeave: MouseEventHandler;
}
export { TableDeleteInnerButtonProps }
export { TableDeleteInnerButtonProps as TableDeleteInnerButtonProps_alias_1 }

declare const TableDeleteRowColumnButton: React_2.FC<TableDeleteRowColumnButtonProps>;
export { TableDeleteRowColumnButton }
export { TableDeleteRowColumnButton as TableDeleteRowColumnButton_alias_1 }

declare interface TableDeleteRowColumnButtonProps {
    Component?: React_2.ComponentType<TableDeleteRowColumnInnerButtonProps>;
}
export { TableDeleteRowColumnButtonProps }
export { TableDeleteRowColumnButtonProps as TableDeleteRowColumnButtonProps_alias_1 }

declare const TableDeleteRowColumnInnerButton: React_2.FC<TableDeleteRowColumnInnerButtonProps>;
export { TableDeleteRowColumnInnerButton }
export { TableDeleteRowColumnInnerButton as TableDeleteRowColumnInnerButton_alias_1 }

declare interface TableDeleteRowColumnInnerButtonProps {
    /**
     * The position of the button
     */
    position: UsePositionerReturn;
    /**
     * The action when the button is pressed.
     */
    onClick: MouseEventHandler;
    /**
     * The action when the mouse is pressed on the button.
     */
    onMouseDown: MouseEventHandler;
    /**
     * The action when the mouse is over the button.
     */
    onMouseOver: MouseEventHandler;
    /**
     * The action when the mouse level the button.
     */
    onMouseOut: MouseEventHandler;
}
export { TableDeleteRowColumnInnerButtonProps }
export { TableDeleteRowColumnInnerButtonProps as TableDeleteRowColumnInnerButtonProps_alias_1 }

declare class TableExtension extends TableExtension_2 {
    get name(): "table";
    createNodeViews(): NodeViewMethod;
    /**
     * Add the table plugins to the editor.
     */
    createExternalPlugins(): ProsemirrorPlugin[];
    createNodeSpec(extra: ApplySchemaAttributes): TableSchemaSpec;
    /**
     * Create the table extensions. Set the priority to low so that they appear
     * lower down in the node list.
     */
    createExtensions(): TableRowExtension[];
    onView(view: EditorView): void;
    /**
     * Create a table in the editor at the current selection point.
     */
    createTable(options?: CreateTableCommand): CommandFunction;
    /**
     * Command to add a column before the column with the selection.
     */
    addTableColumnBefore(): CommandFunction;
    /**
     * Command to add a column after the column with the selection.
     */
    addTableColumnAfter(): CommandFunction;
    /**
     * Add a table row before the current selection.
     */
    addTableRowBefore(): CommandFunction;
    /**
     * Add a table row after the current selection.
     */
    addTableRowAfter(): CommandFunction;
    createPlugin(): CreateExtensionPlugin;
}
export { TableExtension }
export { TableExtension as TableExtension_alias_1 }

declare class TableHeaderCellExtension extends TableHeaderCellExtension_2 {
    get name(): "tableHeaderCell";
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
}
export { TableHeaderCellExtension }
export { TableHeaderCellExtension as TableHeaderCellExtension_alias_1 }

export declare interface TableInsertButtonProps {
    view: EditorView;
    tableRect: TableRect;
    attrs: InsertButtonAttrs;
    removeInsertButton: (tr: Transaction_2) => Transaction_2;
}

declare class TableRowExtension extends TableRowExtension_2 {
    get name(): "tableRow";
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
    /**
     * Automatically create the `TableCellExtension`,`TableHeaderCellExtension`
     * and `TableControllerCellExtension`. This is placed here so that this
     * extension can be tested independently from the `TableExtension`.
     */
    createExtensions(): (TableCellExtension | TableControllerCellExtension | TableHeaderCellExtension)[];
}
export { TableRowExtension }
export { TableRowExtension as TableRowExtension_alias_1 }

export declare class TableView implements NodeView {
    node: Node_2;
    cellMinWidth: number;
    decorations: readonly Decoration[];
    view: EditorView;
    getPos: () => number;
    readonly root: HTMLElement;
    readonly table: HTMLTableElement;
    readonly colgroup: HTMLTableColElement;
    readonly tbody: HTMLTableSectionElement;
    readonly insertButtonWrapper: HTMLElement;
    private readonly handleMouseMove;
    private showInsertButton;
    private removeInsertButton?;
    map: TableMap;
    get dom(): HTMLElement;
    get contentDOM(): HTMLElement;
    constructor(node: Node_2, cellMinWidth: number, decorations: readonly Decoration[], view: EditorView, getPos: () => number);
    update(node: Node_2, decorations: readonly Decoration[]): boolean;
    private render;
    private renderTable;
    private renderInsertButton;
    private attrs;
    ignoreMutation(): boolean;
    destroy(): void;
}

declare type TouchEventHandler<T = Element> = EventHandler<TouchEvent, T>;

declare type TransitionEventHandler<T = Element> = EventHandler<TransitionEvent, T>;

declare type UIEventHandler<T = Element> = EventHandler<UIEvent, T>;

declare type WheelEventHandler<T = Element> = EventHandler<WheelEvent, T>;

export { }
