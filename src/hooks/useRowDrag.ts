import { RefObject, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "@/common/Constants";
import { GridRow } from "@/common/types";
import { Identifier } from "dnd-core/src/interfaces";
import useDragMoves from "@/hooks/useDragMoves";

type Output = {
  ref: RefObject<HTMLDivElement> | null;
  handlerId: Identifier | null;
};

type DragItem = GridRow & {
  index: number;
};

type DropCollect = Pick<Output, "handlerId">;

type Props = {
  row: GridRow;
  index: number;
};

export default function useRowDrag({ row, index }: Props): Output {
  const ref = useRef<HTMLDivElement>(null);
  const { handleMoveRow } = useDragMoves();

  const [, drag] = useDrag<DragItem>(() => ({
    type: ItemTypes.Row,
    item: { ...row, index },
  }));

  const [{ handlerId }, drop] = useDrop<DragItem, void, DropCollect>(
    () => ({
      accept: ItemTypes.Row,
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        handleMoveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    }),
    [handleMoveRow],
  );

  drag(drop(ref));

  return {
    ref,
    handlerId,
  };
}
