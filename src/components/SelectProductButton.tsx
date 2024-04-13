import Button from "@mui/material/Button";
import useEditorContext from "@/hooks/useEditorContext";

type Props = {
  rowId: number;
};

const SelectProductButton = ({ rowId }: Props) => {
  const { updateState } = useEditorContext();

  const handleOpenDialog = () =>
    updateState({ dialog: { open: true, identifier: rowId } });

  return <Button onClick={handleOpenDialog}>Añade productos</Button>;
};

export default SelectProductButton;
