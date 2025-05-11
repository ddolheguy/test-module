import * as dotenv from 'dotenv';
import { ConfigContext, ExpoConfig } from 'expo/config';
import path from 'path';

dotenv.config({
  path: [path.resolve(__dirname, '.env')],
});

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  "name": "monterosa",
  "slug": "monterosa",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "monterosa",
  "userInterfaceStyle": "automatic",
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.davidtest.monterosa"
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#ffffff"
    },
    "package": "com.davidtest.monterosa"
  },
  "web": {
    "bundler": "metro",
    "output": "static",
    "favicon": "./assets/images/favicon.png"
  },
  "plugins": [
    "expo-router",
    [
      "./plugins/monterosa/index.js",
      {
        "token": process.env.MONTEROSA_TOKEN,
        "username": process.env.MONTEROSA_USERNAME,
      },
    ],
    [
      "expo-splash-screen",
      {
        "image": "./assets/images/splash-icon.png",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    ]
  ],
  "experiments": {
    "typedRoutes": true
  }
});
