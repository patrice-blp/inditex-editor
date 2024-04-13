export type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
};

export type GridRow = {
  id: number;
  name: string;
  products: [Product] | [Product, Product] | [Product, Product, Product];
  position: string;
};

export type GridResponse = Omit<GridRow, "products"> & {
  products: (number | string)[];
};
