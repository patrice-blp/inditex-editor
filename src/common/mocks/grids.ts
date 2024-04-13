import { productsMock } from "@/common/mocks/products";
import { TemplateDirection } from "@/common/Constants";
import { GridResponse } from "@/common/types";

export const gridsMocks: GridResponse[] = [
  {
    id: 1,
    name: "template-1",
    products: [productsMock[0].id],
    position: TemplateDirection.CENTER,
  },
  {
    id: 2,
    name: "template-2",
    products: [productsMock[1].id, productsMock[2].id],
    position: TemplateDirection.RIGHT,
  },
  {
    id: 3,
    name: "template-3",
    products: [productsMock[3].id, productsMock[4].id, productsMock[5].id],
    position: TemplateDirection.LEFT,
  },
];
