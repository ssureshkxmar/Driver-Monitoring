import { useEffect, useRef } from 'react';
import { useLocation } from './maps/useLocation';

const SYNC_INTERVAL_MS = 10_000; // Sync every 10 seconds

// Production server fallback — works even if .env is not configured
const PRODUCTION_API = 'http://3.109.184.184:8000';
const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? PRODUCTION_API;

export const useLocationSync = () => {
  const { getLocation } = useLocation();
  const lastSyncRef = useRef<number>(0);

  useEffect(() => {
    const syncLocation = async () => {
      try {
        const now = Date.now();
        if (now - lastSyncRef.current < SYNC_INTERVAL_MS) return;

        const location = await getLocation({ force: true });
        if (!location) return;

        const url = `${API_BASE}/iot/location`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            latitude: location.coordinate.latitude,
            longitude: location.coordinate.longitude,
            address: location.displayName,
          }),
        });

        if (response.ok) {
          lastSyncRef.current = now;
          console.log('[LocationSync] Success:', location.coordinate);
        } else {
          console.error('[LocationSync] Failed:', response.status);
        }
      } catch (err) {
        console.error('[LocationSync] Error:', err);
      }
    };

    // Initial sync
    syncLocation();

    const interval = setInterval(syncLocation, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [getLocation]);
};

