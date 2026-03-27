import { ApplySchemaAttributes } from '@remirror/core';
import { CellSelection } from '@remirror/pm/tables';
import { CommandFunction } from '@remirror/core';
import { CreateEventHandlers } from '@remirror/extension-events';
import { CreateExtensionPlugin } from '@remirror/core';
import { EditorState } from '@remirror/core';
import { FindProsemirrorNodeResult } from '@remirror/core';
import { Helper } from '@remirror/core';
import { KeyBindingProps } from '@remirror/core';
import type { Node as Node_2 } from '@remirror/pm/model';
import { NodeExtension } from '@remirror/core';
import { NodeExtensionSpec } from '@remirror/core';
import { NodeSpecOverride } from '@remirror/core';
import { NodeWithPosition } from '@remirror/core';
import { NonChainableCommandFunction } from '@remirror/core';
import { OnSetOptionsProps } from '@remirror/core';
import { Positioner } from '@remirror/extension-positioner';
import { ProsemirrorPlugin } from '@remirror/core';
import { ResolvedPos } from '@remirror/core';
import { SchemaProps } from '@remirror/core';
import { Selection as Selection_2 } from '@remirror/core';
import { StateUpdateLifecycleProps } from '@remirror/core';

/**
 * Creates a positioner for the current column in a table
 *
 * It spans the full width and height of the column containing the current cell
 */
declare const activeCellColumnPositioner: Positioner<ActiveCellColumnPositionerData>;
export { activeCellColumnPositioner }
export { activeCellColumnPositioner as activeCellColumnPositioner_alias_1 }

declare interface ActiveCellColumnPositionerData {
    pos: number;
    rect: DOMRect;
}
export { ActiveCellColumnPositionerData }
export { ActiveCellColumnPositionerData as ActiveCellColumnPositionerData_alias_1 }

/**
 * Creates a positioner for the current cell node.
 *
 * It spans the full width and height of the cell.
 */
declare const activeCellPositioner: Positioner<FindProsemirrorNodeResult>;
export { activeCellPositioner }
export { activeCellPositioner as activeCellPositioner_alias_1 }

/**
 * Creates a positioner for the current row in a table
 *
 * It spans the full width and height of the row containing the current cell
 */
declare const activeCellRowPositioner: Positioner<ActiveCellColumnPositionerData>;
export { activeCellRowPositioner }
export { activeCellRowPositioner as activeCellRowPositioner_alias_1 }

declare type ActiveCellRowPositionerData = ActiveCellColumnPositionerData;
export { ActiveCellRowPositionerData }
export { ActiveCellRowPositionerData as ActiveCellRowPositionerData_alias_1 }

/**
 * Creates a positioner if all the cells in a table are selected
 *
 * It spans the full width and height of the selected cells (the entire table)
 */
declare const allCellSelectionPositioner: Positioner<CellSelection>;
export { allCellSelectionPositioner }
export { allCellSelectionPositioner as allCellSelectionPositioner_alias_1 }

/**
 * Creates a positioner for top of each column in a table
 *
 * It returns multiple positions, for the top side of each column in a table
 */
declare const allColumnsStartPositioner: Positioner<NodeWithPosition>;
export { allColumnsStartPositioner }
export { allColumnsStartPositioner as allColumnsStartPositioner_alias_1 }

/**
 * Creates a positioner for left of each row in a table
 *
 * It returns multiple positions, for the left side of each row in a table
 */
declare const allRowsStartPositioner: Positioner<NodeWithPosition>;
export { allRowsStartPositioner }
export { allRowsStartPositioner as allRowsStartPositioner_alias_1 }

/**
 * Creates a positioner if the cell selection goes all the way from the top to the bottom of the table
 *
 * It spans the full width and height of the selected cells
 */
declare const cellColumnSelectionPositioner: Positioner<CellSelection>;
export { cellColumnSelectionPositioner }
export { cellColumnSelectionPositioner as cellColumnSelectionPositioner_alias_1 }

/**
 * Creates a positioner if the cell selection goes all the way from the left to the right of the table
 *
 * It spans the full width and height of the selected cells
 */
declare const cellRowSelectionPositioner: Positioner<CellSelection>;
export { cellRowSelectionPositioner }
export { cellRowSelectionPositioner as cellRowSelectionPositioner_alias_1 }

/**
 * Creates a positioner for the current cell selection in a table
 *
 * It spans the full width and height of the selected cells
 */
declare const cellSelectionPositioner: Positioner<CellSelection>;
export { cellSelectionPositioner }
export { cellSelectionPositioner as cellSelectionPositioner_alias_1 }

