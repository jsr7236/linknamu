import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { getMongoClient } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const validIds = new Set(links.map((link) => link.id));

async function getCollection() {
  const client = getMongoClient();
  if (!client) return null;
  return (await client).db().collection<{ _id: string; count: number }>("clicks");
}

// 링크 클릭 1회 기록
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }
  if (typeof id !== "string" || !validIds.has(id)) {
    return NextResponse.json({ error: "알 수 없는 링크" }, { status: 400 });
  }

  const clicks = await getCollection();
  if (!clicks) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않음" }, { status: 503 });
  }
  await clicks.updateOne({ _id: id }, { $inc: { count: 1 } }, { upsert: true });
  return NextResponse.json({ ok: true });
}

// 링크별 클릭 수 조회
export async function GET() {
  const clicks = await getCollection();
  if (!clicks) {
    return NextResponse.json({ error: "MONGODB_URI가 설정되지 않음" }, { status: 503 });
  }
  const docs = await clicks.find().toArray();
  const counts = Object.fromEntries(links.map((link) => [link.id, 0]));
  for (const doc of docs) counts[doc._id] = doc.count;
  return NextResponse.json(counts);
}
