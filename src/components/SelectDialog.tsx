import { SyntheticEvent, useCallback, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useEditorContext from "@/hooks/useEditorContext";
import {
  Avatar,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ProductsPerRowLimit } from "@/common/Constants";
import { Product } from "@/common/types";

export default function DialogSelect() {
  const { rows, products, dialog, updateState } = useEditorContext();
  const [checked, setChecked] = useState([0]);

  const limitToSelect = useMemo(() => {
    const countRowProducts = (rows.find((item) => item.id === dialog.identifier)
      ?.products.length ?? 0) as number;
    return ProductsPerRowLimit - countRowProducts;
  }, [rows, dialog]);

  const productsList = useMemo(() => {
    const inUse = rows.map((item) => item.products.map((p) => p?.id)).flat();
    return products.filter((product) => !inUse.includes(product.id));
  }, [rows, products]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClose = (event: SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setChecked([0]);
      updateState({ dialog: { open: false, identifier: 0 } });
    }
  };

  const handleAdd = useCallback(() => {
    const newRows = rows.map((row) => {
      if (row.id === dialog.identifier) {
        const newProducts = productsList.filter((item) =>
          checked.includes(item.id),
        );
        row.products = row.products.concat(newProducts) as [Product];
      }

      return row;
    });

    updateState({ rows: newRows, dialog: { open: false, identifier: 0 } });
    setChecked([0]);
  }, [checked, rows, dialog]);

  return (
    <Dialog
      disableEscapeKeyDown
      open={dialog.open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Selección de productos - {limitToSelect}</DialogTitle>
      <DialogContent sx={{ maxHeight: 400, overflow: "auto" }}>
        <List>
          {productsList.map(({ id, name, image, price }) => {
            const labelId = `checkbox-list-label-${id}`;
            const isChecked = checked.includes(id);
            const canSelect = !(checked.length <= limitToSelect) && !isChecked;

            return (
              <ListItem
                key={id}
                secondaryAction={
                  <Avatar
                    alt={name}
                    src={image}
                    sx={{ width: 56, height: 56 }}
                  />
                }
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(id)}
                  dense
                  disabled={canSelect}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={name} secondary={price} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleAdd}>Añadir</Button>
      </DialogActions>
    </Dialog>
  );
}
