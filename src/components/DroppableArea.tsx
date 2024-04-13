import Product from "@/components/Product";
import { Stack } from "@mui/material";
import { useDrop } from "react-dnd";
import { GridRow, Product as ProductType } from "@/common/types";
import { ItemTypes } from "@/common/Constants";
import { Identifier } from "dnd-core/src/interfaces";
import useEditorContext from "@/hooks/useEditorContext";
import useDragMoves from "@/hooks/useDragMoves";

type DropCollectProperties = {
  rowHandlerId: Identifier | null;
};

type Props = {
  row: GridRow;
  rowIndex: number;
  rowTemplate: string;
};

const DroppableArea = ({ row, rowTemplate, rowIndex }: Props) => {
  const { canDropProduct } = useEditorContext();
  const { handleMoveProduct } = useDragMoves();

  const [dropProperties, drop] = useDrop<
    ProductType,
    void,
    DropCollectProperties
  >(
    () => ({
      accept: [ItemTypes.Product],
      drop: (item: any, monitor) => {
        const handlerId = monitor.getHandlerId();
        if (handlerId !== item.rowIdentifier) {
          handleMoveProduct(item, row);
        }
      },
      collect: (monitor) => ({
        rowHandlerId: monitor.getHandlerId(),
      }),
      canDrop: () => canDropProduct(row.id),
    }),
    [handleMoveProduct],
  );

  return (
    <Stack
      ref={drop as any}
      direction="row"
      alignItems="flex-start"
      justifyContent={rowTemplate}
      sx={{
        minHeight: 150,
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "#e5e5e5",
        background: "#ffffff",
        borderRadius: 2,
      }}
      padding={2}
      width="100%"
      gap={1}
    >
      {row.products.map((product, index) => (
        <Product
          key={product?.name}
          product={product}
          index={index}
          rowIndex={rowIndex}
          rowIdentifier={dropProperties.rowHandlerId}
        />
      ))}
    </Stack>
  );
};

export default DroppableArea;
