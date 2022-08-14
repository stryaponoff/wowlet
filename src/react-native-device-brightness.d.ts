declare module '@adrianso/react-native-device-brightness' {
  export const ReactNativeDeviceBrightness: {
    /**
     * @param {number} brightnessLevel
     * - A number from `0`(min brightness) to `1` (max brightness)
     * - `-1` to disable override and turn on the auto-brightness
     */
    setBrightnessLevel(brightnessLevel: number): void

    /**
     * @returns {Promise<number>}
     * - A number from 0 (min brightness) to 1 (max brightness) if system brightness is overridden
     * - `-1` if using system auto-brightness
     */
    getBrightnessLevel(): Promise<number>

    /**
     * @returns {Promise<number>} A number from 0 (min brightness) to 1 (max brightness)
     */
    getSystemBrightnessLevel: () => Promise<number>
  }

  export default ReactNativeDeviceBrightness
}
