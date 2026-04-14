import { useEffect, useRef } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';

const SYNC_INTERVAL_MS = 10_000; // Sync every 10 seconds

// Production server fallback — works even if .env is not configured
const PRODUCTION_API = 'http://3.109.184.184:8000';
const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? PRODUCTION_API;

export const useLocationSync = () => {
  const lastSyncRef = useRef<number>(0);

  useEffect(() => {
    const syncLocation = async () => {
      try {
        const now = Date.now();
        if (now - lastSyncRef.current < SYNC_INTERVAL_MS) return;

        // Request location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('[LocationSync] Permission denied');
          return;
        }

        // Get current position
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        if (!position) return;

        const { latitude, longitude } = position.coords;

        // Reverse geocode for address
        let address = '';
        try {
          const results = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (results && results.length > 0) {
            const r = results[0];
            address = [r.city, r.region, r.country].filter(Boolean).join(', ');
          }
        } catch {
          address = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        }

        const url = `${API_BASE}/iot/location`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude, address }),
        });

        if (response.ok) {
          lastSyncRef.current = now;
          console.log('[LocationSync] Success:', { latitude, longitude, address });
        } else {
          console.error('[LocationSync] Failed:', response.status);
        }
      } catch (err) {
        console.error('[LocationSync] Error:', err);
      }
    };

    // Initial sync after a short delay (let app settle)
    const initialTimer = setTimeout(syncLocation, 3000);

    const interval = setInterval(syncLocation, SYNC_INTERVAL_MS);
    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);
};
