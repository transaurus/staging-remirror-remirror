var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => {
  var _a6;
  return [, , , __create((_a6 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a6 : null)];
};
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/table-extensions.ts
import {
  command,
  convertCommand,
  extension,
  ExtensionPriority,
  ExtensionTag as ExtensionTag2,
  findParentNodeOfType as findParentNodeOfType2,
  helper,
  isElementDomNode,
  keyBinding,
  NodeExtension,
  nonChainable
} from "@remirror/core";
import { TextSelection } from "@remirror/pm/state";
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  CellSelection,
  columnIsHeader,
  columnResizing,
  deleteColumn,
  deleteRow,
  deleteTable,
  fixTables,
  fixTablesKey,
  goToNextCell,
  isCellSelection,
  mergeCells,
  rowIsHeader,
  setCellAttr,
  splitCell,
  tableEditing,
  TableMap,
  TableView,
  toggleHeader,
  toggleHeaderCell,
  toggleHeaderColumn,
  toggleHeaderRow,
  updateColumnsOnResize
} from "@remirror/pm/tables";

// src/table-utils.ts
import {
  ErrorConstant,
  ExtensionTag,
  findParentNodeOfType,
  includes,
  invariant,
  object,
  values
} from "@remirror/core";
import { ExtensionTablesMessages } from "@remirror/messages";
function getCellAttrs(dom) {
  var _a6, _b;
  const widthAttr = dom.getAttribute("data-colwidth");
  const widths = widthAttr && /^\d+(,\d+)*$/.test(widthAttr) ? widthAttr.split(",").map((s) => Number(s)) : null;
  const colspan = Number((_a6 = dom.getAttribute("colspan")) != null ? _a6 : 1);
  const backgroundColor = dom.getAttribute("data-background-color");
  return {
    colspan,
    rowspan: Number((_b = dom.getAttribute("rowspan")) != null ? _b : 1),
    colwidth: widths && widths.length === colspan ? widths : null,
    background: backgroundColor || dom.style.backgroundColor || null
  };
}
function setCellAttrs(node) {
  var _a6;
  const attrs = {};
  if (node.attrs.colspan !== 1) {
    attrs.colspan = node.attrs.colspan;
  }
  if (node.attrs.rowspan !== 1) {
    attrs.rowspan = node.attrs.rowspan;
  }
  if (node.attrs.colwidth) {
    attrs["data-colwidth"] = node.attrs.colwidth.join(",");
  }
  if (node.attrs.background) {
    attrs.style = "".concat((_a6 = node.attrs.style) != null ? _a6 : "", "background-color: ").concat(node.attrs.background, ";");
    attrs["data-background-color"] = node.attrs.background;
  }
  return attrs;
}
function createTableNodeSchema(extra, override) {
  var _a6, _b, _c, _d;
  const cellAttrs = __spreadProps(__spreadValues({}, extra.defaults()), {
    colspan: { default: 1 },
    rowspan: { default: 1 },
    colwidth: { default: null },
    background: { default: null }
  });
  return {
    table: __spreadProps(__spreadValues({
      isolating: true
    }, override), {
      attrs: extra.defaults(),
      content: "tableRow+",
      tableRole: "table",
      parseDOM: [{ tag: "table", getAttrs: extra.parse }, ...(_a6 = override.parseDOM) != null ? _a6 : []],
      toDOM(node) {
        return ["table", extra.dom(node), ["tbody", 0]];
      }
    }),
    tableRow: __spreadProps(__spreadValues({}, override), {
      attrs: extra.defaults(),
      content: "(tableCell | tableHeaderCell)*",
      tableRole: "row",
      parseDOM: [{ tag: "tr", getAttrs: extra.parse }, ...(_b = override.parseDOM) != null ? _b : []],
      toDOM(node) {
        return ["tr", extra.dom(node), 0];
      }
    }),
    tableCell: __spreadProps(__spreadValues({
      isolating: true,
      content: "".concat(ExtensionTag.Block, "+")
    }, override), {
      attrs: cellAttrs,
      tableRole: "cell",
      parseDOM: [
        {
          tag: "td",
          getAttrs: (dom) => __spreadValues(__spreadValues({}, extra.parse(dom)), getCellAttrs(dom))
        },
        ...(_c = override.parseDOM) != null ? _c : []
      ],
      toDOM(node) {
        return ["td", __spreadValues(__spreadValues({}, extra.dom(node)), setCellAttrs(node)), 0];
      }
    }),
    tableHeaderCell: __spreadProps(__spreadValues({
      isolating: true,
      content: "".concat(ExtensionTag.Block, "+")
    }, override), {
      attrs: cellAttrs,
      tableRole: "header_cell",
      parseDOM: [
        {
          tag: "th",
          getAttrs: (dom) => __spreadValues(__spreadValues({}, extra.parse(dom)), getCellAttrs(dom))
        },
        ...(_d = override.parseDOM) != null ? _d : []
      ],
      toDOM(node) {
        return ["th", __spreadValues(__spreadValues({}, extra.dom(node)), setCellAttrs(node)), 0];
      }
    })
  };
}
var TABLE_ROLES = ["table", "row", "cell", "header_cell"];
function tableNodeTypes(schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes;
  }
  const roles = object();
  schema.cached.tableNodeTypes = roles;
  for (const nodeType of values(schema.nodes)) {
    if (includes(TABLE_ROLES, nodeType.spec.tableRole)) {
      roles[nodeType.spec.tableRole] = nodeType;
    }
  }
  return roles;
}
function createCell(props) {
  const { content, type } = props;
  if (content) {
    return type.createChecked(null, content);
  }
  return type.createAndFill();
}
function createTable(props) {
  const { schema, cellContent, columnsCount = 3, rowsCount = 3, withHeaderRow = true } = props;
  const {
    cell: tableCell,
    header_cell: tableHeaderCell,
    row: tableRow,
    table
  } = tableNodeTypes(schema);
  invariant(tableCell && tableHeaderCell && tableRow && table, {
    code: ErrorConstant.EXTENSION,
    message: "Table Extension unable to locate required nodes."
  });
  const cells = [];
  const headerCells = [];
  for (let ii = 0; ii < columnsCount; ii++) {
    cells.push(createCell({ type: tableCell, content: cellContent }));
    if (withHeaderRow) {
      headerCells.push(
        createCell({ type: tableHeaderCell, content: cellContent })
      );
    }
  }
  const rows = [];
  for (let ii = 0; ii < rowsCount; ii++) {
    const rowNodes = withHeaderRow && ii === 0 ? headerCells : cells;
    rows.push(tableRow.createChecked(null, rowNodes));
  }
  return table.createChecked(null, rows);
}
function findTable(selection) {
  return findParentNodeOfType({ selection, types: "table" });
}
function findCellClosestToPos(selection) {
  return findParentNodeOfType({ selection, types: ["tableHeaderCell", "tableCell"] });
}
var { CREATE_COMMAND_DESCRIPTION, CREATE_COMMAND_LABEL } = ExtensionTablesMessages;
var createTableOptions = {
  icon: "table2",
  description: ({ t }) => t(CREATE_COMMAND_DESCRIPTION),
  label: ({ t }) => t(CREATE_COMMAND_LABEL)
};

