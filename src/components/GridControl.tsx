import { Button, CircularProgress, Stack } from "@mui/material";
import useSaveGrid from "@/hooks/useSaveGrid";
import useValidation from "@/hooks/useValidation";
import AddRowButton from "@/components/AddRowButton";

const GridControl = () => {
  const { saveGrid, isMutating } = useSaveGrid();
  const { validRows } = useValidation();

  const handleSave = () => {
    return saveGrid({});
  };

  return (
    <Stack direction="row" justifyContent="space-between" marginTop={2}>
      <AddRowButton />
      <Button
        onClick={handleSave}
        variant="contained"
        disabled={!validRows || isMutating}
        startIcon={
          isMutating ? (
            <CircularProgress size={22} color="primary" />
          ) : undefined
        }
      >
        Guardar parilla
      </Button>
    </Stack>
  );
};

export default GridControl;
