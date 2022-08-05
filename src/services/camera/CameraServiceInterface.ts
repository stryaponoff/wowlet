export default interface CameraServiceInterface {
  getOrRequestCameraPermissions(): Promise<boolean>
}
