import React from 'react';

export class Camera extends React.PureComponent {
  static async getAvailableCameraDevices() {
    return (
      [
        {
          position: 'back',
        },
      ]
    );
  }

  static async getCameraPermissionStatus() {
    return 'authorized';
  }

  static async requestCameraPermission() {
    return 'authorized';
  }

  async takePhoto() {
    return { path: 'fake_path.png' };
  }

  render() {
    return null;
  }
}

export const visionCameraSortDevices = (_left, _right) => 1;

export default {
  Camera,
};
