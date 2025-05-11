const { withDangerousMod, withPlugins } = require('@expo/config-plugins');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const withMonterosaPod =
  ({ token, username }) =>
  (config) => {
    return withDangerousMod(config, [
      'ios',
      (cfg) => {
        const { platformProjectRoot } = cfg.modRequest;
        const podfile = resolve(platformProjectRoot, 'Podfile');
        const contents = readFileSync(podfile, 'utf-8');
        const lines = contents.split('\n');

        const index = lines.findIndex((line) => /\s+use_expo_modules!/.test(line));

        writeFileSync(
          podfile,
          [
            ...lines.slice(0, index),
            `
  username = "${username}"
  token = "${token}"
  version = "0.16.11"

  url = "https://#{username}:#{token}@gitlab.com/monterosa-sdk/ios.git"
                    
  pod 'MonterosaSDKCommon', :git => url, :tag => version
  pod 'MonterosaSDKConnectKit', :git => url, :tag => version
  pod 'MonterosaSDKCore', :git => url, :tag => version
  pod 'MonterosaSDKLauncherKit', :git => url, :tag => version
  pod 'MonterosaSDKIdentifyKit', :git => url, :tag => version
  `,
            ...lines.slice(index),
          ].join('\n')
        );

        return cfg;
      },
    ]);
  };

const withMonterosaSettingGradle =
  ({ token }) =>
  (config) => {
    return withDangerousMod(config, [
      'android',
      (cfg) => {
        const { platformProjectRoot } = cfg.modRequest;
        const settings = resolve(platformProjectRoot, 'settings.gradle');
        const contents = readFileSync(settings, 'utf-8');
        const lines = contents.split('\n');

        writeFileSync(
          settings,
          [
            ...lines,
            `
dependencyResolutionManagement {
  repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
  repositories {
      google()
      mavenCentral()
      maven {
          url "https://gitlab.com/api/v4/projects/38419902/packages/maven"
          credentials(HttpHeaderCredentials) {
              name = 'Deploy-Token'
              value = '${token}'
          }
          authentication {
              header(HttpHeaderAuthentication)
          }
      }
  }
}
  `,
          ].join('\n')
        );

        return cfg;
      },
    ]);
  };

const withMonterosa = (config, props) => {
  return withPlugins(config, [withMonterosaPod(props), withMonterosaSettingGradle(props)]);
};

module.exports = withMonterosa;
