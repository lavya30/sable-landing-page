import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "downloads.json");

async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
    // Check if file has content
    const stats = await fs.stat(DATA_FILE);
    if (stats.size === 0) {
      await fs.writeFile(DATA_FILE, JSON.stringify({ count: 0 }), "utf-8");
    }
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ count: 0 }), "utf-8");
  }
}

async function getCount(): Promise<number> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw);
  return data.count ?? 0;
}

async function incrementCount(): Promise<number> {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw);
  data.count = (data.count ?? 0) + 1;
  await fs.writeFile(DATA_FILE, JSON.stringify(data), "utf-8");
  return data.count;
}

// Force dynamic — never cache this route
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const count = await getCount();
    return Response.json({ count });
  } catch (error) {
    return Response.json({ count: 0, error: "Failed to read count" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const count = await incrementCount();
    return Response.json({ count });
  } catch (error) {
    return Response.json({ count: 0, error: "Failed to increment count" }, { status: 500 });
  }
}