/**
 * Returns a table node of a given size.
 *
 * @remarks
 *
 * ```ts
 * const table = createTable({ schema: state.schema }); // 3x3 table node
 * dispatch(tr.replaceSelectionWith(table).scrollIntoView());
 * ```
 */
declare function createTable(props: CreateTableProps): Node_2;
export { createTable }
export { createTable as createTable_alias_1 }

declare interface CreateTableCommand {
    /**
     * Defines the number of rows to create with.
     *
     * @defaultValue 3
     */
    rowsCount?: number;
    /**
     * Defines the number of columns to create with.
     *
     * @defaultValue 3
     */
    columnsCount?: number;
    /**
     * When true the first row of the table will be a header row.
     *
     * @defaultValue true
     */
    withHeaderRow?: boolean;
    /**
     * Defines the content of each cell as a prosemirror node.
     *
     * @defaultValue undefined
     */
    cellContent?: Node_2;
}
export { CreateTableCommand }
export { CreateTableCommand as CreateTableCommand_alias_1 }

/**
 * This function creates the base for the tableNode ProseMirror specs.
 */
export declare function createTableNodeSchema(extra: ApplySchemaAttributes, override: NodeSpecOverride): Record<'table' | 'tableRow' | 'tableCell' | 'tableHeaderCell', TableSchemaSpec>;

declare const createTableOptions: Remirror.CommandDecoratorOptions;
export { createTableOptions }
export { createTableOptions as createTableOptions_alias_1 }

export declare interface CreateTableProps extends SchemaProps, CreateTableCommand {
}

/**
 * Finds the nearest parent table cell or header cell (if it exists)
 */
export declare function findCellClosestToPos(selection: Selection_2 | ResolvedPos): FindProsemirrorNodeResult | undefined;

/**
 * Finds the nearest parent table node (if it exists)
 */
export declare function findTable(selection: Selection_2 | ResolvedPos): FindProsemirrorNodeResult | undefined;

/**
 * Creates a positioner for the current column in a table if the whole column is selected
 *
 * It spans the full width and height of a selected single column
 */
declare const selectedColumnPositioner: Positioner<ActiveCellColumnPositionerData>;
export { selectedColumnPositioner }
export { selectedColumnPositioner as selectedColumnPositioner_alias_1 }

/**
 * Creates a positioner for the current row in a table if the whole row is selected
 *
 * It spans the full width and height of a selected single row
 */
declare const selectedRowPositioner: Positioner<ActiveCellColumnPositionerData>;
export { selectedRowPositioner }
export { selectedRowPositioner as selectedRowPositioner_alias_1 }

declare const TABLE_ROLES: readonly ["table", "row", "cell", "header_cell"];

/**
 * The extension for a table cell node.
 */
declare class TableCellExtension extends NodeExtension {
    get name(): "tableCell";
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
}
export { TableCellExtension }
export { TableCellExtension as TableCellExtension_alias_1 }

/**
 * This is not used in the basic table extension, but is required for this React Tables extension that extends this
 */
declare class TableControllerCellExtension extends NodeExtension {
    get name(): "tableControllerCell";
    createNodeSpec(_: ApplySchemaAttributes, __: NodeSpecOverride): TableSchemaSpec;
}
export { TableControllerCellExtension }
export { TableControllerCellExtension as TableControllerCellExtension_alias_1 }

