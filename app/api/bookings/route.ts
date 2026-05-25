import { NextRequest, NextResponse } from "next/server";
import { SERVICES } from "@/lib/data";
import { createBooking, getBookings } from "@/lib/db";
import { getAvailableSlots, isPastDate } from "@/lib/availability";

export async function GET() {
  const bookings = getBookings();
  return NextResponse.json({ bookings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceId,
      date,
      time,
      customerName,
      customerEmail,
      customerPhone,
      address,
      notes,
    } = body;

    if (!serviceId || !date || !time || !customerName || !customerEmail || !customerPhone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const service = SERVICES.find((s) => s.id === serviceId);
    if (!service) {
      return NextResponse.json({ error: "Invalid service" }, { status: 400 });
    }

    if (isPastDate(date)) {
      return NextResponse.json({ error: "Cannot book past dates" }, { status: 400 });
    }

    const available = getAvailableSlots(date);
    if (!available.includes(time)) {
      return NextResponse.json(
        { error: "Time slot no longer available" },
        { status: 409 }
      );
    }

    const booking = createBooking({
      serviceId,
      serviceName: service.name,
      date,
      time,
      customerName: String(customerName).trim(),
      customerEmail: String(customerEmail).trim(),
      customerPhone: String(customerPhone).trim(),
      address: String(address).trim(),
      notes: notes ? String(notes).trim() : undefined,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
