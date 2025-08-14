/// <reference lib="webworker" />

interface BookingLike {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'product';
  item: any;
  bookingDate: string;
}

let bookings: BookingLike[] = [];
const notified: Set<string> = new Set();

function getStartTimeMs(b: BookingLike): number | null {
  try {
    if (b.type === 'flight' && b.item?.departureTime) return new Date(b.item.departureTime).getTime();
    if (b.type === 'car' && b.item?.pickupDate) return new Date(b.item.pickupDate).getTime();
    // Fallbacks
    return new Date(b.bookingDate).getTime();
  } catch {
    return null;
  }
}

function checkReminders() {
  const now = Date.now();
  const in24h = now + 24 * 60 * 60 * 1000;
  for (const b of bookings) {
    const start = getStartTimeMs(b);
    if (!start) continue;

    // Trigger once when crossing into the 24h window (±30 minutes)
    const diff = start - in24h;
    if (Math.abs(diff) <= 30 * 60 * 1000 && !notified.has(b.id)) {
      notified.add(b.id);
      (self as any).postMessage({
        type: 'REMINDER',
        bookingId: b.id,
        bookingType: b.type,
      });
    }
  }
}

(self as any).onmessage = (e: MessageEvent) => {
  const data = e.data;
  if (data?.type === 'SET_BOOKINGS') {
    bookings = data.bookings || [];
  }
};

setInterval(checkReminders, 60 * 1000);
