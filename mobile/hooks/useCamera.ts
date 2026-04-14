import { useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { mediaDevices, MediaStream } from 'react-native-webrtc';
import { Constraints } from 'react-native-webrtc/lib/typescript/getUserMedia';

interface UseCameraReturn {
  localStream: MediaStream | null;
  cameraError: string | null;
}

/**
 * Requests Android camera permission explicitly, then initializes
 * the front-facing camera and exposes a MediaStream.
 */
export function useCamera(): UseCameraReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let active = true;

    async function requestPermissions(): Promise<boolean> {
      if (Platform.OS !== 'android') return true;

      try {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Elevium needs camera access for driver monitoring.',
            buttonPositive: 'Allow',
            buttonNegative: 'Deny',
          }
        );

        if (cameraGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.warn('[Camera] Permission denied');
          return false;
        }

        return true;
      } catch (err) {
        console.error('[Camera] Permission error:', err);
        return false;
      }
    }

    async function initCamera() {
      try {
        // Request permissions FIRST on Android
        const hasPermission = await requestPermissions();
        if (!active) return;

        if (!hasPermission) {
          setCameraError('Camera permission denied. Please enable it in Settings.');
          return;
        }

        const constraints: Constraints = {
          audio: false,
          video: {
            facingMode: 'user',
            width: { ideal: 480, max: 640 },
            height: { ideal: 320, max: 480 },
            frameRate: { ideal: 15, max: 24 },
          },
        };

        const stream = await mediaDevices.getUserMedia(constraints);

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        setLocalStream(stream);
        setCameraError(null);
        console.log('[Camera] Initialized successfully');
      } catch (err: any) {
        console.error('[Camera] Failed to get camera:', err);
        if (!active) return;
        setCameraError(
          err?.message?.includes('Permission')
            ? 'Camera permission denied. Please enable it in Settings.'
            : 'Failed to access camera. Please restart the app.'
        );
      }
    }

    initCamera();

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  return { localStream, cameraError };
}
