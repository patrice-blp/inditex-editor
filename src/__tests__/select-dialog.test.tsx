import { render, screen, fireEvent } from "@testing-library/react";
import { ContextType, EditorContext } from "@/common/context";
import DialogSelect from "@/components/SelectDialog";
import { productsMock } from "@/common/mocks/products";
import { gridsMocks } from "@/common/mocks/grids";
import { GridRow } from "@/common/types";

const contextDefault: ContextType = {
  products: productsMock,
  rows: [],
  dialog: {
    open: true,
    identifier: 0,
  },
  setEditorContext: () => {},
};

describe("SelectDialog", () => {
  it("should render a full product list", () => {
    render(
      <EditorContext.Provider value={contextDefault}>
        <DialogSelect />
      </EditorContext.Provider>,
    );

    expect(screen.getByText("Selección de productos - 3")).toBeTruthy();
    expect(screen.getAllByRole("checkbox")).toHaveLength(10);
  });

  it("should render a partial product list", () => {
    const rows = gridsMocks[1];
    rows.products = rows.products.map(
      (i) => productsMock.find((p) => p.id === i) as any,
    );

    render(
      <EditorContext.Provider
        value={{
          ...contextDefault,
          dialog: { open: true, identifier: 2 },
          rows: [rows as unknown as GridRow],
        }}
      >
        <DialogSelect />
      </EditorContext.Provider>,
    );

    expect(screen.getByText("Selección de productos - 1")).toBeTruthy();
    expect(screen.getAllByRole("checkbox")).toHaveLength(8);

    fireEvent.click(screen.getAllByRole("checkbox")[0]);

    expect(screen.getAllByRole("checkbox", { checked: true })).toHaveLength(1);
    expect(screen.getAllByRole("checkbox", { checked: false })).toHaveLength(7);

    const checkboxes = screen.getAllByRole("checkbox", { checked: false });
    checkboxes.forEach((element) => expect(element).toHaveProperty("disabled"));
  });
});