// src/table-extensions.ts
var tablesEnabled = false;
var _goToPreviousCell_dec, _goToNextCell_dec, _expandCellSelection_dec, _selectParentCell_dec, _setTableCellBackground_dec, _tableHasHeader_dec, _enableTableSupport_dec, _fixTables_dec, _setTableCellAttribute_dec, _toggleTableHeaderCell_dec, _toggleTableHeaderRow_dec, _toggleTableHeaderColumn_dec, _toggleTableHeader_dec, _splitTableCell_dec, _mergeTableCells_dec, _toggleTableCellMerge_dec, _deleteTableRow_dec, _addTableRowAfter_dec, _addTableRowBefore_dec, _deleteTableColumn_dec, _addTableColumnAfter_dec, _addTableColumnBefore_dec, _deleteTable_dec, _createTable_dec, _a, _TableExtension_decorators, _init;
_TableExtension_decorators = [extension({
  defaultOptions: {
    resizable: true,
    resizeableOptions: {},
    tabKeyboardShortcuts: false
  },
  defaultPriority: ExtensionPriority.Default
})];
var TableExtension = class extends (_a = NodeExtension, _createTable_dec = [command(createTableOptions)], _deleteTable_dec = [command()], _addTableColumnBefore_dec = [command()], _addTableColumnAfter_dec = [command()], _deleteTableColumn_dec = [command()], _addTableRowBefore_dec = [command()], _addTableRowAfter_dec = [command()], _deleteTableRow_dec = [command()], _toggleTableCellMerge_dec = [command()], _mergeTableCells_dec = [command()], _splitTableCell_dec = [command()], _toggleTableHeader_dec = [command()], _toggleTableHeaderColumn_dec = [command()], _toggleTableHeaderRow_dec = [command()], _toggleTableHeaderCell_dec = [command()], _setTableCellAttribute_dec = [command()], _fixTables_dec = [command({ disableChaining: true })], _enableTableSupport_dec = [helper()], _tableHasHeader_dec = [helper()], _setTableCellBackground_dec = [command()], _selectParentCell_dec = [command()], _expandCellSelection_dec = [command()], _goToNextCell_dec = [keyBinding({
  shortcut: "Tab",
  isActive: (options) => options.tabKeyboardShortcuts
})], _goToPreviousCell_dec = [keyBinding({
  shortcut: "Shift-Tab",
  isActive: (options) => options.tabKeyboardShortcuts
})], _a) {
  constructor() {
    super(...arguments);
    __runInitializers(_init, 5, this);
    __publicField(this, "lastGoodState");
  }
  get name() {
    return "table";
  }
  createTags() {
    return [ExtensionTag2.Block];
  }
  /**
   * The last known good state that didn't need fixing. This helps make the fix
   * command more effective.
   */
  createNodeSpec(extra, override) {
    return createTableNodeSchema(extra, override).table;
  }
  /**
   * Create the table extensions. Set the priority to low so that they appear
   * lower down in the node list.
   */
  createExtensions() {
    return [new TableRowExtension({ priority: ExtensionPriority.Low })];
  }
  onStateUpdate(props) {
    var _a6;
    const { tr, state } = props;
    if ((_a6 = tr == null ? void 0 : tr.getMeta(fixTablesKey)) == null ? void 0 : _a6.fixTables) {
      this.lastGoodState = state;
    }
  }
  createEventHandlers() {
    return {
      editable: () => {
        this.store.updateExtensionPlugins(this);
      }
    };
  }
  /**
   * Add the table plugins to the editor.
   */
  createExternalPlugins() {
    const plugins = [];
    if (this.store.isMounted() && this.store.helpers.isViewEditable() === false) {
      return plugins;
    }
    const { resizable, resizeableOptions } = this.options;
    if (resizable) {
      plugins.push(columnResizing(resizeableOptions));
    }
    plugins.push(tableEditing());
    return plugins;
  }
  createPlugin() {
    const { resizable, resizeableOptions } = this.options;
    if (!resizable) {
      return {};
    }
    if (!this.store.isMounted() || this.store.helpers.isViewEditable()) {
      return {};
    }
    const { cellMinWidth = 25 } = resizeableOptions;
    return {
      props: {
        nodeViews: {
          table(node, view, getPos) {
            const dom = view.nodeDOM(getPos());
            if (isElementDomNode(dom) && dom.tagName === "TABLE") {
              updateColumnsOnResize(
                node,
                dom.firstChild,
                dom,
                cellMinWidth
              );
            }
            return new TableView(node, cellMinWidth);
          }
        }
      }
    };
  }
  createTable(options = {}) {
    return (props) => {
      const { tr, dispatch, state } = props;
      if (!tr.selection.empty) {
        return false;
      }
      const offset = tr.selection.anchor + 1;
      const nodes = createTable(__spreadValues({ schema: state.schema }, options));
      dispatch == null ? void 0 : dispatch(
        tr.replaceSelectionWith(nodes).scrollIntoView().setSelection(TextSelection.near(tr.doc.resolve(offset)))
      );
      return true;
    };
  }
  deleteTable() {
    return convertCommand(deleteTable);
  }
  addTableColumnBefore() {
    return convertCommand(addColumnBefore);
  }
  addTableColumnAfter() {
    return convertCommand(addColumnAfter);
  }
  deleteTableColumn() {
    return convertCommand(deleteColumn);
  }
  addTableRowBefore() {
    return convertCommand(addRowBefore);
  }
  addTableRowAfter() {
    return convertCommand(addRowAfter);
  }
  deleteTableRow() {
    return convertCommand(deleteRow);
  }
  toggleTableCellMerge() {
    return toggleMergeCellCommand;
  }
  mergeTableCells() {
    return convertCommand(mergeCells);
  }
  splitTableCell() {
    return convertCommand(splitCell);
  }
  toggleTableHeader(type = "row") {
    return convertCommand(toggleHeader(type));
  }
  toggleTableHeaderColumn() {
    return convertCommand(toggleHeaderColumn);
  }
  toggleTableHeaderRow() {
    return convertCommand(toggleHeaderRow);
  }
  toggleTableHeaderCell() {
    return convertCommand(toggleHeaderCell);
  }
  setTableCellAttribute(name, value) {
    return convertCommand(setCellAttr(name, value));
  }
  fixTables() {
    return nonChainable(fixTablesCommand(this.lastGoodState));
  }
  enableTableSupport() {
    if (!tablesEnabled) {
      document.execCommand("enableObjectResizing", false, "false");
      document.execCommand("enableInlineTableEditing", false, "false");
      tablesEnabled = true;
    }
  }
  tableHasHeader(type = "row", state = this.store.getState()) {
    const { selection } = state;
    const table = findParentNodeOfType2({ selection, types: "table" });
    if (!table) {
      return false;
    }
    const { node } = table;
    const map = TableMap.get(node);
    const isHeaderFunc = type === "column" ? columnIsHeader : rowIsHeader;
    return isHeaderFunc(map, node, 0);
  }
  setTableCellBackground(background) {
    return (props) => {
      let { tr } = props;
      const { dispatch } = props;
      const { selection } = tr;
      if (selection instanceof CellSelection) {
        selection.forEachCell((cellNode, pos) => {
          tr = tr.setNodeMarkup(pos, void 0, __spreadProps(__spreadValues({}, cellNode.attrs), { background }));
        });
        dispatch == null ? void 0 : dispatch(tr);
        return true;
      }
      const found = findParentNodeOfType2({ selection, types: ["tableCell", "tableHeaderCell"] });
      if (found) {
        dispatch == null ? void 0 : dispatch(tr.setNodeMarkup(found.pos, void 0, __spreadProps(__spreadValues({}, found.node.attrs), { background })));
        return true;
      }
      return false;
    };
  }
  selectParentCell() {
    return ({ dispatch, tr }) => {
      const cell = findCellClosestToPos(tr.selection.$from);
      if (!cell) {
        return false;
      }
      dispatch == null ? void 0 : dispatch(tr.setSelection(CellSelection.create(tr.doc, cell.pos)));
      return true;
    };
  }
  expandCellSelection(type = "all") {
    return ({ dispatch, tr }) => {
      if (!isCellSelection(tr.selection)) {
        return false;
      }
      if (type !== "row") {
        const { $anchorCell, $headCell } = tr.selection;
        tr.setSelection(CellSelection.colSelection($anchorCell, $headCell));
      }
      if (type !== "column") {
        const { $anchorCell, $headCell } = tr.selection;
        tr.setSelection(CellSelection.rowSelection($anchorCell, $headCell));
      }
      dispatch == null ? void 0 : dispatch(tr);
      return true;
    };
  }
  goToNextCell(props) {
    return convertCommand(goToNextCell(1))(props);
  }
  goToPreviousCell(props) {
    return convertCommand(goToNextCell(-1))(props);
  }
  /**
   * This managers the updates of the collaboration provider.
   */
  onSetOptions(props) {
    const { changes } = props;
    if (changes.resizable.changed) {
      this.store.updateExtensionPlugins(this);
    }
  }
};
_init = __decoratorStart(_a);
__decorateElement(_init, 1, "createTable", _createTable_dec, TableExtension);
__decorateElement(_init, 1, "deleteTable", _deleteTable_dec, TableExtension);
__decorateElement(_init, 1, "addTableColumnBefore", _addTableColumnBefore_dec, TableExtension);
__decorateElement(_init, 1, "addTableColumnAfter", _addTableColumnAfter_dec, TableExtension);
__decorateElement(_init, 1, "deleteTableColumn", _deleteTableColumn_dec, TableExtension);
__decorateElement(_init, 1, "addTableRowBefore", _addTableRowBefore_dec, TableExtension);
__decorateElement(_init, 1, "addTableRowAfter", _addTableRowAfter_dec, TableExtension);
__decorateElement(_init, 1, "deleteTableRow", _deleteTableRow_dec, TableExtension);
__decorateElement(_init, 1, "toggleTableCellMerge", _toggleTableCellMerge_dec, TableExtension);
__decorateElement(_init, 1, "mergeTableCells", _mergeTableCells_dec, TableExtension);
__decorateElement(_init, 1, "splitTableCell", _splitTableCell_dec, TableExtension);
__decorateElement(_init, 1, "toggleTableHeader", _toggleTableHeader_dec, TableExtension);
__decorateElement(_init, 1, "toggleTableHeaderColumn", _toggleTableHeaderColumn_dec, TableExtension);
__decorateElement(_init, 1, "toggleTableHeaderRow", _toggleTableHeaderRow_dec, TableExtension);
__decorateElement(_init, 1, "toggleTableHeaderCell", _toggleTableHeaderCell_dec, TableExtension);
__decorateElement(_init, 1, "setTableCellAttribute", _setTableCellAttribute_dec, TableExtension);
__decorateElement(_init, 1, "fixTables", _fixTables_dec, TableExtension);
__decorateElement(_init, 1, "enableTableSupport", _enableTableSupport_dec, TableExtension);
__decorateElement(_init, 1, "tableHasHeader", _tableHasHeader_dec, TableExtension);
__decorateElement(_init, 1, "setTableCellBackground", _setTableCellBackground_dec, TableExtension);
__decorateElement(_init, 1, "selectParentCell", _selectParentCell_dec, TableExtension);
__decorateElement(_init, 1, "expandCellSelection", _expandCellSelection_dec, TableExtension);
__decorateElement(_init, 1, "goToNextCell", _goToNextCell_dec, TableExtension);
__decorateElement(_init, 1, "goToPreviousCell", _goToPreviousCell_dec, TableExtension);
TableExtension = __decorateElement(_init, 0, "TableExtension", _TableExtension_decorators, TableExtension);
__runInitializers(_init, 1, TableExtension);
var _TableRowExtension_decorators, _init2, _a2;
_TableRowExtension_decorators = [extension({ defaultPriority: ExtensionPriority.Low })];
var TableRowExtension = class extends (_a2 = NodeExtension) {
  get name() {
    return "tableRow";
  }
  /**
   * Automatically create the `TableCellExtension` and
   * `TableHeaderCellExtension`. This is placed here so that this extension can
   * be tested independently from the `TableExtension`.
   */
  createExtensions() {
    return [
      new TableCellExtension({ priority: ExtensionPriority.Low }),
      new TableHeaderCellExtension({ priority: ExtensionPriority.Low })
    ];
  }
  createNodeSpec(extra, override) {
    return createTableNodeSchema(extra, override).tableRow;
  }
};
_init2 = __decoratorStart(_a2);
TableRowExtension = __decorateElement(_init2, 0, "TableRowExtension", _TableRowExtension_decorators, TableRowExtension);
__runInitializers(_init2, 1, TableRowExtension);
var _TableCellExtension_decorators, _init3, _a3;
_TableCellExtension_decorators = [extension({ defaultPriority: ExtensionPriority.Low })];
var TableCellExtension = class extends (_a3 = NodeExtension) {
  get name() {
    return "tableCell";
  }
  createNodeSpec(extra, override) {
    return createTableNodeSchema(extra, override).tableCell;
  }
};
_init3 = __decoratorStart(_a3);
TableCellExtension = __decorateElement(_init3, 0, "TableCellExtension", _TableCellExtension_decorators, TableCellExtension);
__runInitializers(_init3, 1, TableCellExtension);
var _TableHeaderCellExtension_decorators, _init4, _a4;
_TableHeaderCellExtension_decorators = [extension({ defaultPriority: ExtensionPriority.Low })];
var TableHeaderCellExtension = class extends (_a4 = NodeExtension) {
  get name() {
    return "tableHeaderCell";
  }
  createNodeSpec(extra, override) {
    return createTableNodeSchema(extra, override).tableHeaderCell;
  }
};
_init4 = __decoratorStart(_a4);
TableHeaderCellExtension = __decorateElement(_init4, 0, "TableHeaderCellExtension", _TableHeaderCellExtension_decorators, TableHeaderCellExtension);
__runInitializers(_init4, 1, TableHeaderCellExtension);
var _TableControllerCellExtension_decorators, _init5, _a5;
_TableControllerCellExtension_decorators = [extension({ defaultPriority: ExtensionPriority.Low })];
var TableControllerCellExtension = class extends (_a5 = NodeExtension) {
  get name() {
    return "tableControllerCell";
  }
  createNodeSpec(_, __) {
    return {
      tableRole: "header_cell"
    };
  }
};
_init5 = __decoratorStart(_a5);
TableControllerCellExtension = __decorateElement(_init5, 0, "TableControllerCellExtension", _TableControllerCellExtension_decorators, TableControllerCellExtension);
__runInitializers(_init5, 1, TableControllerCellExtension);
function fixTablesCommand(lastGoodState) {
  return ({ state, dispatch }) => {
    const tr = fixTables(state, lastGoodState);
    if (!tr) {
      return false;
    }
    if (dispatch) {
      dispatch(tr);
    }
    return true;
  };
}
function toggleMergeCellCommand({ state, dispatch }) {
  if (mergeCells(state, dispatch)) {
    return false;
  }
  return splitCell(state, dispatch);
}

