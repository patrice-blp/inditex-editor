import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { GridRow } from "@/common/types";
import { TemplateDirection } from "@/common/Constants";
import DroppableArea from "@/components/DroppableArea";
import useRowDrag from "@/hooks/useRowDrag";
import SelectProductButton from "@/components/SelectProductButton";
import DeleteRowButton from "@/components/DeleteRowButton";

type Props = {
  row: GridRow;
  index: number;
};

const Row = ({ row, index }: Props) => {
  const { ref, handlerId } = useRowDrag({ row, index });
  const [rowPosition, setRowPosition] = useState(row.position);

  const handleSelectTemplate = (event: SelectChangeEvent) => {
    setRowPosition(event.target.value);
  };

  return (
    <Stack
      data-cy="grid-row"
      gap={1}
      padding={2}
      ref={ref}
      data-handler-id={handlerId}
      sx={{
        backgroundColor: "rgba(236,236,236,0.22)",
        border: "1px solid #d9d9d9",
        borderRadius: 1,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography color="dimgray">{row.name}</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <SelectProductButton rowId={row.id} />
          <FormControl size="small">
            <InputLabel id={`row-position-${row.id}`}>Position</InputLabel>
            <Select
              labelId={`row-position-${row.id}`}
              id={`select-position-${row.id}`}
              value={rowPosition}
              label="Position"
              onChange={handleSelectTemplate}
            >
              <MenuItem value={TemplateDirection.RIGHT}>Izquierda</MenuItem>
              <MenuItem value={TemplateDirection.CENTER}>Centro</MenuItem>
              <MenuItem value={TemplateDirection.LEFT}>Derecha</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      <DroppableArea
        key={row.id}
        row={row}
        rowTemplate={rowPosition}
        rowIndex={index}
      />
      <Stack direction="row" justifyContent="flex-end">
        <DeleteRowButton rowId={row.id} />
      </Stack>
    </Stack>
  );
};

export default Row;
