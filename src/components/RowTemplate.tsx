import Row from "@/components/Row";
import { Stack } from "@mui/material";
import useEditorContext from "@/hooks/useEditorContext";

const RowTemplate = () => {
  const { rows } = useEditorContext();

  return (
    <Stack direction="column" gap={1} data-cy="row-template">
      {rows.map((row, index) => (
        <Row key={row.id} row={row} index={index} />
      ))}
    </Stack>
  );
};

export default RowTemplate;
