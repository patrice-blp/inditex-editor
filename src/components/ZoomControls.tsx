import { useControls } from "react-zoom-pan-pinch";
import { Button, ButtonGroup, Stack } from "@mui/material";

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <Stack direction="row" alignItems="center" gap={1} marginBottom={1} >
      <ButtonGroup size="large">
        <Button onClick={() => zoomIn()}>+</Button>
        <Button onClick={() => zoomOut()}>-</Button>
        <Button onClick={() => resetTransform()}>x</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default ZoomControls;