declare class TableExtension extends NodeExtension<TableOptions> {
    private lastGoodState?;
    get name(): "table";
    createTags(): "block"[];
    /**
     * The last known good state that didn't need fixing. This helps make the fix
     * command more effective.
     */
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
    /**
     * Create the table extensions. Set the priority to low so that they appear
     * lower down in the node list.
     */
    createExtensions(): TableRowExtension[];
    onStateUpdate(props: StateUpdateLifecycleProps): void;
    createEventHandlers(): CreateEventHandlers;
    /**
     * Add the table plugins to the editor.
     */
    createExternalPlugins(): ProsemirrorPlugin[];
    createPlugin(): CreateExtensionPlugin;
    /**
     * Create a table in the editor at the current selection point.
     */
    createTable(options?: CreateTableCommand): CommandFunction;
    /**
     * Delete the table.
     */
    deleteTable(): CommandFunction;
    /**
     * Command to add a column before the column with the selection.
     */
    addTableColumnBefore(): CommandFunction;
    /**
     * Command to add a column after the column with the selection.
     */
    addTableColumnAfter(): CommandFunction;
    /**
     * Remove selected column from the table.
     */
    deleteTableColumn(): CommandFunction;
    /**
     * Add a table row before the current selection.
     */
    addTableRowBefore(): CommandFunction;
    /**
     * Add a table row after the current selection.
     */
    addTableRowAfter(): CommandFunction;
    /**
     * Delete the table row at the current selection.
     */
    deleteTableRow(): CommandFunction;
    /**
     * Toggles between merging cells.
     */
    toggleTableCellMerge(): CommandFunction;
    /**
     * Merge the table cells.
     */
    mergeTableCells(): CommandFunction;
    /**
     * Split the merged cells into individual cells.
     */
    splitTableCell(): CommandFunction;
    /**
     * Toggles between row/column header and normal cells (Only applies to first row/column).
     */
    toggleTableHeader(type?: 'column' | 'row'): CommandFunction;
    /**
     * Toggles a column as the header column.
     */
    toggleTableHeaderColumn(): CommandFunction;
    /**
     * Toggles a row as a table header row.
     */
    toggleTableHeaderRow(): CommandFunction;
    /**
     * Toggle a cell as a table header cell.
     */
    toggleTableHeaderCell(): CommandFunction;
    /**
     * Set the attribute for a table cell.
     */
    setTableCellAttribute(name: string, value: unknown): CommandFunction;
    /**
     * Fix all tables within the document.
     *
     * This is a **non-chainable** command.
     */
    fixTables(): NonChainableCommandFunction;
    /**
     * Enable table usage within the editor. This depends on the browser that
     * is being used.
     */
    enableTableSupport(): Helper<void>;
    /**
     * Determines if the first row/column is a header row/column
     */
    tableHasHeader(type?: 'column' | 'row', state?: EditorState): Helper<boolean>;
    /**
     * Update the background of one cell or multiple cells by passing a color
     * string. You can also remove the color by passing a `null`.
     */
    setTableCellBackground(background: string | null): CommandFunction;
    selectParentCell(): CommandFunction;
    expandCellSelection(type?: 'column' | 'row' | 'all'): CommandFunction;
    goToNextCell(props: KeyBindingProps): boolean;
    goToPreviousCell(props: KeyBindingProps): boolean;
    /**
     * This managers the updates of the collaboration provider.
     */
    protected onSetOptions(props: OnSetOptionsProps<TableOptions>): void;
}
export { TableExtension }
export { TableExtension as TableExtension_alias_1 }

/**
 * The extension for the table header node.
 */
declare class TableHeaderCellExtension extends NodeExtension {
    get name(): "tableHeaderCell";
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
}
export { TableHeaderCellExtension }
export { TableHeaderCellExtension as TableHeaderCellExtension_alias_1 }

declare interface TableOptions {
    /**
     * When `true` the table will be resizable.
     *
     * @defaultValue true
     */
    resizable?: boolean;
    /**
     * The options passed to the column resizing plugin
     */
    resizeableOptions?: TableResizableOptions;
    /**
     * Whether to use Tab and Shift-Tab to navigate between cells
     *
     * @defaultValue: false
     */
    tabKeyboardShortcuts?: boolean;
}
export { TableOptions }
export { TableOptions as TableOptions_alias_1 }

/**
 * Creates a positioner for the current table node.
 *
 * It spans the full width and height of the table.
 */
declare const tablePositioner: Positioner<FindProsemirrorNodeResult>;
export { tablePositioner }
export { tablePositioner as tablePositioner_alias_1 }

declare interface TableResizableOptions {
    handleWidth?: number;
    cellMinWidth?: number;
}
export { TableResizableOptions }
export { TableResizableOptions as TableResizableOptions_alias_1 }

declare type TableRole = (typeof TABLE_ROLES)[number];
export { TableRole }
export { TableRole as TableRole_alias_1 }

/**
 * The extension for a table row node.
 */
declare class TableRowExtension extends NodeExtension {
    get name(): "tableRow";
    /**
     * Automatically create the `TableCellExtension` and
     * `TableHeaderCellExtension`. This is placed here so that this extension can
     * be tested independently from the `TableExtension`.
     */
    createExtensions(): Array<TableCellExtension | TableHeaderCellExtension | TableControllerCellExtension>;
    createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec;
}
export { TableRowExtension }
export { TableRowExtension as TableRowExtension_alias_1 }

declare interface TableSchemaSpec extends NodeExtensionSpec {
    tableRole: TableRole;
}
export { TableSchemaSpec }
export { TableSchemaSpec as TableSchemaSpec_alias_1 }

export { }

declare global {
  namespace Remirror {
    interface AllExtensions {
      table: TableExtension;
    }
  }
}
