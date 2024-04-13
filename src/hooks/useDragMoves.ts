import { useCallback } from "react";
import { GridRow, Product as ProductType } from "@/common/types";
import useEditorContext from "@/hooks/useEditorContext";

export default function useDragMoves() {
  const { updateState, rows } = useEditorContext();

  const handleMoveProduct = useCallback(
    (product: ProductType, row: GridRow) => {
      const newRows = rows.map((grid) => {
        let products: ProductType[] | null = null;
        const origin = grid.products.find((item) => item?.id === product.id);

        if (origin) {
          products = grid.products.filter((item) => item?.id !== product.id);
        } else if (grid.id === row.id) {
          products = grid.products.concat(product);
        }

        return {
          ...grid,
          products: products || grid.products,
        } as GridRow;
      });

      updateState({ rows: newRows });
    },
    [rows],
  );

  const handleMoveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = rows[dragIndex];
      const newRows = [...rows];
      newRows.splice(dragIndex, 1);
      newRows.splice(hoverIndex, 0, dragRow);
      updateState({ rows: newRows });
    },
    [rows],
  );

  const handleProductOrderMove = useCallback(
    (
      dragIndex: number,
      hoverIndex: number,
      dragRow: number,
      hoverRow: number,
    ) => {
      const dragProduct = rows[dragRow].products[dragIndex];
      const newRows = [...rows];
      newRows[dragRow].products.splice(dragIndex, 1);
      newRows[hoverRow].products.splice(hoverIndex, 0, dragProduct);
      updateState({ rows: newRows });
    },
    [rows],
  );

  return {
    handleMoveProduct,
    handleMoveRow,
    handleProductOrderMove,
  };
}
