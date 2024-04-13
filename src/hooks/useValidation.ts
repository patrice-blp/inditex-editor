import { useMemo } from "react";
import useEditorContext from "@/hooks/useEditorContext";

export default function useValidation() {
  const { rows } = useEditorContext();

  const validRows = useMemo(() => {
    return rows.map((row) => row.products.length).every((value) => value > 0);
  }, [rows]);

  return {
    validRows,
  };
}
