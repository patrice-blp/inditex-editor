import { useDrag, useDrop } from "react-dnd";
import { Identifier } from "dnd-core/src/interfaces";
import { Box, Typography } from "@mui/material";
import { Product as ProductType } from "@/common/types";
import { ItemTypes } from "@/common/Constants";
import { useRef } from "react";
import useDragMoves from "@/hooks/useDragMoves";

type Props = {
  product: ProductType;
  index: number;
  rowIndex: number;
  rowIdentifier: Identifier | null;
};

type DragItem = ProductType & {
  index: number;
  row: number;
};

const Product = ({ product, index, rowIdentifier, rowIndex }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const {handleProductOrderMove} = useDragMoves();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.Product,
      item: { ...product, index, row: rowIndex, rowIdentifier },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [rowIdentifier, rowIndex],
  );

  const [, drop] = useDrop<DragItem>({
    accept: ItemTypes.Product,
    hover(item) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const dragRow = item.row;
      const hoverRow = rowIndex;

      if (dragIndex === hoverIndex && dragRow === hoverRow) {
        return;
      }

      handleProductOrderMove(dragIndex, hoverIndex, dragRow, hoverRow);
      item.index = hoverIndex;
      item.row = hoverRow;
    },
  });

  drag(drop(ref));

  return (
    <>
      {!!product?.id && (
        <Box
          ref={ref}
          data-cy="product"
          sx={{
            opacity,
            width: 150,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#b9b9b9",
            padding: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="caption" style={{ wordWrap: "break-word" }}>
            {product.name}
          </Typography>
          <img
            src={product.image}
            alt={product.name}
            width={"100%"}
            loading="lazy"
          />
          <Typography variant="caption">{product.price}</Typography>
        </Box>
      )}
    </>
  );
};

export default Product;
