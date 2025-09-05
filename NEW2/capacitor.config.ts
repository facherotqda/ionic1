// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'com.example.app',
//   appName: 'NEW2',
//   webDir: 'www'
// };

// /* export default config;
//  */

// export default {
//   plugins: {
//     SplashScreen: {
//       launchShowDuration: 3000, // milisegundos
//       backgroundColor: "#3880ff",
//       androidScaleType: "CENTER_CROP",
//       iosScaleType: "CENTER_CROP",
//       showSpinner: false
//     }
//   }
// };


import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'NEW2',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#3880ff",
      androidScaleType: "CENTER_CROP",
      iosScaleType: "CENTER_CROP",
      showSpinner: false
    }
  }
};

export default config;