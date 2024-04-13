import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ContextType, EditorContext } from "@/common/context";
import RowTemplate from "@/components/RowTemplate";
import ZoomControls from "@/components/ZoomControls";
import GridControl from "@/components/GridControl";
import useProducts from "@/hooks/useProducts";
import { GridRow, Product } from "@/common/types";
import AlertError from "@/components/errors/AlertError";
import useGrids from "@/hooks/useGrids";
import DialogSelect from "@/components/SelectDialog";

const Editor = () => {
  const [editorContext, setEditorContext] = useState<ContextType>({
    products: [],
    rows: [],
    dialog: {
      open: false,
      identifier: 0,
    },
    setEditorContext: () => {},
  });

  const { data: productData, error: productError } = useProducts();
  const {
    data: gridData,
    error: gridError,
    isLoading: loadingGrids,
  } = useGrids();

  useEffect(() => {
    if (!loadingGrids && !gridError && gridData) {
      const grids: GridRow[] =
        !productError && productData
          ? gridData.map((grid) => ({
              ...grid,
              products: grid.products
                .map((productId) => {
                  return productData.find(
                    (product) => product.id === productId,
                  );
                })
                .filter(Boolean) as [Product],
            }))
          : gridData.map((grid) => ({
              ...grid,
              products: [] as unknown as [Product],
            }));

      setEditorContext((prevState) => ({
        ...prevState,
        products: productData || [],
        rows: grids,
      }));
    }
  }, [productData, gridData]);

  return (
    <EditorContext.Provider value={{ ...editorContext, setEditorContext }}>
      <TransformWrapper disablePadding disabled minScale={0.2} maxScale={1}>
        <ZoomControls />
        <AlertError error={productError} />
        <TransformComponent
          contentStyle={{ display: "block", width: "auto" }}
          wrapperStyle={{ width: "unset !important" }}
        >
          <Box>
            <RowTemplate />
            <GridControl />
          </Box>
        </TransformComponent>
      </TransformWrapper>
      <DialogSelect />
    </EditorContext.Provider>
  );
};

export default Editor;
