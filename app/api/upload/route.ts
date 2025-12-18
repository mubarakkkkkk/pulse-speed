import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await req.arrayBuffer();
  return NextResponse.json({ ok: true });
}
