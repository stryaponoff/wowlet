import type CameraServiceInterface from '@/services/camera/CameraServiceInterface'
import { Camera } from 'react-native-vision-camera'
import { injectable } from 'inversify'

@injectable()
export default class CameraService implements CameraServiceInterface {
  public async getOrRequestCameraPermissions(): Promise<boolean> {
    const cameraPermission = await Camera.getCameraPermissionStatus()
    if (cameraPermission === 'authorized') {
      return true
    } else if (cameraPermission !== 'denied') {
      const newCameraPermission = await Camera.requestCameraPermission()
      if (newCameraPermission === 'authorized') {
        return true
      }
    }

    return false
  }
}