// src/table-positioners.ts
import {
  isElementDomNode as isElementDomNode2,
  mergeDOMRects
} from "@remirror/core";
import {
  defaultAbsolutePosition,
  hasStateChanged,
  isPositionVisible,
  Positioner
} from "@remirror/extension-positioner";
import { isCellSelection as isCellSelection2, TableMap as TableMap2 } from "@remirror/pm/tables";
function getCellsInColumn(selection, columnIndex) {
  const table = findTable(selection);
  if (!table) {
    return;
  }
  const map = TableMap2.get(table.node);
  if (columnIndex > 0 || columnIndex > map.width - 1) {
    return;
  }
  const cells = map.cellsInRect({
    left: columnIndex,
    right: columnIndex + 1,
    top: 0,
    bottom: map.height
  });
  const columnNodes = [];
  cells.forEach((nodePos) => {
    columnNodes.push({
      node: table.node.nodeAt(nodePos),
      pos: table.start + nodePos
    });
  });
  return columnNodes;
}
function getCellsInRow(selection, rowIndex) {
  const table = findTable(selection);
  if (!table) {
    return;
  }
  const map = TableMap2.get(table.node);
  if (rowIndex > 0 || rowIndex > map.width - 1) {
    return;
  }
  const cells = map.cellsInRect({
    left: 0,
    right: map.width,
    top: rowIndex,
    bottom: rowIndex + 1
  });
  const columnNodes = [];
  cells.forEach((nodePos) => {
    columnNodes.push({
      node: table.node.nodeAt(nodePos),
      pos: table.start + nodePos
    });
  });
  return columnNodes;
}
var tablePositioner = Positioner.create({
  hasChanged: hasStateChanged,
  getActive(props) {
    const { selection } = props.state;
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    return [table];
  },
  getPosition(props) {
    const { view, data: table } = props;
    const node = view.nodeDOM(table.pos);
    if (!isElementDomNode2(node)) {
      return defaultAbsolutePosition;
    }
    const rect = node.getBoundingClientRect();
    const editorRect = view.dom.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;
    const left = view.dom.scrollLeft + rect.left - editorRect.left - 1;
    const top = view.dom.scrollTop + rect.top - editorRect.top - 1;
    return {
      x: left,
      y: top,
      height,
      width,
      rect,
      visible: isPositionVisible(rect, view.dom)
    };
  }
});
var activeCellPositioner = tablePositioner.clone(() => ({
  getActive(props) {
    const { selection } = props.state;
    const cell = findCellClosestToPos(selection);
    if (!cell) {
      return Positioner.EMPTY;
    }
    return [cell];
  }
}));
var allColumnsStartPositioner = Positioner.create({
  hasChanged: hasStateChanged,
  getActive(props) {
    var _a6;
    const { selection } = props.state;
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const cells = (_a6 = getCellsInRow(selection, 0)) != null ? _a6 : [];
    if (cells.length === 0) {
      return Positioner.EMPTY;
    }
    return cells;
  },
  getID(data) {
    return "".concat(data.pos);
  },
  getPosition(props) {
    const { view, data: cell } = props;
    const node = view.nodeDOM(cell.pos);
    if (!isElementDomNode2(node)) {
      return defaultAbsolutePosition;
    }
    const rect = node.getBoundingClientRect();
    const editorRect = view.dom.getBoundingClientRect();
    const width = rect.width;
    const left = view.dom.scrollLeft + rect.left - editorRect.left - 1;
    const top = view.dom.scrollTop + rect.top - editorRect.top - 1;
    const columnTopRect = new DOMRect(rect.x - 1, rect.y - 1, width, 1);
    return {
      x: left,
      y: top,
      width,
      height: 1,
      rect: columnTopRect,
      visible: isPositionVisible(columnTopRect, view.dom)
    };
  }
});
var allRowsStartPositioner = allColumnsStartPositioner.clone(() => ({
  /**
   * This is only active for empty top level nodes. The data is the cursor start
   * and end position.
   */
  getActive(props) {
    var _a6;
    const { selection } = props.state;
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const cells = (_a6 = getCellsInColumn(selection, 0)) != null ? _a6 : [];
    if (cells.length === 0) {
      return Positioner.EMPTY;
    }
    return cells;
  },
  getPosition(props) {
    const { view, data: cell } = props;
    const node = view.nodeDOM(cell.pos);
    if (!isElementDomNode2(node)) {
      return defaultAbsolutePosition;
    }
    const rect = node.getBoundingClientRect();
    const editorRect = view.dom.getBoundingClientRect();
    const height = rect.height;
    const left = view.dom.scrollLeft + rect.left - editorRect.left - 1;
    const top = view.dom.scrollTop + rect.top - editorRect.top - 1;
    const rowLeftRect = new DOMRect(rect.x - 1, rect.y - 1, 1, height);
    return {
      x: left,
      y: top,
      width: 1,
      height,
      rect: rowLeftRect,
      visible: isPositionVisible(rowLeftRect, view.dom)
    };
  }
}));
var activeCellColumnPositioner = Positioner.create({
  hasChanged: hasStateChanged,
  getActive(props) {
    const { state, view } = props;
    const { selection } = state;
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const cell = findCellClosestToPos(selection);
    if (!cell) {
      return Positioner.EMPTY;
    }
    const { pos } = cell;
    const tableNode = view.nodeDOM(table.pos);
    const node = view.nodeDOM(pos);
    if (!isElementDomNode2(tableNode) || !isElementDomNode2(node)) {
      return Positioner.EMPTY;
    }
    const tableRect = tableNode.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    return [
      {
        pos,
        rect: new DOMRect(rect.x, tableRect.y, rect.width, tableRect.height)
      }
    ];
  },
  getID({ pos }) {
    return "".concat(pos);
  },
  getPosition(props) {
    const {
      view,
      data: { rect }
    } = props;
    const editorRect = view.dom.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;
    const left = view.dom.scrollLeft + rect.left - editorRect.left - 1;
    const top = view.dom.scrollTop + rect.top - editorRect.top - 1;
    return {
      x: left,
      y: top,
      width,
      height,
      rect,
      visible: isPositionVisible(rect, view.dom)
    };
  }
});
var activeCellRowPositioner = activeCellColumnPositioner.clone(() => ({
  getActive(props) {
    const { state, view } = props;
    const { selection } = state;
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const cell = findCellClosestToPos(selection);
    if (!cell) {
      return Positioner.EMPTY;
    }
    const { pos } = cell;
    const tableNode = view.nodeDOM(table.pos);
    const node = view.nodeDOM(pos);
    if (!isElementDomNode2(tableNode) || !isElementDomNode2(node)) {
      return Positioner.EMPTY;
    }
    const tableRect = tableNode.getBoundingClientRect();
    const rect = node.getBoundingClientRect();
    return [
      {
        pos,
        rect: new DOMRect(tableRect.x, rect.y, tableRect.width, rect.height)
      }
    ];
  }
}));
var selectedColumnPositioner = activeCellColumnPositioner.clone(({ getActive }) => ({
  getActive(props) {
    const [data] = getActive(props);
    if (!data) {
      return Positioner.EMPTY;
    }
    const { selection } = props.state;
    if (!isCellSelection2(selection) || !selection.isColSelection()) {
      return Positioner.EMPTY;
    }
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const { node, start } = table;
    const { $anchorCell, $headCell } = selection;
    const map = TableMap2.get(node);
    const rect = map.rectBetween($anchorCell.pos - start, $headCell.pos - start);
    if (rect.right - rect.left !== 1) {
      return Positioner.EMPTY;
    }
    return [data];
  }
}));
var selectedRowPositioner = activeCellRowPositioner.clone(({ getActive }) => ({
  getActive(props) {
    const [data] = getActive(props);
    if (!data) {
      return Positioner.EMPTY;
    }
    const { selection } = props.state;
    if (!isCellSelection2(selection) || !selection.isRowSelection()) {
      return Positioner.EMPTY;
    }
    const table = findTable(selection);
    if (!table) {
      return Positioner.EMPTY;
    }
    const { node, start } = table;
    const { $anchorCell, $headCell } = selection;
    const map = TableMap2.get(node);
    const rect = map.rectBetween($anchorCell.pos - start, $headCell.pos - start);
    if (rect.bottom - rect.top !== 1) {
      return Positioner.EMPTY;
    }
    return [data];
  }
}));
var cellSelectionPositioner = Positioner.create({
  hasChanged: hasStateChanged,
  getActive(props) {
    const { selection } = props.state;
    if (!isCellSelection2(selection)) {
      return Positioner.EMPTY;
    }
    return [selection];
  },
  getPosition(props) {
    const { view, data: selection } = props;
    const { $headCell, $anchorCell } = selection;
    const headNode = view.nodeDOM($headCell.pos);
    const anchorNode = view.nodeDOM($anchorCell.pos);
    if (!isElementDomNode2(headNode) || !isElementDomNode2(anchorNode)) {
      return defaultAbsolutePosition;
    }
    const rect = mergeDOMRects(
      headNode.getBoundingClientRect(),
      anchorNode.getBoundingClientRect()
    );
    const editorRect = view.dom.getBoundingClientRect();
    const height = rect.height;
    const width = rect.width;
    const left = view.dom.scrollLeft + rect.left - editorRect.left - 1;
    const top = view.dom.scrollTop + rect.top - editorRect.top - 1;
    return {
      x: left,
      y: top,
      width,
      height,
      rect,
      visible: isPositionVisible(rect, view.dom)
    };
  }
});
var cellColumnSelectionPositioner = cellSelectionPositioner.clone(({ getActive }) => ({
  getActive(props) {
    const [selection] = getActive(props);
    if (!(selection == null ? void 0 : selection.isColSelection())) {
      return Positioner.EMPTY;
    }
    return [selection];
  }
}));
var cellRowSelectionPositioner = cellSelectionPositioner.clone(({ getActive }) => ({
  getActive(props) {
    const [selection] = getActive(props);
    if (!(selection == null ? void 0 : selection.isRowSelection())) {
      return Positioner.EMPTY;
    }
    return [selection];
  }
}));
var allCellSelectionPositioner = cellSelectionPositioner.clone(({ getActive }) => ({
  getActive(props) {
    const [selection] = getActive(props);
    if (!(selection == null ? void 0 : selection.isColSelection()) || !selection.isRowSelection()) {
      return Positioner.EMPTY;
    }
    return [selection];
  }
}));
export {
  TableCellExtension,
  TableControllerCellExtension,
  TableExtension,
  TableHeaderCellExtension,
  TableRowExtension,
  activeCellColumnPositioner,
  activeCellPositioner,
  activeCellRowPositioner,
  allCellSelectionPositioner,
  allColumnsStartPositioner,
  allRowsStartPositioner,
  cellColumnSelectionPositioner,
  cellRowSelectionPositioner,
  cellSelectionPositioner,
  createTable,
  createTableOptions,
  selectedColumnPositioner,
  selectedRowPositioner,
  tablePositioner
};
