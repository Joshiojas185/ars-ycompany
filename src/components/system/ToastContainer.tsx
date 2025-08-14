import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export function ToastContainer() {
  const { state } = useApp();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    const latest = state.notifications[state.notifications.length - 1];
    if (!latest) return;
    if (lastIdRef.current === latest.id) return; // avoid duplicates on non-append updates
    lastIdRef.current = latest.id;

    const toast: Toast = { id: latest.id, message: latest.message, type: latest.type };
    setToasts((prev) => [...prev, toast]);
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== toast.id));
    }, 4000);
    return () => clearTimeout(timeout);
  }, [state.notifications]);

  const color = (type: Toast['type']) => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'error': return 'bg-red-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={`${color(t.type)} text-white px-4 py-3 rounded shadow-lg min-w-[260px]`}> 
          {t.message}
        </div>
      ))}
    </div>
  );
}
