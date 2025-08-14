import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

export function BookingReminderManager() {
  const { state, dispatch } = useApp();
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(new URL('../../workers/bookingReminderWorker.ts', import.meta.url), { type: 'module' });
      workerRef.current.onmessage = (e: MessageEvent) => {
        const data = e.data;
        if (data?.type === 'REMINDER') {
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              message: 'Reminder: You have a booking in about 24 hours. Please review your itinerary.',
              type: 'warning',
              read: false,
            },
          });
        }
      };
    }
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    workerRef.current?.postMessage({ type: 'SET_BOOKINGS', bookings: state.bookings });
  }, [state.bookings]);

  return null;
}
