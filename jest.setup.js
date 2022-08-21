jest.mock('react-native-vision-camera', () => require('./__mock__/ReactNativeVisionCamera'));

jest.mock('@kichiyaki/react-native-barcode-generator', () => require('./__mock__/EmptyComponent'));

jest.mock('react-native-qrcode-svg', () => require('./__mock__/EmptyComponent'));

jest.mock('@adrianso/react-native-device-brightness', () => require('./__mock__/DeviceBrightness'));

jest.mock('react-native-screens', () => {
  const RealComponent = jest.requireActual('react-native-screens');
  RealComponent.enableScreens = function() {};
  return RealComponent;
});

jest.mock('react-native', () => {
  const RealComponent = jest.requireActual('react-native');
  RealComponent.NativeModules.SettingsManager = {
    settings: {
      AppleLocale: 'en-US',
    },
  };

  return RealComponent;
});

jest.mock('react-i18next', () => ({
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
