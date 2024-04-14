import { render, screen } from "@testing-library/react";
import { productsMock } from "@/common/mocks/products";
import { gridsMocks } from "@/common/mocks/grids";
import { GridRow } from "@/common/types";
import Row from "@/components/Row";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const row = gridsMocks[2];
row.products = row.products.map(
  (i) => productsMock.find((p) => p.id === i) as any,
);

describe("Row", () => {
  it("should render grid row", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Row row={row as unknown as GridRow} index={0} />
      </DndProvider>,
    );

    expect(screen.getByText("template-3")).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Añade productos" }),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "- Eliminar" })).toBeTruthy();
  });

  it("should render grid products", () => {
    const { container } = render(
      <DndProvider backend={HTML5Backend}>
        <Row row={row as unknown as GridRow} index={0} />
      </DndProvider>,
    );

    expect(
      container.querySelectorAll(".MuiBox-root").length,
    ).toEqual(3);
  });
});
