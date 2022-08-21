import 'reflect-metadata'
const mockCamera = {
  Camera: {
    getCameraPermissionStatus: jest.fn(Promise.resolve),
    requestCameraPermission: jest.fn(Promise.resolve),
  },
}
jest.mock('react-native-vision-camera', () => mockCamera)
const CameraService = require('@/services/camera/CameraService').default

describe('CameraService', () => {
  const service = new CameraService()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get camera permissions and return true if authorized', async () => {
    mockCamera.Camera.getCameraPermissionStatus.mockResolvedValue('authorized')
    expect(await service.getOrRequestCameraPermissions()).toEqual(true)
    expect(mockCamera.Camera.getCameraPermissionStatus).toBeCalled()
    expect(mockCamera.Camera.requestCameraPermission).not.toBeCalled()
  })

  it('should request camera permissions and return true if authorized', async () => {
    mockCamera.Camera.getCameraPermissionStatus.mockResolvedValue('not-determined')
    mockCamera.Camera.requestCameraPermission.mockResolvedValue('authorized')
    expect(await service.getOrRequestCameraPermissions()).toEqual(true)
    expect(mockCamera.Camera.getCameraPermissionStatus).toBeCalled()
    expect(mockCamera.Camera.requestCameraPermission).toBeCalled()
  })

  it('should get camera permissions and return false if denied', async () => {
    mockCamera.Camera.getCameraPermissionStatus.mockResolvedValue('denied')
    expect(await service.getOrRequestCameraPermissions()).toEqual(false)
    expect(mockCamera.Camera.getCameraPermissionStatus).toBeCalled()
    expect(mockCamera.Camera.requestCameraPermission).not.toBeCalled()
  })

  it('should request camera permissions and return false if denied', async () => {
    mockCamera.Camera.getCameraPermissionStatus.mockResolvedValue('not-determined')
    mockCamera.Camera.requestCameraPermission.mockResolvedValue('denied')
    expect(await service.getOrRequestCameraPermissions()).toEqual(false)
    expect(mockCamera.Camera.getCameraPermissionStatus).toBeCalled()
    expect(mockCamera.Camera.requestCameraPermission).toBeCalled()
  })
})
