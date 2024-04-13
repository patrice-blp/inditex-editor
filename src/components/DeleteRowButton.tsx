import { Button } from "@mui/material";
import useEditorContext from "@/hooks/useEditorContext";
import { useCallback } from "react";

type Props = {
  rowId: number;
};

const DeleteRowButton = ({ rowId }: Props) => {
  const { rows, getRow, updateState } = useEditorContext();

  const deleteRow = useCallback(() => {
    const newRows = rows.filter((item) => item.id !== rowId);
    updateState({ rows: newRows });
  }, [rows, rowId]);

  const handleRowDelete = useCallback(() => {
    const row = getRow(rowId);

    if (!row) {
      return;
    }

    const hasProducts = row.products.length > 0;

    if (!hasProducts) {
      deleteRow();
      return;
    }

    if (confirm("Vas a eliminar una fila que tiene productos")) {
      deleteRow();
    }
  }, [getRow, rowId]);

  return (
    <Button
      color="warning"
      variant="text"
      onClick={handleRowDelete}
      size="small"
      sx={{ textTransform: "none" }}
    >
      - Eliminar
    </Button>
  );
};

export default DeleteRowButton;
