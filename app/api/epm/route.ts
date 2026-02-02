import { NextResponse } from "next/server";
import { getDashboardData } from "@/lib/get-dashboard-data";
import { summarizeDashboard } from "@/lib/metrics";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, isLive } = await getDashboardData();
  const summary = summarizeDashboard(data);

  return NextResponse.json({
    isLive,
    summary,
    data
  });
}
