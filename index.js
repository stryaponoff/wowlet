/**
 * @format
 */

import 'reflect-metadata';
import {AppRegistry} from 'react-native';
import App from './src/main.tsx';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
