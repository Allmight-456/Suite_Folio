import { getNowLog } from "@/lib/nowlog";

// Machine-readable now.log (PRD §4 easter egg). ISR-revalidated like the pane.
export const revalidate = 3600;

export async function GET() {
  const data = await getNowLog();
  return Response.json(data, {
    headers: { "cache-control": "public, max-age=0, s-maxage=3600" },
  });
}
