import { createContext, Dispatch, SetStateAction } from "react";
import { GridRow, Product } from "@/common/types";

type Dialog = {
  open: boolean;
  identifier: number;
};

export type ContextType = {
  products: Product[];
  rows: GridRow[];
  dialog: Dialog;
  setEditorContext: Dispatch<SetStateAction<ContextType>>;
};

const defaultValue: ContextType = {
  products: [],
  rows: [],
  dialog: {
    open: false,
    identifier: 0,
  },
  setEditorContext: () => {},
};

export const EditorContext = createContext<ContextType>(defaultValue);
