module.exports = {
  'preset': 'react-native',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  'moduleNameMapper': {
    'react-dom': 'react-native',
    '\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mock__/ImageMock.js',
  },
  'setupFiles': [
    './jest.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  'transformIgnorePatterns': [
    'node_modules/(?!(react-native|@react-native|react-native-flipper|react-native-reanimated|react-native-vector-icons|react-native-iphone-x-helper|react-native-paper-dropdown|react-native-super-grid)/)',
  ],
};
