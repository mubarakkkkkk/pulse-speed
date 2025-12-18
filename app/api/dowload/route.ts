import { NextResponse } from "next/server";

export async function GET() {
  const sizeInMB = 10;
  const size = sizeInMB * 1024 * 1024;

  const buffer = Buffer.alloc(size, 0);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "no-store",
    },
  });
}
    