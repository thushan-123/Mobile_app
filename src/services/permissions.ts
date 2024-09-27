import { Camera, CameraPermissionType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export const requestPermissions = async (): Promise<boolean> => {
  // Check if the app is running on a native platform (iOS, Android)
  if (Capacitor.getPlatform() !== 'web') {
    try {
      const permissions = await Camera.requestPermissions({
        permissions: ['camera','photos']
      });

      if (permissions.camera === 'granted') {
        console.log('Camera permission granted');
        return true;
      } else {
        alert('Camera permission is required.');
        return false;
      }
    } catch (error) {
      console.error('Error requesting camera permissions:', error);
      alert('An error occurred while requesting camera permissions.');
      return false;
    }
  } else {
    // For web platform, assume the browser will handle permissions automatically
    console.log('Running on web platform, browser will handle permissions.');
    return true;
  }
};








