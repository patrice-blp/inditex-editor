import { type NextRequest, NextResponse } from "next/server";
import { productsMock } from "@/common/mocks/products";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("ids");

  if (!query) {
    return NextResponse.json({}, { status: 400, statusText: "Missing ids query params" });
  }

  const ids = query.split(",").map((value) => +value);
  const data = productsMock.filter((product) => ids.includes(product.id));

  return NextResponse.json(data);
}
