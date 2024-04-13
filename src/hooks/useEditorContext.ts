import { useCallback, useContext } from "react";
import { ContextType, EditorContext } from "@/common/context";
import { ProductsPerRowLimit } from "@/common/Constants";

type UpdateStatePayload = Partial<Omit<ContextType, "setEditorContext">>;

export default function useEditorContext() {
  const { rows, products, dialog, setEditorContext } =
    useContext(EditorContext);

  const updateState = (contextState: UpdateStatePayload) => {
    setEditorContext((prevState) => ({ ...prevState, ...contextState }));
  };

  const getRow = useCallback(
    (id: number) => {
      return rows.find((item) => item.id === id);
    },
    [rows],
  );

  const canDropProduct = useCallback(
    (rowId: number) => {
      const rowProducts =
        rows.find((item) => item.id === rowId)?.products || [];
      return rowProducts.length < ProductsPerRowLimit;
    },
    [rows],
  );

  return {
    rows,
    products,
    dialog,
    updateState,
    setEditorContext,
    getRow,
    canDropProduct,
  };
}
