import { render, screen } from "@testing-library/react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { productsMock } from "@/common/mocks/products";
import Product from "@/components/Product";

describe("Product", () => {
  it("renders a product details", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <Product
          product={productsMock[0]}
          rowIndex={1}
          index={1}
          rowIdentifier=""
        />
      </DndProvider>,
    );

    expect(screen.getByText("Camisa oversize de cuadros", {})).toBeTruthy();
    expect(screen.getByText("25,95 €", {})).toBeTruthy();
    expect(screen.getByRole("img")).toBeTruthy();
  });
});
