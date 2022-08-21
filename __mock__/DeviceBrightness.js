export default class {
  setBrightnessLevel(brightnessLevel) {
    // Do nothing
  }

  getBrightnessLevel() {
    return new Promise(resolve => {
      resolve(0.5);
    });
  }
  getSystemBrightnessLevel() {
    return new Promise(resolve => {
      resolve(0.5);
    });
  }
}
