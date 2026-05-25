import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots, getDayStatus, getMonthDays } from "@/lib/availability";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));

  if (date) {
    const slots = getAvailableSlots(date);
    return NextResponse.json({ date, slots });
  }

  if (!isNaN(year) && !isNaN(month)) {
    const days = getMonthDays(year, month);
    const statuses = days.map((d) =>
      d === null ? null : getDayStatus(year, month, d)
    );
    return NextResponse.json({ year, month, days, statuses });
  }

  return NextResponse.json({ error: "Provide date or year+month" }, { status: 400 });
}
