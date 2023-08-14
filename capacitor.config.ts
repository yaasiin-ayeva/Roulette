import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ayevayaasiin.roulette',
  appName: 'Roulette',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    url: 'http://197.253.123.12:9009/api/v1/roulette',
    iosScheme: 'http',
  }
};

export default config;
