"use strict";

// src/jest-prosemirror-serializer.ts
var import_core_helpers = require("@remirror/core-helpers");
var import_core_utils = require("@remirror/core-utils");
var prosemirrorSerializer = {
  test: (value) => (0, import_core_utils.isProsemirrorNode)(value) || (0, import_core_utils.isEditorState)(value) || (0, import_core_utils.isEditorSchema)(value),
  print: (value) => {
    if ((0, import_core_utils.isEditorState)(value)) {
      return "Prosemirror doc: ".concat(JSON.stringify(
        value.doc.toJSON(),
        null,
        2
      ), "\nProsemirror selection: ").concat(JSON.stringify(value.selection, null, 2));
    }
    if ((0, import_core_utils.isEditorSchema)(value)) {
      const nodes = (0, import_core_helpers.object)();
      const marks = (0, import_core_helpers.object)();
      for (const [name, { spec }] of Object.entries(value.nodes)) {
        nodes[name] = spec;
      }
      for (const [name, { spec }] of Object.entries(value.marks)) {
        marks[name] = spec;
      }
      return "Prosemirror schema: ".concat(JSON.stringify({ nodes, marks }, null, 2));
    }
    return "Prosemirror node: ".concat(JSON.stringify(value, null, 2));
  }
};

// src/serializer.cts
module.exports = prosemirrorSerializer;
