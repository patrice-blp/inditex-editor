import { NextResponse } from "next/server";
import { gridsMocks } from "@/common/mocks/grids";

export async function GET() {
  return NextResponse.json(gridsMocks);
}

export async function POST() {
  await new Promise(resolve => {
    setTimeout(() => resolve(true), 1900);
  })
  return NextResponse.json({});
}
