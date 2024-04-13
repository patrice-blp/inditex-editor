import { Button } from "@mui/material";
import { Product } from "@/common/types";
import { TemplateDirection } from "@/common/Constants";
import useEditorContext from "@/hooks/useEditorContext";

const generateId = () => {
  const uuid =
    Math.floor(Math.random() * 1000) +
    Math.floor(Math.random() * 100) +
    Math.floor(Math.random() * 10);
  return +String(uuid).padStart(1, "1");
};

const AddRowButton = () => {
  const { setEditorContext } = useEditorContext();

  const handleRowAdd = () => {
    setEditorContext((prevState) => {
      const id = generateId();
      const products = [] as unknown as [Product];
      const rows = prevState.rows.concat([
        {
          id,
          name: `template-${id}`,
          products,
          position: TemplateDirection.CENTER,
        },
      ]);

      return {
        ...prevState,
        rows,
      };
    });
  };

  return (
    <Button color="inherit" variant="text" onClick={handleRowAdd}>
      + Añadir fila
    </Button>
  );
};

export default AddRowButton;
