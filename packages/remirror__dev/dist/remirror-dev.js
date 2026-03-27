// src/dev.ts
import { applyDevTools, removeDevTools } from "prosemirror-dev-toolkit";
import { useEffect } from "react";
import { useRemirrorContext } from "@remirror/react-core";
var ProsemirrorDevTools = () => {
  const { view } = useRemirrorContext();
  useEffect(() => {
    applyDevTools(view);
    return () => {
      removeDevTools();
    };
  }, [view]);
  return null;
};
export {
  ProsemirrorDevTools
};
